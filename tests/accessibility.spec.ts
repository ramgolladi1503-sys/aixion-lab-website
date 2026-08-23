import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/systems", "/systems/tradebot", "/systems/control-core", "/systems/automation", "/systems/analytics", "/research", "/pulse", "/journey", "/about", "/resume"];

for (const route of routes) {
  test(`${route} has no WCAG A/AA violations`, async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(results.violations, results.violations.map(v => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
  });
}
