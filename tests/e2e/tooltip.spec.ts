import { test, expect } from "@playwright/test";

test("tooltip shows on focus and hides on escape", async ({ page }) => {
  await page.goto("/components/tooltip");
  const trigger = page.locator("#demo-tip [data-ink-tooltip-trigger]");
  await trigger.focus();
  const tip = page.locator("#demo-tip [data-ink-tooltip-tip]");
  await expect(tip).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-describedby", await tip.getAttribute("id"));
  await page.keyboard.press("Escape");
  await expect(tip).toBeHidden();
});
