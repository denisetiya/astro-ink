import { test, expect } from "@playwright/test";

const pages = [
  { path: "/", heading: "astro-ink" },
  { path: "/components", heading: "Components" },
  { path: "/components/button", heading: "Button" },
  { path: "/components/badge", heading: "Badge" },
  { path: "/components/alert", heading: "Alert" },
  { path: "/components/button-group", heading: "ButtonGroup" },
  { path: "/components/checkbox", heading: "Checkbox" },
  { path: "/components/container", heading: "Container" },
  { path: "/components/field", heading: "Field" },
  { path: "/components/file", heading: "File" },
  { path: "/components/form", heading: "Form" },
  { path: "/components/input-group", heading: "InputGroup" },
  { path: "/components/number-input", heading: "NumberInput" },
  { path: "/components/password-input", heading: "PasswordInput" },
  { path: "/components/radio-group", heading: "RadioGroup" },
  { path: "/components/search-input", heading: "SearchInput" },
  { path: "/components/select", heading: "Select" },
  { path: "/components/slider", heading: "Slider" },
  { path: "/components/switch", heading: "Switch" },
  { path: "/components/text-field", heading: "TextField" },
  { path: "/components/textarea", heading: "Textarea" },
  { path: "/components/toggle-button", heading: "ToggleButton" },
  { path: "/components/visually-hidden", heading: "VisuallyHidden" },
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
