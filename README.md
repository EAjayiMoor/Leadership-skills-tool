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
Track the current system shape and dated implementation decisions in the [architecture notes](docs/architecture.md).

The [first-slice blueprint](docs/first-slice-blueprint.md) describes the product-owner-confirmed automated assessment journey and its synthetic test scenarios. Test the journey with assessment users as the screens and build tasks take shape.

The [sprint plan](docs/build-sprint-plan.md) sequences that journey from build decisions through a limited synthetic-data pilot, with a demonstrable outcome and acceptance criteria for each sprint. Sprint dates and capacity remain to be agreed.

The [manual-workflow context](docs/manual-workflow-observations.md) records how supplied completed reports and a thematic workbook help us understand the current process. They do not define product rules. The identifying source files are kept outside this public repository.

## Current status

The synthetic demo is live on Azure: [Open the assessment workspace](https://leadership-assessment-demo.azurewebsites.net). Anyone with the link can open it. Saved drafts stay in each browser; localhost drafts do not transfer to this address. Use fictional information only. See the [release evidence](docs/evidence/azure-demo-release.md) and [deployment guide](docs/deployment/azure.md).

The prototype uses Next.js, React and the App Router. It includes three synthetic scenarios, stage navigation, light/dark themes and setup, evidence and report views. A connected synthetic demo runs from profile/question review through prepared evidence, sample interviews, accepted findings/recommendations and a reviewed report preview. Real processing, production controls and user acceptance remain outstanding. See the [connected-demo evidence](docs/evidence/connected-demo.md), [intake integration evidence](docs/evidence/profile-intake.md), [UI evidence](docs/evidence/sprint-1-ui.md) and [architecture notes](docs/architecture.md).

Synthetic company profiles and reviewed question drafts can be created, explicitly saved, reopened and deleted in this browser. Theme preference is also saved. Saved assessments can load explicit fictional evidence packs and progress through sample interview preparation, reviewed findings and recommendations to a reviewed report preview. The original fixture screens remain separate. Production storage, live-data hosting controls, assessment method and live-client-data use remain open.

## Run locally

Tested with Node.js 24.18.0 and npm 12.0.2. From the repository root:

```powershell
npm ci
npm run dev
```

Open [the local workspace](http://127.0.0.1:3000). Use the theme menu to choose System, Light or Dark. Open any synthetic scenario, then use the stage panel to explore the screens. Use New assessment to enter a blank profile, or open a synthetic scenario’s Set up stage to inspect its prerequisites. Save draft stores the configuration on this browser only; reopen it from the home page. Question drafting uses labelled example templates with consultant review. For the connected demo, select Set up demo assessment from a scenario, review/save questions, continue to evidence and choose Load demo evidence. Review the evidence, prepare and accept illustrative findings, prepare and accept recommendations, then review the report preview. Changes save locally. Real report approval, export and publication remain unavailable.

The [design gallery](http://127.0.0.1:3000/gallery) is an unlisted development reference for components and visual states. It is outside the assessment workflow and has no home-page or navigation links; direct access is not access-controlled.

## Check the UI

```powershell
npm run lint
npm run typecheck
npm run build
npx playwright install chromium --only-shell
npm test
```

Browser checks run against the production build on port 3100; Playwright starts the server automatically. Build after application changes before running the suite. A prestarted server can be used through the optional `PLAYWRIGHT_TEST_BASE_URL` environment variable. Chromium is the current automated browser gate; cross-browser and assistive-technology review remain outstanding.

With the development server running, `npm run capture:ui` captures the four main screens in both themes and mobile views under a new run directory in `docs/evidence/sprint-1/`. `UI_BASE_URL` can point capture at a production server, and `UI_CAPTURE_DIR` can select a named evidence directory.

CI in `.github/workflows/checks.yml` builds and tests the Linux standalone package before uploading the Azure ZIP artifact. [Release CI passed](https://github.com/EAjayiMoor/Leadership-skills-tool/actions/runs/41075846513). Azure hosting covers the synthetic demo only; live-data release remains open.

Connected-demo scope, verification and limitations: [evidence](docs/evidence/connected-demo.md). File uploads, AI drafting and live-data permissions are deferred.

## Run the connected demo

1. Open a scenario from the home page and choose **Set up demo assessment**.
2. Inspect the prefilled profile, choose **Review sample questions**, confirm the question review, use the set in the scenario and **Save draft**.
3. **Continue to evidence**, then **Load demo evidence**. Inspect the captured question/source details and **Confirm evidence review**.
4. Explore the sample interview stages if useful, then continue to findings. **Prepare demo findings** creates blank claim drafts. Open **Compare sources**, read passages across topics and roles, and mark each useful passage as supporting, qualifying, contradicting or context. Write the claim, scope, differing-evidence summary and limitations, then explicitly accept or reject it.
5. Continue to recommendations and prepare a blank draft for each accepted finding. Write the action, rationale and intended outcome, with an optional follow-up check. Accept or reject the recommendation separately. If no action is justified, record the reason and **Confirm no recommendation** instead.
6. **Preview report**, inspect the accepted cohort text and confirm demo report review. Reload to show the saved state; edit a finding to demonstrate review invalidation.

This walkthrough is intentionally synthetic. Source links open the exact passage; report export stays disabled.

For a lean **pharma demo**, follow steps 1–3, continue directly to findings and choose **Use pharma worked example**. Inspect the prepared finding and **Accept finding**, continue to the already filled recommendation and **Accept recommendation**, then **Preview report** and **Confirm demo report review**. No finding or recommendation typing is needed. Existing edits require confirmation before replacement. This shortcut needs the original Decision clarity question and its prepared pharma evidence. [Design and evidence](docs/evidence/demo-worked-example.md).

Sprint 6 adds consultant-guided synthesis under D-21: the consultant writes and reviews the interpretation, with source comparison and required review fields. It does not call an AI model or infer scores. Existing saved demo records remain readable. See the [Sprint 6 evidence](docs/evidence/sprint-6-guided-synthesis.md) for checks and remaining limits.
