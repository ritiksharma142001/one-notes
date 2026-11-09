---
format: md
---

# Practice Projects and Learning Path

> **Note**: Sections marked **(Interview Imp)** are frequently asked in interviews. Every chapter ends with a **📘 Terms Explained** table for the jargon it uses.
>
> **Navigation:** [⬅ Previous: 13_Interview_Questions](13_Interview_Questions.md) · [Index](00_Docker_Index.md) · [Next: 15_Big_Picture_and_Cheat_Sheet ➡](15_Big_Picture_and_Cheat_Sheet.md)

## Table of Contents
- [14. Practice Projects by Level](#14-practice-projects-by-level)
- [15. Learning Path](#15-learning-path)

---

## 14. Practice Projects by Level

| Level | Project | Skills |
|---|---|---|
| **Beginner** | Run nginx, postgres, redis; map ports; exec into them | CLI, ports, volumes |
| | Containerise a "hello world" web app (Python/Node/Java) | Dockerfile basics |
| | Persist a database with a named volume; back up and restore | Volumes |
| **Intermediate** | Compose: web + API + DB + Redis with healthchecks | Compose, networks |
| | Multi-stage builds that shrink images 10× (before/after with `dive`) | Optimisation |
| | Dev environment with hot reload (bind mount / Compose watch) | Dev workflow |
| | Push to GHCR/Docker Hub from GitHub Actions with cache, scan, SBOM | CI/CD, security |
| **Advanced** | Hardened production image (non-root, read-only, distroless, cap-drop, seccomp) + Trivy gate | Security |
| | Multi-arch images (amd64/arm64) with buildx; private registry (Harbor) | Distribution |
| | Build a mini container from scratch with `unshare`/`chroot`/cgroups (or in Go) | Internals |
| | Local Kubernetes (kind/minikube) deploying your images with probes and limits | See [00_Kubernetes_Index.md](../kubernetes/00_Kubernetes_Index.md) |
| | Observability stack in Compose: Prometheus + Grafana + Loki + app | Monitoring |

---

## 15. Learning Path

| Stage | Week | Cover | Output |
|---|---|---|---|
| 1 | 1 | [01](01_Docker_Fundamentals.md), [02](02_Containers_and_Images_CLI.md) | Run and manage containers confidently |
| 2 | 2 | [03](03_Dockerfile_and_Image_Building.md), [04](04_Volumes_and_Storage.md) | Write efficient Dockerfiles; volumes |
| 3 | 3 | [05](05_Docker_Networking.md), [06](06_Docker_Compose.md) | Multi-container apps with Compose |
| 4 | 4 | [07](07_Registries_and_Supply_Chain.md), [08](08_Docker_Security.md), [09](09_Runtime_Limits_Logging_Health.md) | Registry workflow, security hardening, runtime tuning |
| 5 | 5 | [10](10_Docker_Internals.md), [11](11_Troubleshooting_and_Debugging.md), [12](12_CICD_and_Production.md) | Internals, debugging, CI/CD |
| 6 | 6+ | [00_Kubernetes_Index.md](../kubernetes/00_Kubernetes_Index.md) | Orchestrate in a cluster |

**Resources:** docs.docker.com (Get started, Dockerfile reference, Compose spec), *Docker Deep Dive* (Nigel Poulton), *Docker in Practice*, *Container Security* (Liz Rice), Play with Docker (labs.play-with-docker.com), KodeKloud / Katacoda-style labs, CNCF container talks, "Docker Bench for Security", Trivy and dive docs.

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Hot reload** | Code changes show up in the running app without rebuilding the image. |
| **Harbor** | Open-source self-hosted registry with scanning, signing and replication. |
| **`unshare`** | Linux command that starts a process in new namespaces: the core trick behind containers. |
| **kind / minikube** | Tools that run a small Kubernetes cluster on your laptop. |
| **Prometheus / Grafana / Loki** | Metrics database / dashboards / log store: a common open-source monitoring stack. |

---

> **Navigation:** [⬅ Previous: 13_Interview_Questions](13_Interview_Questions.md) · [Index](00_Docker_Index.md) · [Next: 15_Big_Picture_and_Cheat_Sheet ➡](15_Big_Picture_and_Cheat_Sheet.md)
