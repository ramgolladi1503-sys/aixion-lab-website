import { test, expect } from "@playwright/test";

test("Lab Career mode changes presentation state", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const toggle = page.getByRole("button", { name: "Toggle Lab and Career view" });
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-view", "career");
  await expect(page.locator(".career-only").first()).toBeVisible();
  await expect(toggle).toContainText("Career");
});

test("Research status filters are functional", async ({ page }) => {
  await page.goto("/research", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Rejected" }).click();
  await expect(page.getByText("Mean reversion candidate")).toBeVisible();
  await expect(page.getByText("Opening-session market structure")).toBeHidden();
});

test("Evidence Drawer is proof-first and closes", async ({ page }) => {
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /View record/ }).first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("RESULT / STATE")).toBeVisible();
  await expect(dialog.getByText("PUBLIC PROOF")).toBeVisible();
  await expect(dialog.getByText("Public boundary")).toBeVisible();
  const close = dialog.getByRole("button", { name: "Close evidence" });
  const box = await close.boundingBox();
  expect(box?.width ?? 0).toBeGreaterThanOrEqual(40);
  expect(box?.height ?? 0).toBeGreaterThanOrEqual(40);
  await close.click();
  await expect(dialog).toBeHidden();
});

test("Command palette supports keyboard navigation on desktop", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Command palette trigger is intentionally desktop-only");
  await page.goto("/", { waitUntil: "networkidle" });
  await page.keyboard.press("ControlOrMeta+K");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const input = dialog.getByRole("textbox", { name: "Search Aixion pages" });
  await input.fill("TradeBot");
  await expect(dialog.getByRole("link", { name: "TradeBot System" })).toBeVisible();
  await input.press("Enter");
  await expect(page).toHaveURL(/\/systems\/tradebot$/);
});

test("Primary navigation exposes active route", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Desktop active navigation assertion");
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Systems" })).toHaveAttribute("aria-current", "page");
});

test("System page exposes internal navigation", async ({ page }) => {
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  const nav = page.getByRole("navigation", { name: "TradeBot page sections" });
  await expect(nav.getByRole("link", { name: "Architecture" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Research" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Evidence" })).toBeVisible();
});

test("Mobile navigation exposes locked routes with usable targets", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile navigation test runs only in mobile project");
  await page.goto("/", { waitUntil: "networkidle" });
  const menu = page.getByText("Menu", { exact: true });
  const menuBox = await menu.boundingBox();
  expect(menuBox?.height ?? 0).toBeGreaterThanOrEqual(40);
  await menu.click();
  const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(navigation).toBeVisible();
  const systems = navigation.getByRole("link", { name: "Systems" });
  await expect(systems).toBeVisible();
  const linkBox = await systems.boundingBox();
  expect(linkBox?.height ?? 0).toBeGreaterThanOrEqual(40);
});
