# Profile intake integration evidence

Date: 26 October 2026. Local synthetic-data increment for FR-01/FR-05 and D-14/D-17. User accepted the separate mockup and requested integration. This record distinguishes the implemented configuration journey from the still-open real drafting/AI and later assessment processing.

## Implemented

Blank new assessment, six editable intake sections, three synthetic prerequisite profiles, versioned browser-only save/reopen/delete, question wording and role-scope edits, inclusion controls, exact captured profile basis, consultant review, stale-set handling and linked scenario summary. Saved assessments have their own routes and no example evidence or report. Later stages are labelled unfinished.

Architecture and limits are recorded in [architecture notes](../architecture.md). [Design](../superpowers/specs/2026-10-26-profile-intake.md) and [implementation plan](../superpowers/plans/2026-10-26-profile-intake.md).

## Verification record

- RED: intake unit suite failed before model/storage implementation; new browser journey failed because New assessment did not exist. Then 7 unit checks passed, including immutable basis, stale/review rules, blank question rejection, independent save/delete, corrupt/incompatible storage and blocked storage.
- Initial browser checks: save/reopen/provenance flow and all three example profiles passed. Axe caught the mobile menu's visible-name mismatch; the accessible label now includes the visible stage name.
- Independent review identified Back/Forward unsaved loss and lack of corrupt-envelope recovery. New regression tests failed against the earlier build (no history confirmation / no recovery control). Early root-head history guard and explicitly confirmed assessment-key reset added. Browser instrumentation proved that the initial page-level guard was removed by Next.js before it received the event; moving registration before the router resolved that issue. Targeted Back cancellation/confirmed departure and reset checks passed on the dev app. Section heading focus and loading copy corrected from minor review findings. A fresh static re-review found no remaining material concern.
- Final verification: `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:unit` (7 passed), and production-server `npx playwright test --workers=1` (36 passed, exit 0; 3.2 minutes). `git diff --check` passed. CI now runs both unit and browser suites through `npm test`; remote CI has not been observed.
- The earlier parallel browser run reported 34 passes and two timeouts while static checks were also running. Both timed-out cases passed on a single-worker retest, then the complete 36-case suite passed with no competing checks. No product assertion was weakened or timeout increased.
- Accessibility: ten existing route/theme scans plus question/scenario scans in both themes and the new dark mobile form reported no serious/critical violations. Automated checks do not replace manual assistive-technology review.
- Visual evidence: eight integrated screenshots captured. Desktop [profile light](profile-intake/profile-light.png), [profile dark](profile-intake/profile-dark.png), [questions light](profile-intake/questions-light.png), [questions dark](profile-intake/questions-dark.png), [scenario light](profile-intake/scenario-light.png), [scenario dark](profile-intake/scenario-dark.png); narrow [390px](profile-intake/profile-390.png) and [320px](profile-intake/profile-320.png). Profile and home also measured without horizontal overflow at both narrow widths. Inspected desktop profile, dark question review and 320px form for readable controls, wrapping and review boundaries.
- Independent review: both important findings and minor focus/copy findings resolved. Final static re-review found no remaining material concern. The local implementation is ready for the user's integrated-flow review; no commit, push, deployment or live-data release was performed.

## Practical limits

Synthetic data only; browser/origin/device-local, unencrypted, no shared backup. Explicit save is required. Clearing browser data removes drafts. Malformed storage remains untouched unless the user explicitly confirms reset of all local assessment drafts. Concurrent tabs use last-save-wins behavior; shared editing/conflict resolution is not implemented. Cancelling history navigation restores the current page with a history entry and can replace forward history.

Questions are illustrative templates, not an approved bank or AI output. No files are read or uploaded. No model service, real survey distribution, scores, findings, report approval/export or production deployment is introduced. Cross-browser, manual screen-reader/zoom review and consultant acceptance of the integrated implementation remain outstanding.

## Navigation scroll correction

26 October 2026 follow-up to UI-01/UI-02, Sprint 1 navigation shared with the Sprint 2/3 intake.

- Reproduced the user's overlap complaint in the live 676px in-app browser: wheeling over the open drawer's backdrop scrolled the underlying form. New regression failed with expected `scrollY = 0`, actual `550` before the fix.
- Root scrollbar space is reserved to avoid width jumps; document scrolling is disabled while the stage dialog is open. The drawer scrolls internally and contains overscroll. Next's floating development badge, which covered the form, is disabled.
- Live retest: the underlying form remained still after the same backdrop scroll; closing returned to normal scrolling. [Live screenshot](profile-intake/scroll-fix-live.png). No draft data changed.
- Initial three scrolling regressions and five existing navigation tests passed on the dev app. Final production run: 18/18 scrolling, focus/layout and accessibility checks passed (single worker, exit 0, 2.0 minutes), including a nonzero 40px starting position and restoration, width stability, internal short-drawer scrolling, and unlock after Escape/navigation. `npm run lint`, `npm run build` (including TypeScript), and `git diff --check` passed.
- Independent review found no material issue. Its suggested nonzero-position coverage was added. Cross-browser touch overscroll remains unverified.
