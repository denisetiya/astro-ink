import { test, expect, chromium } from "@playwright/test";
import { execFile } from "node:child_process";
import { rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROUTES = ["/", "/components/button", "/components/calendar", "/components/data-grid"];

// Pin the exact Chromium Playwright manages so the gate runs the same
// browser locally and in CI (chrome-launcher cannot discover the
// Playwright browser cache on its own).
process.env.CHROME_PATH ??= chromium.executablePath();

const CLI = join(process.cwd(), "node_modules/lighthouse/cli/index.js");

function runLighthouse(url: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    execFile(
      process.execPath,
      [
        CLI,
        url,
        "--only-categories=accessibility",
        "--chrome-flags=--headless --no-sandbox --disable-gpu",
        "--output=json",
        `--output-path=${outputPath}`,
        "--quiet",
      ],
      { timeout: 180_000 },
      (error, _stdout, stderr) => {
        if (error) {
          reject(new Error(`lighthouse failed for ${url}: ${stderr || error.message}`));
          return;
        }
        resolve();
      }
    );
  });
}

for (const route of ROUTES) {
  test(`lighthouse accessibility 100 on ${route}`, async ({ baseURL }) => {
    test.setTimeout(240_000);
    const url = `${baseURL}${route}`;
    const outputPath = join(tmpdir(), `lighthouse-a11y-${route.replaceAll("/", "-")}.json`);
    try {
      await runLighthouse(url, outputPath);
      const { default: report } = (await import(outputPath, { with: { type: "json" } })) as {
        default: {
          categories: { accessibility: { score: number } };
          audits: Record<string, { score: number | null; title: string }>;
        };
      };
      const failing = Object.entries(report.audits)
        .filter(([, audit]) => audit.score !== null && audit.score < 1)
        .map(([id, audit]) => `${id} (${audit.title})`);
      expect(failing, `failing audits on ${route}`).toEqual([]);
      expect(report.categories.accessibility.score).toBe(1);
    } finally {
      await rm(outputPath, { force: true });
    }
  });
}
