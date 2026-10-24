# AI-assisted delivery operating model

This file defines how the six stage files work together. The lifecycle is iterative: a test result, user observation or incident can return work to Plan or Design. A stage is ready to exit only when its evidence is linked and the named owner accepts the remaining risk. Checklists support judgement; they do not confer approval by themselves.

## Source and decision order

1. The current user request and approved product decisions set scope.
2. Accepted items in the [requirements register](../requirements-register.md) define behaviour to implement and verify.
3. The [redacted draft PRD](../source/Leadership_Assessment_Product_Requirements_redacted.docx) supplies context and proposed requirements. “Confirmed” in that document means discussed in the meeting, not approved for development.
4. The [Moorhouse UI standard](../standards/Moorhouse-UI-Standard.md) supplies design guidance for this product. Its references to Next.js, Tailwind, React components and shared packages do not decide the web stack or imply those assets already exist. Record adoption decisions and exceptions.
5. Skills and AI suggestions guide work but are not product authority.

The [skill strategy](../skills.md) maps installed skills to tasks. Choose a skill because the work needs it, then verify the actual code, design or test result against this operating model.

## Minimum record for every work item

- Link the user need, requirement ID, owner and lifecycle stage.
- Define the intended behaviour, excluded behaviour, data classification and acceptance examples before implementation.
- Link design decisions, code change, test evidence and release record when applicable.
- Record assumptions, unresolved questions and any change in scope in the [decision log](../decision-log.md).
- Keep evidence proportionate: a prototype with synthetic data and a live-data release need different depth of review.

## Human accountability and AI controls

- A named product owner accepts scope and user outcomes; an assessment-method owner approves interpretation and heatmap rules; a governance owner approves access and live data use; a technical owner accepts implementation and operations. One person may hold more than one role if explicitly recorded.
- AI may help draft, analyse, implement and test. Its output is a proposal until a person checks it against source evidence and the acceptance examples.
- For AI features in the product, define purpose, permitted inputs, provider and processing boundary, prompt or model version, failure modes, human review, evidence attribution and a labelled evaluation set before release. Do not send live assessment evidence to an unapproved service.
- Do not automate individual scoring, ranking or employment recommendations. A cohort finding or client-facing report requires consultant review and controlled publication.

## Stage gates and records

| Stage | Required decision | Evidence to retain |
| --- | --- | --- |
| [Plan](01-plan.md) | Is the first slice worth building, and for whom? | Validated problem, scope, owners, baseline, risks and accepted requirements |
| [Design](02-design.md) | Is the slice usable, defensible and safe to implement? | Journey, method, data and permission model, UI, architecture and acceptance examples |
| [Build](03-build.md) | Does a reviewed increment implement the accepted design? | Code review, traceability, automated checks and demo |
| [Test](04-test.md) | Does observed evidence support the intended use? | Results, defects, accessibility, security, method and user acceptance evidence |
| [Deploy](05-deploy.md) | Can this exact version be released to this audience and data class? | Release record, approvals, migration and rollback results, monitoring owner |
| [Maintain](06-maintain.md) | Is the product reliable and delivering the intended outcome? | Operational measures, incidents, feedback, retained risks and improvement decisions |

## What remains open

This framework is a complete set of **process prompts and evidence gates for the current Plan phase**, not a claim that all product decisions are complete. Owners, first-slice scope, assessment method, file formats, data permissions, hosting, AI features, success thresholds and the web stack remain open in the decision log. Fill those with evidence before treating the later stages as build or release ready.
