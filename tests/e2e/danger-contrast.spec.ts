import { test, expect } from "@playwright/test";

const THEMES = ["light", "dark", "midnight", "brutal", "forest", "ocean", "ember", "plum", "slate"] as const;

function luminance(rgb: [number, number, number]): number {
  const linear = rgb.map((channel) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(a: [number, number, number], b: [number, number, number]): number {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}

function parseRgb(value: string): [number, number, number] {
  const match = value.match(/[\d.]+/g)?.slice(0, 3).map(Number);
  if (!match || match.length !== 3) throw new Error(`cannot parse color: ${value}`);
  return match as [number, number, number];
}

for (const theme of THEMES) {
  test(`danger button text contrast passes AA in ${theme}`, async ({ page }) => {
    await page.addInitScript((value) => localStorage.setItem("ink-theme", value), theme);
    await page.goto("/components/button");
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    const colors = await page.locator(".ink-button--danger").first().evaluate((el) => {
      const style = getComputedStyle(el);
      return { fg: style.color, bg: style.backgroundColor };
    });
    const ratio = contrastRatio(parseRgb(colors.fg), parseRgb(colors.bg));
    expect(ratio, `danger contrast in ${theme}: ${colors.fg} on ${colors.bg}`).toBeGreaterThanOrEqual(4.5);
  });
}
