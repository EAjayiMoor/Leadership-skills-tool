# 5 Deploy

## Purpose

Release a known version to a defined audience and data environment with a way to recover from failure.

## Release checklist

- Confirm environment, hosting owner, data ownership and permitted data classification.
- Confirm access controls, retention/deletion, audit records and AI-processing arrangements.
- Verify secrets and configuration are outside source control.
- Run release-candidate checks and record the exact version and test evidence.
- Plan migration, backup and rollback where applicable.
- Define who can approve publication of reports and who can approve the software release.
- Provide user guidance and a support contact.
- Start with a limited pilot and record feedback before broader use.

## Exit evidence

Release record with version, approvers, intended users, data class, checks, known issues, rollback path and monitoring owner. Live client evidence is gated on approved governance and security controls.

## AI use

AI can prepare checklists and inspect deployment evidence. An authorised human makes the release and data-use decisions.
