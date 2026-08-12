import { test, expect } from '@playwright/test';
import { login, openEmployeeList, fieldGroup, selectOption } from './helpers';

/* Column order in the Employee List results table.
   Index 0 is the row selection checkbox and holds no text. */
const COL_ID = 1;
const COL_EMPLOYMENT_STATUS = 5;
const COL_FIRST_NAME = 2;

/* An ID far outside the range used by the demo data. The field accepts
   digits only, so an impossible-by-construction string cannot be used
   the way it is in the Admin module. */
const NON_EXISTING_EMPLOYEE_ID = '99999999';

test.describe('PIM - Employee List', () => {
  test('TC-PIM-001 Employee List page is displayed', async ({ page }) => {
    await login(page);

    await openEmployeeList(page);

    await expect(page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Type for hints...' }).first()).toBeVisible();
    await expect(fieldGroup(page, 'Employee Id').getByRole('textbox')).toBeVisible();
    await expect(fieldGroup(page, 'Employment Status').locator('.oxd-select-text')).toBeVisible();
    await expect(fieldGroup(page, 'Include').locator('.oxd-select-text')).toContainText('Current Employees Only');
    await expect(fieldGroup(page, 'Job Title').locator('.oxd-select-text')).toBeVisible();
    await expect(fieldGroup(page, 'Sub Unit').locator('.oxd-select-text')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible();
    await expect(page.getByRole('table')).toBeVisible();
  });

  test('TC-PIM-002 Employee search returns records matching the entered employee ID', async ({ page }) => {
    await login(page);
    await openEmployeeList(page);

    /* Employee records are more persistent than system users, so the value
       is read from the current table state as designed in the test case. */
    const firstId = await page
      .getByRole('row')
      .nth(1)
      .getByRole('cell')
      .nth(COL_ID)
      .innerText();

    await fieldGroup(page, 'Employee Id').getByRole('textbox').fill(firstId);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByRole('row').first()).toBeVisible();

    /* All ID cells are read in a single snapshot. Iterating with
       count() and nth() can fail if the table re-renders mid-loop. */
    const idValues = await page
      .getByRole('row')
      .getByRole('cell')
      .nth(COL_ID)
      .allInnerTexts();

    for (const value of idValues) {
      expect(value).toContain(firstId);
    }
  });

  test('TC-PIM-003 Employee search returns records matching the selected employment status', async ({ page }) => {
    await login(page);
    await openEmployeeList(page);

    const selectedStatus = 'Full-Time Permanent';
    await selectOption(page, 'Employment Status', selectedStatus);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByRole('row').first()).toBeVisible();

    await expect(fieldGroup(page, 'Employment Status').locator('.oxd-select-text')).toContainText(selectedStatus);

    /* No minimum row count is asserted. Most employee records in the shared
       environment have no employment status set. */
    const statusValues = await page
      .getByRole('row')
      .getByRole('cell')
      .nth(COL_EMPLOYMENT_STATUS)
      .allInnerTexts();

    for (const value of statusValues) {
      expect(value).toBe(selectedStatus);
    }
  });

  test('TC-PIM-004 Empty result is displayed for a non-existing employee value', async ({ page }) => {
    await login(page);
    await openEmployeeList(page);

    await fieldGroup(page, 'Employee Id').getByRole('textbox').fill(NON_EXISTING_EMPLOYEE_ID);
    await page.getByRole('button', { name: 'Search' }).click();

    /* The message appears both in the results area and in a toast
       notification, so each one is located within its own container. */
    await expect(page.locator('span').getByText('No Records Found')).toBeVisible();
    await expect(page.locator('#oxd-toaster_1').getByText('No Records Found')).toBeVisible();
  });

  test('TC-PIM-005 Employee Name autocomplete returns matching suggestions', async ({ page }) => {
    await login(page);
    await openEmployeeList(page);

    /* The first name is read from the current table state, so the typed
       prefix always corresponds to an existing employee. */
    const firstName = await page
      .getByRole('row')
      .nth(1)
      .getByRole('cell')
      .nth(COL_FIRST_NAME)
      .innerText();

    const employeeNameField = page.getByRole('textbox', { name: 'Type for hints...' }).first();
    await employeeNameField.fill(firstName);

    /* The autocomplete renders "Searching...." as an option while the
       request is running. Excluding loading and empty-result options makes
       this locator wait for a real employee suggestion. */
    const suggestion = page
      .getByRole('option')
      .filter({ hasNotText: /^(Searching\.*|No Records Found)$/i })
      .first();
    await expect(suggestion).toBeVisible();

    const suggestionText = (await suggestion.innerText()).trim();
    expect(suggestionText).toContain(firstName.trim());
    await suggestion.click();

    await expect(employeeNameField).toHaveValue(suggestionText);

    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByRole('row').nth(1)).toBeVisible();
  });

  test('TC-PIM-006 Reset clears the search criteria on the Employee List page', async ({ page }) => {
    await login(page);
    await openEmployeeList(page);

    await fieldGroup(page, 'Employee Id').getByRole('textbox').fill(NON_EXISTING_EMPLOYEE_ID);
    await selectOption(page, 'Employment Status', 'Full-Time Permanent');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('span').getByText('No Records Found')).toBeVisible();

    await page.getByRole('button', { name: 'Reset' }).click();

    await expect(fieldGroup(page, 'Employee Id').getByRole('textbox')).toHaveValue('');
    await expect(fieldGroup(page, 'Employment Status').locator('.oxd-select-text')).toContainText('-- Select --');
    await expect(fieldGroup(page, 'Include').locator('.oxd-select-text')).toContainText('Current Employees Only');
    await expect(page.getByRole('row').first()).toBeVisible();
  });
});
