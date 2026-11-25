<!-- header:start -->

# ![Icon](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItcGFja2FnZSIgY29sb3I9ImJsdWUiPjxsaW5lIHgxPSIxNi41IiB5MT0iOS40IiB4Mj0iNy41IiB5Mj0iNC4yMSI+PC9saW5lPjxwYXRoIGQ9Ik0yMSAxNlY4YTIgMiAwIDAgMC0xLTEuNzNsLTctNGEyIDIgMCAwIDAtMiAwbC03IDRBMiAyIDAgMCAwIDMgOHY4YTIgMiAwIDAgMCAxIDEuNzNsNyA0YTIgMiAwIDAgMCAyIDBsNy00QTIgMiAwIDAgMCAyMSAxNnoiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPSIzLjI3IDYuOTYgMTIgMTIuMDEgMjAuNzMgNi45NiI+PC9wb2x5bGluZT48bGluZSB4MT0iMTIiIHkxPSIyMi4wOCIgeDI9IjEyIiB5Mj0iMTIiPjwvbGluZT48L3N2Zz4=) GitHub Action: Test Python distribution

<div align="center">
  <img src="../../../.github/logo.svg" width="60px" align="center" alt="Test Python distribution" />
</div>

---

<!-- header:end -->

<!-- jscpd:ignore-start -->
<!-- Generated repository badges repeat across references. -->

<!-- badges:start -->

[![Marketplace](https://img.shields.io/badge/Marketplace-test--python--distribution-blue?logo=github-actions)](https://github.com/marketplace/actions/test-python-distribution)
[![Release](https://img.shields.io/github/v/release/hoverkraft-tech/ci-github-python)](https://github.com/hoverkraft-tech/ci-github-python/releases)
[![License](https://img.shields.io/github/license/hoverkraft-tech/ci-github-python)](http://choosealicense.com/licenses/mit/)
[![Stars](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-python?style=social)](https://img.shields.io/github/stars/hoverkraft-tech/ci-github-python?style=social)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/hoverkraft-tech/ci-github-python/blob/main/CONTRIBUTING.md)

<!-- badges:end -->

<!-- jscpd:ignore-end -->

<!-- overview:start -->

## Overview

Build and test a wheel and source distribution in clean consumers.

Declare `build-system` in `pyproject.toml` and pin its backend in
`build-system.requires`. The action runs `uv build --no-sources`, installs the
wheel and sdist independently in temporary venvs, checks dependencies and runs
the supplied `commands` outside the source checkout.

`PACKAGE_NAME`, `PACKAGE_VERSION` and the consumer venv's `PATH` are available
to the trusted Bash smoke tests. For example, use `python -I -c "import my_package"`
to check the installed distribution. Command failures fail the action.
Temporary environments are cleaned after success or failure. Build backends
execute code; there is no general equivalent to npm's `ignore-scripts` switch.
The action does not publish to PyPI. Enable it in the reusable workflow with
`package: "true"` or a JSON object containing `tests`.

<!-- jscpd:ignore-start -->
<!-- Shared setup and reporting guidance for standalone actions. -->

Run [setup-python](../../setup-python/README.md) first with the same `working-directory`.

See the [continuous integration workflow](../../../.github/workflows/continuous-integration.md) for orchestration and version matrices.

<!-- jscpd:ignore-end -->

<!-- overview:end -->

<!-- jscpd:ignore-start -->
<!-- Generated API reference repeats action and workflow metadata. -->

<!-- usage:start -->

## Usage

```yaml
- uses: hoverkraft-tech/ci-github-python/actions/package/test@4b801b911424c68370a3e713bc5404151ab4d772 # main
  with:
    # uv package directory with a build-system.
    # Default: `.`
    working-directory: .

    # Optional trusted Bash smoke tests run separately against the installed wheel and sdist. The consumer venv is on PATH; PACKAGE_NAME and PACKAGE_VERSION identify the distribution. Source checkout is not the working directory.
    commands: ""
```

<!-- usage:end -->

<!-- inputs:start -->

## Inputs

| **Input**               | **Description**                                                                                                                                                                                                                 | **Required** | **Default** |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- |
| **`working-directory`** | uv package directory with a build-system.                                                                                                                                                                                       | **false**    | `.`         |
| **`commands`**          | Optional trusted Bash smoke tests run separately against the installed wheel and sdist. The consumer venv is on PATH; PACKAGE_NAME and PACKAGE_VERSION identify the distribution. Source checkout is not the working directory. | **false**    | -           |

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

Copyright © 2026 hoverkraft

For more details, see the [license](http://choosealicense.com/licenses/mit/).

<!-- license:end -->

<!-- generated:start -->

---

This documentation was automatically generated by [CI Dokumentor](https://github.com/hoverkraft-tech/ci-dokumentor).

<!-- generated:end -->

<!-- jscpd:ignore-end -->
