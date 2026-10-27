export const assessmentStages = [
  {
    slug: "setup",
    label: "Set up",
    description: "Set the context and assessment purpose.",
    status: "Complete",
  },
  {
    slug: "evidence",
    label: "Evidence",
    description: "Inspect sources and their attribution.",
    status: "Review needed",
  },
  {
    slug: "interview-preparation",
    label: "Interview preparation",
    description: "Prepare questions with context.",
    status: "In progress",
  },
  {
    slug: "interviews",
    label: "Interview capture",
    description: "Keep notes connected to their source.",
    status: "Not started",
  },
  {
    slug: "findings",
    label: "Cohort findings",
    description: "Develop evidence-linked interpretations.",
    status: "Not started",
  },
  {
    slug: "recommendations",
    label: "Recommendations",
    description: "Connect proposed actions to findings.",
    status: "Not started",
  },
  {
    slug: "report",
    label: "Report approval",
    description: "Review the output before sharing.",
    status: "Not started",
  },
] as const;

export type AssessmentStage = (typeof assessmentStages)[number];
