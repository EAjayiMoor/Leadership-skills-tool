# Working instructions for AI agents

## Product context

Build a consultant-led leadership assessment workflow. Preserve consultant judgement, evidence provenance, cohort-level reporting and controlled publication. Do not introduce automatic individual scores, rankings or employment recommendations.

The source PRD is a draft based on a meeting transcript. Distinguish a recorded meeting point, a proposal in the PRD, an approved product decision and an implemented feature. Never silently promote one category to another.

## Delivery process

1. Read the context relevant to the task: `README.md` for orientation, the applicable `docs/sdlc/` stage, and decision or requirement records when the work affects them.
2. State the user problem, expected outcome, acceptance checks and data sensitivity for each work item.
3. Make the smallest coherent change that proves the next product or technical assumption.
4. Keep evidence linked to claims: tests, screenshots, review notes, research or measured results as appropriate.
5. Update the relevant stage document and decision log when a decision changes.
6. Report what changed, how it was checked and what remains uncertain.

## Boundaries

- Use synthetic or explicitly approved anonymised examples until governance for live evidence is agreed.
- Keep raw evidence separate from approved findings and client-facing outputs.
- Require a human review step for generated questions, themes, recommendations and report text.
- Never present an AI-generated assessment of an individual as a validated finding.
- Do not invent a heatmap method. Record and resolve its meaning before implementing it.
- Do not commit secrets, client evidence or identifying assessment records.

## Skills

Use a task-specific skill when it applies. Expo skills are relevant only if the chosen client includes Expo. Maestro skills are relevant when executable UI flows exist; its browser support needs validation before it becomes the main web gate. Superpowers methods can guide planning, debugging, review and verification; repository instructions and the user's request govern scope. See `docs/skills.md` for provenance and activation.
