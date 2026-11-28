<!-- header:start -->

# ![Icon](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItcGFja2FnZSIgY29sb3I9ImJsdWUiPjxsaW5lIHgxPSIxNi41IiB5MT0iOS40IiB4Mj0iNy41IiB5Mj0iNC4yMSI+PC9saW5lPjxwYXRoIGQ9Ik0yMSAxNlY4YTIgMiAwIDAgMC0xLTEuNzNsLTctNGEyIDIgMCAwIDAtMiAwbC03IDRBMiAyIDAgMCAwIDMgOHY4YTIgMiAwIDAgMCAxIDEuNzNsNyA0YTIgMiAwIDAgMCAyIDBsNy00QTIgMiAwIDAgMCAyMSAxNnoiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPSIzLjI3IDYuOTYgMTIgMTIuMDEgMjAuNzMgNi45NiI+PC9wb2x5bGluZT48bGluZSB4MT0iMTIiIHkxPSIyMi4wOCIgeDI9IjEyIiB5Mj0iMTIiPjwvbGluZT48L3N2Zz4=) GitHub Action: Test Python

<!-- header:end -->

<!-- jscpd:ignore-start -->
<!-- Generated repository badges repeat across references. -->

<!-- badges:start -->

[![Marketplace](https://img.shields.io/badge/Marketplace-test--python-blue?logo=github-actions)](https://github.com/marketplace/actions/test-python)
[![Release](https://img.shields.io/github/v/release/hoverkraft-tech/ci-github-python)](https://github.com/hoverkraft-tech/ci-github-python/releases)
[![License](https://img.shields.io/github/license/hoverkraft-tech/ci-github-python)](http://choosealicense.com/licenses/mit/)
[![Stars](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-python?style=social)](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-python?style=social)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/hoverkraft-tech/ci-github-python/blob/main/CONTRIBUTING.md)

<!-- badges:end -->

<!-- jscpd:ignore-end -->

<!-- overview:start -->

## Overview

Run pytest with detailed test results on every runtime and optional coverage.

Run setup-python first. Default commands write JUnit and coverage.py XML into a
fresh directory. Configure measured packages in [tool.coverage.run].
Custom commands receive CI_REPORTS_DIR and CI_TEST_COVERAGE.

Reports are registered before execution and validated afterward, including after
command failure. Missing or malformed required reports fail the action. Call
the common ci-reports workflow once after all checks; no report outputs need forwarding.
Producer jobs require actions: read and contents: read.

<!-- overview:end -->

<!-- jscpd:ignore-start -->
<!-- Generated API reference repeats action and workflow metadata. -->

<!-- usage:start -->

## Usage

```yaml
- uses: hoverkraft-tech/ci-github-python/actions/test@aac96a4977a2025432625385dd73aeeebb7af64a # feat/native-github-coverage
  with:
    # uv project directory.
    # Default: `.`
    working-directory: .

    # Trusted Bash command replacing pytest. Write reports under CI_REPORTS_DIR and honor CI_TEST_COVERAGE for instrumentation.
    command: ""

    # Collect test coverage. The default pytest command disables instrumentation when false.
    # Default: `true`
    coverage: "true"

    # Required JUnit or TAP paths relative to CI_REPORTS_DIR, one per line.
    # Default: `junit.xml`
    test-results: junit.xml

    # Required native coverage paths relative to CI_REPORTS_DIR when coverage is enabled, one per line.
    # Default: `coverage.xml`
    test-coverage: coverage.xml
```

<!-- usage:end -->

<!-- inputs:start -->

## Inputs

| **Input**               | **Description**                                                                                                           | **Required** | **Default**    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------ | -------------- |
| **`working-directory`** | uv project directory.                                                                                                     | **false**    | `.`            |
| **`command`**           | Trusted Bash command replacing pytest. Write reports under CI_REPORTS_DIR and honor CI_TEST_COVERAGE for instrumentation. | **false**    | -              |
| **`coverage`**          | Collect test coverage. The default pytest command disables instrumentation when false.                                    | **false**    | `true`         |
| **`test-results`**      | Required JUnit or TAP paths relative to CI_REPORTS_DIR, one per line.                                                     | **false**    | `junit.xml`    |
| **`test-coverage`**     | Required native coverage paths relative to CI_REPORTS_DIR when coverage is enabled, one per line.                         | **false**    | `coverage.xml` |

<!-- inputs:end -->

<!-- secrets:start -->
<!-- secrets:end -->

<!-- outputs:start -->

## Outputs

| **Output**               | **Description**                                                       |
| ------------------------ | --------------------------------------------------------------------- |
| **`report-artifact-id`** | Native report bundle, including available diagnostics after failures. |

<!-- outputs:end -->

<!-- jscpd:ignore-end -->

<!-- examples:start -->
<!-- examples:end -->

<!-- jscpd:ignore-start -->
<!-- Generated repository and tool boilerplate repeats across references. -->

<!-- contributing:start -->

## Contributing

Contributions are welcome! Please see the [contributing guidelines](https://github.com/hoverkraft-tech/ci-github-python/blob/main/CONTRIBUTING.md) for more details.

<!-- contributing:end -->

<!-- security:start -->
<!-- security:end -->

<!-- license:start -->

## License

This project is licensed under the MIT License.

SPDX-License-Identifier: MIT

Copyright © 2026 hoverkraft

For more details, see the [license](http://choosealicense.com/licenses/mit/).

<!-- license:end -->

<!-- generated:start -->

---

This documentation was automatically generated by [CI Dokumentor](https://github.com/hoverkraft-tech/ci-dokumentor).

<!-- generated:end -->

<!-- jscpd:ignore-end -->
