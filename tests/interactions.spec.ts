import { expect, test } from "@playwright/test";

test("Research status filters update visible records and selection state", async ({ page }) => {
  await page.goto("/research", { waitUntil: "networkidle" });
  const rows = page.locator(".research-list .research-row");
  await expect(rows).toHaveCount(4);
  const rejected = page.getByRole("button", { name: "Rejected" });
  await rejected.click();
  await expect(rejected).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("heading", { name: "Mean reversion candidate" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Opening-session market structure" })).toBeHidden();
});

test("system evidence drawers open, close with Escape, and return focus to their trigger", async ({ page }) => {
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  const trigger = page.getByRole("button", { name: "Inspect evidence" }).first();
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("RESULT / STATE")).toBeVisible();
  await expect(dialog.getByText("PUBLIC PROOF STATUS")).toBeVisible();
  await expect(dialog.getByText("Public boundary")).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close evidence" })).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("system pages expose the four direct destinations and suppress View Lab and Menu", async ({ page }) => {
  for (const route of ["/systems/tradebot", "/systems/control-core", "/systems/automation", "/systems/analytics"]) {
    await page.goto(route, { waitUntil: "networkidle" });
    const nav = page.getByRole("navigation", { name: "Primary navigation" });
    await expect(nav.getByRole("link")).toHaveText(["The Lab", "Work", "Research", "Approach"]);
    await expect(page.locator(".mode-toggle, .header-menu-pill")).toHaveCount(0);
  }
});

test("system detail navigation jumps to its labeled sections", async ({ page }) => {
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  const nav = page.getByRole("navigation", { name: "TradeBot page sections" });
  const evidence = nav.getByRole("link", { name: "Evidence" });
  await expect(evidence).toHaveAttribute("href", "#evidence");
  await evidence.click();
  await expect(page).toHaveURL(/#evidence$/);
  await expect(page.locator("#evidence")).toBeInViewport();
});
