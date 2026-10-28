import type { DemoRun } from "./model";
const object = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v);
const text = (v: unknown, max = 4000): v is string =>
  typeof v === "string" && v.length <= max;
const decision = (v: unknown) =>
  v === "draft" || v === "accepted" || v === "rejected";
const list = (v: unknown, max: number): v is Record<string, unknown>[] =>
  Array.isArray(v) && v.length <= max && v.every(object);
const unique = (v: Record<string, unknown>[]) =>
  new Set(v.map((x) => x.id)).size === v.length;
export function isDemoRun(v: unknown, ownerId: string): v is DemoRun {
  if (
    !object(v) ||
    v.schema !== 1 ||
    v.ownerId !== ownerId ||
    !["reference", "pharma", "energy-utilities"].includes(v.pack as string) ||
    !text(v.signature, 1_000_000) ||
    !["assessmentName", "purpose", "sector"].every((k) => text(v[k])) ||
    !["evidenceReviewed", "reportReviewed"].every(
      (k) => typeof v[k] === "boolean",
    ) ||
    !list(v.records, 150) ||
    !v.records.length ||
    !unique(v.records) ||
    !list(v.findings, 50) ||
    !unique(v.findings) ||
    !list(v.recommendations, 50) ||
    !unique(v.recommendations)
  )
    return false;
  const records = v.records;
  if (
    !records.every(
      (r) =>
        text(r.id, 160) &&
        r.id.startsWith(ownerId + "-") &&
        (r.type === "Survey" || r.type === "Interview") &&
        ["participant", "role", "text"].every((k) => text(r[k])) &&
        object(r.question) &&
        ["id", "text", "role", "topic"].every((k) =>
          text((r.question as Record<string, unknown>)[k]),
        ),
    )
  )
    return false;
  const questionIds = new Set(
    records.map((r) => (r.question as Record<string, unknown>).id),
  );
  for (const questionId of questionIds) {
    const group = records.filter(
      (r) => (r.question as Record<string, unknown>).id === questionId,
    );
    const first = group[0].question as Record<string, unknown>;
    if (
      group.filter((r) => r.type === "Survey").length !== 2 ||
      group.filter((r) => r.type === "Interview").length !== 1 ||
      !group.every((r) =>
        ["id", "text", "role", "topic"].every(
          (k) => (r.question as Record<string, unknown>)[k] === first[k],
        ),
      )
    )
      return false;
  }
  if (
    !v.findings.every(
      (f) =>
        ["id", "questionId", "title", "text"].every((k) => text(f[k])) &&
        decision(f.decision) &&
        (f.workedExample === undefined ||
          f.workedExample === "pharma-decision-clarity") &&
        (f.decision !== "accepted" || (f.text as string).trim()) &&
        questionIds.has(f.questionId) &&
        ["scope", "qualifyingSummary", "limitations", "alternative"].every(
          (k) => f[k] === undefined || text(f[k]),
        ) &&
        Array.isArray(f.sourceIds) &&
        f.sourceIds.length <= 150 &&
        Array.isArray(f.counterSourceIds) &&
        f.counterSourceIds.length <= 150 &&
        [...f.sourceIds, ...f.counterSourceIds].every(
          (id) =>
            typeof id === "string" &&
            records.some(
              (r) =>
                r.id === id &&
                (f.evidence !== undefined ||
                  (r.question as Record<string, unknown>).id === f.questionId),
            ),
        ) &&
        (f.evidence === undefined
          ? f.sourceIds.length > 0
          : list(f.evidence, 150) &&
            new Set(f.evidence.map((e) => e.sourceId)).size ===
              f.evidence.length &&
            f.evidence.every(
              (e) =>
                text(e.sourceId, 160) &&
                ["supports", "qualifies", "contradicts", "context"].includes(
                  e.relation as string,
                ) &&
                records.some((r) => r.id === e.sourceId),
            ) &&
            JSON.stringify(f.sourceIds) ===
              JSON.stringify(
                f.evidence
                  .filter((e) => e.relation === "supports")
                  .map((e) => e.sourceId),
              ) &&
            JSON.stringify(f.counterSourceIds) ===
              JSON.stringify(
                f.evidence
                  .filter(
                    (e) =>
                      e.relation === "qualifies" ||
                      e.relation === "contradicts",
                  )
                  .map((e) => e.sourceId),
              ) &&
            (f.decision !== "accepted" ||
              (["title", "scope", "qualifyingSummary", "limitations"].every(
                (k) => typeof f[k] === "string" && (f[k] as string).trim(),
              ) &&
                f.evidence.some((e) => e.relation === "supports")))),
    )
  )
    return false;
  const findings = v.findings;
  if (
    !v.recommendations.every(
      (r) =>
        text(r.id, 120) &&
        text(r.text) &&
        ["action", "rationale", "intendedOutcome", "followUpCheck"].every(
          (k) => r[k] === undefined || text(r[k]),
        ) &&
        (r.action !== undefined ||
          ["rationale", "intendedOutcome", "followUpCheck"].every(
            (k) => r[k] === undefined,
          )) &&
        decision(r.decision) &&
        (r.workedExample === undefined ||
          r.workedExample === "pharma-decision-clarity") &&
        text(r.findingId, 120) &&
        findings.some((f) => f.id === r.findingId) &&
        (r.decision !== "accepted" ||
          ((r.action === undefined
            ? (r.text as string).trim()
            : ["action", "rationale", "intendedOutcome"].every(
                (k) => typeof r[k] === "string" && (r[k] as string).trim(),
              )) &&
            findings.some(
              (f) => f.id === r.findingId && f.decision === "accepted",
            ))),
    )
  )
    return false;
  if ((v.findings.length || v.recommendations.length) && !v.evidenceReviewed)
    return false;
  const noRecommendation = v.noRecommendation;
  if (
    noRecommendation !== undefined &&
    (!object(noRecommendation) ||
      !text(noRecommendation.reason) ||
      typeof noRecommendation.reviewed !== "boolean" ||
      (noRecommendation.reviewed &&
        (!noRecommendation.reason.trim() ||
          !v.evidenceReviewed ||
          !findings.some((f) => f.decision === "accepted") ||
          v.recommendations.some((r) => r.decision === "accepted"))))
  )
    return false;
  if (
    v.reportReviewed &&
    (!v.evidenceReviewed ||
      !findings.some((f) => f.decision === "accepted") ||
      (!v.recommendations.some((r) => r.decision === "accepted") &&
        !(object(noRecommendation) && noRecommendation.reviewed)))
  )
    return false;
  return true;
}
