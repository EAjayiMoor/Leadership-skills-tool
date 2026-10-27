import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const output = resolve(process.env.UI_CAPTURE_DIR ?? `docs/evidence/sprint-1/run-${new Date().toISOString().replace(/[:.]/g, '-')}`);
const baseURL = process.env.UI_BASE_URL ?? "http://127.0.0.1:3000";
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const checks = [];
function luminance(colour) {
  const values = colour.startsWith("#")
    ? colour
        .slice(1)
        .match(/../g)
        .map((value) => parseInt(value, 16))
    : colour
        .match(/[\d.]+/g)
        .slice(0, 3)
        .map(Number);
  return values
    .map((value) => value / 255)
    .map((value) =>
      value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
    )
    .reduce(
      (sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index],
      0,
    );
}
function contrast(foreground, background) {
  const values = [luminance(foreground), luminance(background)].sort(
    (a, b) => b - a,
  );
  return Number(((values[0] + 0.05) / (values[1] + 0.05)).toFixed(2));
}
try {
  for (const theme of ["light", "dark"]) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      colorScheme: theme,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    for (const [name, route] of [
      ["home", "/"],
      ["setup", "/assessments/pharma/setup"],
      ["evidence", "/assessments/pharma/evidence"],
      ["report", "/assessments/pharma/report"],
    ]) {
      await page.goto(`${baseURL}${route}`);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: resolve(output, `${name}-${theme}.png`),
        fullPage: true,
      });
      const measurements = await page.evaluate(() => {
        const style = getComputedStyle(document.documentElement);
        const colour = (name) => {
          const sample = document.createElement("span");
          sample.style.color = style.getPropertyValue(name);
          document.body.append(sample);
          const value = getComputedStyle(sample).color;
          sample.remove();
          return value;
        };
        return {
          width: innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          navigation: {
            focus: getComputedStyle(document.querySelector(".sidebar"))
              .getPropertyValue("--focus-ring")
              .trim(),
            background: getComputedStyle(document.querySelector(".sidebar"))
              .backgroundColor,
          },
          colours: Object.fromEntries(
            [
              "--foreground",
              "--text-muted",
              "--surface",
              "--surface-muted",
              "--primary",
              "--primary-text",
              "--focus-ring",
              "--border-strong",
            ].map((name) => [name, colour(name)]),
          ),
        };
      });
      checks.push({ screen: name, theme, ...measurements });
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseURL}/assessments/pharma/evidence`);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: resolve(output, `evidence-mobile-${theme}.png`),
      fullPage: true,
    });
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto(`${baseURL}/`);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: resolve(output, `home-mobile-${theme}.png`),
      fullPage: true,
    });
    await context.close();
  }
  await writeFile(
    resolve(output, "visual-checks.json"),
    JSON.stringify(checks, null, 2),
  );
  const contrastChecks = ["light", "dark"].map((theme) => {
    const sample = checks.find((check) => check.theme === theme);
    const c = sample.colours;
    return {
      theme,
      bodyText: contrast(c["--foreground"], c["--surface"]),
      mutedText: contrast(c["--text-muted"], c["--surface-muted"]),
      primaryButton: contrast(c["--primary-text"], c["--primary"]),
      mainFocus: contrast(c["--focus-ring"], c["--surface"]),
      navigationFocus: contrast(
        sample.navigation.focus,
        sample.navigation.background,
      ),
      controlBorder: contrast(c["--border-strong"], c["--surface"]),
    };
  });
  await writeFile(
    resolve(output, "contrast-checks.json"),
    JSON.stringify(contrastChecks, null, 2),
  );
  console.log(
    `Saved 12 synthetic UI screenshots and layout/colour measurements to ${output}`,
  );
} finally {
  await browser.close();
}
