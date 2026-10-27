import { Badge, Button, Notice } from "@/components/ui/primitives";
import {
  canReview,
  isStale,
  type AssessmentDraft,
  type Question,
} from "./model";
export function QuestionReview({
  draft,
  onEdit,
  onRefresh,
  onReview,
}: {
  draft: AssessmentDraft;
  onEdit: (id: string, patch: Partial<Question>) => void;
  onRefresh: () => void;
  onReview: () => void;
}) {
  const set = draft.questionSet;
  if (!set) return null;
  return (
    <div className="stack">
      <Notice title="Illustrative question templates">
        These examples demonstrate the connection to your profile. They are not
        AI output or an approved question bank. Review and adapt the wording and
        role scope before use.
      </Notice>
      {isStale(draft) && (
        <Notice title="The profile has changed" warning>
          These questions retain their earlier profile snapshot. Refreshing
          replaces this draft and its edits.
          <p>
            <Button onClick={onRefresh}>Refresh sample questions</Button>
          </p>
        </Notice>
      )}
      {set.questions.map((q, i) => (
        <article className="card card-body intake-question" key={q.id}>
          <div className="intake-inline">
            <Badge tone="purple">{q.kind}</Badge>
            <span className="muted">
              {q.topic} · {q.id}
            </span>
          </div>
          <label htmlFor={`question-${q.id}`}>Question {i + 1} wording</label>
          <textarea
            id={`question-${q.id}`}
            value={q.text}
            maxLength={2000}
            onChange={(e) => onEdit(q.id, { text: e.target.value })}
          />
          <label htmlFor={`role-${q.id}`}>Question {i + 1} role scope</label>
          <input
            id={`role-${q.id}`}
            value={q.role}
            maxLength={1000}
            onChange={(e) => onEdit(q.id, { role: e.target.value })}
          />
          <label className="intake-check">
            <input
              type="checkbox"
              aria-label={`Include question ${i + 1}`}
              checked={q.included}
              onChange={(e) => onEdit(q.id, { included: e.target.checked })}
            />
            Include this question
          </label>
          <details className="intake-disclosure">
            <summary>Why this question?</summary>
            <div data-testid="question-basis">
              <p className="eyebrow">Captured profile · {q.basis}</p>
              <p className="intake-preserve">
                {set.profile[q.basis] ||
                  "No supporting detail entered. Consultant input needed."}
              </p>
              <p className="muted">{q.rationale}</p>
            </div>
          </details>
        </article>
      ))}
      <div className="card card-body stack">
        <label className="intake-check">
          <input
            id="question-review"
            type="checkbox"
            checked={draft.reviewed}
            disabled={!canReview(draft)}
            onChange={onReview}
          />
          I have reviewed the included wording, role scope and profile links.
        </label>
        {!canReview(draft) && (
          <p className="field-hint">
            Use the current profile and include at least one question. Every
            included question needs wording and role scope.
          </p>
        )}
      </div>
    </div>
  );
}
