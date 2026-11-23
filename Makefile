.PHONY: help setup test test-fixture lint-fixture lint lint-fix docs ci

LINTER_IMAGE := ci-github-python-linter:local

help: ## Display commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "%-24s %s\n", $$1, $$2}'

setup: ## Install development and fixture dependencies
	npm ci --ignore-scripts
	cd tests/python-project && uv sync --locked

test: ## Test configuration and action boundaries
	npm test

test-fixture: ## Run the real language fixture
	cd tests/python-project && uv run --locked pytest

lint-fixture: ## Check the fixture with project tooling
	cd tests/python-project && uv run --locked ruff check . && uv run --locked black --check . && uv run --locked mypy .

lint: ## Run the shared Docker linter
	$(call run_linter,)

lint-fix: ## Apply supported formatting fixes
	$(call run_linter,-e FIX_YAML_PRETTIER=true -e FIX_MARKDOWN=true -e FIX_MARKDOWN_PRETTIER=true -e FIX_BIOME_FORMAT=true -e FIX_BIOME_LINT=true)

docs: ## Generate action and workflow references with CI Dokumentor
	docker run --rm --user $(shell id -u):$(shell id -g) -v "$(CURDIR):/workspace" -w /workspace ghcr.io/hoverkraft-tech/ci-dokumentor/cli:0.6.0 generate --repository git --cicd github-actions --source 'actions/**/action.yml' '.github/workflows/[!_]*.yml'

ci: setup test lint-fixture test-fixture lint ## Run checks without rewriting source

define run_linter
	docker build --build-arg UID=$(shell id -u) --build-arg GID=$(shell id -g) --tag $(LINTER_IMAGE) .
	docker run --rm -v "$(CURDIR):$(CURDIR)" -e DEFAULT_WORKSPACE="$(CURDIR)" -e DEFAULT_BRANCH="$$(git branch --show-current)" -e USE_FIND_ALGORITHM=false -e IGNORE_GITIGNORED_FILES=true $(1) $(LINTER_IMAGE)
endef
