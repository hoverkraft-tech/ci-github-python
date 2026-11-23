# Using Python CI

## Reusable workflow

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
the primary version: lint, audit and build or package checks run there, and only
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

## Standalone actions

Check out your project with `persist-credentials: false`, call
`actions/setup-python`, then `actions/lint`, `actions/test`, `actions/audit`, or the
build/distribution action. Use the same reviewed repository SHA for each action.
Lint and test actions do not install the project again. Use
`install-dependencies: "false"` only when the caller manages dependencies.
Working directories must resolve inside the checkout.

## Python projects

Use uv projects with committed `pyproject.toml`, `uv.lock` and preferably
`.python-version`. Explicit `python-version` takes precedence; otherwise
uv selects from `.python-version` and `requires-python`. Setup runs
`uv sync --locked`: missing or stale locks fail instead of being rewritten.
It installs uv's default groups and extras, not every optional dependency.
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

## Reports and permissions

Tests retain JUnit and supported coverage files for seven days, including after
command failures. Lint retains parsed SARIF/Checkstyle reports. Only report files
are uploaded, with unique names for parallel calls; a job producing no reports
returns an empty `report-artifact-id`. Summaries and annotations work without PR
write permissions. Individual PR comments are not created.

Use the common
[ci-reports workflow](https://github.com/hoverkraft-tech/ci-github-common/blob/main/.github/workflows/ci-reports.yml)
for consolidated comments after standalone producer jobs; set `report-group` to
the outer calling job ID when required. Python Cobertura reports use the common
parser. Go coverage uses native `go tool cover` summaries and retains
`coverage.out`; the common parser does not parse that native format.

`test: '{"coverage":"codecov"}'` enables OIDC upload. The default filenames are
`coverage.out` for Go and `cobertura.xml` for Python. A custom command must produce
the applicable file. `coverage` controls publication, not collection, and an
empty value still retains JUnit results. The reusable workflow declares
`id-token: write` for Codecov and callers must grant it, including for default
GitHub reports. Standalone GitHub reporting requires only read permissions.
No repository-specific bot secrets are required by the public actions or workflow.
