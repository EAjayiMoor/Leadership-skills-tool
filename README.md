# Leadership Assessment Product

This repository is the working home for a consultant-led leadership assessment product. The first product slice should let an assessment team configure an engagement, ingest approved evidence, prepare interviews, develop traceable cohort findings, and produce a reviewed report.

The [redacted source requirements](docs/source/Leadership_Assessment_Product_Requirements_redacted.docx) are included in this public repository; the named original is held by the product owner outside it. They are a draft derived from a meeting transcript. A statement marked “confirmed” was discussed in the meeting; it is not automatically approved for development. The [Moorhouse UI standard](docs/standards/Moorhouse-UI-Standard.md) is also included as the design reference. See the [source note](docs/source/README.md) for the publication boundary.

## AI-assisted delivery lifecycle

Start with the [operating model](docs/sdlc/00-operating-model.md) for source hierarchy, AI controls, accountability and evidence rules. These stage files are working checklists. They become release-ready only when the open decisions and stage evidence are filled in.

| Stage | Working file | Exit evidence |
| --- | --- | --- |
| 1 Plan | [01-plan.md](docs/sdlc/01-plan.md) | Product brief, users, outcomes, first slice, decision owners |
| 2 Design | [02-design.md](docs/sdlc/02-design.md) | Journeys, evidence model, assessment method, permissions, architecture |
| 3 Build | [03-build.md](docs/sdlc/03-build.md) | Small reviewed increments tied to requirements |
| 4 Test | [04-test.md](docs/sdlc/04-test.md) | Functional, usability, security and end-to-end evidence |
| 5 Deploy | [05-deploy.md](docs/sdlc/05-deploy.md) | Release decision, rollback and data-use approval |
| 6 Maintain | [06-maintain.md](docs/sdlc/06-maintain.md) | Monitoring, feedback, fixes and improvement decisions |

Read [AGENTS.md](AGENTS.md) before AI-assisted work. Track unresolved choices in [decision-log.md](docs/decision-log.md), proposed requirements in [requirements-register.md](docs/requirements-register.md), and skill coverage in [skill-audit.md](docs/skill-audit.md).

The [manual-workflow observations](docs/manual-workflow-observations.md) record what was learned from supplied completed reports and a thematic workbook. Those identifying source files are deliberately kept outside this public repository.

## Current status

The repository is at **Plan**. The first interface is web-first; its framework has not been chosen. The UI standard's Next.js, Tailwind and component examples are implementation references, not a stack decision. No production architecture, hosting arrangement, heatmap method, or live-client-data processing has been approved. The first prototype should use approved anonymised or synthetic examples.
