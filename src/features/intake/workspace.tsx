"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge, Button, Notice, PageHeading } from "@/components/ui/primitives";
import { syntheticScenarios } from "../assessments/fixtures";
import { exampleProfile } from "./examples";
import {
  canReview,
  createQuestionSet,
  emptyProfile,
  isStale,
  missingProfileFields,
  type AssessmentDraft,
  type Profile,
  type Question,
} from "./model";
import { saveDraft } from "./storage";
import { useUnsavedChanges } from "@/lib/use-unsaved-changes";
import {
  ProfileForm,
  ProfilePrerequisites,
  ProfileSummary,
} from "./profile-form";
import { QuestionReview } from "./question-review";
type View = "profile" | "questions" | "scenario";
export function IntakeWorkspace({
  initialProfile,
  initialDraft,
  onSaved,
}: {
  initialProfile?: Profile;
  initialDraft?: AssessmentDraft;
  onSaved?: (draft: AssessmentDraft) => void;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<AssessmentDraft>(
    () =>
      initialDraft ?? {
        id: "",
        profile: initialProfile ?? emptyProfile(),
        questionSet: null,
        reviewed: false,
        updatedAt: "",
      },
  );
  const [view, setView] = useState<View>(
    initialDraft?.reviewed && canReview(initialDraft)
      ? "scenario"
      : initialDraft?.questionSet
        ? "questions"
        : "profile",
  );
  const [section, setSection] = useState(0);
  const [message, setMessage] = useState(
    "Use synthetic information only. Save drafts to this browser; they are not shared or backed up.",
  );
  const [saved, setSaved] = useState(() => JSON.stringify(draft));
  const heading = useRef<HTMLDivElement>(null);
  const dirty =
    JSON.stringify(draft) !== saved &&
    (!!draft.id ||
      Object.values(draft.profile).some((v) =>
        Array.isArray(v) ? v.length : !!v,
      ));
  useUnsavedChanges(dirty);
  function switchView(next: View) {
    setView(next);
    requestAnimationFrame(() => heading.current?.focus());
  }
  function updateProfile(profile: Profile) {
    setDraft({ ...draft, profile, reviewed: false });
  }
  function generate() {
    const missing = missingProfileFields(draft.profile);
    if (missing.length) {
      setView("profile");
      setSection(missing[0] === "roles" ? 2 : 0);
      setMessage(
        "Add the current situation, intended outcome and leadership groups before reviewing questions.",
      );
      requestAnimationFrame(() =>
        document.getElementById(`profile-${missing[0]}`)?.focus(),
      );
      return;
    }
    const count = draft.profile.cohort;
    if (
      count &&
      (!Number.isInteger(Number(count)) ||
        Number(count) < 1 ||
        Number(count) > 10000)
    ) {
      setView("profile");
      setSection(2);
      setMessage(
        "Participant count must be a whole number between 1 and 10,000.",
      );
      requestAnimationFrame(() =>
        document.getElementById("profile-cohort")?.focus(),
      );
      return;
    }
    if (
      draft.questionSet &&
      !window.confirm(
        "Replace the existing question draft? This will discard its question edits and review.",
      )
    )
      return;
    setDraft({
      ...draft,
      questionSet: createQuestionSet(draft.profile),
      reviewed: false,
    });
    switchView("questions");
    setMessage(
      "Sample questions prepared. Inspect their profile links and review the wording. Save draft to retain your changes.",
    );
  }
  function editQuestion(id: string, patch: Partial<Question>) {
    if (!draft.questionSet) return;
    setDraft({
      ...draft,
      reviewed: false,
      questionSet: {
        ...draft.questionSet,
        questions: draft.questionSet.questions.map((q) =>
          q.id === id ? { ...q, ...patch } : q,
        ),
      },
    });
  }
  function save() {
    const next = {
      ...draft,
      id: draft.id || crypto.randomUUID(),
      updatedAt: new Date().toISOString(),
    };
    try {
      saveDraft(window.localStorage, next);
      setDraft(next);
      setSaved(JSON.stringify(next));
      onSaved?.(next);
      setMessage(
        "Draft saved on this browser. You can reopen it from the workspace.",
      );
      if (!draft.id) router.replace(`/drafts/${next.id}`);
    } catch {
      setMessage(
        "Could not save this draft. Browser storage may be blocked, full or incompatible. Your current entries remain on this page; they have not been saved.",
      );
    }
  }
  function loadExample(id: string) {
    if (
      dirty &&
      !window.confirm(
        "Replace the current inputs? Unsaved changes will be lost.",
      )
    )
      return;
    const scenario = syntheticScenarios.find((s) => s.id === id);
    setDraft({
      id: "",
      profile: scenario ? exampleProfile(scenario) : emptyProfile(),
      questionSet: null,
      reviewed: false,
      updatedAt: "",
    });
    setSaved("");
    setSection(0);
    switchView("profile");
    setMessage(
      scenario
        ? "Loaded synthetic prerequisites. Save creates an independent assessment, without the example evidence."
        : "Started a blank profile. Save draft to keep your entries.",
    );
  }
  return (
    <>
      <div ref={heading} tabIndex={-1} className="intake-heading">
        <PageHeading
          eyebrow="Set up · Company context to survey questions"
          title={
            view === "profile"
              ? "Start with the company context"
              : view === "questions"
                ? "Review the survey questions"
                : "Your assessment scenario"
          }
          description="Capture the profile, inspect why each question is relevant, and keep the reviewed question set connected to the scenario."
          action={<Badge tone="purple">Synthetic configuration</Badge>}
        />
      </div>
      <nav className="intake-flow" aria-label="Configuration steps">
        {(["profile", "questions", "scenario"] as const).map((step, i) => (
          <Button
            key={step}
            className="button-secondary"
            aria-current={view === step ? "step" : undefined}
            disabled={
              step === "questions"
                ? !draft.questionSet
                : step === "scenario"
                  ? !draft.reviewed || !canReview(draft)
                  : false
            }
            onClick={() => switchView(step)}
          >
            {["Company profile", "Survey questions", "Assessment scenario"][i]}
          </Button>
        ))}
      </nav>
      <div className="intake-toolbar">
        <div className="intake-inline">
          <span className="muted">Example prerequisites:</span>
          {syntheticScenarios.map((s) => (
            <Button
              className="button-secondary button-small"
              key={s.id}
              onClick={() => loadExample(s.id)}
            >
              {s.shortName}
            </Button>
          ))}
        </div>
        <Button
          className="button-secondary button-small"
          onClick={() => loadExample("")}
        >
          Start fresh
        </Button>
      </div>
      <p role="status" className="intake-status">
        {message}
      </p>
      <div className="intake-layout">
        <div className="stack">
          {view === "profile" && (
            <ProfileForm
              profile={draft.profile}
              onChange={updateProfile}
              section={section}
              onSection={(n) => {
                setSection(n);
                requestAnimationFrame(() =>
                  document.getElementById("profile-section-heading")?.focus(),
                );
              }}
              onQuestions={generate}
            />
          )}
          {view === "questions" && (
            <>
              <QuestionReview
                draft={draft}
                onEdit={editQuestion}
                onRefresh={generate}
                onReview={() =>
                  setDraft({ ...draft, reviewed: !draft.reviewed })
                }
              />
              <Button
                disabled={!draft.reviewed || !canReview(draft)}
                onClick={() => switchView("scenario")}
              >
                Use this draft in the scenario
              </Button>
            </>
          )}
          {view === "scenario" && draft.questionSet && (
            <>
              <section className="card card-body stack">
                <Badge tone="success">Consultant-reviewed question draft</Badge>
                <h2>{draft.profile.name || "Untitled assessment"}</h2>
                <h3>Profile prerequisites</h3>
                <ProfilePrerequisites profile={draft.questionSet.profile} />
                <h3>Linked question set</h3>
                {draft.questionSet.questions
                  .filter((q) => q.included)
                  .map((q) => (
                    <article key={q.id} className="intake-disclosure">
                      <p>{q.text}</p>
                      <p className="muted">
                        {q.role} · {q.kind}
                      </p>
                      <details>
                        <summary>Captured profile basis</summary>
                        <p className="intake-preserve">
                          {draft.questionSet!.profile[q.basis] || "Not entered"}
                        </p>
                      </details>
                    </article>
                  ))}
              </section>
              <Notice title="Assessment configuration captured">
                Save this draft to continue into its assessment workspace.
                Continue to evidence to load a fictional demo pack for this
                saved assessment. It stays linked to the captured questions.
              </Notice>
              {draft.id && (
                <Button
                  onClick={() => {
                    if (dirty) {
                      setMessage("Save your changes before continuing.");
                      return;
                    }
                    router.push(`/drafts/${draft.id}/evidence`);
                  }}
                >
                  Continue to evidence
                </Button>
              )}
            </>
          )}
        </div>
        <aside className="stack">
          <div className="card card-body stack">
            <h2>
              {view === "questions"
                ? "Profile behind this question set"
                : "Captured profile"}
            </h2>
            <ProfileSummary
              profile={
                view === "questions" && draft.questionSet
                  ? draft.questionSet.profile
                  : draft.profile
              }
            />
            <Button onClick={save}>Save draft</Button>
            <p className="field-hint">
              {dirty ? "Unsaved changes. " : draft.id ? "Saved locally. " : ""}
              Browser-only storage. Clearing site data removes drafts. Use
              synthetic information only.
            </p>
            {view === "profile" && (
              <Button onClick={generate}>Review sample questions</Button>
            )}
            {view !== "profile" && (
              <Button
                className="button-secondary"
                onClick={() => switchView("profile")}
              >
                Edit the profile
              </Button>
            )}
          </div>
          {isStale(draft) && view !== "questions" && (
            <Notice title="Questions need refresh" warning>
              Profile edits have invalidated the previous question review.
            </Notice>
          )}
          <Notice title="Human judgement stays central">
            Profile inputs inform questions, not findings. No AI service is
            called. Questions, themes and later outputs require consultant
            review.
          </Notice>
        </aside>
      </div>
    </>
  );
}
