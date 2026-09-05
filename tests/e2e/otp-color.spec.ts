import { test, expect } from "@playwright/test";

test("otp advances, backspaces, and pastes", async ({ page }) => {
  await page.goto("/components/otp-input");
  const boxes = page.locator(".ink-otp__box");
  await boxes.nth(0).fill("1");
  await expect(boxes.nth(1)).toBeFocused();
  await expect(page.locator('input[type="hidden"][name="code"]')).toHaveValue("1");
  await boxes.nth(1).press("Backspace");
  await expect(boxes.nth(0)).toBeFocused();
  await boxes.nth(0).click();
  // paste six digits over the group
  await page.evaluate(() => {
    const first = document.querySelector(".ink-otp__box") as HTMLInputElement;
    first.focus();
    const data = new DataTransfer();
    data.setData("text/plain", "123456");
    first.dispatchEvent(new ClipboardEvent("paste", { clipboardData: data, bubbles: true }));
  });
  await expect(page.locator('input[type="hidden"][name="code"]')).toHaveValue("123456");
});

test("color picker syncs swatch to inputs", async ({ page }) => {
  await page.goto("/components/color-picker");
  await page.getByRole("button", { name: "Use color #16a34a" }).click();
  await expect(page.locator('input[name="theme-color"]')).toHaveValue("#16a34a");
  await expect(page.locator(".ink-color__native")).toHaveValue("#16a34a");
});
