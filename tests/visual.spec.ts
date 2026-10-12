import { test, expect } from "@playwright/test";
import path from "node:path";

const routes = [
  ["home", "/"], ["systems", "/systems"], ["tradebot", "/systems/tradebot"], ["control-core", "/systems/control-core"],
  ["automation", "/systems/automation"], ["analytics", "/systems/analytics"], ["research", "/research"],
  ["research-rejected", "/research/mean-reversion-candidate"], ["research-open-session", "/research/opening-session-market-structure"],
  ["research-rec-md", "/research/rec-md-structural-interaction"], ["research-autonomy", "/research/evidence-bound-autonomy"],
  ["pulse", "/pulse"], ["journey", "/journey"], ["about", "/about"], ["collaborate", "/collaborate"], ["resume", "/resume"], ["not-found", "/missing-route"],
] as const;

for (const [name, route] of routes) {
  test(`${name} renders and captures`, async ({ page }, testInfo) => {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator("body")).toBeVisible();
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(hasHorizontalOverflow, `${route} must not overflow horizontally`).toBe(false);
    await expect(page.locator(".abstract-scene")).toHaveCount(0);
    await page.evaluate(async () => {
      window.scrollTo(0, document.documentElement.scrollHeight);
      await new Promise<void>((resolve) => setTimeout(resolve, 250));
      window.scrollTo(0, 0);
      await new Promise<void>((resolve) => setTimeout(resolve, 950));
    });
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

test("home chapter tabs switch the featured story accessibly", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const tabs = page.getByRole("tablist", { name: "Explore Aixion Lab" });
  await expect(tabs.getByRole("tab")).toHaveCount(4);
  await tabs.getByRole("tab", { name: /Research/ }).click();
  await expect(page.getByRole("tabpanel")).toContainText("A good question deserves an honest result.");
  await expect(tabs.getByRole("tab", { name: /Research/ })).toHaveAttribute("aria-selected", "true");
  await expect(page.locator(".home-hero__image")).toHaveCSS("transition-property", /opacity/);
});

test("home keeps all content visible and minimizes motion when reduced motion is requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { name: /Applied intelligence/ })).toBeVisible();
  const duration = await page.locator(".home-hero__image").evaluate((element) => getComputedStyle(element).animationDuration);
  expect(parseFloat(duration)).toBeLessThanOrEqual(0.001);
});

test("desktop home hero begins near the sticky header", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Desktop density assertion");
  await page.goto("/", { waitUntil: "networkidle" });
  const copy = await page.locator(".home-hero__top").boundingBox();
  expect(copy).not.toBeNull();
  expect(copy?.y ?? 99999).toBeLessThan(260);
});

test("About contact gives direct links alongside the introduction", async ({ page }) => {
  await page.goto("/about", { waitUntil: "networkidle" });
  const panel = page.locator(".contact-list");
  await expect(panel.getByRole("link")).toHaveCount(3);
  await expect(page.locator(".contact-copy")).toBeVisible();
});

test("flagship pages use distinct visual grammars", async ({ page }) => {
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  await expect(page.locator(".visual-tradebot").first()).toBeVisible();
  await page.goto("/systems/control-core", { waitUntil: "networkidle" });
  await expect(page.locator(".visual-core").first()).toBeVisible();
});
