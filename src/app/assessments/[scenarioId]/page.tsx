import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  ActionLink,
  Badge,
  Notice,
  PageHeading,
} from "@/components/ui/primitives";
import { getScenario } from "@/features/assessments/fixtures";
import { assessmentStages } from "@/features/assessments/stages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ scenarioId: string }>;
}) {
  return {
    title: getScenario((await params).scenarioId)?.name ?? "Assessment",
  };
}
export default async function AssessmentOverview({
  params,
}: {
  params: Promise<{ scenarioId: string }>;
}) {
  const scenario = getScenario((await params).scenarioId);
  if (!scenario) notFound();
  return (
    <>
      <PageHeading
        eyebrow="Assessment overview"
        title={scenario.name}
        description={scenario.purpose}
        action={
          <ActionLink href={`/assessments/${scenario.id}/setup`}>
            Set up demo assessment
          </ActionLink>
        }
      />
      <div className="two-column">
        <div className="stack">
          <section className="card">
            <div className="card-header">
              <h2>Assessment brief</h2>
              <Badge tone="purple">{scenario.sector}</Badge>
            </div>
            <div className="card-body">
              <p className="body-copy">{scenario.context}</p>
              <h3 style={{ margin: "24px 0 12px", fontSize: 12 }}>
                Participant role groups
              </h3>
              <div className="tag-list">
                {scenario.roles.map((role) => (
                  <span className="tag" key={role}>
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </section>
          <section className="card">
            <div className="card-header">
              <h2>Your assessment journey</h2>
              <span className="muted" style={{ fontSize: 10 }}>
                Illustrative progress
              </span>
            </div>
            <ol className="stage-table">
              {assessmentStages.map((stage, index) => (
                <li key={stage.slug}>
                  <span className="stage-table-number">0{index + 1}</span>
                  <Link
                    className="stage-table-name"
                    href={`/assessments/${scenario.id}/${stage.slug}`}
                  >
                    {stage.label}
                  </Link>
                  <Badge
                    tone={
                      stage.status === "Complete"
                        ? "success"
                        : stage.status === "Review needed"
                          ? "warning"
                          : "neutral"
                    }
                  >
                    {stage.status}
                  </Badge>
                  <ArrowRight size={14} className="muted" aria-hidden="true" />
                </li>
              ))}
            </ol>
          </section>
        </div>
        <aside className="stack">
          <div className="card">
            <div className="card-header">
              <h2>Engagement context</h2>
            </div>
            <div className="card-body">
              <dl className="detail-list">
                <div>
                  <dt>Material</dt>
                  <dd>Synthetic examples</dd>
                </div>
                <div>
                  <dt>Role groups</dt>
                  <dd>{scenario.roles.length}</dd>
                </div>
                <div>
                  <dt>Source examples</dt>
                  <dd>{scenario.sources.length}</dd>
                </div>
                <div>
                  <dt>Output state</dt>
                  <dd>Draft example</dd>
                </div>
              </dl>
            </div>
          </div>
          <Notice title="Explore with confidence">
            All content is fictional. Themes and questions illustrate
            configuration and are subject to consultant review.
          </Notice>
        </aside>
      </div>
    </>
  );
}
