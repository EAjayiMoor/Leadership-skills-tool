"use client";
import { useState, useSyncExternalStore } from "react";
import { AssessmentShell } from "@/components/assessment-shell";
import { ActionLink, Notice, PageHeading } from "@/components/ui/primitives";
import { assessmentStages } from "../assessments/stages";
import type { AssessmentDraft } from "./model";
import { readDrafts } from "./storage";
import { IntakeWorkspace } from "./workspace";
import { DemoWorkspace } from "../demo/workspace";
import { demoProgress } from "../demo/model";
const subscribe = () => () => {};
export function SavedAssessment({ id, stage }: { id: string; stage: string }) {
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return ready ? (
    <LocalAssessment key={id + stage} id={id} stage={stage} />
  ) : (
    <AssessmentShell>
      <p role="status">Loading saved assessment...</p>
    </AssessmentShell>
  );
}
function LocalAssessment({ id, stage }: { id: string; stage: string }) {
  const [state, setState] = useState<{
    draft?: AssessmentDraft;
    error?: string;
  }>(() => {
    try {
      const result = readDrafts(window.localStorage);
      const draft = result.drafts.find((d) => d.id === id);
      return {
        draft,
        error:
          result.error ??
          (!draft
            ? "This saved assessment was not found on this browser. It may have been deleted or saved on another device."
            : undefined),
      };
    } catch {
      return {
        error:
          "Browser storage is unavailable. Your saved assessment could not be read.",
      };
    }
  });
  const known = assessmentStages.find((s) => s.slug === stage);
  return (
    <AssessmentShell
      scenarioName={state.draft?.profile.name || "Saved assessment"}
      draftId={state.draft?.id}
      stageProgress={state.draft ? demoProgress(state.draft) : undefined}
    >
      {state.error ? (
        <Notice title="Unable to open assessment" warning>
          <p>{state.error}</p>
          <ActionLink href="/">Return to workspace</ActionLink>
        </Notice>
      ) : !state.draft ? (
        <p role="status">Loading saved assessment…</p>
      ) : stage === "setup" || stage === "overview" ? (
        <IntakeWorkspace
          key={id + stage}
          initialDraft={state.draft}
          onSaved={(draft) => setState({ draft })}
        />
      ) : known ? (
        <DemoWorkspace
          key={id + stage}
          initialDraft={state.draft}
          stage={stage}
          onSaved={(draft) => setState({ draft })}
        />
      ) : (
        <>
          <PageHeading
            eyebrow="Saved synthetic assessment"
            title="Stage not found"
            description="Choose a known assessment stage to continue."
          />
          <ActionLink href={`/drafts/${id}/setup`}>
            Return to profile and questions
          </ActionLink>
        </>
      )}
    </AssessmentShell>
  );
}
