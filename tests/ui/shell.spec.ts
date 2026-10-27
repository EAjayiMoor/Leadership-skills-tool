import { expect, test } from "@playwright/test";

test("opens every synthetic scenario without mixing engagement context", async ({
  page,
}) => {
  await page.goto("/");
  for (const [name, id] of [
    ["Reference scenario", "reference"],
    ["Large pharma scenario", "pharma"],
    ["Energy and utilities scenario", "energy-utilities"],
  ]) {
    await page.getByRole("link", { name: `Open ${name}`, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/assessments/${id}$`));
    await expect(
      page.getByRole("heading", { name, exact: true }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("navigation", { name: "Assessment stages" })
        .getByRole("link"),
    ).toHaveCount(8);
    await page
      .getByRole("link", { name: "All assessments", exact: true })
      .first()
      .click();
  }
});

test("direct stage URLs and reload retain the right scenario", async ({
  page,
}) => {
  await page.goto("/assessments/pharma/evidence");
  await expect(
    page.getByRole("heading", { name: "Evidence review", exact: true }),
  ).toBeVisible();
  await expect(
    page
      .getByRole("link", { name: /Evidence/ })
      .and(page.locator('[aria-current="page"]')),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByText("Large pharma scenario", { exact: true }).first(),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Assessment stages" })
    .getByRole("link", { name: /Interview preparation/ })
    .click();
  await expect(
    page.getByRole("heading", { name: "Interview preparation", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Prototype stage", { exact: true }),
  ).toBeVisible();
});

for (const path of [
  "/assessments/not-a-scenario",
  "/assessments/pharma/not-a-stage",
]) {
  test(`unknown destination ${path} offers recovery`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: "Page not found" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Back to assessments" }),
    ).toBeVisible();
  });
}

test("mobile stage menu supports keyboard dismissal and focus return", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/assessments/pharma/evidence");
  const toggle = page.getByRole("button", { name: "Open assessment stages" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("dialog", { name: "Assessment stages" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: /Recommendations/ })
    .click();
  await expect(
    page.getByRole("heading", { name: "Recommendations", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
