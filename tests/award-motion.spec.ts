import { test, expect } from "@playwright/test";

test("home implements the approved cinematic gallery authority", async ({ page }, testInfo) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.locator(".approved-gallery-home")).toBeVisible();
  await expect(page.locator(".gallery-masthead")).toBeVisible();
  await expect(page.getByRole("heading", { name: "AIXION LAB°" })).toBeVisible();
  await expect(page.locator(".screen-slot")).toHaveCount(14);
  await expect(page.locator(".screen-card")).toHaveCount(14);
  await expect(page.getByText("HOME", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("ABOUT", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("SYSTEMS", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("RESEARCH", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("PULSE", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("JOURNEY", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("CAREER", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("TRADEBOT", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("CONTROL CORE", { exact: true }).first()).toBeVisible();

  const decorativeNumbers = page.locator(".chapter-number,.page-number,.tradebot-index,.journey-visual-stage b");
  await expect(decorativeNumbers).toHaveCount(0);

  const firstCard = page.locator(".screen-card").first();
  const box = await firstCard.boundingBox();
  expect(box).not.toBeNull();
  // The approved 1448×1086 reference renders each desktop device at roughly 400–450px tall.
  if (testInfo.project.name === "desktop") {
    expect(box?.height ?? 0).toBeGreaterThan(400);
    expect(box?.height ?? 9999).toBeLessThan(480);
  } else {
    expect(box?.height ?? 0).toBeGreaterThan(580);
  }

  if (testInfo.project.name === "mobile") {
    const first = await page.locator(".screen-slot").nth(0).boundingBox();
    const second = await page.locator(".screen-slot").nth(1).boundingBox();
    expect(first).not.toBeNull();
    expect(second).not.toBeNull();
    expect((second?.y ?? 0) > (first?.y ?? 0) + 100).toBe(true);
  }
});

test("approved gallery uses one coherent cinematic visual language", async ({ page }, testInfo) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const card = page.locator(".screen-card").first();
  const style = await card.evaluate(node => {
    const css = getComputedStyle(node);
    return { radius: parseFloat(css.borderRadius), border: css.borderColor, background: css.backgroundImage };
  });
  expect(style.radius).toBeGreaterThanOrEqual(24);
  expect(style.background).not.toBe("none");
  expect(style.border).not.toBe("rgba(0, 0, 0, 0)");

  const scenes = page.locator(".screen-scene");
  await expect(scenes).toHaveCount(14);
  for (let index = 0; index < 14; index++) {
    const sceneBox = await scenes.nth(index).boundingBox();
    if (testInfo.project.name === "desktop") {
      expect(sceneBox?.height ?? 0).toBeGreaterThan(190);
      expect(sceneBox?.height ?? 9999).toBeLessThan(230);
    } else {
      expect(sceneBox?.height ?? 0).toBeGreaterThan(280);
    }
  }
});

test("reduced motion preserves the complete approved gallery", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".screen-card")).toHaveCount(14);
  await expect(page.locator(".screen-card").first()).toBeVisible();
  const transition = await page.locator(".screen-card").first().evaluate(node => getComputedStyle(node).transitionDuration);
  expect(["0s", "0ms", "0s, 0s", "0ms, 0ms"].includes(transition)).toBe(true);
});

test("Journey remains an escalating engineering-question narrative", async ({ page }) => {
  await page.goto("/journey", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "The tools changed. The questions got stricter." })).toBeVisible();
  await expect(page.getByText(/Why did this fail/)).toBeVisible();
  await expect(page.getByText(/What state is the system actually in/)).toBeVisible();
  await expect(page.getByText(/Can intelligence operate while remaining observable, governed and accountable/)).toBeVisible();
  await expect(page.locator(".journey-question")).toHaveCount(7);
});

test("system section navigation still reaches architecture", async ({ page }) => {
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  const architectureLink = page.locator('.system-subnav a[href="#architecture"]');
  await expect(architectureLink).toBeVisible();
  await architectureLink.click();
  await expect(page.locator("#architecture")).toBeInViewport();
});
