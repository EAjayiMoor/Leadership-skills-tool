import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ActionLink, Badge, Button, Notice } from "@/components/ui/primitives";
import type { AssessmentDraft } from "../intake/model";
import { SourceLinks, sourceLabel } from "./source-links";
export function DemoEvidence({
  draft,
  onReview,
}: {
  draft: AssessmentDraft;
  onReview: () => void;
}) {
  const sourceId = useSearchParams().get("source");
  return (
    <EvidenceRecords
      key={sourceId ?? "default"}
      draft={draft}
      onReview={onReview}
      sourceId={sourceId}
    />
  );
}
function EvidenceRecords({
  draft,
  onReview,
  sourceId,
}: {
  draft: AssessmentDraft;
  onReview: () => void;
  sourceId: string | null;
}) {
  const records = draft.demo!.records;
  const [selectedId, setSelectedId] = useState(() => sourceId ?? records[0].id);
  const [filter, setFilter] = useState("");
  const [type, setType] = useState("all");
  const selected = records.find((r) => r.id === selectedId);
  const filtered = records.filter(
    (r) =>
      (type === "all" || r.type === type) &&
      `${r.id} ${r.participant} ${r.role} ${r.question.topic} ${r.text}`
        .toLowerCase()
        .includes(filter.toLowerCase()),
  );
  return (
    <div className="stack">
      <div className="demo-controls">
        <label>
          Search demo evidence
          <input
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </label>
        <label>
          Evidence type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">All evidence</option>
            <option>Survey</option>
            <option>Interview</option>
          </select>
        </label>
      </div>
      <div className="evidence-grid">
        <section
          className="card demo-source-list"
          aria-label="Demo source list"
        >
          <div className="card-header">
            <h2>{filtered.length} source records</h2>
          </div>
          {filtered.map((r) => (
            <button
              className="source-button"
              key={r.id}
              aria-pressed={r.id === selectedId}
              onClick={() => setSelectedId(r.id)}
            >
              <Badge tone="purple">{r.type}</Badge>
              <h3>{r.question.topic}</h3>
              <p>
                {r.participant} · {r.role}
              </p>
              <small>{sourceLabel(r.id)}</small>
            </button>
          ))}
          {!filtered.length && (
            <p className="card-body">No matching sample sources.</p>
          )}
        </section>
        <section
          className="card source-detail stack"
          aria-label="Demo source detail"
        >
          {selected ? (
            <>
              <Badge tone="warning">
                Fictional {selected.type.toLowerCase()} sample
              </Badge>
              <h2>{selected.question.topic}</h2>
              <p className="demo-id">{selected.id}</p>
              <dl className="detail-list intake-detail">
                <div>
                  <dt>Participant code</dt>
                  <dd>{selected.participant}</dd>
                </div>
                <div>
                  <dt>Role group</dt>
                  <dd>{selected.role}</dd>
                </div>
                <div>
                  <dt>Captured question · {selected.question.id}</dt>
                  <dd>{selected.question.text}</dd>
                </div>
                <div>
                  <dt>Reviewed question scope</dt>
                  <dd>{selected.question.role}</dd>
                </div>
              </dl>
              <blockquote className="demo-passage">{selected.text}</blockquote>
              <p className="field-hint">
                Prepared fictional material for demonstrating traceability. It
                is not a genuine response to the question above. Check relevance
                if you adapt the question wording.
              </p>
            </>
          ) : (
            <Notice title="Source not found in this assessment" warning>
              This link does not identify a record in the loaded pack.
              <Button onClick={() => setSelectedId(records[0].id)}>
                Show first source
              </Button>
            </Notice>
          )}
        </section>
      </div>
      <div className="card card-body stack">
        <h2>Evidence review</h2>
        <p>
          Inspect the fictional responses, question wording and attribution
          before continuing.
        </p>
        <Button disabled={draft.demo!.evidenceReviewed} onClick={onReview}>
          {draft.demo!.evidenceReviewed
            ? "Evidence review confirmed"
            : "Confirm evidence review"}
        </Button>
        {draft.demo!.evidenceReviewed && (
          <ActionLink href={`/drafts/${draft.id}/findings`}>
            Continue to findings
          </ActionLink>
        )}
      </div>
    </div>
  );
}
export function DemoInterviewNotes({ draft }: { draft: AssessmentDraft }) {
  return (
    <div className="stack">
      {draft
        .demo!.records.filter((r) => r.type === "Interview")
        .map((r) => (
          <article className="card card-body stack" key={r.id}>
            <Badge tone="purple">Sample interview note · {r.participant}</Badge>
            <h2>{r.question.topic}</h2>
            <p>{r.question.text}</p>
            <blockquote className="demo-passage">{r.text}</blockquote>
            <SourceLinks draftId={draft.id} ids={[r.id]} />
          </article>
        ))}
      <ActionLink href={`/drafts/${draft.id}/findings`}>
        Continue to findings
      </ActionLink>
    </div>
  );
}
