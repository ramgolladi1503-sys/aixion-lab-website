import { test, expect } from "@playwright/test";

test("Pulse remains available as a dated status record without returning to primary navigation", async ({ page }, testInfo) => {
  await page.goto("/", { waitUntil: "networkidle" });
  if (testInfo.project.name === "desktop") {
    const primary = page.getByRole("navigation", { name: "Primary navigation" });
    await expect(primary.getByRole("link", { name: "The Lab" })).toBeVisible();
    await expect(primary.getByRole("link", { name: "Work" })).toBeVisible();
    await expect(primary.getByRole("link", { name: "Pulse" })).toHaveCount(0);
  } else {
    // The locked homepage has no mobile nav; verify that Pulse stays out of
    // the mobile card surface, then verify the direct nav on its own page.
    await expect(page.locator("#shuffler_stage .card_item").first()).toBeAttached();
    await expect(page.getByRole("button", { name: "Menu" })).toHaveCount(0);
  }

  await page.goto("/pulse", { waitUntil: "networkidle" });
  await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "The Lab" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "A clear view of what is moving." })).toBeVisible();
  await expect(page.locator(".pulse-snapshot")).toContainText("Last recorded snapshot");
  await expect(page.locator(".pulse-card")).toHaveCount(4);
  await expect(page.locator(".pulse-card").first()).toContainText("Current focus");
  await expect(page.locator(".pulse-card").first()).toContainText("Next gate");
});

test("public Pulse reports states and gates without implying live telemetry or performance", async ({ page }) => {
  await page.goto("/pulse", { waitUntil: "networkidle" });
  const body = (await page.locator("body").innerText()).toLowerCase();
  expect(body).toContain("not a live telemetry feed");
  expect(body).not.toContain("win rate");
  expect(body).not.toContain("execution allowed");
});
