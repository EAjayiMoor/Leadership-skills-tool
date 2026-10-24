# Working instructions for AI agents

## Product context

Build a consultant-led leadership assessment workflow. Preserve consultant judgement, evidence provenance, cohort-level reporting and controlled publication. Do not introduce automatic individual scores, rankings or employment recommendations.

The source PRD is a draft based on a meeting transcript. Distinguish a recorded meeting point, a proposal in the PRD, an approved product decision and an implemented feature. Never silently promote one category to another.

## Delivery process

1. Read the context relevant to the task: `README.md`, `docs/sdlc/00-operating-model.md`, the applicable stage file, and decision or requirement records when the work affects them. Read the UI standard for interface work.
2. State the user problem, expected outcome, acceptance checks and data sensitivity for each work item.
   For build work, locate its sprint in `docs/build-sprint-plan.md` and record the skills activated, sprint validation and evidence needed. Read the linked skill when that task starts; do not assume an installed skill means its underlying test tool is installed.
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
- This repository is public. Use the redacted PRD under `docs/source/`; keep the named original and other identifying source material outside the repository.

## Skills

Use a task-specific skill when it applies. The Vercel React best practices skill applies to React/Next.js performance work if that stack is chosen; it does not decide the framework. Expo skills are relevant only if the chosen client includes Expo. Maestro skills are relevant when executable UI flows exist; its browser support needs validation before it becomes the main web gate. Superpowers methods can guide planning, debugging, review and verification; repository instructions and the user's request govern scope. See `docs/skills.md` for provenance and activation.
