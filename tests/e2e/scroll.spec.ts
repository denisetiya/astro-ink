import { test, expect } from "@playwright/test";

test("scroll area scrolls overflow", async ({ page }) => {
  await page.goto("/components/scroll-area");
  const box = page.locator(".ink-scroll").first();
  const overflow = await box.evaluate((el) => el.scrollHeight - el.clientHeight);
  expect(overflow).toBeGreaterThan(0);
});

test("scroll shadow appears after scrolling", async ({ page }) => {
  await page.goto("/components/scroll-shadow");
  const box = page.locator(".ink-scrollshadow").first();
  await expect(box).toHaveAttribute("data-bottom", "true");
  await box.evaluate((el) => el.scrollTo({ top: el.scrollHeight }));
  await expect(box).toHaveAttribute("data-bottom", "false");
  await expect(box).toHaveAttribute("data-top", "true");
});

test("aspect ratio keeps shape", async ({ page }) => {
  await page.goto("/components/aspect-ratio");
  const box = await page.locator(".ink-ratio").first().boundingBox();
  const ratio = box.width / box.height;
  expect(ratio).toBeGreaterThan(1.7);
  expect(ratio).toBeLessThan(1.85);
});
