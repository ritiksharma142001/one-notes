---
format: md
---

# 7. Scheduling and Resource Management (Interview Imp)

> **Note**: Sections marked **(Interview Imp)** are frequently asked in interviews. Every chapter ends with a **📘 Terms Explained** table for the jargon it uses.
>
> **Navigation:** [⬅ Previous: 06_Storage](06_Storage.md) · [Index](00_Kubernetes_Index.md) · [Next: 08_Security ➡](08_Security.md)

## Table of Contents
- [7.1 How the Scheduler Decides](#71-how-the-scheduler-decides)
- [7.2 Placement Controls](#72-placement-controls)
- [7.3 Availability During Disruptions](#73-availability-during-disruptions)
- [7.4 Quotas and Limits per Namespace](#74-quotas-and-limits-per-namespace)
- [7.5 Node Pressure and Eviction](#75-node-pressure-and-eviction)

---

## 7.1 How the Scheduler Decides

For each unscheduled Pod: **Filter** (nodes that can run it: enough requested CPU/memory, taints tolerated, affinity rules satisfied, volume zone fits, ports free) → **Score** (spread, least/most allocated, affinity preferences, image locality) → **Bind** to the best node. Scheduling uses **requests**, not actual usage.

## 7.2 Placement Controls

| Mechanism | Purpose |
|---|---|
| **nodeSelector** | Simple: run only on nodes with label `disktype=ssd` |
| **Node affinity** | Expressive rules: `requiredDuringSchedulingIgnoredDuringExecution` (hard) / `preferred...` (soft) |
| **Pod affinity / anti-affinity** | Co-locate with / spread away from other Pods (e.g. one replica per node or zone) |
| **Taints & tolerations** | Node *repels* Pods unless they tolerate the taint (dedicated GPU nodes, control-plane nodes) |
| **Topology spread constraints** | Even spread across zones/nodes (`maxSkew`) |
| **Priority & preemption** | `PriorityClass`: important Pods can evict lower-priority ones |
| **Runtime/Scheduler profiles, `schedulerName`** | Custom schedulers (Volcano, kube-batch for batch/ML) |

```yaml
spec:
  nodeSelector: { disktype: ssd }
  tolerations:
    - { key: "dedicated", operator: "Equal", value: "gpu", effect: "NoSchedule" }
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions: [{ key: topology.kubernetes.io/zone, operator: In, values: [ap-south-1a, ap-south-1b] }]
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 100
          podAffinityTerm:
            topologyKey: kubernetes.io/hostname
            labelSelector: { matchLabels: { app: web } }
  topologySpreadConstraints:
    - maxSkew: 1
      topologyKey: topology.kubernetes.io/zone
      whenUnsatisfiable: ScheduleAnyway
      labelSelector: { matchLabels: { app: web } }
  priorityClassName: high-priority
```
```bash
kubectl taint nodes node1 dedicated=gpu:NoSchedule        # effects: NoSchedule, PreferNoSchedule, NoExecute (evicts)
kubectl label nodes node1 disktype=ssd
kubectl cordon node1 ; kubectl drain node1 --ignore-daemonsets --delete-emptydir-data ; kubectl uncordon node1
```

## 7.3 Availability During Disruptions

**PodDisruptionBudget (PDB):** limits voluntary disruptions (node drains, upgrades, autoscaler) so a minimum stays available.
```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata: { name: web }
spec: { minAvailable: 2, selector: { matchLabels: { app: web } } }      # or maxUnavailable: 1
```
Combine: ≥ 2-3 replicas + anti-affinity/topology spread across zones + PDB + readiness probes + graceful termination.

## 7.4 Quotas and Limits per Namespace

```yaml
apiVersion: v1
kind: ResourceQuota
metadata: { name: team-a, namespace: team-a }
spec:
  hard: { requests.cpu: "20", requests.memory: 40Gi, limits.memory: 80Gi, pods: "100", persistentvolumeclaims: "20", services.loadbalancers: "2" }
---
apiVersion: v1
kind: LimitRange
metadata: { name: defaults, namespace: team-a }
spec:
  limits:
    - type: Container
      default: { memory: 512Mi }            # default limit
      defaultRequest: { cpu: 100m, memory: 128Mi }
      max: { memory: 4Gi }
```
**ResourceQuota** caps total consumption of a namespace; **LimitRange** sets per-container defaults and bounds. Essential for multi-tenant clusters.

## 7.5 Node Pressure and Eviction
When a node runs low on memory/disk/PIDs the kubelet **evicts** Pods (BestEffort first, then Burstable exceeding requests). Reserve resources for system daemons (`kube-reserved`, `system-reserved`). Pods exceeding their *memory limit* are OOM-killed regardless.

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Taint** | Mark on a node that repels Pods. |
| **Toleration** | Pod setting that allows it onto tainted nodes. |
| **Affinity / Anti-affinity** | Rules to attract / repel Pods to certain nodes or other Pods. |
| **Topology spread** | Even distribution across zones or nodes. |
| **PodDisruptionBudget** | Guarantee of minimum available Pods during voluntary disruptions. |
| **Cordon / Drain** | Stop scheduling to a node / evict its Pods safely. |
| **Preemption** | Evicting low-priority Pods to make room for high-priority ones. |
| **ResourceQuota / LimitRange** | Namespace total cap / per-container defaults. |

---

> **Navigation:** [⬅ Previous: 06_Storage](06_Storage.md) · [Index](00_Kubernetes_Index.md) · [Next: 08_Security ➡](08_Security.md)
