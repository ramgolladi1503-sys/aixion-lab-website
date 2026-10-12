import { defineConfig, devices } from "@playwright/test";

const testPort = process.env.AIXION_TEST_PORT ?? "3000";
if (!/^\d{2,5}$/.test(testPort) || Number(testPort) > 65535) {
  throw new Error("AIXION_TEST_PORT must be a valid TCP port number");
}
const testUrl = `http://127.0.0.1:${testPort}`;

export default defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  retries: 0,
  reporter: "line",
  outputDir: "test-results",
  use: {
    baseURL: testUrl,
    trace: "retain-on-failure",
  },
  webServer: {
    command: `node scripts/serve-export.mjs --port ${testPort}`,
    url: testUrl,
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1200 } },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
    },
  ],
});
