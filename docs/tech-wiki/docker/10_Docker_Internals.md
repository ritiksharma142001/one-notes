---
format: md
---

# 10. Docker Internals (Interview Imp)

> **Note**: Sections marked **(Interview Imp)** are frequently asked in interviews. Every chapter ends with a **📘 Terms Explained** table for the jargon it uses.
>
> **Navigation:** [⬅ Previous: 09_Runtime_Limits_Logging_Health](09_Runtime_Limits_Logging_Health.md) · [Index](00_Docker_Index.md) · [Next: 11_Troubleshooting_and_Debugging ➡](11_Troubleshooting_and_Debugging.md)

## Table of Contents
- [10.1 Linux Primitives Behind Containers](#101-linux-primitives-behind-containers)
- [10.2 What Happens on `docker run nginx`](#102-what-happens-on-docker-run-nginx)
- [10.3 Image Format](#103-image-format)
- [10.4 Ecosystem and Alternatives](#104-ecosystem-and-alternatives)

---

## 10.1 Linux Primitives Behind Containers

A container is **not** a special kernel object: it's a normal process started with isolation features.

| Feature | What it isolates/limits |
|---|---|
| **Namespaces** | `pid` (process IDs), `net` (network stack), `mnt` (mounts/filesystem view), `uts` (hostname), `ipc`, `user` (UID mapping), `cgroup`, `time` |
| **cgroups (v1/v2)** | Resource accounting and limits (CPU, memory, blkio, pids) |
| **Union filesystems (overlayfs)** | Layered, copy-on-write root filesystem |
| **Capabilities** | Split root privileges (drop most) |
| **seccomp / LSM** | Syscall filtering / mandatory access control |
| **chroot / pivot_root** | Changes the process's root directory to the image filesystem |

You can create a primitive container by hand:
```bash
sudo unshare --pid --fork --mount-proc --uts --net --mount chroot ./rootfs /bin/sh
```

## 10.2 What Happens on `docker run nginx`
1. CLI sends the request to `dockerd` over the socket.
2. If the image is missing locally, pull layers from the registry (parallel, content-addressed, verified by digest).
3. `dockerd` → `containerd` creates a container (config.json, OCI bundle).
4. A shim + `runc` set up namespaces, cgroups, mounts the overlay rootfs, networking (veth + bridge), applies seccomp/capabilities, then `exec`s the entrypoint as PID 1.
5. `runc` exits; the **containerd-shim** keeps stdio and reports exit status. Docker then streams logs/attaches.

## 10.3 Image Format
An OCI image = **manifest** (JSON listing config + layer digests) + **config** (env, entrypoint, history) + **layer tarballs** (compressed diffs). **Index/manifest list** points to per-architecture manifests (multi-arch). Content-addressable: digest = SHA-256 of content, enabling dedup and integrity checks.

## 10.4 Ecosystem and Alternatives

| Tool | Notes |
|---|---|
| **containerd** | Core runtime used by Docker and Kubernetes |
| **CRI-O** | Kubernetes-focused runtime |
| **Podman** | Daemonless, rootless, Docker-compatible CLI, pods; `podman generate kube` |
| **Buildah / Kaniko / BuildKit / Jib / ko / Buildpacks** | Build images without Docker daemon (CI, Java/Go, Cloud Native Buildpacks) |
| **nerdctl** | Docker-like CLI for containerd |
| **LXC/LXD/Incus** | System containers |
| **gVisor / Kata / Firecracker** | Sandboxed runtimes |
| **Wasm (WasmEdge, wasmtime)** | WebAssembly workloads alongside containers |
| **Kubernetes** | Orchestration (see [00_Kubernetes_Index.md](../kubernetes/00_Kubernetes_Index.md)) |
| **Docker Swarm** | Docker's simple built-in orchestrator (`docker swarm init`, `docker stack deploy`); less used today |
| **Dev Containers / Dev Environments** | Reproducible development inside containers |

Since Kubernetes 1.24 there is no `dockershim`: Kubernetes talks to containerd/CRI-O directly. Docker-built images still run unchanged (OCI standard).

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Namespace** | Kernel mechanism giving a process its own view of a system resource. |
| **cgroup** | Kernel mechanism for limiting resources. |
| **OCI bundle** | Directory with rootfs and `config.json` describing how to run a container. |
| **Manifest** | JSON describing an image's config and layers. |
| **Content-addressable** | Identified by a hash of its content. |
| **CRI** | Container Runtime Interface used by Kubernetes. |
| **Shim** | Small process that keeps a container's stdio and exit status after runc exits. |

---

> **Navigation:** [⬅ Previous: 09_Runtime_Limits_Logging_Health](09_Runtime_Limits_Logging_Health.md) · [Index](00_Docker_Index.md) · [Next: 11_Troubleshooting_and_Debugging ➡](11_Troubleshooting_and_Debugging.md)
