import { test, expect } from '@playwright/test';
import { login, openSystemUsers, fieldGroup, selectOption } from './helpers';

/* Column order in the System Users results table. */
const COL_USERNAME = 0;
const COL_USER_ROLE = 1;
const COL_STATUS = 3;

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
      .nth(COL_USERNAME)
      .innerText();

    await fieldGroup(page, 'Username').getByRole('textbox').fill(firstUsername);
    await page.getByRole('button', { name: 'Search' }).click();

    const resultRows = page.getByRole('row');
    const rowCount = await resultRows.count();

    /* The searched value came from the same table, so a match is guaranteed.
       The number of matching rows is not asserted. */
    expect(rowCount).toBeGreaterThan(1);

    for (let i = 1; i < rowCount; i++) {
      await expect(resultRows.nth(i).getByRole('cell').nth(COL_USERNAME)).toContainText(firstUsername);
    }
  });

  test('TC-ADMIN-003 User search returns records matching the selected user role', async ({ page }) => {
    await login(page);
    await openSystemUsers(page);

    const selectedRole = 'Admin';
    await selectOption(page, 'User Role', selectedRole);
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(fieldGroup(page, 'User Role').locator('.oxd-select-text')).toContainText(selectedRole);

    /* No minimum row count is asserted. A role may have no matching
       records on a given day in the shared environment. */
    const resultRows = page.getByRole('row');
    const rowCount = await resultRows.count();

    for (let i = 1; i < rowCount; i++) {
      await expect(resultRows.nth(i).getByRole('cell').nth(COL_USER_ROLE)).toHaveText(selectedRole);
    }
  });

  test('TC-ADMIN-004 User search returns records matching the selected status', async ({ page }) => {
    await login(page);
    await openSystemUsers(page);

    const selectedStatus = 'Enabled';
    await selectOption(page, 'Status', selectedStatus);
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(fieldGroup(page, 'Status').locator('.oxd-select-text')).toContainText(selectedStatus);

    const resultRows = page.getByRole('row');
    const rowCount = await resultRows.count();

    for (let i = 1; i < rowCount; i++) {
      await expect(resultRows.nth(i).getByRole('cell').nth(COL_STATUS)).toHaveText(selectedStatus);
    }
  });
});

test('DIAG print table structure', async ({ page }) => {
    await login(page);
    await openSystemUsers(page);

    const rows = page.getByRole('row');
    const rowCount = await rows.count();
    console.log(`ROWS: ${rowCount}`);

    for (let r = 0; r < Math.min(rowCount, 3); r++) {
      const cells = rows.nth(r).getByRole('cell');
      const cellCount = await cells.count();
      console.log(`row ${r}: ${cellCount} cells`);

      for (let c = 0; c < cellCount; c++) {
        console.log(`  cell ${c}: "${await cells.nth(c).innerText()}"`);
      }
    }
  });
