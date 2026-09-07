import { test, expect } from "@playwright/test";

test("primary navigation exposes the new Aixion route model", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Primary navigation is replaced by the mobile menu on narrow screens");
  await page.goto("/systems", { waitUntil: "networkidle" });
  const navigation = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(navigation.getByRole("link", { name: "Systems" })).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Research" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Contact ↗" })).toBeVisible();
});

test("detail pages expose contextual navigation and close the menu after selection", async ({ page }, testInfo) => {
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  await expect(page.getByRole("navigation", { name: "Context navigation" })).toBeVisible();
  test.skip(testInfo.project.name !== "desktop", "Desktop submenu close assertion");
  const systemsMenu = page.locator('summary[aria-label="Open Systems subnavigation"]');
  await systemsMenu.click();
  await expect(systemsMenu.locator("xpath=..").locator(".fresh-subnav")).toBeVisible();
  await page.getByRole("link", { name: "Control Core" }).click();
  await expect(page).toHaveURL(/\/systems\/control-core$/);
  await expect(page.locator(".fresh-nav-group details[open]")).toHaveCount(0);
});

test("home CTA enters the Systems Registry", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: /Explore systems/ }).click();
  await expect(page).toHaveURL(/\/systems$/);
});

test("hero carousel exposes slide controls and changes state", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const carousel = page.locator(".hero-carousel");
  await expect(carousel).toHaveAttribute("data-slide-state", "ready");
  await expect(carousel).toHaveAttribute("data-content-state", "content-ready");
  await expect(carousel).toHaveAttribute("data-content-source", "local");
  await expect(carousel.getByRole("tab", { name: "Go to slide 1" })).toHaveAttribute("aria-selected", "true");
  await carousel.hover();
  await expect(carousel).toHaveClass(/is-paused/);
  await page.mouse.move(0, 0);
  await expect(carousel).not.toHaveClass(/is-paused/);
  await carousel.getByRole("button", { name: "Next slide" }).click();
  await expect(carousel.getByRole("tab", { name: "Go to slide 2" })).toHaveAttribute("aria-selected", "true");
  await expect(carousel.getByRole("heading", { level: 1 })).toContainText("signal");
  await carousel.getByRole("button", { name: "Previous slide" }).click();
  await expect(carousel.getByRole("tab", { name: "Go to slide 1" })).toHaveAttribute("aria-selected", "true");
});

test("scroll-to-top appears after scrolling and returns to the top", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const top = page.getByRole("button", { name: "Scroll to top" });
  await expect(top).toHaveClass(/is-visible/);
  await expect(top).toContainText("Back to top");
  await top.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(20);
});

test("route continuity survives client navigation, back/forward, reload and focus", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const systems = page.getByRole("link", { name: "Systems" }).first();
  await systems.focus();
  await expect(systems).toBeFocused();
  await systems.click();
  await expect(page).toHaveURL(/\/systems$/);
  await expect(page.locator(".route-motion")).toHaveCount(1);
  await expect(page.locator(".route-motion")).toHaveAttribute("data-route-state", "entering");
  await page.goBack({ waitUntil: "networkidle" });
  await expect(page).toHaveURL(/\/$/);
  await page.goForward({ waitUntil: "networkidle" });
  await expect(page).toHaveURL(/\/systems$/);
  await page.reload({ waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("hover and selection use the fresh interaction tokens", async ({ page }, testInfo) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const cta = page.getByRole("link", { name: /Explore systems/ });
  if (testInfo.project.name === "desktop") {
    await cta.hover();
    const transform = await cta.evaluate(node => getComputedStyle(node).transform);
    expect(transform).not.toBe("none");
  }
  const heading = page.locator(".hero-carousel h1");
  if (testInfo.project.name === "desktop") {
    await page.waitForTimeout(900);
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
    await heading.selectText();
  } else {
    await heading.evaluate(node => {
      const range = document.createRange();
      range.selectNodeContents(node);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    });
  }
  const selection = await page.evaluate(() => window.getSelection()?.toString() ?? "");
  expect(selection.length).toBeGreaterThan(10);
});

test("Evidence Drawer is proof-first and closes", async ({ page }) => {
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /View record/ }).first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("RESULT / STATE")).toBeVisible();
  await expect(dialog.getByText("PUBLIC PROOF")).toBeVisible();
  await expect(dialog.getByText("Public boundary")).toBeVisible();
  const close = dialog.getByRole("button", { name: "Close evidence" });
  const box = await close.boundingBox();
  expect(box?.width ?? 0).toBeGreaterThanOrEqual(40);
  expect(box?.height ?? 0).toBeGreaterThanOrEqual(40);
  await close.click();
  await expect(dialog).toBeHidden();
});

test("research note links resolve to detail pages", async ({ page }) => {
  await page.goto("/research", { waitUntil: "networkidle" });
  const firstNote = page.locator(".research-list a[href^='/research/']").first();
  await firstNote.scrollIntoViewIfNeeded();
  await expect(firstNote).toBeVisible();
  await firstNote.click();
  await expect(page).toHaveURL(/\/research\/.+$/);
});

test("cards navigate only when a detail route exists", async ({ page }) => {
  await page.goto("/research", { waitUntil: "networkidle" });
  await expect(page.locator(".research-index-card-deck .flip-card-front").first()).toHaveAttribute("href", /\/research\/.+/);
  await expect(page.locator(".research-index-card-deck .flip-card-back").first()).toHaveAttribute("href", /\/research\/.+/);
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  await expect(page.locator(".system-engineering-deck .flip-card-front").first()).not.toHaveAttribute("href");
  await expect(page.locator(".system-engineering-deck .flip-card-front")).toHaveCount(3);
  await expect(page.locator(".system-engineering-deck a.flip-card-front")).toHaveCount(0);
});

test("Mobile navigation exposes locked routes with usable targets", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile navigation test runs only in mobile project");
  await page.goto("/", { waitUntil: "networkidle" });
  const menu = page.locator(".mobile-menu summary");
  const menuBox = await menu.boundingBox();
  expect(menuBox?.height ?? 0).toBeGreaterThanOrEqual(40);
  await menu.click();
  const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(navigation).toBeVisible();
  const systems = navigation.getByRole("link", { name: "Systems" });
  await expect(systems).toBeVisible();
  const linkBox = await systems.boundingBox();
  expect(linkBox?.height ?? 0).toBeGreaterThanOrEqual(40);
});

test("reduced motion keeps the fresh shell immediately settled", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  const motion = await page.locator(".hero-copy h1").evaluate((node) => {
    const style = getComputedStyle(node);
    return { duration: style.animationDuration, transform: style.transform };
  });
  expect(parseFloat(motion.duration)).toBeLessThan(0.01);
  expect(["none", "matrix(1, 0, 0, 1, 0, 0)"]).toContain(motion.transform);
});
