# Skill audit

Snapshot: 24 October 2026. This audit covers skills checked into this repository. It distinguishes an instruction skill from the tool, test suite or human decision needed to carry out the work.

## Current inventory

| Group | Installed skills | Useful stages |
| --- | --- | --- |
| Superpowers discovery and planning | `brainstorming`, `writing-plans` | Plan, Design |
| Superpowers implementation workflow | `using-git-worktrees`, `subagent-driven-development`, `executing-plans`, `test-driven-development` | Build |
| Superpowers review and recovery | `requesting-code-review`, `receiving-code-review`, `verification-before-completion`, `systematic-debugging`, `finishing-a-development-branch` | Build, Test, Deploy, Maintain |
| Expo | `expo-overview`, `expo-project-structure`, `expo-router`, `expo-data-fetching` | Design and Build **only if Expo is selected** |
| Vercel React best practices | `react-best-practices` | Build and review **when React/Next.js code exists** |
| Project-authored Maestro | `maestro-flow-testing` | Test, once a runnable interface exists |

Total: **17** repository-local skills: 11 Superpowers, four Expo, one Vercel React and one Maestro. All have a `SKILL.md` with valid `name` and `description` metadata. Upstream helper scripts are present but have not been run as part of this audit. The optional Superpowers visual companion contains an external brand-image URL; keep private product material out of that companion.

These are selected upstream sets. The broader Expo catalogue includes design, native UI and EAS skills that are unnecessary until an Expo direction is chosen. The broad Superpowers `using-superpowers` router and unrelated meta skills were intentionally omitted; `AGENTS.md` gives this project its routing context. Neither a Maestro executable nor a Playwright test runner has been installed in the repository: a skill file supplies instructions, not the underlying software.

## Skills available to this chat outside the repository

This Codex session also has `skill-creator`, `skill-installer`, `openai-docs`, document, PDF and spreadsheet skills, plus visualization and image-generation skills. These can help review source artefacts or create project materials. They are supplied by the local Codex environment or plugins, **not checked into this repository**, so another contributor may not have the same set. Other session skills target Pages, slides, templates, Excel control and ChatGPT Pets; they do not fill the product engineering gaps below.

## Coverage against this product

| Need | Current coverage | Gap and recommended response | Timing |
| --- | --- | --- | --- |
| Product discovery and implementation planning | Superpowers planning skills, stage files and decision log | No extra generic planning skill needed. Validate first user, buyer and success measures with people. | Now |
| Assessment method and evidence traceability | Product boundaries in `AGENTS.md` and requirements register | Create a narrow **assessment-method-review** skill only after the assessment owner supplies the method, examples and heatmap rules. A skill must not invent them. | During Plan/Design |
| Web interface design | Vercel's React performance skill is available conditionally; Expo skills are conditional too | Choose the web framework first. If it is React/Next.js, use the Vercel skill for performance and add a web accessibility review workflow. If another framework is chosen, find guidance for that framework. | After D-03 framework choice |
| Browser end-to-end tests | Maestro skill covers optional flows | Add a Playwright web testing skill/tool when a runnable app exists. Use a cross-browser test suite as the default proposal; pilot Maestro web separately. | Build/Test |
| Sensitive evidence and access controls | PRD-derived boundaries and security stage checks | Add a focused **sensitive-evidence-review** skill once data flow, roles, hosting and retention are agreed. Use an explicit security verification baseline, such as [OWASP ASVS](https://asvs.owasp.org/), in the design and test plan. | Design, before live data |
| Accessibility | Mentioned in the Test stage | Add explicit acceptance criteria and review steps against [WCAG 2.2](https://www.w3.org/TR/wcag/) for the chosen web interface. A dedicated skill is useful if accessibility review will recur. | Design/Test |
| AI-generated questions, summaries and reports | Human review and provenance rules in `AGENTS.md` | Create an **AI-output-evaluation** skill when a specific AI use case is approved. It should test evidence support, uncertainty, missing information and review behaviour against a labelled sample set. | Before AI feature release |
| Deployment and operations | Deploy/Maintain stage files; Superpowers branch completion and debugging | Hosting-specific deployment, monitoring and incident skills cannot be chosen until architecture and provider decisions are made. | After D-07 |

## Activation and quality findings

1. **Codex discovery:** The current chat was launched from the parent `FS tool` directory. Codex scans repository skills from the task's working directory up to the repository root, so these nested repository skills are expected to be available when a Codex task is opened **in `Leadership-skills-tool`**. Their appearance in a fresh repo-root task has not yet been verified. [Official OpenAI documentation](https://learn.chatgpt.com/docs/build-skills#where-codex-loads-local-skills).
2. **Expo fit:** Expo skills are available but should not determine the web framework. The first interface is web-first, while a later native app remains an open product choice. [Expo skill catalogue](https://docs.expo.dev/skills/).
3. **Maestro fit:** Maestro's browser support is beta and Chromium-only. It can be piloted for flows, but that is not the current basis for the main browser coverage decision. [Maestro web support](https://docs.maestro.dev/get-started/supported-platform/web-browser).
4. **Skill volume:** Seventeen installed skills are already substantial. Add a skill only when it changes decisions or makes a repeated task more reliable. Keep skills short and scoped; keep changing product facts in stage documents and decision records. [Official OpenAI skill guidance](https://learn.chatgpt.com/docs/build-skills#best-practices).

## Proposed next additions

1. **Now:** Open the repository root as a Codex project/task and verify local skill discovery. Avoid further general-purpose additions without a defined need.
2. **After first web framework decision:** If React/Next.js is selected, use the installed Vercel performance skill. Add a browser testing skill when a runnable app exists. The [official Playwright CLI skill](https://playwright.dev/agent-cli/skills) is available for browser-driving tasks; select it only if that CLI is part of the workflow.
3. **After assessment and governance inputs:** Create product-specific assessment-method and sensitive-evidence skills from approved rules and examples.
4. **When AI features are scoped:** Add evaluation guidance and a labelled test set for each generated output type.

The biggest setup risks are **undiscovered repo skills**, **premature stack-specific skills**, and **a methodology skill written before the assessment method exists**. These are more consequential than the raw number of installed skills.
