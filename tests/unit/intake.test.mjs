import { test } from "node:test";
import { strict as assert } from "node:assert";
import {
  emptyProfile,
  createQuestionSet,
  isStale,
  canReview,
} from "../../src/features/intake/model.ts";
import {
  readDrafts,
  saveDraft,
  deleteDraft,
  STORAGE_KEY,
} from "../../src/features/intake/storage.ts";

const profile = () => ({
  ...emptyProfile(),
  name: "Synthetic engagement",
  why: "A changing operating model",
  outcome: "Understand alignment",
  roles: "Operations\nResearch",
});
const draft = (id = "test-one") => ({
  id,
  profile: profile(),
  questionSet: createQuestionSet(profile()),
  reviewed: false,
  updatedAt: "2026-10-26T00:00:00.000Z",
});
function memory() {
  const map = new Map();
  return {
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => map.set(k, v),
    removeItem: (k) => map.delete(k),
  };
}

test("questions retain exact profile basis and become stale after context edits", () => {
  const d = draft();
  const original = d.questionSet.profile.why;
  d.profile.why = "Different context";
  assert.equal(d.questionSet.profile.why, original);
  assert.equal(isStale(d), true);
  assert.equal(canReview(d), false);
});
test("human review requires current context and at least one nonblank included question", () => {
  const d = draft();
  assert.equal(canReview(d), true);
  d.questionSet.questions.forEach((q) => (q.included = false));
  assert.equal(canReview(d), false);
  d.questionSet.questions[0].included = true;
  d.questionSet.questions[0].text = "  ";
  assert.equal(canReview(d), false);
});
test("save/reopen preserves separate drafts, question edits and provenance; deleting one preserves the other", () => {
  const s = memory();
  const d = draft();
  d.questionSet.questions[0].text = "Consultant edited question";
  d.reviewed = true;
  saveDraft(s, d);
  saveDraft(s, draft("test-two"));
  assert.equal(readDrafts(s).drafts.length, 2);
  assert.deepEqual(readDrafts(s).drafts[0], d);
  deleteDraft(s, "test-one");
  assert.equal(readDrafts(s).drafts[0].id, "test-two");
});
test("corrupt/incompatible storage is surfaced and never overwritten silently", () => {
  for (const raw of [
    "{bad",
    JSON.stringify({ version: 99, drafts: [] }),
    JSON.stringify({ version: 1, drafts: [{ id: "fake" }] }),
  ]) {
    const s = memory();
    s.setItem(STORAGE_KEY, raw);
    assert.ok(readDrafts(s).error);
    assert.throws(() => saveDraft(s, draft()));
    assert.equal(s.getItem(STORAGE_KEY), raw);
  }
});
test("blocked storage surfaces failure and forged reviewed stale content cannot pass review rules", () => {
  const s = {
    getItem() {
      throw Error("blocked");
    },
    setItem() {
      throw Error("full");
    },
  };
  assert.ok(readDrafts(s).error);
  assert.throws(() => saveDraft(s, draft()));
  const d = draft();
  d.reviewed = true;
  d.profile.roles = "New scope";
  assert.equal(canReview(d), false);
});
