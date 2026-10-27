import type { AssessmentDraft, Profile, QuestionSet } from "./model";
import { isDemoRun } from "../demo/validation.ts";
export const STORAGE_KEY = "leadership-assessment-drafts:v1";
type StoragePort = Pick<Storage, "getItem" | "setItem">;
const fields = [
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
];
const object = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v);
function validProfile(v: unknown): v is Profile {
  return (
    object(v) &&
    fields.every(
      (k) => typeof v[k] === "string" && (v[k] as string).length <= 4000,
    ) &&
    Array.isArray(v.material) &&
    v.material.length <= 4 &&
    v.material.every((x) => typeof x === "string" && x.length <= 100)
  );
}
function validQuestions(v: unknown): v is QuestionSet {
  return (
    object(v) &&
    validProfile(v.profile) &&
    Array.isArray(v.questions) &&
    v.questions.length <= 50 &&
    v.questions.every(
      (q) =>
        object(q) &&
        ["id", "text", "kind", "topic", "role", "basis", "rationale"].every(
          (k) => typeof q[k] === "string" && (q[k] as string).length <= 4000,
        ) &&
        fields.includes(q.basis as string) &&
        typeof q.included === "boolean",
    ) &&
    new Set(v.questions.map((q) => q.id)).size === v.questions.length
  );
}
function validDraft(v: unknown): v is AssessmentDraft {
  return (
    object(v) &&
    typeof v.id === "string" &&
    /^[a-zA-Z0-9-]{1,80}$/.test(v.id) &&
    (v.demo === undefined || isDemoRun(v.demo, v.id)) &&
    validProfile(v.profile) &&
    (v.questionSet === null || validQuestions(v.questionSet)) &&
    typeof v.reviewed === "boolean" &&
    typeof v.updatedAt === "string" &&
    Number.isFinite(Date.parse(v.updatedAt))
  );
}
export function readDrafts(storage: StoragePort): {
  drafts: AssessmentDraft[];
  error?: string;
} {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (raw === null) return { drafts: [] };
    if (raw.length > 3_000_000) throw Error("Too large");
    const value: unknown = JSON.parse(raw);
    if (
      !object(value) ||
      value.version !== 1 ||
      !Array.isArray(value.drafts) ||
      value.drafts.length > 100 ||
      !value.drafts.every(validDraft) ||
      new Set(value.drafts.map((d) => d.id)).size !== value.drafts.length
    )
      throw Error("Invalid format");
    return { drafts: value.drafts };
  } catch {
    return {
      drafts: [],
      error:
        "Saved drafts could not be read. Browser storage may be unavailable or contain incompatible data. Existing data has been left untouched.",
    };
  }
}
export function saveDraft(storage: StoragePort, draft: AssessmentDraft) {
  const current = readDrafts(storage);
  if (current.error) throw Error(current.error);
  if (!validDraft(draft)) throw Error("Invalid draft");
  const drafts = current.drafts.filter((d) => d.id !== draft.id);
  drafts.push(draft);
  if (drafts.length > 100) throw Error("Draft limit reached");
  const raw = JSON.stringify({ version: 1, drafts });
  if (raw.length > 3_000_000) throw Error("Draft storage limit reached");
  storage.setItem(STORAGE_KEY, raw);
}
export function deleteDraft(storage: StoragePort, id: string) {
  const current = readDrafts(storage);
  if (current.error) throw Error(current.error);
  storage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      version: 1,
      drafts: current.drafts.filter((d) => d.id !== id),
    }),
  );
}
