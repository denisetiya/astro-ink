import { test, expect } from "@playwright/test";

test("skip link jumps to main", async ({ page }) => {
  await page.goto("/components/skip-link");
  const skip = page.locator("a.docs-skip");
  await skip.focus();
  await expect(skip).toBeVisible();
  await skip.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
});

test("copy button copies and confirms", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/components/copy-button");
  await page.getByRole("button", { name: "Copy install command" }).click();
  await expect(page.getByRole("button", { name: /copied/i })).toBeVisible();
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  expect(clip).toBe("npm install astro-ink");
});
