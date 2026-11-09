---
format: md
---

# 13. Docker Interview Questions (Basic to Advanced)

> **Note**: Sections marked **(Interview Imp)** are frequently asked in interviews. Every chapter ends with a **📘 Terms Explained** table for the jargon it uses.
>
> **Navigation:** [⬅ Previous: 12_CICD_and_Production](12_CICD_and_Production.md) · [Index](00_Docker_Index.md) · [Next: 14_Practice_Projects_and_Learning_Path ➡](14_Practice_Projects_and_Learning_Path.md)

## Table of Contents
- [13.1 Basics](#131-basics)
- [13.2 Intermediate](#132-intermediate)
- [13.3 Advanced](#133-advanced)

---

## 13.1 Basics
**Q1. What is Docker? What problem does it solve?** Containerisation platform packaging an app with dependencies for consistent runs across environments.

**Q2. Container vs VM?** Containers share the host kernel and isolate processes (MBs, fast); VMs run a full guest OS on a hypervisor (GBs, slower, stronger isolation).

**Q3. Image vs container?** Image = immutable layered template; container = running (or stopped) instance with a writable layer.

**Q4. What is a Dockerfile?** Text recipe of instructions to build an image.

**Q5. What are layers and how does caching work?** Each instruction creates a layer; unchanged layers are reused; a change invalidates all following layers.

**Q6. `CMD` vs `ENTRYPOINT`?** CMD is overridable default command/args; ENTRYPOINT is the fixed executable; combine them (exec form).

**Q7. `COPY` vs `ADD`?** `ADD` also extracts local tarballs and fetches URLs; prefer `COPY`.

**Q8. `EXPOSE` vs `-p`?** `EXPOSE` documents; `-p` actually publishes a port.

**Q9. How do you persist data?** Named volumes (preferred), bind mounts, tmpfs for memory-only.

**Q10. Volume vs bind mount?** Docker-managed storage independent of host layout vs direct host path mapping.

**Q11. How do containers communicate?** User-defined networks with DNS by name; published ports for outside access.

**Q12. How do you reduce image size?** Multi-stage builds, slim/alpine/distroless bases, clean package caches in the same layer, `.dockerignore`, fewer layers/packages.

## 13.2 Intermediate
**Q13. Explain multi-stage builds.** Separate build and runtime stages; copy artefacts with `COPY --from`; ships no compilers/tools.

**Q14. Docker Compose: when and how?** Define multi-container apps declaratively; local dev/test and small deployments; `depends_on` with healthchecks, volumes, networks, profiles.

**Q15. How do you handle secrets?** Not in images/ENV/git; BuildKit `--mount=type=secret`, Compose/Swarm secrets, Kubernetes Secrets with external managers, runtime injection.

**Q16. Health checks?** `HEALTHCHECK` / Compose `healthcheck`; orchestrator uses liveness/readiness to restart or route traffic.

**Q17. Bridge vs host vs overlay networks?** Single-host NAT'd virtual network; shares host network stack; multi-host VXLAN network.

**Q18. How do you debug a crashing container?** `logs`, `inspect` (exit code, OOMKilled), run with a shell override, `exec`, `events`, `stats`.

**Q19. How do you pass configuration?** Env vars, env files, mounted config files/secrets, command args.

**Q20. What is the difference between `docker stop` and `docker kill`?** SIGTERM then SIGKILL after timeout vs immediate SIGKILL (or chosen signal).

**Q21. Why is `latest` dangerous?** It's mutable and may change; non-reproducible; use immutable version tags or digests.

**Q22. How do you make builds fast in CI?** Layer ordering, BuildKit cache mounts, registry/GHA cache (`--cache-from/--cache-to`), small contexts, parallel stages.

## 13.3 Advanced
**Q23. How do containers work under the hood?** Namespaces (isolation), cgroups (limits), overlayfs (layered filesystem), capabilities/seccomp (privilege reduction), run by runc via containerd.

**Q24. What is PID 1 problem?** PID 1 must handle signals and reap zombies; shell-form commands or apps without handlers ignore SIGTERM; fix with exec form, `--init`/tini, signal handlers.

**Q25. How to secure containers?** Non-root user, drop capabilities, read-only FS, no privileged/docker.sock, resource limits, seccomp/AppArmor, minimal images, scanning/signing, network policies, rootless runtimes.

**Q26. Explain image digests, content addressing and manifests.** Digest = SHA-256 of manifest; manifests list layer digests; multi-arch via manifest lists.

**Q27. What does OOMKilled / exit code 137 mean?** Process killed by SIGKILL, commonly from exceeding memory limit; check limit vs actual usage and runtime memory settings.

**Q28. How do Docker and Kubernetes relate?** Docker builds images (OCI); Kubernetes schedules containers via CRI runtimes (containerd/CRI-O); Pods, Deployments, Services add orchestration.

**Q29. How would you containerise a Spring Boot / Python / React app?** Multi-stage Dockerfile; non-root; health checks; env-based config; layered JAR or slim base; Nginx for static React build; container-aware runtime flags.

**Q30. Docker vs Podman?** Daemonless/rootless-first with Docker-compatible CLI vs client–daemon architecture.

**Q31. How do you implement zero-downtime deploys?** Health/readiness checks, rolling updates with multiple replicas behind a load balancer, graceful shutdown, backward-compatible DB migrations, blue/green or canary.

**Q32. Why do containers lose data and how do you prevent it?** Writable layer is ephemeral; use volumes/external storage and backups.

**Q33. How does Docker networking publish a port (iptables)?** DNAT rule maps host port to container IP:port; MASQUERADE for outbound; `docker-proxy` for loopback cases.

**Q34. What is BuildKit?** Next-gen builder: parallel graph execution, better caching, secrets/SSH mounts, multi-platform builds.

**Q35. Design the container strategy for 20 microservices.** Standard base images, shared CI template, immutable tags, central registry with scanning, Kubernetes with resource requests/limits, secrets manager, centralised logging/metrics/tracing, GitOps.

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Containerisation** | Packaging an app with everything it needs so it runs the same anywhere. |
| **Orchestration** | Software (Kubernetes, Swarm, ECS) that schedules, restarts and scales containers across machines. |
| **Zero-downtime deploy** | Releasing a new version without users seeing errors or an outage. |
| **Backward-compatible migration** | Database change that both the old and new app version can work with during a rollout. |
| **`docker-proxy`** | Small userland process Docker may start to forward traffic to a published port. |
| **MASQUERADE** | iptables rule rewriting a container's source IP to the host's IP for outbound traffic. |
| **Manifest list** | Image index pointing to one manifest per CPU architecture. |
| **Requests / limits** | Kubernetes terms: resources guaranteed to a container / the maximum it may use. |

---

> **Navigation:** [⬅ Previous: 12_CICD_and_Production](12_CICD_and_Production.md) · [Index](00_Docker_Index.md) · [Next: 14_Practice_Projects_and_Learning_Path ➡](14_Practice_Projects_and_Learning_Path.md)
