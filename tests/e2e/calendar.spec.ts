import { test, expect } from "@playwright/test";

test("calendar selects a day and syncs the form value", async ({ page }) => {
  await page.goto("/components/calendar");
  await expect(page.getByRole("heading", { name: "September 2026" })).toBeVisible();
  await page.getByRole("button", { name: "15 September 2026" }).click();
  await expect(page.locator('input[type="hidden"][name="depart"]')).toHaveValue("2026-09-15");
});

test("calendar keyboard travels and pages", async ({ page }) => {
  await page.goto("/components/calendar");
  await page.getByRole("button", { name: "15 September 2026" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("button", { name: "16 September 2026" })).toBeFocused();
  await page.keyboard.press("PageDown");
  await expect(page.getByRole("heading", { name: "October 2026" })).toBeVisible();
  await expect(page.getByRole("button", { name: "16 October 2026" })).toBeFocused();
});

test("calendar prev button changes month", async ({ page }) => {
  await page.goto("/components/calendar");
  await page.getByRole("button", { name: "Previous month" }).first().click();
  await expect(page.getByRole("heading", { name: "August 2026" })).toBeVisible();
});
