import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("replacing the same pack resets selection and does not reassign old source URLs", async ({
  page,
}) => {
  await start(page, "pharma");
  await page
    .getByRole("button", { name: "Load demo evidence", exact: true })
    .click();
  const evidenceUrl = page.url();
  const oldId = (
    await page.getByLabel("Demo source detail").locator(".demo-id").innerText()
  ).trim();
  await page.goto(`${evidenceUrl}?source=${encodeURIComponent(oldId)}`);
  page.once("dialog", (dialog) => dialog.accept());
  await page
    .getByRole("button", { name: "Replace demo evidence", exact: true })
    .click();
  await expect(
    page.getByText("Source not found in this assessment", { exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByLabel("Demo source detail").locator(".demo-id"),
  ).not.toHaveText(oldId);
  await expect(page).toHaveURL(evidenceUrl);
  await page.goto(`${evidenceUrl}?source=${encodeURIComponent(oldId)}`);
  await expect(
    page.getByText("Source not found in this assessment", { exact: true }),
  ).toBeVisible();
});

test("failed demo saves preserve changes and block accidental navigation until retry", async ({
  page,
}) => {
  await start(page, "pharma");
  await page
    .getByRole("button", { name: "Load demo evidence", exact: true })
    .click();
  await page.evaluate(() => {
    const original = Storage.prototype.setItem;
    window.addEventListener(
      "restore-demo-storage",
      () => {
        Storage.prototype.setItem = original;
      },
      { once: true },
    );
    Storage.prototype.setItem = () => {
      throw Error("test storage unavailable");
    };
  });
  await page
    .getByRole("button", { name: "Confirm evidence review", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "Could not save demo changes",
  );
  page.once("dialog", (dialog) => dialog.dismiss());
  await page
    .getByRole("link", { name: "Continue to findings", exact: true })
    .click();
  await expect(page).toHaveURL(/\/evidence$/);
  await page.evaluate(() =>
    window.dispatchEvent(new Event("restore-demo-storage")),
  );
  await page.getByRole("button", { name: "Retry saving" }).click();
  await expect(page.getByRole("status")).toContainText("Saved on this browser");
  await page
    .getByRole("link", { name: "Continue to findings", exact: true })
    .click();
  await expect(page).toHaveURL(/\/findings$/);
});
async function start(page: import("@playwright/test").Page, pack: string) {
  await page.goto(`/assessments/${pack}`);
  await page
    .getByRole("link", { name: "Set up demo assessment", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Review sample questions", exact: true })
    .click();
  await page
    .getByLabel(
      "I have reviewed the included wording, role scope and profile links.",
    )
    .check();
  await page
    .getByRole("button", { name: "Use this draft in the scenario" })
    .click();
  await page.getByRole("button", { name: "Save draft", exact: true }).click();
  await expect(page).toHaveURL(/\/drafts\//);
  await page.getByRole("button", { name: "Continue to evidence" }).click();
  await expect(page).toHaveURL(/\/evidence$/);
}
async function authorFinding(page: import("@playwright/test").Page) {
  await page
    .getByLabel("Finding F1 wording")
    .fill(
      "Routine decisions are clearer than exception handoffs in this sample.",
    );
  await page
    .getByLabel("Finding F1 scope")
    .fill("The two fictional role groups and the situations described.");
  await page
    .getByLabel("Finding F1 differing evidence")
    .fill("An interview gives a successful handoff; the evidence is mixed.");
  await page
    .getByLabel("Finding F1 limitations")
    .fill("Two fictional participants do not establish cohort prevalence.");
  await page.getByText("Compare sources for F1", { exact: true }).click();
  await page
    .getByRole("combobox", {
      name: "Finding F1 relation to source Q2-S1",
      exact: true,
    })
    .selectOption("supports");
  await page
    .getByRole("combobox", {
      name: "Finding F1 relation to source Q1-S2",
      exact: true,
    })
    .selectOption("qualifies");
}
async function authorRecommendation(page: import("@playwright/test").Page) {
  await page
    .getByLabel("Recommendation R1 action")
    .fill("Trial a shared handoff note for cross-functional exceptions.");
  await page
    .getByLabel("Recommendation R1 rationale")
    .fill(
      "The accepted finding identifies uncertainty about exception ownership.",
    );
  await page
    .getByLabel("Recommendation R1 intended outcome")
    .fill("Make responsibility and follow-through visible.");
  await page
    .getByLabel("Recommendation R1 follow-up check")
    .fill("Review the next three exception handoffs with the sponsor.");
}
test("pharma worked example reaches a reviewed report without typing and protects existing edits", async ({
  page,
}, testInfo) => {
  await start(page, "pharma");
  await page
    .getByRole("button", { name: "Load demo evidence", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Confirm evidence review", exact: true })
    .click();
  await page
    .getByRole("link", { name: "Continue to findings", exact: true })
    .click();
  await expect(page).toHaveURL(/\/findings$/);
  const base = page.url().replace(/\/findings$/, "");
  const shortcut = page.getByRole("button", {
    name: "Use pharma worked example",
    exact: true,
  });
  await expect(shortcut).toBeVisible();
  await shortcut.click();
  await expect(page.getByLabel("Finding F1 wording")).toHaveValue(
    /shared planning helps/i,
  );
  await expect(
    page.getByRole("link", {
      name: "Continue to recommendations",
      exact: true,
    }),
  ).toHaveCount(0);
  for (const theme of ["light", "dark"]) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByLabel("Colour theme").selectOption(theme);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      axe.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      ),
    ).toEqual([]);
    await page
      .getByRole("heading", { name: "Quick demo", exact: true })
      .evaluate((element) =>
        element.parentElement!.scrollIntoView({ block: "start" }),
      );
    await page.screenshot({
      path: testInfo.outputPath(`worked-example-${theme}.png`),
    });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page
    .getByRole("button", { name: "Accept finding F1", exact: true })
    .click();
  await page
    .getByRole("link", { name: "Continue to recommendations", exact: true })
    .click();
  await expect(page.getByLabel("Recommendation R1 action")).toHaveValue(
    /handoff note/i,
  );
  await page
    .getByRole("button", { name: "Accept recommendation R1", exact: true })
    .click();
  await page.getByRole("link", { name: "Preview report", exact: true }).click();
  await page
    .getByRole("button", { name: "Confirm demo report review", exact: true })
    .click();
  await page.reload();
  await expect(
    page.getByText("Reviewed demo preview", { exact: true }),
  ).toBeVisible();
  await expect(
    page
      .getByLabel("Demo report")
      .getByRole("link", { name: /Inspect source/ }),
  ).toHaveCount(3);
  await page.goto(`${base}/findings`);
  page.once("dialog", (dialog) => dialog.dismiss());
  await shortcut.click();
  await page.goto(`${base}/report`);
  await expect(
    page.getByText("Reviewed demo preview", { exact: true }),
  ).toBeVisible();
  await page.goto(`${base}/findings`);
  await page
    .getByLabel("Finding F1 wording")
    .fill("My edited consultant finding.");
  page.once("dialog", (dialog) => dialog.dismiss());
  await shortcut.click();
  await expect(page.getByLabel("Finding F1 wording")).toHaveValue(
    "My edited consultant finding.",
  );
  page.once("dialog", (dialog) => dialog.accept());
  await shortcut.click();
  await page.goto(`${base}/report`);
  await expect(
    page.getByText("Reviewed demo preview", { exact: true }),
  ).toHaveCount(0);
  await expect(page.getByLabel("Demo report")).toContainText(
    "No accepted findings yet.",
  );
});
test("pharma worked example keeps earlier finding drafts accessible", async ({
  page,
}) => {
  await start(page, "pharma");
  await page
    .getByRole("button", { name: "Load demo evidence", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Confirm evidence review", exact: true })
    .click();
  await page
    .getByRole("link", { name: "Continue to findings", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Prepare demo findings", exact: true })
    .click();
  await page
    .getByLabel("Finding F1 wording")
    .fill("Keep my earlier draft wording.");
  await page
    .getByRole("button", { name: "Use pharma worked example", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Accept finding F2", exact: true }),
  ).toBeEnabled();
  await expect(page.locator(".demo-other-finding")).toHaveCount(3);
  await expect(page.getByLabel("Finding F1 wording")).toBeHidden();
  await page.reload();
  await page.getByText(/^Other finding · F1 ·/).click();
  await expect(page.getByLabel("Finding F1 wording")).toBeVisible();
  await expect(page.getByLabel("Finding F1 wording")).toHaveValue(
    "Keep my earlier draft wording.",
  );
});
test("guided synthesis requires evidence and bounded claims, preserves cross-theme links and structures the report", async ({
  page,
}, testInfo) => {
  test.slow();
  await start(page, "pharma");
  await page
    .getByRole("button", { name: "Load demo evidence", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Confirm evidence review", exact: true })
    .click();
  await page
    .getByRole("link", { name: "Continue to findings", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Prepare demo findings", exact: true })
    .click();
  await expect(page.getByLabel("Finding F1 wording")).toHaveValue("");
  await expect(
    page.getByRole("button", { name: "Accept finding F1", exact: true }),
  ).toBeDisabled();
  await authorFinding(page);
  await page.reload();
  await page.getByText("Compare sources for F1", { exact: true }).click();
  await expect(
    page.getByRole("combobox", {
      name: "Finding F1 relation to source Q2-S1",
      exact: true,
    }),
  ).toHaveValue("supports");
  await expect(
    page.getByRole("combobox", {
      name: "Finding F1 relation to source Q1-S2",
      exact: true,
    }),
  ).toHaveValue("qualifies");
  await page.setViewportSize({ width: 390, height: 844 });
  for (const theme of ["light", "dark"]) {
    await page.getByLabel("Colour theme").selectOption(theme);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      axe.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      ),
    ).toEqual([]);
    await page
      .locator(".synthesis-question")
      .first()
      .evaluate((element) => element.scrollIntoView({ block: "start" }));
    await page.screenshot({
      path: testInfo.outputPath(`findings-mobile-${theme}.png`),
    });
  }
  const relation = page.getByRole("combobox", {
    name: "Finding F1 relation to source Q2-S1",
    exact: true,
  });
  await relation.focus();
  await page.keyboard.press("Tab");
  await expect(relation).not.toBeFocused();
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const theme of ["light", "dark"]) {
    await page.getByLabel("Colour theme").selectOption(theme);
    await page
      .locator(".synthesis-comparison > summary")
      .first()
      .scrollIntoViewIfNeeded();
    await page.screenshot({
      path: testInfo.outputPath(`findings-desktop-${theme}.png`),
    });
  }
  await page
    .getByRole("button", { name: "Accept finding F1", exact: true })
    .click();
  await page
    .getByRole("link", { name: "Continue to recommendations", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Prepare demo recommendations", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Accept recommendation R1", exact: true }),
  ).toBeDisabled();
  await authorRecommendation(page);
  await page.screenshot({
    path: testInfo.outputPath("recommendations-dark.png"),
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Accept recommendation R1", exact: true })
    .click();
  await page.getByRole("link", { name: "Preview report", exact: true }).click();
  const report = page.getByLabel("Demo report");
  await expect(report).toContainText(
    "The two fictional role groups and the situations described.",
  );
  await expect(report).toContainText(
    "The accepted finding identifies uncertainty about exception ownership.",
  );
  await expect(report).toContainText(
    "Make responsibility and follow-through visible.",
  );
  await expect(report).toContainText(
    "Review the next three exception handoffs with the sponsor.",
  );
  await expect(
    report.getByRole("link", { name: /Inspect source/ }),
  ).toHaveCount(2);
  await page.screenshot({
    path: testInfo.outputPath("report-dark.png"),
    fullPage: true,
  });
  const base = page.url().replace(/\/report$/, "");
  await page.goto(`${base}/recommendations`);
  await page
    .getByRole("button", { name: "Reject recommendation R1", exact: true })
    .click();
  await expect(
    page.getByLabel("Reason for no recommendation", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: "Confirm no recommendation",
      exact: true,
    }),
  ).toBeDisabled();
  await page
    .getByLabel("Reason for no recommendation", { exact: true })
    .fill(
      "Further inquiry is justified; this sample is too limited to recommend an action.",
    );
  await page
    .getByRole("button", { name: "Confirm no recommendation", exact: true })
    .click();
  await page.getByRole("link", { name: "Preview report", exact: true }).click();
  await expect(page.getByLabel("Demo report")).toContainText(
    "this sample is too limited to recommend an action",
  );
  await page
    .getByRole("button", { name: "Confirm demo report review", exact: true })
    .click();
  await page.reload();
  await expect(
    page.getByText("Reviewed demo preview", { exact: true }),
  ).toBeVisible();
  await page.goto(`${base}/findings`);
  await page
    .getByLabel("Finding F1 limitations")
    .fill("The coverage limits have changed.");
  await page.goto(`${base}/report`);
  await expect(
    page.getByText("Reviewed demo preview", { exact: true }),
  ).toHaveCount(0);
  await expect(page.getByLabel("Demo report")).not.toContainText(
    "this sample is too limited to recommend an action",
  );
});
test("legacy saved findings and recommendations retain their review and editors", async ({
  page,
}) => {
  await start(page, "reference");
  const base = page.url().replace(/\/evidence$/, "");
  await page
    .getByRole("button", { name: "Load demo evidence", exact: true })
    .click();
  await page.evaluate(() => {
    const key = "leadership-assessment-drafts:v1";
    const envelope = JSON.parse(localStorage.getItem(key)!);
    const demo = envelope.drafts[0].demo;
    const record = demo.records[0];
    demo.evidenceReviewed = true;
    demo.findings = [
      {
        id: "F1",
        questionId: record.question.id,
        title: "Earlier finding",
        text: "An earlier consultant finding.",
        sourceIds: [record.id],
        counterSourceIds: [],
        decision: "accepted",
      },
    ];
    demo.recommendations = [
      {
        id: "R1",
        findingId: "F1",
        text: "An earlier consultant action.",
        decision: "accepted",
      },
    ];
    demo.reportReviewed = true;
    localStorage.setItem(key, JSON.stringify(envelope));
  });
  await page.goto(`${base}/report`);
  await expect(
    page.getByText("Reviewed demo preview", { exact: true }),
  ).toBeVisible();
  await expect(page.getByLabel("Demo report")).toContainText(
    "An earlier consultant action.",
  );
  await page.goto(`${base}/findings`);
  await expect(page.getByLabel("Finding F1 wording")).toHaveValue(
    "An earlier consultant finding.",
  );
  await page.goto(`${base}/recommendations`);
  await expect(page.getByLabel("Recommendation R1 wording")).toHaveValue(
    "An earlier consultant action.",
  );
  await page
    .getByLabel("Recommendation R1 wording")
    .fill("Revised earlier action.");
  await page.goto(`${base}/report`);
  await expect(
    page.getByText("Reviewed demo preview", { exact: true }),
  ).toHaveCount(0);
  await expect(page.getByLabel("Demo report")).not.toContainText(
    "Revised earlier action.",
  );
});
for (const pack of ["reference", "pharma", "energy-utilities"])
  test(`${pack} connected demo reaches a reviewed report with source traceability`, async ({
    page,
  }) => {
    await start(page, pack);
    const base = page.url().replace(/\/evidence$/, "");
    await page
      .getByRole("button", { name: "Load demo evidence", exact: true })
      .click();
    await expect(
      page.getByLabel("Demo source list").getByRole("button"),
    ).toHaveCount(12);
    await expect(page.getByLabel("Demo scenario")).toHaveValue(pack);
    await page
      .getByRole("button", { name: "Confirm evidence review", exact: true })
      .click();
    await page
      .getByRole("navigation", { name: "Assessment stages", exact: true })
      .getByRole("link", { name: /Interview preparation/ })
      .click();
    await page
      .getByRole("link", { name: "View sample interview notes", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: "Interview capture", exact: true }),
    ).toBeVisible();
    await page
      .getByRole("link", { name: "Continue to findings", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Prepare demo findings", exact: true })
      .click();
    await authorFinding(page);
    await page
      .getByRole("button", { name: "Accept finding F1", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Reject finding F2", exact: true })
      .click();
    await page
      .getByRole("link", { name: "Continue to recommendations", exact: true })
      .click();
    await page
      .getByRole("button", {
        name: "Prepare demo recommendations",
        exact: true,
      })
      .click();
    await authorRecommendation(page);
    await page
      .getByRole("button", { name: "Accept recommendation R1", exact: true })
      .click();
    await page
      .getByRole("link", { name: "Preview report", exact: true })
      .click();
    await expect(
      page.getByRole("button", {
        name: "Confirm demo report review",
        exact: true,
      }),
    ).toBeEnabled();
    await page
      .getByRole("button", { name: "Confirm demo report review", exact: true })
      .click();
    await expect(
      page.getByText("Reviewed demo preview", { exact: true }),
    ).toBeVisible();
    await page.reload();
    await expect(
      page.getByText("Reviewed demo preview", { exact: true }),
    ).toBeVisible();
    await expect(page.getByLabel("Demo report")).not.toContainText("P01");
    await expect(
      page.getByRole("button", { name: "Export report", exact: true }),
    ).toBeDisabled();
    const sourceLink = page
      .getByRole("link", { name: /Inspect source/ })
      .first();
    const href = await sourceLink.getAttribute("href");
    await sourceLink.click();
    await expect(page).toHaveURL(new RegExp("source="));
    const sourceId = new URL(href!, "http://localhost").searchParams.get(
      "source",
    )!;
    await expect(page.getByLabel("Demo source detail")).toContainText(sourceId);
    await page.goto(`${base}/findings`);
    await page
      .getByLabel("Finding F1 wording")
      .fill("Edited illustrative finding");
    await expect(
      page.getByText("Saved on this browser", { exact: true }),
    ).toBeVisible();
    await page.goto(`${base}/report`);
    await expect(
      page.getByText("Reviewed demo preview", { exact: true }),
    ).toHaveCount(0);
    await expect(page.getByLabel("Demo report")).not.toContainText(
      "Edited illustrative finding",
    );
  });
test("demo respects configuration changes and remains accessible at narrow width", async ({
  page,
}) => {
  await start(page, "pharma");
  const base = page.url().replace(/\/evidence$/, "");
  await page
    .getByRole("button", { name: "Load demo evidence", exact: true })
    .click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByLabel("Colour theme").selectOption("dark");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    axe.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    ),
  ).toEqual([]);
  await page.goto(`${base}/setup`);
  await page
    .getByRole("button", { name: "Company profile", exact: true })
    .click();
  await page
    .getByLabel("Why is the assessment needed now?")
    .fill("Changed synthetic context");
  await page.getByRole("button", { name: "Save draft", exact: true }).click();
  await page.goto(`${base}/report`);
  await expect(
    page.getByText("Configuration has changed", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Confirm demo report review" }),
  ).toHaveCount(0);
});
