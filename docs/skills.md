# Skill and tool strategy

Skills are operating guidance for AI agents. They do not replace product decisions, official framework documentation, tests or human approval.

See the [skill audit](skill-audit.md) for the complete installed inventory, stage coverage and recommended additions.

| Capability | Preferred source | When it applies | Repository treatment |
| --- | --- | --- | --- |
| Expo | Official `expo/skills` or official Codex Expo plugin | Later Expo app design, implementation, upgrades and EAS work | Keep available if requested, but do not assume Expo is the web stack |
| React performance | Vercel `react-best-practices` | Writing, reviewing or refining the selected Next.js/React application | Use the relevant rules; this skill does not replace visual design, accessibility and security checks |
| Web end-to-end testing | Official Playwright guidance | Main browser journey and cross-browser checks | Playwright and Chromium active for Sprint 1; other browser engines remain unverified |
| Maestro | Official Maestro documentation plus a reviewed project skill | Optional browser pilot now; mobile flows if a native app is built | Web support is beta and Chromium-only; evaluate before adopting as the main web test runner |
| Superpowers | `obra/superpowers` Codex plugin or reviewed skills | Discovery, specification, task plans, debugging and verification | Use selected methods; avoid copying a framework blindly |
| Product-specific | This repository's `AGENTS.md` and stage files | Every work item | Keep short, explicit and versioned |

## Selection checks before installing an external skill

1. Confirm upstream repository, licence and maintenance status.
2. Review the skill text and any scripts before enabling them.
3. Prefer a narrow skill that serves an actual stage task.
4. Record source URL, revision and local changes here.
5. Verify the skill is discoverable by the chosen agent in this repository.

## Activation record

| Skill | Source and revision | Scope | Status |
| --- | --- | --- | --- |
| Expo overview, project structure, router, data fetching | https://github.com/expo/skills at `d5caf7fdf8b4854351f05841a7e315ac87ad7d24` | Web-first decision; only activate for Expo work | Repository-local skills installed |
| Vercel React best practices | https://github.com/vercel-labs/agent-skills/tree/063bee94c3f4df8453406c830b0a7df0f2860278/skills/react-best-practices | React/Next.js performance guidance for the selected web stack | Repository-local skill installed |
| Maestro flow testing | https://docs.maestro.dev/ | Project-authored guidance; optional web pilot | Local skill added |
| Superpowers discovery, plans, worktrees, execution, tests, debugging, review and verification | https://github.com/obra/superpowers at `2ce8aa15d05bd57213e6f746f953aafb7ded7a8b` | Core workflow skills; apply when relevant | Repository-local skills installed |

The optional Superpowers visual companion has files that can fetch a brand image from its upstream site. Do not run that companion with private product content. The installed skills have not been used to build product code.

The selected Superpowers workflow skills form a complete dependency chain. The broad `using-superpowers` session router and unrelated meta skills were intentionally left out; `AGENTS.md` routes project work to the relevant skill. See [third-party notices](../THIRD_PARTY_NOTICES.md) for the installed names and licences.
