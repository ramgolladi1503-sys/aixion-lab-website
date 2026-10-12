import { expect, test } from "@playwright/test";

test("motion lab serves semantic content and an immediate static illustration", async ({ page }) => {
  const response = await page.goto("/motion-lab", { waitUntil: "networkidle" });
  expect(response?.status()).toBeLessThan(400);
  await expect(page.getByRole("heading", { name: "The shape of a system." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "A system is more than its parts." })).toBeAttached();
  await expect(page.getByRole("heading", { name: "Intelligence, made accountable." })).toBeAttached();
  await expect(page.getByRole("link", { name: "Explore the system" })).toHaveAttribute("href", "#engineering");
  await expect(page.getByTestId("motion-lab-poster")).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("keyboard controls adjust and recenter the sculpture view", async ({ page }) => {
  await page.goto("/motion-lab", { waitUntil: "networkidle" });
  const stage = page.getByTestId("motion-lab-stage");
  await page.getByRole("button", { name: "Turn sculpture right" }).click();
  await expect(stage).toHaveAttribute("data-view-adjusted", "true");
  await page.getByRole("button", { name: "Recenter" }).click();
  await expect(stage).toHaveAttribute("data-view-adjusted", "false");
  await page.getByRole("button", { name: "Pause drift" }).click();
  await expect(page.getByRole("button", { name: "Resume drift" })).toHaveAttribute("aria-pressed", "true");
});

test("pointer input is bounded to the scene and touch uses the visible controls", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/motion-lab", { waitUntil: "networkidle" });
  const stage = page.getByTestId("motion-lab-stage");
  const bounds = await stage.boundingBox();
  if (!bounds) throw new Error("Motion-lab stage was not laid out");
  await page.mouse.move(bounds.x + bounds.width * 0.72, bounds.y + bounds.height * 0.42);
  await expect(stage).toHaveAttribute("data-pointer-active", "true");
  await page.mouse.move(5, 5);
  await expect(stage).toHaveAttribute("data-pointer-active", "false");
});

test("mobile view controls do not cover the headline or its link", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/motion-lab", { waitUntil: "networkidle" });
  const link = await page.getByRole("link", { name: "Explore the system" }).boundingBox();
  const controls = await page.locator("#motion-lab-controls").boundingBox();
  expect(link, "Explore link should have a mobile layout box").not.toBeNull();
  expect(controls, "View controls should have a mobile layout box").not.toBeNull();
  expect(controls!.y).toBeGreaterThanOrEqual(link!.y + link!.height + 8);
});

test("narrow mobile controls and status stay inside the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 319, height: 664 });
  await page.goto("/motion-lab", { waitUntil: "networkidle" });
  const stage = await page.getByTestId("motion-lab-stage").boundingBox();
  const controls = await page.locator("#motion-lab-controls").boundingBox();
  const status = await page.getByRole("status").boundingBox();
  const kicker = await page.getByTestId("motion-lab-kicker").boundingBox();
  const exploreLink = await page.getByRole("link", { name: "Explore the system" }).boundingBox();
  expect(stage).not.toBeNull();
  expect(controls).not.toBeNull();
  expect(status).not.toBeNull();
  expect(kicker).not.toBeNull();
  expect(exploreLink).not.toBeNull();
  expect(await page.locator("[aria-hidden='true']").filter({ hasText: "01 / ARRIVAL" }).isVisible()).toBe(false);
  expect(status!.y + status!.height).toBeLessThanOrEqual(660);
  expect(controls!.y + controls!.height).toBeLessThanOrEqual(660);
  expect(controls!.y).toBeGreaterThanOrEqual(exploreLink!.y + exploreLink!.height + 8);
  const buttonFontSize = await page.getByRole("button", { name: "Recenter" }).evaluate((element) => getComputedStyle(element).fontSize);
  expect(buttonFontSize).toBe("12px");
  const statusFontSize = await page.getByRole("status").evaluate((element) => getComputedStyle(element).fontSize);
  expect(statusFontSize).toBe("12px");
  const kickerFontSize = await page.getByTestId("motion-lab-kicker").evaluate((element) => getComputedStyle(element).fontSize);
  expect(kickerFontSize).toBe("11px");
  expect(kicker!.height).toBeLessThanOrEqual(16);
});

test("short desktop viewport keeps the entire hero and controls in view", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/motion-lab", { waitUntil: "networkidle" });
  const stage = await page.getByTestId("motion-lab-stage").boundingBox();
  const controls = await page.locator("#motion-lab-controls").boundingBox();
  expect(stage).not.toBeNull();
  expect(controls).not.toBeNull();
  expect(stage!.height).toBeLessThanOrEqual(720);
  expect(controls!.y + controls!.height).toBeLessThanOrEqual(720);
});

test("reduced motion uses the static poster without creating a WebGL canvas", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/motion-lab", { waitUntil: "networkidle" });
  await expect(page.getByTestId("motion-lab-stage")).toHaveAttribute("data-scene-status", "static");
  await expect(page.getByTestId("motion-lab-poster")).toBeVisible();
  await expect(page.getByTestId("motion-lab-canvas")).toHaveCount(0);
  await expect(page.getByText("Static scene selected because reduced motion is enabled.")).toBeVisible();
});

test("missing WebGL keeps the poster and retry control available", async ({ page }) => {
  await page.addInitScript(() => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    const disabledGetContext = function (this: HTMLCanvasElement, contextId: string, ...args: unknown[]): RenderingContext | null {
      if (contextId === "webgl" || contextId === "webgl2" || contextId === "experimental-webgl") return null;
      return Reflect.apply(originalGetContext, this, [contextId, ...args]) as RenderingContext | null;
    };
    HTMLCanvasElement.prototype.getContext = disabledGetContext as typeof HTMLCanvasElement.prototype.getContext;
  });
  await page.goto("/motion-lab", { waitUntil: "networkidle" });
  await expect(page.getByTestId("motion-lab-stage")).toHaveAttribute("data-scene-status", "static");
  await expect(page.getByTestId("motion-lab-poster")).toBeVisible();
  await expect(page.getByRole("button", { name: "Retry 3D scene" })).toBeVisible();
});

test("a lost WebGL context falls back without removing the story or links", async ({ page }) => {
  await page.goto("/motion-lab", { waitUntil: "networkidle" });
  const stage = page.getByTestId("motion-lab-stage");
  const canvas = page.locator("canvas");
  test.skip(await canvas.count() === 0, "This Playwright browser did not create a WebGL canvas");
  await expect(stage).toHaveAttribute("data-scene-status", "ready");
  const canceled = await canvas.evaluate((element) => {
    const event = new Event("webglcontextlost", { cancelable: true });
    element.dispatchEvent(event);
    return event.defaultPrevented;
  });
  expect(canceled).toBe(true);
  await expect(stage).toHaveAttribute("data-scene-status", "static");
  await expect(page.getByRole("heading", { name: "The shape of a system." })).toBeAttached();
  await expect(page.getByRole("link", { name: "Analytics" })).toHaveAttribute("href", "/systems/analytics");
});

test("native scrolling advances the shared scene and reverses cleanly", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/motion-lab", { waitUntil: "networkidle" });
  const stage = page.getByTestId("motion-lab-stage");
  await expect(stage).toHaveAttribute("data-scene-phase", "arrival");
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight, behavior: "instant" }));
  await expect(stage).toHaveAttribute("data-scene-phase", "engineering");
  await expect(stage).toHaveAttribute("data-progress", /0\.[3-7]\d\d/);
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await expect(stage).toHaveAttribute("data-scene-phase", "applied-systems");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(stage).toHaveAttribute("data-scene-phase", "arrival");
});

test("applied systems exposes four working site destinations", async ({ page }) => {
  await page.goto("/motion-lab", { waitUntil: "networkidle" });
  await expect(page.getByRole("link", { name: "Systems" }).last()).toHaveAttribute("href", "/systems");
  await expect(page.getByRole("link", { name: "Research" }).last()).toHaveAttribute("href", "/research");
  await expect(page.getByRole("link", { name: "Automation" })).toHaveAttribute("href", "/systems/automation");
  await expect(page.getByRole("link", { name: "Analytics" })).toHaveAttribute("href", "/systems/analytics");
});

test("mobile touch follows the native chapter anchor", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Touch navigation is checked in the mobile project");
  await page.goto("/motion-lab", { waitUntil: "networkidle" });
  const link = await page.getByRole("link", { name: "Explore the system" }).boundingBox();
  expect(link).not.toBeNull();
  await page.touchscreen.tap(link!.x + link!.width / 2, link!.y + link!.height / 2);
  await expect(page).toHaveURL(/#engineering$/);
  await expect(page.getByTestId("motion-lab-stage")).toHaveAttribute("data-scene-phase", "engineering");
});
