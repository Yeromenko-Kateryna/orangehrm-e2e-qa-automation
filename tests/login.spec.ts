import { test, expect } from '@playwright/test';
import { login, logout, LOGIN_PATH, DASHBOARD_URL, LOGIN_URL } from './helpers';

test.describe('Login and Session', () => {
  test('TC-LOGIN-001 Login Page elements are displayed', async ({ page }) => {
    await page.goto(LOGIN_PATH);

    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByText('Forgot your password?')).toBeVisible();
  });

  /* The login flow is the subject of this test, so the steps stay inline
     instead of calling the login helper. */
  test('TC-LOGIN-002 Successful login with valid credentials', async ({ page }) => {
    await page.goto(LOGIN_PATH);

    await page.getByRole('textbox', { name: 'Username' }).fill(process.env.DEMO_USERNAME!);
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.DEMO_PASSWORD!);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(DASHBOARD_URL);
    await expect(page.getByRole('navigation', { name: 'Sidepanel' })).toBeVisible();
  });

  test('TC-LOGIN-003 Authenticated session persists after page refresh', async ({ page }) => {
    await login(page);

    await page.reload();

    await expect(page).toHaveURL(DASHBOARD_URL);
    await expect(page.getByRole('navigation', { name: 'Sidepanel' })).toBeVisible();
  });

  test('TC-LOGIN-004 Logout returns the user to the Login Page', async ({ page }) => {
    await login(page);

    await logout(page);

    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  });

  test('TC-LOGIN-005 Protected page is not accessible after logout', async ({ page }) => {
    await login(page);
    const protectedUrl = page.url();

    await logout(page);

    await page.goto(protectedUrl);

    await expect(page).toHaveURL(LOGIN_URL);
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  });
});
