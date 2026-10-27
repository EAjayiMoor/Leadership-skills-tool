import { ActionLink, Badge, Notice } from "@/components/ui/primitives";
import type { AssessmentDraft } from "../intake/model";
import { SourceLinks } from "./source-links";
export function DemoInterviewBrief({ draft }: { draft: AssessmentDraft }) {
  const records = draft.demo!.records.filter(
    (r) => r.type === "Survey" && r.participant === "P01",
  );
  return (
    <div className="stack">
      <Notice title="Prepared interview examples">
        These follow-ups illustrate how the captured question and sample
        response support a consultant&apos;s interview preparation. They are for
        review; no interview is scheduled or recorded.
      </Notice>
      {records.map((r) => (
        <section className="card card-body stack" key={r.id}>
          <Badge tone="purple">{r.question.topic}</Badge>
          <h2>{r.question.text}</h2>
          <p className="body-copy">
            Possible follow-up: Could you describe an example, what helped, and
            what remained unclear?
          </p>
          <p className="field-hint">Role scope: {r.question.role}</p>
          <SourceLinks draftId={draft.id} ids={[r.id]} />
        </section>
      ))}
      <ActionLink href={`/drafts/${draft.id}/interviews`}>
        View sample interview notes
      </ActionLink>
    </div>
  );
}
