# Sprint plan for the first web product

Status: proposed build sequence, 24 October 2026. This turns the [first-slice blueprint](first-slice-blueprint.md) into reviewable increments. Sprint numbers show order, not promised dates or team capacity. Confirm owners, estimates and the release target at Sprint 0. The repository is still in Plan; an item below is not an approved assessment method or permission to use live client data.

## Outcome and working rules

Build one connected web journey: create a **synthetic client scenario profile**, configure an assessment, ingest evidence, prepare and capture interviews, draft cohort findings and recommendations, then review and export a report. Demonstrate it with a wholly synthetic case shaped around the shared workflow plus two synthetic sector scenarios: large pharma and energy and utilities. “Profile” here means client scenario context, not an assessed-leader profile. Shared reports and workbook are process references, not prototype fixtures.

Each sprint ends with a runnable demonstration, acceptance results, reviewed changes and updated requirement, decision and [architecture records](architecture.md) where applicable. Use source-linked drafts and explicit human review. Keep the identifying manual examples and live client evidence outside the public repository. The [SDLC stage files](sdlc/00-operating-model.md) remain the gates for Plan, Design, Build, Test, Deploy and Maintain.

## Skill activation and validation in every sprint

Skills are instructions used **when their task begins**, not a one-off setup activity or proof that the result works. Before a ticket is built, the owner reads its linked skill and relevant product/design rules. The selected skill, why it applies, and any unavailable tool are recorded on the ticket. The [skill strategy](skills.md) and [skill audit](skill-audit.md) distinguish installed skills from proposed additions and executable tools.

1. **Shape the ticket:** Use [brainstorming](../.agents/skills/brainstorming/SKILL.md) for unresolved user or design choices, then [writing-plans](../.agents/skills/writing-plans/SKILL.md) for an implementation plan once the specification and stack are settled. Link requirement IDs, acceptance examples, design, data class and owner.
2. **Build and check the change:** Use [test-driven-development](../.agents/skills/test-driven-development/SKILL.md) for behaviour with meaningful rules or failure cases. Use [systematic-debugging](../.agents/skills/systematic-debugging/SKILL.md) when a check fails. Run the relevant unit, integration, browser, accessibility or method checks as part of the sprint that adds the behaviour.
3. **Review and verify:** Use [requesting-code-review](../.agents/skills/requesting-code-review/SKILL.md), [receiving-code-review](../.agents/skills/receiving-code-review/SKILL.md) and [verification-before-completion](../.agents/skills/verification-before-completion/SKILL.md) before claiming a ticket is done. Record actual results; an AI-generated test or review is not acceptance evidence until run and inspected.
4. **Demonstrate with people:** The product owner checks user outcome; the assessment-method owner checks interpretations; the design owner checks interface quality; the governance owner checks access and data boundaries where affected. Log defects, corrections and decisions before taking the next sprint's scope.

For **UI tickets from Sprint 1 onward**, first read the [Moorhouse UI standard](standards/Moorhouse-UI-Standard.md) and approved screen designs. With Next.js and React selected, activate [Vercel React best practices](../.agents/skills/react-best-practices/SKILL.md) while writing and reviewing components, data fetching and performance. It does not cover usability, visual fidelity, accessibility or security: check those separately against the [Design](sdlc/02-design.md) and [Test](sdlc/04-test.md) criteria. Expo skills stay inactive unless an Expo client is actually commissioned.

For **browser flows**, choose and install the agreed web runner before the first executable UI flow; it is not installed merely because a skill exists. Playwright remains the working recommendation for cross-browser checks. Activate the installed [Maestro flow-testing skill](../.agents/skills/maestro-flow-testing/SKILL.md) only for an optional browser pilot after the app runs, or for a later mobile app; do not use a passing Maestro flow as proof of accessibility, method or data security. Add a Playwright-specific skill if the team adopts that workflow and verify skill discovery from a task opened at this repository root.

## Sprint 0 — Set up the first build

**Goal:** Make enough decisions to start the UI sprint with confidence. Detailed decisions are made before the feature that needs them, not all at once.

**Work:** Confirm the consultant as the first user. Amy Wilkinson and the user share product decision ownership, and the user is technical owner, as confirmed on 25 October 2026. The prototype will run on a local Next.js development server using the App Router. Develop the reference-shaped synthetic case and the large pharma and energy and utilities scenario outlines. Confirm the small set of screens to prototype and which synthetic sample material it will use. Use simple success checks: can a consultant complete the journey, correct drafts, and compare task time with the current process? The user will perform these consultant checks. Record who will approve evidence interpretation and data access when those features are built.

**Done when:** The owners, web stack, prototype environment, three safe synthetic scenario outlines, priority UI screens and simple success checks are recorded. Sprint 1 can begin without guessing. Exact import formats, permissions, AI processing, report format and heatmap rules are decided before the sprints that implement them. Live client data stays out of the prototype until separately approved.

**Validation:** The intended consultant reviewed the proposed journey and three scenario outlines on 25 October 2026 and confirmed alignment. This completes outline-level validation. Check that all prototype material is synthetic and safe for the public repository. Observe the consultant using the implemented screens in Sprint 1 and record usability feedback and any workflow changes.

**Skills at this point:** Use [brainstorming](../.agents/skills/brainstorming/SKILL.md) for the UI and workflow choices and [writing-plans](../.agents/skills/writing-plans/SKILL.md) to prepare Sprint 1 tasks. Verify that a repo-root Codex task discovers these skills. No assessment-method or AI-evaluation skill is needed yet.

## Sprint 1 — UI look, feel and design system

Implementation status, 25 October 2026: local UI prototype available, with [checks and screenshots](evidence/sprint-1-ui.md). The intended consultant's review of the running screens and the remaining manual accessibility checks are outstanding; Sprint 1 is not yet marked accepted.

**Goal:** Establish a recognisable, usable visual foundation before building the full workflow.

**Work:** Translate the [Moorhouse UI standard](standards/Moorhouse-UI-Standard.md) into the selected web stack: colour and semantic tokens, typography, spacing, buttons, forms, navigation, status, tables/cards and review states. Include both light and dark modes, following the standard's system-preference default and manual selection. Produce a runnable design gallery and realistic screen prototypes for the consultant home, client scenario setup, evidence review and report approval using synthetic content. Set the information hierarchy, tone of voice, density and responsive behaviour. Inventory missing brand assets and decide how the standard's other open items apply to this first release. Record approved exceptions rather than silently changing the standard.

**Done when:** Product/design owners approve the visual direction and key screen patterns; consultants can identify the next action, distinguish draft from approved content, and read dense evidence views without confusion. The shared tokens and components are ready for use in Sprint 2; unfinished screens are labelled as prototypes.

**Validation:** Compare both themes at desktop and narrow widths. Check colour contrast, keyboard focus, labels, zoom/reflow and reduced-motion behaviour; inspect key states visually, including empty, loading, error and approval. Observe intended consultants completing short tasks in the prototypes and record changes made from their feedback. Automated accessibility checks supplement manual checks.

**Skills at this point:** Use [brainstorming](../.agents/skills/brainstorming/SKILL.md) to explore screen alternatives and [writing-plans](../.agents/skills/writing-plans/SKILL.md) for the component implementation plan. With Next.js and React selected, activate [Vercel React best practices](../.agents/skills/react-best-practices/SKILL.md) while coding and reviewing components. Use [requesting-code-review](../.agents/skills/requesting-code-review/SKILL.md) and [verification-before-completion](../.agents/skills/verification-before-completion/SKILL.md) before accepting the gallery. The UI standard and accessibility checks remain the visual and usability authority; the React skill is performance guidance.

**Requirements:** UI-01–03; visual and interaction groundwork for FR-01–06, FR-10–12, FR-20–22 and SEC-08.

## Sprint 2 — A navigable assessment journey

**Goal:** A consultant can see the entire workflow and its review boundaries in one web app.

**Work:** Extend the Sprint 1 app and shared components into engagement navigation and states for setup, ingestion, interview preparation, evidence, findings, recommendations and report approval. Add repeatable checks and a synthetic demonstration fixture. Show draft versus approved content and block export until approval. Persist enough state to resume the demonstration. Mark unfinished functions clearly in the interface.

**Done when:** A user can move through the seven stages with the synthetic fixture, recover after a reload, and cannot mistake demonstration placeholders for completed analysis. Keyboard navigation, labels and visible focus work in the new screens. The build and agreed checks pass. This is a workflow skeleton, not a claim that assessment analysis is implemented.

**Validation:** Run build, static checks and a browser smoke flow for navigation, reload and blocked export. Manually inspect the UI against the supplied standard at desktop and narrow widths; check keyboard order, focus, labels and the draft/approved distinction. A consultant confirms the stage names and workflow make sense.

**Skills at this point:** Activate the UI standard and [Vercel React best practices](../.agents/skills/react-best-practices/SKILL.md) for component and data-loading work. Use [test-driven-development](../.agents/skills/test-driven-development/SKILL.md) for approval-state rules and [verification-before-completion](../.agents/skills/verification-before-completion/SKILL.md) at review. Set up the agreed browser runner now; Maestro is optional for a pilot flow.

**Requirements:** FR-01, FR-04, FR-06, SEC-08, UI-01, UI-02.

## Sprint 3 — Configure different client scenarios

**Goal:** A consultant can configure each of the three synthetic scenarios without code changes.

**Work:** Add editable client scenario context, assessment purpose, participant groups, themes and role-specific question sets. Validate missing required inputs and show what remains to be completed. Version configuration changes that affect later drafts.

**Done when:** The three synthetic scenarios have meaningfully different organisation contexts, role groups, themes and questions; each can be saved, reopened and edited. Missing fields are explained. Existing evidence and drafts are not silently reassigned when configuration changes.

**Validation:** Test required-field and versioning rules, save/reopen behaviour, and both sector scenarios without code edits. Run a browser flow for setup and editing; observe a consultant completing it. Check form labels, errors, focus movement and responsive layout.

**Skills at this point:** Use [test-driven-development](../.agents/skills/test-driven-development/SKILL.md) for configuration/versioning rules; use the UI standard and Vercel React skill for forms. Use [systematic-debugging](../.agents/skills/systematic-debugging/SKILL.md) for failed scenario changes rather than patching symptoms.

**Requirements:** FR-01–06.

## Sprint 4 — Ingest and trace evidence

**Goal:** Source material enters the application reliably and remains inspectable.

**Work:** Implement the agreed first import formats for survey responses, interview material and role context. Validate schema and attribution; show a preview and correction path; store source identifiers and links from extracted items back to permitted source records. Handle duplicate, malformed, incomplete and interrupted imports. Enforce engagement separation and restricted raw-evidence access in the prototype roles.

**Done when:** All three scenarios import their sample inputs; a consultant can inspect and correct mappings; invalid records do not disappear silently; cross-engagement or client-facing access to raw evidence is denied. Provenance survives save and reload.

**Validation:** Exercise valid, missing, malformed, duplicate, oversized and interrupted inputs; check source attribution, retry and correction. Test role and engagement boundaries through API/direct URL as well as the visible interface. Inspect logs and test artefacts for restricted content. Run the import browser flow and a manual usability check of preview/error states.

**Skills at this point:** Use [test-driven-development](../.agents/skills/test-driven-development/SKILL.md) for parsing, attribution and access rules, then [requesting-code-review](../.agents/skills/requesting-code-review/SKILL.md) with a security/provenance focus. Create a focused sensitive-evidence review skill only after the approved role and data model exists; it supplements, not replaces, these tests.

**Requirements:** FR-07–12, SEC-02–04.

## Sprint 5 — Prepare and capture interviews

**Goal:** The app reduces repeated manual interview preparation and keeps completed evidence connected.

**Work:** Assemble an editable interview brief from permitted survey responses and role context. Suggest focus areas and questions based on the configured scenario, with the basis shown. Capture or import interview notes/responses and correct attribution. Require review before suggested questions are used.

**Done when:** A consultant prepares a brief for more than one role, edits or rejects suggested questions, records interview evidence, and can trace factual statements to their sources. Missing source material produces a limitation, not invented detail.

**Validation:** Compare the brief with permitted source items; test missing and contradictory responses, reviewer edits/rejections, attribution corrections and restricted access. Run a prepare-and-capture browser journey with two roles. Have an assessor judge whether suggestions are usable and whether unsupported statements are absent.

**Skills at this point:** Use [test-driven-development](../.agents/skills/test-driven-development/SKILL.md) for source selection and review-state rules; use the UI standard and Vercel React skill for briefing and editing screens. If AI produces suggestions, activate a product-specific AI-output-evaluation skill only after its approved inputs, outputs and labelled examples are defined; record model/prompt versions and failures.

**Requirements:** FR-13–17, SEC-02–04.

## Sprint 6 — Draft findings and recommendations

**Goal:** Turn collected evidence into useful, reviewable cohort-level synthesis.

**Work:** Organise evidence by configured theme; propose cohort findings with supporting and contrary evidence, uncertainty and an explicit draft state. Add assessor accept/edit/reject actions and audit events. Draft recommendations and a light forward plan linked to accepted findings. Add a heatmap only if D-04 has an approved method and worked test cases; otherwise use a labelled thematic findings view.

**Done when:** The reference-shaped, large pharma and energy and utilities scenarios produce distinct drafts. Each substantive cohort finding synthesizes evidence across configured themes and roles, cites supporting and contrary sources, surfaces gaps or conflicts, and states uncertainty and limits; a template that merely repeats a topic does not meet acceptance. Each recommendation is practical, traces to an accepted finding, and states its rationale and intended outcome. Every material claim can be inspected against its sources; rejected drafts cannot flow to the report. A named assessment-method owner reviews worked examples, including corroborating, differing, sparse and unsupported evidence, and records useful and failed outputs before the method is treated as valid. No automatic individual score, ranking or employment recommendation appears. The current synthetic demo is illustrative and does not satisfy this substantive-synthesis acceptance condition. (D-20; FR-18, FR-23.)

**Validation:** Run approved method examples and counterexamples, sparse/conflicting/withdrawn evidence cases, source-link checks and review-state tests. Evaluate AI drafts against a labelled set for support, uncertainty and unsupported claims. The assessment-method owner reviews actual outputs and corrections. If a heatmap is included, test its approved aggregation and display rules separately.

**Skills at this point:** Use an assessment-method skill only if the assessment owner has supplied repeatable rules that warrant one; use [test-driven-development](../.agents/skills/test-driven-development/SKILL.md) for synthesis and state rules and a scoped AI-output-evaluation skill for generated drafts if AI is included. Use [requesting-code-review](../.agents/skills/requesting-code-review/SKILL.md) with evidence, human review and permissions as review focuses.

**Requirements:** FR-18–21, FR-23, FR-24, FR-26, SEC-05. FR-19 is conditional on D-04.

## Sprint 7 — Review, report and controlled export

**Goal:** A reviewer can produce an approved client-facing output from accepted material.

**Work:** Assemble an editable report using the approved template and findings; preserve evidence links internally while keeping raw individual evidence out of the client view by default. Add reviewer identity, revision history, approval and withdrawal states. Export the agreed format and record the export event.

**Done when:** A reviewer can edit, reject, approve, export and withdraw a report; unapproved findings and recommendations stay out; client-facing access shows only the approved output; exports match the reviewed version. The full journey runs for all three synthetic scenarios.

**Validation:** Run browser journeys for approval, rejection, revision, export and withdrawal; compare each export with the exact approved version. Test direct URL/API access, role changes, raw-evidence exclusion, audit history and export failure/retry. Review visual output and accessibility of the approval screen with intended users.

**Skills at this point:** Use [test-driven-development](../.agents/skills/test-driven-development/SKILL.md) for publication and version rules, the UI standard and Vercel React skill for review screens, and [Maestro flow testing](../.agents/skills/maestro-flow-testing/SKILL.md) only if its optional web pilot was chosen. Use [verification-before-completion](../.agents/skills/verification-before-completion/SKILL.md) before claiming the end-to-end journey works.

**Requirements:** FR-21–24, FR-26, SEC-02–05, SEC-08.

## Sprint 8 — Evaluate and release a limited synthetic-data pilot

**Goal:** Prove the first slice is useful, trustworthy and supportable for its stated audience.

**Work:** Run end-to-end, permission, method, accessibility, recovery and AI-output evaluations against the scenarios in the blueprint. Observe consultants using the app; compare task time and correction effort with the Sprint 0 baseline. Fix release-blocking issues; document limitations, support route, monitoring, rollback and the exact permitted data class. Release only to the agreed pilot audience after the [Deploy gate](sdlc/05-deploy.md).

**Done when:** Accepted requirements have linked test evidence; no unowned critical issue remains; product, method and governance owners have recorded the relevant decisions; a pilot user can complete the journey without developer intervention. Approval for a synthetic-data pilot does not authorise live client evidence.

**Validation:** Re-run the complete suite on the exact release candidate across agreed browsers, roles and all three scenarios. Include manual screen-reader/keyboard/zoom checks, method-owner evaluation, misuse and access tests, failure recovery, performance measures and observed consultant tasks. Record failures, fixes and retests in the [Test stage](sdlc/04-test.md); complete the separate release record and rollback rehearsal.

**Skills at this point:** Use [systematic-debugging](../.agents/skills/systematic-debugging/SKILL.md) on failures, [verification-before-completion](../.agents/skills/verification-before-completion/SKILL.md) for every release claim and [finishing-a-development-branch](../.agents/skills/finishing-a-development-branch/SKILL.md) for final integration. Browser flows run through the agreed runner; any Maestro pilot is supplementary. Hosting-specific operational skills can be selected only after the environment is chosen.

**Requirements:** All accepted first-slice requirements and applicable security/UI requirements.

## Cross-sprint acceptance scenarios

| Scenario | First exercised | Full acceptance by |
| --- | --- | --- |
| Reference-shaped synthetic client with several roles and themes | Sprint 2 | Sprint 7 |
| Large pharma synthetic client with tailored roles, themes and questions | Sprint 3 | Sprint 7 |
| Energy and utilities synthetic client with different context, roles, themes and questions | Sprint 3 | Sprint 7 |
| Missing, duplicate and malformed input, plus interrupted import | Sprint 4 | Sprint 8 |
| Sparse and conflicting evidence; draft edited or rejected | Sprint 6 | Sprint 8 |
| Restricted source access, unauthorised export and approval reversal | Sprint 4 | Sprint 8 |
| UI standard, visual direction and accessible key screen patterns | Sprint 1 | Sprint 1; recheck through Sprint 8 |
| Keyboard, screen-reader, zoom and responsive consultant journey | Sprint 1 | Sprint 8 |

## How to turn a sprint into build tickets

Before starting a sprint, the technical lead and product owner break its work into small, independently reviewable tickets. Each ticket names the user outcome, accepted requirement IDs, exact behaviour and error states, data class, design link, test examples, owner, applicable skills and demonstration. The selected stack and approved contracts should then drive file-level implementation plans. Do not fill those plans with guessed schemas, AI providers, heatmap thresholds or permissions.

At sprint review, record what was demonstrated, test evidence, user feedback, changed decisions, remaining risks and the next sprint's scope. Update the [requirements register](requirements-register.md) and [decision log](decision-log.md) rather than treating this plan as immutable.

## 26 October 2026 — Approved intake increment

The user accepted the interactive intake mockup and requested integration. This brings forward the focused Sprint 2 save/resume and Sprint 3 company-profile/question-configuration work; it does not complete either sprint. Scope: FR-01/FR-05, synthetic browser-only drafts, prerequisite examples, exact question/profile links, review invalidation and scenario handoff. No real question bank or AI service is inferred.

Activated skills: brainstorming (approved mockup), writing-plans, executing-plans (native), test-driven-development, Vercel React best practices, systematic-debugging, requesting-code-review and verification-before-completion. Existing feature checkout reused to preserve the app under review. Validation and evidence: [integration record](evidence/profile-intake.md); [design](superpowers/specs/2026-10-26-profile-intake.md); [plan](superpowers/plans/2026-10-26-profile-intake.md). User visual acceptance, cross-browser and assistive-technology review remain outstanding.

Navigation follow-up (26 October 2026): UI-01/UI-02 scroll containment corrected after user review of the integrated intake. The Sprint 1 shared drawer now isolates its scroll from the background page; profile position/width and unlocking are regression checks. Skills, reproduction and verification are linked in [intake evidence](evidence/profile-intake.md#navigation-scroll-correction). No assessment-data or method scope changed.

## 26 October 2026 — Connected synthetic demo

D-19: the product co-owner requested simplicity and approved a complete demonstration using loaded sample evidence. This is a thin demonstration across Sprints 4–7, not completion of ingestion formats, assessment methods, role permissions or release gates. FR-07/08/10–14/16/18/20/23/26 have explicitly scoped demo status in the register.

Skills activated: brainstorming (approved simplified path), writing-plans, executing-plans (native), test-driven-development, Vercel React best practices, requesting-code-review, systematic-debugging and verification-before-completion. Existing feature checkout and dirty work are preserved. Validation: legacy draft compatibility, source/question and assessment isolation, malformed source groups, review gates, edit/reject invalidation, stale configuration, save/reload and failure recovery; complete scenario browser journeys, both themes/narrow screens and independent review. [Design](superpowers/specs/2026-10-26-connected-demo.md), [plan](superpowers/plans/2026-10-26-connected-demo.md), [evidence](evidence/connected-demo.md).

## 27 October 2026 — Sprint 6 synthesis prototype authorization

D-21: the user accepted the evidence-to-finding workflow for a synthetic, consultant-led prototype and will review/approve this prototype method. This authorizes a focused guided-synthesis increment for FR-18/FR-23. It does not authorize live evidence, client-facing validated findings, AI processing, scores or rankings. D-04 heatmap semantics remain open, so the implementation plan excludes the heatmap.

The guided local implementation now provides cross-question/role source comparison, bounded finding fields, structured recommendations and explicit review, including a reasoned decision to make no recommendation. [Implementation evidence](evidence/sprint-6-guided-synthesis.md) records automated checks and review. Human usefulness review of the cases and the wider production Sprint 6 scope remain outstanding.

## 28 October 2026 — Lean worked-example demonstration

D-22: the user approved a one-click synthetic pharma worked example to reduce finding/recommendation typing during a demo. This is a Sprint 6 usability refinement with separate consultant accept actions and source inspection, not completion of the broader analytical engine. [Design and verification](evidence/demo-worked-example.md) cover current-run source matching, replacement protection, retained manual drafts and the no-typing report journey.

Skills activated for planning: brainstorming and writing-plans. Build skills for the implementation ticket: test-driven-development, Vercel React best practices, requesting-code-review and verification-before-completion; systematic-debugging if a check fails. Planned validation and evidence: method cases for cross-theme/role evidence, disagreement, sparse coverage and unsupported claims; source provenance, human review/edit/reject, report inclusion, legacy saved-demo compatibility, keyboard and responsive layout. See [accepted prototype method](superpowers/specs/2026-10-27-sprint-6-evidence-method-proposal.md), [cases and heatmap questions](superpowers/specs/2026-10-27-sprint-6-method-cases.md), and the [implementation plan](superpowers/plans/2026-10-27-sprint-6-guided-synthesis.md).
