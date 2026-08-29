import { test, expect } from "@playwright/test";

const pages = [
  { path: "/", heading: "astro-ink" },
  { path: "/components", heading: "Components" },
  { path: "/components/alert", heading: "Alert" },
  { path: "/components/anchor", heading: "Anchor" },
  { path: "/components/backdrop", heading: "Backdrop" },
  { path: "/components/badge", heading: "Badge" },
  { path: "/components/banner", heading: "Banner" },
  { path: "/components/alert", heading: "Alert" },
  { path: "/components/anchor", heading: "Anchor" },
  { path: "/components/bottom-navigation", heading: "BottomNavigation" },
  { path: "/components/breadcrumbs", heading: "Breadcrumbs" },
  { path: "/components/button-group", heading: "ButtonGroup" },
  { path: "/components/checkbox", heading: "Checkbox" },
  { path: "/components/command-menu", heading: "CommandMenu" },
  { path: "/components/confirm-dialog", heading: "ConfirmDialog" },
  { path: "/components/container", heading: "Container" },
  { path: "/components/context-menu", heading: "ContextMenu" },
  { path: "/components/copy-button", heading: "CopyButton" },
  { path: "/components/dialog", heading: "Dialog" },
  { path: "/components/drawer", heading: "Drawer" },
  { path: "/components/empty-state", heading: "EmptyState" },
  { path: "/components/button-group", heading: "ButtonGroup" },
  { path: "/components/checkbox", heading: "Checkbox" },
  { path: "/components/container", heading: "Container" },
  { path: "/components/field", heading: "Field" },
  { path: "/components/file", heading: "File" },
  { path: "/components/form", heading: "Form" },
  { path: "/components/hover-card", heading: "HoverCard" },
  { path: "/components/input-group", heading: "InputGroup" },
  { path: "/components/link", heading: "Link" },
  { path: "/components/loading-overlay", heading: "LoadingOverlay" },
  { path: "/components/menu", heading: "Menu" },
  { path: "/components/menubar", heading: "Menubar" },
  { path: "/components/navigation-menu", heading: "NavigationMenu" },
  { path: "/components/navbar", heading: "Navbar" },
  { path: "/components/number-input", heading: "NumberInput" },
  { path: "/components/pagination", heading: "Pagination" },
  { path: "/components/password-input", heading: "PasswordInput" },
  { path: "/components/popover", heading: "Popover" },
  { path: "/components/progress", heading: "Progress" },
  { path: "/components/progress-ring", heading: "ProgressRing" },
  { path: "/components/radio-group", heading: "RadioGroup" },
  { path: "/components/result", heading: "Result" },
  { path: "/components/search-input", heading: "SearchInput" },
  { path: "/components/select", heading: "Select" },
  { path: "/components/sheet", heading: "Sheet" },
  { path: "/components/sidebar", heading: "Sidebar" },
  { path: "/components/skip-link", heading: "SkipLink" },
  { path: "/components/slider", heading: "Slider" },
  { path: "/components/speed-dial", heading: "SpeedDial" },
  { path: "/components/spinner", heading: "Spinner" },
  { path: "/components/stepper", heading: "Stepper" },
  { path: "/components/switch", heading: "Switch" },
  { path: "/components/tabs", heading: "Tabs" },
  { path: "/components/toast", heading: "Toast" },
  { path: "/components/tour", heading: "Tour" },
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
