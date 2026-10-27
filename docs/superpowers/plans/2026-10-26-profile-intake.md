# Profile Intake Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Integrate the user-approved profile → reviewed questions → scenario flow into the existing app.
**Architecture:** Typed pure configuration rules plus defensive browser storage, shared client intake components, App Router entry/resume routes. Reuse existing shell, theme and UI primitives. Keep source fixtures and saved configurations separate.
**Tech Stack:** Existing Next.js, React, TypeScript, Node test runner and Playwright; no new dependencies.
**Spec:** ../specs/2026-10-26-profile-intake.md

## Global Constraints
- Synthetic browser-only data; explicit save, no AI, uploads, scoring or publication.
- User-approved mockup is the design. Preserve existing dirty checkout on codex/sprint-1-ui; native execution as previously chosen. No commit/push included.
- Production architecture remains undecided.

## Review Focus
- Corrupt or incompatible saved data must not crash or silently overwrite other drafts.
- Profile and question edits invalidate human review; blank included wording blocks handoff.
- Snapshot provenance survives edits, save and reload without inheriting fixture evidence.
- Storage unavailable/full and unsaved navigation must communicate loss risk accurately.
- Narrow layouts, long context and keyboard interaction must remain usable.

### Task 1: Configuration and persistence rules
Files: src/features/intake/model.ts, examples.ts, storage.ts; tests/unit/intake.test.mjs.
Interfaces: Profile, QuestionSet, AssessmentDraft; emptyProfile(), createQuestionSet(profile), isStale(draft), canReview(draft), readDrafts(storage), saveDraft(storage,draft), deleteDraft(storage,id).
- [x] Write and observe failing tests for snapshot preservation, stale/review rules, empty questions, invalid storage and independent drafts.
- [x] Implement pure rules, explicit example mapping and versioned validated localStorage envelope with surfaced failures.
- [x] Run unit suite; record result.

### Task 2: App journey
Files: src/features/intake/{workspace,profile-form,question-review,saved-assessments,saved-assessment}.tsx; new and saved App Router pages; home, setup and shell/navigation integration; globals.css; tests/ui/intake.spec.ts.
- [x] Write browser acceptance tests and observe failure on current app.
- [x] Implement blank/prefilled intake, explicit save/resume/delete, review provenance, stale refresh confirmation and scenario handoff. Subsequent stages display honest empty placeholders for new drafts.
- [x] Replace obsolete static setup assertion; preserve existing regression checks.
- [x] Run targeted browser suite and inspect screenshots in both themes and mobile.

### Task 3: Verification, review and development record
Files: architecture, decision/requirements register, sprint plan, SDLC stages, README, docs/evidence/profile-intake.md.
- [x] Run lint, typecheck, build, full unit/browser suite and diff checks.
- [x] Request independent focused review, fix material findings with regression checks.
- [x] Record implemented boundary and fresh evidence; open integrated app for user review. Leave changes uncommitted.

Completion evidence: [integration record](../../evidence/profile-intake.md). Native implementation retained on the existing feature branch, uncommitted for local review.
