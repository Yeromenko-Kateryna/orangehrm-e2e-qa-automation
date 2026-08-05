import { test, expect } from '@playwright/test';
import { login, openSystemUsers, fieldGroup } from './helpers';

test.describe('Admin - User Management', () => {
  test('TC-ADMIN-001 System Users page is displayed', async ({ page }) => {
    await login(page);

    await openSystemUsers(page);

    await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();
    await expect(fieldGroup(page, 'Username').getByRole('textbox')).toBeVisible();
    await expect(fieldGroup(page, 'User Role').locator('.oxd-select-text')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Type for hints...' })).toBeVisible();
    await expect(fieldGroup(page, 'Status').locator('.oxd-select-text')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible();
    await expect(page.getByRole('table')).toBeVisible();
  });

  test('TC-ADMIN-002 User search returns records matching the entered username', async ({ page }) => {
    await login(page);
    await openSystemUsers(page);

    /* The value is read from the current table state because system users
       are created and deleted by other visitors (risk R-004). */
    const firstUsername = await page
      .getByRole('row')
      .nth(1)
      .getByRole('cell')
      .first()
      .innerText();

    await fieldGroup(page, 'Username').getByRole('textbox').fill(firstUsername);
    await page.getByRole('button', { name: 'Search' }).click();

    const resultRows = page.getByRole('row');
    const rowCount = await resultRows.count();

    /* The searched value came from the same table, so a match is guaranteed.
       The number of matching rows is not asserted. */
    expect(rowCount).toBeGreaterThan(1);

    for (let i = 1; i < rowCount; i++) {
      await expect(resultRows.nth(i).getByRole('cell').first()).toContainText(firstUsername);
    }
  });
});
