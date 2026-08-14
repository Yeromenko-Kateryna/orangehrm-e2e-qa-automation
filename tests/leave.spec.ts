import { test, expect } from '@playwright/test';
import {
  login,
  openLeaveList,
  fieldGroup,
  tableColumnTexts,
  LEAVE_LIST_URL,
  waitForGetResponse,
  responseRecordCount,
} from './helpers';

/* Column order in the Leave List results table.
   Index 0 is the row selection checkbox and holds no text. */
const COL_STATUS = 6;

test.describe('Leave - Leave List', () => {
  test('TC-LEAVE-001 Leave List page is displayed with default filter values', async ({ page }) => {
    await login(page);
    await openLeaveList(page);

    await expect(page).toHaveURL(LEAVE_LIST_URL);
    await expect(page.getByRole('heading', { name: 'Leave List' })).toBeVisible();

    const filterPanel = page.locator('.oxd-table-filter');
    const fromDateField = fieldGroup(page, 'From Date').getByRole('textbox');
    const toDateField = fieldGroup(page, 'To Date').getByRole('textbox');
    const statusField = fieldGroup(page, 'Show Leave with Status');

    await expect(filterPanel).toBeVisible();
    await expect(fromDateField).toBeVisible();
    await expect(fromDateField).not.toHaveValue('');
    await expect(toDateField).toBeVisible();
    await expect(toDateField).not.toHaveValue('');

    await expect(statusField.locator('.oxd-select-text')).toBeVisible();
    await expect(statusField.locator('.oxd-chip').first()).toBeVisible();
    await expect(fieldGroup(page, 'Leave Type').locator('.oxd-select-text')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Type for hints...' })).toBeVisible();
    await expect(fieldGroup(page, 'Sub Unit').locator('.oxd-select-text')).toBeVisible();

    await expect(filterPanel.getByText('Include Past Employees', { exact: true })).toBeVisible();
    await expect(filterPanel.getByRole('checkbox')).toBeVisible();

    await expect(page.getByText('* Required', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible();
    await expect(page.getByRole('table')).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Date' })).toBeVisible();
  });

  test('TC-LEAVE-002 Leave search is blocked without a selected leave status', async ({ page }) => {
    await login(page);
    await openLeaveList(page);

    const statusField = fieldGroup(page, 'Show Leave with Status');
    const statusChip = statusField.locator('.oxd-chip').first();
    const resultsTable = page.getByRole('table');

    await expect(statusChip).toBeVisible();
    await statusChip.locator('.oxd-icon').click();
    await expect(statusChip).toHaveCount(0);

    await page.getByRole('button', { name: 'Search' }).click();

    await expect(statusField.locator('.oxd-input-field-error-message')).toHaveText('Required');
    await expect(statusField.locator('.oxd-select-text--error')).toBeVisible();
    await expect(page).toHaveURL(LEAVE_LIST_URL);
    await expect(resultsTable).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Date' })).toBeVisible();
  });

  test('TC-LEAVE-003 Leave search returns records matching the selected status', async ({ page }) => {
    await login(page);
    await openLeaveList(page);

    const statusField = fieldGroup(page, 'Show Leave with Status');
    const dataRows = page.getByRole('row').filter({
      has: page.getByRole('cell'),
    });
    const noRecordsMessage = page.locator('span').getByText('No Records Found');

    /* Use a status from the current result set so the matching-record
       precondition is established immediately before the search. */
    await dataRows.first().waitFor({ state: 'visible', timeout: 5_000 }).catch(() => undefined);
    test.skip((await dataRows.count()) === 0, 'The default Leave List currently has no records');

    const initialStatusText = await dataRows
      .first()
      .getByRole('cell')
      .nth(COL_STATUS)
      .innerText();
    const selectedStatus = initialStatusText.replace(/\s*\([^)]*\)\s*$/, '').trim();

    const statusChip = statusField.locator('.oxd-chip').first();
    await statusChip.locator('.oxd-icon').click();
    await expect(statusChip).toHaveCount(0);

    await statusField.locator('.oxd-select-text').click();
    await page
      .locator('.oxd-select-dropdown')
      .getByRole('option', { name: selectedStatus, exact: true })
      .click();
    await page.keyboard.press('Escape');

    const searchResponsePromise = waitForGetResponse(
      page,
      '/api/v2/leave/employees/leave-requests',
    );

    await page.getByRole('button', { name: 'Search' }).click();

    const returnedRecordCount = await responseRecordCount(await searchResponsePromise);
    if (returnedRecordCount === 0) {
      await expect(noRecordsMessage).toBeVisible();
      test.skip(true, 'The matching leave record disappeared from the shared demo during the test');
    }

    await expect
      .poll(
        async () => {
          const values = await dataRows.evaluateAll(
            (rows, index) =>
              rows.map((row) => {
                const cell = row.querySelectorAll<HTMLElement>('[role="cell"]')[index];
                return cell?.innerText.trim() ?? '';
              }),
            COL_STATUS,
          );

          return values.length > 0 && values.every((value) => value.includes(selectedStatus))
            ? 'matching'
            : 'pending';
        },
        { message: `waiting for leave results filtered by ${selectedStatus}` },
      )
      .not.toBe('pending');

    await expect(statusField.locator('.oxd-chip').first()).toContainText(selectedStatus);

    const statusValues = await tableColumnTexts(page, COL_STATUS);
    for (const value of statusValues) {
      expect(value).toContain(selectedStatus);
    }
  });

  test('TC-LEAVE-004 Empty result is displayed for a status without matching records', async ({ page }) => {
    test.setTimeout(90_000);

    await login(page);
    await openLeaveList(page);

    const statusField = fieldGroup(page, 'Show Leave with Status');
    const statusChips = statusField.locator('.oxd-chip');
    const resultsMessage = page.locator('span').getByText('No Records Found');

    await statusField.locator('.oxd-select-text').click();
    const options = page.locator('.oxd-select-dropdown').getByRole('option');
    await expect(options.first()).toBeVisible();

    const statusOptions = (await options.allInnerTexts())
      .map((value) => value.trim())
      .filter(
        (value) =>
          value !== '' &&
          value !== '-- Select --' &&
          !/^(Searching\.*|No Records Found)$/i.test(value),
      );
    await page.keyboard.press('Escape');

    let emptyStatus: string | undefined;

    for (const status of statusOptions) {
      while ((await statusChips.count()) > 0) {
        await statusChips.first().locator('.oxd-icon').click();
      }

      await statusField.locator('.oxd-select-text').click();
      await page
        .locator('.oxd-select-dropdown')
        .getByRole('option', { name: status, exact: true })
        .click();
      await page.keyboard.press('Escape');

      /* Synchronize with the request triggered by Search before checking
         the UI. On a remote CI runner the response can take longer than
         the default assertion timeout, leaving the previous rows visible. */
      const searchResponsePromise = waitForGetResponse(
        page,
        '/api/v2/leave/employees/leave-requests',
      );

      await page.getByRole('button', { name: 'Search' }).click();

      const returnedRecordCount = await responseRecordCount(await searchResponsePromise);

      if (returnedRecordCount === 0) {
        emptyStatus = status;
        await expect(resultsMessage).toBeVisible();
        break;
      }
    }

    test.skip(emptyStatus === undefined, 'Every current leave status has matching records');

    await expect(statusField.locator('.oxd-chip').first()).toContainText(emptyStatus!);
    await expect(resultsMessage).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Date' })).toBeVisible();
  });

  test('TC-LEAVE-005 Reset restores the default leave filter values', async ({ page }) => {
    await login(page);
    await openLeaveList(page);

    const fromDateField = fieldGroup(page, 'From Date').getByRole('textbox');
    const toDateField = fieldGroup(page, 'To Date').getByRole('textbox');
    const statusField = fieldGroup(page, 'Show Leave with Status');
    const defaultStatusChip = statusField.locator('.oxd-chip').first();

    /* The table can become visible before the asynchronously populated
       default filters. Wait for those values before taking the snapshot. */
    await expect(fromDateField).not.toHaveValue('');
    await expect(toDateField).not.toHaveValue('');
    await expect(defaultStatusChip).toBeVisible();

    const defaultFromDate = await fromDateField.inputValue();
    const defaultToDate = await toDateField.inputValue();
    const defaultStatus = (await defaultStatusChip.innerText()).trim();

    await defaultStatusChip.locator('.oxd-icon').click();
    await expect(defaultStatusChip).toHaveCount(0);
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(statusField.locator('.oxd-input-field-error-message')).toHaveText('Required');
    await expect(statusField.locator('.oxd-select-text--error')).toBeVisible();

    const resetSearchResponse = page.waitForResponse(
      (response) =>
        response.request().method() === 'GET' &&
        response.url().includes('/api/v2/leave/employees/leave-requests'),
    );

    await page.getByRole('button', { name: 'Reset' }).click();
    await resetSearchResponse;

    await expect(fromDateField).toHaveValue(defaultFromDate);
    await expect(toDateField).toHaveValue(defaultToDate);
    await expect(statusField.locator('.oxd-chip').first()).toContainText(defaultStatus);
    await expect(statusField.locator('.oxd-input-field-error-message')).toHaveCount(0);
    await expect(statusField.locator('.oxd-select-text--error')).toHaveCount(0);
    await expect(page.getByRole('table')).toBeVisible();
  });
});
