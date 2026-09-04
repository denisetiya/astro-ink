import { test, expect } from "@playwright/test";

test("rating selects with click and keyboard", async ({ page }) => {
  await page.goto("/components/rating");
  await page.getByRole("radio", { name: "4 stars" }).click();
  await expect(page.getByRole("radio", { name: "4 stars" })).toBeChecked();
  await page.keyboard.press("ArrowLeft");
  await expect(page.getByRole("radio", { name: "3 stars" })).toBeChecked();
});

test("readonly rating exposes static value", async ({ page }) => {
  await page.goto("/components/rating");
  await expect(page.getByRole("img", { name: "Rated 4 out of 5" })).toBeVisible();
});
