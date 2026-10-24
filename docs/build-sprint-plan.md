# Sprint plan for the first web product

Status: proposed build sequence, 24 October 2026. This turns the [first-slice blueprint](first-slice-blueprint.md) into reviewable increments. Sprint numbers show order, not promised dates or team capacity. Confirm owners, estimates and the release target at Sprint 0. The repository is still in Plan; an item below is not an approved assessment method or permission to use live client data.

## Outcome and working rules

Build one connected web journey: create a **synthetic client scenario profile**, configure an assessment, ingest evidence, prepare and capture interviews, draft cohort findings and recommendations, then review and export a report. Demonstrate the journey with the reference-shaped scenario and at least one materially different synthetic scenario. “Profile” here means client scenario context, not an assessed-leader profile.

Each sprint ends with a runnable demonstration, acceptance results, reviewed changes and an updated requirements/decision record. Use source-linked drafts and explicit human review. Keep the identifying manual examples and live client evidence outside the public repository. The [SDLC stage files](sdlc/00-operating-model.md) remain the gates for Plan, Design, Build, Test, Deploy and Maintain.

## Sprint 0 — Agree the build contract

**Goal:** Make the first slice safe and specific enough for implementation.

**Work:** Review the blueprint with assessment users; name product, method, technical, design and governance owners; accept or change first-slice requirements; define the client scenario fields, two synthetic cases, import/export contracts, evidence and review states, role permissions, and the report structure. Select the web stack, test runner, prototype environment and AI processing boundary. Define the thematic/heatmap method with worked examples or explicitly defer the heatmap. Baseline current manual effort and set initial success thresholds.

**Done when:** The Plan and Design exit evidence is recorded; every open decision blocking the next sprint has an owner and resolution; synthetic fixtures and acceptance examples are approved for public-repo use. In particular, resolve D-01, D-04 through D-07, D-09 through D-12 as they affect the first build. Do not implement a heatmap from the example workbook.

## Sprint 1 — A navigable assessment journey

**Goal:** A consultant can see the entire workflow and its review boundaries in one web app.

**Work:** Set up the chosen app and repeatable checks; apply the UI standard to a small component set; build engagement navigation and states for setup, ingestion, interview preparation, evidence, findings, recommendations and report approval. Load a synthetic demonstration fixture. Show draft versus approved content and block export until approval. Persist enough state to resume the demonstration. Mark unfinished functions clearly in the interface.

**Done when:** A user can move through the seven stages with the synthetic fixture, recover after a reload, and cannot mistake demonstration placeholders for completed analysis. Keyboard navigation, labels and visible focus work in the new screens. The build and agreed checks pass. This is a workflow skeleton, not a claim that assessment analysis is implemented.

**Requirements:** FR-01, FR-04, FR-06, SEC-08, UI-01, UI-02.

## Sprint 2 — Configure different client scenarios

**Goal:** A consultant can configure the reference-shaped scenario and a second scenario without code changes.

**Work:** Add editable client scenario context, assessment purpose, participant groups, themes and role-specific question sets. Validate missing required inputs and show what remains to be completed. Version configuration changes that affect later drafts.

**Done when:** Both synthetic scenarios have meaningfully different organisation contexts, role groups, themes and questions; each can be saved, reopened and edited. Missing fields are explained. Existing evidence and drafts are not silently reassigned when configuration changes.

**Requirements:** FR-01–06.

## Sprint 3 — Ingest and trace evidence

**Goal:** Source material enters the application reliably and remains inspectable.

**Work:** Implement the agreed first import formats for survey responses, interview material and role context. Validate schema and attribution; show a preview and correction path; store source identifiers and links from extracted items back to permitted source records. Handle duplicate, malformed, incomplete and interrupted imports. Enforce engagement separation and restricted raw-evidence access in the prototype roles.

**Done when:** Both scenarios import their sample inputs; a consultant can inspect and correct mappings; invalid records do not disappear silently; cross-engagement or client-facing access to raw evidence is denied. Provenance survives save and reload.

**Requirements:** FR-07–12, SEC-02–04.

## Sprint 4 — Prepare and capture interviews

**Goal:** The app reduces repeated manual interview preparation and keeps completed evidence connected.

**Work:** Assemble an editable interview brief from permitted survey responses and role context. Suggest focus areas and questions based on the configured scenario, with the basis shown. Capture or import interview notes/responses and correct attribution. Require review before suggested questions are used.

**Done when:** A consultant prepares a brief for more than one role, edits or rejects suggested questions, records interview evidence, and can trace factual statements to their sources. Missing source material produces a limitation, not invented detail.

**Requirements:** FR-13–17, SEC-02–04.

## Sprint 5 — Draft findings and recommendations

**Goal:** Turn collected evidence into useful, reviewable cohort-level synthesis.

**Work:** Organise evidence by configured theme; propose cohort findings with supporting and contrary evidence, uncertainty and an explicit draft state. Add assessor accept/edit/reject actions and audit events. Draft recommendations and a light forward plan linked to accepted findings. Add a heatmap only if D-04 has an approved method and worked test cases; otherwise use a labelled thematic findings view.

**Done when:** The reference-shaped and different-context scenarios produce distinct drafts; incomplete and conflicting evidence is surfaced; every material claim can be inspected against its sources; rejected drafts cannot flow to the report. No automatic individual score, ranking or employment recommendation appears. Method-owner evaluation records both useful and failed suggestions.

**Requirements:** FR-18–21, FR-23, FR-24, FR-26, SEC-05. FR-19 is conditional on D-04.

## Sprint 6 — Review, report and controlled export

**Goal:** A reviewer can produce an approved client-facing output from accepted material.

**Work:** Assemble an editable report using the approved template and findings; preserve evidence links internally while keeping raw individual evidence out of the client view by default. Add reviewer identity, revision history, approval and withdrawal states. Export the agreed format and record the export event.

**Done when:** A reviewer can edit, reject, approve, export and withdraw a report; unapproved findings and recommendations stay out; client-facing access shows only the approved output; exports match the reviewed version. The full journey runs for both synthetic scenarios.

**Requirements:** FR-21–24, FR-26, SEC-02–05, SEC-08.

## Sprint 7 — Evaluate and release a limited synthetic-data pilot

**Goal:** Prove the first slice is useful, trustworthy and supportable for its stated audience.

**Work:** Run end-to-end, permission, method, accessibility, recovery and AI-output evaluations against the scenarios in the blueprint. Observe consultants using the app; compare task time and correction effort with the Sprint 0 baseline. Fix release-blocking issues; document limitations, support route, monitoring, rollback and the exact permitted data class. Release only to the agreed pilot audience after the [Deploy gate](sdlc/05-deploy.md).

**Done when:** Accepted requirements have linked test evidence; no unowned critical issue remains; product, method and governance owners have recorded the relevant decisions; a pilot user can complete the journey without developer intervention. Approval for a synthetic-data pilot does not authorise live client evidence.

**Requirements:** All accepted first-slice requirements and applicable security/UI requirements.

## Cross-sprint acceptance scenarios

| Scenario | First exercised | Full acceptance by |
| --- | --- | --- |
| Reference-shaped synthetic client with several roles and themes | Sprint 1 | Sprint 6 |
| Different synthetic client with changed context, roles, themes and questions | Sprint 2 | Sprint 6 |
| Missing, duplicate and malformed input, plus interrupted import | Sprint 3 | Sprint 7 |
| Sparse and conflicting evidence; draft edited or rejected | Sprint 5 | Sprint 7 |
| Restricted source access, unauthorised export and approval reversal | Sprint 3 | Sprint 7 |
| Keyboard, screen-reader, zoom and responsive consultant journey | Sprint 1 | Sprint 7 |

## How to turn a sprint into build tickets

Before starting a sprint, the technical lead and product owner break its work into small, independently reviewable tickets. Each ticket names the user outcome, accepted requirement IDs, exact behaviour and error states, data class, design link, test examples, owner and demonstration. The selected stack and approved contracts should then drive file-level implementation plans. Do not fill those plans with guessed schemas, AI providers, heatmap thresholds or permissions.

At sprint review, record what was demonstrated, test evidence, user feedback, changed decisions, remaining risks and the next sprint's scope. Update the [requirements register](requirements-register.md) and [decision log](decision-log.md) rather than treating this plan as immutable.
