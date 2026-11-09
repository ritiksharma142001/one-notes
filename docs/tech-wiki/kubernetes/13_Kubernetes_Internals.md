---
mdx:
  format: md
---

# 13. Kubernetes Internals

> **Note**: Sections marked **(Interview Imp)** are frequently asked in interviews. Every chapter ends with a **📘 Terms Explained** table for the jargon it uses.
>
> **Navigation:** [⬅ Previous: 12_Spring_Boot_on_Kubernetes](12_Spring_Boot_on_Kubernetes.md) · [Index](00_Kubernetes_Index.md) · [Next: 14_Interview_Questions ➡](14_Interview_Questions.md)

## Table of Contents
- [13.1 The Reconciliation (Control) Loop](#131-the-reconciliation-control-loop)
- [13.2 What Happens on `kubectl apply -f deploy.yaml`](#132-what-happens-on-kubectl-apply--f-deployyaml)
- [13.3 etcd, API Machinery and Concepts](#133-etcd-api-machinery-and-concepts)
- [13.4 Container Runtime, CNI, CSI Interfaces](#134-container-runtime-cni-csi-interfaces)

---

## 13.1 The Reconciliation (Control) Loop

```
observe actual state → compare with desired state (spec) → take action → repeat
```
Controllers use **informers** (watch + local cache + work queue), so the API server isn't polled constantly. Everything is **level-triggered** (react to the current state, not just events) → robust to missed events and restarts.

## 13.2 What Happens on `kubectl apply -f deploy.yaml`
1. kubectl reads kubeconfig, sends the object to **kube-apiserver** (HTTPS).
2. API server: **authenticates** → **authorises (RBAC)** → **mutating admission** (defaults, sidecar injection) → **schema validation** → **validating admission** (policies) → writes to **etcd**.
3. **Deployment controller** sees the new Deployment, creates a **ReplicaSet**.
4. **ReplicaSet controller** creates Pod objects (no node yet).
5. **Scheduler** sees unscheduled Pods, picks nodes, writes `spec.nodeName` (binding).
6. **kubelet** on that node sees its Pod, asks the runtime (CRI) to pull the image and start containers, sets up networking (CNI) and volumes (CSI), runs probes, updates `status`.
7. **EndpointSlice controller** adds Ready Pods to the Service; **kube-proxy** programs rules; traffic flows.

## 13.3 etcd, API Machinery and Concepts
- **etcd:** Raft-based consensus; stores serialized objects under `/registry/...`; only the API server accesses it. Quorum = majority (3 nodes tolerate 1 failure). Performance depends on disk latency (use SSD, dedicated disks).
- **Resource versions & optimistic concurrency:** each object has `resourceVersion`; updates with stale versions are rejected (conflict) → retry.
- **Watch:** long-lived streams of changes.
- **Server-side apply:** field ownership tracking (`managedFields`) to resolve conflicts between tools.
- **Finalizers:** keys that block deletion until a controller cleans up; **ownerReferences** drive cascading garbage collection.
- **API versioning:** alpha → beta → GA; deprecation policy; API groups (`apps`, `batch`, `networking.k8s.io`).
- **Leader election:** only one active scheduler/controller-manager instance at a time (Lease objects).
- **Static Pods:** kubelet runs control-plane Pods from `/etc/kubernetes/manifests` (kubeadm).
- **Certificates:** components authenticate with TLS client certs; rotation matters (1-year default on kubeadm).

## 13.4 Container Runtime, CNI, CSI Interfaces
- **CRI:** kubelet ↔ containerd/CRI-O (gRPC). Docker Engine support via `dockershim` was removed in v1.24; Docker-built images still work (OCI).
- **CNI:** runtime calls the plugin to set up Pod network namespace, IPs, routes (overlay VXLAN/Geneve, BGP, or cloud-native VPC IPs).
- **CSI:** attach/mount volumes, snapshots, expansion via external provisioner/attacher sidecars.
- **Device plugins:** expose GPUs/FPGAs; **DRA** (Dynamic Resource Allocation) is the evolving model.

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Informer** | Client component caching API objects and delivering change events. |
| **Level-triggered** | Reacting to current state rather than individual events. |
| **resourceVersion** | Version stamp used to detect conflicting updates. |
| **Finalizer** | Marker preventing deletion until cleanup is done. |
| **ownerReference** | Link from child to parent object for garbage collection. |
| **Raft** | Consensus algorithm used by etcd. |
| **Server-side apply** | Applying changes with the API server tracking field ownership. |
| **Lease** | Lightweight object used for leader election/heartbeats. |

---

> **Navigation:** [⬅ Previous: 12_Spring_Boot_on_Kubernetes](12_Spring_Boot_on_Kubernetes.md) · [Index](00_Kubernetes_Index.md) · [Next: 14_Interview_Questions ➡](14_Interview_Questions.md)
