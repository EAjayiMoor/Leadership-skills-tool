# First-slice product blueprint

Status: proposed for product and assessment-team review, 24 October 2026. This blueprint translates the product owner's direction into a demonstrable web application journey. It is a scope proposal, not approval to process live client data or to automate professional judgement.

## Goal

Turn the current manual leadership assessment workflow into one connected application. It should automate repeatable preparation, ingestion, organisation, drafting and report assembly; use AI where it adds useful, evidence-grounded intelligence; and let an assessor inspect, edit or reject sensitive interpretations before publication. The supplied manual examples inform the workflow but do not define the product's rules.

The first demonstration should work for a reference-shaped synthetic assessment **and** additional synthetic client scenarios with different roles, themes and evidence quality. This tests whether the workflow is reusable rather than a hard-coded recreation of one engagement. In this blueprint, a **profile** means the example client's scenario context; it is not a generated profile of an assessed leader.

## Primary user and outcome

The working primary user is an assessment consultant or lead. In the first slice, they can start an engagement, bring in agreed sample data, progress through the assessment, review system-prepared drafts, and produce an approved cohort report without manually reconstructing the same information across several files. A client sponsor receives only content approved for sharing. This user and review model must be validated with the assessment team.

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

1. **Reference-shaped case:** A wholly synthetic client scenario based on the supplied process, with several roles, tailored questions, survey and interview evidence, thematic findings and a reviewed report.
2. **Different context:** A new synthetic client scenario with a changed organisation or sector, theme set and role-specific questions, configured without code changes. The same journey should produce a distinct, appropriate report.
3. **Incomplete or conflicting evidence:** Missing role context, unanswered questions and contradictory inputs. The app should flag limitations, avoid unsupported conclusions and let the assessor correct the record.
4. **Review and access:** A draft recommendation is rejected or edited; a client-facing role cannot see restricted source evidence or unapproved outputs.

All scenarios use synthetic or expressly approved anonymised data. The supplied individual reports and thematic workbook are process references, not public test fixtures.

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

## Decisions needed before design is complete

- Define the client scenario profile fields and whether the app generates a draft scenario or starts from prepared synthetic examples. Keep invented scenario facts clearly labelled as synthetic.
- Select first input and export formats, sample schemas and report template.
- Agree the assessment and heatmap interpretation method, including uncertainty and evidence support.
- Approve role permissions for raw evidence, interview briefs, analysis drafts and final reports.
- Choose the web stack, data/AI processing boundaries, evaluation approach and release environment.
- Set owners, manual baseline and measurable thresholds for usefulness and time saved.

These are recorded in the [decision log](decision-log.md). The [Plan stage](sdlc/01-plan.md) should review this blueprint with assessment users before it becomes a build commitment.
