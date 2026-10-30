# Azure Demo Deployment Implementation Plan

> **For agentic workers:** Use the existing checkout and execute this deployment plan inline. Checkboxes record observed outcomes.

**Goal:** Publish and verify the approved anyone-with-link synthetic demo on the existing Azure portfolio infrastructure.

**Spec:** `docs/superpowers/specs/2026-10-30-azure-demo-deployment.md` records the user's hosting/access direction and the technical choices.

**User problem:** A localhost app cannot be opened by portfolio users. **Expected outcome:** A working public HTTPS demo URL with repeatable deployment and recovery instructions. **Data sensitivity:** Wholly synthetic; browser-local records only. Scope: focused Deploy-stage/Sprint 8 hosting increment, not completion of the wider pilot gates.

## Constraints and review focus

- Reuse the inspected subscription and plan; modify only the new project-owned app. The proposed registry role grant was denied; the delivered Node route needs no new IAM grant.
- Public link access is explicitly authorized. No secrets/client evidence in build context, Git or logs.
- Preserve all application workflow/review/storage rules. New Azure-origin browser storage is separate from localhost.
- Pin the deployed package checksum and source, verify configuration and public behaviour, and record a safe shutdown/recovery path.
- Skills: existing brainstorming/design discussion and writing-plans guidance, React/Next.js deployment guidance, verification-before-completion and requesting-code-review. No mock Azure tests or implementation-mirroring tests; use actual builds, real CLI checks and existing synthetic functional checks.

## Tasks

### 1. Prepare and verify the release package

- [x] Add a multi-stage non-root Dockerfile, restrictive `.dockerignore`, conditional standalone Next.js output and repeatable `scripts/deploy-azure.ps1`.
- [x] Update CI to build/run the container and run the existing checks against it. Validate PowerShell syntax, lint, types and unit checks.
- [x] Request a fresh read-only review of packaging, source exclusions and deployment isolation; resolve material findings before Azure mutation.
- [x] Commit and push the verified packaging source so the image has a precise source revision.

### 2. Build and deploy on the portfolio infrastructure

- [x] ACR builds dc23/dc24 succeeded for the initial container route; this was superseded after the role denial. Final release CI built/tested the Linux package and exported the verified ZIP (source ba2fb97).
- [x] Create only the project-owned app on the existing plan. Azure denied the registry role grant; superseded container hosting with verified Linux standalone ZIP on built-in Node 24. HTTPS, health/startup settings and exact source/package identity verified.
- [x] Verify public HTTPS startup, default route and static assets. Inspect startup logs on failure without printing credentials.

### 3. Verify, document and hand over

- [x] Run release CI (34 unit / 49 browser checks), then verify live Azure journeys. Full local-to-Azure run encountered host memory exhaustion; record focused live results and this limitation in release evidence.
- [x] Rehearse stop/start recovery on the new app, then confirm HTTP 200 and running/healthy state.
- [x] Update architecture, decisions, README and the Deploy-stage release record with the exact source/package/URL and results; commit and push those records.
- [x] Confirm Git remote synchronization and give the user the public URL and browser-local saving expectation.
