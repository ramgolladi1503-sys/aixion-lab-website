import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const RUN_ID = process.env.VISUAL_RUN_ID || process.env.GITHUB_SHA?.slice(0, 12) || 'current';
const OUT = path.join(process.cwd(), 'test-results', 'visual-evidence', RUN_ID);

const ROUTES = [
  ['05-about-current.png', '/about'],
  ['06-journey-current.png', '/journey'],
  ['07-projects-current.png', '/projects'],
  ['08-tradebot-current.png', '/projects/tradebot'],
  ['09-research-current.png', '/research'],
  ['10-evidence-current.png', '/evidence'],
  ['11-control-tower-current.png', '/control-tower'],
  ['12-stack-current.png', '/stack'],
  ['13-contact-current.png', '/contact'],
];

const TRADEBOT_STAGES = [
  ['08a-tradebot-ingest-current.png', 'tradebot-ingest'],
  ['08b-tradebot-research-current.png', 'tradebot-research'],
  ['08c-tradebot-govern-current.png', 'tradebot-govern'],
  ['08d-tradebot-observe-current.png', 'tradebot-observe'],
  ['08e-tradebot-prove-current.png', 'tradebot-prove'],
];

function ensureOut() {
  fs.mkdirSync(OUT, { recursive: true });
}

async function stabilizeCanvasClock(page) {
  await page.addInitScript(() => {
    const nativeSetTimeout = window.setTimeout.bind(window);
    window.requestAnimationFrame = (callback) => nativeSetTimeout(() => callback(1000), 16);
    window.cancelAnimationFrame = (id) => window.clearTimeout(id);
  });
}

async function gotoState(page, route, selector = 'main') {
  await page.goto(route, { waitUntil: 'domcontentloaded' });
  await expect(page.locator(selector).first()).toBeVisible();
  await page.waitForTimeout(350);
}

async function revealScrollableContent(page) {
  const metrics = await page.evaluate(() => ({
    height: document.documentElement.scrollHeight,
    viewport: window.innerHeight,
  }));
  const step = Math.max(420, Math.round(metrics.viewport * .72));
  for (let y = 0; y < metrics.height; y += step) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(70);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(180);
}

async function shot(page, name, fullPage = false) {
  ensureOut();
  await page.screenshot({ path: path.join(OUT, name), fullPage });
}

async function captureTradeBotStages(page) {
  for (const [name, id] of TRADEBOT_STAGES) {
    const stage = page.locator(`#${id}`);
    await expect(stage).toBeVisible();
    await stage.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await shot(page, name, false);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(180);
}

test('capture governed visual matrix', async ({ page }) => {
  test.setTimeout(150_000);
  ensureOut();

  await stabilizeCanvasClock(page);

  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => sessionStorage.removeItem('aixion-entered-v4'));
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.locator('.entry-screen')).toBeVisible();
  await page.waitForTimeout(350);
  await shot(page, '01-entry-current.png');

  await page.evaluate(() => sessionStorage.setItem('aixion-entered-v4', '1'));
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.locator('.home-orbit')).toBeVisible();
  await page.waitForTimeout(450);
  await shot(page, '02-home-current.png');

  const projects = page.getByRole('button', { name: 'Open Projects' });
  await projects.hover({ force: true });
  await page.waitForTimeout(250);
  await shot(page, '03-projects-hover-current.png');

  const research = page.getByRole('button', { name: 'Open Research' });
  await research.hover({ force: true });
  await page.waitForTimeout(250);
  await shot(page, '04-research-hover-current.png');

  for (const [name, route] of ROUTES) {
    await gotoState(page, route, 'main');
    await revealScrollableContent(page);
    await shot(page, name, true);
    if (route === '/projects/tradebot') {
      await captureTradeBotStages(page);
    }
  }

  await gotoState(page, '/core', 'main');
  await shot(page, '14-core-current.png');

  await page.setViewportSize({ width: 768, height: 1024 });
  await gotoState(page, '/', '.home-orbit');
  await shot(page, '15-tablet-current.png');

  await page.setViewportSize({ width: 390, height: 844 });
  await gotoState(page, '/', '.home-orbit');
  await shot(page, '16-mobile-current.png');

  const metadata = {
    runId: RUN_ID,
    gitSha: process.env.GITHUB_SHA || null,
    primaryViewport: { width: 1440, height: 900 },
    responsiveViewports: [
      { width: 768, height: 1024 },
      { width: 390, height: 844 },
    ],
    screenshotCount: 21,
    governedRoutes: ROUTES.length + 3,
    tradebotStageStates: TRADEBOT_STAGES.map(([, id]) => id),
    referenceAuthority: '../../docs/visual-validation/radial-v1/REFERENCE_AUTHORITY.md',
    note: 'Screenshots are evidence for model/human comparison. Scroll-revealed pages are captured only after observer-driven content has been exercised; TradeBot is also captured at each pinned narrative state.',
  };
  fs.writeFileSync(path.join(OUT, 'capture-manifest.json'), `${JSON.stringify(metadata, null, 2)}\n`);
});
