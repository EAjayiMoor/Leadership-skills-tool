import { ActionLink, Badge, Button, Notice } from "@/components/ui/primitives";
import type { AssessmentDraft } from "../intake/model";
import {
  canAcceptFinding,
  findingEvidenceIds,
  type DemoFinding,
  type EvidenceRelation,
  type FindingPatch,
} from "./model";
import { SourceLinks, sourceLabel } from "./source-links";
import { pharmaWorkedExample } from "./worked-example";
const fields = [
  ["text", "wording", "Write a claim grounded in the passages you selected."],
  ["scope", "scope", "Which role groups and situations does this claim cover?"],
  [
    "qualifyingSummary",
    "differing evidence",
    "Explain evidence that qualifies or contradicts the claim. If none was found, describe what you reviewed.",
  ],
  [
    "limitations",
    "limitations",
    "Record gaps and uncertainty. Missing evidence is not evidence of poor capability.",
  ],
  [
    "alternative",
    "alternative interpretation (optional)",
    "Could another explanation fit the same passages?",
  ],
] as const;
function EvidenceComparison({
  draft,
  finding,
  onChange,
}: {
  draft: AssessmentDraft;
  finding: DemoFinding;
  onChange: (patch: FindingPatch) => void;
}) {
  const records = draft.demo!.records;
  const questions = [
    ...new Map(records.map((r) => [r.question.id, r.question])).values(),
  ];
  return (
    <details className="synthesis-comparison">
      <summary>Compare sources for {finding.id}</summary>
      <p className="field-hint">
        Compare across topics and roles. Supports backs the claim; qualifies
        narrows it; contradicts challenges it; context explains the situation.
        Source counts do not establish prevalence or a score.
      </p>
      {questions.map((question) => {
        const group = records.filter((r) => r.question.id === question.id);
        return (
          <section className="synthesis-question stack" key={question.id}>
            <h3>{question.topic}</h3>
            <p>{question.text}</p>
            {[...new Set(group.map((r) => r.role))].map((role) => (
              <fieldset className="synthesis-role" key={role}>
                <legend>{role}</legend>
                {group
                  .filter((r) => r.role === role)
                  .map((record) => (
                    <div className="synthesis-source stack" key={record.id}>
                      <p className="field-hint">
                        {sourceLabel(record.id)} · {record.type} · Fictional
                        code {record.participant}
                      </p>
                      <blockquote className="demo-passage">
                        {record.text}
                      </blockquote>
                      <div className="synthesis-relation">
                        <label className="field">
                          Finding {finding.id} relation to source{" "}
                          {sourceLabel(record.id)}
                          <select
                            value={
                              finding.evidence?.find(
                                (e) => e.sourceId === record.id,
                              )?.relation ?? ""
                            }
                            onChange={(event) => {
                              const evidence = finding.evidence!.filter(
                                (e) => e.sourceId !== record.id,
                              );
                              if (event.target.value)
                                evidence.push({
                                  sourceId: record.id,
                                  relation: event.target
                                    .value as EvidenceRelation,
                                });
                              onChange({ evidence });
                            }}
                          >
                            <option value="">Not linked</option>
                            <option value="supports">Supports</option>
                            <option value="qualifies">Qualifies</option>
                            <option value="contradicts">Contradicts</option>
                            <option value="context">Context only</option>
                          </select>
                        </label>
                        <SourceLinks draftId={draft.id} ids={[record.id]} />
                      </div>
                    </div>
                  ))}
              </fieldset>
            ))}
          </section>
        );
      })}
    </details>
  );
}
export function DemoFindings({
  draft,
  onPrepare,
  onChange,
  onWorkedExample,
}: {
  draft: AssessmentDraft;
  onPrepare: () => void;
  onChange: (id: string, patch: FindingPatch) => void;
  onWorkedExample: () => void;
}) {
  const demo = draft.demo!;
  const example = pharmaWorkedExample(draft);
  const hasWorkedExample = demo.findings.some(
    (finding) => finding.workedExample,
  );
  if (!demo.evidenceReviewed)
    return (
      <Notice title="Review the evidence first">
        <ActionLink href={`/drafts/${draft.id}/evidence`}>
          Review demo evidence
        </ActionLink>
      </Notice>
    );
  return (
    <div className="stack">
      <Notice title="Develop an evidence-linked cohort finding">
        Compare the fictional passages, write a bounded claim and record its
        limits before accepting it. You make the interpretation and review
        decision. This synthetic workflow has not been validated for live
        assessments.
      </Notice>
      {demo.pack === "pharma" && (
        <section className="card card-body stack">
          <h2>Quick demo</h2>
          <p>
            Load a prepared synthetic finding and linked recommendation. Inspect
            the sources, edit if needed, then accept each draft to progress to
            the report.
          </p>
          <div>
            <Button onClick={onWorkedExample} disabled={!example.available}>
              Use pharma worked example
            </Button>
          </div>
          {!example.available && <p className="field-hint">{example.reason}</p>}
        </section>
      )}
      <p className="field-hint">
        One accepted finding is enough to continue with this demo. Other drafts
        can stay unfinished.
      </p>
      {!demo.findings.length ? (
        <Button onClick={onPrepare}>Prepare demo findings</Button>
      ) : (
        demo.findings.map((f) => {
          const card = (
            <article className="card card-body stack" key={f.id}>
              <div className="intake-inline">
                <Badge
                  tone={
                    f.decision === "accepted"
                      ? "success"
                      : f.decision === "rejected"
                        ? "neutral"
                        : "warning"
                  }
                >
                  {f.decision}
                </Badge>
                <h2>
                  {f.id} · {f.title}
                </h2>
              </div>
              {f.workedExample && (
                <Badge tone="purple">Prepared synthetic worked example</Badge>
              )}
              <label className="field">
                Finding {f.id} title
                <input
                  maxLength={4000}
                  value={f.title}
                  onChange={(e) => onChange(f.id, { title: e.target.value })}
                />
              </label>
              {f.evidence !== undefined ? (
                <EvidenceComparison
                  draft={draft}
                  finding={f}
                  onChange={(patch) => onChange(f.id, patch)}
                />
              ) : (
                <>
                  <p className="field-hint">
                    This saved example uses the earlier review format.
                  </p>
                  <h3>Supporting sample sources</h3>
                  <SourceLinks draftId={draft.id} ids={f.sourceIds} />
                  <h3>Differing sample sources</h3>
                  <SourceLinks draftId={draft.id} ids={f.counterSourceIds} />
                </>
              )}
              {fields
                .filter(([key]) => key === "text" || f.evidence !== undefined)
                .map(([key, label, hint]) => (
                  <label className="field" key={key}>
                    Finding {f.id} {label}
                    <textarea
                      maxLength={4000}
                      value={f[key] ?? ""}
                      onChange={(e) =>
                        onChange(f.id, { [key]: e.target.value })
                      }
                    />
                    <span className="field-hint">{hint}</span>
                  </label>
                ))}
              {f.evidence !== undefined && (
                <>
                  <h3>Selected source references</h3>
                  {f.evidence.length ? (
                    <SourceLinks
                      draftId={draft.id}
                      ids={findingEvidenceIds(f)}
                    />
                  ) : (
                    <p className="field-hint">No sources linked yet.</p>
                  )}
                </>
              )}
              <p className="field-hint">
                Two fictional response codes cannot establish cohort-wide
                prevalence or capability. Acceptance requires a claim, scope,
                differing-evidence summary, limitations and a supporting source.
              </p>
              <div className="intake-inline">
                <Button
                  disabled={
                    !canAcceptFinding(draft, f.id) || f.decision === "accepted"
                  }
                  aria-label={`Accept finding ${f.id}`}
                  onClick={() => onChange(f.id, { decision: "accepted" })}
                >
                  Accept finding
                </Button>
                <Button
                  className="button-secondary"
                  disabled={f.decision === "rejected"}
                  aria-label={`Reject finding ${f.id}`}
                  onClick={() => onChange(f.id, { decision: "rejected" })}
                >
                  Reject finding
                </Button>
              </div>
            </article>
          );
          return hasWorkedExample && !f.workedExample ? (
            <details className="card card-body demo-other-finding" key={f.id}>
              <summary>
                Other finding · {f.id} · {f.title} · {f.decision}
              </summary>
              {card}
            </details>
          ) : (
            card
          );
        })
      )}
      {demo.findings.some((f) => f.decision === "accepted") && (
        <ActionLink href={`/drafts/${draft.id}/recommendations`}>
          Continue to recommendations
        </ActionLink>
      )}
    </div>
  );
}
