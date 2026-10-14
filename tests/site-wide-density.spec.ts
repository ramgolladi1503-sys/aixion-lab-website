import { test, expect } from "@playwright/test";

const publicRoutes = [
  "/",
  "/about",
  "/work",
  "/research",
  "/research/opening-session-market-structure",
  "/research/rec-md-structural-interaction",
  "/research/mean-reversion-candidate",
  "/research/evidence-bound-autonomy",
  "/journey",
  "/collaborate",
  "/pulse",
  "/resume",
  "/systems",
  "/systems/tradebot",
  "/systems/control-core",
  "/systems/automation",
  "/systems/analytics",
  "/page-that-does-not-exist",
];

test("all public routes keep body copy readable and avoid excessive section padding", async ({ page }) => {
  for (const route of publicRoutes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), `${route} should resolve`).toBe(route === "/page-that-does-not-exist" ? 404 : 200);

    const layout = await page.evaluate(() => {
      const readingCopy = [...document.querySelectorAll("main p:not(.eyebrow), main li, main dd, .site-footer p:not(.eyebrow)")]
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
        })
        .map((element) => ({ text: (element.textContent ?? "").trim().slice(0, 80), size: parseFloat(getComputedStyle(element).fontSize) }));
      const sections = [...document.querySelectorAll("main > section, main > article")]
        .filter((element) => !element.classList.contains("editorial-hero") && !element.classList.contains("home-hero"))
        .map((element) => ({
          name: element.id || element.classList.item(0) || element.tagName.toLowerCase(),
          paddingTop: parseFloat(getComputedStyle(element).paddingTop),
          paddingBottom: parseFloat(getComputedStyle(element).paddingBottom),
        }));

      return {
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
        readingCopy,
        sections,
      };
    });

    expect(layout.documentWidth, `${route} should not overflow horizontally`).toBeLessThanOrEqual(layout.viewportWidth + 1);
    for (const copy of layout.readingCopy) {
      expect(copy.size, `${route} reading copy should be at least 16px: ${copy.text}`).toBeGreaterThanOrEqual(16);
    }
    for (const section of layout.sections) {
      expect(section.paddingTop, `${route} ${section.name} top padding`).toBeLessThanOrEqual(90);
      expect(section.paddingBottom, `${route} ${section.name} bottom padding`).toBeLessThanOrEqual(90);
    }
  }
});
