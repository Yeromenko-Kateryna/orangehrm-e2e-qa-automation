import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Playwright configuration for the OrangeHRM public demo.
 *
 * The target environment is shared and read-only for this project.
 * Tests must not create, modify or delete application data.
 */
export default defineConfig({
  testDir: './tests',

  /* Keep execution sequential to avoid overloading the shared public demo. */
  fullyParallel: false,

  /* Fail the build if test.only was accidentally committed. */
  forbidOnly: !!process.env.CI,

  /* Retry once in CI for diagnostics in the unstable public environment. */
  retries: process.env.CI ? 1 : 0,

  workers: 1,
  timeout: 90_000,

  reporter: 'html',

  /* The public demo can respond slowly under load. */
  expect: {
    timeout: 20_000,
  },

  use: {
    baseURL: process.env.BASE_URL,

    /* Preserve evidence for every failed test, including local runs. */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    actionTimeout: 30_000,
    navigationTimeout: 60_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
