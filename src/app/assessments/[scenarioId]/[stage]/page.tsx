import { notFound } from "next/navigation";
import { getScenario } from "@/features/assessments/fixtures";
import { assessmentStages } from "@/features/assessments/stages";
import { SetupScreen } from "@/features/assessments/screens/setup";
import { EvidenceScreen } from "@/features/assessments/screens/evidence";
import { ReportScreen } from "@/features/assessments/screens/report";
import { PrototypeStage } from "@/features/assessments/screens/prototype-stage";

export const dynamicParams = false;
export function generateStaticParams() {
  return assessmentStages.map((stage) => ({ stage: stage.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ stage: string }>;
}) {
  const { stage } = await params;
  return {
    title:
      assessmentStages.find((item) => item.slug === stage)?.label ??
      "Assessment stage",
  };
}
export default async function StagePage({
  params,
}: {
  params: Promise<{ scenarioId: string; stage: string }>;
}) {
  const { scenarioId, stage: stageSlug } = await params;
  const scenario = getScenario(scenarioId);
  const stage = assessmentStages.find((item) => item.slug === stageSlug);
  if (!scenario || !stage) notFound();
  if (stage.slug === "setup") return <SetupScreen scenario={scenario} />;
  if (stage.slug === "evidence")
    return <EvidenceScreen sources={scenario.sources} />;
  if (stage.slug === "report")
    return (
      <ReportScreen
        scenarioId={scenario.id}
        scenarioName={scenario.name}
        purpose={scenario.purpose}
        themes={scenario.themes}
        sourceIds={scenario.sources.map((source) => source.id)}
      />
    );
  return <PrototypeStage stage={stage} scenarioId={scenario.id} />;
}
