# OrangeHRM Read-Only Exploration Log

## 1. Session Information

| Parameter                           | Confirmed Value                                                      |
| ----------------------------------- | -------------------------------------------------------------------- |
| Exploration Date and Time           | `28.07.2026, 17:10`                                                  |
| Environment URL                     | `https://opensource-demo.orangehrmlive.com/`                         |
| Initial URL                         | `https://opensource-demo.orangehrmlive.com/web/index.php/auth/login` |
| Application Version                 | `OrangeHRM OS 5.9`                                                   |
| Browser                             | Google Chrome `150.0.7871.187`, 64-bit                               |
| Operating System                    | Windows                                                              |
| Exploration Mode                    | Read-only except for authentication, page refresh and logout         |
| Test Account                        | Public administrator account displayed on the Login Page             |
| Login Successful                    | Yes                                                                  |
| Credentials Displayed on Login Page | Yes                                                                  |

## 2. Exploration Charter

### Objective

Perform an initial read-only exploration to:

* identify the Login Page structure;
* confirm that the public credentials allow authentication;
* identify the authenticated landing page;
* record the visible application modules;
* review the main Dashboard structure;
* check whether the session remains active after page refresh;
* verify the visible logout flow;
* identify environment risks and open questions.

### Restrictions

The following actions were excluded from this session:

* creating, editing or deleting employees;
* creating users or changing credentials;
* changing administrative configuration;
* submitting leave requests;
* approving or rejecting existing leave requests;
* modifying records belonging to unknown users.

## 3. Login Page

| Item                      | Observation                                                     | Status        |
| ------------------------- | --------------------------------------------------------------- | ------------- |
| Page identity             | OrangeHRM logo and `Login` heading are displayed                | Confirmed     |
| Username field            | Field with the `Username` placeholder is displayed              | Confirmed     |
| Password field            | Field with the `Password` placeholder is displayed              | Confirmed     |
| Login button              | Orange `Login` button is displayed                              | Confirmed     |
| Additional link           | `Forgot your password?` link is displayed                       | Confirmed     |
| Public credentials        | Username and password are displayed on the Login Page           | Confirmed     |
| Required-field indicators | Required-field asterisks are not visible before form submission | Confirmed     |
| Footer version            | `OrangeHRM OS 5.9` is displayed                                 | Confirmed     |
| Footer content            | Copyright information and social links are displayed            | Confirmed     |
| Loading state             | No loading state was recorded during this session               | Open Question |

The public password is intentionally not recorded in the repository documentation.

## 4. Successful Login

| Item                     | Observation                                                               | Status    |
| ------------------------ | ------------------------------------------------------------------------- | --------- |
| Credentials used         | Public credentials displayed on the Login Page                            | Confirmed |
| Login result             | Authentication completed successfully                                     | Confirmed |
| Final URL                | `https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index` | Confirmed |
| Opened page              | Dashboard                                                                 | Confirmed |
| Visible page heading     | `Dashboard`                                                               | Confirmed |
| Visible user information | Avatar and account display name `Yuvi sliva` were visible during this session | Confirmed |
| Visible errors           | No visible errors were observed                                           | Confirmed |

The displayed account name is a time-bound UI observation in a public demo environment. It must not be used as stable test data or as an assertion value.

## 5. Application Structure

| Order | Module      | Observation                           | Status    |
| ----: | ----------- | ------------------------------------- | --------- |
|     1 | Admin       | Displayed in the left navigation menu | Confirmed |
|     2 | PIM         | Displayed in the left navigation menu | Confirmed |
|     3 | Leave       | Displayed in the left navigation menu | Confirmed |
|     4 | Time        | Displayed in the left navigation menu | Confirmed |
|     5 | Recruitment | Displayed in the left navigation menu | Confirmed |
|     6 | My Info     | Displayed in the left navigation menu | Confirmed |
|     7 | Performance | Displayed in the left navigation menu | Confirmed |
|     8 | Dashboard   | Displayed as the active module        | Confirmed |
|     9 | Directory   | Displayed in the left navigation menu | Confirmed |
|    10 | Maintenance | Displayed in the left navigation menu | Confirmed |
|    11 | Claim       | Displayed in the left navigation menu | Confirmed |
|    12 | Buzz        | Displayed in the left navigation menu | Confirmed |

`Search` is a navigation-menu search field and is not a separate application module.

## 6. Dashboard

### Visible Elements

| Item                              | Observation                                           | Status    |
| --------------------------------- | ----------------------------------------------------- | --------- |
| Page heading                      | `Dashboard` is displayed                              | Confirmed |
| Menu search                       | Search field is displayed in the left navigation menu | Confirmed |
| Menu collapse control             | Orange collapse control with an arrow is displayed    | Confirmed |
| Time at Work                      | Widget is displayed                                   | Confirmed |
| My Actions                        | Widget is displayed                                   | Confirmed |
| Quick Launch                      | Widget is displayed                                   | Confirmed |
| Buzz Latest Posts                 | Widget is displayed                                   | Confirmed |
| Employees on Leave Today          | Widget is displayed                                   | Confirmed |
| Employee Distribution by Sub Unit | Widget is displayed                                   | Confirmed |
| Errors                            | No visible errors were observed                       | Confirmed |

### Quick Launch Actions

| Action       | Visibility | Status    |
| ------------ | ---------- | --------- |
| Assign Leave | Displayed  | Confirmed |
| Leave List   | Displayed  | Confirmed |
| Timesheets   | Displayed  | Confirmed |
| Apply Leave  | Displayed  | Confirmed |
| My Leave     | Displayed  | Confirmed |
| My Timesheet | Displayed  | Confirmed |

The Quick Launch actions were identified visually but were not opened during this exploration session.

### User Dropdown

| Option          | Visibility | Status    |
| --------------- | ---------- | --------- |
| About           | Displayed  | Confirmed |
| Support         | Displayed  | Confirmed |
| Change Password | Displayed  | Confirmed |
| Logout          | Displayed  | Confirmed |

## 7. Session After Refresh

| Item                 | Observation                         | Status    |
| -------------------- | ----------------------------------- | --------- |
| Refresh action       | Dashboard was refreshed using `F5`  | Confirmed |
| Authentication state | The user remained authenticated     | Confirmed |
| Page after refresh   | Dashboard loaded again              | Confirmed |
| URL after refresh    | `/web/index.php/dashboard/index`    | Confirmed |
| Main navigation      | Main navigation was displayed again | Confirmed |
| Visible errors       | No visible errors were observed     | Confirmed |

## 8. Logout

| Item                              | Observation                                                          | Status        |
| --------------------------------- | -------------------------------------------------------------------- | ------------- |
| Logout location                   | User dropdown → `Logout`                                             | Confirmed     |
| Logout result                     | Logout completed successfully                                        | Confirmed     |
| Final URL                         | `https://opensource-demo.orangehrmlive.com/web/index.php/auth/login` | Confirmed     |
| Final page                        | Login Page was displayed                                             | Confirmed     |
| Dashboard on current page         | Dashboard was no longer displayed                                    | Confirmed     |
| Direct protected URL after logout | Not tested during this session                                       | Open Question |

Returning to the Login Page confirms the visible logout flow. It does not yet prove that direct access to every protected page is blocked after logout.

## 9. Navigation Overview

| Module | Accessible | Landing Page | Observed Purpose | Notes |
| ------ | ---------- | ------------ | ---------------- | ----- |
| Admin | Confirmed | User Management → Users | System-user search and filtering | Read-only exploration completed with environment limitations |
| PIM | Confirmed | Employee List | Employee search, filtering, sorting and pagination | Read-only exploration completed; data modification was excluded |
| Leave | Not tested | Not recorded | Requires exploration | Planned read-only exploration |

A module being visible in the navigation menu does not by itself confirm that its landing page and all functions are accessible.

## 10. PIM → Employee List

### Page Structure

| Item | Observation | Status |
| ---- | ----------- | ------ |
| Landing page | `Employee List` opened after selecting `PIM` | Confirmed |
| Additional navigation | `Configuration`, `Add Employee` and `Reports` were displayed | Confirmed |
| Filter section | `Employee Information` was displayed | Confirmed |
| Available filters | Employee Name, Employee Id, Employment Status, Include, Supervisor Name, Job Title and Sub Unit | Confirmed |
| Main actions | `Reset`, `Search` and `Add` buttons were displayed | Confirmed |
| Table | Employee records were displayed | Confirmed |
| Table columns | Id, First (& Middle) Name, Last Name, Job Title, Employment Status, Sub Unit, Supervisor and Actions | Confirmed |
| Row actions | Edit and Delete controls were displayed but not used | Confirmed |
| Data modification | No employee records were created, edited or deleted | Confirmed |

### Search and Filtering

| Check | Observation | Status |
| ----- | ----------- | ------ |
| Search by visible Employee Id | A currently displayed ID was entered, and the returned record matched that ID | Confirmed |
| Employee Name autocomplete | Suggestions appeared after entering a partial employee name | Confirmed |
| Search by selected employee name | Selecting an autocomplete suggestion returned a matching employee record | Confirmed |
| Non-existing Employee Id | `No Records Found` was displayed for a deliberately non-existing ID | Confirmed |
| Reset after successful search | The entered criteria were cleared and the employee list returned | Confirmed |
| Reset after empty result | The entered criteria and empty state were cleared, and the employee list returned | Confirmed |
| Employment Status filter | Every displayed result matched `Full-Time Contract` | Confirmed |
| Combined filters | A result matching both `Full-Time Contract` and `QA Engineer` was returned | Confirmed |
| Job Title filter | Every displayed result matched `QA Engineer` when that filter was used independently | Confirmed |
| Sub Unit filter | Every displayed result matched `Quality Assurance` | Confirmed |
| Include filter | `Past Employees Only` returned `No Records Found` in the observed environment state | Confirmed |

Exact record counts and employee identities were treated as time-bound observations and are not stable expected results.

### Filter Options Observed

#### Employment Status

* `Freelance`
* `Full-Time Contract`
* `Full-Time Permanent`
* `Full-Time Probation`
* `Part-Time Contract`
* `Part-Time Internship`

#### Include

* `Current Employees Only`
* `Current and Past Employees`
* `Past Employees Only`

#### Sub Unit

The `Sub Unit` filter displayed a hierarchical organization structure, including:

* OrangeHRM;
* Administration;
* Engineering;
* Development;
* Quality Assurance;
* TechOps;
* Sales & Marketing;
* Sales;
* Marketing;
* Client Services;
* Technical Support;
* Finance;
* Human Resources.

Additional user-created values were visible in the public environment. They were treated as unstable demo data and not as application defects.

### Supervisor Name Autocomplete

A supervisor value displayed in the employee table was entered into the `Supervisor Name` field.

Both partial and full input resulted in:

* no selectable autocomplete suggestion;
* a red validation state;
* the message `Invalid`.

This was recorded as an environment inconsistency or product-risk observation, not as a confirmed defect. The public data changed during the session, and the continued availability of that supervisor as a valid filter option could not be established.

### Pagination

| Check | Observation | Status |
| ----- | ----------- | ------ |
| Direct page selection | Selecting page `2` updated the active page and displayed employee records | Confirmed |
| Subsequent page | Selecting page `3` updated the active page and displayed employee records | Confirmed |
| Previous-page navigation | The previous-page control returned the list from page `3` to page `2` | Confirmed |
| Table structure | Table columns remained available during navigation | Confirmed |
| Visible errors | No visible pagination errors were observed | Confirmed |

### Sorting

| Check | Observation | Status |
| ----- | ----------- | ------ |
| ID ascending | Selecting `Ascending` reordered the visible ID values | Confirmed |
| ID descending | Selecting `Descending` reordered the visible ID values | Confirmed |
| Observed comparison | IDs appeared to be ordered lexicographically rather than numerically | Observation |
| Mixed ID formats | Numeric, leading-zero and alphanumeric IDs were processed without a visible error | Confirmed |

Lexicographical ordering was not classified as a defect because employee identifiers may be stored and compared as text.

### PIM Exploration Result

**Status: Completed for Employee List read-only coverage**

The exploration covered:

* page structure;
* searches by current-state employee data;
* autocomplete behavior;
* independent and combined filters;
* empty results;
* reset behavior;
* pagination;
* ID sorting.

Employee creation, editing, deletion and other data-changing PIM functions remained outside the authorized exploration scope.

No product defect was confirmed. The `Supervisor Name` autocomplete behavior remains a risk requiring reproduction in a controlled environment.

## 11. Confirmed Observations

* Public credentials are displayed on the Login Page.
* The displayed public credentials allow successful login.
* Successful login opens the Dashboard.
* Twelve main application modules are displayed in the navigation menu.
* Dashboard widgets and Quick Launch actions are visible.
* The authenticated session remains active after an `F5` refresh.
* Logout returns the user to the Login Page.
* No visible application errors were observed during the initial exploration.
* Admin → User Management → Users is accessible.
* Username, User Role and Status filters were exercised.
* Reset cleared the selected search criteria.
* `No Records Found` was displayed for an empty result.
* System-user data and displayed profile information changed between sessions.
* PIM → Employee List is accessible.
* Employee searches by visible current-state ID and selected autocomplete value returned matching results.
* Employment Status, Job Title, Sub Unit and Include filters were exercised.
* Combined Employment Status and Job Title filtering returned a matching result.
* Reset restored the employee list after both successful and empty searches.
* Employee List pagination supported direct page selection and previous-page navigation.
* The Id column supported ascending and descending sorting.
* PIM record counts and displayed employee data changed during exploration.
* A displayed supervisor value could not be selected through the Supervisor Name autocomplete.

## 12. Assumptions

The following statements are assumptions and are not yet confirmed:

* the public demo may use shared data;
* the observed data changes may have been caused by other visitors or an environment reset;
* demo data may be periodically reset;
* Dashboard content may change between sessions;
* created records may persist temporarily or may disappear after a reset.

These assumptions must not be presented as confirmed application behavior.

## 13. Environment Limitations and Risks

| ID      | Limitation or Risk                               | Possible Impact                                      | Current Response                               |
| ------- | ------------------------------------------------ | ---------------------------------------------------- | ---------------------------------------------- |
| ENV-001 | The public account is available to all visitors, and application data changed during exploration | Tests may observe different data between steps or executions | Use current-state data and avoid exact record-count assertions |
| ENV-002 | Data ownership is unknown                        | Existing records may belong to other visitors        | Do not edit or delete unknown records          |
| ENV-003 | Reset schedule is unknown                        | Created data may disappear between sessions          | Validate preconditions before execution        |
| ENV-004 | Dashboard data may be dynamic                    | Exact values may be unsuitable for stable assertions | Prefer structural observations                 |
| ENV-005 | Environment availability is uncontrolled         | Testing may be blocked by downtime or slow loading   | Record time, evidence and retry conditions     |
| ENV-006 | Only one public role is currently confirmed      | Authorization coverage may be limited                | Document the coverage limitation               |
| ENV-007 | Displayed profile identity and UI styling changed between sessions | Assertions based on a specific profile or visual theme may be unstable | Assert stable structure instead of profile values or theme colors |
| ENV-008 | Public authentication produced an isolated `Invalid credentials` result | Test execution may be temporarily blocked | Capture evidence and verify reproducibility before reporting a defect |

## 14. Open Questions

* Do all visitors use the same database?
* How frequently is the public demo data reset?
* Do created records persist between independent sessions?
* Does a protected Dashboard URL redirect to the Login Page after logout?
* How does the application display loading states?
* How does the application behave during slow or failed requests?
* Which Admin functions require data modification and therefore cannot be safely tested in the public environment?
* Which actions can be explored without changing shared data?
* Which form fields are required?
* Which validation messages and business rules are implemented?
* Is more than one user role available for authorized testing?
* Which functions are accessible in Leave?
* Can the Supervisor Name autocomplete inconsistency be reproduced in a controlled environment with stable test data?
* How are empty search results displayed in Leave?

## 15. Potentially Unsafe Actions

The following actions require a confirmed test-data and cleanup strategy before execution:

* creating, editing or deleting employees;
* creating users;
* changing passwords or account roles;
* changing administrative settings;
* modifying existing leave requests;
* approving or rejecting requests;
* editing records not created by this project.

## 16. Initial Exploration Result

**Status: Completed**

The exploration objectives for Login Page identification, successful login, Dashboard overview, refresh behavior and visible logout were completed.

No product defect was confirmed during this session.

The following item remains open:

* verify access control by opening a protected Dashboard URL after logout and confirming whether the application redirects to the Login Page.

## 17. Next Exploration Activities

The next read-only session will cover:

1. Leave module structure;
2. Leave searches and filters;
3. Leave tables, pagination and empty states;
4. visible forms and validation indicators that can be inspected without submission;
5. relationships between PIM employee data and Leave records.

Each future session must record:

* date and time;
* objective;
* starting state;
* visited page and URL;
* visible controls;
* confirmed behavior;
* assumptions;
* open questions;
* risks;
* actions intentionally not performed.

## 18. Admin Module Read-Only Exploration

### Session Scope

| Parameter | Value |
| --- | --- |
| Exploration Dates | `29–30.07.2026` |
| Module | Admin |
| Page | User Management → Users |
| Exploration Mode | Read-only searches, filters and Reset |
| Data Modification | No records were created, edited or deleted |

### System Users Page

| Item | Observation | Status |
| --- | --- | --- |
| Page heading | `System Users` was displayed | Confirmed |
| Username filter | Displayed | Confirmed |
| User Role filter | Displayed | Confirmed |
| Employee Name filter | Displayed | Confirmed |
| Status filter | Displayed | Confirmed |
| Search button | Displayed and used | Confirmed |
| Reset button | Displayed and used | Confirmed |
| Add button | Displayed but not used | Confirmed |
| Results table | Displayed | Confirmed |
| Table columns | Username, User Role, Employee Name, Status and Actions | Confirmed |
| Row actions | Edit and delete controls were visible but not used | Confirmed |

### Username Search

| Item | Observation | Status |
| --- | --- | --- |
| Search value | A username was taken from a currently visible table row | Confirmed |
| Search result | One matching record was returned during the successful execution | Confirmed |
| Matching behavior | The returned row contained the searched username | Confirmed |
| Earlier execution | An earlier search returned `No Records Found`, but the result was not reproduced | Environment Observation |
| Defect status | No product defect was confirmed | Confirmed |

A username from the current table state was used because individual records in the public demo were not stable between executions.

### User Role Filter

| Item | Observation | Status |
| --- | --- | --- |
| Available roles | `Admin` and `ESS` | Confirmed |
| Selected role | `ESS` | Confirmed |
| Result | 54 records were returned during that execution | Confirmed |
| Result consistency | All 54 reviewed records displayed `ESS` | Confirmed |
| Exact record count | Session-specific and unsuitable for a stable assertion | Confirmed |

### Status Filter

| Selected Status | Observed Result | Status |
| --- | --- | --- |
| `Enabled` | 69 records were returned during that execution; the inspected result displayed `Enabled` | Confirmed |
| `Disabled` | `No Records Found` was displayed | Confirmed |

The empty `Disabled` result confirms the empty-result presentation for the current data state. It does not confirm how the filter behaves when a disabled account exists.

### Reset

| Item | Observation | Status |
| --- | --- | --- |
| Reset action | `Reset` was selected after filtered searches | Confirmed |
| Filter state | Entered or selected filter values were cleared | Confirmed |
| Results state | The unfiltered user list was displayed again | Confirmed |

### Environment Instability Observed

| Item | Observation | Status |
| --- | --- | --- |
| Record count | Changed between observed states: `60 → 66 → 67 → 69 → 98` | Confirmed |
| Displayed profile | Profile name and avatar changed between sessions | Confirmed |
| Known profile names | `Yuvi sliva` and `manda user` were observed in different sessions | Confirmed |
| UI styling | Button styling changed between sessions | Confirmed |
| Authentication | One login attempt displayed `Invalid credentials` during the later exploration | Environment Observation |
| Cause of changes | Not established | Open Question |

The observations confirm that the public demo state is mutable. They do not prove who changed the data, whether changes were produced by other visitors, or whether an automatic reset occurred.

### Admin Exploration Result

**Status: Completed with environment limitations**

The following read-only behavior was confirmed:

* opening Admin → User Management → Users;
* viewing the user-search form and results table;
* exact username search using a value from the current table state;
* filtering by the `ESS` role;
* filtering by account status;
* displaying an empty result;
* resetting the filters.

No product defect was confirmed.

User creation, editing, deletion and administrative configuration changes were intentionally not tested because an isolated test-data and cleanup strategy was unavailable.
