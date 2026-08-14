# Manual Test Cases

## Document Purpose

This document contains prioritized manual test cases derived from the confirmed read-only exploration of the public OrangeHRM demo environment.

Each test case describes observable behavior only. Expected results are based on confirmed observations recorded in `docs/exploration-log.md` and on the scope defined in `docs/test-plan.md`.

Data-dependent test cases use current-state preconditions and explicit skip conditions where a meaningful assertion cannot be made. Automation decisions are maintained separately in `docs/test-plan.md`, section 15.

## Scope and Environment Constraints

The public demo environment is shared and read-only for the purposes of this project.

The following constraints apply to every test case in this document:

* system users, employee records, leave requests and leave balances change without notice;
* exact record counts, employee names, leave balances and profile values are never used as expected results;
* the displayed date format is defined by an Admin localization setting and is not asserted as a literal string;
* the session may expire during active use, therefore each test case is kept short and self-contained;
* no test case creates, modifies or deletes shared data.

## How to Read These Test Cases

The same design decisions repeat across this document. They are listed here once instead of being explained in every case.

**Search values come from the most stable source available, not from arbitrary test data.**
Usernames and employee IDs change between sessions, so a hardcoded arbitrary value would fail even when search works correctly. Where the table content is stable enough, the value is read from the current table state during execution. Where it is not, a known permanent account is used instead. Which source applies is stated in the individual test case.

**Exact result counts are never asserted.**
The number of returned rows depends on data created and deleted by other visitors. A matching-search case still requires at least one returned row; otherwise no record was checked and the result is inconclusive rather than passed. Empty-result cases explicitly require zero matching records and the `No Records Found` state.

**Minimum-result requirements follow the test intent.**
Cases that obtain a search value from the current table require a returned match. If the record disappears before the search completes, execution is classified as affected by the shared environment. Filter cases also require a matching precondition when their purpose is to validate returned row values.

**Reset is described differently per module.**
In Admin and PIM, Reset clears the entered criteria. In Leave, Reset restores the default filter values and executes a search. These are confirmed behaviors, not inconsistencies in the document.

**Preconditions state authentication explicitly.**
Several cases require an authenticated session, and one requires the opposite. A test executed without the correct precondition proves nothing about the behavior under test.

**Expected results contain observable facts only.**
URLs, visible elements, displayed messages. Conclusions such as "the search works correctly" are not verifiable and are not used.

## Priority Definitions

| Priority | Definition |
| -------- | ---------- |
| High | Failure blocks access to the application or to an entire module |
| Medium | Failure breaks core module functionality such as search, filtering or validation |
| Low | Failure affects supporting behavior such as pagination, sorting or notifications |

## Test Case Index

| ID | Title | Priority | Type |
| -- | ----- | -------- | ---- |
| TC-LOGIN-001 | Login Page elements are displayed | High | Smoke / UI |
| TC-LOGIN-002 | Successful login with valid credentials | High | Smoke / Happy path |
| TC-LOGIN-003 | Authenticated session persists after page refresh | High | Functional / Session |
| TC-LOGIN-004 | Logout returns the user to the Login Page | High | Functional / Session |
| TC-LOGIN-005 | Protected page is not accessible after logout | High | Negative / Access control |
| TC-ADMIN-001 | System Users page is displayed | High | Smoke / UI |
| TC-ADMIN-002 | User search returns records matching the entered username | Medium | Functional / Search |
| TC-ADMIN-003 | User search returns records matching the selected user role | Medium | Functional / Search |
| TC-ADMIN-004 | User search returns records matching the selected status | Medium | Functional / Search |
| TC-ADMIN-005 | Empty result is displayed for a non-existing username | Medium | Negative / Search |
| TC-ADMIN-006 | Reset clears the search criteria on the System Users page | Medium | Functional / Search |
| TC-PIM-001 | Employee List page is displayed | High | Smoke / UI |
| TC-PIM-002 | Employee search returns records matching the entered employee ID | Medium | Functional / Search |
| TC-PIM-003 | Employee search returns records matching the selected employment status | Medium | Functional / Search |
| TC-PIM-004 | Empty result is displayed for a non-existing employee ID | Medium | Negative / Search |
| TC-PIM-005 | Employee Name autocomplete returns matching suggestions | Medium | Functional / Search |
| TC-PIM-006 | Reset clears the search criteria on the Employee List page | Medium | Functional / Search |
| TC-PIM-007 | Pagination opens the selected results page | Low | Functional / Navigation |
| TC-PIM-008 | Employee ID column sorting changes the displayed order | Low | Functional / Sorting |
| TC-LEAVE-001 | Leave List page is displayed with default filter values | High | Smoke / UI |
| TC-LEAVE-002 | Leave search is blocked without a selected leave status | Medium | Negative / Validation |
| TC-LEAVE-003 | Leave search returns records matching the selected status | Medium | Functional / Search |
| TC-LEAVE-004 | Empty result is displayed for a status without matching records | Medium | Negative / Search |
| TC-LEAVE-005 | Reset restores the default leave filter values | Medium | Functional / Search |

## 1. Login and Session

### TC-LOGIN-001 - Verify that Login Page elements are displayed

- **Priority:** High
- **Type:** Smoke / UI

#### Preconditions

- User is not authenticated.
- The application base URL is available.

#### Steps

1. Open the application base URL.

#### Expected Result

- The Login Page is displayed.
- Username field is visible.
- Password field is visible.
- `Login` button is visible.
- `Forgot your password?` link is visible.

### TC-LOGIN-002 - Verify successful login with valid credentials

- **Priority:** High
- **Type:** Smoke / Happy path

#### Preconditions

- User is not authenticated.
- The Login Page is open.
- Valid public demo credentials are available.

#### Steps

1. Enter the public demo username.
2. Enter the public demo password.
3. Click the `Login` button.

#### Expected Result

- The Dashboard is displayed.
- Page URL contains `/dashboard/index`.
- The main navigation menu is visible.

### TC-LOGIN-003 - Verify that an authenticated session persists after page refresh

- **Priority:** High
- **Type:** Functional / Session

#### Preconditions

- User is authenticated.
- The Dashboard is open.

#### Steps

1. Press `F5` to refresh the page.

#### Expected Result

- The Dashboard remains displayed.
- The user is not redirected to the Login Page.
- The main navigation menu is visible.

### TC-LOGIN-004 - Verify that logout returns the user to the Login Page

- **Priority:** High
- **Type:** Functional / Session

#### Preconditions

- User is authenticated.
- The Dashboard is open.

#### Steps

1. Click the user profile control in the top navigation bar.
2. Select `Logout`.

#### Expected Result

- The Login Page is displayed.
- Page URL contains `/auth/login`.
- Username and password fields are visible.

### TC-LOGIN-005 - Verify that a protected page is not accessible after logout

- **Priority:** High
- **Type:** Negative / Access control

#### Preconditions

- User has logged out and is not authenticated.
- The Login Page is displayed.
- The Dashboard URL is known from a previous authenticated session.

#### Steps

1. Enter the Dashboard URL in the address bar and open it in the same browser tab.

#### Expected Result

- The Dashboard is not displayed.
- The application redirects to the Login Page.
- Page URL contains `/auth/login`.
- Username and password fields are visible.

## 2. Admin - User Management

### TC-ADMIN-001 - Verify that the System Users page is displayed

- **Priority:** High
- **Type:** Smoke / UI

#### Preconditions

- User is authenticated.

#### Steps

1. Open `Admin` in the main navigation menu.
2. Open `User Management` and select `Users`.

#### Expected Result

- The System Users page is displayed.
- The search form is visible.
- Username, User Role, Employee Name and Status fields are visible.
- `Reset` and `Search` buttons are visible.
- The results table is visible.

### TC-ADMIN-002 - Verify that user search returns records matching the entered username

- **Priority:** Medium
- **Type:** Functional / Search

#### Preconditions

- User is authenticated.
- The System Users page is displayed.
- The demo administrator username is known.

#### Steps

1. Enter the demo administrator username in the `Username` field.
2. Click `Search`.

#### Expected Result

- At least one row is returned.
- The results table displays only rows where Username matches the entered value.
- The entered value remains in the `Username` field.

#### Notes

The search value is a known permanent account rather than a value read from the table. System users created by other visitors are removed within seconds, so a value read from the table may no longer exist when the search executes.

### TC-ADMIN-003 - Verify that user search returns records matching the selected user role

- **Priority:** Medium
- **Type:** Functional / Search

#### Preconditions

- User is authenticated.
- The System Users page is displayed.
- At least one `Admin` system user is available.

#### Steps

1. Select `Admin` in the `User Role` field.
2. Click `Search`.

#### Expected Result

- At least one row is returned.
- The results table displays only rows where User Role matches the selected value.
- The selected value remains in the `User Role` field.

### TC-ADMIN-004 - Verify that user search returns records matching the selected status

- **Priority:** Medium
- **Type:** Functional / Search

#### Preconditions

- User is authenticated.
- The System Users page is displayed.
- At least one `Enabled` system user is available.

#### Steps

1. Select `Enabled` in the `Status` field.
2. Click `Search`.

#### Expected Result

- At least one row is returned.
- The results table displays only rows where Status matches the selected value.
- The selected value remains in the `Status` field.

### TC-ADMIN-005 - Verify that an empty result is displayed for a non-existing username

- **Priority:** Medium
- **Type:** Negative / Search

#### Preconditions

- User is authenticated.
- The System Users page is displayed.

#### Steps

1. Enter a value that does not match any existing username in the `Username` field.
2. Click `Search`.

#### Expected Result

- `No Records Found` is displayed in the results area.
- The results table headers remain visible.
- An `Info` notification with the text `No Records Found` is displayed.

### TC-ADMIN-006 - Verify that Reset clears the search criteria on the System Users page

- **Priority:** Medium
- **Type:** Functional / Search

#### Preconditions

- User is authenticated.
- The System Users page is displayed.
- A search has been performed with at least one filter applied.

#### Steps

1. Click `Reset`.

#### Expected Result

- The `Username` field is empty.
- The `User Role` and `Status` fields return to `-- Select --`.
- The results table is displayed without the previously applied filter criteria.

## 3. PIM - Employee List

### TC-PIM-001 - Verify that the Employee List page is displayed

- **Priority:** High
- **Type:** Smoke / UI

#### Preconditions

- User is authenticated.

#### Steps

1. Open `PIM` in the main navigation menu.

#### Expected Result

- The Employee List page is displayed.
- Page URL contains `/pim/viewEmployeeList`.
- The `Employee Information` filter panel is visible.
- Employee Name, Employee Id, Employment Status, Include, Supervisor Name, Job Title and Sub Unit fields are visible.
- The `Include` field displays the default value `Current Employees Only`.
- `Reset` and `Search` buttons are visible.
- The results table is visible with the columns Id, First (& Middle) Name, Last Name, Job Title, Employment Status, Sub Unit, Supervisor and Actions.

### TC-PIM-002 - Verify that employee search returns records matching the entered employee ID

- **Priority:** Medium
- **Type:** Functional / Search

#### Preconditions

- User is authenticated.
- The Employee List page is displayed.
- The results table contains at least one record.

#### Steps

1. Note the Id value displayed in the first row of the results table.
2. Enter the noted value in the `Employee Id` field.
3. Click `Search`.

#### Expected Result

- The results table displays only rows where Id matches the entered value.
- At least one row is returned.
- The entered value remains in the `Employee Id` field.

### TC-PIM-003 - Verify that employee search returns records matching the selected employment status

- **Priority:** Medium
- **Type:** Functional / Search

#### Preconditions

- User is authenticated.
- The Employee List page is displayed.
- At least one employee with the selected employment status is available.

#### Steps

1. Select a currently available value in the `Employment Status` field that has matching employee records.
2. Click `Search`.

#### Expected Result

- At least one row is returned.
- The results table displays only rows where Employment Status matches the selected value.
- The selected value remains in the `Employment Status` field.

#### Notes

During the initial exploration the available values included `Freelance`, `Full-Time Contract`, `Full-Time Permanent`, `Full-Time Probation`, `Part-Time Contract` and `Part-Time Internship`. These lookup values are mutable in the shared environment and must be read from the current page state. If no current value has matching records, the precondition is not met and this case is blocked rather than passed.

### TC-PIM-004 - Verify that an empty result is displayed for a non-existing employee ID

- **Priority:** Medium
- **Type:** Negative / Search

#### Preconditions

- User is authenticated.
- The Employee List page is displayed.

#### Steps

1. Enter an ID that does not match any existing employee in the `Employee Id` field.
2. Click `Search`.

#### Expected Result

- `No Records Found` is displayed in the results area.
- The results table headers remain visible.
- An `Info` notification with the text `No Records Found` is displayed.

### TC-PIM-005 - Verify that Employee Name autocomplete returns matching suggestions

- **Priority:** Medium
- **Type:** Functional / Search

#### Preconditions

- User is authenticated.
- The Employee List page is displayed.
- The results table contains at least one record.

#### Steps

1. Note the First (& Middle) Name value displayed in the first row of the results table.
2. Enter the noted value in the `Employee Name` field.
3. Select a suggestion from the displayed list.
4. Click `Search`.

#### Expected Result

- A suggestion list is displayed while typing.
- The selected suggestion is placed in the `Employee Name` field; differences in repeated presentation whitespace are ignored.
- The results table displays only rows matching the selected employee.

### TC-PIM-006 - Verify that Reset clears the search criteria on the Employee List page

- **Priority:** Medium
- **Type:** Functional / Search

#### Preconditions

- User is authenticated.
- The Employee List page is displayed.
- At least one non-placeholder Employment Status option is currently configured.
- A search has been performed with Employee Id, Employment Status and Include criteria applied.

#### Steps

1. Click `Reset`.

#### Expected Result

- The `Employee Name` and `Employee Id` fields are empty.
- The `Employment Status`, `Job Title` and `Sub Unit` fields return to `-- Select --`.
- The `Include` field returns to `Current Employees Only`.
- The results table is displayed without the previously applied filter criteria.

### TC-PIM-007 - Verify that pagination opens the selected results page

- **Priority:** Low
- **Type:** Functional / Navigation

#### Preconditions

- User is authenticated.
- The Employee List page is displayed.
- The results are split across more than one page.

#### Steps

1. Record the Employee ID values displayed on the initial results page.
2. Click another numbered page button.
3. Record the Employee ID values displayed on the selected page.
4. Click the initial page number.

#### Expected Result

- After step 2 the Employee List displays a different set of Employee ID values.
- After step 4 the Employee List no longer displays the set of Employee ID values recorded on the selected page.

#### Notes

The test reads the currently available numbered page buttons and is skipped when fewer than two pages are available. Exact employee records and their order are not asserted, because the shared public demo data can change while the test is running.

### TC-PIM-008 - Verify that Employee ID column sorting changes the displayed order

- **Priority:** Low
- **Type:** Functional / Sorting

#### Preconditions

- User is authenticated.
- The Employee List page is displayed.
- The results table contains more than one record.

#### Steps

1. Note the Id value displayed in the first row of the results table.
2. Open the sorting control in the `Id` column and select ascending order.
3. Note the Id value displayed in the first row.
4. Open the sorting control in the `Id` column and select descending order.

#### Expected Result

- The results table is displayed after each sorting selection.
- The first-row Id value after descending sorting differs from the first-row Id value after ascending sorting.

#### Notes

Employee IDs appear in numeric, leading-zero and alphanumeric formats, and the intended sorting rule is not documented for the public demo. This test case verifies only that the displayed order changes. Exact ordering is not asserted and is recorded as risk R-015 in `docs/test-plan.md`.

## 4. Leave - Leave List

### TC-LEAVE-001 - Verify that the Leave List page is displayed with default filter values

- **Priority:** High
- **Type:** Smoke / UI

#### Preconditions

- User is authenticated.

#### Steps

1. Open `Leave` in the main navigation menu.

#### Expected Result

- The Leave List page is displayed.
- Page URL contains `/leave/viewLeaveList`.
- The `Leave List` filter panel is visible.
- From Date, To Date, Show Leave with Status, Leave Type, Employee Name, Sub Unit and Include Past Employees fields are visible.
- The `From Date` and `To Date` fields contain pre-filled values.
- The `Show Leave with Status` field contains a default status value.
- The `Show Leave with Status` field is marked as required.
- Results are displayed without performing a search.

### TC-LEAVE-002 - Verify that leave search is blocked without a selected leave status

- **Priority:** Medium
- **Type:** Negative / Validation

#### Preconditions

- User is authenticated.
- The Leave List page is displayed.
- The `Show Leave with Status` field contains the default status value.

#### Steps

1. Remove the status value from the `Show Leave with Status` field.
2. Click `Search`.

#### Expected Result

- `Required` is displayed below the `Show Leave with Status` field.
- The `Show Leave with Status` field is highlighted as invalid.
- The Leave List page and results table remain displayed.

### TC-LEAVE-003 - Verify that leave search returns records matching the selected status

- **Priority:** Medium
- **Type:** Functional / Search

#### Preconditions

- User is authenticated.
- The Leave List page is displayed.
- The default Leave List contains at least one result row.

#### Steps

1. Read the status from the first currently displayed result row.
2. Remove the current value from `Show Leave with Status`.
3. Select the status read in step 1.
4. Click `Search`.

#### Expected Result

- The results table displays only rows where Status matches the selected value.
- The selected value remains in the `Show Leave with Status` field.

#### Notes

The status is derived from the current table state immediately before the search. A suffix such as `(1.00)` displayed in a result cell is not part of the status name. If the default Leave List contains no result rows, the automated test is skipped because its matching-record precondition is not satisfied.

### TC-LEAVE-004 - Verify that an empty result is displayed for a status without matching records

- **Priority:** Medium
- **Type:** Negative / Search

#### Preconditions

- User is authenticated.
- The Leave List page is displayed.

#### Steps

1. Read the currently available status options.
2. Remove the current status value.
3. Select one current status and click `Search`.
4. Repeat steps 2–3 until a status without matching records is found.

#### Expected Result

- `No Records Found` is displayed in the results area.
- The results table headers remain visible.

#### Notes

The automated test identifies an empty-result candidate from the current dropdown values rather than depending on a previously observed status. It uses the completed collection response to distinguish empty and non-empty candidates, then verifies the results-area message and table headers in the UI. An informational toast was observed during exploration, but it is transient and is not part of the core expected result or an automation synchronization signal. If every current status has matching records, the test is skipped because its empty-result precondition is not satisfied.

### TC-LEAVE-005 - Verify that Reset restores the default leave filter values

- **Priority:** Medium
- **Type:** Functional / Search

#### Preconditions

- User is authenticated.
- The Leave List page is displayed.
- The default date and status values have finished loading.

#### Steps

1. Record the current default From Date, To Date and status values.
2. Remove the default status.
3. Click `Search` and confirm the required-field validation state.
4. Click `Reset`.

#### Expected Result

- The default status value is restored in the `Show Leave with Status` field.
- The `From Date` and `To Date` fields contain their pre-filled values.
- Any validation message is cleared.
- A search is executed and the results table is refreshed.

#### Notes

Reset on the Leave List restores default values and executes a leave-request search. The automated test confirms both the restored UI state and the corresponding GET request. This differs from Reset in Admin and PIM, where the criteria are cleared without executing a search.
