import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("defaults to dark when the OS prefers dark", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("toggle switches the theme attribute", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.reload();

  const html = page.locator("html");
  const before = await html.getAttribute("data-theme");
  await page.getByRole("button", { name: "Toggle dark mode" }).click();
  const after = await html.getAttribute("data-theme");
  expect(after).not.toBe(before);
});

test("theme persists across reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.reload();
  await page.getByRole("button", { name: "Toggle dark mode" }).click();
  const chosen = await page.locator("html").getAttribute("data-theme");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", chosen!);
});

test("dark mode restyles the page background", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.reload();
  const lightBg = await page.evaluate(
    () => getComputedStyle(document.body).backgroundColor,
  );

  await page.getByRole("button", { name: "Toggle dark mode" }).click();
  const darkBg = await page.evaluate(
    () => getComputedStyle(document.body).backgroundColor,
  );

  expect(darkBg).not.toBe(lightBg);
});
