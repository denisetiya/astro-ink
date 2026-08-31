import { test, expect } from "@playwright/test";

test("appshell renders header, sidebar, main landmarks", async ({ page }) => {
  await page.goto("/components/app-shell");
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("complementary")).toBeVisible();
  await expect(page.getByRole("main", { name: "Demo content" })).toBeVisible();
});

test("pageheader renders title and actions", async ({ page }) => {
  await page.goto("/components/page-header");
  await expect(page.getByRole("heading", { name: "Projects", level: 2 })).toBeVisible();
  await expect(page.getByRole("button", { name: "New project" })).toBeVisible();
});
