<!-- header:start -->

# GitHub Reusable Workflow: Python Continuous Integration

<!-- header:end -->

<!-- jscpd:ignore-start -->
<!-- Generated repository badges repeat across references. -->

<!-- badges:start -->

[![Release](https://img.shields.io/github/v/release/hoverkraft-tech/ci-github-python)](https://github.com/hoverkraft-tech/ci-github-python/releases)
[![License](https://img.shields.io/github/license/hoverkraft-tech/ci-github-python)](http://choosealicense.com/licenses/mit/)
[![Stars](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-python?style=social)](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-python?style=social)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/hoverkraft-tech/ci-github-python/blob/main/CONTRIBUTING.md)

<!-- badges:end -->

<!-- jscpd:ignore-end -->

<!-- overview:start -->

## Overview

Run opinionated checks with project-owned configuration.

### Quick start

```yaml
name: CI
on: [push, pull_request]
permissions: {}
jobs:
  python:
    uses: hoverkraft-tech/ci-github-python/.github/workflows/continuous-integration.yml@main
    permissions:
      actions: read
      contents: read
    with:
      working-directory: .
      python-versions: '["3.13", "3.15"]'
```

An empty versions input uses project detection once. The highest configured version is
the primary version: lint, audit and package checks run there, and only
that version contributes coverage. Tests run on every entry with fail-fast disabled.
Duplicate, malformed and non-string versions are rejected. `runs-on` is a JSON
array of Linux labels and applies to every job, including configuration.

`checks: false` disables every check. Set `lint` or `test` to the string
`"false"`, `"null"` or an empty string to disable that check. A command string or
JSON object with `command` replaces its default. Commands are trusted Bash
programs and run unchanged with failure propagation; do not populate them from
untrusted pull request text. Unknown options fail before any project execution.

Dependency review runs only on pull requests. Disable it with
`dependency-review: false` when unavailable for the caller repository.
`audit: false` disables vulnerability scanning. Audit results depend on the
current vulnerability database and require network access.

### Python projects

Use uv projects with committed `pyproject.toml`, `uv.lock` and preferably
`.python-version`. Explicit `python-version` takes precedence; otherwise
uv selects from `.python-version` and `requires-python`. Setup runs
`uv sync --locked`: missing or stale locks fail instead of being rewritten.
It installs uv's default dependency groups; optional extras require caller configuration.
Configure `[tool.uv].default-groups` when additional groups are needed.

Declare Ruff, Black, mypy, pytest and pytest-cov in those default groups.
Ruff reports SARIF, Black checks formatting, and mypy uses the project's
configuration. All three lint checks execute even after a failure.
Configure coverage sources under `[tool.coverage.run]` to avoid measuring
unrelated code. The [fixture](../../tests/python-project/pyproject.toml)
shows a typed `src/` package and project-owned tool configuration.

The audit action exports the locked production environment with hashes,
then runs pip-audit. Development groups and the project itself are excluded.
Registry dependencies with hashes are the supported audit input; direct
VCS or editable dependencies may need a project-specific audit workflow.

Distribution checks are opt-in:

```yaml
with:
  package: '{"tests":"python -I -c \"import my_package\""}'
```

The action builds with `uv build --no-sources`, installs the wheel and
sdist independently into temporary venvs, checks dependencies, and runs
the supplied commands outside the source checkout. `PACKAGE_NAME`,
`PACKAGE_VERSION` and the consumer venv's `PATH` are available. Pin the
build backend in `build-system.requires` for reproducible builds.
Build backends execute code; Python has no general equivalent to npm's
`ignore-scripts` switch. The action does not publish to PyPI.

### Reports and coverage

Every runtime retains detailed test results. The highest configured version runs
lint and coverage once. Default pytest commands disable coverage instrumentation
on other versions. Custom commands receive CI_TEST_COVERAGE and CI_REPORTS_DIR.
Outputs are validated by the test action, including after command failure.

Call ci-github-common's ci-reports.yml once after all producer jobs with
job-results: toJSON(needs). No report plans or artifact IDs need forwarding.
Producer calls need actions: read and contents: read. The reporting caller grants
actions: read, contents: read, pull-requests: write, code-quality: write,
id-token: write and security-events: write; internal publisher jobs narrow these.
Lint and test results default to annotations. Coverage defaults to GitHub when
available, then a comment or summary. Choose destinations using lint-reporters,
test-results-reporters and test-coverage-reporters on that single reporting call.

### Permissions

- **`actions`**: `read`
- **`contents`**: `read`

<!-- overview:end -->

<!-- jscpd:ignore-start -->
<!-- Generated API reference repeats action and workflow metadata. -->

<!-- usage:start -->

## Usage

```yaml
name: Python Continuous Integration
on:
  push:
    branches:
      - main
permissions: {}
jobs:
  continuous-integration:
    uses: hoverkraft-tech/ci-github-python/.github/workflows/continuous-integration.yml@aac96a4977a2025432625385dd73aeeebb7af64a # feat/native-github-coverage
    permissions:
      actions: read
      contents: read
    with:
      # JSON array of Linux runner labels for all jobs.
      # Default: `["ubuntu-latest"]`
      runs-on: '["ubuntu-latest"]'

      # Enable all checks, including distribution checks.
      # Default: `true`
      checks: true

      # One project directory inside the checkout. Use a caller matrix for multiple projects.
      # Default: `.`
      working-directory: .

      # JSON array of Python versions. The highest configured version runs lint, audit, package checks and coverage; every version retains test results. Empty uses project detection once.
      python-versions: ""

      # true for defaults, a Bash command, or JSON options (command, lint-results). false, null or empty disables lint.
      # Default: `true`
      lint: "true"

      # true for defaults, a Bash command, or JSON options (command, coverage, test-results, test-coverage). false, null or empty disables tests.
      # Default: `true`
      test: "true"

      # Check production dependencies for known vulnerabilities.
      # Default: `true`
      audit: true

      # Review dependency changes on pull requests. Requires GitHub dependency review availability.
      # Default: `true`
      dependency-review: true

      # false disables distribution tests. true builds and installs wheel and sdist. A JSON object with tests supplies consumer smoke commands. Does not publish packages.
      # Default: `false`
      package: "false"

      # Pinned uv release.
      # Default: `0.13.9`
      uv-version: 0.13.9
```

<!-- usage:end -->

<!-- inputs:start -->

## Inputs

### Workflow Call Inputs

| **Input**               | **Description**                                                                                                                                                                     | **Required** | **Type**    | **Default**         |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- | ------------------- |
| **`runs-on`**           | JSON array of Linux runner labels for all jobs.                                                                                                                                     | **false**    | **string**  | `["ubuntu-latest"]` |
| **`checks`**            | Enable all checks, including distribution checks.                                                                                                                                   | **false**    | **boolean** | `true`              |
| **`working-directory`** | One project directory inside the checkout. Use a caller matrix for multiple projects.                                                                                               | **false**    | **string**  | `.`                 |
| **`python-versions`**   | JSON array of Python versions. The highest configured version runs lint, audit, package checks and coverage; every version retains test results. Empty uses project detection once. | **false**    | **string**  | -                   |
| **`lint`**              | true for defaults, a Bash command, or JSON options (command, lint-results). false, null or empty disables lint.                                                                     | **false**    | **string**  | `true`              |
| **`test`**              | true for defaults, a Bash command, or JSON options (command, coverage, test-results, test-coverage). false, null or empty disables tests.                                           | **false**    | **string**  | `true`              |
| **`audit`**             | Check production dependencies for known vulnerabilities.                                                                                                                            | **false**    | **boolean** | `true`              |
| **`dependency-review`** | Review dependency changes on pull requests. Requires GitHub dependency review availability.                                                                                         | **false**    | **boolean** | `true`              |
| **`package`**           | false disables distribution tests. true builds and installs wheel and sdist. A JSON object with tests supplies consumer smoke commands. Does not publish packages.                  | **false**    | **string**  | `false`             |
| **`uv-version`**        | Pinned uv release.                                                                                                                                                                  | **false**    | **string**  | `0.13.9`            |

<!-- inputs:end -->

<!-- secrets:start -->
<!-- secrets:end -->

<!-- outputs:start -->
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

Copyright © 2026 hoverkraft-tech

For more details, see the [license](http://choosealicense.com/licenses/mit/).

<!-- license:end -->

<!-- generated:start -->

---

This documentation was automatically generated by [CI Dokumentor](https://github.com/hoverkraft-tech/ci-dokumentor).

<!-- generated:end -->

<!-- jscpd:ignore-end -->
