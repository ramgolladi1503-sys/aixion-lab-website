import { test, expect } from "@playwright/test";

test("contact section provides the public email and Aixion Lab LinkedIn page", async ({ page }) => {
  await page.goto("/about#contact", { waitUntil: "networkidle" });

  await expect(page.getByRole("link", { name: /contact@aixionlab\.com/i }))
    .toHaveAttribute("href", "mailto:contact@aixionlab.com");

  await expect(page.getByRole("link", { name: /LinkedIn \/ Aixion Lab/i }))
    .toHaveAttribute("href", "https://www.linkedin.com/company/145311242/");
});
