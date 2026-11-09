---
format: md
---

# 4. Data: Volumes, Bind Mounts and Storage

> **Note**: Sections marked **(Interview Imp)** are frequently asked in interviews. Every chapter ends with a **📘 Terms Explained** table for the jargon it uses.
>
> **Navigation:** [⬅ Previous: 03_Dockerfile_and_Image_Building](03_Dockerfile_and_Image_Building.md) · [Index](00_Docker_Index.md) · [Next: 05_Docker_Networking ➡](05_Docker_Networking.md)

## Table of Contents
- [4.1 Three Ways to Persist or Share Data](#41-three-ways-to-persist-or-share-data)
- [4.2 Storage Drivers](#42-storage-drivers)

---

## 4.1 Three Ways to Persist or Share Data

| Type | Syntax | Managed by | Use for |
|---|---|---|---|
| **Named volume** | `-v pgdata:/var/lib/postgresql/data` | Docker (`/var/lib/docker/volumes`) | Databases, persistent app data (preferred) |
| **Bind mount** | `-v /host/path:/container/path` | You (host path) | Development (live code reload), config files |
| **tmpfs mount** | `--tmpfs /tmp` | Memory only | Secrets/scratch data not written to disk |
| Anonymous volume | `VOLUME /data` / `-v /data` | Docker, random name | Avoid (hard to track) |

```bash
docker volume create pgdata
docker volume ls
docker volume inspect pgdata
docker run -d -v pgdata:/var/lib/postgresql/data postgres:16
docker run --rm -v pgdata:/data -v $PWD:/backup alpine tar czf /backup/pg.tgz -C /data .   # backup
docker volume rm pgdata

# --mount is the explicit, newer syntax
docker run --mount type=volume,src=pgdata,dst=/var/lib/postgresql/data \
           --mount type=bind,src=$PWD/conf,dst=/etc/conf,readonly \
           --mount type=tmpfs,dst=/tmp,tmpfs-size=64m  image
```

**Notes**
- A new empty named volume is initialised with the image's content at that path; a bind mount **hides** the image content at that path.
- Bind-mount permissions: container UID must match host file ownership (use `--user "$(id -u):$(id -g)"`). On macOS/Windows bind mounts are slower (file-sharing layer).
- Volumes survive `docker rm`; remove with `docker rm -v` / `docker volume rm`.
- Production data: use volume drivers/cloud disks (EBS, NFS, Ceph, Longhorn), back up regularly, and prefer managed databases for critical data.

## 4.2 Storage Drivers

Docker's **storage driver** implements layers on the host filesystem. Default on modern Linux: **overlay2** (OverlayFS: `lowerdir` = image layers, `upperdir` = writable layer, `merged` = what the container sees). Others: `btrfs`, `zfs`, `devicemapper` (legacy), containerd's `overlayfs` snapshotter. Writing heavily to the container layer is slow; use volumes for I/O-intensive paths.

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Volume** | Docker-managed storage that outlives containers. |
| **Bind mount** | A host directory mapped into the container. |
| **tmpfs** | In-memory filesystem. |
| **overlay2** | Default union filesystem driver for layers. |
| **Volume driver** | Plugin that stores volumes elsewhere (NFS, cloud). |

---

> **Navigation:** [⬅ Previous: 03_Dockerfile_and_Image_Building](03_Dockerfile_and_Image_Building.md) · [Index](00_Docker_Index.md) · [Next: 05_Docker_Networking ➡](05_Docker_Networking.md)
