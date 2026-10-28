import { ActionLink, Badge, Button, Notice } from "@/components/ui/primitives";
import type { AssessmentDraft } from "../intake/model";
import { canAcceptRecommendation, type RecommendationPatch } from "./model";
const fields = [
  ["action", "action"],
  ["rationale", "rationale"],
  ["intendedOutcome", "intended outcome"],
  ["followUpCheck", "follow-up check"],
] as const;
export function DemoRecommendations({
  draft,
  onPrepare,
  onChange,
  onNoRecommendation,
}: {
  draft: AssessmentDraft;
  onPrepare: () => void;
  onChange: (id: string, patch: RecommendationPatch) => void;
  onNoRecommendation: (patch: { reason?: string; reviewed?: boolean }) => void;
}) {
  const demo = draft.demo!;
  const findings = demo.findings.filter((f) => f.decision === "accepted");
  const recommendations = demo.recommendations.filter((r) =>
    findings.some((f) => f.id === r.findingId),
  );
  if (!demo.evidenceReviewed || !findings.length)
    return (
      <Notice title="Accept a finding first">
        Recommendations need a reviewed basis.
        <ActionLink href={`/drafts/${draft.id}/findings`}>
          Review cohort findings
        </ActionLink>
      </Notice>
    );
  return (
    <div className="stack">
      <Notice title="Review the proposed actions">
        Start from an accepted finding. Describe a practical action, explain how
        the evidence justifies it and state the intended outcome. Add an
        optional follow-up check, then accept or reject your draft. Agree owners
        and dates with the sponsor.
      </Notice>
      {findings.some(
        (f) => !recommendations.some((r) => r.findingId === f.id),
      ) && <Button onClick={onPrepare}>Prepare demo recommendations</Button>}
      {recommendations.map((r) => (
        <article className="card card-body stack" key={r.id}>
          <div className="intake-inline">
            <Badge
              tone={
                r.decision === "accepted"
                  ? "success"
                  : r.decision === "rejected"
                    ? "neutral"
                    : "warning"
              }
            >
              {r.decision}
            </Badge>
            <h2>{r.id} · Proposed action</h2>
          </div>
          {r.workedExample && (
            <Badge tone="purple">Prepared synthetic worked example</Badge>
          )}
          <p>
            Basis: {r.findingId} ·{" "}
            {findings.find((f) => f.id === r.findingId)!.title}
          </p>
          <blockquote className="demo-passage">
            {findings.find((f) => f.id === r.findingId)!.text}
          </blockquote>
          {r.action === undefined ? (
            <label className="field">
              Recommendation {r.id} wording
              <textarea
                value={r.text}
                maxLength={4000}
                onChange={(e) => onChange(r.id, { text: e.target.value })}
              />
            </label>
          ) : (
            fields.map(([key, label]) => (
              <label className="field" key={key}>
                Recommendation {r.id} {label}
                {key === "followUpCheck" ? " (optional)" : ""}
                <textarea
                  maxLength={4000}
                  value={r[key] ?? ""}
                  onChange={(e) => onChange(r.id, { [key]: e.target.value })}
                />
              </label>
            ))
          )}
          <div className="intake-inline">
            <Button
              aria-label={`Accept recommendation ${r.id}`}
              disabled={
                !canAcceptRecommendation(draft, r.id) ||
                r.decision === "accepted"
              }
              onClick={() => onChange(r.id, { decision: "accepted" })}
            >
              Accept recommendation
            </Button>
            <Button
              className="button-secondary"
              aria-label={`Reject recommendation ${r.id}`}
              disabled={r.decision === "rejected"}
              onClick={() => onChange(r.id, { decision: "rejected" })}
            >
              Reject recommendation
            </Button>
          </div>
        </article>
      ))}
      <section className="card card-body stack">
        <h2>When no recommendation is justified</h2>
        <p>
          If the evidence supports further inquiry without an action, record
          your reason and confirm this decision. Reject any accepted
          recommendations first.
        </p>
        <label className="field">
          Reason for no recommendation
          <textarea
            maxLength={4000}
            value={demo.noRecommendation?.reason ?? ""}
            onChange={(e) => onNoRecommendation({ reason: e.target.value })}
          />
        </label>
        {demo.noRecommendation?.reviewed && (
          <Badge tone="success">No recommendation · reviewed</Badge>
        )}
        <div>
          <Button
            disabled={
              !demo.noRecommendation?.reason.trim() ||
              !!demo.noRecommendation.reviewed ||
              recommendations.some((r) => r.decision === "accepted")
            }
            onClick={() => onNoRecommendation({ reviewed: true })}
          >
            Confirm no recommendation
          </Button>
        </div>
      </section>
      {(recommendations.some((r) => r.decision === "accepted") ||
        demo.noRecommendation?.reviewed) && (
        <ActionLink href={`/drafts/${draft.id}/report`}>
          Preview report
        </ActionLink>
      )}
    </div>
  );
}
