"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import {
  ArrowLeft,
  Check,
  LayoutDashboard,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import { assessmentStages } from "@/features/assessments/stages";

type NavigationProps = {
  scenarioId?: string;
  scenarioName?: string;
  draftId?: string;
  stageProgress?: Record<string, string>;
};

function Brand() {
  return (
    <Link href="/" className="workspace-brand">
      <span className="brand-overline">Consultant workspace</span>
      <span>
        Assessment
        <br />
        workspace<span className="brand-stop">.</span>
      </span>
    </Link>
  );
}

function NavigationLinks({
  scenarioId,
  scenarioName,
  draftId,
  stageProgress,
  onNavigate,
}: NavigationProps & { onNavigate?: () => void }) {
  const pathname = usePathname();
  const base = draftId ? `/drafts/${draftId}` : `/assessments/${scenarioId}`;
  return (
    <>
      <Link href="/" className="back-link" onClick={onNavigate}>
        <ArrowLeft size={15} aria-hidden="true" />
        All assessments
      </Link>
      {scenarioId || draftId ? (
        <>
          <div className="sidebar-context">
            <p className="eyebrow">Current assessment</p>
            <p>{scenarioName}</p>
            <span className="sidebar-small">Synthetic scenario</span>
          </div>
          <p className="sidebar-label">Assessment stages</p>
          <nav aria-label="Assessment stages" className="stage-list">
            <Link
              href={base}
              className="stage-link overview-link"
              aria-current={pathname === base ? "page" : undefined}
              onClick={onNavigate}
            >
              <LayoutDashboard size={17} aria-hidden="true" />
              <span>Overview</span>
            </Link>
            {assessmentStages.map((stage, index) => (
              <Link
                href={`${base}/${stage.slug}`}
                className="stage-link"
                key={stage.slug}
                aria-current={
                  pathname === `${base}/${stage.slug}` ? "page" : undefined
                }
                onClick={onNavigate}
              >
                <span
                  className={`stage-number ${!draftId && stage.status === "Complete" ? "stage-done" : ""}`}
                >
                  {!draftId && stage.status === "Complete" ? (
                    <Check size={13} aria-hidden="true" />
                  ) : (
                    <span aria-hidden="true">{index + 1}</span>
                  )}
                </span>
                <span className="stage-label">
                  <span>{stage.label}</span>
                  <small>
                    {stageProgress?.[stage.slug] ??
                      (draftId
                        ? stage.slug === "setup"
                          ? "Configuration"
                          : "Not implemented"
                        : stage.status)}
                  </small>
                </span>
              </Link>
            ))}
          </nav>
          <p className="sidebar-annotation">
            {draftId
              ? "Saved on this browser. Prepared demo material; no publication."
              : "Progress shown is illustrative."}
          </p>
        </>
      ) : (
        <nav aria-label="Workspace" className="stage-list global-nav">
          <Link
            href="/"
            className="stage-link"
            aria-current={pathname === "/" ? "page" : undefined}
            onClick={onNavigate}
          >
            <LayoutDashboard size={18} aria-hidden="true" />
            <span>Assessment overview</span>
          </Link>
        </nav>
      )}
    </>
  );
}

export function StageNavigation(props: NavigationProps) {
  return (
    <aside className="sidebar">
      <Brand />
      <NavigationLinks {...props} />
      <div className="sidebar-footer">
        <div className="prototype-seal">
          <ShieldCheck size={16} aria-hidden="true" />
          <span>
            Synthetic content only<small>Prototype workspace</small>
          </span>
        </div>
      </div>
    </aside>
  );
}

export function MobileStageNavigation(props: NavigationProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const current = assessmentStages.find((stage) =>
    pathname.endsWith(`/${stage.slug}`),
  );
  return (
    <div className="mobile-stage-bar">
      <button
        className="mobile-stage-trigger"
        aria-label={`Open assessment stages: ${current?.label ?? "Workspace navigation"}`}
        onClick={() => dialog.current?.showModal()}
      >
        <Menu size={18} aria-hidden="true" />
        <span>{current?.label ?? "Workspace navigation"}</span>
      </button>
      <span className="mobile-prototype">Prototype</span>
      <dialog
        ref={dialog}
        className="stage-dialog"
        aria-labelledby="stage-dialog-title"
      >
        <div className="dialog-heading">
          <h2 id="stage-dialog-title">Assessment stages</h2>
          <button
            className="icon-button"
            aria-label="Close assessment stages"
            onClick={() => dialog.current?.close()}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <NavigationLinks
          {...props}
          onNavigate={() => dialog.current?.close()}
        />
      </dialog>
    </div>
  );
}
