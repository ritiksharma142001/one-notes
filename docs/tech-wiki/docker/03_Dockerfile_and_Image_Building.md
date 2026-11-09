---
mdx:
  format: md
---

# 3. Building Images: Dockerfile (Interview Imp)

> **Note**: Sections marked **(Interview Imp)** are frequently asked in interviews. Every chapter ends with a **📘 Terms Explained** table for the jargon it uses.
>
> **Navigation:** [⬅ Previous: 02_Containers_and_Images_CLI](02_Containers_and_Images_CLI.md) · [Index](00_Docker_Index.md) · [Next: 04_Volumes_and_Storage ➡](04_Volumes_and_Storage.md)

## Table of Contents
- [3.1 Image Layers and Caching](#31-image-layers-and-caching)
- [3.2 Dockerfile Instruction Reference](#32-dockerfile-instruction-reference)
- [3.3 A Good Dockerfile (Annotated)](#33-a-good-dockerfile-annotated)
- [3.4 Multi-Stage Builds (Interview Imp)](#34-multi-stage-builds-interview-imp)
- [3.5 Choosing a Base Image](#35-choosing-a-base-image)
- [3.6 Build Performance and BuildKit](#36-build-performance-and-buildkit)
- [3.7 Dockerfile Best Practices Checklist (Interview Imp)](#37-dockerfile-best-practices-checklist-interview-imp)

---

## 3.1 Image Layers and Caching

An image is a stack of **read-only layers**; each Dockerfile instruction that changes the filesystem creates one. A running container adds a thin **writable layer** on top (copy-on-write). Layers are identified by hashes and **shared** between images, which saves disk and network bandwidth.

```
┌───────────────────────────┐  ← container writable layer (CoW, ephemeral)
├───────────────────────────┤
│ COPY app.jar              │  layer 4
│ RUN apt-get install ...   │  layer 3
│ COPY pom.xml              │  layer 2
│ FROM eclipse-temurin:21   │  layers 1..n (base image)
└───────────────────────────┘
```

**Build cache rule:** Docker reuses a cached layer if the instruction and its inputs (e.g. the files copied) are unchanged. **When one layer changes, all later layers are rebuilt.** So order instructions from least to most frequently changing.

## 3.2 Dockerfile Instruction Reference

| Instruction | Purpose | Notes |
|---|---|---|
| `FROM image[:tag] [AS name]` | Base image / start a build stage | `FROM scratch` = empty image |
| `ARG NAME[=default]` | Build-time variable (`--build-arg`) | Not available at runtime; visible in history, so no secrets |
| `ENV KEY=value` | Environment variable (build + runtime) | |
| `WORKDIR /app` | Set (and create) working directory | Prefer over `RUN cd` |
| `COPY [--chown=u:g] src dest` | Copy files from build context / other stage (`--from=build`) | Preferred over ADD |
| `ADD src dest` | Like COPY + auto-extract local tar + remote URLs | Use only for tar extraction |
| `RUN command` | Execute during build (new layer) | Shell form `RUN cmd` or exec form `RUN ["cmd","arg"]` |
| `CMD ["exe","arg"]` | Default command/arguments of the container | Overridden by `docker run image <cmd>` |
| `ENTRYPOINT ["exe"]` | Fixed executable; CMD supplies default arguments | Overridden by `--entrypoint` |
| `EXPOSE 8080` | Documents the port the app listens on | Does **not** publish it |
| `VOLUME /data` | Declares a mount point (anonymous volume) | Often better handled in run/compose |
| `USER 1000:1000` | Switch user for later instructions and runtime | Run as non-root! |
| `LABEL key="value"` | Metadata (OCI labels: `org.opencontainers.image.source`) | |
| `HEALTHCHECK` | Command to check container health | |
| `SHELL ["/bin/bash","-c"]` | Change default shell for shell form | |
| `STOPSIGNAL SIGTERM` | Signal used by `docker stop` | |
| `ONBUILD` | Trigger instruction for child images | Rarely used |

### CMD vs ENTRYPOINT (Interview Imp)

| | `CMD` | `ENTRYPOINT` |
|---|---|---|
| Purpose | Default command **or** default args | The executable that always runs |
| `docker run img foo` | Replaces CMD with `foo` | `foo` is appended as arguments |
| Override | Easy | `--entrypoint` |

```dockerfile
ENTRYPOINT ["java", "-jar", "app.jar"]
CMD ["--spring.profiles.active=prod"]              # default args; docker run img --server.port=9090 replaces them
```
**Use exec form (JSON array)** for both: the process runs as PID 1 and receives signals (SIGTERM) directly. Shell form (`CMD java -jar app.jar`) wraps in `/bin/sh -c`, so signals are not forwarded and graceful shutdown fails.

### COPY vs ADD; `.dockerignore`
`COPY` is explicit and predictable. `.dockerignore` excludes files from the build context (faster builds, no secrets leakage):
```
.git
node_modules
target/
*.log
.env
Dockerfile
.dockerignore
```

## 3.3 A Good Dockerfile (Annotated)

```dockerfile
# syntax=docker/dockerfile:1
FROM python:3.12-slim AS base
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1
WORKDIR /app

# 1) install dependencies first: this layer is cached until requirements change
COPY requirements.txt .
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install -r requirements.txt

# 2) copy source last: changes often
COPY src/ ./src/

# 3) non-root user
RUN useradd --system --uid 1001 appuser
USER appuser

EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')" || exit 1
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 3.4 Multi-Stage Builds (Interview Imp)

Use one stage to **build** (compilers, dev dependencies) and copy only the artefacts into a small **runtime** stage. Result: smaller, safer images.

```dockerfile
# ---------- Java / Maven ----------
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /src
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 mvn -q dependency:go-offline
COPY src ./src
RUN --mount=type=cache,target=/root/.m2 mvn -q package -DskipTests

FROM eclipse-temurin:21-jre-alpine
RUN addgroup -S app && adduser -S app -G app
USER app
WORKDIR /app
COPY --from=build /src/target/app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75", "-jar", "app.jar"]
```
```dockerfile
# ---------- Node (React/Next) ----------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci
FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
```
```dockerfile
# ---------- Go: static binary on scratch ----------
FROM golang:1.23 AS build
WORKDIR /src
COPY go.* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o /out/app ./cmd/app
FROM gcr.io/distroless/static:nonroot
COPY --from=build /out/app /app
USER nonroot
ENTRYPOINT ["/app"]
```
```dockerfile
# ---------- C++ ----------
FROM gcc:14 AS build
WORKDIR /src
COPY . .
RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release && cmake --build build -j
FROM debian:bookworm-slim
COPY --from=build /src/build/app /usr/local/bin/app
USER nobody
ENTRYPOINT ["app"]
```
Stages can be targeted: `docker build --target build -t myapp:test .` (e.g. run tests in the `test` stage).

## 3.5 Choosing a Base Image

| Base | Size | Pros | Cons |
|---|---|---|---|
| `ubuntu`, `debian` | 70-120 MB | Familiar, glibc, many packages | Larger |
| `*-slim` (debian-slim) | 30-80 MB | Good compromise, glibc | |
| `alpine` | 5-10 MB | Tiny, apk | **musl** libc: some binaries/wheels break or run slower (Python native wheels, glibc-only software, DNS quirks) |
| **Distroless** (`gcr.io/distroless/*`) | 2-30 MB | No shell/package manager: small attack surface | Harder to debug (use `:debug` variant, ephemeral debug containers) |
| `scratch` | 0 | Only your static binary | Need static linking, CA certs, tz data |
| Chainguard / Wolfi / Red Hat UBI | small | Minimal CVEs, SBOMs | May need subscription for older tags |

Pin versions (`python:3.12.7-slim-bookworm`) or digests; rebuild regularly to pick up security patches.

## 3.6 Build Performance and BuildKit

BuildKit is the default builder (Docker 23+). Features:
```dockerfile
RUN --mount=type=cache,target=/root/.cache/pip pip install -r requirements.txt   # persistent package cache
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci                       # secret never stored in layers
RUN --mount=type=ssh git clone git@github.com:org/private.git                      # forward SSH agent
COPY --link ...                                                                    # independent layers
```
```bash
docker build --secret id=npmrc,src=$HOME/.npmrc -t app .
docker buildx build --platform linux/amd64,linux/arm64 -t org/app:1.0 --push .     # multi-arch images
docker buildx bake                                                                  # build many targets from HCL/compose
docker build --cache-from type=registry,ref=org/app:cache --cache-to type=registry,ref=org/app:cache,mode=max .   # CI cache
```
Tips: small build context, `.dockerignore`, combine related `RUN` steps (clean apt lists in the same layer), deterministic installs (`npm ci`, `pip install --require-hashes`, `mvn -o`), keep volatile files late.

```dockerfile
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates \
 && rm -rf /var/lib/apt/lists/*
```

## 3.7 Dockerfile Best Practices Checklist (Interview Imp)

1. One concern per container; one main process.
2. Pin base image versions/digests; avoid `latest`.
3. Multi-stage builds; final image has runtime only.
4. Order layers for cache efficiency (deps before source).
5. Run as **non-root** (`USER`).
6. Use exec-form `ENTRYPOINT`/`CMD`; handle SIGTERM for graceful shutdown.
7. Add `HEALTHCHECK` (or define in orchestrator).
8. No secrets in `ENV`, `ARG`, `COPY` or layers; use BuildKit secrets / runtime injection.
9. `.dockerignore` everything unnecessary.
10. Minimal packages (`--no-install-recommends`), clean caches in the same layer.
11. Label images (`org.opencontainers.image.*`) and tag immutably (version + git SHA).
12. Scan images (Trivy/Grype/Scout), generate SBOM, sign (cosign).
13. Make containers stateless; config via env vars; logs to stdout/stderr.
14. Lint Dockerfiles with **hadolint**.

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Layer** | A set of filesystem changes produced by one instruction. |
| **Copy-on-write (CoW)** | Files are copied into the writable layer only when modified. |
| **Build context** | The directory sent to the builder; `COPY` can only use files from it. |
| **Multi-stage build** | Several `FROM` stages; only the last (or chosen) becomes the image. |
| **Exec form / Shell form** | JSON-array command (no shell) / plain string run through `/bin/sh -c`. |
| **BuildKit** | Modern, parallel Docker build engine. |
| **musl / glibc** | Two C libraries; Alpine uses musl, Debian/Ubuntu use glibc. |
| **Distroless** | Images with only the app and its runtime, no OS tools. |
| **Multi-arch image** | One tag containing variants for several CPU architectures. |
| **SBOM** | Software Bill of Materials: list of all components in an image. |

---

> **Navigation:** [⬅ Previous: 02_Containers_and_Images_CLI](02_Containers_and_Images_CLI.md) · [Index](00_Docker_Index.md) · [Next: 04_Volumes_and_Storage ➡](04_Volumes_and_Storage.md)
