import { expect, type Page, type Locator } from '@playwright/test';

export const LOGIN_PATH = '/web/index.php/auth/login';
export const DASHBOARD_URL = /\/dashboard\/index/;
export const LOGIN_URL = /\/auth\/login/;
export const SYSTEM_USERS_URL = /\/admin\/viewSystemUsers/;

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

export async function openSystemUsers(page: Page): Promise<void> {
  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page).toHaveURL(SYSTEM_USERS_URL);
  /* The results table renders asynchronously after navigation.
     Waiting here prevents immediate queries such as count() from
     reading an empty table. */
  await expect(page.getByRole('row').first()).toBeVisible();
}

/**
 * Returns the input group that contains the given field label.
 *
 * OrangeHRM search fields have no associated label element, so a field
 * cannot be located by accessible name. Scoping by the visible label text
 * keeps the locator independent of field order and DOM position.
 */
export function fieldGroup(page: Page, label: string): Locator {
  return page.locator('.oxd-input-group').filter({
    has: page.getByText(label, { exact: true }),
  });
}

/**
 * Selects a value in an OrangeHRM dropdown identified by its field label.
 *
 * The dropdown is a custom component rather than a native select element,
 * so the control is opened first and the option is chosen by its role.
 */
export async function selectOption(page: Page, label: string, option: string): Promise<void> {
  await fieldGroup(page, label).locator('.oxd-select-text').click();
  await page.getByRole('option', { name: option, exact: true }).click();
}

export const EMPLOYEE_LIST_URL = /\/pim\/viewEmployeeList/;

/**
 * Opens PIM - Employee List through the navigation menu.
 *
 * The results table renders asynchronously, so the first row is awaited
 * before any immediate query such as count() runs.
 */
export async function openEmployeeList(page: Page): Promise<void> {
  await page.getByRole('link', { name: 'PIM' }).click();
  await expect(page).toHaveURL(EMPLOYEE_LIST_URL);
  await expect(page.getByRole('row').first()).toBeVisible();
}

