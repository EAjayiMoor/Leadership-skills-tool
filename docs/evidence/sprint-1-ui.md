# Sprint 1 UI implementation evidence

Date: 25 October 2026. Status: local prototype implemented; automated checks and independent-review fix pass complete. User visual acceptance and manual accessibility checks remain pending.

## Work item

- User problem: consultants need clear stage navigation and readable working/review screens within one assessment.
- Outcome: local design gallery and home, setup, evidence review and report prototypes in light and dark modes.
- Authority: [approved design](../superpowers/specs/2026-10-25-sprint-1-ui-design.md), [implementation plan](../superpowers/plans/2026-10-25-sprint-1-ui.md), D-03, D-09, D-12, D-14 and D-16.
- Requirements: UI-01–03 and presentation groundwork for FR-01–06, FR-10–12, FR-20–22 and SEC-08. Functional assessment requirements remain distinct from visual prototypes.
- Sensitivity: wholly synthetic client, participant, source and report examples. Source reports/workbook were not copied into fixtures.
- Owners: user and Amy Wilkinson share product decision ownership; user is technical owner and intended consultant.

## Skills activated

Writing-plans and executing-plans guide execution; React best practices guide component boundaries, limited serialization and defensive preference storage; TDD and systematic debugging guide meaningful lookup/browser cases; verification-before-completion and requesting-code-review guide evidence and the independent review. Expo and Maestro were not activated. Playwright and its matching Chromium executable were actually installed.

## Observed checks

- Build: `npm run build` succeeded, prerendering 28 pages including the known scenario/stage combinations.
- Fixture boundary: `npm run test:unit` — 2/2 passed. Known IDs return only their own scenario; unknown, traversal and prototype-chain IDs return no scenario.
- Final `npm test` against the built app through `PLAYWRIGHT_TEST_BASE_URL=http://127.0.0.1:3100` exited successfully: 2/2 fixture tests and 27/27 browser tests passed. Includes navigation/reload, unknown destinations, mobile dialog/Escape/focus return, system/manual themes, blocked storage, evidence selection/filtering/provenance, disabled export, narrow reflow and four review-regression cases.
- Accessibility: ten axe scans across five views and two themes found no serious or critical violations. Automated results do not establish full WCAG conformance.
- `npm run lint`, `npm run typecheck` and `npm run build` completed successfully after the material fixes. `git diff --check` passed. `npm ls --depth=0` resolved all declared direct dependencies.
- CI workflow is configured, but GitHub execution has not been observed.

The first full browser run had 18 passes and five failures. Investigation found sidebar content overflowing onto the light page, a system-preference change missed before hydration, and cold dev compilation delaying navigation. The sidebar now scrolls internally; theme setup immediately syncs the current media preference; browser validation uses a built app to remove dev compilation from the checks. The 23-case built-app rerun passed.

## Visual evidence

| Screen | Light | Dark |
| --- | --- | --- |
| Home | [Screenshot](sprint-1/final/home-light.png) | [Screenshot](sprint-1/final/home-dark.png) |
| Setup | [Screenshot](sprint-1/final/setup-light.png) | [Screenshot](sprint-1/final/setup-dark.png) |
| Evidence review | [Screenshot](sprint-1/final/evidence-light.png) | [Screenshot](sprint-1/final/evidence-dark.png) |
| Report preview | [Screenshot](sprint-1/final/report-light.png) | [Screenshot](sprint-1/final/report-dark.png) |
| Narrow evidence view | [Screenshot](sprint-1/final/evidence-mobile-light.png) | [Screenshot](sprint-1/final/evidence-mobile-dark.png) |
| Home at 320px | [Screenshot](sprint-1/final/home-mobile-light.png) | [Screenshot](sprint-1/final/home-mobile-dark.png) |

Screenshots contain only synthetic content. Layout widths and resolved colour values are in [visual-checks.json](sprint-1/final/visual-checks.json), with [contrast calculations](sprint-1/final/contrast-checks.json). Screenshots were inspected by the implementer; intended-consultant review of the running UI remains pending. Capture now uses a fresh run directory by default to avoid Windows locks on images opened for inspection; `UI_CAPTURE_DIR` selects a named run directory.

| Measured pair | Light | Dark |
| --- | --- | --- |
| Body text / surface | 18.65:1 | 15.67:1 |
| Muted text / muted surface | 5.42:1 | 7.89:1 |
| Primary button text / background | 15.10:1 | 6.05:1 |
| Main focus ring / surface | 5.88:1 | 6.26:1 |
| Navigation focus ring / background | 5.58:1 | 6.40:1 |
| Input boundary / surface | 3.59:1 | 4.24:1 |

## Implementation choices and limits

- Reused the existing checkout on a feature branch to preserve approved uncommitted planning work. This provides branch separation rather than filesystem isolation.
- Used a PowerShell execution ledger because the Bash helper could not write through Windows sandbox path mapping; this loses automated task-ledger bookkeeping.
- Sandbox process APIs denied attempts to terminate the failed Bash bookkeeping helper. It is tooling only and is not part of the app runtime. The managed browser-server run reported all 27 case passes but stalled during process teardown; it was interrupted, and the final external-server `npm test` run completed with exit code 0. This tooling limitation is not counted as a successful managed-teardown check.
- Self-hosted the standard's fonts through Fontsource packages. Font package upgrades now need normal dependency maintenance.
- Used browser storage only for the versioned theme preference; fixture assessment data does not persist. Preference-storage failures do not break theme switching.
- Used a built server for repeatable browser tests and a single local test worker; this adds a build prerequisite before local UI tests.
- Pinned ESLint 9.39.5 because the current Next.js React/accessibility/import plugins declare compatibility through ESLint 9. The npm registry marks it deprecated; migrating the lint stack is a maintenance follow-up. The installation audit reported zero vulnerabilities. Unneeded postinstall scripts were left blocked.
- Light-theme focus uses the standard's ocean colour instead of bright teal, muted text and control borders were strengthened, and dark primary-button text uses a dark foreground on teal. These are accessibility-driven UI-standard exceptions; measured values are retained with the screenshots.

## Outstanding acceptance

- Intended consultant/product co-owner review of the running screens and visual direction.
- Manual screen-reader review and actual browser 200% zoom check; automated keyboard/skip-link/dialog cases and narrow reflow do not replace these.
- Cross-browser checks beyond Chromium.
- Approved product name/logo, full tone-of-voice guidance, and functional stage status/approval semantics.
- All operational assessment features, permissions, production data storage/hosting and live-data release decisions remain for later sprints.

## Independent review and fix pass

A fresh reviewer inspected the tracked/untracked implementation, approved design, plan, tests, dependencies and configuration. The reviewer ran the two fixture tests (both passed); build, lint and browser checks are the implementer's evidence, not reviewer-run checks.

- Important: light-theme keyboard focus on the always-dark sidebar/dialog was 2.76:1. Dedicated browser tests reproduced the failure. The local navigation focus token is now bright teal while main content keeps the darker focus ring.
- Confirmed reflow issue: the reviewer suggested checking three home summary cards at 320px. A browser assertion confirmed card content overflow. The cards now stack below 480px.
- Additional measurement: dark input borders were 2.76:1 against their surface. A browser test reproduced the failure; the dark border token was strengthened.
- Deferred minor: CI currently invokes `test:ui` and does not invoke the two fixture unit tests. Those unit tests pass locally; add them to CI in a follow-up.

The reviewer declined operational assessment behavior, method validity, heatmaps and status semantics because they are outside this prototype. The implementer agrees those remain unimplemented/unapproved. Human visual acceptance, screen-reader testing, actual browser zoom and other browser engines remain explicitly outstanding. No second independent review is claimed. All four new regression cases were observed failing for the identified issue, then passed in the final 27-case browser suite.
