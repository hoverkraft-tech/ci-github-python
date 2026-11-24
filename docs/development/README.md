# Development

Install Node.js from `.node-version`, npm, uv and a supported Python runtime, and Docker.
Node.js and the development-only `yaml` dependency exercise the actual inline
Actions configuration scripts. Lint and test actions share the internal
[parse-ci-reports action](../../.github/actions/parse-ci-reports/README.md), which owns
file selection, unique artifact naming and uploads.

```sh
make setup
make test
make lint-fixture
make test-fixture
make lint
```

Use a private disk-backed temporary directory or the managed scratch wrapper
for local tests. Keep caches under ignored `.cache/` and clean disposable files
after use. `make ci` runs checks without automatically fixing source.

## Dev container

Open the repository with Visual Studio Code's "Dev Containers: Reopen in Container" command
or create a GitHub Codespace. The [configuration](../../.devcontainer/devcontainer.json)
provides Node.js, uv and the Python runtime selected by the fixture, GitHub CLI with `gh act`,
and Docker-in-Docker for `make lint` and `make docs`.
Nested Docker requires a host that supports privileged containers.

The container runs development commands as `vscode` and waits for `make setup`
to install dependencies before attaching. Run `make ci` in its terminal to execute
the repository checks. Setup uses the fixture's `.python-version` and `uv.lock`.
Visual Studio Code uses the resulting fixture virtual environment, with Black
and Ruff extensions.

The container uses the Microsoft Debian base image directly and installs tools
through Dev Container features. Dependabot maintains the features and their
[lockfile](../../.devcontainer/devcontainer-lock.json). Feature defaults select
tool versions when rebuilding. Rebuild after changing the configuration or lockfile.

## Coverage

The Node tests execute workflow configuration directly to check matrix selection,
disable switches and invalid input.
Action contract tests live beside each action as `action.test.cjs`, including
[setup](../../actions/setup-python/action.test.cjs),
[lint](../../actions/lint/action.test.cjs), [test](../../actions/test/action.test.cjs)
and [report parsing](../../.github/actions/parse-ci-reports/action.test.cjs).
They execute the actual Bash and JavaScript from adjacent action metadata to
check quoting, failure propagation, setup preconditions and artifact selection.
`make test` discovers these files and the workflow configuration tests.

In CI, each action's `action.test.cjs` runs in its dedicated
`__test-action-*.yml` workflow, alongside checks for standalone setup, default
commands, failure propagation and retrieval of retained reports.
`__test-workflow-continuous-integration.yml` runs only the workflow configuration
Node tests and calls the public workflow with real fixture versions and checks
disabled behavior. `__shared-ci.yml` calls all these test workflows.
The [`ci-github-nodejs` test action](https://github.com/hoverkraft-tech/ci-github-nodejs/tree/main/actions/test)
handles Node setup and dependency caching, installs locked dependencies with
lifecycle scripts disabled, and runs `test:ci` with the suite path from `arguments`.
These GitHub runner/artifact boundaries cannot be covered by local unit tests.
The fixture is deliberately small; it validates action wiring rather than the
language's arithmetic implementation.

## Documentation

Edit action metadata or workflow header comments, then run `make docs`.
The same CI Dokumentor release as the shared `release-actions.yml` workflow
updates the existing reference sections directly. Never edit generated action
readmes or workflow reference files by hand.
Usage belongs directly in generated action and workflow readmes. Put source
guidance in action descriptions and workflow header comments so `make docs`
preserves it. Contributor procedures belong here.

Documentation generation reads GitHub metadata for repository logos and licensing.
Set `GITHUB_TOKEN` when authentication is required or anonymous API limits are reached.

## Maintenance and releases

External actions and reusable workflows are pinned to full commit SHAs with
the exact matching release tag in an inline comment. Verify each tag resolves
to its pinned commit before changing either value. Dependabot updates actions,
Docker, npm validation dependencies and the language fixture. Renovate updates
embedded tool versions and the Node version file. Release changes use Conventional
Commits and the shared `ci-github-publish` preparation, planning, creation and
documentation workflows. Internal workflow filenames retain the `__` prefix.

Set `CI_BOT_APP_CLIENT_ID` and `CI_BOT_APP_PRIVATE_KEY` for the internal release
and Renovate automation. Enable the CI bot only after repository settings and
branch protection are configured. Release and generated-documentation writes
are gated on the client ID. Public CI needs none of these credentials.

The release automation versions this Actions repository. It does not publish
consumer libraries or application binaries. Configure consumer publishing in
the consumer repository using its registry and release policy.

## Branding

The SVG assets derive from the supplied Hoverkraft project artwork. Outlined
wordmarks and language marks preserve the supplied shapes without requiring fonts.
`.github/logo.svg` contains the compact badge. `.github/social-preview.svg` places
the full badge and wordmark on a white 1280 x 640 canvas; export it at those exact
dimensions to regenerate `.github/social-preview.png` and inspect the result.

Duplication checks include every repository source and reference file. Inline
markers cover repeated generated API sections and repository boilerplate in
the references. Action metadata marks only repeated setup and reporting
paragraphs; unique overview text and examples remain checked. The generator
preserves these markers, and all Markdown sections still receive formatting and
Markdown validation.

Super-Linter reads the fixture's `pyproject.toml` for Black, Ruff, isort and mypy.
It uses the same first-party import classification as project-local checks.
