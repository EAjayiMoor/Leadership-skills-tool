import Link from "next/link";
import { CircleHelp } from "lucide-react";
import type { ReactNode } from "react";
import { StageNavigation, MobileStageNavigation } from "./stage-navigation";
import { ThemeControl } from "./theme-control";
import { Badge } from "./ui/primitives";

export function AssessmentShell({
  children,
  scenarioId,
  scenarioName,
  draftId,
  stageProgress,
}: {
  children: ReactNode;
  scenarioId?: string;
  scenarioName?: string;
  draftId?: string;
  stageProgress?: Record<string, string>;
}) {
  const navProps = { scenarioId, scenarioName, draftId, stageProgress };
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <StageNavigation {...navProps} />
      <div className="workspace">
        <header className="topbar">
          <div className="breadcrumb">
            <Link href="/">Workspace</Link>
            <span aria-hidden="true">/</span>
            <span>{scenarioName ?? "Assessments"}</span>
          </div>
          <div className="topbar-actions">
            <Badge tone="purple">Synthetic examples</Badge>
            <ThemeControl />
          </div>
        </header>
        <MobileStageNavigation {...navProps} />
        <main id="main-content" tabIndex={-1} className="main-content">
          {children}
        </main>
        <footer className="workspace-footer">
          <span>Assessment workspace · Prototype</span>
          <span>
            <CircleHelp size={14} aria-hidden="true" />
            All content is fictional and for review.
          </span>
        </footer>
      </div>
    </div>
  );
}
