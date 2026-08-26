import { test, expect } from "@playwright/test";

test("menu opens, arrows move, escape closes", async ({ page }) => {
  await page.goto("/components/menu");
  const trigger = page.locator("#demo-basic [data-ink-menu-trigger]");
  await trigger.click();
  await expect(page.locator("#demo-basic [data-ink-menu-list]")).toBeVisible();
  await trigger.press("ArrowDown");
  await expect(page.locator("#demo-basic [role='menuitem']").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator("#demo-basic [data-ink-menu-list]")).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("outside click closes the menu", async ({ page }) => {
  await page.goto("/components/menu");
  await page.locator("#demo-basic [data-ink-menu-trigger]").click();
  await expect(page.locator("#demo-basic [data-ink-menu-list]")).toBeVisible();
  await page.locator("h1").click({ position: { x: 4, y: 4 } });
  await expect(page.locator("#demo-basic [data-ink-menu-list]")).toBeHidden();
});

test("menubar arrows move between menus", async ({ page }) => {
  await page.goto("/components/menubar");
  await page.locator("[data-ink-menu-trigger]").first().focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("[data-ink-menu-trigger]").nth(1)).toBeFocused();
});

test("context menu opens on right click", async ({ page }) => {
  await page.goto("/components/context-menu");
  await page.locator("#demo-zone").click({ button: "right" });
  await expect(page.locator("[data-ink-context-list]")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("[data-ink-context-list]")).toBeHidden();
});
