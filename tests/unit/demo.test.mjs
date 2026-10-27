import { test } from "node:test";
import { strict as assert } from "node:assert";
import {
  emptyProfile,
  createQuestionSet,
} from "../../src/features/intake/model.ts";
import {
  loadDemo,
  reviewEvidence,
  prepareFindings,
  changeFinding,
  prepareRecommendations,
  changeRecommendation,
  changeNoRecommendation,
  canReviewReport,
  reviewReport,
  isDemoStale,
} from "../../src/features/demo/model.ts";
import {
  readDrafts,
  saveDraft,
  STORAGE_KEY,
} from "../../src/features/intake/storage.ts";
const draft = (id = "demo-one") => {
  const profile = {
    ...emptyProfile(),
    name: "Fictional client",
    why: "Changing responsibilities",
    outcome: "Understand collaboration",
    roles: "Research\nOperations",
  };
  return {
    id,
    profile,
    questionSet: createQuestionSet(profile),
    reviewed: true,
    updatedAt: "2026-10-26T00:00:00.000Z",
  };
};
function reviewedDemo() {
  return prepareFindings(reviewEvidence(loadDemo(draft(), "pharma")));
}
test("prepareFindings creates unsubstantiated drafts without invented text", () => {
  const d = reviewedDemo();
  assert.equal(d.demo.findings[0].text, "");
  assert.deepEqual(d.demo.findings[0].evidence, []);
});
test("finding evidence can span questions and roles within one run", () => {
  const d = reviewedDemo();
  const finding = d.demo.findings[0];
  const supporting = d.demo.records.find(
    (r) => r.question.id !== finding.questionId && r.participant === "P01",
  );
  const qualifying = d.demo.records.find(
    (r) => r.question.id === finding.questionId && r.participant === "P02",
  );
  assert.ok(supporting);
  assert.ok(qualifying);
  assert.notEqual(supporting.question.id, qualifying.question.id);
  const next = changeFinding(d, finding.id, {
    evidence: [
      { sourceId: supporting.id, relation: "supports" },
      { sourceId: qualifying.id, relation: "qualifies" },
    ],
  });
  assert.deepEqual(next.demo.findings[0].sourceIds, [supporting.id]);
  assert.deepEqual(next.demo.findings[0].counterSourceIds, [qualifying.id]);
  const foreign = loadDemo(draft("demo-two"), "pharma");
  assert.throws(() =>
    changeFinding(next, finding.id, {
      evidence: [
        { sourceId: foreign.demo.records[0].id, relation: "supports" },
      ],
    }),
  );
});
test("finding acceptance requires a bounded claim and supporting source", () => {
  let d = reviewedDemo();
  const finding = d.demo.findings[0];
  assert.throws(() => changeFinding(d, finding.id, { decision: "accepted" }));
  const source = d.demo.records.find(
    (r) => r.question.id === finding.questionId && r.participant === "P01",
  );
  d = changeFinding(d, finding.id, {
    text: "Ownership is clearer in routine decisions than in exceptions.",
    scope: "The two fictional role groups in this example.",
    qualifyingSummary: "One interview describes a successful next step.",
    limitations: "Two participant codes cannot establish prevalence.",
    evidence: [{ sourceId: source.id, relation: "supports" }],
  });
  assert.equal(
    changeFinding(d, finding.id, { decision: "accepted" }).demo.findings[0]
      .decision,
    "accepted",
  );
});
test("structured recommendations require action, rationale and intended outcome", () => {
  let d = reviewedDemo();
  const finding = d.demo.findings[0];
  const source = d.demo.records.find(
    (r) => r.question.id === finding.questionId && r.participant === "P01",
  );
  d = changeFinding(d, finding.id, {
    text: "A bounded candidate finding.",
    scope: "The two fictional role groups.",
    qualifyingSummary: "One interview describes a successful next step.",
    limitations: "Two participant codes cannot establish prevalence.",
    evidence: [{ sourceId: source.id, relation: "supports" }],
  });
  d = changeFinding(d, finding.id, { decision: "accepted" });
  d = prepareRecommendations(d);
  const recommendation = d.demo.recommendations[0];
  assert.equal(recommendation.action, "");
  assert.throws(() =>
    changeRecommendation(d, recommendation.id, { decision: "accepted" }),
  );
  d = changeRecommendation(d, recommendation.id, {
    action: "Trial a handoff note for cross-functional exceptions.",
    rationale: "The accepted finding identifies unclear exception ownership.",
    intendedOutcome: "Make ownership and follow-through visible.",
  });
  d = changeRecommendation(d, recommendation.id, { decision: "accepted" });
  assert.equal(d.demo.recommendations[0].decision, "accepted");
});
test("editing structured finding scope revokes dependent reviews", () => {
  let d = accepted();
  d = reviewReport(d);
  const finding = d.demo.findings[0];
  d = changeFinding(d, finding.id, { scope: "A narrower scope." });
  assert.equal(d.demo.findings[0].decision, "draft");
  assert.equal(d.demo.recommendations[0].decision, "draft");
  assert.equal(d.demo.reportReviewed, false);
});
test("structured source references cannot point outside the saved demo run", () => {
  const d = reviewedDemo();
  const foreign = loadDemo(draft("demo-two"), "pharma");
  const invalid = structuredClone(d);
  invalid.demo.findings[0].evidence = [
    { sourceId: foreign.demo.records[0].id, relation: "supports" },
  ];
  const raw = JSON.stringify({ version: 1, drafts: [invalid] });
  const storage = { getItem: () => raw, setItem: () => {} };
  assert.ok(readDrafts(storage).error);
});
test("legacy saved demos without structured fields remain valid", () => {
  const d = reviewReport(accepted());
  for (const finding of d.demo.findings) {
    finding.sourceIds = [
      d.demo.records.find((r) => r.question.id === finding.questionId).id,
    ];
    finding.counterSourceIds = [];
    for (const key of [
      "evidence",
      "scope",
      "qualifyingSummary",
      "limitations",
      "alternative",
    ])
      delete finding[key];
  }
  for (const recommendation of d.demo.recommendations) {
    recommendation.text = "An earlier consultant-authored recommendation.";
    for (const key of [
      "action",
      "rationale",
      "intendedOutcome",
      "followUpCheck",
    ])
      delete recommendation[key];
  }
  const storage = {
    getItem: () => JSON.stringify({ version: 1, drafts: [d] }),
    setItem() {},
  };
  const result = readDrafts(storage);
  assert.equal(result.error, undefined);
  assert.deepEqual(result.drafts[0], d);
  assert.equal(canReviewReport(result.drafts[0]), true);
});
test("invalid evidence relations and duplicate source links are rejected", () => {
  const d = reviewedDemo();
  const sourceId = d.demo.records[0].id;
  for (const evidence of [
    [{ sourceId, relation: "invented" }],
    [
      { sourceId, relation: "supports" },
      { sourceId, relation: "context" },
    ],
  ]) {
    assert.throws(() => changeFinding(d, "F1", { evidence }));
    const invalid = structuredClone(d);
    invalid.demo.findings[0].evidence = evidence;
    const storage = {
      getItem: () => JSON.stringify({ version: 1, drafts: [invalid] }),
      setItem() {},
    };
    assert.ok(readDrafts(storage).error);
  }
});
test("complete claims still need support and every bounded-claim field", () => {
  const d = writeFinding(reviewedDemo(), 0);
  for (const key of [
    "title",
    "text",
    "scope",
    "qualifyingSummary",
    "limitations",
  ]) {
    const incomplete = changeFinding(d, "F1", { [key]: " " });
    assert.throws(() =>
      changeFinding(incomplete, "F1", { decision: "accepted" }),
    );
  }
  const contextOnly = changeFinding(d, "F1", {
    evidence: [{ sourceId: d.demo.records[0].id, relation: "context" }],
  });
  assert.throws(() =>
    changeFinding(contextOnly, "F1", { decision: "accepted" }),
  );
});
test("changing evidence relation reopens the whole reviewed chain", () => {
  const d = reviewReport(accepted());
  const next = changeFinding(d, "F1", {
    evidence: [{ sourceId: d.demo.records[0].id, relation: "contradicts" }],
  });
  assert.equal(next.demo.findings[0].decision, "draft");
  assert.equal(next.demo.recommendations[0].decision, "draft");
  assert.equal(next.demo.reportReviewed, false);
  assert.equal(canReviewReport(next), false);
});
test("an explicitly reviewed no-recommendation reason permits a finding-only report", () => {
  let d = changeRecommendation(accepted(), "R1", { decision: "rejected" });
  d = changeNoRecommendation(d, {
    reason: "The evidence supports further inquiry but no action yet.",
  });
  assert.equal(canReviewReport(d), false);
  d = changeNoRecommendation(d, { reviewed: true });
  assert.equal(canReviewReport(d), true);
  const reviewed = reviewReport(d);
  const storage = {
    getItem: () => JSON.stringify({ version: 1, drafts: [reviewed] }),
    setItem() {},
  };
  assert.equal(readDrafts(storage).error, undefined);
});
test("no-recommendation confirmation requires a reason and no accepted actions", () => {
  assert.throws(() => changeNoRecommendation(accepted(), { reviewed: true }));
  let d = changeRecommendation(accepted(), "R1", { decision: "rejected" });
  assert.throws(() => changeNoRecommendation(d, { reviewed: true }));
  d = changeNoRecommendation(d, { reason: "More evidence is needed." });
  d = changeNoRecommendation(d, { reviewed: true });
  d = changeNoRecommendation(d, { reason: "The reason changed." });
  assert.equal(d.demo.noRecommendation.reviewed, false);
  assert.equal(canReviewReport(d), false);
});
test("finding and recommendation edits revoke a no-recommendation review", () => {
  const d = accepted();
  d.demo.recommendations[0].decision = "rejected";
  d.demo.noRecommendation = {
    reason: "More evidence is needed before proposing an action.",
    reviewed: true,
  };
  const findingEdit = changeFinding(d, "F1", {
    limitations: "Revised coverage limits.",
  });
  assert.equal(findingEdit.demo.noRecommendation.reviewed, false);
  const recommendationEdit = changeRecommendation(d, "R1", {
    action: "A possible next action.",
  });
  assert.equal(recommendationEdit.demo.noRecommendation.reviewed, false);
});
test("malformed source groups are rejected before finding preparation", () => {
  const d = loadDemo(draft(), "reference");
  d.demo.records = d.demo.records.slice(0, 1);
  const raw = JSON.stringify({ version: 1, drafts: [d] });
  const storage = {
    getItem: () => raw,
    setItem: () => {
      throw Error("must not write");
    },
  };
  assert.ok(readDrafts(storage).error);
});
test("delimiter-only role groups cannot load unsaveable demo material", () => {
  const d = draft();
  d.profile.roles = ",,,\n ,";
  d.questionSet = createQuestionSet(d.profile);
  d.questionSet.questions[2].included = false;
  assert.throws(() => loadDemo(d, "reference"));
});
function accepted() {
  let d = prepareFindings(reviewEvidence(loadDemo(draft(), "pharma")));
  d = writeFinding(d, 0);
  d = changeFinding(d, d.demo.findings[0].id, { decision: "accepted" });
  d = prepareRecommendations(d);
  d = writeRecommendation(d);
  return changeRecommendation(d, d.demo.recommendations[0].id, {
    decision: "accepted",
  });
}
function writeFinding(d, index) {
  return changeFinding(d, d.demo.findings[index].id, {
    text: "Exception ownership needs further exploration in this sample.",
    scope: "The two fictional role groups.",
    qualifyingSummary:
      "The interview gives a successful example; the pattern is mixed.",
    limitations: "Two participant codes do not establish cohort prevalence.",
    evidence: [
      { sourceId: d.demo.records[index * 3].id, relation: "supports" },
    ],
  });
}
function writeRecommendation(d) {
  return changeRecommendation(d, d.demo.recommendations[0].id, {
    action: "Trial a shared exception handoff note.",
    rationale:
      "The accepted finding identifies uncertainty in exception ownership.",
    intendedOutcome: "Clarify responsibility at each handoff.",
  });
}
test("explicit pack replacement resets reviews and never reassigns old source links", () => {
  const d = reviewReport(accepted());
  const next = loadDemo(d, "energy-utilities");
  assert.equal(next.demo.evidenceReviewed, false);
  assert.equal(next.demo.reportReviewed, false);
  assert.equal(next.demo.findings.length, 0);
  assert.equal(next.demo.recommendations.length, 0);
  assert.equal(next.demo.records.length, 12);
  assert.ok(
    next.demo.records.every(
      (r) => !d.demo.records.some((old) => old.id === r.id),
    ),
  );
});
test("loading is gated by reviewed current questions, and captures isolated question/source snapshots", () => {
  const d = draft();
  assert.throws(() => loadDemo({ ...d, reviewed: false }, "pharma"));
  const a = loadDemo(d, "pharma"),
    b = loadDemo(draft("demo-two"), "pharma");
  assert.ok(a.demo.records.length >= 6);
  assert.equal(
    new Set(a.demo.records.map((r) => r.id)).size,
    a.demo.records.length,
  );
  assert.ok(
    a.demo.records.every(
      (r) => !b.demo.records.some((other) => r.id === other.id),
    ),
  );
  const original = a.demo.records[0].question.text;
  a.questionSet.questions[0].text = "Changed question";
  assert.equal(a.demo.records[0].question.text, original);
  assert.equal(isDemoStale(a), true);
  assert.throws(() => reviewEvidence(a));
});
test("review chain and source links exclude unreviewed/rejected findings and recommendations", () => {
  let d = loadDemo(draft(), "energy-utilities");
  assert.throws(() => prepareFindings(d));
  assert.equal(canReviewReport(d), false);
  d = prepareFindings(reviewEvidence(d));
  assert.ok(
    d.demo.findings.every(
      (f) =>
        f.sourceIds.length === 0 &&
        f.sourceIds.every((id) => d.demo.records.some((r) => r.id === id)),
    ),
  );
  d = changeFinding(d, d.demo.findings[0].id, { decision: "rejected" });
  assert.throws(() => prepareRecommendations(d));
  d = writeFinding(d, 1);
  d = changeFinding(d, d.demo.findings[1].id, { decision: "accepted" });
  d = prepareRecommendations(d);
  assert.ok(
    d.demo.recommendations.every((r) => r.findingId === d.demo.findings[1].id),
  );
  assert.equal(canReviewReport(d), false);
  d = writeRecommendation(d);
  d = changeRecommendation(d, d.demo.recommendations[0].id, {
    decision: "accepted",
  });
  assert.equal(canReviewReport(d), true);
  assert.equal(reviewReport(d).demo.reportReviewed, true);
});
test("editing a finding revokes dependent recommendation and report review; configuration changes preserve but stale the run", () => {
  let d = reviewReport(accepted());
  const f = d.demo.findings[0];
  d = changeFinding(d, f.id, { text: "Consultant revision" });
  assert.equal(d.demo.reportReviewed, false);
  assert.equal(d.demo.findings[0].decision, "draft");
  assert.equal(d.demo.recommendations[0].decision, "draft");
  assert.equal(canReviewReport(d), false);
  d.profile.why = "New context";
  assert.equal(isDemoStale(d), true);
  assert.equal(d.demo.records.length, 12);
  assert.throws(() => prepareFindings(d));
});
test("blank text cannot be accepted, and recommendation edits revoke their review", () => {
  let d = accepted();
  d = changeRecommendation(d, d.demo.recommendations[0].id, { action: "" });
  assert.equal(canReviewReport(d), false);
  assert.throws(() =>
    changeRecommendation(d, d.demo.recommendations[0].id, {
      decision: "accepted",
    }),
  );
  d = changeFinding(d, d.demo.findings[0].id, { text: "  " });
  assert.throws(() =>
    changeFinding(d, d.demo.findings[0].id, { decision: "accepted" }),
  );
});
test("optional demo persists and old drafts remain valid; dangling references are rejected without overwriting", () => {
  const map = new Map();
  const storage = {
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => map.set(k, v),
  };
  saveDraft(storage, draft());
  assert.equal(readDrafts(storage).drafts.length, 1);
  const d = reviewReport(accepted());
  saveDraft(storage, d);
  assert.deepEqual(readDrafts(storage).drafts[0], d);
  const invalid = structuredClone(d);
  invalid.demo.findings[0].sourceIds = ["missing-source"];
  const raw = JSON.stringify({ version: 1, drafts: [invalid] });
  storage.setItem(STORAGE_KEY, raw);
  assert.ok(readDrafts(storage).error);
  assert.throws(() => saveDraft(storage, d));
  assert.equal(storage.getItem(STORAGE_KEY), raw);
});
