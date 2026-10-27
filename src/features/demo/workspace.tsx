"use client";
import { useState } from "react";
import {
  ActionLink,
  Badge,
  Button,
  Notice,
  PageHeading,
} from "@/components/ui/primitives";
import { useUnsavedChanges } from "@/lib/use-unsaved-changes";
import { canReview, type AssessmentDraft } from "../intake/model";
import { saveDraft } from "../intake/storage";
import { assessmentStages } from "../assessments/stages";
import { demoPacks, suggestedPack, type DemoPack } from "./packs";
import {
  loadDemo,
  isDemoStale,
  reviewEvidence,
  prepareFindings,
  changeFinding,
  prepareRecommendations,
  changeRecommendation,
  changeNoRecommendation,
  reviewReport,
} from "./model";
import { DemoEvidence, DemoInterviewNotes } from "./evidence";
import { DemoFindings } from "./findings";
import { DemoRecommendations } from "./recommendations";
import { DemoReport } from "./report";
import { DemoInterviewBrief } from "./interviews";
export function DemoWorkspace({
  initialDraft,
  stage,
  onSaved,
}: {
  initialDraft: AssessmentDraft;
  stage: string;
  onSaved: (draft: AssessmentDraft) => void;
}) {
  const [draft, setDraft] = useState(initialDraft);
  const [pack, setPack] = useState<DemoPack>(
    draft.demo?.pack ?? suggestedPack(draft.profile.sector),
  );
  const [message, setMessage] = useState("Saved on this browser");
  const [unsaved, setUnsaved] = useState(false);
  useUnsavedChanges(unsaved);
  function persist(next: AssessmentDraft) {
    const current = { ...next, updatedAt: new Date().toISOString() };
    setDraft(current);
    try {
      saveDraft(window.localStorage, current);
      setUnsaved(false);
      onSaved(current);
      setMessage("Saved on this browser");
    } catch {
      setUnsaved(true);
      setMessage(
        "Could not save demo changes. Your edits remain on this page. Retry saving before leaving.",
      );
    }
  }
  function act(change: () => AssessmentDraft) {
    try {
      persist(change());
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "The action could not be completed.",
      );
    }
  }
  const stale = isDemoStale(draft);
  const valid = draft.reviewed && canReview(draft);
  const demo = draft.demo;
  const title =
    assessmentStages.find((s) => s.slug === stage)?.label ?? "Assessment";
  return (
    <>
      <PageHeading
        eyebrow="Connected synthetic demo"
        title={
          stage === "evidence"
            ? "Evidence review"
            : stage === "report"
              ? "Report preview"
              : title
        }
        description="Follow the captured context through sample evidence, consultant review and a cohort report preview."
        action={<Badge tone="purple">Demo material only</Badge>}
      />
      <p role="status" className="intake-status">
        {message}
      </p>
      {unsaved && <Button onClick={() => persist(draft)}>Retry saving</Button>}
      {(!demo || stage === "evidence" || stale) && (
        <section className="card card-body stack">
          <h2>
            {demo ? "Demo evidence pack" : "No assessment evidence collected"}
          </h2>
          <p>
            Load a prepared fictional pack for this assessment. Every sample
            keeps a copy of the question wording, role scope and source
            reference. Question edits may make the example answers less
            relevant; inspect the fit before review.
          </p>
          <div className="demo-controls">
            <label>
              Demo scenario
              <select
                value={pack}
                onChange={(e) => setPack(e.target.value as DemoPack)}
              >
                {Object.entries(demoPacks).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.label}
                  </option>
                ))}
              </select>
            </label>
            <Button
              disabled={!valid}
              onClick={() => {
                if (
                  demo &&
                  !window.confirm(
                    "Replace the demo evidence? This resets evidence review, findings, recommendations and report review.",
                  )
                )
                  return;
                act(() => {
                  const next = loadDemo(draft, pack);
                  const url = new URL(window.location.href);
                  url.searchParams.delete("source");
                  window.history.replaceState(
                    null,
                    "",
                    url.pathname + url.search + url.hash,
                  );
                  return next;
                });
              }}
            >
              {demo ? "Replace demo evidence" : "Load demo evidence"}
            </Button>
          </div>
          <p className="field-hint">
            Two fictional participant codes, with sample survey responses and
            interview notes. This pack does not represent the configured real
            cohort. Edits and review decisions save on this browser.
          </p>
        </section>
      )}
      {!valid && !stale && (
        <Notice title="Question review needed" warning>
          Save a current reviewed question set before loading demo evidence.
          <ActionLink href={`/drafts/${draft.id}/setup`}>
            Return to profile and questions
          </ActionLink>
        </Notice>
      )}
      {stale ? (
        <Notice title="Configuration has changed" warning>
          The existing evidence still refers to its captured questions.
          Downstream review is paused. Review and save the updated
          profile/questions, then explicitly replace the demo pack to restart
          the demonstration.
          <ActionLink href={`/drafts/${draft.id}/setup`}>
            Review profile and questions
          </ActionLink>
        </Notice>
      ) : demo && valid ? (
        <div className="demo-stage-content">
          {stage === "evidence" && (
            <DemoEvidence
              key={demo.records[0].id}
              draft={draft}
              onReview={() => act(() => reviewEvidence(draft))}
            />
          )}
          {stage === "findings" && (
            <DemoFindings
              draft={draft}
              onPrepare={() => act(() => prepareFindings(draft))}
              onChange={(id, patch) =>
                act(() => changeFinding(draft, id, patch))
              }
            />
          )}
          {stage === "recommendations" && (
            <DemoRecommendations
              draft={draft}
              onPrepare={() => act(() => prepareRecommendations(draft))}
              onChange={(id, patch) =>
                act(() => changeRecommendation(draft, id, patch))
              }
              onNoRecommendation={(patch) =>
                act(() => changeNoRecommendation(draft, patch))
              }
            />
          )}
          {stage === "report" && (
            <DemoReport
              draft={draft}
              onReview={(value) => act(() => reviewReport(draft, value))}
            />
          )}
          {stage === "interview-preparation" && (
            <DemoInterviewBrief draft={draft} />
          )}
          {stage === "interviews" && <DemoInterviewNotes draft={draft} />}
        </div>
      ) : null}
    </>
  );
}
