import { test, expect } from "@playwright/test";

test("the locked homepage keeps its business offer and reachable contact path", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { name: "Your business has a problem. We engineer the solution." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Discuss a workflow/ })).toHaveAttribute("href", "#contact");

  const offer = page.locator("#works");
  await expect(offer.getByRole("heading", { name: "SOFTWARE & AUTOMATION FOR BUSINESSES" })).toBeVisible();
  await expect(offer.locator(".work_row_exp")).toHaveCount(3);
  await expect(offer.getByText(/starting points, not packaged products/i)).toBeVisible();
  await expect(offer.getByRole("link", { name: /Discuss a Project/ })).toHaveAttribute("href", "#contact");
});

test("the homepage contact path and business offer fit a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { name: "Your business has a problem. We engineer the solution." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Discuss a workflow/ })).toBeVisible();
  await expect(page.locator("#works")).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("business section keeps its introduction, service cards, and next action in sequence", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Desktop spacing assertion");
  await page.goto("/", { waitUntil: "networkidle" });

  const positions = await page.locator("#works").evaluate((section) => {
    const boxes = [
      section.querySelector(".section_heading_bar"),
      section.querySelector(":scope > p"),
      section.querySelector(".works_list_full"),
      section.querySelector(":scope > p:last-of-type"),
      section.querySelector('a[href="#contact"]'),
    ].map((element) => element?.getBoundingClientRect());
    return boxes.map((box) => box ? { top: box.top + window.scrollY, bottom: box.bottom + window.scrollY } : null);
  });
  expect(positions.every(Boolean)).toBe(true);
  for (let index = 0; index < positions.length - 1; index += 1) {
    expect(positions[index + 1]!.top).toBeGreaterThanOrEqual(positions[index]!.bottom);
    expect(positions[index + 1]!.top - positions[index]!.bottom).toBeLessThan(140);
  }
});
