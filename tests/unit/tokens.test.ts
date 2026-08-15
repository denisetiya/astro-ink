import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const stylesDir = join(dirname(fileURLToPath(import.meta.url)), "../../src/styles");

const tokens = readFileSync(join(stylesDir, "tokens.css"), "utf-8");
const dark = readFileSync(join(stylesDir, "themes/dark.css"), "utf-8");

const REQUIRED_TOKENS = [
  "--ink-bg",
  "--ink-surface",
  "--ink-ink",
  "--ink-muted",
  "--ink-border",
  "--ink-border-strong",
  "--ink-accent",
  "--ink-accent-ink",
  "--ink-success",
  "--ink-warning",
  "--ink-danger",
  "--ink-info",
  "--ink-font-sans",
  "--ink-font-mono",
  "--ink-text-xs",
  "--ink-text-sm",
  "--ink-text-base",
  "--ink-text-lg",
  "--ink-text-xl",
  "--ink-text-2xl",
  "--ink-leading",
  "--ink-font-weight-normal",
  "--ink-font-weight-medium",
  "--ink-font-weight-semibold",
  "--ink-font-weight-bold",
  "--ink-space-1",
  "--ink-space-2",
  "--ink-space-3",
  "--ink-space-4",
  "--ink-space-5",
  "--ink-space-6",
  "--ink-space-7",
  "--ink-space-8",
  "--ink-radius-sm",
  "--ink-radius-md",
  "--ink-radius-lg",
  "--ink-shadow-1",
  "--ink-shadow-2",
  "--ink-duration-fast",
  "--ink-duration-base",
  "--ink-ease",
  "--ink-focus-color",
];

describe("tokens.css contract", () => {
  it("defines every required token", () => {
    for (const name of REQUIRED_TOKENS) {
      expect(tokens, `missing ${name}`).toContain(name);
    }
  });

  it("scopes tokens to :root", () => {
    expect(tokens).toMatch(/:root\s*\{/);
  });

  it('scopes dark overrides to [data-theme="dark"]', () => {
    expect(dark).toMatch(/\[data-theme="dark"\]\s*\{/);
  });

  it("uses no !important", () => {
    expect(tokens).not.toContain("!important");
    expect(dark).not.toContain("!important");
  });
});
