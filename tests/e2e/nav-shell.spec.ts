import { test, expect } from "@playwright/test";

test("navbar mobile toggle expands links", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/components/navbar");
  const list = page.locator(".ink-navbar__list").first();
  await expect(list).toBeHidden();
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(list).toBeVisible();
  await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "true");
});

test("sidebar marks current and opens its group", async ({ page }) => {
  await page.goto("/components/sidebar");
  const current = page.getByRole("link", { name: "Buttons" });
  await expect(current).toHaveAttribute("aria-current", "page");
  const group = page.locator("details", { hasText: "Components" });
  await expect(group).toHaveAttribute("open", "");
});
