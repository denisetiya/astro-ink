import { test, expect } from "@playwright/test";

test("splitter keyboard resize", async ({ page }) => {
  await page.goto("/components/splitter");
  const handle = page.getByRole("separator", { name: "Resize panels" });
  await handle.focus();
  const before = await handle.getAttribute("aria-valuenow");
  await page.keyboard.press("ArrowRight");
  const after = await handle.getAttribute("aria-valuenow");
  expect(Number(after)).toBeGreaterThan(Number(before));
});

test("splitter drag resizes panes", async ({ page }) => {
  await page.goto("/components/splitter");
  const first = page.locator("[data-ink-split-first]").first();
  const before = await first.evaluate((el) => el.getBoundingClientRect().width);
  const handle = await page.getByRole("separator", { name: "Resize panels" }).boundingBox();
  await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2);
  await page.mouse.down();
  await page.mouse.move(handle.x + 80, handle.y + handle.height / 2, { steps: 8 });
  await page.mouse.up();
  const after = await first.evaluate((el) => el.getBoundingClientRect().width);
  expect(after).toBeGreaterThan(before + 40);
});
