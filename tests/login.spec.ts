import { test, expect } from '@playwright/test';

const LOGIN_PATH = '/web/index.php/auth/login';

test.describe('Login and Session', () => {
  test('TC-LOGIN-001 Login Page elements are displayed', async ({ page }) => {
    await page.goto(LOGIN_PATH);

    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByText('Forgot your password?')).toBeVisible();
  });

  test('TC-LOGIN-002 Successful login with valid credentials', async ({ page }) => {
    await page.goto(LOGIN_PATH);

    await page.getByRole('textbox', { name: 'Username' }).fill(process.env.DEMO_USERNAME!);
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.DEMO_PASSWORD!);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/dashboard\/index/);
    await expect(page.getByRole('navigation', { name: 'Sidepanel' })).toBeVisible();
  });

  test('TC-LOGIN-003 Authenticated session persists after page refresh', async ({ page }) => {
    await page.goto(LOGIN_PATH);
    await page.getByRole('textbox', { name: 'Username' }).fill(process.env.DEMO_USERNAME!);
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.DEMO_PASSWORD!);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/dashboard\/index/);

    await page.reload();

    await expect(page).toHaveURL(/\/dashboard\/index/);
    await expect(page.getByRole('navigation', { name: 'Sidepanel' })).toBeVisible();
  });
});
