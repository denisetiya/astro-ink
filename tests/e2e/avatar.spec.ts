import { test, expect } from "@playwright/test";

test("avatar shows image or fallback", async ({ page }) => {
  await page.goto("/components/avatar");
  await expect(page.getByRole("img", { name: "Ada Lovelace" })).toBeVisible();
  await expect(page.locator(".ink-avatar", { hasText: "GK" })).toBeVisible();
});

test("group caps with overflow count", async ({ page }) => {
  await page.goto("/components/avatar-group");
  await expect(page.locator(".ink-agroup__more")).toHaveText("+2");
});
