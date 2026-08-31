import { test, expect } from "@playwright/test";

test("removable chip removes and fires event", async ({ page }) => {
  await page.goto("/components/chip");
  const fired = page.waitForEvent("console", (m) => m.text().includes("chip-removed"));
  await page.getByRole("button", { name: "Remove Beta" }).click();
  await fired;
  await expect(page.locator(".ink-chip", { hasText: "Beta" })).toHaveCount(0);
});

test("divider exposes separator role", async ({ page }) => {
  await page.goto("/components/divider");
  await expect(page.getByRole("separator").first()).toBeVisible();
});

test("kbd renders keys", async ({ page }) => {
  await page.goto("/components/kbd");
  await expect(page.locator("kbd.ink-kbd").first()).toBeVisible();
});
