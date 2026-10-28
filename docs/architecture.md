# Architecture notes

Status: local connected synthetic demo with consultant-guided synthesis and an optional pharma worked example. Updated 28 October 2026.

This file tracks how the product is intended to be structured and how that structure changes during development. It records decisions and implementation evidence; it does not approve production data use.

## Current position

| Area | Current position | Status |
| --- | --- | --- |
| Web application | Next.js 16.4.3 with React 19.3.1 and TypeScript | Implemented UI prototype; acceptance pending |
| Next.js router | App Router with shared engagement layout and known scenario/stage routes | Implemented; unknown paths recover through a not-found page |
| Prototype runtime | Local dev server on 127.0.0.1:3000; built app on port 3100 for validation | Local-only; production hosting remains open |
| Prototype data | Static fixtures plus separate saved synthetic demo runs | Browser drafts include explicit demo packs and review decisions; no live client evidence or production approval. |
| Theme preference | Versioned browser key with System/Light/Dark values | Implemented; storage failures fall back to working in-memory theme selection |
| Production persistence and hosting | Not decided | Decide before implementing evidence ingestion or processing live assessment data |
| Assessment evidence and findings | Synthetic examples only for the prototype | Live client data, permissions, retention and publication remain subject to separate decisions and approvals |

The current implemented boundary is:

```text
Consultant
    │
    ▼
Next.js App Router pages and shared layout
    │
    ▼
Static fixtures + separate saved configuration, demo evidence and review decisions
    │
    ▼
Client controls: intake/review/save, menu, theme, source filter/selection, report-state preview

Browser storage: theme preference, synthetic profiles/questions and prepared demo evidence/reviews; no live client data

Production services, shared storage, identity and hosting: undecided
```

## Implementation map

- `src/app/`: home, gallery, scenario overview and seven directly addressable stages. Known scenario/stage combinations are prerendered; unknown IDs do not fall back to another assessment.
- `src/features/assessments/fixtures.ts`: wholly fictional context, role groups, question examples and source passages for three scenarios. This is fixture content, not a validated assessment method.
- `src/features/assessments/screens/`: setup, evidence review, report preview and labelled unfinished-stage views.
- `src/components/assessment-shell.tsx` and `stage-navigation.tsx`: persistent desktop stage panel, native modal navigation on narrow screens, engagement context and skip link.
- `src/components/theme-control.tsx` and `src/lib/theme.ts`: pre-paint theme bootstrap, system preference tracking and defensive preference storage. An initial media sync covers a preference change before hydration completes.
- `src/components/ui/primitives.tsx` and `src/app/globals.css`: shared accessible presentation patterns and semantic theme tokens.
- `tests/`, `playwright.config.ts` and `scripts/capture-ui.mjs`: fixture lookup checks, built-app browser/accessibility checks, and repeatable synthetic screenshots. CI configuration is present but has not run remotely.

Most fixture content is rendered on the server. Client components receive only the scenario identity or source/report fields needed by their interactions. There is no model call, import pipeline, backend database, authentication, real approval or report export in Sprint 1.

Poppins and Geist Mono are self-hosted through Fontsource packages rather than downloaded by `next/font/google` during each build. This preserves the typefaces while making the build independent of Google Fonts availability. UI colour exceptions and measured contrast are recorded in [Sprint 1 evidence](evidence/sprint-1-ui.md).

## Keeping the record current

Update this file when a decision changes application boundaries, data flow, persistence, identity, security, deployment or operations. Keep entries short and link them to the relevant requirement, decision and implementation evidence.

For each material change, record:

- date, sprint and status: proposed, approved, implemented or superseded;
- the user need and requirement or decision IDs;
- the choice, its reason, and important alternatives or consequences;
- the affected components, data flow or records;
- the data class involved and any access or retention implications;
- checks, review or demo evidence, plus unresolved risks.

Keep the current position above accurate and add dated notes below as implementation progresses. Do not include client evidence, identifying assessment records, credentials or secrets.

## Development notes

### 28 October 2026 — Lean pharma demo

The user approved D-22 to reduce typing during demonstrations. `demo/worked-example.ts` resolves the reviewed Decision clarity example against the current pharma run's exact question and prepared passages, using source type, participant code and content rather than question order or ordinal source labels. Missing, edited, incomplete or stale evidence makes the shortcut unavailable with an explanation.

One action supplies an editable finding and linked recommendation as drafts. `changeFinding` and `changeRecommendation` retain review invalidation; loading grants no approval. Existing target content requires explicit replacement confirmation, while unrelated findings remain intact. The worked finding appears first and other cards collapse without deleting their content. Optional `workedExample` markers identify prepared material and retain schema-1 compatibility. Existing browser persistence, save failures and unsaved-change guards remain the storage path. See [design and validation evidence](evidence/demo-worked-example.md).

### 27 October 2026 — Guided synthesis prototype

D-21 authorizes this focused Sprint 6 increment for synthetic data (FR-18/FR-20/FR-23). The consultant compares captured passages across questions and roles, classifies each source as supporting, qualifying, contradicting or context, and writes a bounded claim with scope, differing evidence and limitations. Acceptance requires those fields plus supporting evidence; this checks completeness, not the truth or validity of a claim.

`demo/model.ts` retains immutable transitions and adds structured finding evidence and recommendation fields. New drafts are blank. Finding edits reopen linked recommendations and report review; recommendation edits reopen their review and the report. Report selectors include accepted content only, with scope/limits, action/rationale/outcome and internal source references. Raw passages remain in the evidence workspace.

An optional `noRecommendation` record holds a reason and separate human review state. It permits a finding-only report when the consultant confirms that no action is justified; accepted actions prevent that confirmation. Finding/recommendation/reason edits reopen the decision and report. Exact evidence navigation subscribes to App Router search parameters, rather than sampling `window.location` before a client transition has committed.

The existing schema-1 browser envelope is retained. Optional structured fields distinguish new records from earlier examples; source arrays remain synchronized for compatibility. Structured references can cross questions within one saved run, while validators reject foreign, duplicate and dangling sources or unknown relations. Earlier saved findings/recommendations keep their original editor and validation. No new dependency, service, network call or shared storage is added. See [implementation evidence](evidence/sprint-6-guided-synthesis.md); live method validation and D-04 heatmap semantics remain open.

### 25 October 2026 — Starting architecture

- Status: selected decisions recorded; implementation not started.
- Next.js with React was selected by the user for the web application (D-03).
- Browser-only saving was accepted by the user for synthetic prototype data. The specific storage mechanism remains open (D-14).
- The App Router was selected by the technical owner on 25 October 2026 (D-03).
- The user confirmed the technical owner role on 25 October 2026 (D-09).
- Amy Wilkinson and the user share product decision ownership from 25 October 2026; the user is also technical owner (D-09).
- The user requested both light and dark UI modes; the standard's system-preference default and manual mode selection apply (D-12).
- The technical owner selected a local Next.js development server for the prototype on 25 October 2026; this does not choose production hosting (D-14).
- Production hosting, persistence, identity and live-data permissions remain open (D-06, D-07).

### 25 October 2026 — Sprint 1 UI implementation

- Status: code and synthetic screenshots available; user visual acceptance and manual assistive-technology review outstanding.
- Approved design implemented on `codex/sprint-1-ui`; plan and evidence links are in the [Sprint 1 evidence record](evidence/sprint-1-ui.md).
- Stage progress, approved report examples and prototype controls are illustrative. Neither a selected report preview nor a stage label publishes content or changes a real assessment.
- Source excerpts remain connected to fictional source IDs. Report source links lead to evidence review; exact-source deep linking is not yet implemented.
- At Sprint 1 completion only theme preference was stored. The following increment adds browser-only configuration persistence.


### 26 October 2026 — Profile intake integration

Status: implemented for local synthetic-data review under D-14/D-17 and FR-01/FR-05; real question drafting, production storage and live-data governance remain open.

- `/assessments/new` opens a blank intake; all existing example setup routes use the same form with explicitly fictional prerequisites. `examples.ts` maps context/roles/themes and adds labelled synthetic planning assumptions.
- `src/features/intake/model.ts` defines typed profile, question snapshot and review rules. Questions keep a deep copy of the profile basis; profile edits make the earlier set stale, question edits revoke review, and refreshing explicitly replaces edits. This is a snapshot comparison, not a full historical audit log.
- `storage.ts` validates a version-1 envelope under `leadership-assessment-drafts:v1`. Explicit save writes profile, question wording/scope/inclusion, original basis and review state. Up to 100 drafts / 3 million characters are supported. Reads reject malformed or unsupported envelopes without overwriting them. Failure stays visible; confirmed recovery removes only the assessment key. Device/browser/origin-local, unencrypted and clearable; synthetic information only.
- Home lists saved drafts with resume and confirmed deletion. `/drafts/[draftId]/[[...stage]]` loads only the requested saved configuration. Unknown IDs recover without choosing a fixture. Later stages show honest empty placeholders; they acquire no example evidence or approved report.
- Shared shell, theme, tokens, navigation and form primitives are retained. Storage loading uses a hydration gate; the server does not access browser data. Native unload and anchor guards protect unsaved edits. A root-head history listener is installed before Next.js, and intake updates/clears its dirty state in a layout effect. A page-level history listener was insufficient because Next.js could synchronously unmount it first. Cancelling history navigation restores the current URL/state by adding a history entry; forward history can be replaced.
- No network API, model service, file ingestion, individual scoring or report publication is introduced. Illustrative question templates are explicitly labelled; the approved question-bank source and real drafting method remain open.
- Automated results, visual evidence and independent-review disposition: [intake evidence](evidence/profile-intake.md). Multi-tab conflict resolution is deferred: simultaneous edits to the same draft use last-save-wins behavior. No shared storage or authentication is implied.
### 26 October 2026 — Navigation drawer scroll containment

User-reported defect: scrolling over the modal backdrop moved the company-profile page behind the navigation. Reproduced in the live in-app browser and with a failing browser assertion (`scrollY` 0 → 550). The native dialog made content inert but did not lock document scrolling.

The root now reserves scrollbar space and suppresses page overflow only while `.stage-dialog[open]` exists. The drawer keeps its own vertical scrolling and contains overscroll. The native close state automatically releases the lock on Escape, close and route navigation; no persistent body styles or JS cleanup flags are needed. The floating Next development indicator is hidden during reviews. Synthetic inputs and persistence behavior are unaffected. See the [regression evidence](evidence/profile-intake.md#navigation-scroll-correction).

### 26 October 2026 — Gallery outside the assessment workflow

D-18 implemented: home and shared desktop/mobile navigation no longer link to the design gallery. `/gallery` remains an explicitly labelled, unlisted development reference, with its direct URL in README. This is information architecture only; it adds no access restriction or assessment capability. Lint, local route/navigation checks and diff checks passed; see the Build stage record.

### 26 October 2026 — Connected synthetic assessment demo

Status: local demo implementation under D-19. Production services, import formats, assessment method and live-data governance remain open. This is a focused demonstration across Sprints 4–7, not their production completion.

- `src/features/demo/model.ts` owns immutable workflow transitions. The optional `AssessmentDraft.demo` stores a configuration signature, prepared evidence, finding/recommendation decisions and demo report review. `packs.ts` contains explicitly fictional contexts for the three scenarios; no provider/API or model is called.
- Source records capture exact question wording/scope, source type, fictional participant code and role. Identifiers contain assessment and load UUIDs; replacement never reuses old passage URLs. `source-links.tsx` gives concise visible labels while preserving exact URLs and detail identifiers.
- `validation.ts` checks the optional run schema, assessment owner, complete per-question source groups, consistent snapshots and valid finding/recommendation references. Existing version-1 drafts without a demo remain readable; malformed data is not silently overwritten. Raw sample passages are read-only in the UI.
- Findings are prepared examples, not automated inference. Accept/edit/reject controls determine report inclusion; finding edits revoke dependent recommendation decisions and report review. Recommendations reference accepted findings. Stale configuration blocks the later screens without rewriting old evidence. Replacement is explicit and resets review.
- Saved stage routes use focused evidence/findings/recommendation/report/interview components inside `DemoWorkspace`; the original fixture screens remain separate. Navigation progress derives from saved state and labels sample interview content accurately. The report contains accepted cohort text and internal source references; raw participant passages are omitted, and export is disabled.
- Demo changes save locally after edits/actions. Failures preserve in-memory content and enable retry. `useUnsavedChanges` extracts the established intake guard, including the early root history bootstrap. No backend identity, authenticated approval or sharing boundary is implied.
- TypeScript runtime imports use explicit `.ts` paths with `allowImportingTsExtensions` under `noEmit`, allowing the existing Node type-stripping tests to exercise shared rules without a new build dependency.
- Verification, independent review and UI evidence: [connected-demo record](evidence/connected-demo.md). All demo work remains synthetic and local.
