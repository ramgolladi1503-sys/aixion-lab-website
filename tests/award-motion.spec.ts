import { test, expect } from "@playwright/test";

test("home follows the new editorial sequence and exposes project stories", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: /Applied intelligence/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Build with care. Know what the evidence says." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "When the inputs move, the evidence has to keep up." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Useful automation needs a clear boundary around action." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Some of the most useful results are the ones that stop a claim." })).toBeVisible();
  await expect(page.locator(".story-grid, .pulse-home-card, .system-register")).toHaveCount(0);
  await expect(page.getByText("REJECTED", { exact: true })).toBeVisible();
});

test("cinematic chapter controls use four accessible project destinations", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const tabs = page.getByRole("tablist", { name: "Explore Aixion Lab" });
  await expect(tabs.getByRole("tab")).toHaveCount(4);
  await expect(tabs.getByRole("tab")).toHaveText(["01TradeBot", "02Control Core", "03Research", "04Automation"]);
  await tabs.getByRole("tab", { name: /Control Core/ }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Keep automation useful and bounded.");
  await expect(page.getByRole("tabpanel").getByRole("link", { name: "Explore Control Core" })).toHaveAttribute("href", "/systems/control-core");
});

test("motion reveals the new work spreads without hiding their content", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".site-frame")).toHaveClass(/motion-ready/);
  await expect(page.locator(".home-hero__top")).toHaveClass(/is-revealed/);
  const story = page.locator(".home-work__image").first();
  await story.scrollIntoViewIfNeeded();
  await expect(story).toHaveClass(/is-revealed/);
  await expect(story.getByRole("img")).toBeVisible();
});

test("reduced motion keeps all new homepage content available", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: /Applied intelligence/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Make the important parts visible." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Start a conversation" }).first()).toBeVisible();
  const duration = await page.locator(".home-hero__image").evaluate((element) => getComputedStyle(element).animationDuration);
  expect(parseFloat(duration)).toBeLessThanOrEqual(0.001);
});

test("Work route and legacy systems index show the same editorial work page", async ({ page }, testInfo) => {
  await page.goto("/work", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Built around hard questions." })).toBeVisible();
  await expect(page.locator(".work-story")).toHaveCount(2);
  await page.goto("/systems", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Built around hard questions." })).toBeVisible();
  if (testInfo.project.name === "desktop") {
    await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "page");
  } else {
    const menu = page.locator("details.mobile-menu");
    await menu.locator("summary").click();
    await expect(menu.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/work");
  }
});
