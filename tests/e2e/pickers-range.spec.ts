import { test, expect } from "@playwright/test";

// Both docs pages render two live demos; every interaction below scopes to
// the first demo so the preset second demo never collides on role names.

test("datetime combines date and time", async ({ page }) => {
  await page.goto("/components/date-time-picker");
  const demo = page.locator(".docs-example").first();
  await demo.getByRole("button", { name: "Event start: date" }).click();
  await demo.getByRole("button", { name: "12 September 2026" }).click();
  await demo.getByRole("button", { name: "Event start: time" }).click();
  await demo.getByRole("listbox", { name: "Hour" }).getByRole("option", { name: "09" }).click();
  await demo.getByRole("listbox", { name: "Minute" }).getByRole("option", { name: "30" }).click();
  await expect(page.locator('input[type="hidden"][name="event-start"]')).toHaveValue("2026-09-12T09:30");
});

test("range selects start then end", async ({ page }) => {
  await page.goto("/components/date-range-picker");
  const demo = page.locator(".docs-example").first();
  await demo.getByRole("button", { name: /hotel stay/i }).click();
  const dialog = demo.getByRole("dialog", { name: "Hotel stay options" });
  await dialog.getByRole("button", { name: "10 September 2026" }).click();
  await dialog.getByRole("button", { name: "15 September 2026" }).click();
  await expect(page.locator('input[type="hidden"][name="stay"]')).toHaveValue("2026-09-10");
  await expect(page.locator('input[type="hidden"][name="stay-end"]')).toHaveValue("2026-09-15");
  await expect(dialog.getByRole("button", { name: /12 September 2026, in selected range/ })).toBeVisible();
});

test("range restarts when second pick precedes start", async ({ page }) => {
  await page.goto("/components/date-range-picker");
  const demo = page.locator(".docs-example").first();
  await demo.getByRole("button", { name: /hotel stay/i }).click();
  const dialog = demo.getByRole("dialog", { name: "Hotel stay options" });
  await dialog.getByRole("button", { name: "15 September 2026" }).click();
  await dialog.getByRole("button", { name: "10 September 2026" }).click();
  await expect(page.locator('input[type="hidden"][name="stay"]')).toHaveValue("2026-09-10");
  await expect(page.locator('input[type="hidden"][name="stay-end"]')).toHaveValue("");
});

test("range clear resets both values and paint", async ({ page }) => {
  await page.goto("/components/date-range-picker");
  const demo = page.locator(".docs-example").first();
  await demo.getByRole("button", { name: /hotel stay/i }).click();
  const dialog = demo.getByRole("dialog", { name: "Hotel stay options" });
  await dialog.getByRole("button", { name: "10 September 2026" }).click();
  await dialog.getByRole("button", { name: "15 September 2026" }).click();
  await dialog.getByRole("button", { name: "Clear" }).click();
  await expect(page.locator('input[type="hidden"][name="stay"]')).toHaveValue("");
  await expect(page.locator('input[type="hidden"][name="stay-end"]')).toHaveValue("");
  await expect(dialog.getByRole("button", { name: /in selected range/ })).toHaveCount(0);
});

test("range paints initial value server-side", async ({ page }) => {
  await page.goto("/components/date-range-picker");
  const preset = page.locator(".docs-example").nth(1);
  await preset.getByRole("button", { name: /hotel stay/i }).click();
  const dialog = preset.getByRole("dialog", { name: "Hotel stay options" });
  await expect(dialog.getByRole("button", { name: /12 September 2026, in selected range/ })).toBeVisible();
  await expect(dialog.getByRole("button", { name: "10 September 2026, selected" })).toBeVisible();
  await expect(page.locator('input[type="hidden"][name="stay-set"]')).toHaveValue("2026-09-10");
  await expect(page.locator('input[type="hidden"][name="stay-set-end"]')).toHaveValue("2026-09-15");
});
