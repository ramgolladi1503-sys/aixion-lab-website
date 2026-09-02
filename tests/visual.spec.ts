import { test, expect } from "@playwright/test";
import path from "node:path";

const routes = [["home", "/"], ["systems", "/systems"], ["tradebot", "/systems/tradebot"], ["control-core", "/systems/control-core"], ["automation", "/systems/automation"], ["analytics", "/systems/analytics"], ["research", "/research"], ["pulse", "/pulse"], ["journey", "/journey"], ["about", "/about"], ["resume", "/resume"], ["collaborate", "/collaborate"]] as const;

for (const [name, route] of routes) {
  test(`${name} renders, remains readable and captures`, async ({ page }, testInfo) => {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator("body")).toBeVisible();
    if (route === "/") {
      await expect(page.locator(".gallery-masthead")).toBeVisible();
      await expect(page.locator(".gallery-footer")).toBeVisible();
    } else {
      await expect(page.locator(".site-header")).toBeVisible();
      await expect(page.locator("footer.site-footer")).toBeVisible();
    }
    const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(hasHorizontalOverflow, `${route} must not overflow horizontally`).toBe(false);
    await expect(page.locator(".abstract-scene")).toHaveCount(0);

    const bodyFont = await page.locator("body").evaluate(node => parseFloat(getComputedStyle(node).fontSize));
    expect(bodyFont).toBeGreaterThanOrEqual(14);
    const h1 = page.locator("h1").first();
    if (await h1.count()) {
      const h1Size = await h1.evaluate(node => parseFloat(getComputedStyle(node).fontSize));
      expect(h1Size).toBeLessThanOrEqual(testInfo.project.name === "mobile" ? 52 : 84);
    }

    const destination = path.join("test-results", "screenshots", testInfo.project.name, `${name}.png`);
    await page.screenshot({ path: destination, fullPage: true });
  });
}

test("desktop Home matches the approved seven-column device-wall composition", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Desktop composition assertion");
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.goto("/", { waitUntil: "networkidle" });
  const cards = page.locator(".screen-card");
  await expect(cards).toHaveCount(14);
  const firstRow = await Promise.all(Array.from({ length: 7 }, (_, index) => cards.nth(index).boundingBox()));
  const secondRow = await Promise.all(Array.from({ length: 7 }, (_, index) => cards.nth(index + 7).boundingBox()));
  expect(firstRow.every(Boolean)).toBe(true);
  expect(secondRow.every(Boolean)).toBe(true);
  const ySpread = Math.max(...firstRow.map(box => box!.y)) - Math.min(...firstRow.map(box => box!.y));
  expect(ySpread).toBeLessThan(4);
  expect(secondRow[0]!.y).toBeGreaterThan(firstRow[0]!.y + firstRow[0]!.height);
});

test("mobile Home stacks full-width cinematic device cards", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile composition assertion");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  const first = await page.locator(".screen-card").nth(0).boundingBox();
  const second = await page.locator(".screen-card").nth(1).boundingBox();
  expect(first).not.toBeNull();
  expect(second).not.toBeNull();
  expect(first?.width ?? 0).toBeGreaterThan(330);
  expect(second!.y).toBeGreaterThan(first!.y + first!.height);
});

test("Home uses consistent bronze frames and luminous blue image fields", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const cards = page.locator(".screen-card");
  const scenes = page.locator(".screen-scene");
  await expect(cards).toHaveCount(14);
  await expect(scenes).toHaveCount(14);
  for (const index of [0, 2, 3, 9, 10, 11, 12]) {
    const cardStyle = await cards.nth(index).evaluate(node => getComputedStyle(node));
    expect(parseFloat(cardStyle.borderRadius)).toBeGreaterThanOrEqual(24);
    expect(cardStyle.borderColor).not.toBe("rgba(0, 0, 0, 0)");
    const sceneStyle = await scenes.nth(index).evaluate(node => getComputedStyle(node));
    expect(sceneStyle.backgroundImage).not.toBe("none");
  }
});

test("inner pages use one compact framed cinematic shell", async ({ page }, testInfo) => {
  await page.goto("/about", { waitUntil: "networkidle" });
  const main = await page.locator("main").boundingBox();
  const header = await page.locator(".site-header").boundingBox();
  expect(main).not.toBeNull();
  expect(header).not.toBeNull();
  if (testInfo.project.name !== "mobile") {
    expect(main?.width ?? 9999).toBeLessThanOrEqual(900);
    expect(header?.width ?? 9999).toBeLessThanOrEqual(900);
  }
  const hero = await page.locator(".page-hero").first().boundingBox();
  expect(hero?.height ?? 0).toBeGreaterThan(500);
});

test("flagship architecture visuals remain distinct and readable", async ({ page }) => {
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  await expect(page.locator(".visual-tradebot").first()).toBeVisible();
  await page.goto("/systems/control-core", { waitUntil: "networkidle" });
  await expect(page.locator(".visual-core").first()).toBeVisible();
});

test("Research method remains compact rather than becoming a giant title", async ({ page }) => {
  await page.goto("/research", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "How a claim earns authority." })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Question.*Observation.*Hypothesis.*Freeze.*Test.*Validation.*Decision/ })).toHaveCount(0);
  await expect(page.locator(".research-method-flow .architecture-step")).toHaveCount(7);
});

test("Journey evolution labels remain horizontal and readable", async ({ page }) => {
  await page.goto("/journey", { waitUntil: "networkidle" });
  const label = page.locator(".journey-visual-stage span").first();
  if (await label.count()) {
    const writingMode = await label.evaluate(node => getComputedStyle(node).writingMode);
    expect(writingMode).toBe("horizontal-tb");
  }
});
