import { test, expect } from "@playwright/test";

test("password toggle switches visibility and label", async ({ page }) => {
  await page.goto("/components/password-input");
  const input = page.locator('input[type="password"]');
  const toggle = page.locator("[data-ink-password-toggle]");
  await toggle.click();
  await expect(page.locator('input[type="text"]')).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(toggle).toHaveAttribute("aria-label", "Hide password");
});

test("search clear empties the field and hides itself", async ({ page }) => {
  await page.goto("/components/search-input");
  const input = page.getByRole("searchbox");
  const clear = page.locator("[data-ink-search-clear]");
  await input.fill("query");
  await expect(clear).toBeVisible();
  await clear.click();
  await expect(input).toHaveValue("");
  await expect(clear).toBeHidden();
});

test("textarea with autosize grows on input", async ({ page }) => {
  await page.goto("/components/textarea");
  const el = page.locator("textarea").first();
  const before = await el.evaluate((n) => n.getBoundingClientRect().height);
  await el.fill("line1\nline2\nline3\nline4\nline5\nline6");
  const after = await el.evaluate((n) => n.getBoundingClientRect().height);
  expect(after).toBeGreaterThan(before);
});

test("select changes value", async ({ page }) => {
  await page.goto("/components/select");
  const select = page.getByLabel("Country");
  await select.selectOption("id");
  await expect(select).toHaveValue("id");
});
