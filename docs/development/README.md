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

The [Dockerfile](../../.devcontainer/Dockerfile) pins the base and tool images.
The generated feature lockfile pins installers. Dependabot updates these images
and feature locks; Renovate maintains runtime versions in the configuration.
Rebuild the container after changing its configuration, Dockerfile or lockfile.

## Coverage

The Node tests execute workflow configuration directly to check matrix selection,
disable switches and invalid input.
[Action contract tests](../../tests/action-contracts.test.cjs) load the actual
action metadata and execute its Bash commands and JavaScript. They check command
quoting, failure propagation, setup preconditions and artifact selection without
mocking language tools.

`__test-workflow-continuous-integration.yml` calls the public workflow with real
fixture versions and checks disabled behavior. Each action has a dedicated
`__test-action-*.yml` workflow, called by `__shared-ci.yml`. These cover standalone
setup, default commands, failure propagation and retrieval of retained reports.
These GitHub runner/artifact boundaries cannot be covered by local unit tests.
The fixture is deliberately small; it validates action wiring rather than the
language's arithmetic implementation.

## Documentation

Edit action metadata or workflow header comments, then run `make docs`.
The [reference template](../../.github/ci-dokumentor/reference.md) supplies section
markers and scoped duplication comments. The same CI Dokumentor release as the
shared `release-actions.yml` workflow fills those sections. Never edit generated
action readmes or workflow reference files by hand.
Usage belongs directly in generated action and workflow readmes. Put source
guidance in action descriptions and workflow header comments so `make docs`
preserves it. Contributor procedures belong here.

Documentation generation reads GitHub metadata for repository logos and licensing.
Set `GITHUB_TOKEN` when authentication is required or anonymous API limits are reached.

## Maintenance and releases

External actions are pinned to immutable commits. Dependabot updates actions,
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
markers cover repeated generated API sections and repository boilerplate in the
reference template. Action metadata marks only repeated setup and reporting
paragraphs; unique overview text and examples remain checked. The generator
preserves these markers, and all Markdown sections still receive formatting and
Markdown validation.

Super-Linter reads the fixture's `pyproject.toml` for Black, Ruff, isort and mypy.
It uses the same first-party import classification as project-local checks.
