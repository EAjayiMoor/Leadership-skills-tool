import {
  canReview,
  profileSignature,
  type AssessmentDraft,
} from "../intake/model.ts";
import { demoPacks, samplePassages, type DemoPack } from "./packs.ts";
export type Decision = "draft" | "accepted" | "rejected";
export type EvidenceRelation =
  "supports" | "qualifies" | "contradicts" | "context";
export interface FindingEvidence {
  sourceId: string;
  relation: EvidenceRelation;
}
export interface DemoRecord {
  id: string;
  type: "Survey" | "Interview";
  participant: string;
  role: string;
  question: { id: string; text: string; role: string; topic: string };
  text: string;
}
export interface DemoFinding {
  id: string;
  questionId: string;
  title: string;
  text: string;
  sourceIds: string[];
  counterSourceIds: string[];
  decision: Decision;
  evidence?: FindingEvidence[];
  scope?: string;
  qualifyingSummary?: string;
  limitations?: string;
  alternative?: string;
}
export interface DemoRecommendation {
  id: string;
  findingId: string;
  text: string;
  decision: Decision;
  action?: string;
  rationale?: string;
  intendedOutcome?: string;
  followUpCheck?: string;
}
export type FindingPatch = Partial<
  Pick<
    DemoFinding,
    | "title"
    | "text"
    | "scope"
    | "qualifyingSummary"
    | "limitations"
    | "alternative"
    | "evidence"
    | "decision"
  >
>;
export type RecommendationPatch = Partial<
  Pick<
    DemoRecommendation,
    | "text"
    | "action"
    | "rationale"
    | "intendedOutcome"
    | "followUpCheck"
    | "decision"
  >
>;
export const evidenceRelations: EvidenceRelation[] = [
  "supports",
  "qualifies",
  "contradicts",
  "context",
];
export function findingEvidenceIds(
  finding: DemoFinding,
  relation?: EvidenceRelation,
): string[] {
  if (finding.evidence !== undefined)
    return finding.evidence
      .filter((e) => !relation || e.relation === relation)
      .map((e) => e.sourceId);
  if (relation === "supports") return finding.sourceIds;
  if (relation === "qualifies") return finding.counterSourceIds;
  if (relation) return [];
  return [...new Set([...finding.sourceIds, ...finding.counterSourceIds])];
}
export function recommendationSections(recommendation: DemoRecommendation) {
  if (recommendation.action === undefined)
    return [{ label: "Recommendation", text: recommendation.text }];
  return [
    { label: "Action", text: recommendation.action },
    { label: "Rationale", text: recommendation.rationale ?? "" },
    { label: "Intended outcome", text: recommendation.intendedOutcome ?? "" },
    { label: "Follow-up check", text: recommendation.followUpCheck ?? "" },
  ].filter((section) => section.text.trim());
}
function findingComplete(finding: DemoFinding) {
  return (
    !!finding.text.trim() &&
    (finding.evidence === undefined ||
      ([
        finding.title,
        finding.scope,
        finding.qualifyingSummary,
        finding.limitations,
      ].every((value) => value?.trim()) &&
        finding.evidence.some((e) => e.relation === "supports")))
  );
}
function recommendationComplete(recommendation: DemoRecommendation) {
  return recommendation.action === undefined
    ? !!recommendation.text.trim()
    : [
        recommendation.action,
        recommendation.rationale,
        recommendation.intendedOutcome,
      ].every((value) => value?.trim());
}
export function canAcceptFinding(draft: AssessmentDraft, id: string) {
  const finding = draft.demo?.findings.find((f) => f.id === id);
  return (
    !!finding &&
    !isDemoStale(draft) &&
    !!draft.demo?.evidenceReviewed &&
    findingComplete(finding)
  );
}
export function canAcceptRecommendation(draft: AssessmentDraft, id: string) {
  const recommendation = draft.demo?.recommendations.find((r) => r.id === id);
  return (
    !!recommendation &&
    !isDemoStale(draft) &&
    !!draft.demo?.evidenceReviewed &&
    recommendationComplete(recommendation) &&
    !!draft.demo.findings.some(
      (f) =>
        f.id === recommendation.findingId &&
        f.decision === "accepted" &&
        findingComplete(f),
    )
  );
}
export interface DemoRun {
  schema: 1;
  ownerId: string;
  pack: DemoPack;
  signature: string;
  assessmentName: string;
  purpose: string;
  sector: string;
  records: DemoRecord[];
  evidenceReviewed: boolean;
  findings: DemoFinding[];
  recommendations: DemoRecommendation[];
  noRecommendation?: { reason: string; reviewed: boolean };
  reportReviewed: boolean;
}
export function configurationSignature(draft: AssessmentDraft) {
  return JSON.stringify({
    profile: profileSignature(draft.profile),
    questions: draft.questionSet,
  });
}
export function isDemoStale(draft: AssessmentDraft) {
  return (
    !!draft.demo &&
    (draft.demo.ownerId !== draft.id ||
      draft.demo.signature !== configurationSignature(draft) ||
      !draft.reviewed ||
      !canReview(draft))
  );
}
function run(draft: AssessmentDraft): DemoRun {
  if (!draft.demo || isDemoStale(draft))
    throw Error(
      "Current reviewed configuration and demo evidence are required",
    );
  return draft.demo;
}
export function loadDemo(
  draft: AssessmentDraft,
  pack: DemoPack,
): AssessmentDraft {
  if (
    !draft.id ||
    !draft.reviewed ||
    !canReview(draft) ||
    !Object.hasOwn(demoPacks, pack)
  )
    throw Error("Review and save the questions first");
  const roles = draft.profile.roles
    .split(/[\n,]/)
    .map((r) => r.trim())
    .filter(Boolean);
  const loadId = crypto.randomUUID();
  const records = draft
    .questionSet!.questions.filter((q) => q.included)
    .flatMap((q, index) => {
      const passages = samplePassages(pack, q.topic);
      return passages.map((text, i): DemoRecord => ({
        id: `${draft.id}-${loadId}-Q${index + 1}-${i === 2 ? "I" : "S"}${i + 1}`,
        type: i === 2 ? "Interview" : "Survey",
        participant: i === 1 ? "P02" : "P01",
        role: roles[i === 1 ? Math.min(1, roles.length - 1) : 0],
        question: { id: q.id, text: q.text, role: q.role, topic: q.topic },
        text,
      }));
    });
  return {
    ...draft,
    demo: {
      schema: 1,
      ownerId: draft.id,
      pack,
      signature: configurationSignature(draft),
      assessmentName: draft.profile.name || "Untitled assessment",
      purpose: draft.profile.outcome,
      sector: draft.profile.sector,
      records,
      evidenceReviewed: false,
      findings: [],
      recommendations: [],
      reportReviewed: false,
    },
  };
}
export function reviewEvidence(draft: AssessmentDraft): AssessmentDraft {
  const demo = run(draft);
  return {
    ...draft,
    demo: { ...demo, evidenceReviewed: true, reportReviewed: false },
  };
}
export function prepareFindings(draft: AssessmentDraft): AssessmentDraft {
  const demo = run(draft);
  if (!demo.evidenceReviewed) throw Error("Review evidence first");
  if (demo.findings.length) return draft;
  const ids = [...new Set(demo.records.map((r) => r.question.id))];
  const findings = ids.map((id, index): DemoFinding => {
    const records = demo.records.filter((r) => r.question.id === id);
    const surveys = records.filter((r) => r.type === "Survey");
    const interviews = records.filter((r) => r.type === "Interview");
    if (surveys.length !== 2 || interviews.length !== 1)
      throw Error(
        "The demo source group is incomplete. Replace the demo pack.",
      );
    return {
      id: `F${index + 1}`,
      questionId: id,
      title: records[0].question.topic,
      text: "",
      evidence: [],
      scope: "",
      qualifyingSummary: "",
      limitations: "",
      alternative: "",
      sourceIds: [],
      counterSourceIds: [],
      decision: "draft",
    };
  });
  return { ...draft, demo: { ...demo, findings, reportReviewed: false } };
}
export function changeFinding(
  draft: AssessmentDraft,
  id: string,
  patch: FindingPatch,
): AssessmentDraft {
  const demo = run(draft);
  const finding = demo.findings.find((f) => f.id === id);
  if (!finding) throw Error("Unknown finding");
  if (
    patch.evidence !== undefined &&
    (new Set(patch.evidence.map((e) => e.sourceId)).size !==
      patch.evidence.length ||
      patch.evidence.some(
        (e) =>
          !evidenceRelations.includes(e.relation) ||
          !demo.records.some((r) => r.id === e.sourceId),
      ))
  )
    throw Error("Link each source once, using evidence from this assessment");
  const next = {
    ...finding,
    ...patch,
    decision: Object.keys(patch).some((key) => key !== "decision")
      ? ("draft" as const)
      : (patch.decision ?? finding.decision),
  };
  if (next.evidence !== undefined) {
    next.sourceIds = findingEvidenceIds(next, "supports");
    next.counterSourceIds = next.evidence
      .filter((e) => e.relation === "qualifies" || e.relation === "contradicts")
      .map((e) => e.sourceId);
  }
  if (
    next.decision === "accepted" &&
    (!findingComplete(next) || !demo.evidenceReviewed)
  )
    throw Error(
      "Add a claim, scope, differing-evidence summary, limitations and supporting evidence before acceptance",
    );
  return {
    ...draft,
    demo: {
      ...demo,
      findings: demo.findings.map((f) => (f.id === id ? next : f)),
      ...(demo.noRecommendation
        ? { noRecommendation: { ...demo.noRecommendation, reviewed: false } }
        : {}),
      recommendations: demo.recommendations.map((r) =>
        r.findingId === id ? { ...r, decision: "draft" } : r,
      ),
      reportReviewed: false,
    },
  };
}
export function prepareRecommendations(
  draft: AssessmentDraft,
): AssessmentDraft {
  const demo = run(draft);
  const accepted = demo.findings.filter((f) => f.decision === "accepted");
  if (!demo.evidenceReviewed || !accepted.length)
    throw Error("Accept a finding first");
  const recommendations = [...demo.recommendations];
  for (const f of accepted) {
    if (!recommendations.some((r) => r.findingId === f.id))
      recommendations.push({
        id: `R${f.id.slice(1)}`,
        findingId: f.id,
        text: "",
        action: "",
        rationale: "",
        intendedOutcome: "",
        followUpCheck: "",
        decision: "draft",
      });
  }
  return {
    ...draft,
    demo: {
      ...demo,
      recommendations,
      ...(demo.noRecommendation
        ? { noRecommendation: { ...demo.noRecommendation, reviewed: false } }
        : {}),
      reportReviewed: false,
    },
  };
}
export function changeRecommendation(
  draft: AssessmentDraft,
  id: string,
  patch: RecommendationPatch,
): AssessmentDraft {
  const demo = run(draft);
  const rec = demo.recommendations.find((r) => r.id === id);
  if (!rec) throw Error("Unknown recommendation");
  const next = {
    ...rec,
    ...patch,
    decision: Object.keys(patch).some((key) => key !== "decision")
      ? ("draft" as const)
      : (patch.decision ?? rec.decision),
  };
  if (
    next.decision === "accepted" &&
    (!recommendationComplete(next) ||
      !demo.findings.some(
        (f) => f.id === next.findingId && f.decision === "accepted",
      ))
  )
    throw Error(
      "Accept the linked finding and add an action, rationale and intended outcome first",
    );
  return {
    ...draft,
    demo: {
      ...demo,
      recommendations: demo.recommendations.map((r) =>
        r.id === id ? next : r,
      ),
      ...(demo.noRecommendation
        ? { noRecommendation: { ...demo.noRecommendation, reviewed: false } }
        : {}),
      reportReviewed: false,
    },
  };
}
export function changeNoRecommendation(
  draft: AssessmentDraft,
  patch: { reason?: string; reviewed?: boolean },
): AssessmentDraft {
  const demo = run(draft);
  const next = {
    reason: patch.reason ?? demo.noRecommendation?.reason ?? "",
    reviewed:
      patch.reason !== undefined
        ? false
        : (patch.reviewed ?? demo.noRecommendation?.reviewed ?? false),
  };
  if (
    !demo.evidenceReviewed ||
    !demo.findings.some((f) => f.decision === "accepted") ||
    (next.reviewed &&
      (!next.reason.trim() ||
        demo.recommendations.some((r) => r.decision === "accepted")))
  )
    throw Error(
      "Accept a finding, remove accepted recommendations and record why no action is justified before confirming",
    );
  return {
    ...draft,
    demo: { ...demo, noRecommendation: next, reportReviewed: false },
  };
}
export function acceptedReportContent(draft: AssessmentDraft) {
  const demo = draft.demo;
  const findings =
    demo?.findings.filter(
      (f) => f.decision === "accepted" && findingComplete(f),
    ) ?? [];
  const recommendations =
    demo?.recommendations.filter(
      (r) =>
        r.decision === "accepted" &&
        recommendationComplete(r) &&
        findings.some((f) => f.id === r.findingId),
    ) ?? [];
  const noRecommendationReason =
    findings.length > 0 &&
    !recommendations.length &&
    demo?.noRecommendation?.reviewed
      ? demo.noRecommendation.reason.trim()
      : "";
  return { findings, recommendations, noRecommendationReason };
}
export function canReviewReport(draft: AssessmentDraft) {
  const content = acceptedReportContent(draft);
  return (
    !!draft.demo &&
    !isDemoStale(draft) &&
    draft.demo.evidenceReviewed &&
    content.findings.length > 0 &&
    (content.recommendations.length > 0 || !!content.noRecommendationReason)
  );
}
export function reviewReport(
  draft: AssessmentDraft,
  reviewed = true,
): AssessmentDraft {
  const demo = run(draft);
  if (reviewed && !canReviewReport(draft))
    throw Error(
      "Accept a finding and review recommendations or confirm why none is justified first",
    );
  return { ...draft, demo: { ...demo, reportReviewed: reviewed } };
}
export function demoProgress(draft: AssessmentDraft): Record<string, string> {
  const demo = draft.demo,
    stale = isDemoStale(draft);
  if (stale)
    return Object.fromEntries(
      [
        "setup",
        "evidence",
        "interview-preparation",
        "interviews",
        "findings",
        "recommendations",
        "report",
      ].map((stage) => [
        stage,
        stage === "setup" ? "Review configuration" : "Configuration changed",
      ]),
    );
  return {
    setup:
      draft.reviewed && canReview(draft)
        ? "Questions reviewed"
        : "Review needed",
    evidence: !demo
      ? "Not loaded"
      : stale
        ? "Configuration changed"
        : demo.evidenceReviewed
          ? "Reviewed"
          : "Review needed",
    "interview-preparation": demo
      ? "Sample brief available"
      : "Awaiting evidence",
    interviews: demo ? "Sample notes available" : "Awaiting evidence",
    findings: demo?.findings.length
      ? `${demo.findings.filter((f) => f.decision === "accepted").length} accepted`
      : "Not prepared",
    recommendations: demo?.noRecommendation?.reviewed
      ? "No recommendation · reviewed"
      : demo?.recommendations.length
        ? `${acceptedReportContent(draft).recommendations.length} accepted`
        : "Not prepared",
    report:
      demo?.reportReviewed && canReviewReport(draft)
        ? "Reviewed demo"
        : "Draft preview",
  };
}
