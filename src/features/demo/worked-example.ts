import type { AssessmentDraft } from "../intake/model.ts";
import {
  changeFinding,
  changeRecommendation,
  isDemoStale,
  nextDemoId,
  type DemoFinding,
  type DemoRecommendation,
} from "./model.ts";
import { samplePassages } from "./packs.ts";
import { isDemoRun } from "./validation.ts";

const exampleId = "pharma-decision-clarity" as const;
const originalQuestion =
  "How do leaders make responsibilities clear when decisions cross organisational boundaries?";
type ExampleResult =
  | { available: false; reason: string }
  | {
      available: true;
      finding: DemoFinding;
      recommendation: DemoRecommendation;
      needsConfirmation: boolean;
    };

export function pharmaWorkedExample(draft: AssessmentDraft): ExampleResult {
  const demo = draft.demo;
  if (!demo || isDemoStale(draft) || !demo.evidenceReviewed)
    return {
      available: false,
      reason: "Review the current questions and demo evidence first.",
    };
  if (demo.pack !== "pharma")
    return {
      available: false,
      reason: "This worked example uses the prepared pharma pack.",
    };
  if (!isDemoRun(demo, draft.id))
    return {
      available: false,
      reason:
        "The saved demo evidence needs correction before loading this example.",
    };
  const question = demo.records.find(
    (record) =>
      record.question.topic === "Decision clarity" &&
      record.question.text === originalQuestion,
  )?.question;
  const passages = samplePassages("pharma", "Decision clarity");
  const group = demo.records.filter(
    (record) => record.question.id === question?.id,
  );
  const sharedPlanning = group.find(
    (record) =>
      record.type === "Survey" &&
      record.participant === "P01" &&
      record.text === passages[0],
  );
  const exceptions = group.find(
    (record) =>
      record.type === "Survey" &&
      record.participant === "P02" &&
      record.text === passages[1],
  );
  const interview = group.find(
    (record) =>
      record.type === "Interview" &&
      record.participant === "P01" &&
      record.text === passages[2],
  );
  if (!question || !sharedPlanning || !exceptions || !interview)
    return {
      available: false,
      reason:
        "This example needs the original Decision clarity question and its complete prepared pharma passages.",
    };

  const existing = demo.findings.find(
    (finding) => finding.questionId === question.id,
  );
  const findingId = existing?.id ?? nextDemoId("F", demo.findings);
  const linked = demo.recommendations.filter(
    (recommendation) => recommendation.findingId === findingId,
  );
  if (
    (!existing && demo.findings.length >= 50) ||
    (!linked.length && demo.recommendations.length >= 50)
  )
    return {
      available: false,
      reason: "This demo has reached its finding or recommendation limit.",
    };
  const finding: DemoFinding = {
    id: findingId,
    questionId: question.id,
    title: "Decision clarity: shared planning and exception ownership",
    text: "In these fictional examples, shared planning helps make priorities clear and can help agree next steps. Ownership of exceptions and follow-through when priorities change may still need to be made more explicit.",
    scope:
      "The three prepared pharma passages from two fictional participant codes, within the role groups shown in their source snapshots.",
    qualifyingSummary:
      "The interview describes a successful next-step agreement while asking for follow-through to be recorded. It qualifies the concern about exceptions; it is not independent confirmation of P01's survey.",
    limitations:
      "These fictional passages cannot establish prevalence, cause, overall capability or differences between role groups. P01 appears in both a survey and an interview. Inspect the fit to the captured question and context.",
    alternative:
      "The uncertainty may be specific to changing priorities or particular exceptions rather than a general coordination problem.",
    evidence: [
      { sourceId: sharedPlanning.id, relation: "supports" },
      { sourceId: exceptions.id, relation: "supports" },
      { sourceId: interview.id, relation: "qualifies" },
    ],
    sourceIds: [sharedPlanning.id, exceptions.id],
    counterSourceIds: [interview.id],
    decision: "draft",
    workedExample: exampleId,
  };
  const recommendation: DemoRecommendation = {
    id: linked[0]?.id ?? nextDemoId("R", demo.recommendations),
    findingId,
    text: "",
    action:
      "Trial a lightweight handoff note for decisions spanning research, manufacturing and commercial teams. Record the agreed owner, next step and a follow-up point when priorities change.",
    rationale:
      "The survey about exceptions describes uncertain next-step ownership, and the interview asks for follow-through to be recorded. The other survey describes useful shared planning, so this proposal tests how decisions are carried through those meetings.",
    intendedOutcome:
      "Make ownership and follow-through visible for cross-functional decisions.",
    followUpCheck:
      "After a period agreed with the sponsor, review a small sample of handoffs for a named owner, next step and follow-up. No success threshold is assumed.",
    decision: "draft",
    workedExample: exampleId,
  };
  const needsConfirmation =
    !!existing &&
    (existing.decision !== "draft" ||
      existing.title !== question.topic ||
      [
        existing.text,
        existing.scope,
        existing.qualifyingSummary,
        existing.limitations,
        existing.alternative,
      ].some((value) => value?.trim()) ||
      !!existing.evidence?.length ||
      !!existing.sourceIds.length ||
      !!existing.counterSourceIds.length ||
      linked.some(
        (item) =>
          item.decision !== "draft" ||
          [
            item.text,
            item.action,
            item.rationale,
            item.intendedOutcome,
            item.followUpCheck,
          ].some((value) => value?.trim()),
      ));
  return { available: true, finding, recommendation, needsConfirmation };
}

export function loadPharmaWorkedExample(
  draft: AssessmentDraft,
  replace = false,
): AssessmentDraft {
  const example = pharmaWorkedExample(draft);
  if (!example.available) throw Error(example.reason);
  if (example.needsConfirmation && !replace)
    throw Error(
      "Confirm replacement of the existing finding and linked recommendation first.",
    );
  const { finding, recommendation } = example;
  const initial = draft.demo!.findings.some((item) => item.id === finding.id)
    ? draft
    : {
        ...draft,
        demo: { ...draft.demo!, findings: [...draft.demo!.findings, finding] },
      };
  let next = changeFinding(initial, finding.id, {
    title: finding.title,
    text: finding.text,
    scope: finding.scope,
    qualifyingSummary: finding.qualifyingSummary,
    limitations: finding.limitations,
    alternative: finding.alternative,
    evidence: finding.evidence,
  });
  if (next.demo!.recommendations.some((item) => item.id === recommendation.id))
    next = changeRecommendation(next, recommendation.id, {
      text: "",
      action: recommendation.action,
      rationale: recommendation.rationale,
      intendedOutcome: recommendation.intendedOutcome,
      followUpCheck: recommendation.followUpCheck,
    });
  const demo = next.demo!;
  return {
    ...next,
    demo: {
      ...demo,
      findings: [
        finding,
        ...demo.findings.filter((item) => item.id !== finding.id),
      ],
      recommendations: demo.recommendations.some(
        (item) => item.id === recommendation.id,
      )
        ? demo.recommendations.map((item) =>
            item.id === recommendation.id ? recommendation : item,
          )
        : [...demo.recommendations, recommendation],
    },
  };
}
