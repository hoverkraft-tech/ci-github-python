FROM mcr.microsoft.com/devcontainers/base:2-trixie@sha256:41ff7ce12ec45f2704f27a6e091831186ad922ec8112e6339425bfefdf5a70f9

COPY --from=ghcr.io/astral-sh/uv:0.13.9@sha256:d3b601f0c7b118bc1753febf7c41cc80981df678445e0254284eecf84db79a7d /uv /uvx /usr/local/bin/

HEALTHCHECK --interval=5m --timeout=10s --start-period=30s --retries=3 CMD ["uv", "--version"]
USER vscode
