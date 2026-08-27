import { test, expect } from "@playwright/test";

test("bottom navigation marks current", async ({ page }) => {
  await page.goto("/components/bottom-navigation");
  await expect(page.locator(".ink-bottom").first().getByRole("link", { name: "Library" })).toHaveAttribute("aria-current", "page");
});

test("tour walks steps and ends", async ({ page }) => {
  await page.goto("/components/tour");
  await page.getByRole("button", { name: "Start tour" }).click();
  await expect(page.getByRole("dialog", { name: "Step 1 of 2" })).toBeVisible();
  await expect(page.locator("#tour-target-1")).toHaveClass(/ink-tour__highlight/);
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByRole("dialog", { name: "Step 2 of 2" })).toBeVisible();
  await page.getByRole("button", { name: "End tour" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
});
