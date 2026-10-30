#Requires -Version 7.0
[CmdletBinding()]
param(
  [Parameter(Mandatory)][string]$SubscriptionId,
  [Parameter(Mandatory)][string]$ResourceGroup,
  [Parameter(Mandatory)][string]$PlanName,
  [Parameter(Mandatory)][string]$RegistryName,
  [ValidatePattern('^leadership-assessment-demo(-[a-z0-9]+)?$')]
  [string]$AppName = 'leadership-assessment-demo'
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$projectTag = 'leadership-skills-tool'
$imageRepository = 'leadership-assessment'
$repositoryRoot = Split-Path -Parent $PSScriptRoot

function Invoke-Azure {
  param([Parameter(Mandatory)][string[]]$Command)
  $commandOutput = & az @Command --subscription $SubscriptionId --only-show-errors
  if ($LASTEXITCODE -ne 0) {
    throw "Azure command failed: $($Command[0..([Math]::Min(2, $Command.Length - 1))] -join ' ')"
  }
  return ($commandOutput -join "`n")
}

Push-Location -LiteralPath $repositoryRoot
try {
  $sourceCommit = (& git rev-parse HEAD).Trim()
  if ($LASTEXITCODE -ne 0) { throw 'Cannot identify the source commit.' }
  $pendingChanges = & git status --porcelain
  if ($pendingChanges) { throw 'Commit project changes before building the deployment image.' }
  $imageTag = $sourceCommit.Substring(0, 12)

  $plan = Invoke-Azure -Command @('appservice', 'plan', 'show', '--resource-group', $ResourceGroup, '--name', $PlanName, '--query', '{id:id,kind:kind}', '--output', 'json') | ConvertFrom-Json
  if ($plan.kind -notmatch '(^|,)linux($|,)') { throw 'The selected App Service plan must be Linux.' }
  $registry = Invoke-Azure -Command @('acr', 'show', '--name', $RegistryName, '--query', '{id:id,loginServer:loginServer}', '--output', 'json') | ConvertFrom-Json
  $apps = @(Invoke-Azure -Command @('webapp', 'list', '--resource-group', $ResourceGroup, '--query', '[].{name:name,project:tags.project,serverFarmId:serverFarmId}', '--output', 'json') | ConvertFrom-Json)
  $existing = $apps | Where-Object name -EQ $AppName | Select-Object -First 1
  if ($existing -and ($existing.project -ne $projectTag -or $existing.serverFarmId -ne $plan.id)) {
    throw 'Refusing to modify an app without this project ownership tag and the selected plan.'
  }

  Write-Host "Building $imageRepository`:$imageTag in $RegistryName."
  $temporaryParent = [IO.Path]::GetFullPath([IO.Path]::GetTempPath())
  $contextRoot = Join-Path $temporaryParent ("leadership-azure-" + [Guid]::NewGuid().ToString('N'))
  New-Item -ItemType Directory -Path $contextRoot | Out-Null
  try {
    $archivePath = Join-Path $contextRoot 'source.zip'
    $contextPath = Join-Path $contextRoot 'context'
    $sourcePaths = @('Dockerfile', '.dockerignore', 'package.json', 'package-lock.json', 'next.config.ts', 'next-env.d.ts', 'tsconfig.json', 'postcss.config.mjs', 'src')
    $publicTree = & git ls-tree --name-only $sourceCommit -- public
    if ($publicTree) { $sourcePaths += 'public' }
    & git archive --format=zip "--output=$archivePath" $sourceCommit -- @sourcePaths
    if ($LASTEXITCODE -ne 0) { throw 'Cannot archive the committed application source.' }
    Expand-Archive -LiteralPath $archivePath -DestinationPath $contextPath
    $build = Invoke-Azure -Command @('acr', 'build', '--registry', $RegistryName, '--image', "$imageRepository`:$imageTag", '--file', (Join-Path $contextPath 'Dockerfile'), '--build-arg', "SOURCE_COMMIT=$sourceCommit", '--platform', 'linux/amd64', '--no-wait', '--query', '{runId:runId,status:status}', '--output', 'json', $contextPath) | ConvertFrom-Json
  }
  finally {
    $resolvedContextRoot = (Resolve-Path -LiteralPath $contextRoot).ProviderPath
    if (-not $resolvedContextRoot.StartsWith($temporaryParent, [StringComparison]::OrdinalIgnoreCase) -or [IO.Path]::GetFileName($resolvedContextRoot) -notmatch '^leadership-azure-[a-f0-9]{32}$') {
      throw 'Refusing cleanup outside the generated temporary build directory.'
    }
    Remove-Item -LiteralPath $resolvedContextRoot -Recurse -Force
  }
  $buildDeadline = [DateTime]::UtcNow.AddMinutes(20)
  $lastStatus = ''
  do {
    $buildStatus = (Invoke-Azure -Command @('acr', 'task', 'show-run', '--registry', $RegistryName, '--run-id', $build.runId, '--query', 'status', '--output', 'tsv')).Trim()
    if ($buildStatus -ne $lastStatus) {
      Write-Host "ACR build $($build.runId): $buildStatus"
      $lastStatus = $buildStatus
    }
    if ($buildStatus -in @('Failed', 'Canceled', 'Error', 'Timeout')) {
      throw "Container build $($build.runId) failed. Inspect its ACR task logs before deployment."
    }
    if ($buildStatus -eq 'Succeeded') { break }
    if ([DateTime]::UtcNow -gt $buildDeadline) { throw "Timed out waiting for build $($build.runId)." }
    Start-Sleep -Seconds 10
  } while ($true)

  $imageDigest = (Invoke-Azure -Command @('acr', 'repository', 'show', '--name', $RegistryName, '--image', "$imageRepository`:$imageTag", '--query', 'digest', '--output', 'tsv')).Trim()
  if ($imageDigest -notmatch '^sha256:[a-f0-9]{64}$') { throw 'The registry did not return a valid image digest.' }
  $image = "$($registry.loginServer)/$imageRepository@$imageDigest"

  if (-not $existing) {
    Write-Host "Creating project-owned app $AppName on existing plan $PlanName."
    # Bootstrap with a public Microsoft image. Azure CLI must not look up ACR admin credentials.
    # Apply the real private image through generic configuration only after identity access is ready.
    Invoke-Azure -Command @('webapp', 'create', '--resource-group', $ResourceGroup, '--plan', $PlanName, '--name', $AppName, '--container-image-name', 'mcr.microsoft.com/appsvc/staticsite:latest', '--assign-identity', '[system]', '--https-only', 'true', '--tags', "project=$projectTag", 'data=synthetic-demo', "sourceCommit=$sourceCommit", '--output', 'none') | Out-Null
  }
  $principalId = (Invoke-Azure -Command @('webapp', 'identity', 'assign', '--resource-group', $ResourceGroup, '--name', $AppName, '--query', 'principalId', '--output', 'tsv')).Trim()
  $assignments = @(Invoke-Azure -Command @('role', 'assignment', 'list', '--scope', $registry.id, '--all', '--fill-principal-name', 'false', '--query', '[].{principalId:principalId,roleDefinitionName:roleDefinitionName}', '--output', 'json') | ConvertFrom-Json)
  if (-not ($assignments | Where-Object { $_.principalId -eq $principalId -and $_.roleDefinitionName -eq 'AcrPull' })) {
    Invoke-Azure -Command @('role', 'assignment', 'create', '--assignee-object-id', $principalId, '--assignee-principal-type', 'ServicePrincipal', '--role', 'AcrPull', '--scope', $registry.id, '--output', 'none') | Out-Null
  }

  $configurationFile = New-TemporaryFile
  try {
    @{ linuxFxVersion = "DOCKER|$image"; acrUseManagedIdentityCreds = $true; alwaysOn = $true; healthCheckPath = '/'; minTlsVersion = '1.2'; ftpsState = 'Disabled' } |
      ConvertTo-Json -Compress | Set-Content -LiteralPath $configurationFile.FullName -Encoding utf8NoBOM
    Invoke-Azure -Command @('webapp', 'config', 'set', '--resource-group', $ResourceGroup, '--name', $AppName, '--generic-configurations', "@$($configurationFile.FullName)", '--output', 'none') | Out-Null
  }
  finally { Remove-Item -LiteralPath $configurationFile.FullName -Force }

  Invoke-Azure -Command @('webapp', 'update', '--resource-group', $ResourceGroup, '--name', $AppName, '--https-only', 'true', '--set', 'publicNetworkAccess=Enabled', '--output', 'none') | Out-Null
  Invoke-Azure -Command @('webapp', 'config', 'appsettings', 'set', '--resource-group', $ResourceGroup, '--name', $AppName, '--settings', 'WEBSITES_PORT=8080', 'WEBSITES_ENABLE_APP_SERVICE_STORAGE=false', 'WEBSITES_CONTAINER_START_TIME_LIMIT=600', "DOCKER_REGISTRY_SERVER_URL=https://$($registry.loginServer)", '--output', 'none') | Out-Null
  Invoke-Azure -Command @('webapp', 'log', 'config', '--resource-group', $ResourceGroup, '--name', $AppName, '--docker-container-logging', 'filesystem', '--output', 'none') | Out-Null
  $app = Invoke-Azure -Command @('webapp', 'show', '--resource-group', $ResourceGroup, '--name', $AppName, '--query', '{id:id,defaultHostName:defaultHostName}', '--output', 'json') | ConvertFrom-Json
  Invoke-Azure -Command @('tag', 'update', '--resource-id', $app.id, '--operation', 'Merge', '--tags', "project=$projectTag", 'data=synthetic-demo', "sourceCommit=$sourceCommit", "imageDigest=$imageDigest", '--output', 'none') | Out-Null
  Invoke-Azure -Command @('webapp', 'restart', '--resource-group', $ResourceGroup, '--name', $AppName, '--output', 'none') | Out-Null

  $url = "https://$($app.defaultHostName)"
  Write-Host "Waiting for the public application at $url."
  $startupDeadline = [DateTime]::UtcNow.AddMinutes(10)
  do {
    $ready = $false
    try {
      $response = Invoke-WebRequest -Uri $url -MaximumRedirection 0 -TimeoutSec 15 -SkipHttpErrorCheck
      $release = Invoke-RestMethod -Uri "$url/_deployment.json?v=$sourceCommit" -MaximumRedirection 0 -TimeoutSec 15
      $ready = $response.StatusCode -eq 200 -and $response.Content -match 'Your assessment workspace' -and $release.sourceCommit -eq $sourceCommit
    } catch { $ready = $false }
    if ($ready) { break }
    if ([DateTime]::UtcNow -gt $startupDeadline) { throw "Startup verification timed out for $url. Inspect the app's container logs." }
    Start-Sleep -Seconds 10
  } while ($true)

  $configuredImage = (Invoke-Azure -Command @('webapp', 'config', 'show', '--resource-group', $ResourceGroup, '--name', $AppName, '--query', 'linuxFxVersion', '--output', 'tsv')).Trim()
  if ($configuredImage -ne "DOCKER|$image") { throw 'The configured image changed during this deployment; verify before handover.' }

  [pscustomobject]@{ url = $url; appName = $AppName; resourceGroup = $ResourceGroup; planName = $PlanName; registry = $RegistryName; sourceCommit = $sourceCommit; imageDigest = $imageDigest; buildRunId = $build.runId } | ConvertTo-Json
}
finally { Pop-Location }
