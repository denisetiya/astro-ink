import { test, expect } from "@playwright/test";

test("button soft and outline apply distinct treatments", async ({ page }) => {
  await page.goto("/components/button");
  const softBorder = await page.getByRole("button", { name: "Soft" }).evaluate((el) => getComputedStyle(el).borderColor);
  const outlineBorder = await page.getByRole("button", { name: "Outline" }).evaluate((el) => getComputedStyle(el).borderColor);
  expect(softBorder).not.toBe(outlineBorder);
});

test("input sizes change control height", async ({ page }) => {
  await page.goto("/components/text-field");
  const sm = await page.locator("#size-sm").evaluate((el) => getComputedStyle(el).minHeight);
  const lg = await page.locator("#size-lg").evaluate((el) => getComputedStyle(el).minHeight);
  expect(sm).not.toBe(lg);
});

test("card horizontal stacks media and body side by side", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/components/card");
  const cols = await page.locator(".ink-card--horizontal").first().evaluate((el) => getComputedStyle(el).gridTemplateColumns);
  expect(cols.split(" ").length).toBe(2);
});

test("input group keeps addons on one row without overflow", async ({ page }) => {
  await page.goto("/components/input-group");
  const overflow = await page.locator(".ink-input-group").first().evaluate((el) => el.scrollWidth - el.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("progress tones and sizes apply", async ({ page }) => {
  await page.goto("/components/progress");
  const body = await page.locator(".ink-progress__fill--success").first().evaluate((el) => {
    const before = getComputedStyle(el).backgroundColor;
    el.className = "ink-progress__fill ink-progress__fill--warning";
    const after = getComputedStyle(el).backgroundColor;
    return { before, after };
  });
  expect(body.before).not.toBe(body.after);
});

test("tabs pill variant restyles the list", async ({ page }) => {
  await page.goto("/components/tabs");
  const radius = await page.locator(".ink-tabs--pill .ink-tabs__list").first().evaluate((el) => getComputedStyle(el).borderRadius);
  expect(radius).not.toBe("0px");
});
