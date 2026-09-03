import { test, expect } from "@playwright/test";

test("typography maps variants to elements", async ({ page }) => {
  await page.goto("/components/typography");
  await expect(page.locator("h2.ink-type--h2")).toBeVisible();
  await expect(page.locator("p.ink-type--body")).toBeVisible();
  await expect(page.locator("small.ink-type--caption")).toBeVisible();
});

test("blockquote cites source", async ({ page }) => {
  await page.goto("/components/blockquote");
  await expect(page.locator("blockquote footer cite")).toHaveText("Ada Lovelace");
});

test("code block copies", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/components/code-block");
  await page.getByRole("button", { name: /copy bash/i }).click();
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  expect(clip).toContain("npm install astro-ink");
});
