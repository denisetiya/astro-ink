import { test, expect } from "@playwright/test";

test("date picker selects from popup and clears", async ({ page }) => {
  await page.goto("/components/date-picker");
  await page.getByRole("button", { name: /departure date/i }).click();
  await expect(page.getByRole("dialog", { name: "Departure date options" })).toBeVisible();
  await page.getByRole("button", { name: "15 September 2026" }).click();
  await expect(page.locator('input[type="hidden"][name="departure"]')).toHaveValue("2026-09-15");
  await expect(page.getByRole("dialog", { name: "Departure date options" })).toBeHidden();
  await page.getByRole("button", { name: /departure date/i }).click();
  await page.getByRole("button", { name: "Clear" }).click();
  await expect(page.locator('input[type="hidden"][name="departure"]')).toHaveValue("");
});

test("date picker closes on escape and refocuses", async ({ page }) => {
  await page.goto("/components/date-picker");
  const trigger = page.getByRole("button", { name: /departure date/i });
  await trigger.click();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("time picker composes hour and minute", async ({ page }) => {
  await page.goto("/components/time-picker");
  await page.getByRole("button", { name: /meeting time/i }).click();
  await page.getByRole("listbox", { name: "Hour" }).getByRole("option", { name: "14" }).click();
  await page.getByRole("listbox", { name: "Minute" }).getByRole("option", { name: "30" }).click();
  await expect(page.locator('input[type="hidden"][name="meeting"]')).toHaveValue("14:30");
});

test("time picker now fills current time", async ({ page }) => {
  await page.goto("/components/time-picker");
  await page.getByRole("button", { name: /meeting time/i }).click();
  await page.getByRole("button", { name: "Now" }).click();
  await expect(page.locator('input[type="hidden"][name="meeting"]')).toHaveValue(/^\d\d:\d\d$/);
});
