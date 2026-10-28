# 3 Build

## Purpose

Implement the agreed design in small vertical slices that can be demonstrated and checked.

Use the [first-slice sprint plan](../build-sprint-plan.md) to sequence the work and record a demo and acceptance evidence for each increment. Its sprint numbers are an ordering guide; approved designs and decisions govern implementation.

Keep the [architecture notes](../architecture.md) current throughout implementation. Record material choices and changes to application boundaries, data flow, persistence, identity, security, deployment or operations, with status and links to the related decision and review evidence.

## Working sequence

Sprint 1 implementation is available as a local synthetic UI prototype. See [its evidence record](../evidence/sprint-1-ui.md) for actual checks, screenshots, review findings and remaining acceptance. This is not completion of later assessment features or permission to use live data.

1. Set up the chosen application stack, local setup instructions, dependency lockfile, lint/type/build checks, CI and a safe sample-data environment.
2. Implement the UI tokens and components needed for the first slice against the [Moorhouse UI standard](../standards/Moorhouse-UI-Standard.md); record any approved exceptions.
3. Implement engagement configuration and question variation.
4. Implement import validation and evidence organisation, including source identifiers and recovery from partial or invalid files.
5. Implement interview briefing preparation and editing.
6. Implement evidence-linked cohort findings, permissions, review states and audit events.
7. Implement the agreed heatmap and report export only after method approval.

Each slice needs a user-facing outcome, acceptance examples, relevant automated checks, code review and a short demo. Maintain a link from requirement to implementation and test evidence. Use synthetic or explicitly approved anonymised examples. Review AI-generated code for correctness, security, licensing, dependencies and data handling. Add migrations, configuration, telemetry and recovery steps when a slice needs them; keep secrets and assessment evidence out of the repository and logs.

## Definition of done for an increment

- Accepted behaviour and error states are implemented, with accessible keyboard and screen-reader paths for changed UI.
- Tests cover meaningful rules and critical failure cases; the agreed CI checks pass.
- Data access, provenance and human review boundaries are checked where affected.
- A reviewer can trace the change to requirement IDs, design decisions and demo evidence.
- User documentation, decision records and release notes are updated where behaviour changed.

## Exit evidence

- The agreed first slice works end to end with approved prototype data.
- A second configuration can be created without code changes.
- Findings retain provenance and review state through export.
- No secrets or live client evidence are committed to the repository.
- A new contributor can run the app and checks from the documented setup; CI is reproducible.

## AI use

Use the Vercel React skill if React/Next.js is chosen and Expo skills if Expo is chosen. Use Superpowers planning, debugging and verification methods where they fit the task. An AI-generated change receives the same review and checks as a human-authored change. Skills guide implementation; the reviewed design remains authoritative.

## 26 October 2026 — Profile intake

Profile intake integration now implements a focused Sprint 2/3 increment. The shared form, browser save/resume, snapshot provenance and consultant review are linked in the [integration evidence](../evidence/profile-intake.md). Later assessment processing is unfinished.
## 26 October 2026 — Drawer scrolling correction

User problem: the form moves behind an open mobile navigation drawer, creating overlapping background content. Reproduced in the user's 676px-wide in-app browser by scrolling over the backdrop. Expected: only the drawer scrolls while open, its page position and width remain stable, and normal page scrolling resumes on Escape, close or stage navigation. Also hide the Next development badge that visibly covers form content.

Scope: UI-01/UI-02 regression in the Sprint 1 navigation shared with the Sprint 2/3 intake increment. Synthetic UI only; no assessment data/storage changes. Skills: systematic-debugging, test-driven-development, Vercel React best practices and verification-before-completion. Evidence: new scrolling browser regressions, live browser screenshots and focused navigation/accessibility checks. Implementation and validation results will be recorded in the intake evidence.

## 26 October 2026 — Development gallery placement

D-18: user agreed to remove design-gallery entry points from the consultant workflow while keeping the direct development reference. Sprint 1 UI navigation refinement, UI-01/UI-02. Acceptance: no gallery links on home/new/scenario pages or mobile navigation; `/gallery` still loads and identifies itself as a development reference. Synthetic UI only, no data changes. Applied the existing UI/React guidance; verify using lint and local browser checks. No additional feature design or regression-test file is needed for this reversible navigation cleanup.

Validation: lint passed; local Chromium checks confirmed no `/gallery` links on home, new assessment, a scenario page or the mobile drawer. Direct `/gallery` returned HTTP 200 with its development-reference label. `git diff --check` passed. Removed the unused gallery-link and home-promotion CSS with their components.

## 26 October 2026 — Connected demo increment

User problem: saved configurations stopped at setup, preventing an end-to-end demonstration. D-19 approves explicit prepared sample packs and local consultant review through the report preview. No input-format decision is inferred; file uploads and real AI/methods remain open. Data class: wholly fictional company context, participant codes and passages.

Acceptance and implementation: [design](../superpowers/specs/2026-10-26-connected-demo.md), [plan](../superpowers/plans/2026-10-26-connected-demo.md), [evidence](../evidence/connected-demo.md). The implementation reuses the UI standard, saves per assessment, retains exact question/source snapshots, gates downstream review after changes and excludes draft/rejected content from report preview. No heatmap, scoring, export or publication is introduced.

## 27 October 2026 — Sprint 6 guided synthesis

User problem: generic prepared text did not guide evidence comparison or explain the basis of a recommendation. Expected outcome: a consultant can compare synthetic passages across themes/roles, write a bounded finding with disagreements and limitations, and separately review a structured action linked to that accepted finding. D-21 approves this prototype method; FR-18/FR-20/FR-23 apply. Data sensitivity: wholly synthetic, browser-local material.

Acceptance checks: same-run source provenance across questions; required claim/scope/limits/support; separate action/rationale/outcome review; edit invalidation; accepted-only reports; legacy saved demo compatibility; labelled keyboard controls and light/dark narrow-screen reflow. Skills activated: writing-plans, executing-plans, test-driven-development, Vercel React best practices, systematic-debugging, verification-before-completion and requesting-code-review. [Plan](../superpowers/plans/2026-10-27-sprint-6-guided-synthesis.md), [method](../superpowers/specs/2026-10-27-sprint-6-evidence-method-proposal.md), [implementation and validation evidence](../evidence/sprint-6-guided-synthesis.md). D-04 heatmap and live method validation remain open.

## 28 October 2026 — Worked-example demo shortcut

User problem: manual finding/recommendation entry slows a demonstration. Expected outcome: reach a reviewed pharma report without typing while retaining separate source inspection and human accept actions. Sprint 6 usability, FR-18/FR-20/FR-23, D-21/D-22. Data: wholly synthetic, browser-local. Acceptance: original matching evidence only, editable drafts without automatic approval, confirmed replacement with review invalidation, unrelated work retained, accessible narrow light/dark views and saved reload. Skills: brainstorming, writing-plans, executing-plans, test-driven-development, existing React guidance, verification-before-completion and requesting-code-review. [Design](../superpowers/specs/2026-10-28-demo-worked-example-design.md), [plan](../superpowers/plans/2026-10-28-demo-worked-example.md), [evidence](../evidence/demo-worked-example.md).
