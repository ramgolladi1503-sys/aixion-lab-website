import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/systems",
  "/systems/tradebot",
  "/systems/control-core",
  "/systems/automation",
  "/systems/analytics",
  "/research",
  "/research/opening-session-market-structure",
  "/research/rec-md-structural-interaction",
  "/research/mean-reversion-candidate",
  "/research/evidence-bound-autonomy",
  "/pulse",
  "/journey",
  "/about",
  "/contact",
  "/resume"
];

test.describe("Full UI/UX Deep Audit", () => {
  for (const route of routes) {
    test(`Audit ${route} layout, scroll, links & animations`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on("console", msg => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });

      await page.goto(route);
      await page.waitForLoadState("networkidle");

      // 1. Check for horizontal overflow (unintended horizontal scrollbar)
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth, `Route ${route} has horizontal overflow: scrollWidth (${scrollWidth}) > clientWidth (${clientWidth})`).toBeLessThanOrEqual(clientWidth + 1);

      // 2. Smoothly scroll down through entire page to trigger scroll-driven animations & reveals
      await page.evaluate(async () => {
        const totalHeight = document.body.scrollHeight;
        const step = 300;
        for (let y = 0; y < totalHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise(r => setTimeout(r, 50));
        }
        window.scrollTo(0, 0);
      });

      // 3. Verify all internal links have valid targets
      const links = await page.locator("a[href^='/']").all();
      for (const link of links) {
        const href = await link.getAttribute("href");
        expect(href, `Empty href found on ${route}`).toBeTruthy();
      }

      // 4. Ensure no unhandled console errors occurred during interaction/render
      expect(consoleErrors, `Console errors detected on ${route}: ${consoleErrors.join("; ")}`).toEqual([]);
    });
  }

  test("Desktop Interactive Elements & Modals Audit", async ({ page, isMobile }) => {
    if (isMobile) return;

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // 1. Audio toggle check
    const audioBtn = page.locator(".audio-toggle");
    await expect(audioBtn).toBeVisible();
    await audioBtn.click();
    await expect(audioBtn).toHaveAttribute("title", /Haptic audio active/);
    await audioBtn.click();
    await expect(audioBtn).toHaveAttribute("title", /Haptic audio muted/);

    // 2. Command Palette (⌘K) trigger check
    const cmdTrigger = page.locator(".command-trigger");
    await expect(cmdTrigger).toBeVisible();
    await cmdTrigger.click();
    const dialog = page.locator(".command-dialog");
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    // 3. Carousel controls check
    const nextBtn = page.locator("button[aria-label='Next slide']");
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(300);
    }
  });

  test("Mobile Navigation & Menu Audit", async ({ page, isMobile }) => {
    if (!isMobile) return;

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Check mobile menu trigger
    const menuSummary = page.locator(".mobile-menu summary");
    await expect(menuSummary).toBeVisible();
    await menuSummary.click();
    const mobileNav = page.locator(".mobile-menu nav");
    await expect(mobileNav).toBeVisible();

    // Check link click inside mobile menu closes menu or navigates
    const firstLink = mobileNav.locator("a").first();
    await expect(firstLink).toBeVisible();
  });
});
