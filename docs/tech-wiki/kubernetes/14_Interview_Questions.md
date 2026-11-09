---
format: md
---

# 14. Kubernetes Interview Questions (Basic to Advanced)

> **Note**: Sections marked **(Interview Imp)** are frequently asked in interviews. Every chapter ends with a **📘 Terms Explained** table for the jargon it uses.
>
> **Navigation:** [⬅ Previous: 13_Kubernetes_Internals](13_Kubernetes_Internals.md) · [Index](00_Kubernetes_Index.md) · [Next: 15_Certification_Projects_and_Learning_Path ➡](15_Certification_Projects_and_Learning_Path.md)

## Table of Contents
- [14.1 Basics](#141-basics)
- [14.2 Intermediate](#142-intermediate)
- [14.3 Advanced / Scenario-Based](#143-advanced--scenario-based)
- [14.4 Tricky Scenarios](#144-tricky-scenarios)

---

## 14.1 Basics
**Q1. What is Kubernetes? Why use it?** Open-source orchestrator that automates deployment, scaling, self-healing and management of containerised apps with declarative configuration.

**Q2. Explain the architecture.** Control plane (API server, etcd, scheduler, controller manager, cloud controller) + worker nodes (kubelet, kube-proxy, container runtime). See [1.2](01_Kubernetes_Fundamentals.md#12-architecture-interview-imp).

**Q3. Pod vs container?** A Pod wraps one or more containers sharing network (IP/localhost) and volumes; the unit of scheduling.

**Q4. Deployment vs ReplicaSet vs StatefulSet vs DaemonSet?** Deployment manages ReplicaSets for stateless apps with rolling updates; ReplicaSet maintains N Pods; StatefulSet gives stable identity/storage; DaemonSet runs one Pod per node.

**Q5. What are Services and their types?** Stable virtual IP/DNS + load balancing across Pods selected by labels: ClusterIP, NodePort, LoadBalancer, ExternalName, headless.

**Q6. Labels and selectors?** Key-value tags used to group and select objects (Services → Pods, Deployments → Pods).

**Q7. Namespaces?** Logical partitions for isolation, quotas, RBAC; not a security boundary by themselves.

**Q8. ConfigMap vs Secret?** Non-sensitive vs sensitive config; Secrets are base64 (not encrypted by default); enable encryption at rest and use external managers.

**Q9. How do you expose an app externally?** LoadBalancer Service, or Ingress/Gateway API with an ingress controller, TLS via cert-manager.

**Q10. What is `kubectl apply` vs `create`?** `apply` is declarative/idempotent (merge/patch); `create` fails if it exists.

## 14.2 Intermediate
**Q11. Liveness vs readiness vs startup probes?** Restart if stuck / remove from endpoints if not ready / protect slow starts.

**Q12. Requests vs limits; QoS classes?** Scheduling guarantee vs hard cap; Guaranteed, Burstable, BestEffort determine eviction order. CPU throttles, memory OOM-kills.

**Q13. How does a rolling update work? How to roll back?** Gradually replace Pods respecting maxSurge/maxUnavailable and readiness; `kubectl rollout undo`.

**Q14. How does HPA work?** Computes desired replicas from metrics vs target (needs requests and metrics-server); stabilisation windows; pairs with Cluster Autoscaler.

**Q15. How do Pods communicate across nodes?** Flat Pod network provided by CNI; Services and DNS abstract Pod IPs.

**Q16. PV, PVC, StorageClass?** Storage resource, claim for storage, and template for dynamic provisioning.

**Q17. StatefulSet vs Deployment for a database?** StatefulSet for stable identity and per-Pod volumes; but prefer operators or managed DBs.

**Q18. Taints/tolerations vs node affinity?** Taints repel Pods from nodes unless tolerated; affinity attracts Pods to nodes; combine for dedicated pools.

**Q19. What is a PodDisruptionBudget?** Limits voluntary evictions to preserve availability during drains/upgrades.

**Q20. Helm vs Kustomize?** Templated packages and releases vs template-free overlays/patches; often used together.

**Q21. What is RBAC? Role vs ClusterRole?** Permission model with verbs on resources; namespaced vs cluster-wide; bound by RoleBinding/ClusterRoleBinding.

**Q22. How do you do canary or blue/green deployments?** Two Deployments + traffic split via Ingress/mesh, or Argo Rollouts/Flagger with metric analysis.

## 14.3 Advanced / Scenario-Based
**Q23. A Pod is stuck in Pending. Debug?** `describe pod` events: insufficient resources, taints/affinity, unbound PVC, quotas; fix capacity or constraints.

**Q24. CrashLoopBackOff?** `logs --previous`, exit code, config/secret issues, liveness probe too aggressive, OOMKilled.

**Q25. Service has no endpoints?** Selector mismatch, Pods not Ready, wrong namespace/port; `kubectl get endpoints`.

**Q26. Explain what happens when you create a Deployment.** See [13.2](13_Kubernetes_Internals.md#132-what-happens-on-kubectl-apply--f-deployyaml).

**Q27. How does the scheduler work?** Filter then score nodes by requests, constraints, spreading; binds Pod; extensible via plugins/profiles.

**Q28. How do you secure a cluster?** RBAC least privilege, Pod Security restricted, NetworkPolicies, secrets encryption/external managers, image scanning/signing + admission policies, patching, audit logs, private API endpoint, runtime detection.

**Q29. How do you achieve high availability?** Multi-zone HA control plane (managed), multiple replicas with spread constraints and PDBs, health probes, multi-AZ storage strategy, multi-region/cluster for DR.

**Q30. What is an Operator? When to write one?** CRD + controller automating complex app lifecycle; write one when ops tasks (failover, backup, upgrades) need codifying.

**Q31. How do you handle secrets in GitOps?** Sealed Secrets, SOPS, External Secrets Operator referencing a vault; never plaintext in Git.

**Q32. Explain how Services route traffic (kube-proxy).** Service VIP translated by iptables/IPVS/eBPF DNAT rules to a ready endpoint Pod IP; EndpointSlices keep rules updated.

**Q33. Zero-downtime deploy checklist?** See [11.4](11_Production_Operations.md#114-zero-downtime-deployment-recipe).

**Q34. How to reduce cluster costs?** Right-size requests, autoscale Pods/nodes, spot instances, scale-to-zero, consolidate nodes, quotas, cost visibility.

**Q35. Node goes NotReady: what happens?** Node controller marks it after grace period, taints it (`NoExecute`), Pods are evicted after `tolerationSeconds` (default 300 s) and recreated elsewhere by controllers (StatefulSet Pods may need force-delete to avoid split-brain).

**Q36. etcd backup/restore?** `etcdctl snapshot save/restore`; encrypt, schedule, test restores (managed services handle it for you).

**Q37. How do you upgrade a cluster safely?** Read release notes, fix deprecated APIs, upgrade control plane then node pools one minor version at a time, use PDBs and surge, test in staging.

**Q38. Design a multi-tenant platform.** Namespaces per team with quotas, LimitRanges, RBAC via SSO groups, default-deny NetworkPolicies, Pod Security restricted, policy engine, dedicated node pools if needed, GitOps per tenant, cost allocation labels.

**Q39. Docker vs Kubernetes?** Docker builds/runs containers on one host; Kubernetes orchestrates many containers across hosts.

**Q40. What is the difference between ingress and a service mesh?** Ingress handles north-south (external → cluster) traffic; a mesh handles east-west (service-to-service) concerns like mTLS, retries and observability.

## 14.4 Tricky Scenarios
- Memory limit hit → **OOMKilled**, but CPU limit hit → only **throttled**.
- Changing a ConfigMap doesn't restart Pods; env vars never update without restart.
- `kubectl delete pod` of a Deployment's Pod → new one is created immediately.
- Deleting a StatefulSet leaves PVCs behind.
- Readiness failures remove Pods from Services but do not restart them; liveness failures restart.
- `selector` in a Deployment is immutable; label changes need a new Deployment.
- A Service of type LoadBalancer on-prem stays `Pending` without MetalLB/cloud integration.
- HPA with CPU target 70% uses utilisation relative to **requests**, so missing requests = no scaling.
- Pods in `Terminating` can still receive traffic briefly → `preStop` sleep and readiness handling.

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **Declarative** | You describe the end state ("3 replicas") and the system works out the steps. |
| **Idempotent** | Running it again gives the same result (e.g. `kubectl apply` twice changes nothing the second time). |
| **North-south / east-west traffic** | Traffic entering/leaving the cluster / traffic between services inside it. |
| **Split-brain** | Two copies both believe they are the primary and write conflicting data. |
| **Blue/green** | Run the old (blue) and new (green) versions side by side, then switch all traffic at once. |
| **Canary** | Send a small slice of traffic to the new version first and grow it if metrics stay healthy. |
| **`tolerationSeconds`** | How long a Pod stays on a node after a matching `NoExecute` taint appears (default 300 s for NotReady). |

---

> **Navigation:** [⬅ Previous: 13_Kubernetes_Internals](13_Kubernetes_Internals.md) · [Index](00_Kubernetes_Index.md) · [Next: 15_Certification_Projects_and_Learning_Path ➡](15_Certification_Projects_and_Learning_Path.md)
