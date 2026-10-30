# Azure synthetic demo deployment

The user requested Azure hosting alongside their portfolio tools and approved anyone-with-link access on 30 October 2026. This deployment hosts the existing synthetic prototype. Saving remains local to each browser and origin; records saved at localhost do not appear automatically at the Azure URL.

## Current hosting route: Azure Node.js

The signed-in deployment account can create/deploy apps but cannot grant `Microsoft.Authorization/roleAssignments/write`. The initial container-pull role grant was denied. The delivered route therefore uses the existing plan's built-in `NODE|24-lts` runtime and a prebuilt Linux standalone ZIP, without registry passwords, other apps' identities or a new role grant. The container build remains the CI package producer; the registry-pull route below requires additional administrator permission and is not the current release path.

Download the `leadership-assessment-azure` artifact from a successful repository Actions run. It contains the standalone ZIP and its SHA256 checksum. CI builds/runs the Linux package and completes the synthetic browser suite before producing the artifact. Then use PowerShell 7:

```powershell
./scripts/deploy-azure-node.ps1 `
  -SubscriptionId 'your-subscription-guid' `
  -ResourceGroup 'RG-DEMO-UKW' `
  -PlanName 'ASP-RGDEMOUKW-b924' `
  -PackagePath './leadership-assessment-azure.zip' `
  -SourceCommit 'full-40-character-ci-source-commit' `
  -PackageSha256 '64-character-checksum-from-the-artifact'
```

The script verifies the ZIP checksum, embedded source identity and standalone server before any Azure changes. It checks project ownership/plan, configures Node 24 with an explicit startup command, disables server-side rebuilds, deploys the verified package, and verifies public HTTPS plus `/_deployment.json`. No assessment records are stored by this deployment; Azure's persistent home contains application files only. To roll back a Node release, deploy a previously verified ZIP with its original source commit and checksum through the same script. Stop/start recovery commands below also apply to Node hosting.

## Shared infrastructure and package

- Resource group: `RG-DEMO-UKW`; existing UK West Linux plan: `ASP-RGDEMOUKW-b924`.
- Existing registry: `crmhcdemo`; image repository: `leadership-assessment`.
- Project app: `leadership-assessment-demo`, with ownership tag `project=leadership-skills-tool`.
- Node.js 24 multi-stage Docker image, non-root runtime on `0.0.0.0:8080`. Docker builds enable `NEXT_STANDALONE=1`; normal local builds keep their current mode.
- The deployment script archives only committed application source, public assets and required build manifests/configuration into a temporary context. `.dockerignore` applies the same allowlist and excludes environment files and credentials. Documentation/source evidence, logs, Git internals and local build caches are excluded; no traversal of the Windows `.next` cache is needed.
- The optional private-container route needs the app identity to have registry-scoped `AcrPull`; the current account could not grant it. No registry passwords were read or saved. Container builds are pinned by digest and source commit, while the Node release is identified by its package checksum and embedded source commit.
- HTTPS only, public access, App Service health checks on `/`, startup logs enabled. No central evidence database, authenticated consultant approvals or publication is implied.

## Optional private-container deployment

Use PowerShell 7 with Azure CLI signed into the intended subscription. Commit the release source first; the script refuses a dirty Git checkout and refuses to modify an existing app without this project's ownership tag and selected plan.

```powershell
./scripts/deploy-azure.ps1 `
  -SubscriptionId '<subscription-id>' `
  -ResourceGroup 'RG-DEMO-UKW' `
  -PlanName 'ASP-RGDEMOUKW-b924' `
  -RegistryName 'crmhcdemo' `
  -AppName 'leadership-assessment-demo'
```

The script builds in ACR Tasks, waits for success, resolves the digest, creates or updates only the owned app, configures managed-identity pulls and checks the expected homepage and exact source revision at `/_deployment.json`. It prints the URL, source commit, image digest and build run ID. Record these in the release evidence. The existing shared plan and registry continue to serve the other portfolio apps.

To resume deployment of an already built release after a configuration interruption, add `-SourceCommit 'full-40-character-release-commit' -UseExistingImage`. The script requires a successful ACR run for that exact commit tag and verifies the running source marker and configured digest; it does not rebuild the image.

App creation uses a public Microsoft bootstrap image; the private image is then set through generic `linuxFxVersion` configuration after identity access is ready. Avoid `az webapp config container set` with an ACR registry URL: Azure CLI can implicitly retrieve registry admin credentials through that command even when managed identity is enabled.

CI independently builds/runs the container and executes the synthetic unit/browser suite against it. Before handing over a release, check deployed pages, source links, assets and the worked-example report journey. Use a fresh browser context so the check represents a visitor without existing local records.

## Container rollback and shared safe shutdown

For a later release rollback, choose the previously verified digest from release evidence, then update only this app's image:

```powershell
$subscriptionId = 'your-subscription-guid'
$recoveryConfig = New-TemporaryFile
@{ linuxFxVersion = 'DOCKER|crmhcdemo.azurecr.io/leadership-assessment@sha256:<previous-digest>'; acrUseManagedIdentityCreds = $true } | ConvertTo-Json | Set-Content -LiteralPath $recoveryConfig.FullName -Encoding utf8NoBOM
az webapp config set --subscription $subscriptionId --resource-group RG-DEMO-UKW --name leadership-assessment-demo --generic-configurations "@$($recoveryConfig.FullName)"
az webapp restart --subscription $subscriptionId --resource-group RG-DEMO-UKW --name leadership-assessment-demo
Remove-Item -LiteralPath $recoveryConfig.FullName
```

For an immediate safe shutdown of this synthetic demo:

```powershell
$subscriptionId = 'your-subscription-guid'
az webapp stop --subscription $subscriptionId --resource-group RG-DEMO-UKW --name leadership-assessment-demo
az webapp start --subscription $subscriptionId --resource-group RG-DEMO-UKW --name leadership-assessment-demo
```

Verify the expected homepage and a saved-assessment journey after recovery. There are no server-side assessment records or database migrations in this release. Browser data can still be cleared by its owner; it is not an Azure backup.

## References

- [Azure custom containers and managed identity](https://learn.microsoft.com/en-us/azure/app-service/configure-custom-container)
- [Next.js standalone deployment output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output)
