#Requires -Version 7.0
[CmdletBinding()]
param(
  [Parameter(Mandatory)][string]$SubscriptionId,
  [Parameter(Mandatory)][string]$ResourceGroup,
  [Parameter(Mandatory)][string]$PlanName,
  [Parameter(Mandatory)][string]$PackagePath,
  [Parameter(Mandatory)][ValidatePattern('^[a-f0-9]{40}$')][string]$SourceCommit,
  [Parameter(Mandatory)][ValidatePattern('^[a-f0-9]{64}$')][string]$PackageSha256,
  [ValidatePattern('^leadership-assessment-demo(-[a-z0-9]+)?$')][string]$AppName = 'leadership-assessment-demo'
)
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$packageFile = (Resolve-Path -LiteralPath $PackagePath).ProviderPath
if ((Get-FileHash -LiteralPath $packageFile -Algorithm SHA256).Hash.ToLowerInvariant() -ne $PackageSha256) {
  throw 'The release package checksum does not match.'
}
$archive = [IO.Compression.ZipFile]::OpenRead($packageFile)
try {
  $entry = $archive.GetEntry('public/_deployment.json')
  if (-not $entry) { $entry = $archive.GetEntry('./public/_deployment.json') }
  if (-not $entry) { throw 'The package has no release identity.' }
  $reader = [IO.StreamReader]::new($entry.Open())
  try { $release = $reader.ReadToEnd() | ConvertFrom-Json } finally { $reader.Dispose() }
  if ($release.sourceCommit -ne $SourceCommit) { throw 'The package does not match the requested source commit.' }
  if (-not $archive.GetEntry('server.js') -and -not $archive.GetEntry('./server.js')) { throw 'The standalone server is missing.' }
} finally { $archive.Dispose() }

function Invoke-Azure {
  param([Parameter(Mandatory)][string[]]$Command)
  $result = & az @Command --subscription $SubscriptionId --only-show-errors
  if ($LASTEXITCODE -ne 0) { throw "Azure command failed: $($Command[0..([Math]::Min(2, $Command.Length - 1))] -join ' ')" }
  return ($result -join "`n")
}

$plan = Invoke-Azure -Command @('appservice', 'plan', 'show', '--resource-group', $ResourceGroup, '--name', $PlanName, '--query', '{id:id,kind:kind}', '--output', 'json') | ConvertFrom-Json
if ($plan.kind -notmatch '(^|,)linux($|,)') { throw 'The selected plan is not Linux.' }
$apps = @(Invoke-Azure -Command @('webapp', 'list', '--resource-group', $ResourceGroup, '--query', '[].{name:name,project:tags.project,serverFarmId:serverFarmId}', '--output', 'json') | ConvertFrom-Json)
$existing = $apps | Where-Object name -EQ $AppName | Select-Object -First 1
if ($existing -and ($existing.project -ne 'leadership-skills-tool' -or $existing.serverFarmId -ne $plan.id)) {
  throw 'Refusing to modify an app without this project ownership tag and selected plan.'
}
if (-not $existing) {
  Invoke-Azure -Command @('webapp', 'create', '--resource-group', $ResourceGroup, '--plan', $PlanName, '--name', $AppName, '--runtime', 'NODE:24-lts', '--https-only', 'true', '--tags', 'project=leadership-skills-tool', 'data=synthetic-demo', '--output', 'none') | Out-Null
}

Write-Host 'Configuring the project app for Azure Node.js 24 hosting.'
$configurationFile = New-TemporaryFile
try {
  @{ linuxFxVersion = 'NODE|24-lts'; appCommandLine = 'HOSTNAME=0.0.0.0 node server.js'; alwaysOn = $true; healthCheckPath = '/'; minTlsVersion = '1.2'; ftpsState = 'Disabled'; acrUseManagedIdentityCreds = $false } |
    ConvertTo-Json -Compress | Set-Content -LiteralPath $configurationFile.FullName -Encoding utf8NoBOM
  Invoke-Azure -Command @('webapp', 'config', 'set', '--resource-group', $ResourceGroup, '--name', $AppName, '--generic-configurations', "@$($configurationFile.FullName)", '--output', 'none') | Out-Null
} finally { Remove-Item -LiteralPath $configurationFile.FullName -Force }
Invoke-Azure -Command @('webapp', 'update', '--resource-group', $ResourceGroup, '--name', $AppName, '--https-only', 'true', '--set', 'kind=app,linux', 'publicNetworkAccess=Enabled', '--output', 'none') | Out-Null
Invoke-Azure -Command @('webapp', 'config', 'appsettings', 'set', '--resource-group', $ResourceGroup, '--name', $AppName, '--settings', 'NODE_ENV=production', 'NEXT_TELEMETRY_DISABLED=1', 'SCM_DO_BUILD_DURING_DEPLOYMENT=false', 'ENABLE_ORYX_BUILD=false', 'WEBSITES_ENABLE_APP_SERVICE_STORAGE=true', '--output', 'none') | Out-Null
Write-Host 'Deploying the checksum-verified Linux standalone package.'
Invoke-Azure -Command @('webapp', 'deploy', '--resource-group', $ResourceGroup, '--name', $AppName, '--src-path', $packageFile, '--type', 'zip', '--clean', 'true', '--track-status', 'false', '--output', 'none') | Out-Null
Invoke-Azure -Command @('webapp', 'start', '--resource-group', $ResourceGroup, '--name', $AppName, '--output', 'none') | Out-Null
Invoke-Azure -Command @('webapp', 'log', 'config', '--resource-group', $ResourceGroup, '--name', $AppName, '--docker-container-logging', 'filesystem', '--output', 'none') | Out-Null
$app = Invoke-Azure -Command @('webapp', 'show', '--resource-group', $ResourceGroup, '--name', $AppName, '--query', '{id:id,host:defaultHostName}', '--output', 'json') | ConvertFrom-Json
Invoke-Azure -Command @('tag', 'update', '--resource-id', $app.id, '--operation', 'Merge', '--tags', 'project=leadership-skills-tool', 'data=synthetic-demo', 'deploymentMode=node-zip', "sourceCommit=$SourceCommit", "packageSha256=$PackageSha256", '--output', 'none') | Out-Null
$url = "https://$($app.host)"
$deadline = [DateTime]::UtcNow.AddMinutes(10)
Write-Host "Waiting for the exact public release at $url."
do {
  $ready = $false
  try {
    $page = Invoke-WebRequest -Uri $url -MaximumRedirection 0 -TimeoutSec 15 -SkipHttpErrorCheck
    $liveRelease = Invoke-RestMethod -Uri "$url/_deployment.json?v=$SourceCommit" -MaximumRedirection 0 -TimeoutSec 15
    $ready = $page.StatusCode -eq 200 -and $page.Content -match 'Your assessment workspace' -and $liveRelease.sourceCommit -eq $SourceCommit
  } catch { $ready = $false }
  if ($ready) { break }
  if ([DateTime]::UtcNow -gt $deadline) { throw "Startup verification timed out for $url." }
  Start-Sleep -Seconds 10
} while ($true)
[pscustomobject]@{ url = $url; sourceCommit = $SourceCommit; packageSha256 = $PackageSha256; mode = 'Azure Node.js 24 ZIP deployment'; appName = $AppName; resourceGroup = $ResourceGroup } | ConvertTo-Json
