import { test, expect } from "@playwright/test";

test("home exposes the approved five cinematic destinations without decorative numbering", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator(".destination-grid .destination-panel")).toHaveCount(5);
  await expect(page.getByText("We build intelligent systems for a more extraordinary future.")).toBeVisible();
  await expect(page.getByText("Applied intelligence with a point of view.")).toBeVisible();
  await expect(page.getByText("Systems that learn, adapt and explain.")).toBeVisible();
  await expect(page.getByText("Real questions. Evidence before confidence.")).toBeVisible();
  await expect(page.getByText("Let’s build what’s next.")).toBeVisible();
  const decorative = await page.locator("body").innerText();
  expect(decorative).not.toMatch(/CHAPTER\s*0?\d|AX\s*\/\s*0?\d/);
});

test("motion remains optional and does not hide landing content", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("#motion-scope")).toHaveClass(/motion-ready|motion-reduced/);
  for (const panel of await page.locator(".destination-panel").all()) await expect(panel).toBeVisible();
});

test("reduced motion preserves every destination and primary path", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("#motion-scope")).toHaveClass(/motion-reduced/);
  await expect(page.locator(".destination-panel")).toHaveCount(5);
  await expect(page.getByRole("link", { name: /Systems that learn, adapt and explain/i })).toBeVisible();
});

test("Journey remains an escalating engineering-question narrative", async ({ page }) => {
  await page.goto("/journey", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "The tools changed. The questions got stricter." })).toBeVisible();
  await expect(page.getByText(/Why did this fail/)).toBeVisible();
  await expect(page.getByText(/What state is the system actually in/)).toBeVisible();
  await expect(page.getByText(/Can intelligence operate while remaining observable, governed and accountable/)).toBeVisible();
  await expect(page.locator(".journey-question")).toHaveCount(7);
});

test("command palette carries state, not just destinations", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "The command palette is intentionally a desktop keyboard surface; mobile uses the menu.");
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open Aixion search" }).click();
  await expect(page.getByRole("dialog", { name: "Search Aixion" })).toBeVisible();
  await expect(page.locator('.command-results a[href="/systems/tradebot"] .command-meta')).toContainText("VALIDATING");
  await expect(page.locator('.command-results a[href="/systems/analytics"] .command-meta')).toContainText("BUILDING");
  await expect(page.locator('.command-results a[href="/journey"] .command-meta')).toContainText("7 QUESTIONS");
});

test("system subnavigation reflects deliberate section navigation", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Sticky section authority is a desktop interaction");
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  const architectureLink = page.locator('.system-subnav a[href="#architecture"]');
  await architectureLink.click();
  await expect(architectureLink).toHaveClass(/is-active/);
  await expect(architectureLink).toHaveAttribute("aria-current", "location");
});
