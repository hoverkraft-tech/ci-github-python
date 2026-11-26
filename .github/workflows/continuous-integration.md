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
      contents: read
    with:
      working-directory: .
      python-versions: '["3.13", "3.15"]'
```

An empty versions input uses project detection once. The last matrix entry is
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

Lint and test jobs retain native diagnostics in one artifact per execution.
They post no PR comments and need no publication permissions. Configure native
test reports (JUnit or TAP) and lint reports (for example Checkstyle or SARIF).
Missing required reports fail even when the tool command exits successfully.
Available reports are retained after failures.

Tests require Cobertura by default. The highest configured runtime contributes
coverage; every runtime retains its test results. Set `test: '{"coverage":false}'`
for tests that deliberately produce no Cobertura. The command still controls
instrumentation. Custom `test.coverage-reports` describes Cobertura file paths,
Linguist languages and stable component labels; it belongs beside the producer.
Separate components stay separate. Merge shards in the framework first.

Call the common workflow once after producer workflows. It reads their complete
report plans from `needs`, regardless of calling job names:

```yaml
reports:
  needs: [checks]
  if: ${{ always() }}
  uses: hoverkraft-tech/ci-github-common/.github/workflows/ci-reports.yml@<commit-sha>
  permissions:
    contents: read
    pull-requests: write
    code-quality: write
    id-token: write
  with:
    job-results: ${{ toJSON(needs) }}
    coverage: github
```

Select `coverage: none` (default) for summaries, `github` for native GitHub
coverage, or `codecov`. Both publishers consume validated Cobertura. Native
GitHub coverage requires repository enablement and a default-branch baseline.
The reporting workflow owns one CI comment and the `CI reports complete` check.
Forks retain diagnostics without write operations. Partial reruns require
rerunning all producers. Producer workflows test the PR head or push revision.

Standalone action jobs forward their `report-plan` output. Custom outer matrices
must forward a complete plan derived from their configuration; GitHub's last
successful matrix output does not describe all executions. See the common
[recording action](https://github.com/hoverkraft-tech/ci-github-common/tree/main/actions/quality/record-ci-reports)
for the advanced contract. No collector-side coverage inventory is needed.

### Permissions

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
    uses: hoverkraft-tech/ci-github-python/.github/workflows/continuous-integration.yml@ea81a685d9e862c5f13215d8b95476a4c0aa70d8 # feat/native-github-coverage
    permissions:
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

      # JSON array of Python versions. The last entry runs lint, audit and package checks and contributes coverage. Empty runs project detection once. An empty entry uses the project version.
      python-versions: ""

      # true for default checks, a trusted Bash command, or a JSON object with command. false, null or empty disables lint.
      # Default: `true`
      lint: "true"

      # true for defaults, a Bash command, or JSON options (command, coverage, coverage-reports). false, null or empty disables tests. Coverage is collected once, on the primary runtime.
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

      # Expected producer metadata supplied by reusable workflows. Leave empty for a standalone invocation.
      report-plan: ""
```

<!-- usage:end -->

<!-- inputs:start -->

## Inputs

### Workflow Call Inputs

| **Input**               | **Description**                                                                                                                                                                         | **Required** | **Type**    | **Default**         |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- | ------------------- |
| **`runs-on`**           | JSON array of Linux runner labels for all jobs.                                                                                                                                         | **false**    | **string**  | `["ubuntu-latest"]` |
| **`checks`**            | Enable all checks, including distribution checks.                                                                                                                                       | **false**    | **boolean** | `true`              |
| **`working-directory`** | One project directory inside the checkout. Use a caller matrix for multiple projects.                                                                                                   | **false**    | **string**  | `.`                 |
| **`python-versions`**   | JSON array of Python versions. The last entry runs lint, audit and package checks and contributes coverage. Empty runs project detection once. An empty entry uses the project version. | **false**    | **string**  | -                   |
| **`lint`**              | true for default checks, a trusted Bash command, or a JSON object with command. false, null or empty disables lint.                                                                     | **false**    | **string**  | `true`              |
| **`test`**              | true for defaults, a Bash command, or JSON options (command, coverage, coverage-reports). false, null or empty disables tests. Coverage is collected once, on the primary runtime.      | **false**    | **string**  | `true`              |
| **`audit`**             | Check production dependencies for known vulnerabilities.                                                                                                                                | **false**    | **boolean** | `true`              |
| **`dependency-review`** | Review dependency changes on pull requests. Requires GitHub dependency review availability.                                                                                             | **false**    | **boolean** | `true`              |
| **`package`**           | false disables distribution tests. true builds and installs wheel and sdist. A JSON object with tests supplies consumer smoke commands. Does not publish packages.                      | **false**    | **string**  | `false`             |
| **`uv-version`**        | Pinned uv release.                                                                                                                                                                      | **false**    | **string**  | `0.13.9`            |
| **`report-plan`**       | Expected producer metadata supplied by reusable workflows. Leave empty for a standalone invocation.                                                                                     | **false**    | **string**  | -                   |

<!-- inputs:end -->

<!-- secrets:start -->
<!-- secrets:end -->

<!-- outputs:start -->

## Outputs

| **Output**        | **Description**                                                      |
| ----------------- | -------------------------------------------------------------------- |
| **`report-plan`** | Complete expected report plan, consumed automatically by ci-reports. |

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
