import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/components/alert");
});

test("non-dismissible alerts have no close button", async ({ page }) => {
  const staticAlert = page.locator(".ink-alert").first();
  await expect(staticAlert).toBeVisible();
  await expect(staticAlert.locator(".ink-alert__close")).toHaveCount(0);
});

test("dismissible alert is removed on click and fires the event", async ({ page }) => {
  await page.evaluate(() => {
    document.addEventListener("ink:alert:dismiss", (event) => {
      (event.target as HTMLElement).dataset.wasDismissed = "true";
    });
  });

  const dismissibleAlert = page.locator(".ink-alert__close").first();
  const alert = page.locator("[data-ink-alert]").filter({ has: dismissibleAlert });

  await expect(alert).toBeVisible();
  await dismissibleAlert.click();
  await expect(alert).toHaveCount(0);
});

test("close button is keyboard operable", async ({ page }) => {
  const close = page.locator(".ink-alert__close").first();
  await close.focus();
  await expect(close).toBeFocused();
  await close.press("Enter");
  const remaining = await page.locator(".ink-alert__close").count();
  expect(remaining).toBeLessThan(1);
});
