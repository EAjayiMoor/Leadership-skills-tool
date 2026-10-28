# One-click pharma worked example

Status: approved by the user on 28 October 2026, including the linked recommendation draft and separate consultant review actions.

## Need and outcome

The current demo requires substantial writing before the consultant can show the report. The user wants a lean demonstration of the complete workflow. This is a small Sprint 6 usability increment under FR-18/FR-20/FR-23 and D-21, using wholly synthetic, browser-local data.

## Approaches and choice

- Complete one blank finding with short answers: immediately available, but still requires typing and source selection.
- Load the existing pharma worked example: selected by the user. Reuses the example they reviewed as sensible and demonstrates source traceability and human review with little typing.

## Proposed behaviour

1. A clearly labelled **Use pharma worked example** button is available in the findings stage after evidence review.
2. One click loads the finding and its linked recommendation from the existing [worked example](2026-10-27-sprint-6-worked-example.md), both as editable drafts. Including the linked recommendation is proposed to keep the full demo lean.
3. The finding includes the claim, scope, qualifying evidence, limitations and exact supporting/qualifying links to the current pack's decision-clarity sources. Source lookup uses the captured question, source type and participant code; the illustrative document's interview label is mapped to the actual saved interview record.
4. The consultant inspects the finding and selects **Accept finding**. The linked recommendation then appears ready for review, with its action, rationale and intended outcome filled in. **Accept recommendation** remains a separate action.
5. The consultant previews the accepted material and selects **Confirm demo report review**. The shortcut grants no approval itself.
6. Existing writing and accepted decisions are preserved. If loading would replace an edited finding or recommendation, require explicit replacement confirmation. Cancelling preserves all content and review state. Confirmed replacement reopens affected reviews through the existing domain transitions.
7. The shortcut is labelled as a prepared synthetic example. It is available only for the pharma pack with the captured decision-clarity question and required sources; unavailable configurations receive an explanation rather than fabricated links.

## Acceptance and evidence

- One action supplies complete, editable draft content and current-run source references; no automatic acceptance or report review.
- Existing edits survive cancellation; confirmed replacement invalidates affected downstream review.
- Stale configurations and missing or foreign sources cannot use the shortcut.
- Saving/reloading preserves the draft and review states; the source links open the exact passages.
- The browser journey reaches a reviewed report without typing finding or recommendation text, while retaining the three explicit consultant review decisions.
- Record focused domain/browser verification and update the architecture, decision and delivery notes. The heatmap decision and live-data method validation remain open.
