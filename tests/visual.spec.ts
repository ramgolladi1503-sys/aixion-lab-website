import { test, expect } from "@playwright/test";
import path from "node:path";

const routes = [
  ["home", "/"], ["work", "/work"], ["systems-compatibility", "/systems"], ["tradebot", "/systems/tradebot"], ["control-core", "/systems/control-core"],
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
    const optimizerUrls = await page.locator("img").evaluateAll((images) =>
      images.map((image) => image.getAttribute("src") ?? "").filter((src) => src.startsWith("/_next/image")),
    );
    expect(optimizerUrls, "static-export images must use deployable source URLs").toEqual([]);
    const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(hasHorizontalOverflow, `${route} must not overflow horizontally`).toBe(false);
    await expect(page.locator(".abstract-scene")).toHaveCount(0);
    await page.evaluate(async () => {
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      const step = Math.max(320, Math.floor(window.innerHeight * 0.72));
      for (let top = 0; top < root.scrollHeight; top += step) {
        window.scrollTo(0, top);
        await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      }
      window.scrollTo(0, root.scrollHeight);
      await new Promise<void>((resolve) => setTimeout(resolve, 950));
      window.scrollTo(0, 0);
      root.style.scrollBehavior = previousScrollBehavior;
      await new Promise<void>((resolve) => setTimeout(resolve, 950));
    });
    const destination = path.join("test-results", "screenshots", testInfo.project.name, `${name}.png`);
    await page.screenshot({ path: destination, fullPage: true });
  });
}

test("home primary action is visible without scrolling", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const action = page.getByRole("link", { name: /Explore TradeBot/ }).first();
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
  await expect(page.locator(".home-hero__image--enter")).toHaveCSS("transition-property", /opacity/);
  await expect(page.locator(".home-hero__image--enter")).toHaveAttribute("src", "/images/aixion-editorial/research-desk.jpg");
});

test("new primary structure presents editorial Work and removes the legacy registry", async ({ page }, testInfo) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const primary = page.getByRole("navigation", { name: "Primary navigation" });
  if (testInfo.project.name === "desktop") {
    await expect(primary.getByRole("link")).toHaveText(["The Lab", "Work", "Research", "Approach"]);
  } else {
    const menu = page.locator("details.mobile-menu");
    await menu.locator("summary").click();
    await expect(menu.getByRole("link")).toContainText(["Home", "The Lab", "Work", "Research", "Approach", "Career snapshot", "GitHub ↗"]);
  }
  await expect(page.locator(".system-register")).toHaveCount(0);
  await page.goto("/work", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Built around hard questions." })).toBeVisible();
  await expect(page.locator(".work-story")).toHaveCount(2);
  await expect(page.locator(".work-support__item")).toHaveCount(2);
});

test("home keeps all content visible and minimizes motion when reduced motion is requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { name: /Applied intelligence/ })).toBeVisible();
  const motion = await page.locator(".home-hero__image").first().evaluate((element) => ({
    animation: getComputedStyle(element).animationDuration,
    transition: getComputedStyle(element).transitionDuration,
  }));
  expect(parseFloat(motion.animation)).toBeLessThanOrEqual(0.001);
  expect(parseFloat(motion.transition)).toBeLessThanOrEqual(0.001);
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
