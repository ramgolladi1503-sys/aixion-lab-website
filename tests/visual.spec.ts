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
    if (route !== "/") await expect(page.getByRole("contentinfo")).toBeVisible();
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

test("home primary action keeps its direct path to contact", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const action = page.getByRole("link", { name: "Discuss a workflow" }).first();
  await expect(action).toBeVisible();
  await expect(action).toHaveAttribute("href", "#contact");
});

test("home retains its shuffling cards without retired chapter controls", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("#shuffler_stage .card_item")).toHaveCount(6);
  await expect(page.getByRole("tablist")).toHaveCount(0);
});

test("home keeps its current landing content visible when reduced motion is requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.locator(".hero_section")).toBeVisible();
  await expect(page.locator("#shuffler_stage .card_item")).toHaveCount(6);
});

test("desktop home hero begins near the sticky header", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Desktop density assertion");
  await page.goto("/", { waitUntil: "networkidle" });
  const copy = await page.locator(".hero_section").boundingBox();
  expect(copy).not.toBeNull();
  expect(copy?.y ?? 99999).toBeLessThan(260);
});

test("About contact gives direct links alongside the introduction", async ({ page }) => {
  await page.goto("/about", { waitUntil: "networkidle" });
  const panel = page.locator(".contact-list");
  await expect(panel.getByRole("link")).toHaveCount(6);
  await expect(page.locator(".contact-copy")).toBeVisible();
});

test("flagship pages use distinct visual grammars", async ({ page }) => {
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  await expect(page.locator(".visual-tradebot").first()).toBeVisible();
  await page.goto("/systems/control-core", { waitUntil: "networkidle" });
  await expect(page.locator(".visual-core").first()).toBeVisible();
});
