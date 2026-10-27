import type { DemoRun } from "../demo/model";
export const profileFields = [
  "name",
  "why",
  "outcome",
  "sector",
  "scale",
  "locations",
  "structure",
  "roles",
  "cohort",
  "responsibilities",
  "framework",
  "themes",
  "clientQuestions",
  "materialNotes",
  "timeline",
  "audience",
  "reviewer",
] as const;
export type ProfileField = (typeof profileFields)[number];
export type Profile = Record<ProfileField, string> & { material: string[] };
export interface Question {
  id: string;
  text: string;
  included: boolean;
  kind: string;
  topic: string;
  role: string;
  basis: ProfileField;
  rationale: string;
}
export interface QuestionSet {
  profile: Profile;
  questions: Question[];
}
export interface AssessmentDraft {
  demo?: DemoRun;
  id: string;
  profile: Profile;
  questionSet: QuestionSet | null;
  reviewed: boolean;
  updatedAt: string;
}
export const materialOptions = [
  "Role descriptions",
  "Existing questionnaire",
  "Organisation background",
  "Prior assessment material",
];
export function emptyProfile(): Profile {
  return {
    ...(Object.fromEntries(profileFields.map((key) => [key, ""])) as Record<
      ProfileField,
      string
    >),
    material: [],
  };
}
export function missingProfileFields(profile: Profile): ProfileField[] {
  return (["why", "outcome", "roles"] as const).filter((key) =>
    key === "roles"
      ? !profile.roles.split(/[\n,]/).some((role) => role.trim())
      : !profile[key].trim(),
  );
}
export function profileSignature(profile: Profile) {
  return JSON.stringify(
    profileFields
      .map((key) => profile[key])
      .concat([...profile.material].sort()),
  );
}
export function isStale(draft: AssessmentDraft) {
  return (
    !!draft.questionSet &&
    profileSignature(draft.profile) !==
      profileSignature(draft.questionSet.profile)
  );
}
export function canReview(draft: AssessmentDraft) {
  const included = draft.questionSet?.questions.filter((q) => q.included) ?? [];
  return (
    !missingProfileFields(draft.profile).length &&
    !isStale(draft) &&
    included.length > 0 &&
    included.every((q) => q.text.trim().length > 0 && q.role.trim().length > 0)
  );
}
export function createQuestionSet(profile: Profile): QuestionSet {
  const roles = profile.roles
    .split(/[\n,]/)
    .map((r) => r.trim())
    .filter(Boolean)
    .slice(0, 2)
    .join(" / ");
  return {
    profile: structuredClone(profile),
    questions: [
      {
        id: "Q1",
        text: "What helps leadership groups align their priorities?",
        included: true,
        kind: "Core example",
        topic: "Shared direction",
        role: "All selected role groups",
        basis: "outcome",
        rationale:
          "Explores the stated assessment purpose. It does not assume a finding.",
      },
      {
        id: "Q2",
        text: "How do leaders make responsibilities clear when decisions cross organisational boundaries?",
        included: true,
        kind: "Core example",
        topic: "Decision clarity",
        role: "All selected role groups",
        basis: "responsibilities",
        rationale:
          "Explores responsibility across the recorded role scope. Missing detail needs consultant input.",
      },
      {
        id: "Q3",
        text: `For decisions involving ${roles}, how is ownership agreed?`,
        included: true,
        kind: "Tailored example",
        topic: "Role relevance",
        role: roles,
        basis: "roles",
        rationale:
          "The role wording comes directly from the captured leadership groups.",
      },
      {
        id: "Q4",
        text: `Thinking about the situation described in the company profile, what helps leaders turn shared priorities into day-to-day actions?`,
        included: true,
        kind: "Context example",
        topic: "Change context",
        role: "All selected role groups",
        basis: "why",
        rationale:
          "Links a discussion of leadership practice to the stated situation; inspect the captured context below and adapt the wording.",
      },
    ],
  };
}
