# Sprint 6 Guided Synthesis Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the connected demo's generic finding/recommendation templates with a consultant-guided, evidence-linked synthesis workspace for synthetic data.

**Architecture:** Keep the workflow in the existing pure `src/features/demo/model.ts` domain and persist it through the existing browser-draft storage. Findings can relate source passages across configured questions/themes and roles; consultants classify each passage's relation to the claim, write a bounded finding, and explicitly accept/edit/reject it. Recommendations use structured fields and remain linked to accepted findings. Existing demo records remain readable; report output contains accepted material only.

**Tech Stack:** Next.js 16, React 19, TypeScript, existing browser localStorage draft store, Node test runner, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-27-sprint-6-evidence-method-proposal.md` and `docs/superpowers/specs/2026-10-27-sprint-6-method-cases.md`.

## User Need and Acceptance

- **User problem:** Current findings and recommendations are generic templates and do not guide a consultant through cross-theme evidence, disagreement, uncertainty or rationale.
- **Expected outcome:** The consultant can inspect fictional evidence across themes/roles, classify its relationship to a candidate claim, author a bounded finding, and draft a practical recommendation linked to that accepted finding.
- **Data sensitivity:** Wholly synthetic browser-local data. No live client evidence, network calls, AI provider, client-facing approval or publication is introduced.
- **Acceptance checks:** Cross-question source links remain within the same assessment; sparse/conflicting material remains visible without scores; finding acceptance requires a claim, scope, limitations and supporting evidence; recommendation acceptance requires action, rationale and intended outcome; edits revoke affected review; only accepted content appears in the report; old saved demo records remain readable.
- **Heatmap:** Excluded from this implementation. D-04 semantics remain open.

## Global Constraints

- D-21 authorizes this workflow for the synthetic prototype only; it is not validated for live assessment use.
- Keep all conclusions cohort-level. Do not add individual scores, rankings, employment recommendations or inferred prevalence from counts.
- Preserve source IDs, exact passages and question snapshots. Do not expose raw passages in the report.
- Require explicit human review of findings, recommendations and report preview.
- Keep legacy saved demo records valid; do not overwrite malformed browser data.
- Do not add dependencies, AI processing, heatmap values, export or publication.
- Keep current work uncommitted and preserve existing user changes.

## Review Focus

1. **Legacy saved records:** schema-1 demos without new structured fields still load and render without migration loss.
2. **Cross-theme source selection:** every selected source belongs to this assessment; a finding can cite several questions without weakening source provenance.
3. **Sparse or conflicting material:** the screen shows evidence and limitations without converting counts into a score or treating missing input as a negative finding.
4. **Review invalidation:** changing claim text, scope, evidence relation or recommendation fields reopens dependent recommendations/report review.
5. **Accessibility and reflow:** relation selectors and structured fields are keyboard labelled, status does not rely on colour alone, and findings remain usable at narrow widths in light/dark themes.

## Skills and Sprint Validation

- **Planning:** brainstorming and writing-plans.
- **Build:** test-driven-development for domain and approval rules; Vercel React best practices for React component work; systematic-debugging if a check fails; requesting-code-review and verification-before-completion before reporting completion.
- **Sprint:** Sprint 6, focused synthetic prototype increment for FR-18/FR-20/FR-23. D-04 heatmap work is excluded.
- **Validation evidence:** unit cases for source relations, cross-question provenance, acceptance gates, edit invalidation and legacy compatibility; full synthetic browser journey; keyboard/accessibility and responsive checks; reviewed screenshots and an updated evidence record.

## Planned Files

- Modify `src/features/demo/model.ts` for evidence relations, structured finding/recommendation state and review gates.
- Modify `src/features/demo/validation.ts` to validate new optional fields and same-assessment cross-question references while retaining legacy compatibility.
- Modify `src/features/demo/findings.tsx` and `src/features/demo/recommendations.tsx` for the guided source comparison and structured review forms.
- Modify `src/features/demo/report.tsx` to show accepted finding scope/limitations and structured recommendation rationale/outcome with source links.
- Modify `src/features/demo/workspace.tsx` only if callback/persistence wiring needs adjustment; existing autosave and unsaved-change protection remain the persistence path.
- Modify `src/app/globals.css` for accessible, responsive evidence relation controls and dense source group layout using existing tokens.
- Extend `tests/unit/demo.test.mjs` and `tests/ui/demo.spec.ts` for the new workflow and legacy behavior.
- Update `README.md`, `docs/architecture.md`, `docs/requirements-register.md`, `docs/sdlc/03-build.md`, and add `docs/evidence/sprint-6-guided-synthesis.md` after verification.

## Tasks

### Task 1: Add evidence-linked synthesis state and domain gates

**Files:**
- Modify: `tests/unit/demo.test.mjs`
- Modify: `src/features/demo/model.ts`
- Modify: `src/features/demo/validation.ts`

**Interfaces:**
- Add `EvidenceRelation = "supports" | "qualifies" | "contradicts" | "context"` and `FindingEvidence = { sourceId: string; relation: EvidenceRelation }`.
- Extend `DemoFinding` with optional `evidence`, `scope`, `qualifyingSummary`, `limitations`, and `alternative` fields. Retain `questionId`, `sourceIds`, and `counterSourceIds` for existing records; derive new display/source lists from `evidence` when present.
- `questionId` remains the originating prompt for existing screens; new `evidence` links may point to any question in the same `DemoRun`. Add `findingEvidenceIds(finding, relation?)` so report references use the new relations or the legacy source arrays consistently.
- Extend `DemoRecommendation` with optional `action`, `rationale`, `intendedOutcome`, and `followUpCheck`. Retain `text` for legacy records.
- Add `recommendationSections(recommendation)` to return structured fields when present and a legacy text section when they are absent.
- Extend `changeFinding` and `changeRecommendation` patches to edit the new fields; synchronize the legacy source arrays from `evidence` for new records; existing edit paths continue to invalidate dependent decisions.
- Add `canAcceptFinding(draft, findingId)` and use `recommendationSections(recommendation)` for legacy report rendering. New finding acceptance requires nonblank title/text/scope/qualifying summary/limitations and at least one supporting source. New structured recommendation acceptance requires nonblank action/rationale/intended outcome and an accepted linked finding.
- `prepareFindings` creates draft cards without fabricated claim text; each draft starts from a question topic and can attach sources from any question in the same run. `prepareRecommendations` creates blank structured drafts rather than scenario-generic actions.
- `isDemoRun` accepts legacy schema-1 objects unchanged; when structured evidence is present it validates relation values, unique source IDs and same-run references without requiring all linked records to match the originating `questionId`. Accepted legacy records retain their current validation behavior.

- [x] **Step 1: Write failing unit tests** named `prepareFindings creates unsubstantiated drafts without invented text`, `finding evidence can span questions and roles within one run`, `finding acceptance requires a bounded claim and supporting source`, `structured recommendations require action rationale and outcome`, `editing structured findings revokes linked decisions`, and `legacy saved demos without structured fields remain valid`. Assert cross-assessment and dangling evidence references are rejected.
- [x] **Step 2: Run `npm run test:unit`** and confirm the new cases fail for the missing behavior while existing tests remain otherwise interpretable.
- [x] **Step 3: Implement the minimal domain and validation changes** in `model.ts` and `validation.ts`, preserving old serialized fields.
- [x] **Step 4: Run `npm run test:unit`** and confirm the new cases and existing unit suite pass.

### Task 2: Build the guided evidence and finding review screen

**Files:**
- Modify: `src/features/demo/findings.tsx`
- Modify: `src/features/demo/workspace.tsx` only if needed for the new patch shape
- Modify: `src/app/globals.css`
- Modify: `tests/ui/demo.spec.ts`

**Interfaces:**
- Show source passages grouped by captured topic/question and role; each source gets a labelled relation control with options “Not linked”, “Supports”, “Qualifies”, “Contradicts” and “Context only”.
- Let the consultant attach passages from multiple questions to a single finding; display exact source links and captured role context.
- Provide fields for finding title, claim, scope, qualifying/contrary summary, limitations and optional alternative interpretation.
- Keep status copy explicit that this is consultant-led synthetic analysis; do not describe template or system text as AI analysis.
- Disable acceptance until `canAcceptFinding` is true; retain explicit accept/reject and existing report invalidation.

- [x] **Step 1: Write a failing browser flow** that selects sources from two themes/roles, enters a bounded finding, verifies acceptance gating and confirms the exact cited sources remain inspectable.
- [x] **Step 2: Run the focused Playwright case** against the configured built app and confirm the expected failure.

```powershell
$env:PLAYWRIGHT_TEST_BASE_URL = "http://127.0.0.1:3103"
npx playwright test tests/ui/demo.spec.ts --grep "guided synthesis"
```
- [x] **Step 3: Implement the grouped evidence view and labelled relation/claim fields** using existing UI primitives and semantic theme tokens.
- [x] **Step 4: Re-run the focused case** and confirm cross-theme source selection, required-field gates, persistence/reload, exact source links and keyboard access at narrow width.

### Task 3: Structure recommendations and report content

**Files:**
- Modify: `src/features/demo/recommendations.tsx`
- Modify: `src/features/demo/report.tsx`
- Modify: `tests/unit/demo.test.mjs`
- Modify: `tests/ui/demo.spec.ts`

**Interfaces:**
- Recommendation drafts expose action, rationale, intended outcome and optional follow-up check. They are created blank for each accepted finding.
- The report renders those fields and the finding scope/limitations; source links remain internal references and raw passages stay out of the report.
- `acceptedReportContent` supports both new structured recommendations and existing legacy `text` recommendations.

- [x] **Step 1: Write failing unit and browser checks** showing blank recommendation drafts cannot be accepted, every accepted recommendation links to an accepted finding, structured sections appear in report preview, and legacy recommendations still render.
- [x] **Step 2: Run the focused unit and Playwright cases** and confirm the missing behavior.
- [x] **Step 3: Implement the structured recommendation editors and report rendering**; ensure every edit invalidates recommendation/report review as appropriate.
- [x] **Step 4: Re-run focused checks** and confirm accepted-only report inclusion, source links and review invalidation.

### Task 4: Update the connected journey and evidence records

**Files:**
- Modify: `tests/ui/demo.spec.ts`
- Modify: `README.md`
- Modify: `docs/architecture.md`
- Modify: `docs/requirements-register.md`
- Modify: `docs/sdlc/03-build.md`
- Create: `docs/evidence/sprint-6-guided-synthesis.md`

- [x] **Step 1: Update the end-to-end scenario** to author structured findings and recommendations for all three synthetic packs, reload the saved draft, inspect source links and verify that edits revoke downstream review.
- [x] **Step 2: Run the focused demo browser suite** and record results for desktop and narrow light/dark views.
- [x] **Step 3: Update user and architecture notes** to describe the consultant-guided workflow and preserve the synthetic-only/heatmap-open boundaries.
- [x] **Step 4: Run final verification:** `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:unit`, `npm run test:ui`, and `git diff --check`. Record actual results and any deferred cases in the Sprint 6 evidence note.

## Execution Notes

- Use the existing checkout and preserve all prior uncommitted work; do not create commits, push or deploy.
- Use the previously selected native execution approach after the user reviews this plan.
- The final reviewer checks the diff against D-21, D-20, these cases and the plan's Review Focus.
- A green automated suite demonstrates the synthetic workflow only; it does not validate assessment use with live evidence.
