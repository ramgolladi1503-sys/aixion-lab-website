import { test, expect } from "@playwright/test";

test("Lab Career mode changes presentation state", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const toggle = page.getByRole("button", { name: "Toggle Lab and Career view" });
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-view", "career");
  await expect(page.locator(".career-only").first()).toBeVisible();
});

test("Research status filters are functional", async ({ page }) => {
  await page.goto("/research", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Rejected" }).click();
  await expect(page.getByText("Mean reversion candidate")).toBeVisible();
  await expect(page.getByText("Opening-session market structure")).toBeHidden();
});

test("Evidence Drawer opens and closes", async ({ page }) => {
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "View record ↗" }).first().click();
  const dialog = page.locator(".evidence-dialog");
  await expect(dialog).toHaveAttribute("open", "");
  await expect(page.getByText("Public boundary")).toBeVisible();
  await page.getByRole("button", { name: "Close evidence" }).click();
  await expect(dialog).not.toHaveAttribute("open", "");
});

test("Command palette finds system routes on desktop", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Command palette trigger is intentionally desktop-only");
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open Aixion command palette" }).click();
  await page.getByRole("textbox", { name: "Search Aixion pages" }).fill("TradeBot");
  await expect(page.getByRole("link", { name: /TradeBot/ })).toBeVisible();
});

test("Mobile navigation exposes the locked routes", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile navigation test runs only in the mobile project");
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByText("Menu", { exact: true }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Systems" }).last()).toBeVisible();
});
