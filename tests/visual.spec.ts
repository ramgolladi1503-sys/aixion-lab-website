import { test, expect } from "@playwright/test";
import path from "node:path";

const routes = [
  ["home", "/"], ["systems", "/systems"], ["tradebot", "/systems/tradebot"],
  ["control-core", "/systems/control-core"], ["automation", "/systems/automation"],
  ["analytics", "/systems/analytics"], ["research", "/research"], ["pulse", "/pulse"],
  ["journey", "/journey"], ["about", "/about"], ["resume", "/resume"], ["collaborate", "/collaborate"],
] as const;

for (const [name, route] of routes) {
  test(`${name} renders and captures`, async ({ page }, testInfo) => {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(hasHorizontalOverflow, `${route} must not overflow horizontally`).toBe(false);
    await expect(page.locator(".abstract-scene")).toHaveCount(0);
    await page.waitForTimeout(700);
    const destination = path.join("test-results", "screenshots", testInfo.project.name, `${name}.png`);
    await page.screenshot({ path: destination, fullPage: true });
  });
}

test("landing uses five cinematic portals with no decorative numbering", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const panels = page.locator(".destination-panel");
  await expect(panels).toHaveCount(5);
  for (let index = 0; index < 5; index += 1) await expect(panels.nth(index)).toBeVisible();
  const text = await page.locator(".landing").innerText();
  expect(text).not.toMatch(/CHAPTER\s*0?\d|AX\s*\/\s*0?\d/);
});

test("cinematic typography stays inside readability limits", async ({ page }, testInfo) => {
  for (const route of ["/", "/systems", "/about", "/research", "/collaborate"]) {
    await page.goto(route, { waitUntil: "networkidle" });
    const headings = page.locator("h1");
    const count = await headings.count();
    for (let i = 0; i < count; i += 1) {
      const size = await headings.nth(i).evaluate(node => parseFloat(getComputedStyle(node).fontSize));
      expect(size, `${route} h1 must remain readable`).toBeLessThanOrEqual(testInfo.project.name === "mobile" ? 52 : 84);
    }
    const paragraphs = page.locator("main p:visible");
    const paragraphCount = Math.min(await paragraphs.count(), 12);
    for (let i = 0; i < paragraphCount; i += 1) {
      const size = await paragraphs.nth(i).evaluate(node => parseFloat(getComputedStyle(node).fontSize));
      expect(size, `${route} visible paragraph should not become microcopy`).toBeGreaterThanOrEqual(14);
    }
  }
});

test("landing keeps intentional viewport padding", async ({ page }, testInfo) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const shell = page.locator(".landing .shell").first();
  const box = await shell.boundingBox();
  const viewport = page.viewportSize();
  expect(box).not.toBeNull();
  expect(viewport).not.toBeNull();
  const left = box?.x ?? 0;
  const right = (viewport?.width ?? 0) - ((box?.x ?? 0) + (box?.width ?? 0));
  const minimum = testInfo.project.name === "mobile" ? 20 : 24;
  expect(left).toBeGreaterThanOrEqual(minimum);
  expect(right).toBeGreaterThanOrEqual(minimum);
});

test("landing scenes share one navy-blue cinematic family", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".destination-scene")).toHaveCount(5);
  const background = await page.locator("body").evaluate(node => getComputedStyle(node).backgroundImage);
  expect(background).toMatch(/rgb\(63, 143, 217\)|linear-gradient|radial-gradient/i);
  const text = (await page.locator("body").innerText()).toLowerCase();
  expect(text).not.toContain("chapter");
});

test("flagship pages use distinct engineering visual grammars", async ({ page }) => {
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  await expect(page.locator(".visual-tradebot").first()).toBeVisible();
  await page.goto("/systems/control-core", { waitUntil: "networkidle" });
  await expect(page.locator(".visual-core").first()).toBeVisible();
});

test("system hero snapshot and subnavigation remain in the noir system", async ({ page }) => {
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  const snapshot = page.locator(".system-hero-summary");
  const subnav = page.locator(".system-subnav-wrap");
  await expect(snapshot).toBeVisible();
  await expect(subnav).toBeVisible();
  const snapshotBg = await snapshot.evaluate(node => getComputedStyle(node).backgroundColor);
  const subnavBg = await subnav.evaluate(node => getComputedStyle(node).backgroundColor);
  expect(snapshotBg).not.toBe("rgb(242, 244, 239)");
  expect(subnavBg).not.toBe("rgb(233, 237, 231)");
});

test("Career mode has one presentation state", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Toggle Lab and Career view" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-view", "career");
  const afterContent = await page.evaluate(() => getComputedStyle(document.body, "::after").content);
  expect(afterContent === "none" || afterContent === "normal" || afterContent === '""').toBe(true);
});

test("Research method remains compact", async ({ page }, testInfo) => {
  await page.goto("/research", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "How a claim earns authority." })).toBeVisible();
  await expect(page.locator(".research-method-flow .architecture-step")).toHaveCount(7);
  if (testInfo.project.name !== "mobile") {
    const method = await page.locator(".research-method-section").boundingBox();
    const footer = await page.locator("footer").boundingBox();
    expect(method).not.toBeNull();
    expect(footer).not.toBeNull();
    const gap = (footer?.y ?? 0) - ((method?.y ?? 0) + (method?.height ?? 0));
    expect(gap).toBeLessThan(160);
  }
});

test("Journey evolution labels remain horizontal", async ({ page }) => {
  await page.goto("/journey", { waitUntil: "networkidle" });
  const writingMode = await page.locator(".journey-visual-stage span").first().evaluate(node => getComputedStyle(node).writingMode);
  expect(writingMode).toBe("horizontal-tb");
});
