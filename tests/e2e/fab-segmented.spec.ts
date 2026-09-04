import { test, expect } from "@playwright/test";

test("fab renders labelled action link", async ({ page }) => {
  await page.goto("/components/fab");
  await expect(page.getByRole("link", { name: "Create note" })).toHaveAttribute("href", "/components");
});

test("icon button has accessible name", async ({ page }) => {
  await page.goto("/components/icon-button");
  await expect(page.getByRole("button", { name: "Search" })).toBeVisible();
});

test("segmented arrows move selection natively", async ({ page }) => {
  await page.goto("/components/segmented-control");
  const day = page.getByRole("radio", { name: "Day" });
  await page.getByRole("radio", { name: "Week" }).check();
  await day.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("radio", { name: "Week" })).toBeChecked();
});
