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

  /* Run tests within a file in parallel. Safe here because all tests are read-only. */
  fullyParallel: true,

  /* Fail the build if test.only was accidentally committed. */
  forbidOnly: !!process.env.CI,

  /* Retry once in CI. The shared environment can expire a session mid-run. */
  retries: process.env.CI ? 1 : 0,

  /* Run sequentially. Three parallel sessions caused navigation timeouts
     against the public demo. */
  workers: 1,

  reporter: 'html',

  use: {
    baseURL: process.env.BASE_URL,

    /* Evidence for failed tests. */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    /* The public demo can respond slowly. */
    actionTimeout: 10_000,
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
