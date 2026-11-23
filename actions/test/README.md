<!-- header:start -->

# ![Icon](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItcGFja2FnZSIgY29sb3I9ImJsdWUiPjxsaW5lIHgxPSIxNi41IiB5MT0iOS40IiB4Mj0iNy41IiB5Mj0iNC4yMSI+PC9saW5lPjxwYXRoIGQ9Ik0yMSAxNlY4YTIgMiAwIDAgMC0xLTEuNzNsLTctNGEyIDIgMCAwIDAtMiAwbC03IDRBMiAyIDAgMCAwIDMgOHY4YTIgMiAwIDAgMCAxIDEuNzNsNyA0YTIgMiAwIDAgMCAyIDBsNy00QTIgMiAwIDAgMCAyMSAxNnoiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPSIzLjI3IDYuOTYgMTIgMTIuMDEgMjAuNzMgNi45NiI+PC9wb2x5bGluZT48bGluZSB4MT0iMTIiIHkxPSIyMi4wOCIgeDI9IjEyIiB5Mj0iMTIiPjwvbGluZT48L3N2Zz4=) GitHub Action: Test Python

<div align="center">
  <img src="../../.github/logo.svg" width="60px" align="center" alt="Test Python" />
</div>

---

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

Run project-locked pytest with JUnit and Cobertura coverage.

Declare pytest and pytest-cov in the default uv dependency groups. Configure
coverage sources in `[tool.coverage.run]` to avoid measuring unrelated code.
A trusted Bash `command` replaces the default and must produce JUnit for test
reporting and `cobertura.xml` for coverage. The common parser handles both formats.

<!-- jscpd:ignore-start -->
<!-- Shared setup and reporting guidance for standalone actions. -->

Run [setup-python](../setup-python/README.md) first with the same `working-directory`.

<!-- jscpd:ignore-end -->

`coverage: "github"` is the default. Set `coverage: "codecov"` and grant the
job `id-token: write` for OIDC upload of `cobertura.xml`. An empty coverage
value disables publication while retaining JUnit; collection is controlled by
the command. Custom commands must produce the applicable report files.

<!-- jscpd:ignore-start -->
<!-- Shared setup and reporting guidance for standalone actions. -->

Native reports survive command failures and are retained for seven days.
See the [continuous integration workflow](../../.github/workflows/continuous-integration.md#reports-and-permissions) for consolidated reporting and permissions.

<!-- jscpd:ignore-end -->

<!-- overview:end -->

<!-- jscpd:ignore-start -->
<!-- Generated API reference repeats action and workflow metadata. -->

<!-- usage:start -->

## Usage

```yaml
- uses: hoverkraft-tech/ci-github-python/actions/test@cd59232bc5455db2c034b00499a775411f1104b7 # fix/enforce-lint-checks
  with:
    # uv project directory.
    # Default: `.`
    working-directory: .

    # Trusted Bash test command. Configure measured packages in [tool.coverage.run]. Generate junit.xml and cobertura.xml for reporting.
    # Default: `uv run --locked pytest --junitxml=junit.xml --cov --cov-report=term-missing --cov-report=xml:cobertura.xml`
    command: uv run --locked pytest --junitxml=junit.xml --cov
      --cov-report=term-missing --cov-report=xml:cobertura.xml

    # Publication only: `github`, `codecov`, or empty. Collection is controlled by command.
    # Default: `github`
    coverage: github

    # Outer calling job ID for consolidated ci-reports. Defaults to the current job ID. No individual PR comments are posted.
    report-group: ""
```

<!-- usage:end -->

<!-- inputs:start -->

## Inputs

| **Input**               | **Description**                                                                                                                    | **Required** | **Default**                                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------ |
| **`working-directory`** | uv project directory.                                                                                                              | **false**    | `.`                                                                                                          |
| **`command`**           | Trusted Bash test command. Configure measured packages in [tool.coverage.run]. Generate junit.xml and cobertura.xml for reporting. | **false**    | `uv run --locked pytest --junitxml=junit.xml --cov --cov-report=term-missing --cov-report=xml:cobertura.xml` |
| **`coverage`**          | Publication only: `github`, `codecov`, or empty. Collection is controlled by command.                                              | **false**    | `github`                                                                                                     |
| **`report-group`**      | Outer calling job ID for consolidated ci-reports. Defaults to the current job ID. No individual PR comments are posted.            | **false**    | -                                                                                                            |

<!-- inputs:end -->

<!-- secrets:start -->
<!-- secrets:end -->

<!-- outputs:start -->

## Outputs

| **Output**               | **Description**                                                 |
| ------------------------ | --------------------------------------------------------------- |
| **`report-artifact-id`** | Native report artifact ID. Empty when no reports were produced. |

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
