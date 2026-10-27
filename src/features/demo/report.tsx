import { Badge, Button, Notice } from "@/components/ui/primitives";
import type { AssessmentDraft } from "../intake/model";
import {
  acceptedReportContent,
  canReviewReport,
  findingEvidenceIds,
  recommendationSections,
} from "./model";
import { SourceLinks } from "./source-links";
export function DemoReport({
  draft,
  onReview,
}: {
  draft: AssessmentDraft;
  onReview: (reviewed: boolean) => void;
}) {
  const demo = draft.demo!,
    content = acceptedReportContent(draft);
  const reviewed = demo.reportReviewed && canReviewReport(draft);
  return (
    <div className="stack">
      <Notice title="Local demonstration preview">
        Only accepted findings and recommendations are included. Raw participant
        passages are kept in the evidence workspace. This local review does not
        publish or export a report.
      </Notice>
      <div className="intake-inline">
        <Badge tone={reviewed ? "success" : "warning"}>
          {reviewed ? "Reviewed demo preview" : "Draft demo preview"}
        </Badge>
        <Button
          disabled={!canReviewReport(draft) || reviewed}
          onClick={() => onReview(true)}
        >
          Confirm demo report review
        </Button>
        {reviewed && (
          <Button className="button-secondary" onClick={() => onReview(false)}>
            Reopen report review
          </Button>
        )}
        <Button disabled>Export report</Button>
      </div>
      <article className="card report-paper" aria-label="Demo report">
        <p className="eyebrow">
          Synthetic assessment · Consultant review preview
        </p>
        <h2>{demo.assessmentName}</h2>
        <p>{demo.purpose}</p>
        <h3>Accepted cohort findings</h3>
        {content.findings.length ? (
          content.findings.map((f) => (
            <section className="demo-report-section" key={f.id}>
              <h4>{f.title}</h4>
              <p>{f.text}</p>
              {f.scope && (
                <p>
                  <strong>Scope:</strong> {f.scope}
                </p>
              )}
              {f.qualifyingSummary && (
                <p>
                  <strong>Differing evidence:</strong> {f.qualifyingSummary}
                </p>
              )}
              {f.limitations && (
                <p>
                  <strong>Limitations:</strong> {f.limitations}
                </p>
              )}
              {f.alternative && (
                <p>
                  <strong>Alternative interpretation:</strong> {f.alternative}
                </p>
              )}
              <p className="field-hint">Internal source references</p>
              <SourceLinks draftId={draft.id} ids={findingEvidenceIds(f)} />
            </section>
          ))
        ) : (
          <p>No accepted findings yet.</p>
        )}
        <h3>Accepted recommendations</h3>
        {content.recommendations.length ? (
          content.recommendations.map((r) => (
            <section className="demo-report-section" key={r.id}>
              <h4>
                {r.id} · Based on {r.findingId}
              </h4>
              {recommendationSections(r).map((section) => (
                <p key={section.label}>
                  <strong>{section.label}:</strong> {section.text}
                </p>
              ))}
            </section>
          ))
        ) : content.noRecommendationReason ? (
          <section className="demo-report-section">
            <h4>Consultant decision: no recommendation</h4>
            <p>{content.noRecommendationReason}</p>
          </section>
        ) : (
          <p>No accepted recommendations yet.</p>
        )}
        <h3>Limitations</h3>
        <p>
          This preview uses prepared fictional examples and a small illustrative
          sample. It is not an assessment of a real organisation, a validated
          cohort finding or an individual evaluation. Actions need further
          discussion with the sponsor.
        </p>
      </article>
      <p className="field-hint">
        Draft and rejected items are omitted. Changing a finding or
        recommendation revokes the affected reviews and this report review.
      </p>
    </div>
  );
}
