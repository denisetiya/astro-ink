import { test, expect } from "@playwright/test";

test("multiselect checks and counts", async ({ page }) => {
  await page.goto("/components/multi-select");
  await page.getByRole("button", { name: /toppings/i }).click();
  await page.getByRole("checkbox", { name: "Mushrooms" }).check();
  await page.getByRole("checkbox", { name: "Olives" }).check();
  await expect(page.getByRole("button", { name: /2 selected/i })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("group", { name: "Toppings options" })).toBeHidden();
});

test("multiselect clear resets", async ({ page }) => {
  await page.goto("/components/multi-select");
  await page.getByRole("button", { name: /toppings/i }).click();
  await page.getByRole("checkbox", { name: "Mushrooms" }).check();
  await page.getByRole("button", { name: "Clear" }).click();
  await expect(page.getByRole("button", { name: /toppings/i })).toHaveText(/select toppings/i);
});
