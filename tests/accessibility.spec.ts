import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/systems", "/systems/tradebot", "/systems/control-core", "/systems/automation", "/systems/analytics", "/research", "/pulse", "/journey", "/about", "/collaborate", "/resume"];
const themes = ["light", "dark"] as const;

for (const theme of themes) {
  for (const route of routes) {
    test(`${route} has no WCAG A/AA violations in ${theme} mode`, async ({ page }) => {
      await page.addInitScript(value => localStorage.setItem("aixion-theme", value), theme);
      await page.goto(route, { waitUntil: "networkidle" });
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      expect(results.violations, results.violations.map(v => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
    });
  }
}
