# OrangeHRM E2E QA Automation Portfolio

[![Playwright Tests](https://github.com/Yeromenko-Kateryna/orangehrm-e2e-qa-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/Yeromenko-Kateryna/orangehrm-e2e-qa-automation/actions/workflows/playwright.yml)

End-to-end quality assurance portfolio project for the [OrangeHRM public demo](https://opensource-demo.orangehrmlive.com/). It demonstrates exploratory testing, risk-based test design, traceability, Playwright automation and cross-browser CI for a shared enterprise-style HR application.

## Project Status

| Area | Status |
| ---- | ------ |
| Manual exploration | Completed for Login, Admin, PIM and Leave |
| Risk and environment analysis | Completed |
| Prioritized manual test cases | 24 completed |
| Playwright implementation | 23 tests completed |
| Chromium CI | Passing |
| Cross-browser execution | Passing in Chromium, Firefox and WebKit |
| Portfolio documentation | Finalized |

## Automated Coverage

| Module | Automated tests | Main coverage |
| ------ | --------------: | ------------- |
| Login and Session | 5 | Login UI, successful authentication, refresh persistence, logout and protected-page access |
| Admin User Management | 6 | Page structure, username/role/status search, empty results and Reset |
| PIM Employee List | 7 | Page structure, ID/status/name search, autocomplete, empty results, Reset and pagination |
| Leave List | 5 | Default filters, required-status validation, status search, empty results and Reset |
| **Total** | **23** | |

`TC-PIM-008` remains manual-only because exact Employee ID sort behavior cannot be asserted reliably against mutable shared data. Supervisor Name autocomplete is recorded as a risk rather than an automated test because its expected behavior could not be established with stable data.

## Final Execution Evidence

The final manually triggered GitHub Actions workflow ran the complete 23-test suite in all three configured browsers against commit `1322ef0`.

| Browser | Passed | Skipped | Failed | Flaky |
| ------- | -----: | ------: | -----: | ----: |
| Chromium | 21 | 2 | 0 | 0 |
| Firefox | 21 | 2 | 0 | 0 |
| WebKit | 21 | 2 | 0 | 0 |
| **Total** | **63** | **6** | **0** | **0** |

The skips are explicit current-data preconditions, not hidden failures:

- `TC-LEAVE-003` skips when the default Leave List has no row from which to derive a matching status;
- `TC-PIM-007` skips when the current Employee List has fewer than two result pages.

HTML reports are uploaded as separate GitHub Actions artifacts for every executed browser.

## Technology

- Playwright Test
- TypeScript
- Node.js and npm
- GitHub Actions
- Chromium, Firefox and WebKit
- dotenv for local environment configuration

## Environment Constraints

The target is a shared public demo. Other visitors can change or remove users, employees, lookup values and leave records while a test is running. The application can also return transient HTTP 500 responses or expire sessions under load.

The suite accounts for this by:

- keeping every test short and independently authenticated;
- running one worker at a time;
- avoiding create, update and delete operations;
- reading suitable search values from current application state;
- avoiding exact record counts, fixed employee names and leave balances;
- using explicit skips only when a data-dependent precondition is absent;
- synchronizing dynamic searches with their collection responses before asserting the corresponding UI state;
- retaining screenshots, videos and traces for failures.

## Local Setup

Prerequisites: a current Node.js LTS release and npm.

```bash
git clone https://github.com/Yeromenko-Kateryna/orangehrm-e2e-qa-automation.git
cd orangehrm-e2e-qa-automation
npm ci
npx playwright install
```

Create `.env` from `.env.example` and provide the public demo credentials displayed by OrangeHRM:

```env
BASE_URL=https://opensource-demo.orangehrmlive.com
DEMO_USERNAME=
DEMO_PASSWORD=
```

The real `.env` file is ignored by Git and must not be committed.

## Running Tests

```bash
# TypeScript validation
npm run typecheck

# All configured browsers
npm test

# Individual browsers
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Interactive and debugging modes
npm run test:ui
npm run test:debug

# Open the latest HTML report
npm run report
```

## Continuous Integration

The GitHub Actions workflow:

- runs Chromium regression on pushes and pull requests to `main` or `master`;
- supports a manual full cross-browser run in Chromium, Firefox and WebKit;
- validates required repository secrets before running tests;
- installs only the browser required by each job;
- uploads a browser-specific Playwright HTML report;
- retries a failed test once in CI to distinguish transient public-environment failures from repeatable failures.

Repository secrets required by CI:

- `DEMO_USERNAME`
- `DEMO_PASSWORD`

## Documentation

- [Test plan](docs/test-plan.md) — finalized scope, strategy, risks, environment and traceability
- [Exploration log](docs/exploration-log.md) — confirmed observations and execution evidence
- [Manual test cases](docs/test-cases.md) — 24 prioritized cases
- [Locator notes](docs/locator-notes.md) — locator and synchronization decisions
- [QA summary report](docs/qa-summary-report.md) — final metrics, outcomes and limitations

## Project Structure

```text
.
├── .github/workflows/playwright.yml
├── docs/
│   ├── exploration-log.md
│   ├── locator-notes.md
│   ├── qa-summary-report.md
│   ├── test-cases.md
│   └── test-plan.md
├── tests/
│   ├── admin.spec.ts
│   ├── helpers.ts
│   ├── leave.spec.ts
│   ├── login.spec.ts
│   └── pim.spec.ts
├── .env.example
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Final Quality Statement

No product defect was confirmed within the authorized read-only scope. The final automated regression completed successfully in all configured browsers. Remaining limitations are caused by the mutable public-demo data and unavailable isolated test-data control, and are documented rather than hidden by weak assertions.
