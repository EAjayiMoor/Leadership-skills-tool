# 4 Test

## Purpose

Show that the product works for the real workflow, produces trustworthy outputs and handles sensitive evidence correctly.

## Test layers

- **Method:** Compare thematic findings and heatmap examples against the agreed assessment method.
- **Data:** Cover valid, missing, malformed, duplicate and conflicting imports; verify provenance.
- **Workflow:** Run a complete assessment journey with approved sample data.
- **Permissions:** Verify separation between engagements, raw evidence and approved reports.
- **Human control:** Generated drafts cannot become published outputs without review.
- **Usability:** Observe a new consultant completing setup and briefing tasks without developer intervention.
- **Regression:** Automate stable critical browser flows with the agreed web test runner. Playwright is the working recommendation for cross-browser coverage; pilot Maestro separately before making it a required web gate.
- **Accessibility and reliability:** Check supported devices/browsers, error recovery and readable outputs.

## Exit evidence

Record test results, observed issues, severity, fixes and remaining risks. A release candidate meets the acceptance examples and has sign-off from product, assessment-method and governance owners for its intended data use.

## AI use

AI can draft test cases and help investigate failures. Test assertions and the claim that a release is ready require observed evidence.
