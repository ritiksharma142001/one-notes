---
mdx:
  format: md
---

# 6. Docker Compose (Interview Imp)

> **Note**: Sections marked **(Interview Imp)** are frequently asked in interviews. Every chapter ends with a **📘 Terms Explained** table for the jargon it uses.
>
> **Navigation:** [⬅ Previous: 05_Docker_Networking](05_Docker_Networking.md) · [Index](00_Docker_Index.md) · [Next: 07_Registries_and_Supply_Chain ➡](07_Registries_and_Supply_Chain.md)

## Table of Contents
- [6.1 What is Compose?](#61-what-is-compose)
- [6.2 A Complete Example](#62-a-complete-example)
- [6.3 Commands](#63-commands)
- [6.4 Key Concepts](#64-key-concepts)

---

## 6.1 What is Compose?

**Docker Compose** defines and runs **multi-container applications** from one YAML file (`compose.yaml`). One command starts the whole stack (app + database + cache + queue) with networks and volumes configured. Compose V2 is part of the Docker CLI: `docker compose` (not the old `docker-compose`). The file no longer needs a `version:` key.

## 6.2 A Complete Example

```yaml
# compose.yaml
name: shop

services:
  api:
    build:
      context: ./api
      target: runtime                # multi-stage target
      args:
        APP_VERSION: "1.0.0"
    image: myorg/shop-api:dev
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/shop
      SPRING_DATA_REDIS_HOST: cache
    env_file: [.env]                  # secrets for local dev only; keep out of git
    depends_on:
      db:
        condition: service_healthy    # wait until db is healthy, not just started
      cache:
        condition: service_started
    networks: [backend, frontend]
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 15s
      timeout: 3s
      retries: 5
      start_period: 30s
    deploy:
      resources:
        limits: { cpus: "1.0", memory: 512M }
    develop:
      watch:                          # `docker compose watch`: live sync / rebuild
        - action: sync
          path: ./api/src
          target: /app/src
        - action: rebuild
          path: ./api/pom.xml

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: shop
      POSTGRES_USER: shop
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    secrets: [db_password]
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    networks: [backend]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U shop -d shop"]
      interval: 5s
      timeout: 3s
      retries: 10

  cache:
    image: redis:7-alpine
    command: ["redis-server", "--appendonly", "yes"]
    volumes: [redisdata:/data]
    networks: [backend]

  web:
    build: ./web
    ports: ["3000:80"]
    depends_on: [api]
    networks: [frontend]
    profiles: ["ui"]                  # only started with --profile ui

volumes:
  pgdata:
  redisdata:

networks:
  backend:
  frontend:

secrets:
  db_password:
    file: ./secrets/db_password.txt
```

## 6.3 Commands

```bash
docker compose up -d                 # create + start (add --build to rebuild; --wait for health)
docker compose up --build --force-recreate
docker compose ps                    # services state
docker compose logs -f api
docker compose exec db psql -U shop
docker compose run --rm api ./mvnw test        # one-off command in a new container
docker compose stop | start | restart
docker compose down                  # stop + remove containers & networks (-v also removes volumes!)
docker compose config                # validate + print the merged final config
docker compose pull | build | push
docker compose --profile ui up
docker compose -f compose.yaml -f compose.prod.yaml up -d      # override files
docker compose watch
docker compose top | images | cp
```

## 6.4 Key Concepts

| Concept | Details |
|---|---|
| **Project name** | Prefix for resources (`shop-api-1`, `shop_backend`); set with `name:` or `-p` |
| **Networks** | Compose creates a default network; services reach each other by **service name** |
| **`depends_on`** | Start order; with `condition: service_healthy` it waits for readiness. Apps must still **retry** connections |
| **Environment** | `environment:`, `env_file:`, `${VAR:-default}` interpolation from shell/`.env` |
| **Secrets / configs** | Files mounted at `/run/secrets/<name>` (not in env or image) |
| **Profiles** | Optional services (debug tools, UI) |
| **Override files** | `compose.override.yaml` auto-merged in dev; `compose.prod.yaml` explicit |
| **Extension fields / anchors** | `x-common: &common` + `<<: *common` to avoid repetition |
| **`include:`** | Reuse other compose files |
| **Scaling** | `docker compose up --scale worker=3` (don't publish fixed host ports for scaled services) |
| **Compose Watch** | Hot reload during development |
| **Production** | Compose is great for dev/test and single-host deployments; use Kubernetes/ECS/Nomad for HA clusters |

```yaml
x-logging: &default-logging
  driver: json-file
  options: { max-size: "10m", max-file: "3" }
services:
  api:
    logging: *default-logging
```

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Service** | One component (image + config) that can run as one or more containers. |
| **Project** | The set of resources created from a Compose file. |
| **Healthcheck** | Command Docker runs periodically to decide if a container is healthy. |
| **Profile** | Label that makes a service optional. |
| **Override file** | Extra Compose file merged on top of the base. |
| **YAML anchor** | Reusable fragment inside a YAML file. |

---

> **Navigation:** [⬅ Previous: 05_Docker_Networking](05_Docker_Networking.md) · [Index](00_Docker_Index.md) · [Next: 07_Registries_and_Supply_Chain ➡](07_Registries_and_Supply_Chain.md)
