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

test("toggle button flips pressed state", async ({ page }) => {
  await page.goto("/components/toggle-button");
  const btn = page.getByRole("button", { name: "Bold" });
  await btn.click();
  await expect(btn).toHaveAttribute("aria-pressed", "true");
});

test("exclusive toggle group behaves like radio", async ({ page }) => {
  await page.goto("/components/toggle-button");
  const day = page.getByRole("button", { name: "Day" });
  const week = page.getByRole("button", { name: "Week" });
  const month = page.getByRole("button", { name: "Month" });
  await day.click();
  await week.click();
  await expect(week).toHaveAttribute("aria-pressed", "true");
  await expect(day).toHaveAttribute("aria-pressed", "false");
  await expect(month).toHaveAttribute("aria-pressed", "false");
});
test("slider updates fill and output", async ({ page }) => {
  await page.goto("/components/slider");
  const slider = page.getByRole("slider", { name: "Volume" });
  await slider.focus();
  await slider.press("ArrowRight");
  const fill = await slider.evaluate((el) => el.style.getPropertyValue("--ink-slider-fill"));
  expect(fill).not.toBe("");
  await expect(page.locator(".ink-slider", { has: slider }).locator(".ink-slider__output")).toHaveText(/\d+/);
});

test("radio group selects one option with arrow keys", async ({ page }) => {
  await page.goto("/components/radio-group");
  const first = page.getByRole("radio", { name: "Weekly" });
  await first.check();
  await expect(first).toBeChecked();
  await first.press("ArrowDown");
  await expect(page.getByRole("radio", { name: "Monthly" })).toBeChecked();
});

test("file upload lists selected files and allows removal", async ({ page }) => {
  await page.goto("/components/file");
  await page.locator('input[type="file"]').last().setInputFiles([
    { name: "a.txt", mimeType: "text/plain", buffer: Buffer.from("hello") },
    { name: "b.txt", mimeType: "text/plain", buffer: Buffer.from("world") },
  ]);
  await expect(page.locator(".ink-file__list li")).toHaveCount(2);
  await page.locator(".ink-file__remove").first().click();
  await expect(page.locator(".ink-file__list li")).toHaveCount(1);
});
