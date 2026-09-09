import { test, expect } from "@playwright/test";

test("bar chart renders labelled bars", async ({ page }) => {
  await page.goto("/components/bar-chart");
  const svg = page.getByRole("img", { name: /bar chart, 5 points/i });
  await expect(svg).toBeVisible();
  await expect(svg.locator("rect[data-ink-bar]")).toHaveCount(5);
});

test("line chart summarizes extremes", async ({ page }) => {
  await page.goto("/components/line-chart");
  await expect(page.getByRole("img", { name: /high dec 120/i })).toBeVisible();
});

test("area chart fills under the line", async ({ page }) => {
  await page.goto("/components/area-chart");
  const svg = page.getByRole("img", { name: /area chart/i });
  await expect(svg.locator("path[data-ink-area]")).toHaveCount(1);
  await expect(svg.locator("path[data-ink-line]")).toHaveCount(1);
});
