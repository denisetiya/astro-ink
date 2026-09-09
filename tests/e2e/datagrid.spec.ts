import { test, expect } from "@playwright/test";

test("grid sorts numerically on header activate", async ({ page }) => {
  await page.goto("/components/data-grid");
  const demo = page.locator("#demo-invoices");
  await demo.getByRole("columnheader", { name: /amount/i }).click();
  await expect(demo.getByRole("columnheader", { name: /amount/i })).toHaveAttribute("aria-sort", "ascending");
  const first = demo.locator(".ink-datagrid__body tr").first();
  await expect(first).toContainText("Grace Hopper");
  await demo.getByRole("columnheader", { name: /amount/i }).click();
  await expect(first).toContainText("Alan Turing");
});

test("grid filters and counts", async ({ page }) => {
  await page.goto("/components/data-grid");
  const demo = page.locator("#demo-invoices");
  await demo.getByRole("searchbox", { name: "Filter invoices" }).fill("ada");
  await expect(demo.locator(".ink-datagrid__body tr:not([hidden])")).toHaveCount(1);
  await expect(demo.getByText("Showing 1–1 of 1")).toBeVisible();
});

test("grid paginates and selects", async ({ page }) => {
  await page.goto("/components/data-grid");
  const demo = page.locator("#demo-invoices");
  await demo.getByRole("button", { name: "Next page" }).click();
  await expect(demo.getByText("Page 2 of 3")).toBeVisible();
  await demo.getByRole("checkbox", { name: "Select row inv-07" }).check();
  await expect(demo.locator('input[type="hidden"][name="invoices"]')).toHaveValue("inv-07");
});
