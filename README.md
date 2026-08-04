# OrangeHRM E2E QA Automation Portfolio

Manual exploration, risk analysis and test design for the [OrangeHRM public demo](https://opensource-demo.orangehrmlive.com/). The project demonstrates read-only exploratory testing in a shared environment, evidence-based rule confirmation, prioritized test design and traceability from observation to automation candidate.

Playwright and TypeScript automation is the next phase and is not implemented yet.

## Project Status

| Phase | Status |
| ----- | ------ |
| Manual exploration | Completed for Login, Admin, PIM and Leave |
| Functional and business-rule analysis | Completed |
| Risk and environment analysis | Completed, R-001 to R-018 |
| Prioritized manual test cases | Completed, 24 cases |
| Traceability matrix | Completed |
| Playwright implementation | In progress |
| Cross-browser execution | Planned |

## Coverage

- 24 prioritized manual test cases across Login and Session, Admin User Management, PIM Employee List and Leave List.
- 24 confirmed observations traced to test cases and automation candidates.
- 22 scenarios selected for automation, 2 kept manual with documented justification.
- No confirmed product defect. Two candidate defects were investigated and resolved as expected behavior.

## Environment Constraints

The public demo is a shared environment. System users, employee records, leave requests and balances are created and deleted by other visitors during a session, and the displayed date format is a configurable Admin setting.

Test design accounts for this:

- search values are obtained during execution rather than written into test cases;
- record counts, employee names and leave balances are never used as expected results;
- assertions target structure, validation and filter behavior rather than specific data;
- the session expires during active use, so each scenario is short and self-contained;
- no test case creates, modifies or deletes shared data.

Two scenarios are excluded from automation because their expected behavior could not be established reliably: employee autocomplete behavior and exact employee ID sort order. Both are recorded as risks rather than defects.

## Documentation

- [Test plan](docs/test-plan.md) - scope, risks, environment limitations, automation strategy and traceability matrix
- [Exploration log](docs/exploration-log.md) - session records, confirmed observations and open questions
- [Manual test cases](docs/test-cases.md) - 24 prioritized cases with preconditions, steps and expected results

## Project Structure

```text
docs/   Test plan, exploration log and manual test cases
tests/  Playwright specifications (planned)
```

## Planned Automation

- Playwright with TypeScript.
- Self-contained authentication per test, required by the observed session behavior.
- Stable locators based on test attributes, roles, labels and clear user-facing text.
- Cross-browser execution in Chromium, Firefox and WebKit.
- Screenshots, videos and traces captured for failed tests.
- Read-only interaction with shared application data.
