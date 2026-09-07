import { test, expect } from "@playwright/test";

test("tag input adds and removes tags", async ({ page }) => {
  await page.goto("/components/tag-input");
  const box = page.getByRole("textbox", { name: "Skills" });
  await box.fill("Astro");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Remove Astro" })).toBeVisible();
  await expect(page.locator('input[type="hidden"][name="skills"]')).toHaveCount(3);
  await page.getByRole("button", { name: "Remove Astro" }).click();
  await expect(page.getByRole("button", { name: "Remove Astro" })).toBeHidden();
  await box.fill("html");
  await page.keyboard.press("Enter");
  await expect(page.locator('input[type="hidden"][name="skills"]')).toHaveCount(2);
});

test("tag input backspace removes last tag", async ({ page }) => {
  await page.goto("/components/tag-input");
  const box = page.getByRole("textbox", { name: "Skills" });
  await box.focus();
  await page.keyboard.press("Backspace");
  await expect(page.getByRole("button", { name: "Remove CSS" })).toBeHidden();
});
