import { test, expect } from "@playwright/test";

test("accordion opens and announces", async ({ page }) => {
  await page.goto("/components/accordion");
  const trigger = page.locator("#demo-exclusive").getByRole("button", { name: "Shipping options" });
  await trigger.click();
  await expect(page.locator("#acc-ship-panel")).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
});

test("exclusive closes siblings", async ({ page }) => {
  await page.goto("/components/accordion");
  const scope = page.locator("#demo-exclusive");
  await scope.getByRole("button", { name: "Shipping options" }).click();
  await scope.getByRole("button", { name: "Returns" }).click();
  await expect(page.locator("#acc-ship-panel")).toBeHidden();
  await expect(page.locator("#acc-returns-panel")).toBeVisible();
});
