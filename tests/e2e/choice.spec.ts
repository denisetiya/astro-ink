import { test, expect } from "@playwright/test";

test("checkbox toggles and reports indeterminate", async ({ page }) => {
  await page.goto("/components/checkbox");
  const box = page.getByRole("checkbox", { name: "Select all" });
  await expect(box).not.toBeChecked();
  const state = await box.evaluate((el: HTMLInputElement) => el.indeterminate);
  expect(state).toBe(true);
  await box.check();
  await expect(box).toBeChecked();
});

test("switch exposes role=switch and toggles", async ({ page }) => {
  await page.goto("/components/switch");
  const sw = page.getByRole("switch", { name: "Dark mode" });
  await page.locator("label.ink-switch", { hasText: "Dark mode" }).click();
  await expect(sw).toBeChecked();
});

test("radio group selects one option with arrow keys", async ({ page }) => {
  await page.goto("/components/radio-group");
  const first = page.getByRole("radio", { name: "Weekly" });
  await first.check();
  await expect(first).toBeChecked();
  await first.press("ArrowDown");
  await expect(page.getByRole("radio", { name: "Monthly" })).toBeChecked();
});
