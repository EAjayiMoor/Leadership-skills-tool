import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("cancelling Back keeps unsaved profile input", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "New assessment", exact: true }).click();
  await page.getByLabel("Assessment name").fill("Unsaved synthetic context");
  const dialogs: string[] = [];
  page.on("dialog", async (dialog) => {
    dialogs.push(dialog.message());
    await dialog.dismiss();
  });
  await page.evaluate(() => history.back());
  await expect(page).toHaveURL(/\/assessments\/new$/);
  await expect(page.getByLabel("Assessment name")).toHaveValue(
    "Unsaved synthetic context",
  );
  expect(dialogs).toHaveLength(1);
  page.removeAllListeners('dialog');
  page.once('dialog',dialog=>dialog.accept());
  await page.evaluate(()=>history.back());
  await expect(page).toHaveURL('/');
});

test('saved draft deletion is confirmed and missing draft never loads an example',async({page})=>{
 await page.goto('/assessments/new');await page.getByLabel('Assessment name').fill('Synthetic deletion check');
 await page.getByRole('button',{name:'Save draft',exact:true}).click();await expect(page).toHaveURL(/\/drafts\//);const savedUrl=page.url();
 await page.getByRole('link',{name:'All assessments',exact:true}).first().click();
 page.once('dialog',dialog=>dialog.dismiss());await page.getByRole('button',{name:'Delete Synthetic deletion check',exact:true}).click();
 await expect(page.getByRole('link',{name:'Resume Synthetic deletion check'})).toBeVisible();
 page.once('dialog',dialog=>dialog.accept());await page.getByRole('button',{name:'Delete Synthetic deletion check',exact:true}).click();
 await expect(page.getByRole('link',{name:'Resume Synthetic deletion check'})).toHaveCount(0);
 await page.goto(savedUrl);await expect(page.getByText('Unable to open assessment',{exact:true})).toBeVisible();
 await expect(page.getByLabel('Assessment name')).toHaveCount(0);
});

test("corrupt drafts remain untouched until explicit reset and theme is preserved", async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (!sessionStorage.getItem("seeded")) {
      localStorage.setItem("leadership-assessment-drafts:v1", "{bad");
      sessionStorage.setItem("seeded", "yes");
    }
  });
  await page.goto("/");
  await page.getByLabel("Colour theme").selectOption("dark");
  await expect(page.getByRole("status")).toContainText("could not be read");
  page.once("dialog", (d) => d.dismiss());
  await page
    .getByRole("button", { name: "Reset local assessment drafts" })
    .click();
  expect(
    await page.evaluate(() =>
      localStorage.getItem("leadership-assessment-drafts:v1"),
    ),
  ).toBe("{bad");
  page.once("dialog", (d) => d.accept());
  await page
    .getByRole("button", { name: "Reset local assessment drafts" })
    .click();
  expect(
    await page.evaluate(() =>
      localStorage.getItem("leadership-assessment-drafts:v1"),
    ),
  ).toBe(null);
  await expect(page.getByLabel("Colour theme")).toHaveValue("dark");
});

test("new assessment saves, resumes, links question basis and invalidates review on profile change", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "New assessment", exact: true }).click();
  await expect(page.getByLabel("Assessment name")).toHaveValue("");
  await page
    .getByRole("button", { name: "Review sample questions", exact: true })
    .click();
  await expect(
    page.getByLabel("Why is the assessment needed now?"),
  ).toBeFocused();
  await page.getByLabel("Assessment name").fill("Synthetic custom context");
  await page
    .getByLabel("Why is the assessment needed now?")
    .fill("A synthetic merger");
  await page
    .getByLabel("What should the assessment help the client understand?")
    .fill("Understand decision ownership");
  await page
    .getByRole("button", { name: "Leadership scope", exact: true })
    .click();
  await page
    .getByLabel("Which leadership groups are involved?")
    .fill("Operations\nResearch");
  await page
    .getByRole("button", { name: "Review sample questions", exact: true })
    .click();
  await page.getByText("Why this question?", { exact: true }).first().click();
  await expect(page.getByTestId("question-basis").first()).toContainText(
    "Understand decision ownership",
  );
  await page
    .getByLabel("Question 1 wording")
    .fill("How do you agree shared priorities?");
  await page.getByLabel("Include question 4").uncheck();
  await page
    .getByLabel(
      "I have reviewed the included wording, role scope and profile links.",
    )
    .check();
  await page
    .getByRole("button", { name: "Use this draft in the scenario" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Profile prerequisites" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Save draft", exact: true }).click();
  await expect(page).toHaveURL(/\/drafts\//);
  await page.reload();
  await expect(
    page.getByText("How do you agree shared priorities?", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Company profile", exact: true })
    .click();
  await page
    .getByLabel("Why is the assessment needed now?")
    .fill("A different synthetic change");
  await page
    .getByRole("button", { name: "Survey questions", exact: true })
    .click();
  await expect(
    page.getByText("The profile has changed", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Use this draft in the scenario" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Save draft", exact: true }).click();
  await page
    .getByRole("link", { name: "All assessments", exact: true })
    .first()
    .click();
  await expect(
    page.getByRole("link", { name: "Resume Synthetic custom context" }),
  ).toBeVisible();
});

test("all examples expose editable prerequisites without inheriting their source evidence", async ({
  page,
}) => {
  page.on("dialog", (dialog) => dialog.accept());
  for (const id of ["reference", "pharma", "energy-utilities"]) {
    await page.goto(`/assessments/${id}/setup`);
    await expect(page.getByLabel("Assessment name")).not.toHaveValue("");
    await page
      .getByRole("button", { name: "Review sample questions", exact: true })
      .click();
    await expect(page.getByLabel("Question 3 wording")).not.toHaveValue("");
  }
});

test("storage failure stays explicit and form works in dark mode at 320px", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new Error("blocked");
    };
  });
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/assessments/new");
  await page.getByLabel("Colour theme").selectOption("dark");
  await page.getByLabel("Assessment name").fill("Unsaved synthetic draft");
  await page.getByRole("button", { name: "Save draft", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Could not save");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const results = await new AxeBuilder({ page }).analyze();
  expect(
    results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    ),
  ).toEqual([]);
});

test("question refresh is explicit, edited wording invalidates review, and saved evidence stays empty", async ({
  page,
}) => {
  await page.goto("/assessments/pharma/setup");
  await page
    .getByRole("button", { name: "Review sample questions", exact: true })
    .click();
  const review = page.getByLabel(
    "I have reviewed the included wording, role scope and profile links.",
  );
  await review.check();
  await page
    .getByLabel("Question 1 wording")
    .fill("Consultant revised wording");
  await expect(review).not.toBeChecked();
  await review.check();
  await page
    .getByRole("button", { name: "Use this draft in the scenario" })
    .click();
  await page
    .getByRole("button", { name: "Company profile", exact: true })
    .click();
  await page
    .getByLabel("Why is the assessment needed now?")
    .fill("Changed synthetic purpose");
  await page
    .getByRole("button", { name: "Survey questions", exact: true })
    .click();
  page.once("dialog", (d) => d.dismiss());
  await page.getByRole("button", { name: "Refresh sample questions" }).click();
  await expect(page.getByLabel("Question 1 wording")).toHaveValue(
    "Consultant revised wording",
  );
  page.once("dialog", (d) => d.accept());
  await page.getByRole("button", { name: "Refresh sample questions" }).click();
  await expect(
    page.getByText("The profile has changed", { exact: true }),
  ).toHaveCount(0);
  await review.check();
  await page
    .getByRole("button", { name: "Use this draft in the scenario" })
    .click();
  await page.getByRole("button", { name: "Save draft", exact: true }).click();
  await expect(page).toHaveURL(/\/drafts\//);
  await page.getByRole("button", { name: "Continue to evidence" }).click();
  await expect(
    page.getByText("No assessment evidence collected", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("PH-S01", { exact: false })).toHaveCount(0);
});

for (const theme of ["light", "dark"] as const) {
  test(`intake question and scenario accessibility in ${theme}`, async ({
    page,
  }, testInfo) => {
    await page.goto("/assessments/pharma/setup");
    await page.getByLabel("Colour theme").selectOption(theme);
    await page
      .getByRole("button", { name: "Review sample questions", exact: true })
      .click();
    const questionResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      questionResults.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      ),
    ).toEqual([]);
    await page.screenshot({
      path: testInfo.outputPath(`questions-${theme}.png`),
      fullPage: true,
    });
    await page
      .getByLabel(
        "I have reviewed the included wording, role scope and profile links.",
      )
      .check();
    await page
      .getByRole("button", { name: "Use this draft in the scenario" })
      .click();
    const scenarioResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      scenarioResults.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      ),
    ).toEqual([]);
    await page.screenshot({
      path: testInfo.outputPath(`scenario-${theme}.png`),
      fullPage: true,
    });
  });
}
