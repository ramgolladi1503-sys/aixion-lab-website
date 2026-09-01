import { test, expect } from "@playwright/test";

test("Home surfaces current curated lab work without turning mobile into an activity feed", async ({ page }, testInfo) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const current = page.locator(".pulse-preview");
  await expect(current).toBeVisible();
  await expect(current.locator(".home-worklog-strip")).toHaveCount(2);
  await expect(current.getByText("Light editorial convergence and release validation")).toBeVisible();
  const older = current.getByText("Hydration and regression baseline stabilized");
  if (testInfo.project.name === "mobile") await expect(older).toBeHidden();
  else await expect(older).toBeVisible();
});

test("Pulse publishes active work and a public-safe worklog", async ({ page }) => {
  await page.goto("/pulse", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "What is actively moving" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Light editorial convergence and release validation" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Changes that meaningfully altered capability, evidence or authority" })).toBeVisible();
  await expect(page.getByText("Observable Temporal State Field experiment archived as site-wide authority")).toBeVisible();
  await expect(page.getByText("Editorial closing principle became the authored site endpoint")).toBeVisible();
  await expect(page.getByText("Public worklog and activity publishing")).toBeVisible();
  await expect(page.getByText(/Raw commits, private conversations, credentials, proprietary logic/)).toBeVisible();
});

test("Pulse current cycle uses the authoritative system registry", async ({ page }) => {
  await page.goto("/pulse", { waitUntil: "networkidle" });
  const analyticsCard = page.locator(".pulse-system-card").filter({ hasText: "Analytics Lab" });
  await expect(analyticsCard.getByText("BUILDING", { exact: true })).toBeVisible();
  await expect(analyticsCard).toContainText("Algotradify");

  const automationCard = page.locator(".pulse-system-card").filter({ hasText: "Automation Systems" });
  await expect(automationCard.getByText("BUILDING", { exact: true })).toBeVisible();
  await expect(automationCard).toContainText("MCP Shield");
});

test("Public activity does not expose raw activity as a progress metric", async ({ page }) => {
  await page.goto("/pulse", { waitUntil: "networkidle" });
  await expect(page.getByText("Never published as progress")).toBeVisible();
  await expect(page.getByText("Not used")).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/password|api key|secret token/i);
});
