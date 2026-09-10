import { test, expect } from "@playwright/test";

test("checkbox group checks two boxes natively", async ({ page }) => {
  await page.goto("/components/checkbox-group");
  await page.getByRole("checkbox", { name: "Pepperoni" }).check();
  await page.getByRole("checkbox", { name: "Olives" }).check();
  await expect(page.locator('input[name="toppings"]:checked')).toHaveCount(2);
  await expect(page.getByRole("checkbox", { name: "Mushrooms" })).not.toBeChecked();
});

test("checkbox group dispatches ink:checkboxgroup:change", async ({ page }) => {
  await page.goto("/components/checkbox-group");
  const seen = await page.evaluate(() => new Promise<string[]>((resolve) => {
    document.addEventListener("ink:checkboxgroup:change", (event) => {
      resolve((event as CustomEvent).detail.values);
    }, { once: true });
    document.querySelector<HTMLInputElement>('input[name="toppings"][value="Pepperoni"]')?.click();
  }));
  expect(seen).toContain("Pepperoni");
});
