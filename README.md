# OrangeHRM Playwright QA Automation Portfolio

[![Playwright Tests](https://github.com/Yeromenko-Kateryna/orangehrm-e2e-qa-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/Yeromenko-Kateryna/orangehrm-e2e-qa-automation/actions/workflows/playwright.yml)

[OrangeHRM](https://opensource-demo.orangehrmlive.com/) is a public HR management demo application used in this project as the application under test.

This repository contains end-to-end UI automation for OrangeHRM using Playwright and TypeScript.

The project demonstrates practical QA Automation skills: exploratory testing, risk-based test design, stable locator strategy, reusable test helpers, dynamic test-data handling, cross-browser execution, evidence-based documentation, and continuous integration with GitHub Actions.

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions
- dotenv
- Playwright HTML Reports
- Chromium, Firefox, and WebKit
- Manual exploratory testing
- Risk-based test design

---

## Test Automation Architecture

The project uses a feature-based test structure.

```text
tests/
├── login.spec.ts
├── admin.spec.ts
├── pim.spec.ts
├── leave.spec.ts
└── helpers.ts
```

Each specification covers one product area, while repeated workflows such as authentication, navigation, field scoping, dropdown interaction, and response synchronization are kept in shared helpers.

This keeps the tests readable and maintainable without introducing unnecessary Page Object Model abstraction for a portfolio-sized project.

---

## Features

- Covers Login and Session, Admin User Management, PIM Employee List, and Leave List workflows
- Uses accessible user-facing locators and scoped OrangeHRM component selectors
- Runs tests in Chromium, Firefox, and WebKit
- Handles mutable shared-demo data without creating, modifying, or deleting records
- Synchronizes dynamic searches with the related application responses before validating the UI
- Uses reusable helpers for authentication, navigation, dropdowns, table columns, and response parsing
- Provides local TypeScript type checking
- Generates Playwright HTML reports, screenshots, videos, and traces when configured
- Runs automated checks through GitHub Actions
- Documents test design, exploration, locator decisions, risks, traceability, and execution results

---

## Test Coverage

The automated regression suite covers the main read-only OrangeHRM workflows selected during exploratory testing.

### Login and Session

- Login Page element validation
- Login with valid credentials
- Authenticated session persistence after refresh
- Logout validation
- Protected-page access validation after logout

### Admin User Management

- System Users Page visibility
- Username filtering
- User-role filtering
- User-status filtering
- Empty-result validation for a non-existing username
- Resetting System Users search criteria

### PIM Employee List

- Employee List Page visibility
- Employee ID filtering
- Employment-status filtering using current environment data
- Empty-result validation for a non-existing employee ID
- Employee Name autocomplete validation
- Resetting Employee List search criteria
- Pagination navigation when multiple result pages are available

### Leave List

- Leave List Page visibility and default filters
- Required leave-status validation
- Leave-status filtering when matching shared data is available
- Empty-result validation for a status without matching records
- Restoring default Leave List filters with Reset

### Manual-Only Coverage

- Employee ID column sorting remains manual because an exact stable sort rule could not be confirmed reliably in the changing public dataset.

### Coverage Summary

| Area | Automated Scenarios |
|---|---:|
| Login and Session | 5 |
| Admin User Management | 6 |
| PIM Employee List | 7 |
| Leave List | 5 |
| **Automated Total** | **23** |

```text
23 automated scenarios
24 documented manual test cases
69 cross-browser executions
63 passed and 6 data-dependent skips
```

---

## Locator Strategy

The test suite uses stable and readable selectors.

- Prefer accessible roles, names, and visible user-facing text.
- Scope repeated controls to their labeled field group or open component.
- Use OrangeHRM component classes only when no reliable accessible relationship is available.
- Avoid brittle position-based selectors and unscoped page-wide option queries.
- Keep assertions focused on visible user behavior.

Examples:

```ts
page.getByRole('button', { name: 'Search' });
fieldGroup(page, 'Employment Status').locator('.oxd-select-text');
page.locator('.oxd-select-dropdown').getByRole('option', {
  name: status,
  exact: true,
});
```

Detailed locator rationale is available in [Locator Notes](docs/locator-notes.md).

---

## Shared Public Demo Strategy

OrangeHRM is a public environment whose records, lookup values, sessions, and availability can change while the suite is running.

The project accounts for these constraints by:

- keeping every scenario read-only;
- running with one worker to reduce pressure on the shared service;
- deriving suitable search values from the current application state;
- synchronizing dynamic searches with application responses before asserting the rendered UI;
- avoiding fixed record counts, employee names, leave balances, and other volatile expected values;
- using explicit data-dependent skips when the environment cannot satisfy a documented precondition;
- keeping each test independently authenticated and self-contained;
- retaining failure evidence for diagnosis.

The two documented skips are valid outcomes, not hidden failures:

- the Leave status scenario skips when the current default result set contains no row from which to derive a matching status;
- the PIM pagination scenario skips when the Employee List currently contains fewer than two result pages.

No product defect was confirmed during this project. Observed instability was treated as an environment risk unless reproducible product evidence showed otherwise.

---

## Latest Test Run

```text
Chromium: 21 passed, 2 skipped
Firefox: 21 passed, 2 skipped
WebKit: 21 passed, 2 skipped

63 passed
6 data-dependent skips
0 failed
0 flaky
```

Execution scope:

- 23 automated scenarios
- Chromium, Firefox, and WebKit
- 69 total cross-browser executions
- GitHub Actions manual cross-browser run
- Results verified for commit `1322ef0`

---

## Run Tests Locally

Install dependencies:

```bash
npm ci
npx playwright install
```

Run the complete configured suite:

```bash
npm test
```

Run a specific browser project:

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

Run TypeScript type checking:

```bash
npm run typecheck
```

Run tests in UI or debug mode:

```bash
npm run test:ui
npm run test:debug
```

Open the latest Playwright HTML report:

```bash
npm run report
```

On Linux or CI environments, install browser system dependencies with:

```bash
npx playwright install --with-deps
```

Create a local `.env` file from `.env.example` and provide the public-demo credentials before running authenticated scenarios.

---

## Continuous Integration

GitHub Actions runs the Chromium regression suite on every push and pull request. A manually triggered workflow runs the complete suite in Chromium, Firefox, and WebKit.

The workflow performs:

1. Required-secret validation
2. Dependency installation with `npm ci`
3. Playwright browser installation
4. Browser-specific test execution
5. Playwright HTML report upload as a workflow artifact

The CI workflow is available in:

```text
.github/workflows/playwright.yml
```

---

## QA Documentation

### [Test Plan](docs/test-plan.md)

Project scope, strategy, risks, environment constraints, automation approach, and traceability.

### [QA Summary Report](docs/qa-summary-report.md)

Final execution results, coverage status, skip rationale, quality assessment, and project conclusion.

### [Exploration Log](docs/exploration-log.md)

Exploratory sessions, confirmed observations, investigated behavior, and execution evidence.

### [Manual Test Cases](docs/test-cases.md)

Twenty-four prioritized cases with preconditions, steps, expected results, and automation status.

### [Locator Notes](docs/locator-notes.md)

Locator decisions, component behavior, synchronization findings, and stable Playwright examples.

---

## Quality Practices Demonstrated

- Risk-based test prioritization
- Read-only testing in a mutable shared environment
- Functional regression coverage across four product areas
- Cross-browser execution in Chromium, Firefox, and WebKit
- Reusable test helpers without over-engineering
- Stable, scoped locator selection
- Dynamic current-state test-data handling
- Response-based synchronization with UI-focused assertions
- Explicit and evidence-backed skip conditions
- Manual and automated test traceability
- Failure evidence through reports, screenshots, videos, and traces
- CI integration and browser-specific HTML report artifacts
- TypeScript type checking

---

## What I Learned

- How to design end-to-end UI automation for a shared and changing public environment
- How to select stable Playwright locators for custom OrangeHRM controls
- How to organize tests by product feature and reuse only genuinely repeated workflows
- How to derive expected values from the current application state instead of hard-coding volatile data
- How to synchronize UI validation with dynamic application responses
- How to distinguish product behavior from environment instability
- How to use explicit skips for missing test preconditions without concealing failures
- How to run the same suite in Chromium, Firefox, and WebKit
- How to configure GitHub Actions and preserve browser-specific execution evidence
- How to connect exploratory findings, risks, manual cases, automated tests, and final reporting

---

## Project Status

Completed portfolio project.

The current implementation includes:

- 24 documented manual test cases
- 23 automated Playwright scenarios
- 69 cross-browser executions
- Chromium, Firefox, and WebKit coverage
- 63 passed executions and 6 documented data-dependent skips in the final cross-browser run
- GitHub Actions CI workflow
- Playwright HTML reports and failure evidence
- Final QA test plan
- QA summary report
- Exploration log
- Locator notes
- Version tag `v1.0.2`

---

## Author

Kateryna Yeromenko

GitHub: [Yeromenko-Kateryna](https://github.com/Yeromenko-Kateryna)
