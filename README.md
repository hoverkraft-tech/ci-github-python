# CI GitHub Python

Opinionated GitHub Actions and reusable workflows for Python projects,
following the conventions of [ci-github-nodejs](https://github.com/hoverkraft-tech/ci-github-nodejs)
and [ci-github-php](https://github.com/hoverkraft-tech/ci-github-php).

## Prerequisites

A uv project with committed `pyproject.toml` and `uv.lock`. Declare Ruff,
Black, mypy, pytest and pytest-cov in the default development dependency group.
Use GitHub.com and a Linux Actions runner supporting Node.js 24 actions and
same-repository `$/` references.

## Quick start

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
```

The workflow detects the project's runtime. Pin the workflow to a reviewed
commit SHA in production. The reusable workflow declares OIDC permission for
optional Codecov uploads, so callers must grant `id-token: write`; standalone
actions with GitHub reporting require only `contents: read`.

## Actions

| Action                                         | Purpose                                                     |
| ---------------------------------------------- | ----------------------------------------------------------- |
| [setup-python](actions/setup-python/README.md) | Install the project runtime and dependencies                |
| [lint](actions/lint/README.md)                 | Check style and static analysis                             |
| [test](actions/test/README.md)                 | Run tests and retain native reports                         |
| [audit](actions/audit/README.md)               | Check dependency vulnerabilities                            |
| [package/test](actions/package/test/README.md) | Validate wheels and source distributions in clean consumers |

## Documentation

- [Usage and configuration](docs/usage/README.md)
- [Workflow reference](.github/workflows/continuous-integration.md)
- [Contributing](CONTRIBUTING.md)
- [Documentation index](docs/README.md)

## License

[MIT](LICENSE)
