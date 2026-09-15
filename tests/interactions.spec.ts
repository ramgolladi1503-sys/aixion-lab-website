import { test, expect } from "@playwright/test";

test("research reveals one selected focus at a time", async ({ page }) => {
  await page.goto("/research", { waitUntil: "networkidle" });
  const cards = page.locator(".mock-research-card");
  await expect(cards).toHaveCount(11);
  await cards.nth(0).click();
  await expect(page.locator(".mock-research-detail")).toHaveCount(1);
  await cards.nth(2).click();
  await expect(page.locator(".mock-research-detail")).toHaveCount(1);
  await expect(page.locator(".mock-research-card.selected")).toHaveCount(1);
});

test("system detail tabs reveal one compact panel", async ({ page }) => {
  await page.goto("/systems/tradebot", { waitUntil: "networkidle" });
  const nav = page.getByRole("navigation", { name: "TradeBot sections" });
  await nav.getByRole("button", { name: "Architecture" }).click();
  await expect(page.locator(".showcase-architecture-list")).toBeVisible();
  await nav.getByRole("button", { name: "Current State" }).click();
  await expect(page.locator(".showcase-active-panel")).toContainText("Validation before expansion");
});

test("desktop drawer preserves page context", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Desktop-only drawer geometry");
  await page.goto("/research", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Toggle navigation drawer/i }).click();
  const drawer = page.locator(".unseen-drawer-menu");
  await expect(drawer).toBeVisible();
  const box = await drawer.boundingBox();
  const viewport = page.viewportSize();
  expect(box).not.toBeNull();
  expect(viewport).not.toBeNull();
  expect(box!.width / viewport!.width).toBeLessThanOrEqual(.4);
  await expect(drawer.getByRole("link", { name: "Work" })).toBeVisible();
  await expect(drawer.locator("text=01")).toHaveCount(0);
});

test("theme toggle persists explicit selection", async ({ page }) => {
  await page.goto("/research", { waitUntil: "networkidle" });
  const toggle = page.getByRole("button", { name: /Switch to .* mode/i });
  await toggle.click();
  const selected = await page.locator("html").getAttribute("data-theme");
  expect(["light", "dark"]).toContain(selected);
  const stored = await page.evaluate(() => localStorage.getItem("aixion-theme"));
  expect(stored).toBe(selected);
  await page.reload({ waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", selected!);
});

test("systems keeps explicit flagship hierarchy", async ({ page }) => {
  await page.goto("/systems", { waitUntil: "networkidle" });
  await expect(page.locator(".mock-project-card.flagship")).toHaveCount(2);
  await expect(page.locator(".mock-project-card.experiment")).toHaveCount(2);
  await expect(page.getByText("TradeBot", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("Aixion Control Tower", { exact: true }).first()).toBeVisible();
});
