import { test, expect } from "@playwright/test";

test("radar draws one polygon per series", async ({ page }) => {
  await page.goto("/components/radar-chart");
  const svg = page.getByRole("img", { name: /radar chart, 5 categories/i });
  await expect(svg.locator("polygon[data-ink-series]")).toHaveCount(2);
});

test("scatter plots titled points on nice axes", async ({ page }) => {
  await page.goto("/components/scatter-chart");
  const svg = page.getByRole("img", { name: /scatter chart, 8 points/i });
  await expect(svg.locator("circle[data-ink-point]")).toHaveCount(8);
});
