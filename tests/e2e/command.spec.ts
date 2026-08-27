import { test, expect } from "@playwright/test";

test("opens with Ctrl+K, filters, navigates on Enter", async ({ page }) => {
  await page.goto("/components/command-menu");
  await page.keyboard.press("Control+k");
  const input = page.getByRole("combobox", { name: "Filter commands" });
  await expect(input).toBeVisible();
  await input.fill("them");
  await expect(page.getByRole("option", { name: /theming/i }).first()).toBeVisible();
  const count = await page.getByRole("option").count();
  expect(count).toBeLessThan(6);
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/guides\/theming/);
});

test("escape closes and restores focus", async ({ page }) => {
  await page.goto("/components/command-menu");
  await page.getByRole("button", { name: /open command menu/i }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(page.getByRole("button", { name: /open command menu/i })).toBeFocused();
});
