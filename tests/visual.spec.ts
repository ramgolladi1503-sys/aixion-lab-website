import { test, expect } from "@playwright/test";
import path from "node:path";

const routes = [
  ["home", "/"],
  ["systems", "/systems"],
  ["tradebot", "/systems/tradebot"],
  ["control-core", "/systems/control-core"],
  ["automation", "/systems/automation"],
  ["analytics", "/systems/analytics"],
  ["research", "/research"],
  ["pulse", "/pulse"],
  ["journey", "/journey"],
  ["about", "/about"],
  ["resume", "/resume"],
] as const;

for (const [name, route] of routes) {
  test(`${name} renders and captures`, async ({ page }, testInfo) => {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    const project = testInfo.project.name;
    const destination = path.join("test-results", "screenshots", project, `${name}.png`);
    await page.screenshot({ path: destination, fullPage: true });
  });
}
