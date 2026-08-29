import { test, expect } from "@playwright/test";

test("banner dismisses", async ({ page }) => {
  await page.goto("/components/banner");
  await page.getByRole("button", { name: "Dismiss notice" }).click();
  await expect(page.locator(".ink-banner")).toHaveCount(0);
});

test("result shows status heading", async ({ page }) => {
  await page.goto("/components/result");
  await expect(page.getByRole("heading", { name: "Payment complete" })).toBeVisible();
});

test("empty state links to action", async ({ page }) => {
  await page.goto("/components/empty-state");
  await page.getByRole("link", { name: "Create project" }).click();
  await expect(page).toHaveURL(/\/components$/);
});

test("callout exposes label", async ({ page }) => {
  await page.goto("/components/callout");
  await expect(page.getByRole("region", { name: "Deprecation notice" })).toBeVisible();
});

test("loading overlay toggles", async ({ page }) => {
  await page.goto("/components/loading-overlay");
  await page.getByRole("button", { name: "Toggle loading" }).click();
  await expect(page.getByRole("status", { name: "Refreshing data…" })).toBeVisible();
});
