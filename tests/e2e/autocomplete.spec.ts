import { test, expect } from "@playwright/test";

test("autocomplete suggests and accepts free text", async ({ page }) => {
  await page.goto("/components/autocomplete");
  const box = page.getByRole("textbox", { name: "City" });
  await box.click();
  await box.fill("york");
  await expect(page.getByRole("option", { name: "New York" })).toBeVisible();
  await expect(page.getByRole("option", { name: "Newark" })).toBeHidden();
  // First match is auto-highlighted; ArrowDown moves to the second match.
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("Enter");
  await expect(box).toHaveValue("New York");
});

test("autocomplete keeps custom text on blur", async ({ page }) => {
  await page.goto("/components/autocomplete");
  const box = page.getByRole("textbox", { name: "City" });
  await box.click();
  await box.fill("Atlantis");
  await box.blur();
  await expect(box).toHaveValue("Atlantis");
  await expect(page.locator('input[name="city"]')).toHaveValue("Atlantis");
});
