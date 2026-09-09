import { test, expect } from "@playwright/test";

test("pie renders slices with legend", async ({ page }) => {
  await page.goto("/components/pie-chart");
  const svg = page.getByRole("img", { name: /pie chart, 4 segments/i });
  await expect(svg.locator("path[data-ink-slice]")).toHaveCount(4);
  await expect(page.getByText("Direct", { exact: true }).first()).toBeVisible();
});

test("sparkline summarizes last value", async ({ page }) => {
  await page.goto("/components/sparkline");
  await expect(page.getByRole("img", { name: /sparkline, ends at 42/i })).toBeVisible();
});

test("gauge exposes meter semantics", async ({ page }) => {
  await page.goto("/components/gauge");
  const meter = page.getByRole("meter", { name: "Server load" });
  await expect(meter).toHaveAttribute("aria-valuenow", "75");
  await expect(meter).toContainText("75%");
});
