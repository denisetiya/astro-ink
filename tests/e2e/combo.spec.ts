import { test, expect } from "@playwright/test";

test("combobox filters and selects with keyboard", async ({ page }) => {
  await page.goto("/components/combobox");
  const box = page.getByRole("combobox", { name: "Ship to" });
  await box.click();
  await box.fill("gra");
  await expect(page.getByRole("option", { name: "Grace Hopper" })).toBeVisible();
  await expect(page.getByRole("option", { name: "Ada Lovelace" })).toBeHidden();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.locator('input[type="hidden"][name="ship-to"]')).toHaveValue("gk");
  await expect(box).toHaveValue("Grace Hopper");
});

test("combobox closes on escape and clears", async ({ page }) => {
  await page.goto("/components/combobox");
  const box = page.getByRole("combobox", { name: "Ship to" });
  await box.click();
  await expect(page.getByRole("listbox")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("listbox")).toBeHidden();
});

test("combobox tab-away after exact label commits without trapping focus", async ({ page }) => {
  await page.goto("/components/combobox");
  const box = page.getByRole("combobox", { name: "Ship to" });
  await box.click();
  await box.fill("Grace Hopper");
  await page.keyboard.press("Tab");
  await expect(box).not.toBeFocused();
  await expect(page.getByRole("listbox")).toBeHidden();
  await expect(page.locator('input[type="hidden"][name="ship-to"]')).toHaveValue("gk");
});
