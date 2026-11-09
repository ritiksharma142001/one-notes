---
mdx:
  format: md
---

# 7. Registries, Tagging and Software Supply Chain

> **Note**: Sections marked **(Interview Imp)** are frequently asked in interviews. Every chapter ends with a **📘 Terms Explained** table for the jargon it uses.
>
> **Navigation:** [⬅ Previous: 06_Docker_Compose](06_Docker_Compose.md) · [Index](00_Docker_Index.md) · [Next: 08_Docker_Security ➡](08_Docker_Security.md)

## Table of Contents
- [7.1 Registries](#71-registries)
- [7.2 Tagging Strategy](#72-tagging-strategy)
- [7.3 Supply Chain Security](#73-supply-chain-security)

---

## 7.1 Registries

| Registry | Notes |
|---|---|
| **Docker Hub** | Default public registry; official images (`library/`), verified publishers; pull-rate limits for anonymous users |
| **GitHub Container Registry** (`ghcr.io`) | Integrated with GitHub Actions/permissions |
| **AWS ECR**, **Google Artifact Registry**, **Azure ACR** | Cloud-native, IAM auth, vulnerability scanning |
| **Harbor**, **Nexus**, **Artifactory**, **GitLab Registry** | Self-hosted/enterprise: replication, RBAC, scanning, proxy cache |
| **Quay.io** | Red Hat registry |
| Local registry | `docker run -d -p 5000:5000 registry:2` |

```bash
docker login ghcr.io -u USER --password-stdin <<< "$TOKEN"
docker tag app:1.0.0 ghcr.io/org/app:1.0.0
docker push ghcr.io/org/app:1.0.0
docker pull ghcr.io/org/app@sha256:...
```

## 7.2 Tagging Strategy
- `app:1.4.2` (immutable semantic version), `app:1.4`, `app:1` (moving), `app:git-abc1234` (traceable), `app:main` (branch), `app:latest` only for convenience.
- Deploy by **digest** or immutable version tags; promote the *same* image from staging to production (build once, deploy many).
- Retention policies to prune old images; mirror base images internally to avoid rate limits/supply-chain surprises.

## 7.3 Supply Chain Security

| Practice | Tool |
|---|---|
| Vulnerability scanning (OS packages + language deps) | **Trivy**, Grype, Docker Scout, Snyk, Clair |
| SBOM generation | Syft, `docker buildx build --sbom=true`, Trivy |
| Image signing & verification | **cosign** (Sigstore), Notary v2; enforce in cluster with Kyverno/OPA/Connaisseur |
| Provenance (SLSA) | `--provenance=true`, GitHub attestations |
| Trusted base images | Official / verified / Chainguard / internal golden images |
| Dockerfile linting | hadolint |
| Secret scanning | gitleaks, trufflehog |
| Pin and update | Dependabot/Renovate for base image digests |

```bash
trivy image --severity HIGH,CRITICAL --exit-code 1 myorg/app:1.0.0       # fail CI on serious CVEs
cosign sign --key cosign.key myorg/app@sha256:...
syft myorg/app:1.0.0 -o spdx-json > sbom.json
```

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Registry** | Server that stores images and serves them on `push`/`pull`. |
| **Repository** | One named collection of image versions inside a registry (`ghcr.io/org/app`). |
| **Pull-rate limit** | Cap on how many images an anonymous/free user may download from Docker Hub per time window. |
| **Semantic version (semver)** | `MAJOR.MINOR.PATCH` numbering (`1.4.2`) where each part signals the kind of change. |
| **Build once, deploy many** | Build one image and promote that exact image through test, staging and production. |
| **Supply chain** | Everything that goes into your image: base image, packages, build tools, CI system. |
| **Vulnerability scanner** | Tool (Trivy, Grype) that lists known CVEs in an image's packages. |
| **SBOM** | Software Bill of Materials: machine-readable list of every component in an image. |
| **Image signing (cosign)** | Attaching a cryptographic signature so consumers can verify who built the image. |
| **SLSA / provenance** | Framework and attestation describing how and where an artifact was built. |
| **Mirror / proxy cache** | Internal copy of external images to avoid rate limits and outages. |

---

> **Navigation:** [⬅ Previous: 06_Docker_Compose](06_Docker_Compose.md) · [Index](00_Docker_Index.md) · [Next: 08_Docker_Security ➡](08_Docker_Security.md)
