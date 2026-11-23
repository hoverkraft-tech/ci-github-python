FROM ghcr.io/hoverkraft-tech/docker-base-images/super-linter:2.0.1@sha256:7fbeb0e47711e939db09027b64d2b4f405dd271dad056fe42dc05ac15a6ddab0

HEALTHCHECK --interval=5m --timeout=10s --start-period=30s --retries=3 CMD ["/bin/sh","-c","test -d /github/home"]
ARG UID=1000
ARG GID=1000
USER ${UID}:${GID}

# Language fixtures are checked with their declared runtimes and tools.
ENV VALIDATE_GO=false \
    VALIDATE_GO_MODULES=false \
    VALIDATE_PYTHON_BLACK=false \
    VALIDATE_PYTHON_RUFF=false \
    VALIDATE_PYTHON_MYPY=false \
    VALIDATE_PYTHON_PYLINT=false \
    VALIDATE_PYTHON_ISORT=false
