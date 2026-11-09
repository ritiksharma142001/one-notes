---
mdx:
  format: md
---

# 12. Docker in CI/CD and Production

> **Note**: Sections marked **(Interview Imp)** are frequently asked in interviews. Every chapter ends with a **📘 Terms Explained** table for the jargon it uses.
>
> **Navigation:** [⬅ Previous: 11_Troubleshooting_and_Debugging](11_Troubleshooting_and_Debugging.md) · [Index](00_Docker_Index.md) · [Next: 13_Interview_Questions ➡](13_Interview_Questions.md)

## Table of Contents
- [12.1 CI Pipeline Example (GitHub Actions)](#121-ci-pipeline-example-github-actions)
- [12.2 Production Patterns](#122-production-patterns)
- [12.3 Anti-Patterns](#123-anti-patterns)

---

## 12.1 CI Pipeline Example (GitHub Actions)

```yaml
name: ci
on: { push: { branches: [main] }, pull_request: {} }
jobs:
  build:
    runs-on: ubuntu-latest
    permissions: { contents: read, packages: write, id-token: write }
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with: { registry: ghcr.io, username: "${{ github.actor }}", password: "${{ secrets.GITHUB_TOKEN }}" }
      - uses: docker/metadata-action@v5
        id: meta
        with: { images: ghcr.io/${{ github.repository }}, tags: "type=sha\ntype=semver,pattern={{version}}" }
      - uses: docker/build-push-action@v6
        with:
          context: .
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          platforms: linux/amd64,linux/arm64
          provenance: true
          sbom: true
      - name: Scan
        uses: aquasecurity/trivy-action@0.28.0
        with: { image-ref: "ghcr.io/${{ github.repository }}:sha-${{ github.sha }}", severity: "HIGH,CRITICAL", exit-code: "1" }
```

## 12.2 Production Patterns
- **Build once, promote the same image** through environments; configuration via env vars / ConfigMaps / secrets.
- **Stateless containers**; state in managed databases, volumes, object storage.
- **12-factor** logging, config, port binding, disposability (fast start, graceful stop).
- **Immutable tags** + GitOps (Argo CD/Flux) for deployments; rollbacks = redeploy previous tag.
- **Health checks, resource limits, restart policies**, rolling updates, blue/green or canary.
- **Observability:** metrics (Prometheus/cAdvisor), logs, traces (OpenTelemetry).
- **Orchestrate:** single host → Compose/systemd+Podman Quadlet; clusters → Kubernetes, ECS/Fargate, Cloud Run, Nomad.
- **Cost/size:** small images, shared base layers, registry cache, `buildx` remote cache.
- **Dev experience:** Compose for local stack, devcontainers, Testcontainers for integration tests, `docker compose watch`.

## 12.3 Anti-Patterns
Ssh-ing into containers to "fix" them; running multiple unrelated processes per container; storing data in the container layer; baking environment-specific config into images; using `latest`; `docker commit` as a build method; giant "kitchen sink" images; ignoring signals; running as root; no health checks.

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **CI/CD** | Continuous Integration / Continuous Delivery: automatically build, test and ship every change. |
| **GitHub Actions** | GitHub's CI system; workflows are YAML files in `.github/workflows/`. |
| **Buildx** | Docker CLI plugin that drives BuildKit (multi-platform builds, remote caches). |
| **`type=gha` cache** | Build cache stored in GitHub Actions' cache service so later runs reuse layers. |
| **12-factor app** | Twelve rules for cloud-friendly apps (config in env vars, logs to stdout, disposable processes...). |
| **GitOps** | Desired deployment state lives in git; a tool (Argo CD, Flux) syncs the cluster to it. |
| **Blue/green, canary** | Release strategies: switch all traffic to a parallel new copy / send a small share of traffic first. |
| **Testcontainers** | Library that starts real databases etc. in containers during integration tests. |
| **Podman Quadlet** | systemd unit files that run Podman containers as services on a single host. |
| **Observability** | Understanding a running system through metrics, logs and traces. |

---

> **Navigation:** [⬅ Previous: 11_Troubleshooting_and_Debugging](11_Troubleshooting_and_Debugging.md) · [Index](00_Docker_Index.md) · [Next: 13_Interview_Questions ➡](13_Interview_Questions.md)
