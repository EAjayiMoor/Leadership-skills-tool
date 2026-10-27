# 2 Design

## Purpose

Turn the agreed first slice into an understandable user journey, defensible assessment method and implementable system design.

## Required work

- Map the journey from engagement setup to report approval, including permissions, missing inputs, import failures, review, revision, export and withdrawal.
- Define the data model and lifecycle for engagement, participant group, question set, response, source evidence, theme, finding, approval and output. Show versioning, deletion and audit events.
- Specify provenance from each published claim to permitted evidence, including how missing, conflicting or withdrawn evidence affects a finding.
- If a heatmap is included, agree its meaning, categories, aggregation, uncertainty, minimum group size and review process before building it. Use worked examples and counterexamples. A heatmap decision does not block earlier UI and workflow work.
- Use the [manual workflow context](../manual-workflow-observations.md) to understand how role context, survey and interview material, thematic synthesis and reporting connect. Validate the intended product method with assessment owners rather than copying the example workbook's mechanics.
- Agree roles and permissions for raw evidence, working findings and approved reports. Specify client isolation, least privilege and who can publish or revoke an output.
- Choose input schemas, validation rules, output formats and error handling; document any manual conversion step.
- Decide hosting, data ownership, retention, backup and AI-processing boundaries before designing for live data. Model misuse and accidental disclosure paths.
- Define any AI feature's permitted inputs, expected outputs, evidence references, review action, versioning, failure modes and evaluation examples.
- Use the [Moorhouse UI standard](../standards/Moorhouse-UI-Standard.md) for tokens, components, content and motion. Decide how its Next.js/Tailwind examples translate to the selected web stack; inventory missing logo and component assets rather than assuming they exist.
- Prototype the key screens with assessment users, including dense working views and report approval. Revise from observed usability and accessibility issues. Target WCAG 2.2 AA while meeting the standard's 2.1 AA floor; verify actual colour contrast rather than relying on a palette claim.
- Record architecture trade-offs, UI-standard exceptions and security/privacy assumptions in decision records.

## Work products

Sprint 1 UI design: [approved brief](../superpowers/specs/2026-10-25-sprint-1-ui-design.md), approved by the user as product decision co-owner on 25 October 2026. This approval covers the synthetic UI prototype; screen usability, accessibility and visual acceptance still require implementation evidence. Later method, data, permissions and production architecture decisions remain open.

Service journey and screen flows, information architecture, component/token mapping, method specification, data and access model, import/export contracts, threat review, AI feature specification if applicable, and acceptance examples linked to requirement IDs.

## Exit evidence

- Reviewed journey and screen flows, including onboarding, empty, loading, failure, approval and export states.
- Before thematic synthesis is implemented, a named assessment owner agrees how evidence supports a finding, how uncertainty is shown and how drafts are reviewed. A heatmap needs its own approved rules and examples only if it is included.
- Data and permissions model, including client separation, retention, deletion and source provenance.
- Architecture, threat and privacy reviews appropriate to the intended data environment; open risks are owned.
- UI-standard mapping, accessibility acceptance criteria and usability evidence from intended users.
- Acceptance examples and a test plan for every accepted first-slice requirement. AI evaluation examples exist if an AI feature is planned.

## AI use

AI may generate design alternatives and prototypes using approved sample data. Subject-matter, design and governance owners check source fidelity and approve the method, permissions and client-facing interpretation.

## 26 October 2026 — Profile intake

The user accepted the separate interactive profile/question/scenario mockup and requested integration on 26 October 2026. [Design](../superpowers/specs/2026-10-26-profile-intake.md) records the local synthetic boundary; real drafting/AI and production governance remain open.

## Connected demo design, 26 October 2026

The user approved the simplified loaded-sample route to an end-to-end demonstration. [Connected demo design](../superpowers/specs/2026-10-26-connected-demo.md) records the scoped behaviour and source/review safeguards. This acceptance defers real file formats and AI drafting; it does not approve a synthesis or heatmap method.

## Finding and recommendation quality, 27 October 2026

D-20 records the user's required quality bar for Sprint 6: substantive findings synthesize evidence across configured themes and roles, cite support and contrary evidence, expose gaps/conflicts, and communicate uncertainty and limits. Recommendations must be practical, trace to accepted findings, and state their rationale and intended outcome. The connected demo's topic-based finding text and generic action text are placeholders and do not meet this bar. The [candidate worked example](../superpowers/specs/2026-10-27-sprint-6-worked-example.md) is ready for the user's review; it tests one topic and explicitly leaves cross-theme method validation open. This is an accepted product quality requirement; the assessment-method owner must still define and evaluate the method and worked examples before substantive analysis is implemented or described as validated. No AI implementation is implied.

On 27 October 2026, the user reviewed the single-topic example as sensible and asked to explore including a heatmap. [Method cases and heatmap questions](../superpowers/specs/2026-10-27-sprint-6-method-cases.md) records the next synthetic review cases and open heatmap decisions. The heatmap request does not approve cell meanings or an aggregation method; D-04 remains open.

The user also reviewed the synthetic method cases as sensible and accepted the [evidence-to-finding workflow](../superpowers/specs/2026-10-27-sprint-6-evidence-method-proposal.md) for the synthetic prototype, acting as its method reviewer/approver (D-21). This does not validate the method for live evidence or client-facing analytical claims. Substantive prototype implementation may proceed against the accepted workflow; heatmap implementation remains gated on separate D-04 approval.
