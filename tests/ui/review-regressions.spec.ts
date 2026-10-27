import { expect, test } from "@playwright/test";

function contrast(foreground: string, background: string) {
  const luminance = (colour: string) => {
    const channels = (colour.match(/[\d.]+/g) ?? [])
      .slice(0, 3)
      .map(Number)
      .map((value) => {
        const channel = value / 255;
        return channel <= 0.04045
          ? channel / 12.92
          : ((channel + 0.055) / 1.055) ** 2.4;
      });
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const values = [luminance(foreground), luminance(background)].sort(
    (a, b) => b - a,
  );
  return (values[0] + 0.05) / (values[1] + 0.05);
}

test("light-theme sidebar keyboard focus contrasts with its background", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/assessments/pharma/evidence");
  const link = page
    .getByRole("navigation", { name: "Assessment stages" })
    .getByRole("link")
    .first();
  await link.focus();
  const colours = await link.evaluate((element) => ({
    foreground: getComputedStyle(element).outlineColor,
    background: getComputedStyle(element.closest("aside")!).backgroundColor,
    style: getComputedStyle(element).outlineStyle,
  }));
  expect(colours.style).not.toBe("none");
  expect(
    contrast(colours.foreground, colours.background),
  ).toBeGreaterThanOrEqual(3);
});

test("light-theme dialog close button has visible keyboard focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/assessments/pharma/evidence");
  await page.getByRole("button", { name: "Open assessment stages" }).focus();
  await page.keyboard.press("Enter");
  const close = page.getByRole("button", { name: "Close assessment stages" });
  await close.focus();
  const colours = await close.evaluate((element) => ({
    foreground: getComputedStyle(element).outlineColor,
    background: getComputedStyle(element.closest("dialog")!).backgroundColor,
    style: getComputedStyle(element).outlineStyle,
  }));
  expect(colours.style).not.toBe("none");
  expect(
    contrast(colours.foreground, colours.background),
  ).toBeGreaterThanOrEqual(3);
});

test("home summary text stays within each card at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  for (const card of await page.locator(".stat").all()) {
    expect(
      await card.evaluate(
        (element) => element.scrollWidth <= element.clientWidth,
      ),
    ).toBe(true);
  }
});

test("dark-theme input boundary is distinguishable from the field surface", async ({
  page,
}) => {
  await page.goto("/assessments/pharma/setup");
  await page.getByLabel("Colour theme").selectOption("dark");
  const colours = await page
    .getByLabel("What should the assessment help the client understand?")
    .evaluate((element) => ({
      foreground: getComputedStyle(element).borderTopColor,
      background: getComputedStyle(element).backgroundColor,
    }));
  expect(
    contrast(colours.foreground, colours.background),
  ).toBeGreaterThanOrEqual(3);
});
