# 5 Deploy

## Purpose

Release a known version to a defined audience and data environment with a way to recover from failure.

## Release checklist

- Confirm target audience, environment, hosting owner, data ownership, jurisdiction and permitted data classification. Separate prototype, pilot and live-data approval.
- Confirm access controls, client isolation, retention/deletion, audit records, incident contacts and any AI-processing arrangement for that data class.
- Verify secrets and configuration are outside source control, have owners and can be rotated. Check that logs and analytics exclude restricted assessment content.
- Run the release-candidate checks and record the exact commit/build, dependency versions, environment and linked test evidence.
- Rehearse migrations, backup/restore and rollback or safe shutdown where applicable; define a rollback trigger and who can act.
- Define who approves the software release, who approves live data use and who can approve publication of reports; record each decision separately.
- Provide user guidance, accessibility support, known limitations, support contact and escalation route.
- Enable monitoring for availability, failed imports/exports, access failures and data exposure signals before opening the pilot.
- Start with a limited pilot, record feedback and decide explicitly before expanding access or data class.

## Release record template

- Version/build and deployment time:
- Audience, environment and permitted data class:
- Requirements and test evidence:
- Known issues and accepted risks with owners:
- Data, security, assessment-method and product approvers:
- Migration/backup result and rollback trigger/owner:
- Monitoring dashboard, alert recipient and support contact:
- Pilot success measures and decision date:

## Exit evidence

Release record completed, pilot support ready and rollback or safe shutdown rehearsed. Live client evidence is gated on approved governance, security and data-processing controls; a previous demo release is not sufficient evidence.

## AI use

AI can prepare checklists and inspect deployment evidence. An authorised human checks the evidence and makes the release, data-use and report-publication decisions.
