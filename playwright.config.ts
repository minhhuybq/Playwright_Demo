import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results',

  // Parallelization: every test is independent, so all tests may run in parallel.
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined, // undefined = Playwright default (half of CPU cores)
  retries: process.env.CI ? 1 : 0,
  forbidOnly: !!process.env.CI,

  timeout: 30_000,
  expect: { timeout: 7_000 },

  // Reports: console + HTML report (open with `npm run report`)
  reporter: [['list'], ['html', { outputFolder: 'reports/html', open: 'never' }]],

  use: {
    baseURL: process.env.BASE_URL ?? 'https://bequalified.de',
    locale: 'de-DE',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  // Browser compatibility: 3 desktop engines + 1 mobile device.
  // Tests tagged @mobile run only on the mobile project.
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] }, grepInvert: /@mobile/ },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] }, grepInvert: /@mobile/ },
    { name: 'webkit', use: { ...devices['Desktop Safari'] }, grepInvert: /@mobile/ },
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'] }, grep: /@mobile/ },
  ],
});
