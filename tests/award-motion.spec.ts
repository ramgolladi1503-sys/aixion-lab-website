import { expect, test } from "@playwright/test";

test("the locked homepage retains its shuffling card experience and direct navigation", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("#shuffler_stage")).toBeAttached();
  expect(await page.locator("#shuffler_stage .card_item").count()).toBeGreaterThan(0);
  if ((page.viewportSize()?.width ?? 0) > 860) {
    await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link"))
      .toHaveText(["The Lab", "Work", "Research", "Approach"]);
  }
});

test("secondary pages keep the direct four-link navigation without lab or menu controls", async ({ page }) => {
  for (const route of ["/about", "/work", "/research", "/journey", "/resume"]) {
    await page.goto(route, { waitUntil: "networkidle" });
    const nav = page.getByRole("navigation", { name: "Primary navigation" });
    await expect(nav.getByRole("link")).toHaveText(["The Lab", "Work", "Research", "Approach"], { timeout: 3000 });
    await expect(nav).toBeVisible();
    await expect(page.locator(".mode-toggle, .header-menu-pill")).toHaveCount(0);
  }
});

test("the Approach discipline tabs support click and keyboard selection", async ({ page }) => {
  await page.goto("/journey", { waitUntil: "networkidle" });
  const tabs = page.getByRole("tablist", { name: "Engineering disciplines" });
  await expect(tabs.getByRole("tab")).toHaveCount(7);
  const first = tabs.getByRole("tab", { name: "Quality Engineering" });
  await expect(first).toHaveAttribute("aria-selected", "true");
  const automation = tabs.getByRole("tab", { name: "Automation" });
  await automation.click();
  await expect(automation).toHaveAttribute("aria-selected", "true");
  await automation.focus();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.getByRole("tab", { name: "Software Engineering" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel").locator("h3")).toHaveText("Software Engineering");
});

test("secondary page motion reveals content without replacing native scrolling", async ({ page }) => {
  await page.goto("/work", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveClass(/subpage-native-scroll/);
  await expect(page.locator("body")).toHaveClass(/subpage-motion-ready/);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.mouse.wheel(0, 650);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
});

test("retired duplicate systems route forwards to canonical selected work", async ({ page }) => {
  await page.goto("/systems", { waitUntil: "networkidle" });
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.getByRole("heading", { name: "Built around hard questions." })).toBeVisible();
});
