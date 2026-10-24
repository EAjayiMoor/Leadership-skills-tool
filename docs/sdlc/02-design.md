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
