import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AssessmentShell } from "@/components/assessment-shell";
import {
  getScenario,
  syntheticScenarios,
} from "@/features/assessments/fixtures";

export const dynamicParams = false;
export function generateStaticParams() {
  return syntheticScenarios.map((scenario) => ({ scenarioId: scenario.id }));
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ scenarioId: string }>;
}) {
  const { scenarioId } = await params;
  const scenario = getScenario(scenarioId);
  if (!scenario) notFound();
  return (
    <AssessmentShell scenarioId={scenario.id} scenarioName={scenario.name}>
      {children}
    </AssessmentShell>
  );
}
