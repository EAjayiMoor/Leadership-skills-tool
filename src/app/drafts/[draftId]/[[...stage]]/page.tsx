import { SavedAssessment } from "@/features/intake/saved-assessment";
export default async function SavedPage({
  params,
}: {
  params: Promise<{ draftId: string; stage?: string[] }>;
}) {
  const { draftId, stage } = await params;
  return (
    <SavedAssessment id={draftId} stage={stage?.join("/") || "overview"} />
  );
}
