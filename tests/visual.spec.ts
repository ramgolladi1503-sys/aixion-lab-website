import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync } from "node:fs";
const routes = [
  "/",
  "/work",
  "/work/tradebot",
  "/work/control-tower",
  "/research",
  "/journey",
  "/about",
  "/contact",
  "/resume",
];
for (const width of [390, 430, 768, 1280, 1440])
  for (const route of routes) {
    test(`${route} at ${width}: render, semantics, overflow, typography and accessibility`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
      expect((await page.goto(route))?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("h1")).toHaveCount(1);
      const problems = await page.evaluate(() => {
        const overflow = document.documentElement.scrollWidth > innerWidth + 1;
        const tiny = [
          ...document.querySelectorAll(
            "p,a,button,label,input,select,textarea,h1,h2,h3,figcaption,strong,span",
          ),
        ]
          .filter((e) => {
            const s = getComputedStyle(e);
            const r = e.getBoundingClientRect();
            return (
              r.width > 0 &&
              r.height > 0 &&
              s.visibility !== "hidden" &&
              e.textContent?.trim() &&
              parseFloat(s.fontSize) < 16
            );
          })
          .map((e) => e.textContent?.slice(0, 60));
        return { overflow, tiny };
      });
      expect(problems).toEqual({ overflow: false, tiny: [] });
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(axe.violations).toEqual([]);
      expect(errors).toEqual([]);
      const slug = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
      mkdirSync("artifacts/visual", { recursive: true });
      await page.screenshot({
        path: `artifacts/visual/${slug}-${width}.png`,
        fullPage: true,
      });
      const links = await page
        .locator('a[href^="/"]')
        .evaluateAll((es) => [
          ...new Set(es.map((e) => e.getAttribute("href")!.split("#")[0])),
        ]);
      for (const link of links)
        expect((await page.request.get(link)).status(), link).toBe(200);
    });
  }
test("first entry, skip and repeat entry preserve access", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".arrival")).toHaveAttribute(
    "data-phase",
    "active",
  );
  await page.getByRole("button", { name: "Skip introduction" }).click();
  await expect(page.locator(".arrival")).toHaveAttribute("data-phase", "done");
  await page.reload();
  await expect(page.locator(".arrival")).toHaveAttribute("data-repeat", "true");
  await expect(page.locator(".arrival")).toHaveAttribute("data-phase", "done", {
    timeout: 1400,
  });
  await page.evaluate(() => sessionStorage.clear());
  await page.reload();
  await expect(page.locator(".arrival")).toHaveAttribute("data-phase", "done", {
    timeout: 4500,
  });
});
test("drawer traps focus, escapes, restores trigger and exposes limits", async ({
  page,
}) => {
  await page.goto("/work");
  const trigger = page
    .locator("#tradebot")
    .getByRole("button", { name: "TradeBot architecture" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("not a current live-runtime certificate");
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(
        () => document.activeElement?.closest("dialog") !== null,
      ),
    ).toBe(true);
  }
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.screenshot({ path: "artifacts/visual/evidence-drawer.png" });
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
test("mobile menu keyboard, navigation and focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/work");
  const trigger = page.getByRole("button", { name: "Open menu" });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.screenshot({ path: "artifacts/visual/mobile-menu.png" });
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Journey" })
    .click();
  await expect(page).toHaveURL(/journey/);
  await expect(page.getByRole("dialog")).not.toBeVisible();
});
test("contact invalid, whitespace and honest email handoff", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Prepare email" }).click();
  await expect(page.locator("#name:invalid")).toHaveCount(1);
  await page.getByLabel("Name", { exact: true }).fill("   ");
  await page.getByLabel("Email", { exact: true }).fill("qa@example.com");
  await page.getByLabel("Message", { exact: true }).fill("   ");
  await page.getByRole("button", { name: "Prepare email" }).click();
  await expect(page.getByRole("status")).toContainText("not just spaces");
  await page.getByLabel("Name", { exact: true }).fill("QA Reviewer");
  await page
    .getByLabel("Message", { exact: true })
    .fill("I would like to discuss a role.");
  await page.getByRole("button", { name: "Prepare email" }).click();
  await expect(page.getByRole("status")).toContainText(
    "website has not sent a message",
  );
  await expect(
    page.getByRole("link", { name: "Open the draft again" }),
  ).toHaveAttribute("href", /^mailto:ramgolladi1503@gmail.com\?subject=/);
  await page.screenshot({ path: "artifacts/visual/contact-draft.png" });
});
test("sticky scenes advance, reverse and release under native scroll", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/work/tradebot");
  const scene = page.locator("[data-progress-scene]");
  const steps = scene.locator("[data-step]");
  await steps.nth(3).scrollIntoViewIfNeeded();
  await expect(scene).not.toHaveAttribute("data-active", "0");
  const box = await page.locator(".project-sticky").boundingBox();
  expect(box!.y).toBeGreaterThan(90);
  expect(box!.y).toBeLessThan(160);
  await page.screenshot({ path: "artifacts/visual/work-sticky.png" });
  await steps.nth(1).scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute("data-active", "1");
  await page.locator(".next-project").scrollIntoViewIfNeeded();
  const end = await page.locator(".project-sticky").boundingBox();
  expect(end!.y).toBeLessThan(100);
});
test("Journey accumulates and reverses; reduced motion keeps layers", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/journey");
  const scene = page.locator("[data-progress-scene]");
  await page.locator("#chapter-4").scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute("data-active", "3");
  await expect(page.locator(".layer[data-active=true]")).toHaveCount(4);
  await page.screenshot({ path: "artifacts/visual/journey-middle.png" });
  await page.locator("#chapter-6").scrollIntoViewIfNeeded();
  await expect(page.locator(".layer[data-active=true]")).toHaveCount(6);
  await page.screenshot({ path: "artifacts/visual/journey-convergence.png" });
  await page.locator("#chapter-2").scrollIntoViewIfNeeded();
  await expect(page.locator(".layer[data-active=true]")).toHaveCount(2);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(page.locator(".layer[data-active=true]")).toHaveCount(6);
});
test("research sequence reveals verdict and keyboard skip works", async ({
  page,
}) => {
  await page.goto("/research");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const verdict = page.locator("#strategy-robustness .verdict");
  await verdict.scrollIntoViewIfNeeded();
  await expect(verdict).toHaveAttribute("data-phase", "present");
  await page.screenshot({ path: "artifacts/visual/research-verdict.png" });
});
test("content remains usable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore My Work", exact: true }),
  ).toBeVisible();
  await context.close();
});
test("legacy project links reach their new pages", async ({ page }) => {
  await page.goto("/systems/tradebot");
  await expect(page).toHaveURL(/\/work\/tradebot$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "fintech reliability",
  );
});

test("moving narrative preserves readable contrast", async ({ page }) => {
  await page.goto("/work/tradebot");
  const step = page.locator("[data-step]").nth(4);
  await step.scrollIntoViewIfNeeded();
  await expect(step).toHaveCSS("opacity", "1");
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2aa"]).analyze()).violations,
  ).toEqual([]);
});

test("entry material transforms into the same hero element", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const material = page.locator(".hero-art .material");
  await expect(page.locator(".arrival")).toHaveAttribute(
    "data-phase",
    "active",
  );
  const handle = await material.elementHandle();
  const expanded = await material.boundingBox();
  expect(expanded!.width).toBeGreaterThan(1000);
  await page.screenshot({
    path: "artifacts/visual/material-entry-expanded.png",
  });
  await expect(page.locator(".arrival")).toHaveAttribute("data-phase", "done", {
    timeout: 4500,
  });
  expect(
    await handle!.evaluate(
      (el) => el === document.querySelector(".hero-art .material"),
    ),
  ).toBe(true);
  const settled = await material.boundingBox();
  expect(settled!.width).toBeLessThan(700);
  await page.screenshot({
    path: "artifacts/visual/material-entry-settled.png",
  });
});

test("local performance records layout stability and transfer budget", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.addInitScript(() => {
    const metrics = { cls: 0, lcp: 0 };
    Object.assign(window, { aixionPerformance: metrics });
    new PerformanceObserver((list) => {
      for (const raw of list.getEntries()) {
        const entry = raw as PerformanceEntry & {
          hadRecentInput?: boolean;
          value?: number;
        };
        if (!entry.hadRecentInput) metrics.cls += entry.value || 0;
      }
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      metrics.lcp = entries[entries.length - 1]?.startTime || 0;
    }).observe({ type: "largest-contentful-paint", buffered: true });
  });
  await page.goto("/");
  await expect(page.locator(".arrival")).toHaveAttribute("data-phase", "done", {
    timeout: 4500,
  });
  await page.evaluate(() => document.fonts.ready);
  const metrics = await page.evaluate(() => {
    const measured = (
      window as unknown as { aixionPerformance: { cls: number; lcp: number } }
    ).aixionPerformance;
    const resources = performance.getEntriesByType(
      "resource",
    ) as PerformanceResourceTiming[];
    return {
      ...measured,
      transferBytes: resources.reduce((n, r) => n + r.transferSize, 0),
      resourceCount: resources.length,
      navigation: performance.getEntriesByType("navigation")[0].toJSON(),
    };
  });
  expect(metrics.cls).toBeLessThan(0.1);
  expect(metrics.transferBytes).toBeLessThan(1_500_000);
  const { writeFileSync } = await import("node:fs");
  writeFileSync(
    "artifacts/visual/local-performance.json",
    JSON.stringify(
      {
        environment:
          "Local Chromium, unthrottled; not field performance or a Lighthouse score",
        ...metrics,
      },
      null,
      2,
    ),
  );
});

test("flagships share one anchored frame and reverse cleanly", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/work");
  const collection = page.locator(".flagship-collection");
  const frame = await page.locator(".collection-frame").elementHandle();
  await page
    .locator("#control-tower .project-heading")
    .scrollIntoViewIfNeeded();
  await expect(collection).toHaveAttribute("data-active-project", "1");
  await expect(
    page.locator('.collection-visual[data-current="true"]'),
  ).toContainText("Aixion Control Tower");
  await page.screenshot({ path: "artifacts/visual/flagship-handoff.png" });
  await page.locator("#tradebot .project-heading").scrollIntoViewIfNeeded();
  await expect(collection).toHaveAttribute("data-active-project", "0");
  expect(
    await frame!.evaluate(
      (el) => el === document.querySelector(".collection-frame"),
    ),
  ).toBe(true);
});
