import { test, expect } from "@playwright/test";

test("progress exposes value", async ({ page }) => {
  await page.goto("/components/progress");
  const bar = page.getByRole("progressbar", { name: "Upload" });
  await expect(bar).toHaveAttribute("aria-valuenow", "40");
});

test("ring clips at bounds", async ({ page }) => {
  await page.goto("/components/progress-ring");
  const ring = page.getByRole("progressbar", { name: "Sync" });
  await expect(ring).toHaveAttribute("aria-valuenow", "75");
});

test("spinner announces loading", async ({ page }) => {
  await page.goto("/components/spinner");
  await expect(page.getByRole("status", { name: /loading/i })).toBeVisible();
});
