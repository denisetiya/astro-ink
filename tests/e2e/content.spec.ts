import { test, expect } from "@playwright/test";

test("spoiler expands and collapses", async ({ page }) => {
  await page.goto("/components/spoiler");
  const toggle = page.locator("[data-ink-spoiler-toggle]").first();
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(toggle).toHaveText("Show less");
});

test("highlight marks query", async ({ page }) => {
  await page.goto("/components/highlight");
  await expect(page.locator(".ink-highlight mark").first()).toHaveText("ink");
});

test("statistic shows value and trend", async ({ page }) => {
  await page.goto("/components/statistic");
  await expect(page.locator(".ink-stat__value").first()).toContainText("12,408");
  await expect(page.locator(".ink-stat__trend").first()).toContainText("+8.2%");
});

test("descriptions render terms", async ({ page }) => {
  await page.goto("/components/descriptions");
  await expect(page.locator("dl dt").first()).toHaveText("Plan");
});

test("skeleton announces loading", async ({ page }) => {
  await page.goto("/components/skeleton");
  await expect(page.getByRole("status", { name: "Loading card…" })).toBeVisible();
});
