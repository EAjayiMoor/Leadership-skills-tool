# 4 Test

Sprint 1 UI evidence is available in [the local prototype record](../evidence/sprint-1-ui.md): successful build/lint/type checks, two fixture tests, 27 browser cases, screenshots and an independent-review fix pass. Manual screen-reader/zoom review, other browser engines and intended-consultant acceptance remain outstanding. These results do not validate an assessment method or approve live data.

## Purpose

Show that the product works for the real workflow, produces trustworthy outputs and handles sensitive evidence correctly.

## Test layers

- **Traceability:** Map each accepted requirement and important risk to a test, owner and result. Recheck changed requirements and affected flows.
- **Method:** Compare thematic findings and heatmap worked examples against the approved assessment method, including sparse, contradictory and withheld evidence. A method owner reviews the result.
- **Data:** Cover valid, missing, malformed, duplicate, conflicting and oversized imports; verify validation messages, provenance, deletion and safe failure.
- **Workflow:** Run a complete assessment journey with approved sample data, including edit, review, rejection, reapproval and export.
- **Permissions and privacy:** Exercise each role and engagement boundary; check raw versus approved output access, direct URLs, exports, audit records and accidental exposure in logs.
- **Human control and AI:** Generated drafts cannot become published outputs without review. If AI features exist, run a labelled evaluation set for factual support, missing evidence, uncertainty, unsupported claims and reviewer override; record model/prompt versions and failures.
- **Usability:** Observe a new consultant completing setup, import and briefing tasks without developer intervention; capture errors and task time against the Plan baseline.
- **Regression:** Automate stable critical browser flows with the agreed web test runner. Playwright is the working recommendation for cross-browser coverage; pilot Maestro separately before making it a required web gate.
- **Accessibility:** Check keyboard and screen-reader flows, visible focus, labels, errors, colour independence, contrast, 200% zoom, responsive reflow and reduced motion against WCAG 2.2 AA and the UI standard. Use automated scans plus manual checks.
- **Reliability and recovery:** Test supported browsers and devices, interrupted imports, export failure, retry behaviour and any backup/restore or migration path relevant to the intended release.
- **Performance:** Measure the key consultant journeys and report generation against agreed thresholds using representative synthetic data.

## Test record

For each run, record version, environment, data set, expected result, observed result, issue severity, owner, fix or accepted risk, and retest evidence. Keep client evidence out of test artefacts and public CI logs.

## Exit evidence

Record test results, observed issues, severity, fixes and remaining risks. A release candidate meets the accepted examples and non-functional thresholds, has no unowned critical issue, and has sign-off from product, assessment-method and governance owners for its intended data use. A synthetic-data demo approval does not approve live client data.

## AI use

AI can draft test cases and help investigate failures. People review whether generated cases cover the actual method and risks. Test assertions and the claim that a release is ready require observed evidence.

## 26 October 2026 — Profile intake

Profile intake increment checks and independent-review disposition are recorded in [integration evidence](../evidence/profile-intake.md). Do not infer cross-browser, manual screen-reader or live-data acceptance from the Chromium suite.

## Connected demo validation

D-19 extends the local demonstration through prepared evidence and human-reviewed illustrative outputs. See [connected-demo evidence](../evidence/connected-demo.md) for actual checks, regression failures/fixes and limits. A demo review does not establish a validated assessment method or authorised production/client-data use.
