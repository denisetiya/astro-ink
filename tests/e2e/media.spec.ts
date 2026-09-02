import { test, expect } from "@playwright/test";

test("image list lays out grid", async ({ page }) => {
  await page.goto("/components/image-list");
  const track = await page.locator(".ink-imagelist").first().evaluate((el) => getComputedStyle(el).gridTemplateColumns);
  expect(track.split(" ").length).toBe(3);
});

test("carousel advances on next", async ({ page }) => {
  await page.goto("/components/carousel");
  await page.getByRole("button", { name: "Next slide" }).click();
  await expect(page.locator(".ink-carousel__dot").nth(1)).toHaveAttribute("aria-current", "true");
});

test("carousel dots jump", async ({ page }) => {
  await page.goto("/components/carousel");
  await page.getByRole("button", { name: "Go to slide 3" }).click();
  await expect(page.locator(".ink-carousel__viewport").first()).toHaveAttribute("data-index", "2");
});
