---
mdx:
  format: md
---

# 15. Certification, Practice Projects and Learning Path

> **Note**: Sections marked **(Interview Imp)** are frequently asked in interviews. Every chapter ends with a **📘 Terms Explained** table for the jargon it uses.
>
> **Navigation:** [⬅ Previous: 14_Interview_Questions](14_Interview_Questions.md) · [Index](00_Kubernetes_Index.md) · [Next: 16_Big_Picture_and_Cheat_Sheet ➡](16_Big_Picture_and_Cheat_Sheet.md)

## Table of Contents
- [15.1 Certification Prep (CKA, CKAD, CKS)](#151-certification-prep-cka-ckad-cks)
- [15.2 Practice Projects by Level](#152-practice-projects-by-level)
- [15.3 Learning Path](#153-learning-path)

---

## 15.1 Certification Prep (CKA, CKAD, CKS)

| Exam | Focus | Study tips |
|---|---|---|
| **CKAD** (App Developer) | Pods, Deployments, config, probes, Jobs, Services, Ingress, NetworkPolicy, Helm/Kustomize | Practice generating YAML with `--dry-run=client -o yaml`, speed with aliases (`k`, `$do`), vim/tmux |
| **CKA** (Administrator) | Cluster install (kubeadm), upgrades, etcd backup/restore, RBAC, scheduling, networking, storage, troubleshooting | Practice node/kubelet failures, certificate issues, drain/cordon |
| **CKS** (Security Specialist) | Hardening, RBAC, NetworkPolicy, Pod Security, image scanning, runtime security (Falco), audit logs, AppArmor/seccomp | Know CIS benchmark, Trivy, Kubesec, gVisor |
| **KCNA/KCSA** | Entry-level associate exams | Concepts and terminology |

Exam tools: allowed docs at kubernetes.io; use `kubectl explain`, bookmark docs pages; practise on killer.sh and KodeKloud labs. Handy:
```bash
alias k=kubectl; export do="--dry-run=client -o yaml"
k run nginx --image=nginx $do > pod.yaml
k create deploy web --image=nginx --replicas=3 $do
k expose deploy web --port=80 --target-port=8080
k create cm app --from-literal=a=b ; k create secret generic s --from-literal=p=x
k create role r --verb=get,list --resource=pods ; k create rolebinding rb --role=r --user=jane
k create job j --image=busybox -- echo hi ; k create cronjob c --image=busybox --schedule="*/5 * * * *" -- date
k set resources deploy web --limits=cpu=500m,memory=256Mi
k get pod -o custom-columns=NAME:.metadata.name,NODE:.spec.nodeName
```

## 15.2 Practice Projects by Level

| Level | Project | Skills |
|---|---|---|
| **Beginner** | Deploy nginx with a Deployment + Service on kind/minikube; scale and update | Basics, kubectl |
| | Deploy a web app + DB (Deployment, Service, ConfigMap, Secret, PVC) | Config, storage |
| | Break things on purpose (bad image, failing probe) and fix them | Debugging |
| **Intermediate** | Ingress with TLS (cert-manager) for two services | Networking |
| | HPA with load test (hey/k6) + metrics-server | Autoscaling |
| | Helm chart for your app with dev/prod values | Packaging |
| | CronJob backups; init containers for migrations | Jobs, patterns |
| | NetworkPolicies: default deny + explicit allows | Security |
| **Advanced** | GitOps with Argo CD: app-of-apps, environments, auto-sync, rollbacks | GitOps |
| | Progressive delivery with Argo Rollouts + Prometheus analysis | Canary |
| | Observability stack (kube-prometheus-stack, Loki, Tempo) with SLO alerts | Monitoring |
| | Run a database via an Operator (CloudNativePG) with backups to object storage | Stateful |
| | Write a small operator (Kubebuilder or kopf) with a CRD | Extensibility |
| | Build a multi-node cluster with kubeadm; practice upgrade and etcd restore | Admin (CKA) |
| | Policy as code: Kyverno policies, image signature verification (cosign) | Supply chain |
| | Deploy on EKS/GKE/AKS via Terraform with Karpenter/Cluster Autoscaler | Cloud |
| | Service mesh (Linkerd/Istio): mTLS, retries, traffic splitting | Mesh |

## 15.3 Learning Path

| Stage | Weeks | Cover | Output |
|---|---|---|---|
| 1. Prereqs | 1 | Linux, networking, [Docker wiki](../docker/00_Docker_Index.md) | Containerise an app |
| 2. Core | 2-3 | Files [01](01_Kubernetes_Fundamentals.md)-[04](04_Configuration_and_Secrets.md) | App with Deployment/Service/Config running locally |
| 3. Networking & storage | 4-5 | Files [05](05_Networking.md)-[06](06_Storage.md) | Ingress + persistent DB |
| 4. Operations | 6-8 | Files [07](07_Scheduling_and_Resources.md)-[09](09_Observability_and_Troubleshooting.md) | Autoscaling, scheduling, security, debugging drills |
| 5. Delivery | 9-10 | File [10](10_Helm_GitOps_and_Operators.md) | Helm/Kustomize + GitOps pipeline |
| 6. Production | 11-14 | Files [11](11_Production_Operations.md)-[13](13_Kubernetes_Internals.md) | Cloud cluster with observability, DR plan |
| 7. Certify | 15+ | [15.1](#151-certification-prep-cka-ckad-cks) | CKAD → CKA → CKS |

**Resources:** kubernetes.io/docs (Concepts, Tasks, Tutorials), *Kubernetes in Action* (Marko Lukša), *Kubernetes Up & Running*, *Programming Kubernetes*, *Production Kubernetes*, *Kubernetes Patterns*, Kelsey Hightower's *Kubernetes The Hard Way*, KodeKloud / killer.sh labs, CNCF landscape, TGIK / KubeCon talks, Learnk8s articles, `kubectl explain`.

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **CKA / CKAD / CKS** | CNCF hands-on exams: Administrator, Application Developer, Security Specialist. |
| **KCNA / KCSA** | Multiple-choice entry-level associate exams (cloud native / security). |
| **killer.sh** | Exam simulator included with CKA/CKAD/CKS registration. |
| **`--dry-run=client -o yaml`** | Prints the YAML a command *would* create, without creating anything; fastest way to write manifests. |
| **kubeadm** | Official tool for installing a cluster on your own machines. |
| **Argo CD / Flux** | GitOps tools that keep the cluster in sync with manifests stored in Git. |
| **Argo Rollouts / Flagger** | Progressive delivery tools for automated canary and blue/green releases. |
| **CloudNativePG** | Operator that runs and backs up PostgreSQL inside Kubernetes. |
| **Kubebuilder / kopf** | Frameworks for writing your own operators (Go / Python). |
| **Load test (hey, k6)** | Tools that send many requests to see how the app and autoscaler behave. |

---

> **Navigation:** [⬅ Previous: 14_Interview_Questions](14_Interview_Questions.md) · [Index](00_Kubernetes_Index.md) · [Next: 16_Big_Picture_and_Cheat_Sheet ➡](16_Big_Picture_and_Cheat_Sheet.md)
