import { test, expect } from "@playwright/test";

test("other directions heading sits below its label without horizontal overflow", async ({ page }) => {
  await page.goto("/work", { waitUntil: "networkidle" });

  const label = page.locator(".work-support__heading .eyebrow");
  const heading = page.getByRole("heading", { name: "Useful work continues beyond the flagship system" });
  await expect(label).toHaveText("OTHER DIRECTIONS");
  await expect(heading).toBeVisible();

  const [labelBox, headingBox] = await Promise.all([label.boundingBox(), heading.boundingBox()]);
  const headingStyle = await heading.evaluate((element) => getComputedStyle(element));
  const viewportWidth = page.viewportSize()?.width ?? 0;

  expect(labelBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  expect(headingBox!.y).toBeGreaterThanOrEqual(labelBox!.y + labelBox!.height);
  expect(headingBox!.x + headingBox!.width).toBeLessThanOrEqual(viewportWidth + 1);
  expect(headingStyle.whiteSpace).toBe("normal");
});
