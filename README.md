# Leadership Assessment Product

This repository is the working home for a consultant-led leadership assessment product. The first product slice should let an assessment team configure an engagement, ingest approved evidence, prepare interviews, develop traceable cohort findings, and produce a reviewed report.

The source requirements are in `Leadership_Assessment_Product_Requirements.docx` (held outside this repository). They are a draft derived from a meeting transcript. A statement in that document marked “confirmed” was discussed in the meeting; it is not automatically approved for development. The stage documents below turn that source into explicit decisions and evidence gates.

## AI-assisted delivery lifecycle

| Stage | Working file | Exit evidence |
| --- | --- | --- |
| 1 Plan | [01-plan.md](docs/sdlc/01-plan.md) | Product brief, users, outcomes, first slice, decision owners |
| 2 Design | [02-design.md](docs/sdlc/02-design.md) | Journeys, evidence model, assessment method, permissions, architecture |
| 3 Build | [03-build.md](docs/sdlc/03-build.md) | Small reviewed increments tied to requirements |
| 4 Test | [04-test.md](docs/sdlc/04-test.md) | Functional, usability, security and end-to-end evidence |
| 5 Deploy | [05-deploy.md](docs/sdlc/05-deploy.md) | Release decision, rollback and data-use approval |
| 6 Maintain | [06-maintain.md](docs/sdlc/06-maintain.md) | Monitoring, feedback, fixes and improvement decisions |

Read [AGENTS.md](AGENTS.md) before AI-assisted work. Track unresolved choices in [decision-log.md](docs/decision-log.md), proposed requirements in [requirements-register.md](docs/requirements-register.md), and skill sources in [skills.md](docs/skills.md).

## Current status

The repository is at **Plan**. The first interface is web-first; its framework has not been chosen. No production architecture, hosting arrangement, scoring method, or live-client-data processing has been approved. The first prototype should use approved anonymised or synthetic examples.
