# Development

Install Node.js from `.node-version`, npm, uv and a supported Python runtime, and Docker.
Node.js and the development-only `yaml` dependency exercise the actual inline
Actions configuration scripts. Lint and test actions share the internal
[retain-reports action](../../.github/actions/retain-reports/README.md), which owns
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

## Coverage

The Node tests execute workflow configuration directly to check matrix selection,
disable switches and invalid input. Action boundary tests execute real Bash
command wrappers to detect quoting and failure-propagation bugs, validate setup
preconditions and check artifact selection. They do not mock language tools.

`__test-workflow-continuous-integration.yml` calls the public workflow with real
fixture versions and checks disabled behavior. Each action has a dedicated
`__test-action-*.yml` workflow, called by `__shared-ci.yml`. These cover standalone
setup, default commands, failure propagation and retrieval of retained reports.
These GitHub runner/artifact boundaries cannot be covered by local unit tests.
The fixture is deliberately small; it validates action wiring rather than the
language's arithmetic implementation.

## Documentation

Edit action metadata or workflow header comments, then run `make docs`.
This uses the same CI Dokumentor release as the shared `release-actions.yml`
workflow. Never edit generated action readmes or workflow reference files by hand.
Usage belongs directly in generated action and workflow readmes. Put source
guidance in action descriptions and workflow header comments so `make docs`
preserves it. Contributor procedures belong here.

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

The SVG assets use the [Hoverkraft project badge](https://github.com/hoverkraft-tech/branding/tree/main/brand/identity)
and [Inter](https://github.com/rsms/inter). Text is outlined so rendering does
not depend on installed fonts. `.github/logo.svg` is the compact badge;
`.github/social-preview.svg` is the source for the 1280 x 640 PNG preview.
After changing the SVG, export the PNG at those dimensions and inspect both.
The Python mark comes from the [Python Software Foundation](https://www.python.org/community/logos/)
and retains its original colors and proportions.

Duplication checks cover action metadata, runtime helpers, workflows and SVG assets.
Only generated reference readmes and third-party vendor files are excluded from
copy detection; generated readmes still pass Markdown validation.

Super-Linter reads the fixture's `pyproject.toml` for Black, Ruff, isort and mypy.
It uses the same first-party import classification as project-local checks.
