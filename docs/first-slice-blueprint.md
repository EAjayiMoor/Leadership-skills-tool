# First-slice product blueprint

Status: high-level product flow confirmed by the product owner on 24 October 2026; detailed implementation choices remain for the relevant sprints. This blueprint translates that direction into a demonstrable web application journey. It is not approval to process live client data or to automate professional judgement.

## Goal

Turn the current manual leadership assessment workflow into one connected application. It should automate repeatable preparation, ingestion, organisation, drafting and report assembly; use AI where it adds useful, evidence-grounded intelligence; and let an assessor inspect, edit or reject sensitive interpretations before publication. The supplied manual examples inform the workflow but do not define the product's rules.

The first demonstration should work for a reference-shaped synthetic assessment **and** additional synthetic client scenarios with different roles, themes and evidence quality. This tests whether the workflow is reusable rather than a hard-coded recreation of one engagement. In this blueprint, a **profile** means the example client's scenario context; it is not a generated profile of an assessed leader.

## Primary user and outcome

The intended primary user is an assessment consultant or lead; the user confirmed they fill this role on 25 October 2026. The target first slice will let them start an engagement, bring in agreed sample data, progress through the assessment, review system-prepared drafts, and produce an approved cohort report without manually reconstructing the same information across several files. A client sponsor receives only content approved for sharing. The outline-level walkthrough is recorded below; acceptance of implemented screens and later review behavior remains outstanding.

## One complete demonstration journey

| Step | Application behaviour in the first slice | Human control and evidence | Related draft requirements |
| --- | --- | --- | --- |
| 1. Set up | Create or edit a synthetic client scenario profile describing context, assessment purpose, participant groups and relevant themes. Use it to configure role-specific question sets and show missing inputs. | Consultant checks the scenario and configuration; AI suggestions must not invent facts about a real client. | FR-01–06 |
| 2. Ingest and organise | Accept agreed sample survey, interview and role-context inputs; extract fields, flag missing/unsupported content and organise source items by engagement and theme. | User resolves mapping errors and can inspect the original source behind each extracted item. | FR-07–12, SEC-02–04 |
| 3. Prepare interviews | Assemble an interview brief from permitted survey responses and role context; suggest focus areas and editable questions informed by the client scenario. | Suggested questions and factual briefing statements show their source or basis and remain drafts until reviewed. | FR-13–17 |
| 4. Capture interview evidence | Record or import interview questions, notes and responses against the right engagement and participant record. | Consultant can correct attribution and restrict access to individual material. Automatic transcription is outside this slice. | FR-16, SEC-02–04 |
| 5. Analyse and synthesise | Organise evidence by agreed themes and propose draft cohort findings, uncertainty notes and a heatmap only if its method has been approved. | Assessor checks every material claim against evidence; can edit, reject or withhold it. No automatic individual score, ranking or employment recommendation. | FR-18–21 |
| 6. Recommend | Draft possible recommendations and a light forward plan linked to approved findings. | Assessor reviews relevance and wording; recommendations are not published automatically. | FR-23, FR-24, FR-26 |
| 7. Report and approve | Assemble an editable draft report from approved findings and recommendations; show review state and export an approved version. | Publication requires an authorised reviewer. Raw individual evidence does not appear in the client-facing output by default. | FR-22, FR-26, SEC-05, SEC-08 |

This is a **thin end-to-end slice**: one usable path through every important stage, with validation and review at risky boundaries. It does not imply every possible input format, integration, template or AI capability is included in the first build.

## Demonstration and test scenarios

### Profile intake direction

On 25 October 2026, the user as product decision co-owner and intended consultant confirmed that these proposed intake groups broadly match the information gathered before the original survey:

- Assessment purpose: why now, what the client wants to understand and the decisions the assessment should inform.
- Company context: sector, scale, locations, structure and significant changes underway.
- Leadership scope: functions, levels, role responsibilities and participant groups.
- Assessment focus: any existing leadership framework, agreed themes and questions the client wants explored.
- Available material: role descriptions, background documents, existing questionnaires and other relevant evidence.
- Engagement expectations: timeline, intended audience and question/finding reviewers.

The agreed direction is a blank guided form for a new assessment, with captured inputs that can be saved and resumed. The three synthetic example scenarios should show completed versions of that same intake. The company/engagement profile informs proposed assessment focus and survey questions; each draft question should expose its profile basis and remain subject to consultant review before use.

The recorded case-study workflow supports role context, themed survey material and tailored interview preparation. The structured intake above is a product proposal validated through this conversation, not a claim that the source documents contain an identical form. The accepted interactive design and 26 October integration define the six sections, required context/outcome/roles and stale question snapshot review. The real question-drafting method remains open. A consistent core set plus context-specific questions is the current recommendation; sources and approval of any core question bank remain open. All prototype material stays synthetic.

The user accepted the mockup and requested integration on 26 October 2026, bringing this focused Sprint 2/3 increment forward. The setup screen now uses the shared editable intake; see [integration evidence](evidence/profile-intake.md). This does not complete either sprint.

### Example and acceptance cases

1. **Reference-shaped case:** A wholly synthetic client scenario shaped around the shared process, with several roles, tailored questions, survey and interview evidence, thematic findings and a reviewed report. Do not copy records from the supplied reports or workbook.
2. **Large pharma:** A synthetic client scenario in a large pharmaceutical organisation, with its own role groups, themes and role-specific questions, configured without code changes.
3. **Energy and utilities:** A synthetic client scenario in the energy and utilities sector, with a meaningfully different context, role groups, themes and questions, configured without code changes.
4. **Incomplete or conflicting evidence:** Missing role context, unanswered questions and contradictory inputs. The app should flag limitations, avoid unsupported conclusions and let the assessor correct the record.
5. **Review and access:** A draft recommendation is rejected or edited; a client-facing role cannot see restricted source evidence or unapproved outputs.

All scenarios use synthetic or expressly approved anonymised data. The supplied individual reports and thematic workbook are process references, not public test fixtures.

### Consultant walkthrough

On 25 October 2026, the intended consultant reviewed the proposed journey and the reference-shaped, large pharma, and energy and utilities scenario outlines in the project conversation and confirmed they were aligned. This is outline-level validation; usability of implemented screens and the assessment method remain to be validated.

## What success should demonstrate

- A consultant completes the full journey in one application, with visible progress and recoverable errors.
- Themes, role groups and question sets can change for another scenario without code edits.
- Extracted facts and generated drafts retain links to permitted source evidence; unsupported claims are flagged or omitted.
- The assessor can accept, edit, reject and trace each material interpretation; nothing client-facing is published without approval.
- The application produces a coherent, reviewable report and linked recommendations for each scenario.
- Time spent on setup, interview preparation, synthesis and report preparation is measured against the current manual baseline. Numeric improvement targets follow that baseline and user testing.
- Assessment owners judge the generated drafts useful and faithful to the evidence. Record corrections and failure cases, not just successful examples.

## Explicit exclusions for the first build

Live client evidence, native survey distribution and reminders, automatic transcription, enterprise integrations, cross-client benchmarking, learning-management workflows, automatic individual scores/rankings, employment recommendations and automatic external publication. These can be reconsidered through the decision log after the first slice is tested.

## Decisions at the point they are needed

- Before Sprint 1: record the selected Next.js/React stack, safe synthetic scenario outlines, priority UI screens and product/technical owners.
- Before configuration and ingestion: define the client scenario fields, first input formats and sample schemas. Keep invented scenario facts clearly labelled as synthetic.
- Before restricted evidence or generated drafts: agree role access, permitted AI inputs, review actions and evaluation examples.
- Before thematic synthesis: agree how evidence supports a cohort finding and how uncertainty is shown. Define heatmap rules only if a heatmap is included.
- Before reporting and release: agree the report format, release environment, manual baseline and useful measures of time saved and correction effort.

Record these in the [decision log](decision-log.md) when each feature is planned. The [Plan stage](sdlc/01-plan.md) should test the confirmed journey with assessment users; it does not need to settle later feature details before UI work begins.

## Connected-demo update

D-19 prioritises one complete synthetic demonstration: profile → reviewed questions → explicit prepared evidence → evidence review → sample cohort findings → recommendations → reviewed report preview. Example interview preparation and notes are available in the existing stage navigation. Actual upload formats, real drafting/AI, methods and production permission controls remain separate decisions. [Design and evidence](evidence/connected-demo.md).
