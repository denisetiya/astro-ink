import { test, expect } from "@playwright/test";

test("timeline lists events in order", async ({ page }) => {
  await page.goto("/components/timeline");
  const items = page.locator(".ink-timeline__item");
  expect(await items.count()).toBe(3);
  await expect(items.first()).toContainText("v0.1");
  await expect(page.locator(".ink-timeline time").first()).toHaveAttribute("datetime", "2026-09-12");
});
