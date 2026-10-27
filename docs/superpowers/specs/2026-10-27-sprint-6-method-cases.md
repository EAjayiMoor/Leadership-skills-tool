# Sprint 6 method cases and heatmap questions

**Status:** The user reviewed these cases as sensible on 27 October 2026. They remain candidate evaluation cases, not an approved assessment method.

**Date:** 27 October 2026

**Decisions/requirements:** D-04; D-20; FR-18; FR-19; FR-23

**Data:** Newly authored synthetic passages only.

## Purpose

Extend the [reviewed single-topic example](2026-10-27-sprint-6-worked-example.md) with cases that test whether a proposed findings process handles multiple themes, genuine disagreement, thin coverage and unsupported interpretations. The [evidence-to-finding method proposal](2026-10-27-sprint-6-evidence-method-proposal.md) describes a candidate workflow for these cases. The cases define questions for review; their expected handling is a candidate quality bar, not a validated method.

The user, as intended consultant and product decision co-owner, reviewed these cases as sensible. This is not method approval. A separate assessment-method approval role has not been recorded. Keep the method labelled as proposed until the method review and ownership are resolved.

## Candidate method cases

### A. Related evidence across themes and roles

Synthetic evidence:

- **Shared direction · research role:** “In monthly planning, the programme priorities are clear and teams can explain why they matter.”
- **Decision clarity · manufacturing role:** “When a manufacturing constraint changes, we know to escalate, but it is not always clear who decides the commercial consequence.”
- **Role handoffs · commercial role:** “The follow-up owner is clear when priorities stay fixed; when they change, the next action can sit between research and commercial.”

Candidate handling: show the relationship across the themes and role groups while preserving the distinction between routine priority alignment and changed-priority ownership. Cite every passage. Do not collapse the observations into a global judgement that leadership alignment is either strong or weak, and do not claim that one theme causes another.

### B. Genuinely differing accounts

Synthetic evidence:

- **Operations role:** “The named decision owner is clear at each weekly review, even when priorities change.”
- **Commercial role:** “If the plan changes, I do not know whether manufacturing or commercial leads the next step.”
- **Interview note:** “It works for routine approvals. For an exception, we decide case by case.”

Candidate handling: retain the difference and its context. A possible interpretation is that routine approvals are clearer than exceptions; the evidence does not support averaging the accounts into a single positive/negative value. Show whether more evidence is needed to decide if the difference reflects role, context or one isolated experience.

### C. Sparse coverage

Synthetic evidence:

- **One role group, one survey response:** “We normally know who owns decisions.”
- No responses from the other configured groups and no interview material on the theme.

Candidate handling: flag that evidence is insufficient for a cohort-wide conclusion. Do not treat missing responses as evidence of weak capability, strong capability or agreement. Do not issue a substantive recommendation from this passage alone; a consultant may choose to gather more evidence.

### D. Interpretation unsupported by the sources

Synthetic evidence:

- **Survey passage:** “In some changed-priority decisions, I still have to ask who owns the next step.”

Proposed claim to challenge: “Leaders resist accountability.”

Candidate handling: reject or rewrite the claim. The passage reports uncertainty about ownership; it does not establish motive, resistance or an individual trait. Require direct support for every part of a finding.

## Review questions for the findings process

1. Does it keep source statements separate from the consultant's interpretation?
2. Can each finding be inspected against supporting, qualifying and genuinely contrary evidence?
3. Does it preserve differences by theme, role and context without inferring cause?
4. Does it identify sparse, missing or off-topic evidence and avoid turning absence into a negative finding?
5. Can the consultant edit, reject or withhold a finding and record why?
6. Does a recommendation follow from an accepted finding, explain its rationale and intended outcome, and stay within the evidence?

These cases should be expanded with examples the user considers useful and failed. No evidence counts, confidence values, category cut-offs or minimum group sizes are selected here.

## Heatmap design questions — D-04 remains open

The user asked to explore including a heatmap. A cohort-level visual can be considered alongside the source-linked findings. The meaning of a cell and its colours must be agreed before any populated heatmap is implemented or shown as an assessment result.

Resolve these points with the product and assessment-method reviewers:

- What unit does one cell represent, and what do its rows and columns represent?
- What exactly does a cell communicate: an assessed theme, an evidence state, a reviewed finding, or another defined result?
- What evidence and synthesis rules determine a cell, and how is adequacy established?
- How are corroborating, mixed, contradictory, sparse, missing and not-assessed cases distinguished?
- What minimum cohort/privacy constraints apply before displaying a cell?
- Can each cell open the reviewed rationale and permitted source evidence?
- Which draft/review states may appear in a working view, and what may appear in a client-facing report?
- What labels, patterns or other accessible cues accompany colour?

No axes, legend, colour semantics, values, aggregation rules, thresholds or heatmap mock data are chosen in this note. Do not use a heatmap to score or rank individuals.

## Gate before implementation

1. The user reviews these synthetic cases and records corrections or rejected interpretations.
2. The assessment-method approval role is identified and reviews the worked cases and any proposed heatmap meaning.
3. The requirements and Sprint 6 acceptance examples are updated with the agreed method and limits.
4. Only then is the smallest evidence-linked synthesis and heatmap slice designed for implementation. AI use, if proposed, needs its own permitted-input, output, review and evaluation decisions.

Until then, the connected demo's prepared findings and recommendations remain illustrative templates.
