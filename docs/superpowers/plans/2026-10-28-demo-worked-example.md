# Pharma Worked Example Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Reach the reviewed pharma report without typing findings or recommendations while retaining separate human approval.

**Architecture:** Add a pure worked-example adapter alongside the demo domain. It resolves the reviewed example against current synthetic source snapshots, uses existing transitions to reopen affected reviews, and saves through the existing workspace. Optional example markers identify prepared drafts without changing the schema version.

**Tech Stack:** Existing Next.js/React/TypeScript, browser storage, Node unit runner and Playwright. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-10-28-demo-worked-example-design.md` (approved 28 October 2026).

## Global Constraints

- Synthetic pharma demo only, after current evidence review; retain source IDs and question snapshots.
- The shortcut grants no approval itself. Findings, recommendations and reports need explicit human actions.
- Preserve existing writing and decisions on cancellation; confirmed replacement reopens affected reviews.
- Resolve the original decision-clarity question and exact prepared passages; explain unavailable configurations.
- Keep normal blank drafting, older saved records, source navigation and malformed-storage recovery working.
- Scope is Sprint 6 usability under D-21, FR-18/FR-20/FR-23. Heatmap semantics and live-data validation remain open.
- Continue in the existing project checkout. User has requested project updates be committed and pushed to its current Git branch.

## Review Focus

1. Included questions may be reordered, renamed or removed; source identity must use captured content and type/code rather than ordinal IDs.
2. Existing edited/accepted findings and recommendations must survive cancellation, including unrelated accepted material.
3. Loading and reloading must leave both example items as drafts and invalidate affected report/no-recommendation review.
4. The current run alone supplies sources; unavailable or stale data must not receive plausible but unrelated example wording.
5. The shortcut should make the filled finding obvious and collapse other cards without losing their content or decisions.

## Task 1: Add and verify the worked-example shortcut

**Files:** Create `src/features/demo/worked-example.ts`; modify `model.ts`, `validation.ts`, `findings.tsx`, `recommendations.tsx`, `workspace.tsx`, `src/app/globals.css`, `tests/unit/demo.test.mjs`, `tests/ui/demo.spec.ts`, and relevant decision/architecture/build/evidence notes.

**Interfaces:** `pharmaWorkedExample(draft)` returns an availability reason or prepared finding/recommendation plus `needsConfirmation`; `loadPharmaWorkedExample(draft, replace = false)` returns a new `AssessmentDraft` or throws without mutation. Optional `workedExample: "pharma-decision-clarity"` markers on both items retain schema-1 compatibility. Existing domain transitions continue to own review invalidation.

- [x] Add unit cases for complete draft content and same-run links, rejection of missing/edited/stale/wrong-pack sources, replacement protection, review invalidation, unrelated-content preservation and saved reload.
- [x] Run unit cases before implementation and observe expected RED.
- [x] Add browser cases for a no-typing pharma report journey and cancelled/confirmed replacement. Observe RED for the missing shortcut.
- [x] Implement the adapter, optional marker validation and UI callback. Place the worked finding first, label it prepared, and collapse other findings while preserving access. Require native confirmation before replacing existing writing.
- [x] Run lint, typecheck and build, followed by unit/browser checks against the built app. Inspect the shortcut at narrow width in light/dark themes and retain a screenshot.
- [x] Update architecture, decision, README and evidence notes with observed results. Request a fresh read-only review of this increment and resolve material findings with regression checks.
- [x] Check the final diff and commit/push the reviewed project updates; confirm local and remote commits match.
