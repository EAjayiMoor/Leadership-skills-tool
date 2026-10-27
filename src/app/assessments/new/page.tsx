import { AssessmentShell } from "@/components/assessment-shell";
import { IntakeWorkspace } from "@/features/intake/workspace";
export default function NewAssessment() {
  return (
    <AssessmentShell scenarioName="New assessment">
      <IntakeWorkspace />
    </AssessmentShell>
  );
}
