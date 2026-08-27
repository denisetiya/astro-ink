import { test, expect } from "@playwright/test";

test("drawer opens from trigger, traps focus, closes on escape", async ({ page }) => {
  await page.goto("/components/drawer");
  await page.locator('[data-ink-drawer="#demo"]').click();
  const panel = page.locator("#demo");
  await expect(panel).toBeVisible();
  await expect(page.locator("#demo input").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(page.locator('[data-ink-drawer="#demo"]')).toBeFocused();
});

test("backdrop click closes drawer", async ({ page }) => {
  await page.goto("/components/drawer");
  await page.locator('[data-ink-drawer="#demo"]').click();
  await page.locator("[data-ink-drawer-backdrop]").click({ position: { x: 10, y: 10 } });
  await expect(page.locator("#demo")).toBeHidden();
});

test("speed dial expands and collapses", async ({ page }) => {
  await page.goto("/components/speed-dial");
  const trigger = page.locator("[data-ink-speed-trigger]");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(".ink-speed__actions")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});
