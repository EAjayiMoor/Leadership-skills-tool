import { ClipboardPenLine } from "lucide-react";
import type { AssessmentStage } from "../stages";
import {
  ActionLink,
  Badge,
  Notice,
  PageHeading,
} from "@/components/ui/primitives";

export function PrototypeStage({
  stage,
  scenarioId,
}: {
  stage: AssessmentStage;
  scenarioId: string;
}) {
  return (
    <>
      <PageHeading
        eyebrow="Assessment journey"
        title={stage.label}
        description={stage.description}
        action={<Badge tone="purple">Prototype stage</Badge>}
      />
      <section className="card placeholder-stage">
        <div className="placeholder-icon">
          <ClipboardPenLine size={26} strokeWidth={1.5} aria-hidden="true" />
        </div>
        <h2>A place for considered assessment work</h2>
        <p>
          This stage is included to show the full journey. Its operational
          features will follow as the assessment method, evidence permissions
          and review rules are agreed.
        </p>
        <Notice title="Keep consultant judgement at the centre">
          Questions, findings and recommendations will remain reviewable drafts,
          connected to their source evidence.
        </Notice>
        <div style={{ marginTop: 24 }}>
          <ActionLink href={`/assessments/${scenarioId}/evidence`}>
            Explore evidence review
          </ActionLink>
        </div>
      </section>
    </>
  );
}
