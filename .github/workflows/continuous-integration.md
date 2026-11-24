<!-- header:start -->

# GitHub Reusable Workflow: Python Continuous Integration

<div align="center">
  <img src="../logo.svg" width="60px" align="center" alt="Python Continuous Integration" />
</div>

---

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
      id-token: write
    with:
      working-directory: .
      python-versions: '["3.13", "3.15"]'
```

An empty versions input uses project detection once. The last matrix entry is
the primary version: lint, audit and package checks run there, and only
that version publishes coverage. Tests run on every entry with fail-fast disabled.
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

### Reports and permissions

Tests retain JUnit and supported coverage files for seven days, including after
command failures. Lint retains parsed SARIF/Checkstyle reports. Only report files
are uploaded, with unique names for parallel calls; a job producing no reports
returns an empty `report-artifact-id`. Summaries and annotations work without PR
write permissions. Individual PR comments are not created.

Use the common
[ci-reports workflow](https://github.com/hoverkraft-tech/ci-github-common/blob/main/.github/workflows/ci-reports.yml)
for consolidated comments after standalone producer jobs; set `report-group` to
the outer calling job ID when required. Python JUnit and Cobertura reports use the common
parser.

`test: '{"coverage":"codecov"}'` enables OIDC upload. The expected coverage file is
`cobertura.xml`. A custom command must produce
the applicable file. `coverage` controls publication, not collection, and an
empty value still retains JUnit results. The reusable workflow declares
`id-token: write` for Codecov and callers must grant it, including for default
GitHub reports. Standalone GitHub reporting requires only read permissions.
No repository-specific bot secrets are required by the public actions or workflow.

See [setup-python](../../actions/setup-python/README.md), [lint](../../actions/lint/README.md),
[test](../../actions/test/README.md) and [audit](../../actions/audit/README.md)
for standalone action usage. Pin the workflow to a reviewed commit SHA in production.

### Permissions

- **`contents`**: `read`
- **`id-token`**: `write`

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
    uses: hoverkraft-tech/ci-github-python/.github/workflows/continuous-integration.yml@244c9508c64e31d1a87327cc9ed07a13c235c454 # main
    permissions:
      contents: read
      id-token: write
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

      # JSON array of Python versions. The last entry runs lint, audit and package checks and publishes coverage. Empty runs project detection once. An empty entry uses the project version.
      python-versions: ""

      # true for default checks, a trusted Bash command, or a JSON object with command. false, null or empty disables lint.
      # Default: `true`
      lint: "true"

      # true for default tests, a trusted Bash command, or a JSON object with command, coverage (`github`, `codecov` or empty). false, null or empty disables tests. Coverage publication runs only on the last version; the command controls collection.
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

| **Input**               | **Description**                                                                                                                                                                                                                                   | **Required** | **Type**    | **Default**         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- | ------------------- |
| **`runs-on`**           | JSON array of Linux runner labels for all jobs.                                                                                                                                                                                                   | **false**    | **string**  | `["ubuntu-latest"]` |
| **`checks`**            | Enable all checks, including distribution checks.                                                                                                                                                                                                 | **false**    | **boolean** | `true`              |
| **`working-directory`** | One project directory inside the checkout. Use a caller matrix for multiple projects.                                                                                                                                                             | **false**    | **string**  | `.`                 |
| **`python-versions`**   | JSON array of Python versions. The last entry runs lint, audit and package checks and publishes coverage. Empty runs project detection once. An empty entry uses the project version.                                                             | **false**    | **string**  | -                   |
| **`lint`**              | true for default checks, a trusted Bash command, or a JSON object with command. false, null or empty disables lint.                                                                                                                               | **false**    | **string**  | `true`              |
| **`test`**              | true for default tests, a trusted Bash command, or a JSON object with command, coverage (`github`, `codecov` or empty). false, null or empty disables tests. Coverage publication runs only on the last version; the command controls collection. | **false**    | **string**  | `true`              |
| **`audit`**             | Check production dependencies for known vulnerabilities.                                                                                                                                                                                          | **false**    | **boolean** | `true`              |
| **`dependency-review`** | Review dependency changes on pull requests. Requires GitHub dependency review availability.                                                                                                                                                       | **false**    | **boolean** | `true`              |
| **`package`**           | false disables distribution tests. true builds and installs wheel and sdist. A JSON object with tests supplies consumer smoke commands. Does not publish packages.                                                                                | **false**    | **string**  | `false`             |
| **`uv-version`**        | Pinned uv release.                                                                                                                                                                                                                                | **false**    | **string**  | `0.13.9`            |

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
