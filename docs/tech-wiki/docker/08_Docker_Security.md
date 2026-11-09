---
format: md
---

# 8. Docker Security (Interview Imp)

> **Note**: Sections marked **(Interview Imp)** are frequently asked in interviews. Every chapter ends with a **📘 Terms Explained** table for the jargon it uses.
>
> **Navigation:** [⬅ Previous: 07_Registries_and_Supply_Chain](07_Registries_and_Supply_Chain.md) · [Index](00_Docker_Index.md) · [Next: 09_Runtime_Limits_Logging_Health ➡](09_Runtime_Limits_Logging_Health.md)

## Table of Contents
- [8.1 Threat Model](#81-threat-model)
- [8.2 Hardening Checklist](#82-hardening-checklist)
- [8.3 Common Mistakes](#83-common-mistakes)

---

## 8.1 Threat Model
Containers share the host kernel. A container escape, a mounted Docker socket, privileged mode, or sensitive host mounts can compromise the host. Defence in depth: harden the **image**, the **container runtime config**, the **host** and the **orchestrator**.

## 8.2 Hardening Checklist

| Area | Practice |
|---|---|
| **Run as non-root** | `USER 1000`; `--user`; in Kubernetes `runAsNonRoot: true` |
| **Drop capabilities** | `--cap-drop ALL --cap-add NET_BIND_SERVICE` only if needed |
| **No new privileges** | `--security-opt no-new-privileges` |
| **Read-only root FS** | `--read-only` + `--tmpfs /tmp` + volumes for writable paths |
| **Never `--privileged`** | Gives nearly host-level access |
| **Don't mount the Docker socket** | Equivalent to root on the host |
| **Limit resources** | `--memory`, `--cpus`, `--pids-limit` (stops fork bombs/DoS) |
| **Seccomp / AppArmor / SELinux** | Default seccomp profile blocks ~40+ risky syscalls; keep it on, write custom profiles for high-risk workloads |
| **User namespace remap / rootless Docker / Podman** | Container root ≠ host root |
| **Secrets** | Not in image, `ENV`, `ARG`, or git. Use BuildKit secrets, Docker/Compose secrets, Kubernetes Secrets + external secret managers (Vault, AWS Secrets Manager) |
| **Network** | Publish minimal ports, bind to `127.0.0.1`, use user-defined networks, internal networks (`internal: true`), TLS between services |
| **Minimal images** | Distroless/slim; fewer packages = fewer CVEs; no shells/curl in prod images |
| **Scan and patch** | Scan in CI and registry; rebuild frequently; admission control |
| **Content trust / signing** | Verify image provenance |
| **Host hardening** | Patch kernel/Docker, restrict `docker` group, audit with **Docker Bench for Security** / CIS benchmark, runtime detection (Falco) |
| **Isolation upgrades** | gVisor, Kata Containers, Firecracker for untrusted code |

```bash
docker run -d --name api \
  --read-only --tmpfs /tmp \
  --cap-drop ALL --security-opt no-new-privileges \
  --pids-limit 200 --memory 512m \
  --user 10001:10001 \
  -p 127.0.0.1:8080:8080 \
  myorg/api:1.4.2
```

## 8.3 Common Mistakes
- Secrets baked into layers (`COPY .env`, `ARG TOKEN`): anyone with the image can read them via `docker history`/layer extraction. Deleting in a later layer doesn't remove it.
- `latest` tags from unknown publishers.
- Running as root with a writable root filesystem.
- Exposing databases/Redis to `0.0.0.0` with no auth.
- Docker daemon TCP socket without TLS.
- Never updating base images.

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Container escape** | Breaking out of container isolation to the host. |
| **Seccomp** | Kernel filter limiting which system calls a process can make. |
| **AppArmor / SELinux** | Mandatory access-control systems restricting what processes can do. |
| **User namespace** | Mapping container UIDs to unprivileged host UIDs. |
| **Provenance** | Verifiable record of how and where an image was built. |
| **CVE** | Publicly known security vulnerability identifier. |
| **Admission controller** | Cluster gatekeeper that accepts/rejects workloads by policy. |

---

> **Navigation:** [⬅ Previous: 07_Registries_and_Supply_Chain](07_Registries_and_Supply_Chain.md) · [Index](00_Docker_Index.md) · [Next: 09_Runtime_Limits_Logging_Health ➡](09_Runtime_Limits_Logging_Health.md)
