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

Run Python tests and retain native test and coverage reports.

Use the matching setup action first. Commands must generate JUnit reports.
Coverage collection requires Cobertura XML. The test command controls instrumentation.

Forward report-plan from standalone jobs, or use the reusable CI workflow, which
exposes the complete expected plan automatically. Choose external coverage
publication once in the common ci-reports workflow. This action posts no comments
and needs no publication permissions. Available reports survive test failures.

<!-- overview:end -->

<!-- jscpd:ignore-start -->
<!-- Generated API reference repeats action and workflow metadata. -->

<!-- usage:start -->

## Usage

```yaml
- uses: hoverkraft-tech/ci-github-python/actions/test@ea81a685d9e862c5f13215d8b95476a4c0aa70d8 # feat/native-github-coverage
  with:
    # uv project directory.
    # Default: `.`
    working-directory: .

    # Trusted Bash test command. Configure measured packages in [tool.coverage.run]. Generate junit.xml and cobertura.xml for reporting.
    # Default: `uv run --locked pytest --junitxml=junit.xml --cov --cov-report=term-missing --cov-report=xml:cobertura.xml`
    command: uv run --locked pytest --junitxml=junit.xml --cov
      --cov-report=term-missing --cov-report=xml:cobertura.xml

    # Optional JSON array of Cobertura file, language and label. Empty uses cobertura.xml and the project directory as its stable label.
    coverage-reports: ""

    # Require and collect Cobertura coverage. Set false to retain only available native diagnostics. Instrumentation is controlled by the test command.
    # Default: `true`
    coverage: "true"

    # Expected producer metadata supplied by reusable workflows. Leave empty for a standalone invocation.
    report-plan: ""
```

<!-- usage:end -->

<!-- inputs:start -->

## Inputs

| **Input**               | **Description**                                                                                                                                   | **Required** | **Default**                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------ |
| **`working-directory`** | uv project directory.                                                                                                                             | **false**    | `.`                                                                                                          |
| **`command`**           | Trusted Bash test command. Configure measured packages in [tool.coverage.run]. Generate junit.xml and cobertura.xml for reporting.                | **false**    | `uv run --locked pytest --junitxml=junit.xml --cov --cov-report=term-missing --cov-report=xml:cobertura.xml` |
| **`coverage-reports`**  | Optional JSON array of Cobertura file, language and label. Empty uses cobertura.xml and the project directory as its stable label.                | **false**    | -                                                                                                            |
| **`coverage`**          | Require and collect Cobertura coverage. Set false to retain only available native diagnostics. Instrumentation is controlled by the test command. | **false**    | `true`                                                                                                       |
| **`report-plan`**       | Expected producer metadata supplied by reusable workflows. Leave empty for a standalone invocation.                                               | **false**    | -                                                                                                            |

<!-- inputs:end -->

<!-- secrets:start -->
<!-- secrets:end -->

<!-- outputs:start -->

## Outputs

| **Output**               | **Description**                                                       |
| ------------------------ | --------------------------------------------------------------------- |
| **`report-plan`**        | Expected report metadata. Forward from standalone jobs.               |
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
