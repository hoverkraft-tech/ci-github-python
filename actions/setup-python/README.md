<!-- header:start -->

# ![Icon](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItcGFja2FnZSIgY29sb3I9ImJsdWUiPjxsaW5lIHgxPSIxNi41IiB5MT0iOS40IiB4Mj0iNy41IiB5Mj0iNC4yMSI+PC9saW5lPjxwYXRoIGQ9Ik0yMSAxNlY4YTIgMiAwIDAgMC0xLTEuNzNsLTctNGEyIDIgMCAwIDAtMiAwbC03IDRBMiAyIDAgMCAwIDMgOHY4YTIgMiAwIDAgMCAxIDEuNzNsNyA0YTIgMiAwIDAgMCAyIDBsNy00QTIgMiAwIDAgMCAyMSAxNnoiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPSIzLjI3IDYuOTYgMTIgMTIuMDEgMjAuNzMgNi45NiI+PC9wb2x5bGluZT48bGluZSB4MT0iMTIiIHkxPSIyMi4wOCIgeDI9IjEyIiB5Mj0iMTIiPjwvbGluZT48L3N2Zz4=) GitHub Action: Setup Python

<div align="center">
  <img src="../../.github/logo.svg" width="60px" align="center" alt="Setup Python" />
</div>

---

<!-- header:end -->

<!-- jscpd:ignore-start -->
<!-- Generated repository badges repeat across references. -->

<!-- badges:start -->

[![Marketplace](https://img.shields.io/badge/Marketplace-setup--python-blue?logo=github-actions)](https://github.com/marketplace/actions/setup-python)
[![Release](https://img.shields.io/github/v/release/hoverkraft-tech/ci-github-python)](https://github.com/hoverkraft-tech/ci-github-python/releases)
[![License](https://img.shields.io/github/license/hoverkraft-tech/ci-github-python)](http://choosealicense.com/licenses/mit/)
[![Stars](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-python?style=social)](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-python?style=social)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/hoverkraft-tech/ci-github-python/blob/main/CONTRIBUTING.md)

<!-- badges:end -->

<!-- jscpd:ignore-end -->

<!-- overview:start -->

## Overview

Install Python and uv, cache downloads and synchronize locked dependencies.

Use a uv project with committed `pyproject.toml`, `uv.lock` and preferably
`.python-version`. Explicit `python-version` takes precedence; otherwise uv
selects from `.python-version` and `requires-python`.

Setup runs `uv sync --locked`: missing or stale locks fail instead of being
rewritten. It installs uv's default dependency groups; optional extras require
caller configuration. Configure `[tool.uv].default-groups` for additional groups.
Declare Ruff, Black, mypy, pytest and pytest-cov in these groups to use the default
lint and test actions. The [fixture](../../tests/python-project/pyproject.toml)
shows a typed `src/` package with project-owned tool configuration.

Set `install-dependencies: "false"` for runtime-only jobs or caller-managed
dependencies; `pyproject.toml` is still required. Working directories must stay
inside the checkout. Build backends execute code during installation; Python
has no general equivalent to npm's `ignore-scripts` switch.

### Standalone setup

Check out the project before setup. Use a Linux runner supporting Node.js 24
actions and pin all actions from this repository to the same reviewed commit.
Later lint, test and audit actions reuse this environment.

```yaml
steps:
  - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1
    with:
      persist-credentials: false
  - uses: hoverkraft-tech/ci-github-python/actions/setup-python@main
    with:
      working-directory: .
```

<!-- jscpd:ignore-start -->
<!-- Shared setup and reporting guidance for standalone actions. -->

See the [continuous integration workflow](../../.github/workflows/continuous-integration.md) for orchestration and version matrices.

<!-- jscpd:ignore-end -->

<!-- overview:end -->

<!-- jscpd:ignore-start -->
<!-- Generated API reference repeats action and workflow metadata. -->

<!-- usage:start -->

## Usage

```yaml
- uses: hoverkraft-tech/ci-github-python/actions/setup-python@f9227d0f443be4edbb7aacfc0701caaf25523f77 # fix/enforce-lint-checks
  with:
    # uv project directory inside the checkout.
    # Default: `.`
    working-directory: .

    # Explicit Python version. Empty uses the project's .python-version or requires-python.
    python-version: ""

    # Pinned uv release.
    # Default: `0.13.9`
    uv-version: 0.13.9

    # Synchronize locked dependencies and the project. Disable for tooling-only jobs.
    # Default: `true`
    install-dependencies: "true"
```

<!-- usage:end -->

<!-- inputs:start -->

## Inputs

| **Input**                  | **Description**                                                                       | **Required** | **Default** |
| -------------------------- | ------------------------------------------------------------------------------------- | ------------ | ----------- |
| **`working-directory`**    | uv project directory inside the checkout.                                             | **false**    | `.`         |
| **`python-version`**       | Explicit Python version. Empty uses the project's .python-version or requires-python. | **false**    | -           |
| **`uv-version`**           | Pinned uv release.                                                                    | **false**    | `0.13.9`    |
| **`install-dependencies`** | Synchronize locked dependencies and the project. Disable for tooling-only jobs.       | **false**    | `true`      |

<!-- inputs:end -->

<!-- secrets:start -->
<!-- secrets:end -->

<!-- outputs:start -->

## Outputs

| **Output**       | **Description**       |
| ---------------- | --------------------- |
| **`uv-version`** | Installed uv version. |

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
