import { test, expect } from '@playwright/test';

async function seedEntered(page) {
  await page.addInitScript(() => sessionStorage.setItem('aixion-entered-v4', '1'));
}

async function openHome(page) {
  await seedEntered(page);
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.home-orbit')).toBeVisible();
}

test('home has exactly eight governed destinations and no desktop overflow', async ({ page }) => {
  await openHome(page);
  await expect(page.locator('.hub-node')).toHaveCount(8);
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
});

test('primary navigation, browser back, and emblem home return work', async ({ page }) => {
  await openHome(page);

  // Orbit nodes are intentionally moving targets in normal motion mode. Force the
  // pointer action so Playwright validates the handler rather than waiting forever
  // for a mathematically stationary circle.
  await page.getByRole('button', { name: 'Open Projects' }).click({ force: true });
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.locator('.world-projects')).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('.home-orbit')).toBeVisible();

  await page.getByRole('button', { name: 'Open Evidence' }).click({ force: true });
  await expect(page).toHaveURL(/\/evidence$/);
  await page.getByRole('button', { name: 'Aixion Lab home' }).click({ force: true });
  await expect(page).toHaveURL(/\/$/);
});

test('Aixion Core has an accessible keyboard path and immediate Escape exit', async ({ page }) => {
  await openHome(page);
  const core = page.getByRole('button', { name: /Aixion Core/i });
  await core.focus();
  await core.press('Enter');
  await expect(page).toHaveURL(/\/core$/);
  await expect(page.locator('.app.is-deep')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('.home-orbit')).toBeVisible();
});

test('GitHub utility is visible and safely external', async ({ page }) => {
  await openHome(page);
  const github = page.getByRole('link', { name: 'GitHub — selected engineering work' });
  await expect(github).toBeVisible();
  await expect(github).toHaveAttribute('href', 'https://github.com/ramgolladi1503-sys');
  await expect(github).toHaveAttribute('target', '_blank');
  await expect(github).toHaveAttribute('rel', /noreferrer/);
});

test('mobile keeps all destinations reachable without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openHome(page);
  await expect(page.locator('.hub-node')).toHaveCount(8);
  const size = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  expect(size.scrollWidth).toBeLessThanOrEqual(size.innerWidth + 2);
});
