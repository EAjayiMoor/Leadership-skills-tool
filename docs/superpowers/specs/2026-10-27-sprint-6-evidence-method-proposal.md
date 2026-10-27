# Proposed evidence-to-finding method

**Status:** Accepted by the user for the synthetic prototype on 27 October 2026. This is a bounded prototype method, not validation for live client evidence.

**Date:** 27 October 2026

**Related decisions/requirements:** D-04; D-20; FR-12; FR-18; FR-20; FR-23; FR-26

**Scope:** Consultant-led, cohort-level synthesis. Examples are synthetic; live evidence remains outside this design.

## Why this proposal exists

The manual workflow notes describe organising evidence by theme, interpreting it across the group and preparing possible actions. They do not define a coding framework, aggregation rule, evidence threshold or heatmap calculation. The connected demo's canned findings and recommendations are not an analysis method.

This proposal turns the accepted quality requirement into a reviewable sequence for a future engine. It separates source evidence from interpretation, preserves differences and requires human review. It does not select an AI model, assign scores, or define heatmap semantics.

## Proposed workflow

### 1. Freeze the assessment context

Work from the reviewed profile, question set, configured themes and participant-group definitions for one assessment version. Keep their version and source identifiers attached to later drafts. If the profile or questions change, mark affected analysis stale and require a deliberate refresh; never silently relabel old evidence.

### 2. Register and segment source material

For each permitted survey response, interview note or role-context source, preserve a stable source identifier and the metadata needed to interpret it: assessment, source type, participant code, permitted role group, question and relevant context. Split material into reviewable passages only when enough surrounding context remains to understand the statement. Keep the original source separate from extracted text and draft findings.

If attribution, source context or permission is missing or ambiguous, flag it for correction or exclusion. Do not guess a participant or role.

### 3. Map evidence to the agreed scope

Associate each passage with relevant questions, configured themes and role groups. Allow a passage to relate to more than one theme when the reviewer confirms the connection. Mark off-topic, ambiguous or unmapped material for review; do not force every passage into a theme. Any new or emergent theme needs explicit consultant review before it is used in synthesis.

### 4. Describe observations before making claims

Keep a source-grounded description distinct from an interpretation. For each candidate claim, identify passages that support it, qualify its scope, genuinely contradict it, or do not speak to it. Preserve useful context and disconfirming cases. A passage that says nothing about a theme is not evidence that the theme is absent.

### 5. Compare patterns within and across themes and roles

First examine the evidence within each theme and role group, then compare relevant patterns across groups and themes. Surface convergence, differences, exceptions, gaps and possible alternative explanations. Preserve the context in which accounts differ. Do not infer causation from themes appearing together, treat repeated passages from the same participant as independent confirmation, or turn counts into a strength score.

If coverage is sparse, attribution is unclear or accounts cannot be reconciled, show that limitation and avoid a broad cohort claim. No numerical minimum, weighting rule or confidence score is set by this proposal.

### 6. Draft a bounded finding

Each candidate finding should include:

- a concise statement of the observed pattern, bounded to the evidence and context;
- the themes and role groups it covers;
- direct source links for supporting, qualifying and contrary evidence;
- missing or sparse coverage and any unresolved disagreement;
- uncertainty and a plausible alternative interpretation where relevant.

The consultant can inspect each source, edit the claim, reject it or keep it out of the report. The system must not turn a draft into an accepted finding without an explicit human action and a recorded version/review state.

### 7. Draft recommendations only from accepted findings

For each proposed recommendation, show the accepted finding it addresses, the evidence-based rationale, a practical action and its intended outcome. State assumptions and a possible follow-up check. Keep recommendation wording proportionate to the finding. If the evidence is too thin or mixed to justify an action, present a question for further inquiry or no recommendation rather than force one.

The consultant separately edits, accepts or rejects each recommendation. Revisions to a finding reopen linked recommendation and report review.

### 8. Assemble reviewed outputs

Only accepted findings and recommendations can enter a report draft. Keep source provenance available to permitted reviewers while excluding restricted raw evidence from client-facing material by default. Preserve review state and the version that was reviewed. Publication and export remain separate decisions and controls.

## Human review and possible automation

This is a proposed analytical workflow, not a commitment to automate every step. A future system may help organise source passages or suggest candidate groupings, but any generated interpretation must remain a draft with inspectable source links, uncertainty and a consultant edit/reject action. Permitted inputs, model/prompt versioning, failure handling and evaluation require separate decisions before AI processing is designed, especially for client evidence.

## Evaluation before implementation is treated as useful

Review the proposed workflow against the [synthetic method cases](2026-10-27-sprint-6-method-cases.md) and the [single-topic example](2026-10-27-sprint-6-worked-example.md). Add cases for:

- related evidence across themes and roles;
- corroborating accounts and genuinely differing accounts;
- sparse, missing, misattributed and off-topic evidence;
- a plausible-sounding claim that the sources do not support;
- a recommendation that overreaches its accepted finding.

For each case, record the expected handling, the user's edits or rejection, and why. Check source traceability, whether contrary evidence is preserved, overclaiming, scope, uncertainty and recommendation linkage. Agree useful evaluation thresholds only after review examples and a baseline exist; do not invent numerical targets in advance.

## Heatmap boundary — D-04 remains open

The user requested exploration of a heatmap. This proposal leaves its role and semantics undecided. Before a heatmap is designed or populated, agree what each unit represents, how source evidence becomes a cell, how mixed/sparse/missing cases appear, the applicable privacy and review rules, and the legend and accessible non-colour cues. Do not display an individual score or rank. See the [D-04 decision questions](2026-10-27-sprint-6-method-cases.md#heatmap-design-questions--d-04-remains-open).

## Accepted scope and remaining limits

The user, as intended consultant and product decision co-owner, accepted this workflow and will act as reviewer and approver for its synthetic prototype implementation. D-21 records that decision. It does not establish validation for real assessments, approve live evidence processing, or choose an AI provider. D-04 remains open; no heatmap meaning, values or aggregation rules are approved. Revisit the method, governance and evaluation before any live-data use or client-facing analytical claims.
