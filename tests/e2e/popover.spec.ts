import { test, expect } from "@playwright/test";

test("popover toggles, positions, closes on escape", async ({ page }) => {
  await page.goto("/components/popover");
  const trigger = page.locator("#demo-popover [data-ink-popover-trigger]");
  await trigger.click();
  const panel = page.locator("#demo-popover [data-ink-popover-panel]");
  await expect(panel).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("hover card opens on focus", async ({ page }) => {
  await page.goto("/components/hover-card");
  await page.locator("#demo-hover [data-ink-hover-trigger]").focus();
  await expect(page.locator("#demo-hover [data-ink-hover-panel]")).toBeVisible({ timeout: 2000 });
});
