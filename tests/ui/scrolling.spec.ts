import { expect, test } from "@playwright/test";

for (const theme of ["light", "dark"] as const) {
  test(`${theme} drawer contains scrolling and restores the background position`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 676, height: 740 });
    await page.goto("/assessments/new");
    await page.getByLabel("Colour theme").selectOption(theme);
    const originalWidth = await page
      .locator("main")
      .evaluate((el) => el.getBoundingClientRect().width);
    await page.evaluate(() => window.scrollTo(0, 40));
    await page.getByRole("button", { name: /Open assessment stages/ }).click();
    const dialog = page.getByRole("dialog", { name: "Assessment stages" });
    await expect(dialog).toBeVisible();
    const before = await page.evaluate(() => ({
      y: scrollY,
      width: document.querySelector("main")!.getBoundingClientRect().width,
    }));
    expect(before.y).toBe(40);
    expect(before.width).toBe(originalWidth);
    await page.mouse.move(640, 450);
    await page.mouse.wheel(0, 550);
    await page.evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    );
    expect(await page.evaluate(() => scrollY)).toBe(before.y);
    expect(
      await page
        .locator("main")
        .evaluate((el) => el.getBoundingClientRect().width),
    ).toBe(before.width);
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    expect(await page.evaluate(() => scrollY)).toBe(before.y);
    await page.mouse.wheel(0, 300);
    await expect
      .poll(() => page.evaluate(() => scrollY))
      .toBeGreaterThan(before.y);
  });
}

test("short drawer scrolls internally without moving the assessment behind it", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 420 });
  await page.goto("/assessments/pharma/setup");
  await page.getByRole("button", { name: /Open assessment stages/ }).click();
  const before = await page.evaluate(() => scrollY);
  const dialog = page.getByRole("dialog", { name: "Assessment stages" });
  await page.mouse.move(180, 250);
  await page.mouse.wheel(0, 1500);
  await expect
    .poll(() => dialog.evaluate((el) => el.scrollTop))
    .toBeGreaterThan(0);
  expect(await page.evaluate(() => scrollY)).toBe(before);
  await dialog.getByRole("link", { name: /Report approval/ }).click();
  await expect(page).toHaveURL("/assessments/pharma/report");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).overflowY,
    ),
  ).not.toBe("hidden");
});
