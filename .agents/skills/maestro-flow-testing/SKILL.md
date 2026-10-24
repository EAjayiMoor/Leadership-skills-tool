---
name: maestro-flow-testing
description: Design, run, and debug Maestro end-to-end UI flows for this product once a runnable web or mobile interface exists. Use for critical assessment journeys, permissions, and report publication; not for unit tests or before an app can run.
---

# Maestro flow testing

Use this skill when adding or maintaining executable UI flows for the leadership assessment product. Consult the current [Maestro documentation](https://docs.maestro.dev/) for command syntax and platform support before writing a flow.

## Choose the flow

Prioritise a user outcome that crosses screens or services: configure an engagement, import evidence, prepare a brief, review a finding, or export a report. Express the expected result in user terms and identify the approved test data and required user role.

## Write and run

1. Start from a known app state and a dedicated test account or synthetic fixture.
2. Prefer stable accessibility IDs for controls whose text or layout may change. Keep labels meaningful for users.
3. Place flows under `.maestro/` with descriptive names and keep reusable setup small.
4. Assert visible outcomes and blocked access, not just that taps completed.
5. Run the flow on the supported target device or browser and inspect failures before editing selectors.
6. Record the command, environment, result and any unresolved limitation in `docs/sdlc/04-test.md` or a linked test record.

Do not put client assessment evidence, personal data or credentials in flow files or screenshots. Do not treat a passing UI flow as proof of the assessment method, evidence provenance, accessibility or security; those need their own checks.

## Product-specific first flows

- A consultant can configure a second engagement without code changes.
- Invalid input produces a useful error and preserves safe work.
- A finding retains its source evidence and review state through report export.
- A user without permission cannot open raw evidence or another engagement.

Maestro browser testing is currently beta and Chromium-only. Use it as an optional web pilot until it meets the project's browser coverage needs.
