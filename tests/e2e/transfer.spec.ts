import { test, expect, type Page, type Locator } from "@playwright/test";

const toolsBox = (page: Page): Locator =>
  page.locator('[data-ink-transfer][data-name="tools"]');

test("transfer moves checked items and submits chosen", async ({ page }) => {
  await page.goto("/components/transfer-list");
  const box = toolsBox(page);
  await box.getByRole("checkbox", { name: "Git" }).check();
  await box.getByRole("button", { name: "Add selected" }).click();
  await expect(box.locator(".ink-transfer__pane--available .ink-transfer__item")).toHaveCount(2);
  await expect(box.locator(".ink-transfer__pane--chosen .ink-transfer__item")).toHaveCount(1);
  await expect(box.locator('.ink-transfer__pane--chosen input[type="checkbox"][value="git"]')).toBeVisible();
  await expect(page.locator('input[type="hidden"][name="tools"]')).toHaveValue("git");
});

test("transfer filter narrows panes", async ({ page }) => {
  await page.goto("/components/transfer-list");
  await page.getByLabel("Filter available").fill("git");
  await expect(page.getByRole("checkbox", { name: "Figma" })).toBeHidden();
  await expect(page.getByRole("checkbox", { name: "Git" })).toBeVisible();
});

test("transfer remove moves items back", async ({ page }) => {
  await page.goto("/components/transfer-list");
  const box = toolsBox(page);
  await box.getByRole("checkbox", { name: "Git" }).check();
  await box.getByRole("button", { name: "Add selected" }).click();
  await box.getByRole("checkbox", { name: "Git" }).check();
  await box.getByRole("button", { name: "Remove selected" }).click();
  await expect(box.locator(".ink-transfer__pane--available .ink-transfer__item")).toHaveCount(3);
  await expect(box.locator(".ink-transfer__pane--chosen .ink-transfer__item")).toHaveCount(0);
  await expect(page.locator('input[type="hidden"][name="tools"]')).toHaveCount(0);
});
