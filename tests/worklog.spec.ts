import { test, expect } from "@playwright/test";

test("Home surfaces current curated lab work", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByText("WORKING NOW · 2026-08-31")).toBeVisible();
  await expect(page.getByText("Production cutover and live-domain verification")).toBeVisible();
  await expect(page.getByText("Live UAT removed interaction and layout distractions")).toBeVisible();
});

test("Pulse publishes active work and a public-safe worklog", async ({ page }) => {
  await page.goto("/pulse", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "What is actively moving" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Production cutover and live-domain verification" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Changes that meaningfully altered capability, evidence or authority" })).toBeVisible();
  await expect(page.getByText("Public worklog and activity publishing")).toBeVisible();
  await expect(page.getByText("Aixion Signal became the interaction language")).toBeVisible();
  await expect(page.getByText(/Raw commits, private conversations, credentials, proprietary logic/)).toBeVisible();
});

test("Public activity does not expose raw activity as a progress metric", async ({ page }) => {
  await page.goto("/pulse", { waitUntil: "networkidle" });
  await expect(page.getByText("Never published as progress")).toBeVisible();
  await expect(page.getByText("Not used")).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/password|api key|secret token/i);
});
