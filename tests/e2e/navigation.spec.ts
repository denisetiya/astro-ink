import { test, expect } from "@playwright/test";

const pages = [
  { path: "/", heading: "astro-ink" },
  { path: "/components/button", heading: "Button" },
  { path: "/components/badge", heading: "Badge" },
  { path: "/components/alert", heading: "Alert" },
  { path: "/guides/theming", heading: "Theming" },
];

test("every docs page renders with no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));

  for (const { path, heading } of pages) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.getByRole("heading", { level: 1 }), path).toHaveText(heading);
    expect(errors, path).toEqual([]);
  }
});
