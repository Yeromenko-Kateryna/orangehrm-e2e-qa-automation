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

| Module | Accessible | Landing Page | Observed Purpose     | Notes                         |
| ------ | ---------- | ------------ | -------------------- | ----------------------------- |
| Admin  | Not tested | Not recorded | Requires exploration | Planned read-only exploration |
| PIM    | Not tested | Not recorded | Requires exploration | Planned read-only exploration |
| Leave  | Not tested | Not recorded | Requires exploration | Planned read-only exploration |

A module being visible in the navigation menu does not by itself confirm that its landing page and all functions are accessible.

## 10. Confirmed Observations

* Public credentials are displayed on the Login Page.
* The displayed public credentials allow successful login.
* Successful login opens the Dashboard.
* Twelve main application modules are displayed in the navigation menu.
* Dashboard widgets and Quick Launch actions are visible.
* The authenticated session remains active after an `F5` refresh.
* Logout returns the user to the Login Page.
* No visible application errors were observed during the initial exploration.

## 11. Assumptions

The following statements are assumptions and are not yet confirmed:

* the public demo may use shared data;
* records may be changed by other visitors;
* demo data may be periodically reset;
* Dashboard content may change between sessions;
* created records may persist temporarily or may disappear after a reset.

These assumptions must not be presented as confirmed application behavior.

## 12. Environment Limitations and Risks

| ID      | Limitation or Risk                               | Possible Impact                                      | Current Response                               |
| ------- | ------------------------------------------------ | ---------------------------------------------------- | ---------------------------------------------- |
| ENV-001 | Public credentials are available to all visitors | Multiple users may share the same account            | Avoid relying on account-specific mutable data |
| ENV-002 | Data ownership is unknown                        | Existing records may belong to other visitors        | Do not edit or delete unknown records          |
| ENV-003 | Reset schedule is unknown                        | Created data may disappear between sessions          | Validate preconditions before execution        |
| ENV-004 | Dashboard data may be dynamic                    | Exact values may be unsuitable for stable assertions | Prefer structural observations                 |
| ENV-005 | Environment availability is uncontrolled         | Testing may be blocked by downtime or slow loading   | Record time, evidence and retry conditions     |
| ENV-006 | Only one public role is currently confirmed      | Authorization coverage may be limited                | Document the coverage limitation               |

## 13. Open Questions

* Do all visitors use the same database?
* How frequently is the public demo data reset?
* Do created records persist between independent sessions?
* Does a protected Dashboard URL redirect to the Login Page after logout?
* How does the application display loading states?
* How does the application behave during slow or failed requests?
* Which functions are accessible in Admin, PIM and Leave?
* Which actions can be explored without changing shared data?
* Are tables paginated, sortable and filterable?
* How are empty search results displayed?
* Which form fields are required?
* Which validation messages and business rules are implemented?
* Is more than one user role available for authorized testing?

## 14. Potentially Unsafe Actions

The following actions require a confirmed test-data and cleanup strategy before execution:

* creating, editing or deleting employees;
* creating users;
* changing passwords or account roles;
* changing administrative settings;
* modifying existing leave requests;
* approving or rejecting requests;
* editing records not created by this project.

## 15. Initial Exploration Result

**Status: Completed**

The exploration objectives for Login Page identification, successful login, Dashboard overview, refresh behavior and visible logout were completed.

No product defect was confirmed during this session.

The following item remains open:

* verify access control by opening a protected Dashboard URL after logout and confirming whether the application redirects to the Login Page.

## 16. Next Exploration Activities

The next read-only sessions will cover:

1. Admin module;
2. PIM module;
3. Leave module;
4. searches and filters;
5. tables, pagination and empty states;
6. visible forms and validation indicators;
7. relationships between the selected modules.

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
