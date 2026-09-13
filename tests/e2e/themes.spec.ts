import { test, expect } from "@playwright/test";

test("midnight preset re-skins via data-theme", async ({ page }) => {
  await page.goto("/guides/theming");
  await page.getByRole("button", { name: "Preview midnight" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "midnight");
  const bg = await page.locator("body").evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(bg).not.toBe("rgb(250, 247, 242)");
});

test("brutal preset zeroes radius", async ({ page }) => {
  await page.goto("/guides/theming");
  await page.getByRole("button", { name: "Preview brutal" }).click();
  const radius = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--ink-radius-md").trim());
  expect(radius).toBe("0");
});

const NEW_THEMES = [
  { name: "forest", button: "Preview forest" },
  { name: "ocean", button: "Preview ocean" },
  { name: "ember", button: "Preview ember" },
  { name: "plum", button: "Preview plum" },
  { name: "slate", button: "Preview slate" },
] as const;

for (const { name, button } of NEW_THEMES) {
  test(`${name} preset re-skins via data-theme`, async ({ page }) => {
    await page.goto("/guides/theming");
    await page.getByRole("button", { name: button }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", name);
  });
}
