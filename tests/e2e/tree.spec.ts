import { test, expect } from "@playwright/test";

test("tree expands and collapses with keyboard", async ({ page }) => {
  await page.goto("/components/tree-view");
  const node = page.getByRole("treeitem", { name: "src" });
  await node.focus();
  await expect(node).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("ArrowRight");
  await expect(node).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("treeitem", { name: "Button.astro" })).toBeVisible();
  await page.keyboard.press("ArrowLeft");
  await expect(node).toHaveAttribute("aria-expanded", "false");
});

test("tree arrows move between visible nodes", async ({ page }) => {
  await page.goto("/components/tree-view");
  await page.getByRole("treeitem", { name: "src" }).focus();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("treeitem", { name: "Button.astro" })).toBeFocused();
});
