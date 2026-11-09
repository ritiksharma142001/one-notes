---
mdx:
  format: md
---

# 9. Runtime Behaviour: Resources, Logging, Health, Signals

> **Note**: Sections marked **(Interview Imp)** are frequently asked in interviews. Every chapter ends with a **📘 Terms Explained** table for the jargon it uses.
>
> **Navigation:** [⬅ Previous: 08_Docker_Security](08_Docker_Security.md) · [Index](00_Docker_Index.md) · [Next: 10_Docker_Internals ➡](10_Docker_Internals.md)

## Table of Contents
- [9.1 Resource Limits (cgroups)](#91-resource-limits-cgroups)
- [9.2 Logging](#92-logging)
- [9.3 Health Checks and Restart Policies](#93-health-checks-and-restart-policies)
- [9.4 PID 1, Signals and Graceful Shutdown (Interview Imp)](#94-pid-1-signals-and-graceful-shutdown-interview-imp)

---

## 9.1 Resource Limits (cgroups)

```bash
docker run --memory 512m --memory-swap 512m --cpus 1.5 --cpu-shares 512 --pids-limit 200 --ulimit nofile=65535 img
```
- Exceeding the memory limit → the kernel **OOM-kills** the process (`docker inspect` shows `OOMKilled: true`, exit code 137).
- CPU limits throttle (CFS quota); `--cpus 1.5` = 150% of one core.
- **JVM/Node/Python in containers:** make the runtime container-aware (Java: `-XX:MaxRAMPercentage=75`; Node: `--max-old-space-size`; Go: `GOMEMLIMIT`; Python/gunicorn workers vs CPU limit).
- Exit codes: `0` success, `1` app error, `125-127` docker/command errors, `137` SIGKILL/OOM, `143` SIGTERM.

## 9.2 Logging

Best practice: log to **stdout/stderr**; Docker captures it.
```bash
docker logs -f --since 5m api
```
Logging drivers: `json-file` (default; **configure rotation** `max-size`, `max-file` or disks fill), `local`, `journald`, `syslog`, `fluentd`, `gelf`, `awslogs`, `gcplogs`, `splunk`, `loki`. In production ship logs to a central system (ELK/Loki/Datadog/CloudWatch); use structured JSON logs with correlation IDs.

```json
// /etc/docker/daemon.json
{ "log-driver": "json-file", "log-opts": { "max-size": "10m", "max-file": "3" } }
```

## 9.3 Health Checks and Restart Policies

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
  CMD curl -fsS http://localhost:8080/health || exit 1
```
States: `starting` → `healthy` / `unhealthy`. Docker alone does not restart unhealthy containers (Swarm/Kubernetes do); use `--restart` for crash recovery. Design **liveness** (is it stuck?) vs **readiness** (can it take traffic?) separately (Kubernetes probes).

| Restart policy | Behaviour |
|---|---|
| `no` | Never |
| `on-failure[:N]` | Only on non-zero exit (up to N times) |
| `always` | Always (including daemon restart) |
| `unless-stopped` | Like always, but not if manually stopped |

## 9.4 PID 1, Signals and Graceful Shutdown (Interview Imp)

`docker stop` sends **SIGTERM** to PID 1, waits (default 10 s), then **SIGKILL**.
- The app must run as PID 1 (exec form) and **handle SIGTERM**: stop accepting requests, finish in-flight work, close connections, exit 0.
- Shell wrappers (`CMD ./start.sh` that doesn't `exec`) swallow signals. Use `exec "$@"` at the end of entrypoint scripts.
- PID 1 has special kernel semantics (no default signal handlers; must reap zombie children). Use `docker run --init` / `tini` / `dumb-init` when the app spawns subprocesses.
- Framework hooks: Spring `server.shutdown=graceful`, Node `process.on('SIGTERM')`, Gunicorn handles it, Go `signal.NotifyContext`.
- Raise `docker stop -t` / Kubernetes `terminationGracePeriodSeconds` for slow shutdowns.

```bash
#!/bin/sh
# entrypoint.sh
set -e
./migrate.sh
exec "$@"          # replaces the shell so the app becomes PID 1 and receives signals
```

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **cgroups** | Kernel feature limiting CPU, memory, I/O and process counts per group. |
| **OOM kill** | Kernel killing a process that exceeds memory. |
| **Exit code 137** | 128 + 9: killed by SIGKILL (often OOM). |
| **Logging driver** | Plug-in deciding where container logs go. |
| **Liveness / readiness** | "Is it alive?" / "Is it ready for traffic?" |
| **SIGTERM / SIGKILL** | Polite stop request / forced immediate kill. |
| **Zombie process** | Finished child process not yet reaped by its parent. |
| **tini** | Minimal init process for containers. |

---

> **Navigation:** [⬅ Previous: 08_Docker_Security](08_Docker_Security.md) · [Index](00_Docker_Index.md) · [Next: 10_Docker_Internals ➡](10_Docker_Internals.md)
