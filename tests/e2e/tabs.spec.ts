import { test, expect } from "@playwright/test";

test("tabs switch panels on click", async ({ page }) => {
  await page.goto("/components/tabs");
  const billing = page.getByRole("tab", { name: "Billing" });
  await billing.click();
  await expect(page.getByRole("tabpanel", { name: "Billing" })).toBeVisible();
  await expect(billing).toHaveAttribute("aria-selected", "true");
});

test("arrow keys move and activate tabs", async ({ page }) => {
  await page.goto("/components/tabs");
  await page.getByRole("tab", { name: "Overview" }).click();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Billing" })).toBeFocused();
  await expect(page.getByRole("tabpanel", { name: "Billing" })).toBeVisible();
});

test("fires ink:tab:change", async ({ page }) => {
  await page.goto("/components/tabs");
  const fired = await page.evaluate(() => {
    return new Promise<string>((resolve) => {
      document.addEventListener("ink:tab:change", (e) => resolve((e as CustomEvent).detail.id), { once: true });
      document.querySelector<HTMLElement>('[role="tab"][data-tab-id="team"]')?.click();
    });
  });
  expect(fired).toBe("team");
});
