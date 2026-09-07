import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const baseURL = "http://127.0.0.1:3000";
const routes = [
  ["home", "/"], ["systems", "/systems"], ["tradebot", "/systems/tradebot"],
  ["control-core", "/systems/control-core"], ["automation", "/systems/automation"],
  ["analytics", "/systems/analytics"], ["research", "/research"],
  ["opening-session", "/research/opening-session-market-structure"],
  ["rec-md", "/research/rec-md-structural-interaction"],
  ["mean-reversion", "/research/mean-reversion-candidate"],
  ["evidence-autonomy", "/research/evidence-bound-autonomy"],
  ["pulse", "/pulse"], ["journey", "/journey"], ["about", "/about"],
  ["resume", "/resume"], ["not-found", "/route-that-does-not-exist"],
];

const output = process.env.AIXION_AUDIT_OUTPUT ?? "/tmp/aixion-ten-pass-ui-audit";
await fs.rm(output, { recursive: true, force: true });
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const failures = [];

for (let pass = 1; pass <= 10; pass += 1) {
  for (const [name, route] of routes) {
    for (const [device, viewport, reducedMotion] of [["desktop", { width: 1440, height: 1200 }, false], ["mobile", { width: 393, height: 852 }, false]]) {
      const page = await browser.newPage({ viewport, reducedMotion: reducedMotion ? "reduce" : "no-preference" });
      try {
        const response = await page.goto(`${baseURL}${route}`, { waitUntil: "domcontentloaded" });
        const expectedNotFound = route === "/route-that-does-not-exist";
        if (!response || (response.status() >= 400 && !expectedNotFound) || (expectedNotFound && response.status() !== 404)) throw new Error(`HTTP ${response?.status() ?? "missing"}`);
        await page.locator("header").waitFor();
        await page.locator("footer").waitFor();
        // The shared motion enhancer is client-mounted after the shell. Do not
        // inspect reveal state before its contract exists or the audit becomes
        // a timing test against React hydration rather than the rendered page.
        await page.locator("html.motion-ready").waitFor({ state: "attached", timeout: 2000 });
        await page.locator(".reveal-on-scroll").first().waitFor({ state: "attached", timeout: 2000 }).catch(() => {});
        const revealTargets = page.locator(".reveal-on-scroll");
        for (let index = 0; index < await revealTargets.count(); index += 1) {
          await revealTargets.nth(index).scrollIntoViewIfNeeded();
          const target = revealTargets.nth(index);
          const deadline = Date.now() + 1500;
          while (!(await target.evaluate(node => node.classList.contains("is-revealed")))) {
            if (Date.now() >= deadline) throw new Error("reveal target did not settle");
            await page.waitForTimeout(50);
          }
        }
        const state = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
          unrevealed: document.querySelectorAll(".reveal-on-scroll:not(.is-revealed)").length,
        }));
        if (state.overflow) throw new Error("horizontal overflow");
        if (state.unrevealed) throw new Error(`${state.unrevealed} reveal targets did not settle`);
        if (route === "/" && device === "desktop") {
          const carousel = page.locator(".hero-carousel");
          await carousel.hover();
          const selectedLabel = await carousel.locator('[role="tab"][aria-selected="true"]').getAttribute("aria-label");
          const targetLabel = selectedLabel === "Go to slide 1" ? "Go to slide 2" : "Go to slide 1";
          await carousel.getByRole("tab", { name: targetLabel }).click();
          const targetTab = carousel.getByRole("tab", { name: targetLabel });
          const deadline = Date.now() + 2000;
          while (await targetTab.getAttribute("aria-selected") !== "true") {
            if (Date.now() >= deadline) throw new Error("carousel state did not advance");
            await page.waitForTimeout(25);
          }
        }
        if (route === "/" && device === "mobile") {
          await page.locator(".mobile-menu summary").click();
          await page.getByRole("navigation", { name: "Mobile navigation" }).waitFor();
        }
        await page.screenshot({ path: path.join(output, `pass-${pass}-${device}-${name}.png`), fullPage: true });
      } catch (error) {
        failures.push(`pass ${pass} ${device} ${route}: ${error.message}`);
      } finally {
        await page.close();
      }
    }
  }
  console.log(`PASS ${pass}/10 complete`);
}

await browser.close();
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`TEN_PASS_AUDIT_OK routes=${routes.length} devices=2 screenshots=${routes.length * 2 * 10}`);
}
