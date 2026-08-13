# OrangeHRM E2E Test Plan

* **Version:** 0.9
* **Status:** Draft
* **Date:** 13.08.2026
* **Author:** Kateryna Yeromenko

## 1. Document Control

| Field            | Value                                                                                               |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| Document Title   | OrangeHRM E2E Test Plan                                                                             |
| Document Type    | Living test plan                                                                                    |
| Document Status  | Draft                                                                                               |
| Document Version | 0.9                                                                                                 |
| Project          | OrangeHRM E2E QA Automation                                                                         |
| Author           | Kateryna Yeromenko                                                                                  |
| Initial Date     | 28.07.2026                                                                                          |
| Update Policy    | Update after each completed and reviewed exploration, test design, execution or automation activity |
| Scope Status     | Refined for Admin, PIM and Leave; remains preliminary until the remaining modules are explored |

### Revision History

| Version | Date       | Author             | Changes                                                                     |
| ------- | ---------- | ------------------ | --------------------------------------------------------------------------- |
| 0.1     | 28.07.2026 | Kateryna Yeromenko | Created the initial test plan and documented the confirmed test environment |
| 0.2     | 30.07.2026 | Kateryna Yeromenko | Documented completed Admin exploration and refined the public-demo test and automation strategy |
| 0.3     | 02.08.2026 | Kateryna Yeromenko | Documented completed PIM Employee List exploration and refined related risks, scope and automation strategy |
| 0.4     | 03.08.2026 | Kateryna Yeromenko | Documented completed Leave List exploration and refined session, date-format and leave-data risks |
| 0.5     | 03.08.2026 | Kateryna Yeromenko | Documented confirmed access-control behavior after logout and added the related automation candidate |
| 0.6     | 04.08.2026 | Kateryna Yeromenko | Added the traceability matrix linking confirmed observations, manual test cases and automation candidates |
| 0.7     | 12.08.2026 | Kateryna Yeromenko | Aligned implemented Login, Admin and PIM automation with test cases, traceability and execution status |
| 0.8     | 12.08.2026 | Kateryna Yeromenko | Added PIM pagination automation, hardened shared-dropdown handling and recorded the successful 18-test Chromium execution |
| 0.9     | 13.08.2026 | Kateryna Yeromenko | Added five Leave List tests, documented data-dependent skips and classified transient authentication and server failures |

## 2. Product Overview

OrangeHRM is a web-based human resource management application.

During the initial exploration, the navigation menu displayed entries named Admin, PIM, Leave, Time, Recruitment, My Info, Performance, Dashboard, Directory, Maintenance, Claim and Buzz.

Read-only workflows in Admin → User Management → Users, PIM → Employee List and Leave → Leave List have been confirmed. The remaining modules have not yet been explored in sufficient detail.

This portfolio project focuses on quality analysis and UI end-to-end testing of the public OrangeHRM demo environment.

Because formal product requirements are not available, expected behavior will be derived from:

* confirmed application behavior;
* visible labels, controls and validation messages;
* consistent behavior across related workflows;
* common HR domain conventions, recorded only as assumptions or open questions until application evidence is available;
* documented assumptions and open questions.

Assumptions will not be treated as confirmed requirements until supported by application evidence.

## 3. Test Objectives

The objectives of this project are to:

* verify that critical user workflows operate correctly;
* identify functional, usability and data-integrity risks;
* verify authentication, session persistence and logout behavior;
* verify navigation between the selected application modules;
* verify forms, validation rules, searches, filters and tables;
* verify selected cross-module HR workflows;
* confirm that important failures are visible and understandable to the user;
* create maintainable automated regression tests for stable, valuable scenarios;
* provide traceability between risks, test scenarios, manual test cases and automated tests;
* demonstrate an enterprise-style QA workflow from exploration through reporting.

## 4. Preliminary Test Scope

The scope has been refined after completed read-only exploration of Admin, PIM and Leave. It remains preliminary until the remaining modules are explored.

### 4.1 In Scope

The planned scope includes:

* Login Page;
* successful and unsuccessful login;
* required-field validation;
* authenticated session persistence after page refresh;
* logout;
* access to protected pages after logout;
* Dashboard;
* main navigation and menu search;
* Admin → User Management → Users read-only workflows;
* System Users search, filters, Reset and empty-result behavior;
* PIM → Employee List read-only workflows;
* employee searches using data obtained from the current page state;
* Employee Name autocomplete and search selection;
* Employment Status, Include, Job Title and Sub Unit filters;
* independent and combined employee filtering;
* Supervisor Name autocomplete behavior;
* Employee List Reset, pagination, sorting and empty-result behavior;
* Leave → Leave List read-only workflows;
* Leave List default filter state applied before any search;
* required leave-status validation and its message;
* leave filtering by status and Reset behavior;
* leave empty-result presentation;
* date presentation based on the configured localization format;
* searches and filters;
* tables, pagination and empty-result states;
* form fields and validation behavior;
* selected cross-module workflows;
* basic responsive checks;
* basic accessibility checks;
* basic performance observations;
* Chromium, Firefox and WebKit execution for selected automated scenarios.

### 4.2 Out of Scope

The following are outside the current portfolio scope:

* production environment testing;
* exhaustive security or penetration testing;
* load, stress, endurance and scalability testing;
* backend, database or internal API testing without authorized access;
* email, SMS or external service delivery verification;
* exhaustive testing of every OrangeHRM module;
* destructive modification of shared administrative configuration;
* creation, editing or deletion of users in the shared public environment;
* employee or leave-record CRUD without isolated test data and a safe cleanup strategy;
* assertions based on exact record counts, profile identity, avatar or theme colors;
* modification of unknown users, employees or leave requests;
* real personal or sensitive employee information;
* native mobile application testing;
* formal compliance certification.

### 4.3 Future Improvements

Possible future extensions include:

* broader regression coverage across additional modules;
* API testing if an authorized API becomes available;
* visual regression testing;
* extended accessibility testing;
* extended responsive testing;
* CI execution through GitHub Actions;
* test result trend reporting;
* role-based testing with multiple authorized accounts;
* performance baselines in a stable, controlled environment;
* user, employee and leave-record CRUD testing in an isolated OrangeHRM environment.

## 5. Quality Characteristics

| Quality Characteristic | Planned Coverage        | Approach                                                                            |
| ---------------------- | ----------------------- | ----------------------------------------------------------------------------------- |
| Functional suitability | Primary                 | Verify critical workflows, business rules, validation and expected results          |
| Reliability            | Basic                   | Check refresh behavior, repeated execution, error handling and session stability    |
| Usability              | Basic                   | Review labels, navigation, feedback, validation messages and workflow clarity       |
| Accessibility          | Basic                   | Check keyboard access, visible focus, accessible names and selected automated rules |
| Performance efficiency | Observational           | Record obvious slow loading, delayed feedback and unstable page behavior            |
| Security               | Basic functional checks | Verify authentication boundaries, logout behavior and protected-page access         |
| Compatibility          | Selected browsers       | Execute automated regression tests in Chromium, Firefox and WebKit                  |
| Maintainability        | Primary for automation  | Use clear test structure, reusable components and controlled duplication            |
| Testability            | Primary                 | Prefer stable locators, observable results, isolated data and useful diagnostics    |

This project does not claim complete security, performance or accessibility certification.

## 6. Test Levels and Test Types

The project will use:

* exploratory testing;
* functional testing;
* positive testing;
* negative testing;
* smoke testing;
* regression testing;
* UI end-to-end testing;
* integration-oriented workflow testing;
* session and access-control testing;
* compatibility testing;
* basic responsive testing;
* basic accessibility testing;
* basic performance observation.

## 7. Test Approach

### 7.1 Workflow

Testing will follow this sequence:

1. Perform read-only application exploration.
2. Document confirmed observations, assumptions and open questions.
3. Identify business workflows and business rules.
4. Identify product and environment risks.
5. Refine the test scope.
6. Design test scenarios.
7. Create prioritized manual test cases.
8. Execute manual test cases and collect evidence.
9. Document defects and environment issues.
10. Select stable and valuable automation candidates.
11. Implement Playwright tests.
12. Execute cross-browser regression.
13. Update traceability and prepare the final QA summary.

### 7.2 Test Design Techniques

The following techniques will be used where appropriate:

* equivalence partitioning;
* boundary-value analysis;
* decision tables;
* state-transition testing;
* positive and negative testing;
* error guessing;
* risk-based testing;
* use-case and workflow testing;
* exploratory testing;
* pairwise testing when several independent parameters exist.

### 7.3 Prioritization

Test cases will be prioritized as:

| Priority | Meaning                                                                   |
| -------- | ------------------------------------------------------------------------- |
| P0       | Critical workflow or access failure; testing cannot meaningfully continue |
| P1       | High business impact or major regression risk                             |
| P2       | Important behavior with a workaround or limited impact                    |
| P3       | Low-risk, cosmetic or optional behavior                                   |

The regression suite will be divided into:

* Smoke;
* Critical Path;
* Full Regression;
* Extended or exploratory coverage.

## 8. Test Environment

| Parameter                  | Confirmed Value                                                      |
| -------------------------- | -------------------------------------------------------------------- |
| Application                | OrangeHRM Open Source Demo                                           |
| Environment Type           | Public demo environment                                              |
| Environment URL            | `https://opensource-demo.orangehrmlive.com/`                         |
| Login URL                  | `https://opensource-demo.orangehrmlive.com/web/index.php/auth/login` |
| OrangeHRM Version          | `OrangeHRM OS 5.9`                                                   |
| Browser                    | Google Chrome `150.0.7871.187`, 64-bit                               |
| Operating System           | Windows                                                              |
| Test Account               | Public administrator account displayed on the Login Page             |
| Initial Exploration        | `28.07.2026, 17:10`                                                  |
| Planned Automation Tool    | Playwright with TypeScript                                           |
| Planned Automated Browsers | Chromium, Firefox and WebKit                                         |

Passwords and sensitive credentials must not be stored in repository documentation or source code.

## 9. Test Data Strategy

The current public-demo strategy is read-only and based on the application state available at execution time.

Test data will follow these rules:

* do not create, edit or delete records in the shared public environment;
* do not use real personal or sensitive information;
* do not modify users, employees or leave records created by unknown parties;
* do not depend on a specific existing username, employee or leave record;
* do not depend on the order of shared records;
* do not assert exact record counts;
* obtain required search values from the current page state where practical;
* validate preconditions immediately before each state-dependent action;
* keep automated tests independent whenever possible;
* capture screenshots and traces when shared-data changes affect execution;
* classify environment instability separately from confirmed product defects;
* use uniquely identifiable fictional records only in a future isolated environment with a verified cleanup strategy.

Example naming convention for a future isolated environment:

```text
QA_AUTO_<entity>_<timestamp>
```

User, employee and leave-record CRUD testing is excluded from the current public-demo scope because test-data ownership, isolation and cleanup cannot be guaranteed.

## 10. Public Demo Environment Limitations

Exploration confirmed that the public environment has mutable shared state. The following limitations were observed or remain credible environment risks:

* system-user record counts changed during exploration;
* employee record counts and displayed employee data also changed during PIM exploration;
* individual system-user records appeared or disappeared between observed states;
* the displayed profile name and avatar changed between sessions;
* UI button styling changed between sessions;
* one later login attempt produced `Invalid credentials`;
* data may be changed by other visitors or by an environment reset, but the exact cause was not established;
* the environment may reset data without notice;
* the environment may become temporarily unavailable;
* application version or UI behavior may change without notice;
* only the public administrator account is currently available;
* results may become non-reproducible because application state can change between test steps;
* a supervisor value displayed in the Employee List could not be selected through the Supervisor Name autocomplete;
* employee IDs included numeric, leading-zero and alphanumeric formats;
* ID sorting appeared lexicographical rather than numerical, but the intended product requirement was unavailable;
* leave requests, leave balances and returned leave counts changed between consecutive actions;
* the session expired during an active action and redirected to the Login Page;
* the displayed date format is defined by a shared Admin localization setting that any visitor can change;
* the Leave List date range depends on the configured leave period and is not a fixed value.

Environment behavior must be separated from confirmed product defects whenever possible.

## 11. Risks and Assumptions

| ID | Risk or Assumption | Type | Impact | Mitigation |
| --- | --- | --- | --- | --- |
| R-001 | Application data changed during exploration | Environment risk | Tests may observe different data between executions | Use data obtained from the current application state and avoid exact record-count assertions |
| R-002 | Demo data may reset without notice | Environment risk | Required records or preconditions may disappear | Validate all state-dependent preconditions immediately before execution |
| R-003 | The cause of the observed data changes is unknown | Environment risk | Environment-related failures may be incorrectly classified as product defects | Capture evidence and verify reproducibility before reporting a defect |
| R-004 | Formal product requirements are unavailable | Product risk | Expected results or business rules may be interpreted incorrectly | Separate confirmed behavior, assumptions and open questions |
| R-005 | The application UI structure may change | Automation risk | Locators may become invalid and automated tests may fail | Prefer stable user-facing or test-specific locators |
| R-006 | The public environment may be slow or temporarily unavailable | Environment risk | Manual or automated execution may be delayed or blocked | Record evidence and classify the failure before retrying |
| R-007 | Administrative actions may modify shared application data | Data risk | Public-demo records may be changed unintentionally | Keep the current public-demo scope read-only |
| R-008 | Only one public administrator account is available | Coverage risk | Role-based access and authorization coverage is incomplete | Document the limitation and avoid unsupported authorization claims |
| R-009 | Dashboard values are dynamic | Automation risk | Assertions against exact values may be unstable | Assert stable page structure and component visibility instead of volatile values |
| R-010 | Profile identity, avatar and UI styling changed between sessions | Automation risk | Profile-specific or visual assertions may be flaky | Do not assert specific profile values, avatar content or theme colors |
| R-011 | One login attempt produced an isolated `Invalid credentials` result | Environment risk | Test execution may be temporarily blocked or incorrectly reported as a product defect | Capture evidence and confirm reproducibility before classifying the result |
| R-012 | A shared record may change between reading it and using it in a search | Automation risk | Dynamic search tests may fail intermittently | Minimize the delay between reading and using the value, and retain trace evidence for failed executions |
| R-013 | Employee record counts and displayed employee data changed during PIM exploration | Environment risk | Employee searches and assertions may become non-reproducible | Use current-state data and avoid dependencies on exact employee records or counts |
| R-014 | A displayed supervisor value was not selectable through the Supervisor Name autocomplete | Product or environment risk | Supervisor filtering may be unavailable or unreliable | Do not automate this filter until the behavior is reproduced with stable, controlled data |
| R-015 | Employee IDs use mixed formats and appeared to be sorted lexicographically | Requirement and automation risk | Numeric-order assumptions may produce incorrect test expectations | Treat employee IDs as text until the intended sorting rule is confirmed |
| R-016 | The session expired during an active action and redirected to the Login Page | Environment and automation risk | Long or multi-step executions may be interrupted and misreported as product failures | Keep each test short and self-contained, authenticate within the test and classify redirects before reporting a defect |
| R-017 | The displayed date format is a shared Admin configuration value | Automation risk | Date-dependent assertions may become invalid without notice | Avoid asserting literal date strings and do not parse displayed dates as a fixed pattern |
| R-018 | Leave requests, balances and statuses changed between consecutive actions | Environment risk | Leave assertions based on specific records may become non-reproducible | Assert filter and validation behavior instead of individual leave records or balances |
| R-019 | Shared lookup values changed between and during automated executions | Environment and automation risk | Tests using a previously observed dropdown option may fail before exercising the intended behavior | Read and select a current option during the same dropdown opening, then skip matching-result cases when no configured value satisfies the required data precondition |

## 12. Entry Criteria

Testing may begin when:

* the public demo environment is reachable;
* the Login Page loads;
* the public test account is available;
* the current environment and browser are documented;
* the planned activity has a defined objective;
* required test data and preconditions are understood;
* the activity does not introduce an uncontrolled shared-data risk.

Automation implementation may begin when:

* the workflow has been manually explored;
* expected results are documented;
* the test case has been manually executed;
* the scenario is stable and repeatable;
* suitable locators have been identified;
* test-data and cleanup requirements are understood.

## 13. Exit Criteria

A planned test cycle may be considered complete when:

* all planned P0 and P1 test cases have been executed;
* critical workflows have a documented result;
* no unresolved blocker prevents evaluation of the selected scope;
* critical and high-severity defects are documented;
* failed and blocked tests contain explanations and evidence;
* selected automated tests pass in the required browsers;
* automation results have been reviewed for flaky behavior;
* the traceability matrix is updated;
* known limitations and residual risks are documented;
* a QA summary report is prepared.

The public demo project does not represent a real production release decision.

## 14. Defect Management

Each defect report should contain:

* defect ID;
* concise title;
* environment;
* preconditions;
* steps to reproduce;
* actual result;
* expected result;
* reproducibility;
* severity;
* priority;
* screenshots, video, trace or console evidence where relevant;
* related test case;
* notes about possible shared-environment influence.

### Severity

| Severity | Definition                                                                      |
| -------- | ------------------------------------------------------------------------------- |
| Critical | Core application or critical workflow is unavailable; no reasonable workaround  |
| High     | Major functionality fails or produces a serious business or data-integrity risk |
| Medium   | Functionality is partially incorrect, but a workaround exists                   |
| Low      | Minor functional, visual or usability issue with limited impact                 |

### Defect Statuses

```text
New → Confirmed → In Progress → Ready for Retest → Closed
                         ↘ Reopened
```

Additional statuses such as `Rejected`, `Duplicate`, `Cannot Reproduce` or `Environment Issue` may be used with justification.

## 15. Automation Strategy

Automation will focus on scenarios that are:

* stable and deterministic;
* suitable for isolated execution;
* valuable for smoke or regression testing;
* supported by observable expected results.

Automation will not be selected only to increase the number of automated tests.

### Public Demo Automation Constraints

Automation in the public environment will focus on stable structure and read-only behavior.

Suitable candidates include:

* Login Page structure;
* successful and unsuccessful login;
* Dashboard opening after authentication;
* session persistence after refresh;
* logout and protected-page access after logout;
* opening Admin → User Management → Users;
* displaying the System Users search form and results table;
* Reset clearing entered or selected filters;
* username search using the known public demo administrator account;
* validation that returned rows match the selected role or status when matching data exists;
* empty-result presentation using a unique search value;
* opening PIM → Employee List;
* displaying the Employee Information filters and employee table;
* Reset clearing Employee List search criteria;
* employee search using an ID obtained from the current table state;
* Employee Name autocomplete using a value obtained from the current table state;
* empty-result presentation using a deliberately non-existing employee ID;
* validation that returned rows match a currently configured filter when matching data exists;
* pagination based on active-page state rather than specific employee records;
* opening Leave → Leave List;
* displaying the Leave List filter panel and result table;
* presence of the default leave status and date range before any search;
* required-field validation when the leave status is removed and a search is attempted;
* Reset restoring the default leave filter state;
* empty-result presentation for a leave status without matching records;
* redirection to the Login Page when a protected URL is requested after logout.

Automated tests must not assert:

* an exact number of users, employees or Dashboard records;
* an arbitrary or mutable existing username;
* a specific displayed profile name or avatar;
* exact theme or button colors;
* persistence of shared records between executions;
* ownership of records visible in the public environment.

Create, edit and delete scenarios require an isolated environment and are not automation candidates for the current public-demo suite.

Supervisor Name autocomplete and exact ID-order assertions are not current automation candidates because their expected behavior could not be established reliably in the shared environment.

Literal date values, leave balances and leave-record counts are not used as expected results, and leave approval, assignment and configuration actions are excluded because they modify shared data.

Planned practices:

* Playwright with TypeScript;
* stable locators with priority given to test attributes, roles, labels and clear user-facing text;
* isolated test cases;
* reusable authentication and page components where they reduce meaningful duplication;
* assertions based on user-visible outcomes;
* no hard-coded passwords in the repository;
* screenshots, videos and traces for failed tests;
* retries used only as diagnostics in CI, not as a substitute for fixing flaky tests;
* parallel execution only when test-data isolation is confirmed;
* cross-browser execution in Chromium, Firefox and WebKit;
* clear separation between test intent, test data and page interaction;
* regular review of flaky and obsolete tests;
* read-only interaction with shared application data;
* assertions based on stable structure and behavior rather than mutable values;
* explicit classification of environment-related failures.

Mutable lookup values are obtained from the current page state. A matching-result test may try current options to find one that satisfies its documented precondition; if none does, execution is reported as skipped rather than passed without assertions or failed against obsolete test data.

## 16. Traceability

Traceability will connect:

```text
Business Risk
→ Requirement or Confirmed Rule
→ Test Scenario
→ Manual Test Case
→ Automated Test
→ Execution Result
→ Defect
```

The matrix below links each confirmed observation to the manual test case that verifies it and records whether the scenario is an automation candidate.

Observations are referenced by their section in `docs/exploration-log.md`. Manual test cases are defined in `docs/test-cases.md`. Automation candidates are listed in section 15 of this document.

| Confirmed Observation | Source | Manual Test Case | Risk | Automation Candidate |
| --------------------- | ------ | ---------------- | ---- | -------------------- |
| The Login Page displays the authentication form and its controls | Log § 3 | TC-LOGIN-001 | - | Yes |
| Valid credentials open the Dashboard | Log § 4 | TC-LOGIN-002 | R-002 | Yes |
| An authenticated session persists after a page refresh | Log § 7 | TC-LOGIN-003 | - | Yes |
| Logout returns the user to the Login Page | Log § 8 | TC-LOGIN-004 | - | Yes |
| A protected URL is not accessible after logout | Log § 20 | TC-LOGIN-005 | - | Yes |
| The System Users page displays the search form and results table | Log § 18 | TC-ADMIN-001 | - | Yes |
| Username search returns records matching the entered value | Log § 18 | TC-ADMIN-002 | R-004 | Yes |
| User Role filtering returns records matching the selected value | Log § 18 | TC-ADMIN-003 | R-004 | Yes |
| Status filtering returns records matching the selected value | Log § 18 | TC-ADMIN-004 | R-004 | Yes |
| A non-existing username produces an empty-result state | Log § 18 | TC-ADMIN-005 | - | Yes |
| Reset clears the entered System Users search criteria | Log § 18 | TC-ADMIN-006 | - | Yes |
| The Employee List displays the Employee Information filters and table | Log § 10 | TC-PIM-001 | - | Yes |
| Employee ID search returns records matching the entered value | Log § 10 | TC-PIM-002 | R-013 | Yes |
| Employment Status filtering returns records matching the selected value | Log § 10 | TC-PIM-003 | R-013, R-019 | Yes |
| A non-existing employee ID produces an empty-result state | Log § 10 | TC-PIM-004 | - | Yes |
| Employee Name autocomplete returns matching suggestions | Log § 10 | TC-PIM-005 | R-013 | Yes |
| Reset clears the entered Employee List search criteria | Log § 10 | TC-PIM-006 | R-019 | Yes |
| Pagination opens the selected results page | Log § 10 | TC-PIM-007 | R-013 | Yes |
| Employee ID column sorting changes the displayed order | Log § 10 | TC-PIM-008 | R-015 | No |
| The Leave List applies default filter values before any search | Log § 19 | TC-LEAVE-001 | R-017 | Yes |
| A leave search is blocked without a selected leave status | Log § 19 | TC-LEAVE-002 | - | Yes |
| Leave status filtering returns records matching the selected value | Log § 19 | TC-LEAVE-003 | R-018 | Yes |
| A status without matching records produces an empty-result state | Log § 19 | TC-LEAVE-004 | R-018 | Yes |
| Reset restores the default leave filter values and executes a search | Log § 19 | TC-LEAVE-005 | - | Yes |

### Coverage Summary

| Item | Count |
| ---- | ----- |
| Confirmed observations traced | 24 |
| Manual test cases defined | 24 |
| Scenarios selected for automation | 23 |
| Scenarios excluded from automation | 1 |

### Scenarios Excluded from Automation

`TC-PIM-008` is verified manually only.

The intended employee ID sorting rule recorded as R-015 is not documented, therefore an automated ordering assertion would encode an assumption rather than a requirement.

The separate Supervisor Name autocomplete behavior recorded as R-014 remains excluded from automation because its expected behavior could not be established reliably in the shared environment. It is not the Employee Name autocomplete covered by `TC-PIM-005`.

These excluded behaviors will be reconsidered if a controlled environment or formal requirement becomes available.

### Traceability Gaps

The public demo provides no formal requirement specification. Expected results are therefore derived from confirmed observation rather than from documented requirements, and the `Requirement or Confirmed Rule` level of the chain above is satisfied by confirmed rules only.

## 17. Metrics and Reporting

Planned metrics include:

* number of planned, executed, passed, failed and blocked tests;
* execution completion percentage;
* requirement and risk coverage;
* smoke and regression coverage;
* automation coverage of selected regression candidates;
* defects by severity and module;
* defect reopen rate;
* automated execution duration;
* flaky-test rate;
* cross-browser result differences;
* unresolved environment issues.

Metrics will be reported with context and will not be used as a substitute for quality analysis.

## 18. Roles and Responsibilities

For this portfolio project, Kateryna Yeromenko performs the following roles:

| Role                   | Responsibilities                                                         |
| ---------------------- | ------------------------------------------------------------------------ |
| QA Analyst             | Product analysis, risk identification, scope definition and traceability |
| Manual QA Engineer     | Exploration, test design, manual execution and defect reporting          |
| QA Automation Engineer | Framework design, test implementation, execution and maintenance         |
| Test Reporter          | Metrics, evidence and final QA summary                                   |

## 19. Deliverables

Planned deliverables:

* Test Plan;
* Exploration Log;
* product and business-rule analysis;
* risk matrix;
* test scenarios;
* manual test cases;
* manual execution results;
* defect reports;
* locator research notes;
* traceability matrix;
* Playwright automated tests;
* HTML test reports;
* cross-browser execution results;
* README;
* final QA Summary Report.

## 20. Current Status and Next Activity

Completed:

* public Login Page exploration;
* successful login;
* Dashboard overview;
* session refresh check;
* logout;
* initial environment documentation;
* Admin → User Management → Users read-only exploration;
* exact username search using the known public demo administrator account;
* User Role filtering with `ESS`;
* Status filtering with `Enabled` and `Disabled`;
* Admin empty-result and Reset behavior;
* PIM → Employee List read-only exploration;
* employee search by a visible current-state ID;
* Employee Name autocomplete and selected-name search;
* non-existing Employee ID search and empty-result presentation;
* Employment Status, Include, Job Title and Sub Unit filtering;
* combined Employment Status and Job Title filtering;
* Reset after successful and empty searches;
* Employee List pagination and previous-page navigation;
* ascending and descending ID sorting;
* Leave → Leave List read-only exploration;
* Leave List module structure and default filter state;
* required leave-status validation and its message;
* leave filtering by status and empty-result presentation;
* Reset restoring the default leave filter state and executing a search;
* confirmation that the displayed date format follows the Admin localization setting;
* identification of mutable system-user, employee and leave data;
* classification of the Admin, PIM and Leave explorations as completed with public-environment limitations;
* confirmation that a protected page is not accessible after logout and redirects to the Login Page;
* 24 prioritized manual test cases covering Login, Admin, PIM and Leave;
* 23 Playwright tests covering Login, Admin, PIM and Leave;
* implementation of `TC-PIM-007` using current numbered pagination controls and table-content transitions rather than specific employee records;
* Chromium execution of the 18-test automated suite with all tests passing;
* implementation of `TC-LEAVE-001` through `TC-LEAVE-005` for default filters, required-status validation, current-state status filtering, empty results and Reset;
* Chromium Leave execution with four tests passed, one data-dependent test skipped and no functional failures;
* targeted Chromium execution confirming `TC-LEAVE-003` when a current matching record was available;
* targeted rerun confirming `TC-LEAVE-004` and `TC-LEAVE-005` after transient authentication failures in the 23-test suite;
* cross-browser validation of corrected Admin and PIM coverage, including dynamic Employment Status filtering in Chromium, Firefox and WebKit;
* targeted reruns confirming `TC-PIM-005` in all three browsers and WebKit `TC-ADMIN-006` after a transient authentication failure;
* diagnosis and mitigation of failures caused by mutable Employment Status values and service options rendered in shared dropdowns;
* classification of HTTP 500, connection-reset and stalled-login executions as transient public-environment failures after successful targeted reruns.

No product defect was confirmed during the Admin, PIM or Leave exploration.

The Supervisor Name autocomplete inconsistency remains a product or environment risk requiring reproduction with stable test data.

Session expiry during active use is treated as an environment characteristic and must be considered when planning execution length.

Next activities:

1. Capture a complete Chromium execution when the public demo remains available for the full suite.
2. Execute the completed regression suite in Firefox and WebKit.
3. Update the README with the current automated coverage and execution evidence.
4. Finalize the public-demo scope and portfolio documentation.
