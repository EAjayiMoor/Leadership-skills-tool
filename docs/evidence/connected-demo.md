# Connected demo evidence

Date: 26 October 2026. User-approved D-19 demonstration across the setup and Sprint 4–7 journey. This is a local, wholly synthetic demonstration, not completion of production ingestion, assessment-method, permissions or release gates.

## Implemented scope

A saved current question review can explicitly load reference, large-pharma or energy/utilities sample packs. Each included question receives two fictional survey passages and one fictional interview note, with participant codes, role context, captured wording and a unique source identity. The prepared passages are labelled as illustrations, not genuine responses to consultant-edited questions.

The seven stage routes now connect to evidence inspection, example interview preparation/notes, illustrative cohort findings with supporting and differing sources, accepted-finding-linked recommendations, and a cohort report preview containing accepted items only. Human actions accept, edit or reject drafts; edits revoke affected decisions and report review. The report can be marked reviewed locally or reopened; export/publication stays disabled. Scenario overviews lead to setup rather than the old static evidence preview.

Demo edits save on this browser. A failed save keeps edits in memory, shows a retry action and activates the same anchor/Back/unload protection as intake. Old drafts without demo data remain readable. Optional demo data has a bounded schema and cross-reference validation. Raw passages stay read-only and separate from report text. Later configuration changes preserve old evidence and block downstream review until explicit replacement; each replacement has fresh source IDs so old URLs never resolve to new passages.

## Verification and review

- RED: missing demo module, then missing Load demo evidence action. GREEN domain checks cover review gates, independent assessment snapshots, stale configuration, source links, exclusions/edit invalidation and storage compatibility.
- Independent review reproduced two P2 issues: incomplete question source groups reached finding preparation, and delimiter-only leadership groups produced unsaveable records. Watched regressions failed, then passed after stricter parsed-role and source-group validation. Re-review found both resolved and no remaining material concern in those fixes.
- A further watched replacement regression caught reused source identities. Fresh per-load UUIDs now prevent reassignment; display labels stay concise while exact identifiers remain inspectable.
- Final domain suite: 15 passed. Production browser coverage includes all three complete seven-stage journeys, reload, exact-source links, edited-finding invalidation, stale configuration, dark narrow evidence and save-failure/retry navigation.
- Final `npm test` against the current built app on port 3103: **15 unit + 45 browser tests passed, exit 0** (browser suite 3.7 minutes). `npm run lint`, `npm run build` including the TypeScript gate, and `git diff --check` passed. The earlier complete 44-case run also passed; the added replacement-selection regression was observed RED and then included in the final GREEN suite.
- Final replacement review caught retained selection when reloading the same pack. The evidence component now resets by load identity; explicit loading clears only the old source query, preserving other query parameters/hash. The regression covers replacement while deep-linked, a fresh selected source, cleaned URL, and a not-found result for the old source URL. Independent final static review found no remaining material concern.
- Eight additional accessibility scans covered evidence, findings, recommendations and report in both themes: no serious/critical violations (all tagged scan violation lists empty). [Scan results](connected-demo/accessibility.json).
- Twelve screenshot captures: [evidence light](connected-demo/evidence-light.png), [dark](connected-demo/evidence-dark.png); [findings light](connected-demo/findings-light.png), [dark](connected-demo/findings-dark.png); [recommendations light](connected-demo/recommendations-light.png), [dark](connected-demo/recommendations-dark.png); [report light](connected-demo/report-light.png), [dark](connected-demo/report-dark.png); evidence [390px](connected-demo/evidence-390.png)/[320px](connected-demo/evidence-320.png) and report [390px](connected-demo/report-390.png)/[320px](connected-demo/report-320.png). Both narrow widths measured without horizontal overflow. Visually inspected desktop evidence, dark report and narrow report for wrapping, attribution, inclusion boundaries and readable controls.
- Live development scenario URL returned HTTP 200. Demo walkthrough is in README. CI is configured but remote execution and consultant acceptance of this increment remain unobserved. Changes remain uncommitted; no push, deployment or client-data release performed.

## Limits

No real uploads, survey distribution, recording/transcription, AI processing, scoring, rankings, heatmap, client publication or report export. Prepared findings are not a validated synthesis method. Local review is not an authenticated approval. Role permissions, client separation as a server security boundary, retention and production persistence remain undecided. All raw data are fictional; browser storage remains unencrypted, origin/device-local, clearable and last-save-wins across tabs. A pack replacement discards the prior demo run after confirmation; no historical audit log is claimed. Cross-browser and manual screen-reader/touch/zoom acceptance remain outstanding.

Design: [spec](../superpowers/specs/2026-10-26-connected-demo.md). Implementation: [plan](../superpowers/plans/2026-10-26-connected-demo.md). Architecture: [living notes](../architecture.md).
