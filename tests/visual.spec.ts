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

test("desktop home hero begins near the sticky header", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Desktop density assertion");
  await page.goto("/", { waitUntil: "networkidle" });
  const copy = await page.locator(".hero-copy").boundingBox();
  expect(copy).not.toBeNull();
  expect(copy?.y ?? 99999).toBeLessThan(180);
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
  await expect(page.locator(".visual-tradebot").first()).toBeVisible();
  await page.goto("/systems/control-core", { waitUntil: "networkidle" });
  await expect(page.locator(".visual-core").first()).toBeVisible();
});

test("Career mode has one visible state indicator", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Toggle Lab and Career view" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-view", "career");
  const afterContent = await page.evaluate(() => getComputedStyle(document.body, "::after").content);
  expect(afterContent === "none" || afterContent === "normal" || afterContent === '""').toBe(true);
});

test("Research method is compact and does not repeat the lifecycle as a giant title", async ({ page }, testInfo) => {
  await page.goto("/research", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "How a claim earns authority." })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Question.*Observation.*Hypothesis.*Freeze.*Test.*Validation.*Decision/ })).toHaveCount(0);
  await expect(page.locator(".research-method-flow .architecture-step")).toHaveCount(7);

  if (testInfo.project.name !== "mobile") {
    const method = await page.locator(".research-method-section").boundingBox();
    const footer = await page.locator("footer").boundingBox();
    expect(method).not.toBeNull();
    expect(footer).not.toBeNull();
    const gap = (footer?.y ?? 0) - ((method?.y ?? 0) + (method?.height ?? 0));
    expect(gap).toBeLessThan(120);
  }
});

test("Systems registry reaches the first system quickly on desktop", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Desktop density assertion");
  await page.goto("/systems", { waitUntil: "networkidle" });
  const firstRow = await page.locator(".registry-row").first().boundingBox();
  expect(firstRow).not.toBeNull();
  expect(firstRow?.y ?? 99999).toBeLessThan(900);
});

test("Journey evolution labels remain readable rather than vertical", async ({ page }) => {
  await page.goto("/journey", { waitUntil: "networkidle" });
  const writingMode = await page.locator(".journey-visual-stage span").first().evaluate(node => getComputedStyle(node).writingMode);
  expect(writingMode).toBe("horizontal-tb");
});
