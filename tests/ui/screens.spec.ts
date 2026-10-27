import { expect, test } from "@playwright/test";

test("evidence selection preserves source attribution and can show an empty filter", async ({
  page,
}) => {
  await page.goto("/assessments/pharma/evidence");
  await page.getByRole("button", { name: /PH-S03/ }).click();
  await expect(page.getByLabel("Source detail")).toContainText("PH-S03");
  await expect(page.getByLabel("Source detail")).toContainText(
    "Synthetic interview note",
  );
  await page.getByLabel("Search sources").fill("a source that does not exist");
  await expect(
    page.getByRole("heading", { name: "No matching sources" }),
  ).toBeVisible();
  await expect(page.getByLabel("Source detail")).toHaveCount(0);
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByRole("button", { name: /PH-S03/ })).toBeVisible();
});

test("report example state never enables publication or export", async ({
  page,
}) => {
  await page.goto("/assessments/pharma/report");
  await expect(
    page.getByRole("button", { name: "Export report" }),
  ).toBeDisabled();
  await page.getByLabel("Report preview state").selectOption("approved");
  await expect(
    page.getByText("Approved example", { exact: true }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Export report" }),
  ).toBeDisabled();
  await expect(
    page.getByText(/Export is unavailable in this prototype/),
  ).toBeVisible();
});

test("setup exposes editable synthetic prerequisites and local save", async ({
  page,
}) => {
  await page.goto("/assessments/energy-utilities/setup");
  await expect(
    page.getByLabel("What should the assessment help the client understand?"),
  ).toHaveValue(/modernisation/);
  await expect(
    page.getByRole("button", { name: "Save draft", exact: true }),
  ).toBeEnabled();
});

test("long evidence content and menu reflow at narrow width", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/assessments/energy-utilities/evidence");
  await expect(
    page.getByRole("heading", { name: "Evidence review", exact: true }),
  ).toBeVisible();
  const fits = await page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth,
  );
  expect(fits).toBe(true);
  await expect(page.getByLabel("Source detail")).toContainText("EU-S01");
});
