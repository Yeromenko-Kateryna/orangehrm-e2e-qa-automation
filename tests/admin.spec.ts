import { test, expect } from '@playwright/test';
import { login, openSystemUsers, fieldGroup, selectOption } from './helpers';

/* Column order in the System Users results table.
   Index 0 is the row selection checkbox and holds no text. */
const COL_USERNAME = 1;
const COL_USER_ROLE = 2;
const COL_STATUS = 4;

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

    /* The demo administrator account is used as the search value.
       Rows read from the table itself proved unreliable: records created
       by other visitors are deleted within seconds, so the search
       returned no results before the assertions ran (risk R-004). */
    const searchedUsername = process.env.DEMO_USERNAME!;

    await fieldGroup(page, 'Username').getByRole('textbox').fill(searchedUsername);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByRole('row').first()).toBeVisible();

    /* All username cells are read in a single snapshot. Iterating with
       count() and nth() can fail if the table re-renders mid-loop. */
    const usernameValues = await page
      .getByRole('row')
      .getByRole('cell')
      .nth(COL_USERNAME)
      .allInnerTexts();

    for (const value of usernameValues) {
      expect(value).toContain(searchedUsername);
    }
  });

  test('TC-ADMIN-003 User search returns records matching the selected user role', async ({ page }) => {
    await login(page);
    await openSystemUsers(page);

    const selectedRole = 'Admin';
    await selectOption(page, 'User Role', selectedRole);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByRole('row').first()).toBeVisible();

    await expect(fieldGroup(page, 'User Role').locator('.oxd-select-text')).toContainText(selectedRole);

    /* No minimum row count is asserted. A filter value may have no matching
       records on a given day in the shared environment. */
    const roleValues = await page
      .getByRole('row')
      .getByRole('cell')
      .nth(COL_USER_ROLE)
      .allInnerTexts();

    for (const value of roleValues) {
      expect(value).toBe(selectedRole);
    }
  });

  test('TC-ADMIN-004 User search returns records matching the selected status', async ({ page }) => {
    await login(page);
    await openSystemUsers(page);

    const selectedStatus = 'Enabled';
    await selectOption(page, 'Status', selectedStatus);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByRole('row').first()).toBeVisible();

    await expect(fieldGroup(page, 'Status').locator('.oxd-select-text')).toContainText(selectedStatus);

    const statusValues = await page
      .getByRole('row')
      .getByRole('cell')
      .nth(COL_STATUS)
      .allInnerTexts();

    for (const value of statusValues) {
      expect(value).toBe(selectedStatus);
    }
  });
});
