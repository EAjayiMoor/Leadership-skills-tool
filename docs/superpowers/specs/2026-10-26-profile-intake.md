# Profile intake integration

Approved design: the user accepted the interactive profile → questions → scenario mockup and requested integration on 26 October 2026. D-17, FR-01 and FR-05; focused Sprint 2 persistence and Sprint 3 configuration increment, not completion of either sprint.

User problem: a new consultant needs to capture company context before developing survey questions, and inspect the same prerequisites behind the synthetic examples.

Outcome: the existing app offers a blank new assessment, six intake sections, three prefilled synthetic profiles, saved/reopenable drafts, editable/include-or-exclude sample questions with exact profile provenance, a human review gate and a linked scenario summary.

Implementation choice: versioned localStorage for the already agreed browser-only synthetic-data boundary. Explicit Save draft persists the current profile, questions and review state on this browser/origin. Blocked/full/corrupt storage must be visible and must never claim a successful save. Production storage, identity and AI remain open. No live evidence or uploads; no model calls, scoring or publication. Questions remain labelled illustrative templates, not an approved bank. Example copies never overwrite the source fixtures or acquire their example evidence.

Profile changes preserve the previous question snapshot but make it stale and invalidate review. Refresh explicitly replaces question edits; ask before discarding those edits. Empty included questions block review. Drafts can be removed locally with confirmation. Leaving unsaved work prompts before navigation. Unknown draft IDs show recovery, never another client's fixture.

Acceptance: create/save/reload/resume two independent drafts; inspect all three examples; required inputs focus their section; edit/exclude/review questions; exact basis stays attached through reload; profile changes block handoff until refresh/review; storage failure/corruption is recoverable; deletion and unsaved-work handling are explicit; keyboard, both themes and 320px layout work. Existing evidence/report examples remain separate and report publication stays disabled.

Data sensitivity: wholly synthetic company and role context only. Browser storage is unencrypted, device-local and clearable; the UI communicates that limit. No real participant names or client records.
