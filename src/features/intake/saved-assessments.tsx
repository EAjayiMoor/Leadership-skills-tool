"use client";
import { useState, useSyncExternalStore } from "react";
import { ActionLink, Button } from "@/components/ui/primitives";
import type { AssessmentDraft } from "./model";
import { deleteDraft, readDrafts, STORAGE_KEY } from "./storage";
const subscribe = () => () => {};
export function SavedAssessments() {
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return ready ? (
    <LocalAssessments />
  ) : (
    <p role="status">Loading local drafts...</p>
  );
}
function LocalAssessments() {
  const [initial] = useState(() => {
    try {
      return readDrafts(window.localStorage);
    } catch {
      return {
        drafts: [] as AssessmentDraft[],
        error: "Browser storage is unavailable.",
      };
    }
  });
  const [drafts, setDrafts] = useState(initial.drafts);
  const [storageError, setStorageError] = useState(!!initial.error);
  const [message, setMessage] = useState(
    initial.error ??
      "Drafts are saved only on this browser. Use synthetic information.",
  );
  return (
    <section
      className="stack"
      style={{ marginBottom: 32 }}
      aria-label="Saved assessments"
    >
      <div className="section-heading">
        <div>
          <h2>Your saved assessments</h2>
          <p role="status">{message}</p>
        </div>
        <ActionLink href="/assessments/new" label="New assessment">
          New assessment
        </ActionLink>
      </div>
      {storageError && (
        <div className="stack">
          <p className="field-hint">
            If the saved data is incompatible, you can remove all local
            assessment drafts and start again. This cannot be undone. Theme
            preferences are kept.
          </p>
          <Button
            className="button-secondary"
            onClick={() => {
              if (
                !window.confirm(
                  "Remove all saved assessment drafts from this browser? This cannot be undone. Theme preferences will be kept.",
                )
              )
                return;
              try {
                window.localStorage.removeItem(STORAGE_KEY);
                setDrafts([]);
                setStorageError(false);
                setMessage(
                  "Local assessment drafts reset. You can start a new assessment.",
                );
              } catch {
                setMessage(
                  "Could not reset local drafts. Browser storage is unavailable.",
                );
              }
            }}
          >
            Reset local assessment drafts
          </Button>
        </div>
      )}
      {drafts.map((d) => (
        <article className="card card-body intake-saved" key={d.id}>
          <div>
            <h3>{d.profile.name || "Untitled assessment"}</h3>
            <p className="muted">
              {d.profile.sector || "Sector not entered"} · Saved{" "}
              {new Date(d.updatedAt).toLocaleDateString("en-GB")}
            </p>
          </div>
          <div className="intake-inline">
            <ActionLink
              href={`/drafts/${d.id}`}
              label={`Resume ${d.profile.name || "Untitled assessment"}`}
            >
              Resume
            </ActionLink>
            <Button
              className="button-secondary"
              aria-label={`Delete ${d.profile.name || "Untitled assessment"}`}
              onClick={() => {
                if (
                  !window.confirm(
                    "Delete this saved assessment from this browser?",
                  )
                )
                  return;
                try {
                  deleteDraft(window.localStorage, d.id);
                  setDrafts(drafts.filter((x) => x.id !== d.id));
                  setMessage("Saved assessment deleted from this browser.");
                } catch {
                  setMessage(
                    "Could not delete. Existing drafts have been left untouched.",
                  );
                }
              }}
            >
              Delete
            </Button>
          </div>
        </article>
      ))}
    </section>
  );
}
