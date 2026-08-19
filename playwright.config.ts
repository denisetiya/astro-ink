import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  webServer: {
    command: "npm run docs:build && node tests/e2e/static-server.mjs 4321 docs/dist",
    url: "http://localhost:4321",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  use: {
    baseURL: "http://localhost:4321",
  },
});
