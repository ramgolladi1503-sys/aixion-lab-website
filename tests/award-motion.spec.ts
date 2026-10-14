import { test, expect } from "@playwright/test";

test("home follows the new editorial sequence and exposes project stories", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: /Applied intelligence/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Make everyday operations easier to run." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "When the inputs move, the evidence has to keep up." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Useful automation needs a clear boundary around action." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Some of the most useful results are the ones that stop a claim." })).toBeVisible();
  await expect(page.locator(".home-person")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: /Built by Ram, across quality engineering/ })).toHaveCount(0);
  await expect(page.locator(".story-grid, .pulse-home-card, .system-register")).toHaveCount(0);
  await expect(page.getByText("REJECTED", { exact: true })).toBeVisible();
});

test("cinematic chapter controls use the four approved editorial destinations", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const tabs = page.getByRole("tablist", { name: "Explore Aixion Lab" });
  await expect(tabs.getByRole("tab")).toHaveCount(4);
  await expect(tabs.getByRole("tab")).toHaveText(["01Business", "02Systems", "03Research", "04Automation"]);
  await expect(page.getByRole("tabpanel")).toContainText("Your business has a problem. We engineer the solution.");
  await expect(page.getByRole("tabpanel").getByRole("link", { name: "Discuss a workflow" })).toHaveAttribute("href", "/about#contact");
  await tabs.getByRole("tab", { name: /Systems/ }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Build a clearer view of a changing market.");
  await expect(page.getByRole("tabpanel").getByRole("link", { name: "Explore TradeBot" })).toHaveAttribute("href", "/systems/tradebot");
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

test("system section navigation follows the section in view", async ({ page }) => {
  await page.goto("/systems/automation", { waitUntil: "networkidle" });
  const nav = page.getByRole("navigation", { name: "Automation Systems page sections" });
  await expect(nav.getByRole("link", { name: "Overview" })).toHaveAttribute("aria-current", "location");
  const engineering = nav.getByRole("link", { name: "Engineering" });
  await engineering.click();
  await expect(engineering).toHaveAttribute("aria-current", "location");

  const evidence = nav.getByRole("link", { name: "Evidence" });
  await page.locator("#evidence").evaluate(element => element.scrollIntoView({ block: "start", behavior: "instant" }));
  await expect(evidence).toHaveAttribute("aria-current", "location");
  await expect(engineering).not.toHaveAttribute("aria-current", "location");
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

test("the header menu opens as a four-destination panel and closes accessibly", async ({ page }) => {
  await page.goto("/about", { waitUntil: "networkidle" });
  const trigger = page.getByRole("button", { name: "Menu" });
  await trigger.click();
  const menu = page.getByRole("navigation", { name: "Explore Aixion Lab" });
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("link")).toHaveCount(4);
  await expect(menu.getByRole("link")).toHaveText([
    /The Lab/,
    /Selected Work/,
    /Research/,
    /Approach/,
  ]);
  await expect(page.getByRole("button", { name: "Close" })).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
});

test("journey progression is horizontal and its stages are keyboard navigable", async ({ page }) => {
  await page.goto("/journey", { waitUntil: "networkidle" });
  await expect(page.getByText("Select a stage to follow the progression", { exact: false })).toHaveCount(0);
  const tabs = page.getByRole("tablist", { name: "Engineering disciplines" });
  await expect(tabs.getByRole("tab")).toHaveCount(7);
  const first = tabs.getByRole("tab", { name: /Quality Engineering/ });
  await expect(first).toHaveAttribute("aria-selected", "true");
  await first.focus();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.getByRole("tab", { name: /Automation/ })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Can this failure be prevented consistently");
});

test("Work route and legacy systems index show the same editorial work page", async ({ page }, testInfo) => {
  await page.goto("/work", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Built around hard questions." })).toBeVisible();
  await expect(page.locator(".editorial-hero__image")).toHaveCount(1);
  await expect(page.locator(".editorial-hero")).toContainText("Built around hard questions.");
  await expect(page.locator(".work-end")).toContainText("THE COMMON THREAD");
  await expect(page.locator(".work-end").getByRole("heading", { name: "A system earns confidence through what it can show." })).toBeVisible();
  await expect(page.locator(".work-story")).toHaveCount(2);
  await page.goto("/systems", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Built around hard questions." })).toBeVisible();
  if (testInfo.project.name === "desktop") {
    await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Work" })).toHaveAttribute("aria-current", "page");
  } else {
    await page.getByRole("button", { name: "Menu" }).click();
    const menu = page.getByRole("navigation", { name: "Explore Aixion Lab" });
    await expect(menu.getByRole("link", { name: /Selected Work/ })).toHaveAttribute("href", "/work");
  }
});
