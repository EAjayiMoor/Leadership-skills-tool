# Azure public synthetic demo deployment

Status: Azure hosting requested by the user on 30 October 2026, followed by explicit anyone-with-link access approval. Implementation choices below are technical choices based on the inspected portfolio configuration.

Implementation update: the account's registry-role assignment was denied. The active release path uses the same plan's confirmed built-in Node 24 runtime with a checksum/source-verified Linux standalone ZIP from successful container CI. It requires no new registry role, registry password or identity reuse. The original custom-container proposal below remains recorded as an option requiring administrator-granted pull access.

## Outcome and scope

Host the existing synthetic leadership assessment demo at a public HTTPS Azure URL alongside the user's portfolio tools. Reuse the existing UK West Linux App Service plan and Azure Container Registry in RG-DEMO-UKW. Initial app name: `leadership-assessment-demo`, subject to global Azure name availability.

Keep the current browser-local saving and consultant review behaviour. A new HTTPS origin starts with separate saved drafts; local-machine browser records are not migrated. This is a public synthetic demo release, not approval for live client data, authenticated permissions, report publication or a central database.

## Technical design

- Build Next.js standalone output inside a Linux Node.js 24 container. Bind the runtime to 0.0.0.0:8080 behind Azure HTTPS.
- Restrict the build context to application source, package manifests and build configuration. Exclude local environment files, credentials, documentation/source evidence, logs, Git internals and browser records.
- Reuse the existing registry and App Service plan. Measured prior-hour plan averages during discovery were 14.35% CPU and 65.27% memory; existing portfolio resources remain unchanged.
- Build an image tagged with the source commit, record its digest, and configure the new app against that exact digest.
- Give only the new app's system-assigned managed identity the registry-scoped AcrPull role. Do not retrieve registry passwords or introduce deployment secrets.
- HTTPS only, public network access, no sign-in requirement as directed by the user. Enable App Service health checks and container startup logs.
- Provide a repeatable PowerShell deployment script with an explicit subscription and resource targets. Refuse to update an existing app without this project's ownership tag, or one attached to a different plan.
- CI builds and checks the container. Verify the deployed HTTPS application using the existing synthetic browser journey and source traceability checks.

## Acceptance and recovery

Record source commit, image digest, Azure app/resource identifiers, URL and observed verification. Confirm public access, health, static assets, dynamic saved-assessment routes, browser persistence and the worked-example report journey. Rehearse stop/start recovery on the new app before handover. Later rollback can point the app to a previously verified digest; the first release can be stopped safely. Keep architecture and release notes current and push the project updates to Git.

## References

- https://learn.microsoft.com/en-us/azure/app-service/configure-custom-container
- https://nextjs.org/docs/app/api-reference/config/next-config-js/output
