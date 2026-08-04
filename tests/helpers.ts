import { expect, type Page } from '@playwright/test';

export const LOGIN_PATH = '/web/index.php/auth/login';
export const DASHBOARD_URL = /\/dashboard\/index/;
export const LOGIN_URL = /\/auth\/login/;

/**
 * Authenticates with the public demo credentials.
 *
 * Used as preparation only. TC-LOGIN-002 verifies the login flow itself
 * and therefore performs the steps inline instead of calling this helper.
 *
 * Each test authenticates independently because the shared environment
 * expires sessions during active use (risk R-016).
 */
export async function login(page: Page): Promise<void> {
  await page.goto(LOGIN_PATH);
  await page.getByRole('textbox', { name: 'Username' }).fill(process.env.DEMO_USERNAME!);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.DEMO_PASSWORD!);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(DASHBOARD_URL);
}

/**
 * Logs out through the user profile dropdown.
 *
 * The profile control has no stable role or accessible name,
 * so a class-based locator is used deliberately.
 */
export async function logout(page: Page): Promise<void> {
  await page.locator('.oxd-userdropdown-tab').click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
  await expect(page).toHaveURL(LOGIN_URL);
}
