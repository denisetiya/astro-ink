import { test, expect } from "@playwright/test";

test("pagination current page marked, prev disabled on first", async ({ page }) => {
  await page.goto("/components/pagination");
  const demoCurrent = page.locator("#demo-current");
  await expect(demoCurrent.getByRole("link", { name: "Page 2", exact: true })).toHaveAttribute("aria-current", "page");
  const demoFirst = page.locator("#demo-first");
  await expect(demoFirst.locator(".ink-pagination__prev [aria-disabled]")).toBeVisible();
});

test("pagination page links navigate", async ({ page }) => {
  await page.goto("/components/pagination?page=2");
  await page.locator("#demo-nav").getByRole("link", { name: "Go to page 3", exact: true }).click();
  await expect(page).toHaveURL(/page=3/);
});

test("stepper marks current and done", async ({ page }) => {
  await page.goto("/components/stepper");
  await expect(page.locator(".ink-stepper__step").nth(2)).toHaveAttribute("aria-current", "step");
  await expect(page.locator(".ink-stepper__step").first()).toHaveAttribute("data-status", "done");
});
