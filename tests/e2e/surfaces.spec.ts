import { test, expect } from "@playwright/test";

test("paper elevations differ", async ({ page }) => {
  await page.goto("/components/paper");
  const flat = await page.locator(".ink-paper--e0").first().evaluate((el) => getComputedStyle(el).boxShadow);
  const raised = await page.locator(".ink-paper--e2").first().evaluate((el) => getComputedStyle(el).boxShadow);
  expect(flat).toBe("none");
  expect(raised).not.toBe("none");
});

test("grid lays out columns", async ({ page }) => {
  await page.goto("/components/grid");
  const track = await page.locator(".ink-grid").first().evaluate((el) => getComputedStyle(el).gridTemplateColumns);
  expect(track.split(" ").length).toBe(4);
});

test("stack direction row", async ({ page }) => {
  await page.goto("/components/stack");
  const dir = await page.locator(".ink-stack--row").first().evaluate((el) => getComputedStyle(el).flexDirection);
  expect(dir).toBe("row");
});
