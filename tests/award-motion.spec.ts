import { test, expect } from "@playwright/test";

test("home has a memorable thesis and interactive system field", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Systems should be able to explain their state." })).toBeVisible();
  await expect(page.locator("[data-aixion-signal] .signal-stage")).toHaveCount(6);

  const field = page.getByRole("navigation", { name: "Aixion system field" });
  await expect(field).toBeVisible();
  await expect(field.getByRole("link")).toHaveCount(4);
  await expect(field.getByRole("link", { name: /TradeBot/ })).toHaveAttribute("href", "/systems/tradebot");
  await expect(field.getByRole("link", { name: /Control Core/ })).toHaveAttribute("href", "/systems/control-core");

  await field.getByRole("link", { name: /TradeBot/ }).hover();
  const selectedOpacity = await page.locator(".field-path-tradebot").evaluate(node => Number.parseFloat(getComputedStyle(node).opacity));
  const otherOpacity = await page.locator(".field-path-core").evaluate(node => Number.parseFloat(getComputedStyle(node).opacity));
  expect(selectedOpacity).toBeGreaterThan(otherOpacity);
});

test("motion has a real animation grammar", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveClass(/motion-ready/);
  const signalAnimation = await page.locator(".signal-node").first().evaluate(node => getComputedStyle(node).animationName);
  expect(signalAnimation).toContain("signal-arrive");

  await page.locator(".visual-tradebot").scrollIntoViewIfNeeded();
  await expect(page.locator(".visual-tradebot")).toHaveClass(/is-revealed/);
  const stageAnimation = await page.locator(".visual-tradebot .tradebot-stage").first().evaluate(node => getComputedStyle(node).animationName);
  expect(stageAnimation).toContain("architecture-step");
});

test("reduced-motion collapses the award layer safely", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveClass(/motion-reduced/);
  const durationMs = await page.locator(".signal-node").first().evaluate(node => {
    const value = getComputedStyle(node).animationDuration.trim();
    const amount = Number.parseFloat(value);
    return value.endsWith("ms") ? amount : amount * 1000;
  });
  expect(durationMs).toBeLessThanOrEqual(0.02);
  const visualTransform = await page.locator(".lab-field-visual").evaluate(node => getComputedStyle(node).transform);
  expect(visualTransform).toBe("none");
});

test("Journey is an escalating engineering-question narrative", async ({ page }) => {
  await page.goto("/journey", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "The tools changed. The questions got stricter." })).toBeVisible();
  await expect(page.getByText(/Why did this fail/)).toBeVisible();
  await expect(page.getByText(/What state is the system actually in/)).toBeVisible();
  await expect(page.getByText(/Can intelligence operate while remaining observable, governed and accountable/)).toBeVisible();
  await expect(page.locator(".journey-question")).toHaveCount(7);
});

test("command palette carries state, not just destinations", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "The command palette is intentionally a desktop keyboard surface; mobile uses the menu.");
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open Aixion command palette" }).click();
  await expect(page.getByRole("dialog", { name: "Search Aixion" })).toBeVisible();
  await expect(page.locator('.command-results a[href="/systems/tradebot"] .command-meta')).toContainText("VALIDATING");
  await expect(page.locator('.command-results a[href="/journey"] .command-meta')).toContainText("7 QUESTIONS");
});

test("system subnavigation reflects deliberate section navigation", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Sticky section authority is a desktop interaction");
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  const architectureLink = page.locator('.system-subnav a[href="#architecture"]');
  await architectureLink.click();
  await expect(architectureLink).toHaveClass(/is-active/);
  await expect(architectureLink).toHaveAttribute("aria-current", "location");
});
