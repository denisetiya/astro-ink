import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/components/button");
});

test("renders native button with correct accessible name", async ({ page }) => {
  const button = page.getByRole("button", { name: "Primary", exact: true });
  await expect(button).toBeVisible();
});

test("renders an anchor when href is set", async ({ page }) => {
  const link = page.locator('a.ink-button[href="/"]');
  await expect(link.first()).toBeVisible();
});

test("disabled button is non-interactive", async ({ page }) => {
  const disabled = page.locator("button.ink-button:disabled");
  await expect(disabled.first()).toBeDisabled();
});

test("variants apply distinct backgrounds", async ({ page }) => {
  const primary = page.getByRole("button", { name: "Primary", exact: true });
  const secondary = page.getByRole("button", { name: "Secondary" });
  const primaryBg = await primary.evaluate((el) => getComputedStyle(el).backgroundColor);
  const secondaryBg = await secondary.evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(primaryBg).not.toBe(secondaryBg);
});
