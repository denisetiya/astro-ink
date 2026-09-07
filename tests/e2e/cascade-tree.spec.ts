import { test, expect } from "@playwright/test";

test("cascader drills in and selects leaf", async ({ page }) => {
  await page.goto("/components/cascader");
  const demo = page.locator(".docs-example").first();
  await demo.getByRole("button", { name: /location/i }).click();
  await page.getByRole("button", { name: "Europe" }).first().click();
  await expect(page.getByRole("button", { name: "Berlin" }).first()).toBeVisible();
  await page.getByRole("button", { name: "Berlin" }).first().click();
  await expect(demo.locator('input[type="hidden"][name="location"]')).toHaveValue("berlin");
  await expect(demo.getByRole("button", { name: /europe.*berlin/i })).toBeVisible();
});

test("cascader keyboard selects with arrows and enter", async ({ page }) => {
  await page.goto("/components/cascader");
  await page.getByRole("button", { name: /location/i }).click();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("button", { name: "Berlin" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator('input[type="hidden"][name="location"]')).toHaveValue("berlin");
});

test("tree select expands and picks node", async ({ page }) => {
  await page.goto("/components/tree-select");
  await page.getByRole("button", { name: /team/i }).click();
  const eng = page.getByRole("treeitem", { name: "Engineering" });
  await eng.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("treeitem", { name: "Ada Lovelace" })).toBeVisible();
  await page.getByRole("treeitem", { name: "Ada Lovelace" }).click();
  await expect(page.locator('input[type="hidden"][name="team"]')).toHaveValue("ada");
});
