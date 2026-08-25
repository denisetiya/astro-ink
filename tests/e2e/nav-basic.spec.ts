import { test, expect } from "@playwright/test";

test("external link opens in new tab", async ({ page }) => {
  await page.goto("/components/link");
  const ext = page.locator("a.ink-link--external").first();
  await expect(ext).toHaveAttribute("target", "_blank");
  await expect(ext).toHaveAttribute("rel", "noopener noreferrer");
});

test("breadcrumbs mark last item current", async ({ page }) => {
  await page.goto("/components/breadcrumbs");
  const nav = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect(nav.getByText("Reports", { exact: true })).toHaveAttribute("aria-current", "page");
});

test("anchor click sets hash and current", async ({ page }) => {
  await page.goto("/components/anchor");
  await page.getByRole("link", { name: "Second section" }).click();
  await expect(page).toHaveURL(/#section-2$/);
  await expect(page.getByRole("link", { name: "Second section" })).toHaveAttribute("aria-current", "true");
});
