import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/components/text-field");
});

test("accepts typed text", async ({ page }) => {
  const input = page.getByLabel("Email");
  await input.fill("denis@example.com");
  await expect(input).toHaveValue("denis@example.com");
});

test("error state sets aria-invalid and shows message", async ({ page }) => {
  const input = page.locator('input[aria-invalid="true"]');
  await expect(input).toBeVisible();
  await expect(page.locator(".ink-field__error").first()).toBeVisible();
});

test("hint is wired via aria-describedby", async ({ page }) => {
  const input = page.getByLabel("Email");
  const described = await input.getAttribute("aria-describedby");
  expect(described).toContain("email-hint");
});
