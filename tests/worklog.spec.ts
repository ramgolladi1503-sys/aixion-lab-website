import { test, expect } from "@playwright/test";

test("Home routes current-work discovery to the dedicated Pulse surface", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator('.desktop-nav a[href="/pulse"]')).toHaveCount(1);
  await expect(page.locator(".pulse-preview")).toHaveCount(0);
});

test("Pulse publishes current work and only recent meaningful public changes", async ({ page }) => {
  await page.goto("/pulse", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "What is actively moving" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Approved dark system refinement and release validation" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Only changes that matter outside the repository" })).toBeVisible();
  await expect(page.locator(".pulse-history .worklog-row")).toHaveCount(5);
  await expect(page.getByText(/older public milestones remain preserved/i)).toBeVisible();
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
