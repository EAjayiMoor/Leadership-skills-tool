# Lean pharma worked-example demo

Date: 28 October 2026. Status: implemented and verified for local synthetic demo review.

## User outcome and authority

The user wanted to demonstrate the complete product without writing a finding and recommendation during the walkthrough. They selected the one-click worked-example approach and approved its [short design](../superpowers/specs/2026-10-28-demo-worked-example-design.md). D-22 records that choice; this is a focused Sprint 6 usability increment under FR-18/FR-20/FR-23 and D-21.

All content is prepared synthetic pharma material, held in the existing browser-local demo. No new model, network processing, scoring, heatmap or publication is introduced. This demonstrates one reviewed topic-level example, not broad assessment-method validity.

## Behaviour and acceptance

**Use pharma worked example** resolves the original Decision clarity question and its exact prepared survey/interview passages from the current saved run. The adapter uses captured content, source type and participant code rather than the question's position. The earlier illustrative interview label maps to the actual saved interview source, normally Q2-I3. Changed, missing, invalid or stale source material receives an explanation rather than a fabricated link.

One action supplies an editable finding and linked recommendation as drafts, labelled **Prepared synthetic worked example**. It includes scope, differing evidence and limitations, and explains that the survey and interview from P01 are not independent confirmations. The consultant separately accepts the finding and recommendation, then confirms report review. A complete demo needs no finding/recommendation typing.

Existing target writing or decisions require replacement confirmation. Cancellation changes nothing; confirmation reopens affected reviews through the existing domain transitions. Unrelated findings retain their content and decisions, appear under expandable summaries, and remain accessible. Optional example markers retain schema-1 storage compatibility and are validated on read. Normal blank drafting remains available.

## Verification and review

- Initial RED: five new unit cases failed for missing shortcut behaviour while all 28 earlier checks passed. The browser case failed for the missing shortcut button.
- Domain GREEN: 33/33 checks passed for complete editable drafts, same-run sources, separate review gates, unavailable/changed/stale evidence, reordered questions, replacement protection, unrelated findings and saved reload.
- A fresh read-only review identified one important integration defect: worked-example and manual recommendation preparation could allocate the same ID. A regression reproduced it (one unique ID instead of two); both paths now use a shared allocator. The expanded unit suite passed 34/34, including saved-record validation. No critical or minor review findings were reported; nothing was declined for judgement.
- The initial browser walkthrough reached the reviewed report; a later replacement check used a base URL captured before route navigation committed. The test now waits for the route before reading it.
- Final `npm run lint`, `npm run typecheck` and `npm run build` passed. `npm test` against the built app at `http://127.0.0.1:3103` passed 34/34 unit and 49/49 Chromium browser checks, one worker. `git diff --check` passed. The browser emitted the existing `NO_COLOR`/`FORCE_COLOR` configuration warning.
- Narrow 390px light/dark views passed reflow and serious/critical axe checks for WCAG 2 A/AA and 2.1 AA. [Light capture](demo-worked-example/worked-example-light.png) and [dark capture](demo-worked-example/worked-example-dark.png) were retained and inspected locally. The focused browser case was repeated after adjusting capture scroll position to show the shortcut and filled draft together.

The browser checks cover loading without typing, separate accept actions, report review/reload, cancelled and confirmed replacement, retained manual edits, access to other finding drafts, and narrow light/dark reflow/accessibility. Chromium is the automated browser gate; manual assistive-technology and live-data method review remain outstanding.

## Use in the demo

After saving reviewed questions and confirming pharma evidence review, continue directly to findings. Choose **Use pharma worked example**, inspect the sources and accept the filled finding. Continue to recommendations and accept the filled action. Preview the report and confirm its review. Existing drafts can use the shortcut after a refresh; replacement is explicit where relevant.
