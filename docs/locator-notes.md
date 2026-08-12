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
| Employee Name field | `getByRole('textbox', { name: 'Type for hints...' })` | Located by its placeholder, which is stable |

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

### Shared dropdown values cannot be treated as constants

The Employment Status options changed between two executions of the same suite. `Full-Time Permanent`, which existed during exploration and a successful Chromium run, was later absent from all three browsers. Another run showed that reopening the dropdown immediately after Reset could be ignored while the form was re-rendering. The control itself remained visible and displayed `-- Select --`.

`selectCurrentOption` therefore reads the currently configured values, excludes the `-- Select --` placeholder and selects one candidate during the same dropdown opening:

```ts
const currentValues = (await page.getByRole('option').allInnerTexts())
  .map((value) => value.trim())
  .filter((value) => value !== '' && value !== '-- Select --');

const selectedValue = currentValues.find((value) => !excludedOptions.has(value));
await page.getByRole('option', { name: selectedValue, exact: true }).click();
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

Both assertions are kept, because the test case verifies both presentations.

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

## Test Data Sources

Search values are taken from the most stable source available for each case.

| Source | Used when | Example |
| ------ | --------- | ------- |
| Known permanent account | The searched record must still exist when the search runs | The demo administrator account in TC-ADMIN-002 |
| Fixed dropdown value | The value is part of the application configuration | `Admin`, `Enabled` |
| Current employee table state | The value is used immediately and a matching record is required | Employee ID and first name in TC-PIM-002 and TC-PIM-005 |
| Deliberately unmatchable string | An empty result is required | `zzz-no-such-user-zzz` |

System-user values read from the results table were tried first but proved unreliable: accounts created by other visitors are removed within seconds, and the search returned no results before the assertions ran. Employee-table values are used only where the matching record is required and the value is submitted immediately.

Specific employee names, record counts and leave balances are never used as expected values.
