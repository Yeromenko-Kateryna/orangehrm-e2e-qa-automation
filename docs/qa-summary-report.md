# OrangeHRM E2E QA Summary Report

* **Version:** 1.0
* **Status:** Final
* **Date:** 15.08.2026
* **Author:** Kateryna Yeromenko

## 1. Executive Summary

The OrangeHRM E2E QA Automation portfolio project is complete for its selected read-only scope. Manual exploration, risk analysis, test design, Playwright implementation and cross-browser CI validation were completed for Login and Session, Admin User Management, PIM Employee List and Leave List.

The final GitHub Actions workflow executed 23 automated tests in Chromium, Firefox and WebKit. Across 69 browser-specific executions, 63 passed, 6 were explicitly skipped because current shared data did not satisfy their preconditions, and none failed or remained flaky.

No product defect was confirmed. The observed instability was attributable to the mutable and occasionally unavailable public demo environment.

## 2. Scope Completed

| Module | Manual cases | Automated tests | Status |
| ------ | -----------: | --------------: | ------ |
| Login and Session | 5 | 5 | Completed |
| Admin User Management | 6 | 6 | Completed |
| PIM Employee List | 8 | 7 | Completed with one manual-only sorting case |
| Leave List | 5 | 5 | Completed |
| **Total** | **24** | **23** | **Completed** |

The automated suite covers 23 of 24 designed manual cases. This represents 95.8% automation coverage of the documented cases. `TC-PIM-008` remains manual-only because the shared data does not provide a stable basis for exact Employee ID ordering assertions.

## 3. Test Approach

The project used a risk-based, evidence-driven approach:

- expected behavior was derived from confirmed application observations because formal requirements were unavailable;
- all application interactions were read-only;
- tests authenticated independently and ran with one worker;
- dynamic values were obtained from current application state where necessary;
- exact record counts and mutable personal values were not used as expected results;
- UI assertions were synchronized with relevant collection responses for dynamic PIM and Leave searches;
- data-dependent tests used explicit runtime skips only when their documented preconditions were absent;
- CI retained HTML reports and failure evidence.

## 4. Final Execution Results

### 4.1 Push-triggered Chromium CI

| Item | Result |
| ---- | ------ |
| Commit | `1322ef0` |
| Browser | Chromium |
| Passed | 21 |
| Skipped | 2 |
| Failed | 0 |
| Flaky | 0 |

### 4.2 Manual Cross-browser CI

| Browser | Passed | Skipped | Failed | Flaky |
| ------- | -----: | ------: | -----: | ----: |
| Chromium | 21 | 2 | 0 | 0 |
| Firefox | 21 | 2 | 0 | 0 |
| WebKit | 21 | 2 | 0 | 0 |
| **Total** | **63** | **6** | **0** | **0** |

All 63 non-skipped executions passed. No cross-browser functional difference was observed.

## 5. Skip Analysis

The same two scenarios were skipped in each browser:

| Test | Skip condition | Classification |
| ---- | -------------- | -------------- |
| `TC-LEAVE-003` | The default Leave List had no current row from which to derive a status with a matching record | Unsatisfied shared-data precondition |
| `TC-PIM-007` | The current Employee List had fewer than two result pages | Unsatisfied shared-data precondition |

These skips are expected controls. They prevent vacuous passes and do not suppress assertion failures.

## 6. Defect and Risk Summary

### Confirmed defects

No product defect was confirmed within the selected scope.

### Remaining risks and limitations

| Area | Limitation | Treatment |
| ---- | ---------- | --------- |
| Shared records | Users, employees and leave requests can change during execution | Current-state data, response synchronization and explicit preconditions |
| Lookup values | Employment Status options can be changed by other visitors | Read and select a currently configured value during the same dropdown opening |
| Session availability | Sessions can expire and login can stall under public load | Independent login per test, sequential execution and one CI retry |
| Server availability | Transient HTTP 500 and connection-reset responses were observed | Classified as environment failures after successful controlled reruns |
| Leave data | A matching or empty status may not exist at execution time | Explicit data-dependent skip conditions |
| PIM pagination | A second results page may not exist | Explicit pagination precondition |
| PIM sorting | Exact Employee ID ordering is not stable enough for automation | `TC-PIM-008` retained as manual-only |
| Supervisor autocomplete | Expected selection behavior could not be established reliably | Recorded as a risk pending controlled reproduction |

## 7. Quality Gates

| Gate | Result |
| ---- | ------ |
| TypeScript validation passes | Met |
| No whitespace errors reported by `git diff --check` | Met |
| 23 tests discovered per browser | Met |
| Chromium regression succeeds in CI | Met |
| Firefox regression succeeds in CI | Met |
| WebKit regression succeeds in CI | Met |
| No unresolved failed or flaky test in final execution | Met |
| Credentials excluded from source control | Met |
| Read-only scope preserved | Met |
| Documentation aligned with implementation | Met |

## 8. Deliverables

- finalized test plan;
- exploration log with execution evidence;
- 24 prioritized manual test cases;
- locator and synchronization notes;
- 23 Playwright tests in TypeScript;
- GitHub Actions Chromium and manual cross-browser workflows;
- browser-specific Playwright HTML report artifacts;
- finalized README;
- this QA summary report.

## 9. Conclusion

The project exit criteria were met. The selected OrangeHRM read-only scope is supported by traceable manual cases, maintainable automation and successful execution in Chromium, Firefox and WebKit. Environment-dependent conditions remain clearly documented and controlled without weakening assertions or modifying shared data.

The repository is ready to be presented as a QA Automation portfolio project.
