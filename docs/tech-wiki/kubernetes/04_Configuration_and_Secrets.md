---
mdx:
  format: md
---

# 4. Configuration and Secrets

> **Note**: Sections marked **(Interview Imp)** are frequently asked in interviews. Every chapter ends with a **📘 Terms Explained** table for the jargon it uses.
>
> **Navigation:** [⬅ Previous: 03_Workload_Controllers](03_Workload_Controllers.md) · [Index](00_Kubernetes_Index.md) · [Next: 05_Networking ➡](05_Networking.md)

## Table of Contents
- [4.1 ConfigMap](#41-configmap)
- [4.2 Secrets (Interview Imp)](#42-secrets-interview-imp)
- [4.3 Other Ways to Inject Data](#43-other-ways-to-inject-data)

---

## 4.1 ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata: { name: app-config }
data:
  LOG_LEVEL: info
  application.yaml: |
    server:
      port: 8080
```
Consume as environment variables, command arguments, or files:
```yaml
containers:
  - name: app
    envFrom: [{ configMapRef: { name: app-config } }]          # all keys as env vars
    env:
      - name: LEVEL
        valueFrom: { configMapKeyRef: { name: app-config, key: LOG_LEVEL } }
    volumeMounts: [{ name: cfg, mountPath: /etc/app }]           # keys become files
volumes: [{ name: cfg, configMap: { name: app-config } }]
```
- **Env vars are fixed at Pod start**; **mounted files update** (eventually, ~1 min) without restart (except `subPath` mounts). Apps must reload files themselves.
- Max size 1 MiB. `immutable: true` improves performance and safety.

## 4.2 Secrets (Interview Imp)

```yaml
apiVersion: v1
kind: Secret
metadata: { name: db }
type: Opaque
stringData: { username: app, password: s3cr3t }      # stringData is base64-encoded into data by the API
```
Types: `Opaque`, `kubernetes.io/tls`, `kubernetes.io/dockerconfigjson` (registry pull creds), `kubernetes.io/basic-auth`, `service-account-token`.

**Important:** Secrets are only **base64-encoded, not encrypted**, by default. Harden:
1. Enable **encryption at rest** for etcd (`EncryptionConfiguration`, KMS provider).
2. Restrict access with **RBAC**; avoid broad `get/list secrets`.
3. Prefer mounting as files to env vars (env leaks in logs/crash dumps/`describe`).
4. Don't commit to Git: use **Sealed Secrets**, **SOPS**, **External Secrets Operator** (sync from AWS Secrets Manager/Vault/GCP SM), **Secrets Store CSI Driver**, or Vault Agent injector.
5. Rotate regularly; short-lived credentials (workload identity: IRSA on EKS, Workload Identity on GKE, Azure AD workload identity) instead of static keys.

## 4.3 Other Ways to Inject Data
- **Downward API:** expose Pod metadata (name, namespace, labels, IP, resource limits) as env/files.
- **Projected volumes:** combine ConfigMap, Secret, ServiceAccount token, downward API in one mount.
- **Environment per stage:** Kustomize overlays / Helm values rather than rebuilding images.

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **ConfigMap** | Object that stores non-secret settings (key-value pairs or whole files) outside the image. |
| **Secret** | Like a ConfigMap but meant for passwords, tokens and keys; access can be locked down separately. |
| **base64** | A way to write any bytes as plain text. It is *encoding*, not encryption: anyone can decode it. |
| **Encryption at rest** | Data is encrypted while stored on disk (here: inside etcd), so a stolen disk or backup is unreadable. |
| **KMS** | Key Management Service: an external service (AWS KMS, Vault...) that holds the master encryption key. |
| **`envFrom`** | Loads every key of a ConfigMap/Secret as environment variables in one line. |
| **`subPath`** | Mounts a single file from a volume instead of the whole folder; such files do **not** auto-update. |
| **Immutable ConfigMap/Secret** | Marked `immutable: true`; can't be edited, only replaced, and the kubelet stops watching it. |
| **Sealed Secrets / SOPS** | Tools that encrypt secrets so the encrypted file can be stored safely in Git. |
| **External Secrets Operator** | Controller that copies secrets from a vault (AWS Secrets Manager, Vault...) into Kubernetes Secrets. |
| **Downward API** | Lets a Pod read facts about itself (name, namespace, labels, limits) as env vars or files. |
| **Projected volume** | One mount that combines several sources (ConfigMap, Secret, token, downward API). |
| **Workload identity** | The Pod proves who it is to the cloud with a short-lived token instead of a stored access key (IRSA on EKS, Workload Identity on GKE). |

---

> **Navigation:** [⬅ Previous: 03_Workload_Controllers](03_Workload_Controllers.md) · [Index](00_Kubernetes_Index.md) · [Next: 05_Networking ➡](05_Networking.md)
