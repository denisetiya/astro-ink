import { test, expect } from "@playwright/test";

test("dialog opens, traps tab cycle, closes, restores", async ({ page }) => {
  await page.goto("/components/dialog");
  await page.locator('[data-ink-dialog="#demo"]').click();
  const panel = page.locator("#demo");
  await expect(panel).toBeVisible();
  await expect(page.locator("#demo input").first()).toBeFocused();
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press("Tab");
    const inside = await page.evaluate(() => !!document.getElementById("demo")?.contains(document.activeElement));
    expect(inside).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(page.locator('[data-ink-dialog="#demo"]')).toBeFocused();
});

test("confirm dispatches event and closes", async ({ page }) => {
  await page.goto("/components/confirm-dialog");
  await page.locator('[data-ink-dialog="#confirm-demo"]').click();
  const fired = page.waitForEvent("console", (m) => m.text().includes("confirmed"));
  await page.getByRole("button", { name: "Delete", exact: true }).click();
  await fired;
  await expect(page.locator("#confirm-demo")).toBeHidden();
});
