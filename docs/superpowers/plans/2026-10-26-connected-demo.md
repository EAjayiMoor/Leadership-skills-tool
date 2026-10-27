# Connected Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement task-by-task with native execution retained.

**Goal:** Demonstrate the complete synthetic consultant workflow in a saved assessment.
**Architecture:** Optional typed demo-run state within existing browser drafts, pure review/provenance rules and explicit prepared packs, client stage screens reusing the existing shell. No dependencies or services added.
**Tech Stack:** Existing Next.js/React/TypeScript, Node unit runner, Playwright.
**Spec:** ../specs/2026-10-26-connected-demo.md

## Global constraints
- User-approved synthetic end-to-end demonstration only; no upload, AI, heatmap, scoring, export or live-data permission.
- Keep existing uncommitted feature checkout and native execution. No commit/push requested.
- Retain version-1 draft compatibility; an optional demo object has its own schema version.
- Use explicit .ts runtime imports for Node unit checks, with allowImportingTsExtensions under noEmit.

## Review focus
- Old drafts and malformed optional demo data must be handled without silent overwrites.
- Source and question snapshots must not migrate to a different assessment or revised configuration.
- Rejected/draft content and dependent stale recommendations must never appear as reviewed report content.
- Save failures must preserve edits and warn before navigation.
- Long/narrow screens, direct stage URLs and exact-source links must retain context.

### Task 1 — Domain, fictional packs and storage
Files: src/features/demo/{model,packs,validation}.ts; intake model/storage; tsconfig; tests/unit/demo.test.mjs.
Interfaces: loadDemo, isDemoStale, reviewEvidence, prepareFindings, changeFinding, prepareRecommendations, changeRecommendation, canReviewReport, reviewReport, demoProgress; isDemoRun(value).
- [x] Write/run failing domain tests for configuration gate, snapshot/cross-assessment provenance, review chain, edit/rejection invalidation and old/malformed storage.
- [x] Implement pure immutable transitions and bounded three-pack data; extend storage validation without rewriting old drafts.
- [x] Run full unit suite and record evidence.

### Task 2 — Connected stage screens
Files: src/features/demo/{workspace,evidence,findings,recommendations,report,interviews}.tsx; saved-assessment, shell/navigation; reusable unsaved hook; intake integration; CSS; tests/ui/demo.spec.ts.
- [x] Write/run failing end-to-end browser journeys for all packs and key stale/review/failure states.
- [x] Implement load/review/provenance, editable draft decisions, cohort-only report preview, exact-source links and accurate stage progress.
- [x] Reuse unsaved protection for failed saves; preserve original example screens. Update obsolete placeholder-only test.
- [x] Verify targeted journeys and inspect desktop/narrow/both-theme screenshots.

### Task 3 — Verification and record
Files: README, decisions/requirements, architecture, sprint/stage and docs/evidence/connected-demo.md.
- [x] Run lint/typecheck/build, complete unit/browser checks and diff check, without competing static jobs during browser scans.
- [x] Independent scoped review and regression fixes; retain evidence and limits.
- [x] Update living records and open the connected local demo. Keep work uncommitted.

Completed locally under the approved native execution approach. [Actual checks and review disposition](../../evidence/connected-demo.md). Work remains uncommitted for user review.
