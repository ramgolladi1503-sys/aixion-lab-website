import { test, expect } from "@playwright/test";
import path from "node:path";

const routes = [["home", "/"], ["systems", "/systems"], ["tradebot", "/systems/tradebot"], ["control-core", "/systems/control-core"], ["automation", "/systems/automation"], ["analytics", "/systems/analytics"], ["research", "/research"], ["opening-session", "/research/opening-session-market-structure"], ["rec-md", "/research/rec-md-structural-interaction"], ["mean-reversion", "/research/mean-reversion-candidate"], ["evidence-autonomy", "/research/evidence-bound-autonomy"], ["pulse", "/pulse"], ["journey", "/journey"], ["about", "/about"], ["contact", "/contact"], ["resume", "/resume"], ["not-found", "/route-that-does-not-exist"]] as const;

for (const [name, route] of routes) {
  test(`${name} renders and captures`, async ({ page }, testInfo) => {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(hasHorizontalOverflow, `${route} must not overflow horizontally`).toBe(false);
    await expect(page.locator(".abstract-scene")).toHaveCount(0);
    const revealTargets = page.locator(".reveal-on-scroll");
    for (let index = 0; index < await revealTargets.count(); index += 1) {
      await revealTargets.nth(index).scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(150);
    const destination = path.join("test-results", "screenshots", testInfo.project.name, `${name}.png`);
    await page.screenshot({ path: destination, fullPage: true });
  });
}

test("home presents a complete proposition and systems entry", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  await expect(page.getByRole("heading", { level: 1 })).toBeAttached();
  await expect(page.getByRole("link", { name: /Explore systems/ })).toBeVisible();
  await expect(page.getByText("LAB PULSE", { exact: true })).toBeVisible();
  await expect(page.locator(".hero-carousel")).toBeVisible();
  await expect(page.locator(".home-intro")).toBeVisible();
  await expect(page.locator(".home-pulse")).toBeVisible();
  const homeOrder = await page.locator("main").evaluate(main => {
    const sections = Array.from(main.querySelectorAll("section"));
    return sections.findIndex(section => section.classList.contains("hero")) <
      sections.findIndex(section => section.classList.contains("home-intro")) &&
      sections.findIndex(section => section.classList.contains("home-intro")) <
      sections.findIndex(section => section.classList.contains("home-pulse"));
  });
  expect(homeOrder).toBe(true);
});

test("desktop About Lab contact does not reserve a hidden second column", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Desktop grid assertion");
  await page.goto("/about", { waitUntil: "networkidle" });
  const panel = page.locator(".about-contact-panel");
  const visibleCard = panel.locator(".contact-copy").first();
  const panelBox = await panel.boundingBox();
  const cardBox = await visibleCard.boundingBox();
  expect(panelBox).not.toBeNull();
  expect(cardBox).not.toBeNull();
  expect((cardBox?.width ?? 0) / (panelBox?.width ?? 1)).toBeGreaterThan(0.95);
});

test("flagship pages use distinct visual grammars", async ({ page }) => {
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  await expect(page.locator(".feature-split .art-directed-tradebot").first()).toBeVisible();
  await page.goto("/systems/control-core", { waitUntil: "networkidle" });
  await expect(page.locator(".feature-split .art-directed-control-core").first()).toBeVisible();
});
