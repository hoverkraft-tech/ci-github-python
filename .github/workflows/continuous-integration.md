<!-- header:start -->

# GitHub Reusable Workflow: Python Continuous Integration

<!-- header:end -->
<!-- badges:start -->

[![Release](https://img.shields.io/github/v/release/hoverkraft-tech/ci-github-python)](https://github.com/hoverkraft-tech/ci-github-python/releases)
[![Stars](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-python?style=social)](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-python?style=social)

<!-- badges:end -->
<!-- overview:start -->

## Overview

Run opinionated language checks with project-owned configuration.
See the [usage guide](../../docs/usage/README.md).

### Permissions

- **`contents`**: `read`
- **`id-token`**: `write`

<!-- overview:end -->
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
    uses: hoverkraft-tech/ci-github-python/.github/workflows/continuous-integration.yml@f7c68ebb3ea6d60da7b6c741b2fc8fb67866cd4a # main
    permissions:
      contents: read
      id-token: write
    with:
      # JSON array of Linux runner labels for all jobs.
      # Default: `["ubuntu-latest"]`
      runs-on: '["ubuntu-latest"]'

      # Enable all checks, including build or distribution checks.
      # Default: `true`
      checks: true

      # One project directory inside the checkout. Use a caller matrix for multiple projects.
      # Default: `.`
      working-directory: .

      # JSON array of Python versions. The last entry runs lint, audit and build and publishes coverage. Empty runs project detection once. An empty entry uses the project version.
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
| **`checks`**            | Enable all checks, including build or distribution checks.                                                                                                                                                                                        | **false**    | **boolean** | `true`              |
| **`working-directory`** | One project directory inside the checkout. Use a caller matrix for multiple projects.                                                                                                                                                             | **false**    | **string**  | `.`                 |
| **`python-versions`**   | JSON array of Python versions. The last entry runs lint, audit and build and publishes coverage. Empty runs project detection once. An empty entry uses the project version.                                                                      | **false**    | **string**  | -                   |
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
<!-- examples:start -->
<!-- examples:end -->
<!-- contributing:start -->
<!-- contributing:end -->
<!-- security:start -->
<!-- security:end -->
<!-- license:start -->
<!-- license:end -->
<!-- generated:start -->

---

This documentation was automatically generated by [CI Dokumentor](https://github.com/hoverkraft-tech/ci-dokumentor).

<!-- generated:end -->
