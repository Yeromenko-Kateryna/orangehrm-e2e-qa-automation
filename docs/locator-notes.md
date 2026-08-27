# Locator Notes

## Document Purpose

This document records the locator decisions taken while automating the OrangeHRM public demo, and the reasons behind them.

It exists because several controls in the application cannot be located by their accessible role and name, and because the shared environment makes some otherwise reasonable approaches unreliable. Each deviation from the preferred strategy is listed here with its justification rather than left unexplained in the test code.

## Preferred Strategy

Locators are chosen in the following order of preference:

1. role and accessible name, for example `getByRole('button', { name: 'Search' })`;
2. visible user-facing text, scoped to a container where the text is not unique;
3. structural class names, only where no accessible alternative exists.

Positional locators such as `nth(2)` on an unscoped query are avoided, because they break when fields or columns are reordered. Column indexes into a results table are the one accepted exception and are defined as named constants.

## Locators That Work As Preferred

| Element | Locator | Note |
| ------- | ------- | ---- |
| Username and password fields | `getByRole('textbox', { name: ... })` | The Login Page fields do expose accessible names |
| Login, Search, Reset buttons | `getByRole('button', { name: ... })` | Stable across all three browsers |
| Main menu items | `getByRole('link', { name: 'Admin' })` | Sidebar navigation is correctly marked up |
| Dropdown options | `getByRole('option', { name: ... })` | Options expose the correct role once the control is opened |
| Results table | `getByRole('table')` | Used for presence checks |
| Employee Name field | `fieldGroup(page, 'Employee Name').getByRole('textbox')` | Scoped by its visible field label to avoid relying on the order of identical autocomplete inputs |
| Pagination | `getByRole('navigation', { name: 'Pagination Navigation' })` | The numbered page controls are buttons within a named navigation region |
| Leave filter panel | `page.locator('.oxd-table-filter')` | Scopes the unnamed Include Past Employees checkbox away from table-selection checkboxes |

## Deviations and Their Reasons

### Search fields have no associated labels

The visible field labels in OrangeHRM search forms are not connected to their inputs, so `getByRole('textbox', { name: 'Username' })` does not match anything on the System Users page.

Recorded locators from Playwright codegen fell back to positional selectors such as `getByRole('textbox').nth(1)` and long descendant chains, both of which break when fields are reordered.

The `fieldGroup` helper scopes to the input group that contains the visible label text:

```ts
page.locator('.oxd-input-group').filter({
  has: page.getByText(label, { exact: true }),
});
```

The locator depends on the label the user sees rather than on field order or DOM position. It uses one structural class, which is accepted because no accessible alternative exists.

### Custom dropdowns are not native select elements

`selectOption` opens the control and then chooses the option by role. A single call to a native select API is not possible, because the component renders its own markup rather than a `<select>` element.

The class `.oxd-select-text` is used to open the control. The option itself is located by role.

### Leave status is a multi-select control

`Show Leave with Status` stores each selected value as an `.oxd-chip`. The remove icon has no useful accessible name, so it is located within the chip. Unlike the single-value dropdowns, the Leave status dropdown can remain open after an option is selected; `Escape` closes it before `Search` is clicked.

```ts
const statusField = fieldGroup(page, 'Show Leave with Status');
const statusChip = statusField.locator('.oxd-chip').first();

await statusChip.locator('.oxd-icon').click();
await statusField.locator('.oxd-select-text').click();
await page
  .locator('.oxd-select-dropdown')
  .getByRole('option', { name: selectedStatus, exact: true })
  .click();
await page.keyboard.press('Escape');
```

### Include Past Employees checkbox has no accessible name

The accessibility snapshot exposes `Include Past Employees` as a paragraph followed by an unnamed checkbox. The text and checkbox are not contained in a standard `.oxd-input-group` or a shared `label`, so label-based and `fieldGroup` locators do not match.

The checkbox is scoped to the Leave filter panel. This separates it from the selection checkboxes in the results table:

```ts
const filterPanel = page.locator('.oxd-table-filter');

await expect(filterPanel.getByText('Include Past Employees', { exact: true })).toBeVisible();
await expect(filterPanel.getByRole('checkbox')).toBeVisible();
```

### Shared dropdown values cannot be treated as constants

The Employment Status options changed between two executions of the same suite. `Full-Time Permanent`, which existed during exploration and a successful Chromium run, was later absent from all three browsers. Another run showed that reopening the dropdown immediately after Reset could be ignored while the form was re-rendering. The control itself remained visible and displayed `-- Select --`.

`selectCurrentOption` therefore reads the currently configured values and selects one candidate during the same dropdown opening. The option query is scoped to the open `.oxd-select-dropdown`; a page-wide `getByRole('option')` query captured a service `No Records Found` option during a full-suite execution and incorrectly treated it as an Employment Status value.

The helper excludes the selection placeholder and asynchronous service states before choosing a candidate:

```ts
const dropdown = page.locator('.oxd-select-dropdown');
const options = dropdown.getByRole('option');

const currentValues = (await options.allInnerTexts())
  .map((value) => value.trim())
  .filter(
    (value) =>
      value !== '' &&
      value !== '-- Select --' &&
      !/^(Searching\.*|No Records Found)$/i.test(value),
  );

const selectedValue = currentValues.find((value) => !excludedOptions.has(value));
await dropdown.getByRole('option', { name: selectedValue, exact: true }).click();
```

`TC-PIM-003` tries current options until one returns matching employee records. If no configured status satisfies that data precondition, the test is skipped with an explicit reason instead of passing without checking rows or failing because of obsolete test data. `TC-PIM-006` selects any current non-placeholder status because that case verifies Reset behavior rather than a particular status.

The list is not captured and closed in advance. After each empty search and Reset, the helper opens the current dropdown, excludes already attempted values and immediately selects the next candidate. This avoids a race between an option snapshot, `Escape`, a form re-render and a later click. Because the first click can be ignored while Reset is re-rendering the form, the helper also retries opening the control once when no option appears within three seconds.

### The user profile control has no accessible name

Logout is reached through the profile dropdown in the top bar. The control exposes no role and no accessible name, so `.oxd-userdropdown-tab` is used to open it. The `Logout` item inside the menu is located by role and name.

### The empty-result message appears twice

Searching for a value with no matches displays `No Records Found` in two places: in the results area and in a toast notification. An unscoped text locator matches both and fails Playwright strict mode.

The results-area message is scoped to the element type that contains it, and the toast message is scoped to the toast container:

```ts
page.locator('span').getByText('No Records Found');
page.locator('#oxd-toaster_1').getByText('No Records Found');
```

Both assertions are retained in the deterministic Admin and PIM non-existing-value cases.

On the Leave List, `No Records Found` can already be present when the page opens and the toast can disappear before a remote CI assertion observes it. `TC-LEAVE-004` therefore uses the completed leave-request collection response to identify an empty candidate, then verifies the results-area message and table headers. The transient Leave toast remains an exploratory observation rather than a synchronization signal.

### Autocomplete options include a temporary loading state

The Employee Name autocomplete renders `Searching....` with the same `option` role used by real employee suggestions. Selecting the first option immediately after filling the field can therefore target the loading placeholder instead of an employee.

The locator excludes both non-selectable states and waits for the first real suggestion:

```ts
page
  .getByRole('option')
  .filter({ hasNotText: /^(Searching\.*|No Records Found)$/i })
  .first();
```

The suggestion text is captured before the click and compared with the value placed in the field. This verifies that autocomplete selection occurred rather than merely confirming that the typed text remained present.

The option text and the value inserted into the input can represent the same employee with different whitespace. One observed example rendered `11 22` in the option but inserted `11  22` into the field. Assertions therefore collapse consecutive whitespace and trim the compared strings:

```ts
function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}
```

Only presentation whitespace is normalized. The employee text itself must still match, and the returned table rows are checked using the same normalization.

### Two navigation regions share one role

The Dashboard contains two elements with the `navigation` role: the side panel and the top bar. Assertions target the side panel explicitly through `getByRole('navigation', { name: 'Sidepanel' })`.

### Pagination exposes a named navigation region

The Employee List pagination is exposed as `navigation` with the accessible name `Pagination Navigation`. An attempted `.oxd-pagination` container locator matched no element, while the accessibility snapshot exposed numbered buttons such as `1` and `2` inside the named navigation region:

```ts
const pagination = page.getByRole('navigation', {
  name: 'Pagination Navigation',
});

const numberedPageButtons = pagination
  .getByRole('button')
  .filter({ hasText: /^\d+$/ });
```

The active page did not expose the expected `.oxd-pagination-page-item--active` class, so the test does not depend on that internal styling hook. It records the current Employee ID column, clicks another numbered page and waits for the column snapshot to change. After clicking the initial page number, it verifies that the current column snapshot differs from the selected-page snapshot.

The returned first-page snapshot is not required to equal the original array exactly. Records and their order can change while the public demo test is running. If fewer than two numbered page buttons are available, the pagination data precondition is not satisfied and the test is skipped with an explicit reason.

## Results Table Handling

### Column indexes are offset by a selection checkbox

The first column of the System Users table is a row selection checkbox and contains no text. Column indexes are therefore:

| Column | Index |
| ------ | ----- |
| Selection checkbox | 0 |
| Username | 1 |
| User Role | 2 |
| Employee Name | 3 |
| Status | 4 |
| Actions | 5 |

The Employee List table follows the same checkbox offset:

| Column | Index |
| ------ | ----- |
| Selection checkbox | 0 |
| Id | 1 |
| First (& Middle) Name | 2 |
| Last Name | 3 |
| Job Title | 4 |
| Employment Status | 5 |
| Sub Unit | 6 |
| Supervisor | 7 |
| Actions | 8 |

The indexes were confirmed by a temporary diagnostic test that printed every cell of the first data rows, not assumed from the visible layout.

This mattered: an earlier version of the tests used index 0 for Username. The assertions read the empty checkbox cell, searched for an empty string and passed without verifying anything. A test that passes while checking nothing is more dangerous than a failing one, so column structure is confirmed rather than inferred.

### Header rows contain no cells

The header row exposes `columnheader` elements rather than `cell` elements. Queries for cells therefore return data rows only, and no offset for the header is needed.

### count() does not wait

Unlike `expect` and `innerText`, `count()` returns immediately and does not wait for elements to appear. Calling it directly after navigation returned zero rows while the table was still rendering.

Every navigation and every search is followed by an explicit wait before the table is queried:

```ts
await expect(page.getByRole('row').first()).toBeVisible();
```

### Row assertions use a single snapshot

Iterating with `count()` and `nth()` inside a loop failed when the table re-rendered between iterations: rows that existed at the start of the loop were no longer present when the assertion ran.

The `tableColumnTexts` helper first identifies every data row and then reads the requested cell from each row inside one browser-side evaluation:

```ts
const dataRows = page.getByRole('row').filter({
  has: page.getByRole('cell'),
});

await expect(dataRows.first()).toBeVisible();

const values = await dataRows.evaluateAll(
  (rows, index) =>
    rows.map((row) => {
      const cell = row.querySelectorAll<HTMLElement>('[role="cell"]')[index];
      return cell?.innerText.trim() ?? '';
    }),
  columnIndex,
);
```

Applying `nth(COL_USER_ROLE)` after combining all cells would select only one cell from the complete result set, not that column from every row. Mapping inside `evaluateAll` preserves the row-to-column relationship.

The helper waits for a data row before taking the snapshot. A matching-search test therefore cannot pass vacuously with an empty array. The comparison then runs against an in-memory array and is unaffected by later re-renders. This also replaces dozens of round trips to the browser with one.

### Leave defaults render after the table

The Leave results table can become visible before the default From Date, To Date and status chip have been populated. Capturing those values immediately produced an empty baseline even though the correct defaults appeared later.

Tests that use the defaults as a baseline explicitly wait for both date inputs to become non-empty and for the first status chip to be visible before reading their values.

### Leave Status cells include a balance suffix

A Leave Status cell can display a value such as `Pending Approval (1.00)`, while the dropdown option is `Pending Approval`. The parenthesized value is removed only when deriving the selectable status name from a current row. Assertions against returned rows retain the full cell text and require it to contain the selected status.

### Dynamic searches synchronize with collection responses

The shared demo can complete a search request before the results table or notification finishes rendering. Waiting only for a toast or for old rows to change produced intermittent `pending` timeouts in CI.

The PIM and Leave data-dependent searches therefore create a response wait immediately before clicking `Search`. The returned collection length is used only to distinguish an empty response from a non-empty response. The corresponding UI state is still asserted afterward: matching rows for positive searches, or `No Records Found` and visible table headers for an empty search.

For `TC-LEAVE-004`, non-empty status candidates do not require a complete table-render assertion because their only purpose is to locate a current empty-result candidate. Matching-row behavior is covered independently by `TC-LEAVE-003`.

### Validation tests avoid snapshots taken before asynchronous table rendering

The Leave table can be visible before its headers and rows finish rendering. An early full-text snapshot can therefore be empty and later differ even when client-side validation correctly blocks a search. `TC-LEAVE-002` verifies the required-field message, invalid control state, unchanged Leave List URL and continued presence of the results table and headers instead of comparing a premature table-text snapshot.

## Test Data Sources

Search values are taken from the most stable source available for each case.

| Source | Used when | Example |
| ------ | --------- | ------- |
| Known permanent account | The searched record must still exist when the search runs | The demo administrator account in TC-ADMIN-002 |
| Fixed dropdown value | The value is part of the application configuration | `Admin`, `Enabled` |
| Current employee table state | The value is used immediately and a matching record is required | Employee ID and first name in TC-PIM-002 and TC-PIM-005 |
| Current Leave table state | A status with at least one matching record is required | Status in TC-LEAVE-003 |
| Current Leave status options | An empty-result candidate must reflect the current configuration | Status candidates in TC-LEAVE-004 |
| Deliberately unmatchable string | An empty result is required | `zzz-no-such-user-zzz` |

System-user values read from the results table were tried first but proved unreliable: accounts created by other visitors are removed within seconds, and the search returned no results before the assertions ran. Employee-table values are used only where the matching record is required and the value is submitted immediately.

Specific employee names, record counts and leave balances are never used as expected values. `TC-LEAVE-003` is skipped when the default Leave List has no current row from which to establish its matching-record precondition. `TC-LEAVE-004` is skipped when every current status has matching records.
