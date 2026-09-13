import { test, expect } from "@playwright/test";

test("card slots render", async ({ page }) => {
  await page.goto("/components/card");
  await expect(page.getByRole("heading", { name: "Field guide" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Read chapter" }).first()).toBeVisible();
});

test("list selected marks current", async ({ page }) => {
  await page.goto("/components/list");
  await expect(page.getByRole("link", { name: "Invoices" })).toHaveAttribute("aria-current", "true");
});
