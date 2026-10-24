# 3 Build

## Purpose

Implement the agreed design in small vertical slices that can be demonstrated and checked.

## Working sequence

1. Set up the chosen application stack, local setup instructions, dependency lockfile, lint/type/build checks, CI and a safe sample-data environment.
2. Implement the UI tokens and components needed for the first slice against the [Moorhouse UI standard](../standards/Moorhouse-UI-Standard.md); record any approved exceptions.
3. Implement engagement configuration and question variation.
4. Implement import validation and evidence organisation, including source identifiers and recovery from partial or invalid files.
5. Implement interview briefing preparation and editing.
6. Implement evidence-linked cohort findings, permissions, review states and audit events.
7. Implement the agreed heatmap and report export only after method approval.

Each slice needs a user-facing outcome, acceptance examples, relevant automated checks, code review and a short demo. Maintain a link from requirement to implementation and test evidence. Use synthetic or explicitly approved anonymised examples. Review AI-generated code for correctness, security, licensing, dependencies and data handling. Add migrations, configuration, telemetry and recovery steps when a slice needs them; keep secrets and assessment evidence out of the repository and logs.

## Definition of done for an increment

- Accepted behaviour and error states are implemented, with accessible keyboard and screen-reader paths for changed UI.
- Tests cover meaningful rules and critical failure cases; the agreed CI checks pass.
- Data access, provenance and human review boundaries are checked where affected.
- A reviewer can trace the change to requirement IDs, design decisions and demo evidence.
- User documentation, decision records and release notes are updated where behaviour changed.

## Exit evidence

- The agreed first slice works end to end with approved prototype data.
- A second configuration can be created without code changes.
- Findings retain provenance and review state through export.
- No secrets or live client evidence are committed to the repository.
- A new contributor can run the app and checks from the documented setup; CI is reproducible.

## AI use

Use the Vercel React skill if React/Next.js is chosen and Expo skills if Expo is chosen. Use Superpowers planning, debugging and verification methods where they fit the task. An AI-generated change receives the same review and checks as a human-authored change. Skills guide implementation; the reviewed design remains authoritative.
