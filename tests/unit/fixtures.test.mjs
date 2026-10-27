import { strict as assert } from "node:assert";
import { test } from "node:test";
import { getScenario } from "../../src/features/assessments/fixtures.ts";

test("known scenario lookup returns only the requested engagement", () => {
  for (const id of ["reference", "pharma", "energy-utilities"]) {
    const scenario = getScenario(id);
    assert.ok(scenario, "A known scenario must be available");
    assert.equal(scenario.id, id);
  }
});

test("unknown, traversal and prototype-chain IDs do not expose a scenario", () => {
  for (const id of ["", "unknown", "../pharma", "constructor", "__proto__"]) {
    assert.equal(getScenario(id), undefined);
  }
});
