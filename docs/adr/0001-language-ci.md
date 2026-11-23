# 0001: Python CI tooling and repository boundaries

Status: Accepted
Date: 2026-11-23

## Context

Create a distinct sibling of ci-github-nodejs and ci-github-php, preserving
standalone actions, reusable CI, common reports, generated references and shared
repository maintenance. Language-specific package managers require different
installation and packaging behavior.

## Decision

Use uv with committed lockfiles and project-owned Ruff, Black, mypy, pytest
and pytest-cov. Black follows the shared organization guidance; Ruff handles
lint diagnostics. Avoid installing these tools independently at floating
versions. Distribution validation installs wheel and sdist separately,
outside the checkout, without local source overrides.

Use `$/` for same-commit action/workflow references. Default to no PR comment
writes and retain reports after failures. Keep package publication out of this
initial CI scope: Go module tags and Python registry uploads require distinct
consumer release policies. The repository itself uses the existing shared
Actions release automation.

## Alternatives and consequences

A single repository for both languages would couple their releases and break the
requested sibling structure. Broad package-manager auto-detection would add
untested branches; this repository instead has one documented default toolchain
and explicit command overrides. Linux-only execution keeps Bash and consumer
venv behavior predictable. Users needing other platforms can compose their own
workflows around native ecosystem actions.

Version matrices, lockfile checks, report retention and consumer installation
need distinct tests. Local boundary tests provide fast feedback; actual artifact
transport remains a GitHub integration check. Tool pins live in manifests and
lockfiles and are maintained automatically, not copied into this decision record.

## Supporting sources

Reviewed on the decision date; these links explain the decision, not current
validation results.

- [uv in GitHub Actions](https://docs.astral.sh/uv/guides/integration/github/)
- [uv locking and synchronization](https://docs.astral.sh/uv/concepts/projects/sync/)
- [uv distribution builds](https://docs.astral.sh/uv/guides/publish/)
- [pip-audit](https://github.com/pypa/pip-audit)
- [GitHub workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)
