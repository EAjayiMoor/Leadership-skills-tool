# Sprint 6 — Guided synthesis evidence

Date: 27 October 2026. Status: local implementation verified and ready for user review. Product acceptance and assessment-method validation remain outstanding.

## Scope and authority

User problem: prepared generic findings and actions did not explain how evidence supports an interpretation. D-20 sets the quality requirement; D-21 approves a consultant-led synthetic prototype method. This increment addresses FR-18/FR-20/FR-23 against the [accepted method](../superpowers/specs/2026-10-27-sprint-6-evidence-method-proposal.md), [review cases](../superpowers/specs/2026-10-27-sprint-6-method-cases.md) and [implementation plan](../superpowers/plans/2026-10-27-sprint-6-guided-synthesis.md).

All examples, passages and participant codes are fictional and browser-local. No live evidence, AI service, individual score, ranking, heatmap, export or publication is added. D-04 remains open.

## Implemented behaviour

- New findings start with a topic title and blank claim. The consultant compares exact passages grouped by question/topic and role, and classifies supporting, qualifying, contradicting and context material across questions within one run.
- Acceptance requires a title, claim, scope, differing-evidence summary, limitations and a supporting source. These are completeness checks; the consultant must judge whether the evidence actually supports the wording. Source counts do not determine confidence or prevalence.
- Recommendations start blank and require action, rationale and intended outcome, with an optional follow-up check. They link to accepted findings and have separate accept/reject decisions.
- A consultant may instead record and explicitly confirm why no recommendation is justified. That reviewed reason can accompany the accepted findings in a reviewed report. An accepted action and a confirmed no-action decision cannot coexist.
- Findings and recommendation edits reopen affected downstream reviews, including a recorded no-recommendation decision. Report content contains only accepted findings/actions or the confirmed no-recommendation reason. Raw passages remain in evidence review.
- Schema-1 records retain optional structured fields and synchronized legacy source arrays. Earlier saved demos retain their wording editors and decisions. Foreign, dangling and duplicate structured sources and unknown relations are rejected. Malformed storage is not overwritten.
- Exact source links use the App Router query state when opening evidence, including client navigation to a passage from another question.

## Verification

| Check | Result |
| --- | --- |
| Unit RED | Six initial expected failures established the missing structured workflow; all 15 earlier checks passed. |
| Initial domain GREEN | 23/23 passed, including legacy storage and malformed relation checks. |
| Guided browser journey | Passed cross-theme/role evidence links, reload, required fields, structured report sections, keyboard tab, 390px reflow and light/dark axe checks. |
| Expanded suite before fixes | 25/25 unit checks; 44/47 browser checks. The reference, pharma and energy journeys each exposed the same exact-source navigation defect (Q2 source link displayed Q1). |
| Review fix RED | Two unit failures and the guided browser case demonstrated the missing explicit no-recommendation path. |
| Final lint/type/build | `npm run lint`, `npm run typecheck` and `npm run build` passed. |
| Final unit/browser suite | `PLAYWRIGHT_TEST_BASE_URL=http://127.0.0.1:3103 npm test`: 28/28 unit and 47/47 Chromium browser checks passed. All three connected scenario journeys now open the exact cross-question source; the guided journey verifies the confirmed no-recommendation path, reload and invalidation. |
| Whitespace check | `git diff --check` passed. New source/test files were also checked with `git diff --no-index --check`; no whitespace diagnostics, only Git line-ending notices. |

Browser checks use Chromium against a production build at `http://127.0.0.1:3103`, one worker. Accessibility checks cover serious/critical axe findings for WCAG 2 A/AA and 2.1 AA; automated results do not replace manual assistive-technology review. Runtime emitted the existing `NO_COLOR`/`FORCE_COLOR` configuration warning.

Skills activated: writing-plans, executing-plans, test-driven-development, Vercel React best practices, systematic-debugging, verification-before-completion, requesting-code-review and finishing-a-development-branch. A fresh read-only reviewer checked the implementation, provenance, legacy persistence, review invalidation and report boundaries; one important no-recommendation-path issue was identified and fixed. Its domain and browser regression checks went from RED to GREEN, with the final full suite green. No critical or minor findings were reported. The current branch and uncommitted changes are preserved under the agreed delivery scope.

## Visual evidence

Captured from the synthetic guided journey and inspected locally:

- [Desktop finding comparison, light](sprint-6/findings-desktop-light.png) and [dark](sprint-6/findings-desktop-dark.png).
- [Narrow finding comparison, light](sprint-6/findings-mobile-light.png) and [dark](sprint-6/findings-mobile-dark.png).
- [Structured recommendation, dark](sprint-6/recommendations-dark.png).
- [Accepted report sections, dark](sprint-6/report-dark.png).

## Review and remaining limits

The user still needs to walk through the worked cases and judge whether the guidance produces useful, proportionate claims and actions. The fields cannot detect a plausible but unsupported interpretation automatically. Coverage remains the prepared two-code sample; repeated passages from one code are not independent corroboration. Missing evidence must be recorded as uncertainty rather than a negative capability finding.

Older saved demo packs keep their earlier format. To try the new flow, start a fresh demo assessment or explicitly replace its evidence pack, which resets existing demo reviews. Production persistence, permissions, AI evaluation, full history/audit, live assessment-method validation and manual assistive-technology review remain outstanding. This increment is not completion of the whole production Sprint 6 scope.
