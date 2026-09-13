import { test, expect } from "@playwright/test";

test("password toggle switches visibility and label", async ({ page }) => {
  await page.goto("/components/password-input");
  const toggle = page.locator("[data-ink-password-toggle]").first();
  await toggle.click();
  await expect(page.locator("#pwd[type='text']")).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(toggle).toHaveAttribute("aria-label", "Hide password");
});

test("search clear empties the field and hides itself", async ({ page }) => {
  await page.goto("/components/search-input");
  const input = page.getByRole("searchbox", { name: "Search docs" });
  const clear = page.locator(".ink-search:has(#docs-search) [data-ink-search-clear]");
  await input.fill("query");
  await expect(clear).toBeVisible();
  await clear.click();
  await expect(input).toHaveValue("");
  await expect(clear).toBeHidden();
});

test("textarea with autosize grows on input", async ({ page }) => {  await page.goto("/components/textarea");
  const el = page.locator("textarea").first();
  const before = await el.evaluate((n) => n.getBoundingClientRect().height);
  await el.fill("line1\nline2\nline3\nline4\nline5\nline6");
  const after = await el.evaluate((n) => n.getBoundingClientRect().height);
  expect(after).toBeGreaterThan(before);
});

test("select changes value", async ({ page }) => {
  await page.goto("/components/select");
  const select = page.getByLabel("Country");
  await select.selectOption("id");
  await expect(select).toHaveValue("id");
});

test("form blocks invalid submit, fires event, focuses first invalid", async ({ page }) => {
  await page.goto("/components/form");
  await page.evaluate(() => {
    document.addEventListener("ink:form:invalid", () => {
      (document.documentElement.dataset as any).formInvalid = "true";
    });
  });
  await page.getByRole("button", { name: "Submit" }).click();
  const focused = await page.evaluate(() => document.activeElement?.getAttribute("id"));
  expect(focused).toBe("signup-name");
  const flagged = await page.evaluate(() => document.documentElement.dataset.formInvalid);
  expect(flagged).toBe("true");
});
