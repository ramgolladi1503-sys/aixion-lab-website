import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/", "/systems", "/systems/tradebot", "/systems/control-core", "/systems/automation", "/systems/analytics",
  "/research", "/research/mean-reversion-candidate", "/research/opening-session-market-structure",
  "/research/rec-md-structural-interaction", "/research/evidence-bound-autonomy", "/pulse", "/journey", "/about", "/collaborate", "/resume",
];

for (const route of routes) {
  test(`${route} has no WCAG A/AA violations`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(results.violations, results.violations.map(v => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
  });
}
