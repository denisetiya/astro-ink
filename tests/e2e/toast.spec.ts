import { test, expect } from "@playwright/test";

test("toast appears on event and dismisses", async ({ page }) => {
  await page.goto("/components/toast");
  await page.getByRole("button", { name: "Save" }).click();
  const toast = page.locator(".ink-toast").first();
  await expect(toast).toBeVisible();
  await expect(toast).toContainText("Saved");
  await toast.locator(".ink-toast__close").click();
  await expect(page.locator(".ink-toast")).toHaveCount(0);
});

test("danger toast uses assertive region when configured", async ({ page }) => {
  await page.goto("/components/toast");
  await expect(page.getByRole("alert")).toBeAttached();
});
