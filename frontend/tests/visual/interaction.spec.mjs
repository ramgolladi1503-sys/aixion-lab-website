import { test, expect } from '@playwright/test';

async function seedEntered(page) {
  await page.addInitScript(() => sessionStorage.setItem('aixion-entered-v4', '1'));
}

async function openHome(page) {
  await seedEntered(page);
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.home-orbit')).toBeVisible();
  await page.evaluate(async () => {
    await document.fonts?.ready;
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
}

function collectPageErrors(page) {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  return errors;
}

test('normal-motion Home maintains bounded animation-frame pacing', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-motion', 'frame pacing is measured once in the canonical normal-motion Chromium lane');
  await openHome(page);
  const timing = await page.evaluate(async () => {
    const stamps = [];
    await new Promise((resolve) => {
      const sample = (time) => {
        stamps.push(time);
        if (stamps.length >= 100) resolve();
        else requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });
    const gaps = stamps.slice(1).map((time, index) => time - stamps[index]).sort((a, b) => a - b);
    const percentile = gaps[Math.min(gaps.length - 1, Math.floor(gaps.length * 0.95))];
    return { p95: percentile, max: Math.max(...gaps) };
  });
  expect(timing.p95).toBeLessThan(50);
  expect(timing.max).toBeLessThan(150);
});

test('home exposes exactly eight governed destinations with one geometry authority', async ({ page }) => {
  const errors = collectPageErrors(page);
  await openHome(page);
  await expect(page.locator('.hub-node')).toHaveCount(8);
  await expect(page.locator('.spoke-line')).toHaveCount(8);
  await expect(page.locator('.spoke-end')).toHaveCount(8);
  for (const name of ['About', 'Journey', 'Projects', 'Research', 'Evidence', 'Control Tower', 'Stack', 'Contact']) {
    await expect(page.getByRole('button', { name: `Open ${name}` })).toBeVisible();
  }
  const size = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
    scrollHeight: document.documentElement.scrollHeight,
    innerHeight: window.innerHeight,
  }));
  expect(size.scrollWidth).toBeLessThanOrEqual(size.innerWidth + 2);
  expect(size.scrollHeight).toBeLessThanOrEqual(size.innerHeight + 2);
  expect(errors).toEqual([]);
});

test('cinematic route transition resolves, browser back works, and header home is visible', async ({ page }) => {
  await openHome(page);
  const homeControl = page.getByRole('button', { name: 'Home', exact: true });
  await expect(homeControl).toBeVisible();

  await page.getByRole('button', { name: 'Open Projects' }).click({ force: true });
  await expect(page.locator('.route-portal')).toBeVisible();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.locator('.world-projects')).toBeVisible();
  await expect(page.locator('.route-portal')).toBeHidden();

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('.home-orbit')).toBeVisible();

  await page.getByRole('button', { name: 'Open Evidence' }).click({ force: true });
  await expect(page.locator('.route-portal')).toBeVisible();
  await expect(page).toHaveURL(/\/evidence$/);
  await expect(page.locator('.world-evidence')).toBeVisible();
  await expect(page.locator('.route-portal')).toBeHidden();

  await page.getByRole('button', { name: 'Aixion Lab home' }).click({ force: true });
  await expect(page.locator('.route-portal')).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('.home-orbit')).toBeVisible();
  await expect(page.locator('.route-portal')).toBeHidden();
});

test('Aixion Core supports keyboard entry and immediate Escape exit', async ({ page }) => {
  await openHome(page);
  const core = page.getByRole('button', { name: /Aixion Core/i });
  await core.focus();
  await core.press('Enter');
  await expect(page).toHaveURL(/\/core$/);
  await expect(page.locator('.app.is-deep')).toBeVisible();
  await expect(page.locator('.deep-word')).toHaveCount(5);
  await page.keyboard.press('Escape');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('.home-orbit')).toBeVisible();
});

test('TradeBot exposes all five governed narrative stages and public/private boundary', async ({ page }) => {
  await seedEntered(page);
  await page.goto('/projects/tradebot', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.tradebot-page')).toBeVisible();
  for (const id of ['tradebot-ingest', 'tradebot-research', 'tradebot-govern', 'tradebot-observe', 'tradebot-prove']) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await expect(page.locator('.public-private')).toContainText('PUBLIC');
  await expect(page.locator('.public-private')).toContainText('PRIVATE');
});

test('Contact uses a real mail surface rather than a non-functional form', async ({ page }) => {
  await seedEntered(page);
  await page.goto('/contact', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.world-contact')).toBeVisible();
  const email = page.getByRole('link', { name: /contact@aixionlab.com/i });
  await expect(email).toHaveAttribute('href', 'mailto:contact@aixionlab.com');
  await expect(page.locator('form')).toHaveCount(0);
});

test('GitHub utility is visible and safely external', async ({ page }) => {
  await openHome(page);
  const github = page.getByRole('link', { name: 'GitHub — selected engineering work' });
  await expect(github).toBeVisible();
  await expect(github).toHaveAttribute('href', 'https://github.com/ramgolladi1503-sys');
  await expect(github).toHaveAttribute('target', '_blank');
  await expect(github).toHaveAttribute('rel', /noreferrer/);
});

test('mobile keeps every Home destination fully inside the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openHome(page);
  await expect(page.locator('.hub-node')).toHaveCount(8);
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeVisible();
  const geometry = await page.locator('.hub-node').evaluateAll((nodes) => ({
    viewportWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    boxes: nodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
    }),
  }));
  expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.viewportWidth + 2);
  for (const box of geometry.boxes) {
    expect(box.left).toBeGreaterThanOrEqual(0);
    expect(box.right).toBeLessThanOrEqual(geometry.viewportWidth);
    expect(box.top).toBeGreaterThanOrEqual(0);
    expect(box.bottom).toBeLessThanOrEqual(844);
  }
});
