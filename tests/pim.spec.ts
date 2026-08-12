import { test, expect } from '@playwright/test';
import {
  login,
  openEmployeeList,
  fieldGroup,
  selectOption,
  tableColumnTexts,
  selectCurrentOption,
} from './helpers';

/* Column order in the Employee List results table.
   Index 0 is the row selection checkbox and holds no text. */
const COL_ID = 1;
const COL_FIRST_NAME = 2;
const COL_EMPLOYMENT_STATUS = 5;

/* An ID far outside the range used by the demo data. The field accepts
   digits only, so an impossible-by-construction string cannot be used
   the way it is in the Admin module. */
const NON_EXISTING_EMPLOYEE_ID = '99999999';

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

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
    await expect(fieldGroup(page, 'Employee Id').getByRole('textbox')).toHaveValue(firstId);

    /* All ID cells are read in a single snapshot. Iterating with
       count() and nth() can fail if the table re-renders mid-loop. */
    const idValues = await tableColumnTexts(page, COL_ID);

    for (const value of idValues) {
      expect(value).toContain(firstId);
    }
  });

  test('TC-PIM-003 Employee search returns records matching the selected employment status', async ({ page }) => {
    await login(page);
    await openEmployeeList(page);

    const dataRows = page.getByRole('row').filter({
      has: page.getByRole('cell'),
    });
    const noRecordsMessage = page.locator('span').getByText('No Records Found');

    let selectedStatus: string | undefined;
    const attemptedStatuses = new Set<string>();

    /* Shared lookup values and employee data can change independently.
       Read and select each candidate during the same dropdown opening, then
       continue with the current options after every Reset. */
    while (true) {
      const status = await selectCurrentOption(page, 'Employment Status', attemptedStatuses);
      if (status === undefined) {
        break;
      }
      attemptedStatuses.add(status);

      await page.getByRole('button', { name: 'Search' }).click();

      await expect
        .poll(
          async () => {
            if (await noRecordsMessage.isVisible()) {
              return 'empty';
            }

            const values = await dataRows.evaluateAll(
              (rows, index) =>
                rows.map((row) => {
                  const cell = row.querySelectorAll<HTMLElement>('[role="cell"]')[index];
                  return cell?.innerText.trim() ?? '';
                }),
              COL_EMPLOYMENT_STATUS,
            );

            return values.length > 0 && values.every((value) => value === status) ? 'matching' : 'pending';
          },
          { message: `waiting for results filtered by ${status}` },
        )
        .not.toBe('pending');

      if (!(await noRecordsMessage.isVisible())) {
        selectedStatus = status;
        break;
      }

      await page.getByRole('button', { name: 'Reset' }).click();
      await expect(fieldGroup(page, 'Employment Status').locator('.oxd-select-text')).toContainText('-- Select --');
      await expect(dataRows.first()).toBeVisible();
    }

    test.skip(selectedStatus === undefined, 'No configured Employment Status currently has matching employee records');

    const confirmedStatus = selectedStatus!;
    await expect(fieldGroup(page, 'Employment Status').locator('.oxd-select-text')).toContainText(confirmedStatus);

    const statusValues = await tableColumnTexts(page, COL_EMPLOYMENT_STATUS);
    for (const value of statusValues) {
      expect(value).toBe(confirmedStatus);
    }
  });

  test('TC-PIM-004 Empty result is displayed for a non-existing employee ID', async ({ page }) => {
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

    const suggestionText = await suggestion.innerText();
    const normalizedFirstName = normalizeWhitespace(firstName);
    const normalizedSuggestionText = normalizeWhitespace(suggestionText);
    expect(normalizedSuggestionText).toContain(normalizedFirstName);
    await suggestion.click();

    await expect
      .poll(async () => normalizeWhitespace(await employeeNameField.inputValue()))
      .toBe(normalizedSuggestionText);

    await page.getByRole('button', { name: 'Search' }).click();

    const firstNameValues = await tableColumnTexts(page, COL_FIRST_NAME);
    for (const value of firstNameValues) {
      expect(normalizeWhitespace(value)).toContain(normalizedFirstName);
    }
  });

  test('TC-PIM-006 Reset clears the search criteria on the Employee List page', async ({ page }) => {
    await login(page);
    await openEmployeeList(page);

    const availableStatus = await selectCurrentOption(page, 'Employment Status');
    test.skip(availableStatus === undefined, 'No Employment Status options are currently configured');

    await fieldGroup(page, 'Employee Id').getByRole('textbox').fill(NON_EXISTING_EMPLOYEE_ID);
    await selectOption(page, 'Include', 'Past Employees Only');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.locator('span').getByText('No Records Found')).toBeVisible();

    await page.getByRole('button', { name: 'Reset' }).click();

    await expect(fieldGroup(page, 'Employee Id').getByRole('textbox')).toHaveValue('');
    await expect(fieldGroup(page, 'Employment Status').locator('.oxd-select-text')).toContainText('-- Select --');
    await expect(fieldGroup(page, 'Include').locator('.oxd-select-text')).toContainText('Current Employees Only');
    await expect(page.getByRole('row').nth(1)).toBeVisible();
  });
});
