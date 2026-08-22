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
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("Public boundary")).toBeVisible();
  await dialog.getByRole("button", { name: "Close evidence" }).click();
  await expect(dialog).toBeHidden();
});

test("Command palette finds system routes on desktop", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Command palette trigger is intentionally desktop-only");
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open Aixion command palette" }).click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("textbox", { name: "Search Aixion pages" }).fill("TradeBot");
  await expect(dialog.getByRole("link", { name: "TradeBot System" })).toBeVisible();
});

test("Mobile navigation exposes the locked routes", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile navigation test runs only in the mobile project");
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByText("Menu", { exact: true }).click();
  const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(navigation).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Systems" })).toBeVisible();
});
