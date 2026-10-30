# Azure Demo Deployment Implementation Plan

> **For agentic workers:** Use the existing checkout and execute this deployment plan inline. Checkboxes record observed outcomes.

**Goal:** Publish and verify the approved anyone-with-link synthetic demo on the existing Azure portfolio infrastructure.

**Spec:** `docs/superpowers/specs/2026-10-30-azure-demo-deployment.md` records the user's hosting/access direction and the technical choices.

**User problem:** A localhost app cannot be opened by portfolio users. **Expected outcome:** A working public HTTPS demo URL with repeatable deployment and recovery instructions. **Data sensitivity:** Wholly synthetic; browser-local records only. Scope: focused Deploy-stage/Sprint 8 hosting increment, not completion of the wider pilot gates.

## Constraints and review focus

- Reuse the inspected subscription, plan and registry; modify only the new project-owned app and its own identity role assignment.
- Public link access is explicitly authorized. No secrets/client evidence in build context, Git or logs.
- Preserve all application workflow/review/storage rules. New Azure-origin browser storage is separate from localhost.
- Pin the deployed image digest, verify configuration and public behaviour, and record a safe shutdown/recovery path.
- Skills: existing brainstorming/design discussion and writing-plans guidance, React/Next.js deployment guidance, verification-before-completion and requesting-code-review. No mock Azure tests or implementation-mirroring tests; use actual builds, real CLI checks and existing synthetic functional checks.

## Tasks

### 1. Prepare and verify the release package

- [ ] Add a multi-stage non-root Dockerfile, restrictive `.dockerignore`, conditional standalone Next.js output and repeatable `scripts/deploy-azure.ps1`.
- [ ] Update CI to build/run the container and run the existing checks against it. Validate PowerShell syntax, lint, types and unit checks.
- [ ] Request a fresh read-only review of packaging, source exclusions and deployment isolation; resolve material findings before Azure mutation.
- [ ] Commit and push the verified packaging source so the image has a precise source revision.

### 2. Build and deploy on the portfolio infrastructure

- [ ] Build the Linux image in the existing registry; record its run status and digest. Docker Desktop is not running locally, so use ACR Tasks.
- [ ] Create only the project-owned app on the existing plan, assign its managed identity registry pull access, and set HTTPS, health/startup settings and exact container digest.
- [ ] Verify public HTTPS startup, default route and static assets. Inspect startup logs on failure without printing credentials.

### 3. Verify, document and hand over

- [ ] Run the existing synthetic unit/browser checks against the Azure release and verify the no-typing pharma report journey.
- [ ] Rehearse stop/start recovery on the new app, then confirm HTTP 200 and running/healthy state.
- [ ] Update architecture, decisions, README and the Deploy-stage release record with the exact source/image/URL and results; commit and push those records.
- [ ] Confirm Git remote synchronization and give the user the public URL and browser-local saving expectation.
