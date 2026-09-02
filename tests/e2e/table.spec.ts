import { test, expect } from "@playwright/test";

test("table headers carry scope", async ({ page }) => {
  await page.goto("/components/table");
  const heads = page.locator("th[scope='col']");
  expect(await heads.count()).toBeGreaterThan(0);
  await expect(page.locator("table").first()).toContainText("Ada Lovelace");
});

test("sticky header sticks", async ({ page }) => {
  await page.goto("/components/table");
  const pos = await page.locator(".ink-table--sticky thead th").first().evaluate((el) => getComputedStyle(el).position);
  expect(pos).toBe("sticky");
});
