# OrangeHRM E2E Test Plan

* **Version:** 0.1
* **Status:** Draft
* **Date:** 28.07.2026
* **Author:** Kateryna Yeromenko

## 1. Document Control

| Field            | Value                                                                                               |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| Document Title   | OrangeHRM E2E Test Plan                                                                             |
| Document Type    | Living test plan                                                                                    |
| Document Status  | Draft                                                                                               |
| Document Version | 0.1                                                                                                 |
| Project          | OrangeHRM E2E QA Automation                                                                         |
| Author           | Kateryna Yeromenko                                                                                  |
| Initial Date     | 28.07.2026                                                                                          |
| Update Policy    | Update after each completed and reviewed exploration, test design, execution or automation activity |
| Scope Status     | Preliminary; final scope will be confirmed after read-only exploration of the key modules           |

### Revision History

| Version | Date       | Author             | Changes                                                                     |
| ------- | ---------- | ------------------ | --------------------------------------------------------------------------- |
| 0.1     | 28.07.2026 | Kateryna Yeromenko | Created the initial test plan and documented the confirmed test environment |

## 2. Product Overview

OrangeHRM is a web-based human resource management application.

During the initial exploration, the navigation menu displayed entries named Admin, PIM, Leave, Time, Recruitment, My Info, Performance, Dashboard, Directory, Maintenance, Claim and Buzz.

The accessible workflows within these modules have not yet been confirmed.

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

The scope is preliminary and will be refined after read-only exploration of the selected modules.

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
* Admin module;
* PIM and employee-related workflows;
* Leave module;
* searches and filters;
* tables, pagination and empty-result states;
* form fields and validation behavior;
* safe employee-related create, read, update and delete workflows when an isolated test-data strategy is available;
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
* performance baselines in a stable, controlled environment.

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

Test data will follow these rules:

* use only fictional data;
* do not use real personal or sensitive information;
* create uniquely identifiable records where creation is required;
* include a project-specific prefix and unique suffix in created records;
* do not edit or delete records that were not created by this project;
* document required preconditions for every stateful test;
* clean up created data when cleanup is safe and supported;
* record failed cleanup as an environment risk;
* keep automated tests independent whenever possible;
* do not depend on the order of pre-existing shared records;
* do not assume that demo data remains unchanged between executions.

Example naming convention:

```text
QA_AUTO_<entity>_<timestamp>
```

The final create/update/delete strategy remains subject to confirmation after safe exploration of the public demo environment.

## 10. Public Demo Environment Limitations

The environment may:

* be used by multiple visitors;
* contain shared and frequently changing data;
* reset data without notice;
* contain records created by other users;
* become temporarily unavailable;
* change application version or UI without notice;
* provide only one public role or account;
* produce results that are not reproducible because of external data changes.

Environment behavior must be separated from confirmed product defects whenever possible.

## 11. Risks and Assumptions

| ID    | Risk or Assumption                              | Type             | Impact                                         | Mitigation                                                       |
| ----- | ----------------------------------------------- | ---------------- | ---------------------------------------------- | ---------------------------------------------------------------- |
| R-001 | Demo data may be shared between users           | Environment risk | Test interference and unstable results         | Use unique data and avoid relying on existing record counts      |
| R-002 | Demo data may be reset without notice           | Environment risk | Preconditions or created records may disappear | Create data only when required and validate preconditions        |
| R-003 | Other users may change records during execution | Environment risk | Flaky or inconsistent results                  | Avoid modifying unknown records and use specific search criteria |
| R-004 | Formal requirements are unavailable             | Product risk     | Expected results may be misunderstood          | Separate confirmed behavior, assumptions and open questions      |
| R-005 | UI structure may change                         | Automation risk  | Locator failures                               | Prefer stable user-facing or test-specific locators              |
| R-006 | Public environment may be slow or unavailable   | Environment risk | Blocked execution                              | Record evidence, retry only after classifying the failure        |
| R-007 | Administrative actions may affect other users   | Data risk        | Unintended shared-data modification            | Keep early exploration read-only                                 |
| R-008 | One public account may limit role testing       | Coverage risk    | Incomplete authorization coverage              | Document the limitation and avoid unsupported claims             |
| R-009 | Dashboard data may be dynamic                   | Automation risk  | Unstable assertions                            | Assert stable structure rather than volatile values              |

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

* business-critical;
* frequently repeated;
* stable and deterministic;
* suitable for isolated execution;
* valuable for smoke or regression testing;
* supported by observable expected results.

Automation will not be selected only to increase the number of automated tests.

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
* regular review of flaky and obsolete tests.

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

A traceability matrix will be created after the first set of test scenarios and manual test cases is defined.

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
* initial environment documentation.

Next activities:

1. Perform read-only exploration of the Admin module.
2. Perform read-only exploration of the PIM module.
3. Perform read-only exploration of the Leave module.
4. Document confirmed workflows, rules, risks and open questions.
5. Update the preliminary scope and publish Test Plan version 0.2.
