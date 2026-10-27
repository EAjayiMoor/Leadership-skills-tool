# Requirements register

This register summarises the draft PRD without copying its client-specific context into the repository. Every item is **proposed** until a named product or assessment owner accepts it. Update status, owner, design link and verification link as decisions are made.

Status values: proposed, accepted, changed, deferred, rejected. A feature is complete only when its accepted behaviour and evidence are linked here.

| ID | Outcome to decide and verify | Status | Owner | Design / verification |
| --- | --- | --- | --- | --- |
| FR-01 | Configure an assessment for a client and purpose | Implemented locally for synthetic profile save/resume; production configuration pending | Amy Wilkinson and user | D-17; [intake direction](first-slice-blueprint.md#profile-intake-direction); [implementation evidence](evidence/profile-intake.md) |
| FR-02 | Configure themes and question sets | Proposed | TBD | TBD |
| FR-03 | Vary questions by role or participant group | Proposed | TBD | TBD |
| FR-04 | Provide a clear setup and ingestion journey | Proposed | TBD | TBD |
| FR-05 | Use a client profile to inform question selection | Profile-linked illustrative question draft/review implemented; real drafting method pending | Amy Wilkinson and user | D-17; [intake direction](first-slice-blueprint.md#profile-intake-direction); [implementation evidence](evidence/profile-intake.md) |
| FR-06 | Show required inputs, gaps and next steps | Proposed | TBD | TBD |
| FR-07 | Ingest survey questions and responses | Prepared survey-response demo pack implemented; real imports deferred | Amy Wilkinson and user | D-19; [connected demo](evidence/connected-demo.md) |
| FR-08 | Ingest interview questions and responses | Prepared interview-note demo pack implemented; real imports deferred | Amy Wilkinson and user | D-19; [connected demo](evidence/connected-demo.md) |
| FR-09 | Accept necessary role and approved background material | Proposed | TBD | TBD |
| FR-10 | Organise evidence by engagement, source and theme | Demo evidence grouped by assessment, question/source and topic; production controls pending | Amy Wilkinson and user | D-19; [connected demo](evidence/connected-demo.md) |
| FR-11 | Validate imports and explain missing or unsupported fields | Demo/storage validation implemented; file-import validation deferred | Amy Wilkinson and user | D-19; [connected demo](evidence/connected-demo.md) |
| FR-12 | Trace findings to supporting evidence | Illustrative findings cite exact saved sources; real finding method pending | Amy Wilkinson and user | D-19; [connected demo](evidence/connected-demo.md) |
| FR-13 | View survey questions with responses | Captured question and fictional response visible together in demo | Amy Wilkinson and user | D-19; [connected demo](evidence/connected-demo.md) |
| FR-14 | Assemble an interview brief from selected evidence and role context | Prepared interview brief examples with source links; real briefing method pending | Amy Wilkinson and user | D-19; [connected demo](evidence/connected-demo.md) |
| FR-15 | Create and edit tailored interview questions | Proposed | TBD | TBD |
| FR-16 | Record or import interview evidence against the right assessment record | Loaded fictional interview notes inspectable; real capture/import deferred | Amy Wilkinson and user | D-19; [connected demo](evidence/connected-demo.md) |
| FR-17 | Review any suggested interview questions before use | Proposed | TBD | TBD |
| FR-18 | Synthesize evidence across configured themes and roles into meaningful cohort findings; cite supporting and contrary evidence, surface gaps/conflicts, and state uncertainty and limits | Consultant-guided synthetic prototype implemented under D-21; usefulness review and live-evidence validation outstanding. See [implementation evidence](evidence/sprint-6-guided-synthesis.md). | Amy Wilkinson and user; prototype method reviewer/approver: user | D-20/D-21; Sprint 6; [accepted prototype method](superpowers/specs/2026-10-27-sprint-6-evidence-method-proposal.md); [review cases](superpowers/specs/2026-10-27-sprint-6-method-cases.md) |
| FR-19 | Produce a heatmap using an agreed method | Proposed for Sprint 6 design exploration at the user's request; semantics and method remain open; no implementation until D-04 is approved | Product decision owners; assessment-method owner for method approval | D-04; [method cases and heatmap questions](superpowers/specs/2026-10-27-sprint-6-method-cases.md) |
| FR-20 | Review and edit themes before publication | Local demo accept/edit/reject states implemented; publication deferred | Amy Wilkinson and user | D-19; [connected demo](evidence/connected-demo.md) |
| FR-21 | Separate restricted evidence from approved outputs | Proposed | Governance owner | D-06 |
| FR-22 | Support client-specific report templates | Proposed | TBD | TBD |
| FR-23 | Draft practical recommendations linked to accepted findings, with a clear rationale and intended outcome | Consultant-guided synthetic prototype implemented under D-21; usefulness review and live-evidence validation outstanding. See [implementation evidence](evidence/sprint-6-guided-synthesis.md). | Amy Wilkinson and user; prototype method reviewer/approver: user | D-20/D-21; D-08; Sprint 6; [accepted prototype method](superpowers/specs/2026-10-27-sprint-6-evidence-method-proposal.md); [review cases](superpowers/specs/2026-10-27-sprint-6-method-cases.md) |
| FR-24 | Organise recommendations into a forward plan | Proposed; scope open | Product owner | D-08 |
| FR-25 | Add owners, dates and status to actions | Proposed; likely later | Product owner | D-08 |
| FR-26 | Review recommendations before external sharing | Local demo recommendation review implemented; external sharing deferred | Amy Wilkinson and user | D-19; [connected demo](evidence/connected-demo.md) |
| SEC-01 | Agree hosting and data ownership before live evidence | Proposed; live-data gate | Governance owner | D-07 |
| SEC-02 | Restrict access by engagement and role | Proposed | Governance owner | D-06 |
| SEC-03 | Isolate each client's data | Proposed | Governance owner | D-06 |
| SEC-04 | Restrict raw evidence separately from approved reports | Proposed | Governance owner | D-06 |
| SEC-05 | Record material changes, approvals and exports | Proposed | Governance owner | TBD |
| SEC-06 | Agree retention and deletion rules | Proposed | Governance owner | D-07 |
| SEC-07 | Review AI processing before use with client data | Proposed; live-data gate | Governance owner | D-07 |
| SEC-08 | Review before client-facing publication | Proposed | Assessment owner | TBD |
| UI-01 | Apply the supplied Moorhouse visual and content standard to the first web interface | Accepted for Sprint 1 prototype; implemented, visual acceptance pending | Amy Wilkinson and user | [Approved design](superpowers/specs/2026-10-25-sprint-1-ui-design.md); [evidence and exceptions](evidence/sprint-1-ui.md) |
| UI-02 | Support keyboard, screen-reader, zoom, contrast, reduced-motion and responsive use against WCAG 2.2 AA | Accepted target; automated checks implemented, manual assistive-technology and zoom review outstanding | Amy Wilkinson and user | [Evidence](evidence/sprint-1-ui.md); D-12 |
| UI-03 | Validate the standard's tokens and component patterns with target consultants in dense working and decision views | Accepted; outline walkthrough complete, implemented-screen review pending | Amy Wilkinson and user | [Consultant outline review](first-slice-blueprint.md#consultant-walkthrough); [prototype evidence](evidence/sprint-1-ui.md) |

## Cross-cutting product boundaries

- Report at cohort level unless a separately approved use case and method says otherwise.
- Do not automatically score or rank individuals or make employment recommendations.
- Treat generated content as drafts requiring human review.
- Keep prototype examples synthetic or explicitly approved and anonymised.
- Do not infer that de-identifying names alone makes assessment evidence anonymous.

## Review cadence

At the end of Plan, accept or reject the first-slice requirements. At the end of Design, link the accepted requirements to design and test cases. During Build and Test, add verification evidence. On release, record any accepted requirement that remains incomplete and its impact.
