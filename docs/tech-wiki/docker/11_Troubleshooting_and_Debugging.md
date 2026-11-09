---
mdx:
  format: md
---

# 11. Troubleshooting and Debugging

> **Note**: Sections marked **(Interview Imp)** are frequently asked in interviews. Every chapter ends with a **📘 Terms Explained** table for the jargon it uses.
>
> **Navigation:** [⬅ Previous: 10_Docker_Internals](10_Docker_Internals.md) · [Index](00_Docker_Index.md) · [Next: 12_CICD_and_Production ➡](12_CICD_and_Production.md)

## Table of Contents
- [11.1 Symptom → Diagnosis → Fix](#111-symptom--diagnosis--fix)
- [11.2 Debugging Toolbox](#112-debugging-toolbox)

---

## 11.1 Symptom → Diagnosis → Fix

| Symptom | Diagnose | Typical fix |
|---|---|---|
| Container exits immediately | `docker logs`, `docker inspect --format '{{.State.ExitCode}}'`, `docker run -it --entrypoint sh img` | Main process finished/crashed; run in foreground; fix CMD; missing env |
| `exec format error` | Architecture mismatch or bad shebang/CRLF | Build for right `--platform`; LF line endings |
| `permission denied` | UID/GID of volume files, SELinux label, read-only FS | `--user`, `chown`, `:z` suffix, writable tmpfs |
| Cannot reach service | `docker port`, `ss -tlnp`, `docker network inspect`, app bind address | Listen on `0.0.0.0`; same network; correct ports |
| `OOMKilled` / exit 137 | `docker inspect`, `docker stats`, `dmesg` | Raise limit; fix leak; tune runtime heap |
| Image too big | `docker history`, `dive` | Multi-stage, slim/distroless, clean caches, `.dockerignore` |
| Build cache not used | Copy order | Put dependency files before source; stable build args |
| Disk full | `docker system df` | Prune, rotate logs, limit build cache |
| DNS not working | `nslookup` inside container, daemon DNS | `--dns`, user-defined network |
| Slow bind mounts on Mac/Win | | Use named volumes, VirtioFS, Compose watch |
| `port is already allocated` | `ss -tlnp` | Change host port |
| Zombie processes / signals ignored | `docker top` | `--init`, exec form |
| Unhealthy container | `docker inspect --format '{{json .State.Health}}'` | Fix health command / start period |

## 11.2 Debugging Toolbox

Tools: `docker inspect`, `docker logs`, `docker exec`, `docker stats`, `docker events`, `dive` (image layer explorer), `nicolaka/netshoot`, `ctop`, `lazydocker`, `docker debug` (Docker Desktop: attach a toolbox to any container), `docker run --pid=container:X --network=container:X` (sidecar debugging).

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Exit code** | Number a process returns when it ends; `0` = success, anything else = some failure. |
| **`exec format error`** | The kernel cannot run the file: usually a binary built for another CPU (arm64 vs amd64) or a script with Windows line endings. |
| **CRLF / LF** | Windows line endings (`\r\n`) vs Linux line endings (`\n`); CRLF breaks shell-script shebangs. |
| **Shebang** | First line of a script (`#!/bin/sh`) naming the program that runs it. |
| **SELinux label (`:z`)** | Security tag on files; `:z`/`:Z` on a bind mount relabels files so the container may use them. |
| **`dmesg`** | Command printing kernel messages, including OOM-kill reports. |
| **dive** | Tool that shows each image layer and what files it adds, to find wasted space. |
| **netshoot** | Container image full of network tools (curl, dig, tcpdump) used for debugging. |
| **Sidecar debugging** | Starting a tools container that shares another container's network/process namespace. |

---

> **Navigation:** [⬅ Previous: 10_Docker_Internals](10_Docker_Internals.md) · [Index](00_Docker_Index.md) · [Next: 12_CICD_and_Production ➡](12_CICD_and_Production.md)
