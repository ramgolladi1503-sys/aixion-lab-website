import { test, expect } from "@playwright/test";
import path from "node:path";

const routes = [["home", "/"], ["systems", "/systems"], ["tradebot", "/systems/tradebot"], ["control-core", "/systems/control-core"], ["automation", "/systems/automation"], ["analytics", "/systems/analytics"], ["research", "/research"], ["pulse", "/pulse"], ["journey", "/journey"], ["about", "/about"], ["resume", "/resume"]] as const;

for (const [name, route] of routes) {
  test(`${name} renders and captures`, async ({ page }, testInfo) => {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(hasHorizontalOverflow, `${route} must not overflow horizontally`).toBe(false);
    await expect(page.locator(".abstract-scene")).toHaveCount(0);
    const destination = path.join("test-results", "screenshots", testInfo.project.name, `${name}.png`);
    await page.screenshot({ path: destination, fullPage: true });
  });
}

test("home primary action is visible without scrolling", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const action = page.getByRole("link", { name: /Explore systems/ });
  await expect(action).toBeVisible();
  const box = await action.boundingBox();
  const viewport = page.viewportSize();
  expect(box).not.toBeNull();
  expect(viewport).not.toBeNull();
  expect((box?.y ?? 99999) + (box?.height ?? 0)).toBeLessThanOrEqual(viewport?.height ?? 0);
});

test("flagship pages use distinct visual grammars", async ({ page }) => {
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  await expect(page.locator(".visual-tradebot").first()).toBeVisible();
  await page.goto("/systems/control-core", { waitUntil: "networkidle" });
  await expect(page.locator(".visual-core").first()).toBeVisible();
});
