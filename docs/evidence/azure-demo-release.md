# Azure synthetic demo release — 30 October 2026

## Scope and release identity

The user requested Azure portfolio hosting and explicitly approved anyone-with-link access (D-23). This is a focused Sprint 8 / Deploy-stage hosting increment for fictional data, owned by the user as technical owner and product co-owner. Expected outcome: an accessible HTTPS demo preserving consultant review, source traceability and browser-local saving. Live evidence, shared storage, authenticated approval and report publication remain outside this release.

- Public URL: https://leadership-assessment-demo.azurewebsites.net
- Application source: `ba2fb97266f840e697347df23435f53f66d9662c`. Later documentation commits do not change the deployed application.
- Standalone ZIP SHA256: `fe83beeafde25a840478ffca8b9a7059aa977e01dae3982ed7a64663143547f6`.
- [Successful release CI](https://github.com/EAjayiMoor/Leadership-skills-tool/actions/runs/41075846513), artifact `leadership-assessment-azure` (14-day retention). Download/retain a verified release artifact before that expiry if rollback is needed.
- App `leadership-assessment-demo`, resource group `RG-DEMO-UKW`, existing UK West Linux plan `ASP-RGDEMOUKW-b924`.
- Runtime `NODE|24-lts`; startup `HOSTNAME=0.0.0.0 node server.js`; HTTPS only, public network enabled, platform authentication disabled, Always On and health path `/` configured.

## Verification and review

CI built and ran the Linux standalone container, passed lint/types, 34 unit tests and 49 Chromium browser tests, then exported the tested app files as the ZIP. The deployment driver checked the package checksum, embedded source marker and standalone entry point before Azure mutation. Deployment exited successfully; anonymous root requests returned HTTP 200 and the expected workspace title. `/_deployment.json` returned the exact source above. Azure reported Running, HTTPS-only and public access enabled; authentication reported disabled.

Fresh packaging review found no blockers in the Node ZIP route. An earlier review identified implicit registry-credential lookup in a proposed container command; that path was removed before use. Real preflight issues with Linux-plan metadata, Windows cache traversal and ACR run-result shape were corrected and checked through subsequent builds. Azure denied creation of the proposed registry-pull role. The delivered built-in Node route uses independently available app-deployment permission, without new IAM grants, registry passwords or another app's identity. No other portfolio app was changed.

A local-to-Azure full test attempt passed 34 units, then the local Node browser worker failed allocating memory. Host inspection showed about 30 MB free of 4 GB RAM. This is not recorded as a complete live-suite pass; CI's complete passing suite is separate evidence.

The focused live command `PLAYWRIGHT_TEST_BASE_URL=https://leadership-assessment-demo.azurewebsites.net npx playwright test tests/ui/demo.spec.ts --grep 'worked|pharma' --workers=1` passed all three tests in 2.2 minutes: no-typing pharma report with replacement protection, preservation of earlier findings, and the connected pharma journey with exact source traceability. This verifies the primary demonstration on the real public host without claiming the entire live suite passed.

## Recovery and operations

The new app was stopped and Azure reported Stopped, then started again. Subsequent anonymous checks returned HTTP 200, the correct source marker and Running state. This rehearses safe shutdown/start recovery; a previous-release package rollback was not rehearsed because this is the first release. Redeploy a retained verified ZIP with its matching checksum/source using the [operator guide](../deployment/azure.md). No database migration or server-side assessment backup applies.

Skills used: brainstorming/design, writing-plans, deployment review, verification-before-completion and systematic-debugging for real release failures. Acceptance evidence is the CI result, public configuration/source checks, live journeys and recovery observation. This does not close the wider Sprint 8 method, governance, accessibility, consultant observation or pilot measurement gates.

Saved drafts remain local to each browser and origin, unencrypted and clearable. The Azure origin starts separately from localhost. Use fictional information only. Azure App Service startup logs and health settings are available to the technical owner; no external alert recipient or ongoing operational SLA is configured. Capacity under concurrent use remains unmeasured; this uses an existing shared plan. Live-data governance and authenticated review remain open.
