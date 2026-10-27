import {
  Briefcase,
  FlaskConical,
  FolderOpen,
  GitBranch,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import { AssessmentShell } from "@/components/assessment-shell";
import { ActionLink, Badge, PageHeading } from "@/components/ui/primitives";
import { syntheticScenarios } from "@/features/assessments/fixtures";
import { SavedAssessments } from "@/features/intake/saved-assessments";

const icons = {
  reference: FolderOpen,
  pharma: FlaskConical,
  "energy-utilities": Zap,
};

export default function Home() {
  return (
    <AssessmentShell>
      <PageHeading
        eyebrow="Consultant workspace"
        title="Your assessment workspace"
        description="A clear view of each engagement, from initial context to a reviewed cohort report."
      />
      <SavedAssessments />
      <div className="stat-grid">
        <div className="card stat">
          <span className="stat-icon">
            <Briefcase size={20} aria-hidden="true" />
          </span>
          <div>
            <strong>3 scenarios</strong>
            <small>Distinct synthetic contexts</small>
          </div>
        </div>
        <div className="card stat">
          <span className="stat-icon">
            <GitBranch size={20} aria-hidden="true" />
          </span>
          <div>
            <strong>7 stages</strong>
            <small>One connected workflow</small>
          </div>
        </div>
        <div className="card stat">
          <span className="stat-icon">
            <ShieldCheck size={20} aria-hidden="true" />
          </span>
          <div>
            <strong>Human review</strong>
            <small>At each decision point</small>
          </div>
        </div>
      </div>
      <div className="two-column">
        <section>
          <div className="section-heading" style={{ marginTop: 0 }}>
            <div>
              <h2>Assessments</h2>
              <p>
                Choose a synthetic profile, then save it to run the connected
                demo.
              </p>
            </div>
            <Badge>3 examples</Badge>
          </div>
          <div className="card">
            {syntheticScenarios.map((scenario) => {
              const Icon = icons[scenario.id];
              return (
                <article className="assessment-card" key={scenario.id}>
                  <div
                    className={`scenario-icon ${scenario.id === "energy-utilities" ? "energy" : scenario.id}`}
                  >
                    <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <div>
                    <Badge tone="purple">{scenario.sector}</Badge>
                    <h3>{scenario.name}</h3>
                    <p>{scenario.purpose}</p>
                    <div className="assessment-meta">
                      <span>
                        <Users size={13} aria-hidden="true" />
                        {scenario.roles.length} role groups
                      </span>
                      <span>
                        <FolderOpen size={13} aria-hidden="true" />
                        {scenario.sources.length} example sources
                      </span>
                      <span>Draft example</span>
                    </div>
                  </div>
                  <div className="assessment-open">
                    <ActionLink
                      href={`/assessments/${scenario.id}`}
                      secondary={scenario.id !== "pharma"}
                      label={`Open ${scenario.name}`}
                    >
                      Open
                    </ActionLink>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="body-copy" style={{ marginTop: 16, fontSize: 11 }}>
            Scenario facts, source passages and progress states are fictional
            examples for review.
          </p>
        </section>
        <aside className="stack">
          <div className="card">
            <div className="card-header">
              <h2>A considered workflow</h2>
            </div>
            <div className="card-body">
              <div className="guide-step">
                <span>01</span>
                <div>
                  <h3>Start with context</h3>
                  <p>
                    Shape each assessment around its purpose, role groups and
                    questions.
                  </p>
                </div>
              </div>
              <div className="guide-step">
                <span>02</span>
                <div>
                  <h3>Keep evidence in view</h3>
                  <p>
                    Review source attribution before drawing cohort findings.
                  </p>
                </div>
              </div>
              <div className="guide-step">
                <span>03</span>
                <div>
                  <h3>Review before sharing</h3>
                  <p>
                    Apply consultant judgement to every interpretation and
                    output.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </AssessmentShell>
  );
}
