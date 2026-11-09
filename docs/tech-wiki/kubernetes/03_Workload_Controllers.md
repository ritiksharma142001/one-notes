---
format: md
---

# 3. Workload Controllers (Interview Imp)

> **Note**: Sections marked **(Interview Imp)** are frequently asked in interviews. Every chapter ends with a **📘 Terms Explained** table for the jargon it uses.
>
> **Navigation:** [⬅ Previous: 02_Pods](02_Pods.md) · [Index](00_Kubernetes_Index.md) · [Next: 04_Configuration_and_Secrets ➡](04_Configuration_and_Secrets.md)

## Table of Contents
- [3.1 Deployment (Stateless Apps)](#31-deployment-stateless-apps)
- [3.2 ReplicaSet](#32-replicaset)
- [3.3 StatefulSet (Stateful Apps) (Interview Imp)](#33-statefulset-stateful-apps-interview-imp)
- [3.4 DaemonSet](#34-daemonset)
- [3.5 Jobs and CronJobs](#35-jobs-and-cronjobs)
- [3.6 Autoscaling (Interview Imp)](#36-autoscaling-interview-imp)

---

## 3.1 Deployment (Stateless Apps)

A **Deployment** manages a **ReplicaSet**, which manages Pods. It provides rolling updates, rollbacks, scaling and self-healing.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata: { name: web, namespace: shop }
spec:
  replicas: 3
  revisionHistoryLimit: 5
  selector:
    matchLabels: { app: web }            # must match template labels (immutable after creation)
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%                      # extra Pods allowed during the update
      maxUnavailable: 0                  # never drop below desired capacity
  minReadySeconds: 10
  progressDeadlineSeconds: 600
  template:
    metadata: { labels: { app: web } }
    spec:
      containers:
        - name: app
          image: myorg/web:1.2.0
          ports: [{ containerPort: 8080 }]
          readinessProbe: { httpGet: { path: /ready, port: 8080 } }
          resources:
            requests: { cpu: 250m, memory: 256Mi }
            limits: { memory: 512Mi }
```

### Rolling update flow
```
v1 v1 v1  →  v1 v1 v1 v2(surge)  →  v1 v1 v2 v2  →  v1 v2 v2 v2  →  v2 v2 v2
```
New Pods must become **Ready** (readiness probe) before old ones are removed; a bad image/probe stalls the rollout and old Pods keep serving.

```bash
kubectl rollout status deploy/web
kubectl rollout history deploy/web
kubectl rollout undo deploy/web [--to-revision=2]
kubectl rollout pause|resume deploy/web          # batch several changes
kubectl scale deploy/web --replicas=6
```
**Strategies:** `RollingUpdate` (default), `Recreate` (stop all, then start; downtime). Canary and blue/green are built from multiple Deployments + Service/Ingress/mesh rules, or with **Argo Rollouts / Flagger**.

Changing anything in `.spec.template` (image, env, resources) triggers a new rollout; changing replicas does not. ConfigMap changes do **not** restart Pods automatically (use a checksum annotation in Helm or `kubectl rollout restart`).

## 3.2 ReplicaSet
Ensures N Pod replicas match a selector. You normally don't create ReplicaSets directly; Deployments own them (that's why Pod names look like `web-7d9f8c6b5-abcde`).

## 3.3 StatefulSet (Stateful Apps) (Interview Imp)

For databases, queues and clustered systems that need:
- **Stable network identity:** `db-0`, `db-1`, `db-2` (predictable names, via a **headless Service**, giving DNS `db-0.db.ns.svc`).
- **Stable persistent storage:** each replica gets its own PVC (`volumeClaimTemplates`) that follows it.
- **Ordered deployment, scaling and rolling updates** (`OrderedReady`, or `Parallel`).

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata: { name: pg }
spec:
  serviceName: pg                    # headless Service name
  replicas: 3
  selector: { matchLabels: { app: pg } }
  template:
    metadata: { labels: { app: pg } }
    spec:
      containers:
        - name: postgres
          image: postgres:16
          volumeMounts: [{ name: data, mountPath: /var/lib/postgresql/data }]
  volumeClaimTemplates:
    - metadata: { name: data }
      spec:
        accessModes: ["ReadWriteOnce"]
        storageClassName: fast-ssd
        resources: { requests: { storage: 50Gi } }
---
apiVersion: v1
kind: Service
metadata: { name: pg }
spec: { clusterIP: None, selector: { app: pg }, ports: [{ port: 5432 }] }     # headless
```
Deleting a StatefulSet does not delete PVCs (data safety). For production databases prefer **Operators** (CloudNativePG, Zalando Postgres Operator, Strimzi for Kafka, Percona, Redis operators) or managed cloud databases.

## 3.4 DaemonSet
One Pod on **every** (or selected) node: log collectors (Fluent Bit), node monitoring (node-exporter), CNI/CSI agents, security agents. Use tolerations to run on tainted nodes.

## 3.5 Jobs and CronJobs

```yaml
apiVersion: batch/v1
kind: Job
metadata: { name: migrate }
spec:
  backoffLimit: 3                    # retries
  ttlSecondsAfterFinished: 3600      # auto-cleanup
  completions: 1
  parallelism: 1
  template:
    spec:
      restartPolicy: OnFailure       # Jobs: Never or OnFailure
      containers: [{ name: m, image: myorg/migrate:1.0, command: ["./migrate", "up"] }]
---
apiVersion: batch/v1
kind: CronJob
metadata: { name: nightly-report }
spec:
  schedule: "0 2 * * *"              # cron syntax, UTC by default (use timeZone: "Asia/Kolkata")
  concurrencyPolicy: Forbid          # Allow | Forbid | Replace
  successfulJobsHistoryLimit: 3
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers: [{ name: r, image: myorg/report:1.0 }]
```
Make jobs **idempotent** (they may run twice). Indexed Jobs support parallel work queues.

## 3.6 Autoscaling (Interview Imp)

| Autoscaler | Scales | Based on |
|---|---|---|
| **HPA** (Horizontal Pod Autoscaler) | Number of Pod replicas | CPU/memory utilisation, custom/external metrics (RPS, queue length) |
| **VPA** (Vertical Pod Autoscaler) | Pod requests/limits | Historical usage (don't mix with HPA on the same metric) |
| **Cluster Autoscaler / Karpenter** | Number/size of **nodes** | Pending Pods that can't be scheduled; underused nodes |
| **KEDA** | Pods (including to zero) | Event sources: Kafka lag, SQS, Prometheus, cron |

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata: { name: web }
spec:
  scaleTargetRef: { apiVersion: apps/v1, kind: Deployment, name: web }
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource: { name: cpu, target: { type: Utilization, averageUtilization: 70 } }   # % of CPU *request*
  behavior:
    scaleDown: { stabilizationWindowSeconds: 300 }
```
`desiredReplicas = ceil(currentReplicas × currentMetric / targetMetric)`. HPA needs **requests** set and **metrics-server**. Pair HPA (Pods) with Cluster Autoscaler/Karpenter (nodes).

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Deployment** | Controller for stateless apps with rolling updates. |
| **ReplicaSet** | Keeps a fixed number of identical Pods. |
| **StatefulSet** | Controller giving Pods stable names and storage. |
| **Headless Service** | Service with no virtual IP; DNS returns individual Pod IPs. |
| **DaemonSet** | One Pod per node. |
| **maxSurge / maxUnavailable** | How many extra / missing Pods are tolerated during a rolling update. |
| **Canary / Blue-green** | Gradual traffic shift to a new version / switching between two full environments. |
| **HPA / VPA** | Pod count autoscaler / Pod size autoscaler. |
| **Operator** | Custom controller encoding operational knowledge for an application. |

---

> **Navigation:** [⬅ Previous: 02_Pods](02_Pods.md) · [Index](00_Kubernetes_Index.md) · [Next: 04_Configuration_and_Secrets ➡](04_Configuration_and_Secrets.md)
