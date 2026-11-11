---
mdx:
  format: md
---

# 11 - AI Engineering Tools Reference

> **Fundamentals over frameworks.** Tools change every few months; the ideas in weeks 1-10 (tokens, retrieval, state machines, evals, guardrails) don't. Learn each tool as "an implementation of a concept you already understand".
>
> This page covers the 20 tools in the curriculum: what each is, when to use it, alternatives, a minimal snippet and where it appears in the course. Snippets are short reference examples and were **not executed** here (most need a server, an API key or a download); the runnable, verified versions of each concept are in the weekly files.
>
> ⬅️ [10 Capstone & Interview Prep](10_Capstone_and_Interview_Prep.md) · ⬆️ [00 Index](00_AI_Engineering_Index.md)

## Table of Contents
1. [Map: Which Tool for Which Job](#1-map-which-tool-for-which-job)
2. [Models and Serving](#2-models-and-serving)
3. [Frameworks](#3-frameworks)
4. [Data: Vector Stores and Memory](#4-data-vector-stores-and-memory)
5. [Evals and Observability](#5-evals-and-observability)
6. [Apps, Protocols and Deployment](#6-apps-protocols-and-deployment)
7. [Choosing a Stack](#7-choosing-a-stack)

---

## 1. Map: Which Tool for Which Job

| Job | Tools in this course | Common alternatives | Learn it in |
|---|---|---|---|
| Access many models with one key | **OpenRouter** | LiteLLM, provider SDKs, AWS Bedrock | [W1](01_Python_and_LLM_Fundamentals.md#4-calling-llm-apis-and-streaming-responses) |
| Run models locally | **Ollama** | llama.cpp, LM Studio, vLLM | [W7](07_ML_Fundamentals_and_Fine_Tuning.md#6-local-model-serving) |
| Open models, datasets, fine-tuning libs | **Hugging Face** | ModelScope, Kaggle | [W7](07_ML_Fundamentals_and_Fine_Tuning.md) |
| Speech-to-text | **OpenAI Whisper** | faster-whisper, Deepgram, AssemblyAI | [W9](09_Multimodal_AI.md#3-voice-ai-speech-to-text-text-to-speech-voice-agents) |
| Building blocks for LLM apps | **LangChain** | plain SDK calls, Haystack | [W2](02_RAG_Foundations.md) |
| Data/RAG framework | **LlamaIndex** | LangChain, Haystack | [W2-3](03_Enterprise_RAG.md) |
| Agent state machines | **LangGraph** | OpenAI Agents SDK, Pydantic AI, Temporal | [W4](04_Agents_and_State_Machines.md#6-state-machines-with-langgraph-interview-imp) |
| Role-based multi-agent teams | **CrewAI** | AutoGen / Microsoft Agent Framework, LangGraph supervisor | [W6](06_MCP_Context_Engineering_Multi_Agent.md#4-multi-agent-orchestration-patterns-interview-imp) |
| Vector DB (dedicated) | **Qdrant** | Weaviate, Milvus, Pinecone, Chroma | [W2](02_RAG_Foundations.md#5-vector-databases-and-indexing-interview-imp) |
| Vector search in Postgres | **pgvector** | Postgres + pgvectorscale, Supabase | [W2](02_RAG_Foundations.md#5-vector-databases-and-indexing-interview-imp) |
| Memory, cache, rate limits | **Redis** | Valkey, Memcached, DynamoDB | [W4](04_Agents_and_State_Machines.md#7-agent-memory), [W8](08_Agentic_System_Design_and_Reliability.md) |
| Tracing and LLM observability | **Langfuse**, **LangSmith** | Arize Phoenix, Helicone, OpenTelemetry + Grafana | [W5](05_Evals_and_Observability.md#2-end-to-end-tracing-interview-imp) |
| RAG evaluation | **RAGAS** | DeepEval, TruLens, promptfoo | [W5](05_Evals_and_Observability.md#6-evaluating-rag-pipelines-interview-imp) |
| CI/CD and eval gates | **GitHub Actions** | GitLab CI, Jenkins | [W5](05_Evals_and_Observability.md#8-weekly-build---the-regression--telemetry-gate) |
| Tool protocol | **MCP SDK** | plain function calling, OpenAPI tools | [W6](06_MCP_Context_Engineering_Multi_Agent.md#1-mcp---the-model-context-protocol-interview-imp) |
| API backend | **FastAPI** | Flask, Django, Spring Boot (Java) | [W1](01_Python_and_LLM_Fundamentals.md#7-weekly-build---the-ai-gateway) |
| Quick demo UI / dashboard | **Streamlit** | Gradio, Chainlit, Next.js | [W9](09_Multimodal_AI.md#7-capstone-sprint---the-multimodal-rag-engine) |
| Packaging | **Docker** | Podman, buildpacks | [W10](10_Capstone_and_Interview_Prep.md#23-deploy), [Docker guide](../docker/00_Docker_Index.md) |
| Cloud | **AWS** | GCP (Vertex AI), Azure (Azure OpenAI) | [W10](10_Capstone_and_Interview_Prep.md#23-deploy) |

---

## 2. Models and Serving

### OpenRouter
**What:** one API key and one OpenAI-compatible endpoint for hundreds of models from many providers, with automatic provider fallback. **Use when:** comparing models, tiering, avoiding lock-in. **Watch:** data policies differ per underlying provider - choose providers that don't train on your data.

```python
# Not executed: needs OPENROUTER_API_KEY
from openai import OpenAI
client = OpenAI(base_url="https://openrouter.ai/api/v1", api_key="sk-or-...")
r = client.chat.completions.create(model="anthropic/claude-sonnet-4.5",
                                   messages=[{"role": "user", "content": "Hello"}])
```

### Ollama
**What:** download and run open models locally with one command; serves an OpenAI-compatible API on port 11434. **Use when:** development without API costs, private data, offline demos, embeddings (`nomic-embed-text`).

```bash
ollama pull llama3.2           # ~2 GB; small models run on CPU
ollama run llama3.2 "Explain RAG in one line"
# OpenAI-compatible: base_url="http://localhost:11434/v1", api_key="ollama"
```

### Hugging Face
**What:** the hub for open models, datasets and Spaces, plus libraries: `transformers` (models), `datasets`, `peft` (LoRA), `trl` (fine-tuning), `sentence-transformers` (embeddings, cross-encoders). **Use when:** anything open-source ML.

```python
# Not executed: downloads a model
from sentence_transformers import SentenceTransformer
emb = SentenceTransformer("all-MiniLM-L6-v2").encode(["refund my payment"])   # 384-dim vector
```

### OpenAI Whisper
**What:** open-source speech recognition in ~100 languages (incl. Hindi), sizes tiny → large. `faster-whisper` is a 4× faster re-implementation. **Use when:** transcribing calls/voice notes, voice agents (or use a streaming hosted ASR for real-time).

```python
# Not executed: downloads a model. pip install openai-whisper (needs ffmpeg)
import whisper
print(whisper.load_model("base").transcribe("voice_note.mp3")["text"])
```

---

## 3. Frameworks

### LangChain
**What:** a large library of LLM building blocks: model wrappers for every provider, prompt templates, output parsers, document loaders, text splitters, retrievers, tool definitions. **Use when:** you want ready-made integrations. **Watch:** many abstraction layers - for simple apps, direct SDK calls are often clearer.

```python
# Not executed: needs an API key
from langchain_openai import ChatOpenAI
from langchain_text_splitters import RecursiveCharacterTextSplitter
chunks = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=100).split_text(long_text)
llm = ChatOpenAI(model="gpt-4o-mini")
print(llm.invoke("Summarise: " + chunks[0]).content)
```

### LlamaIndex
**What:** a framework focused on **data → RAG**: loaders, parsers (LlamaParse), indexes, query engines, re-rankers, agents over data. **Use when:** document-heavy RAG where you want strong ingestion and query pipelines quickly.

```python
# Not executed: needs an API key (or configure Ollama models)
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
index = VectorStoreIndex.from_documents(SimpleDirectoryReader("docs/").load_data())
print(index.as_query_engine(similarity_top_k=5).query("What is the refund window?"))
```

### LangGraph
**What:** build agents and workflows as **graphs with state**: nodes, conditional edges, cycles, checkpointers, `interrupt` for human-in-the-loop, streaming, memory store. **Use when:** any agent you'll run in production. Verified, runnable examples: [Week 4](04_Agents_and_State_Machines.md#6-state-machines-with-langgraph-interview-imp).

### CrewAI
**What:** multi-agent framework built around **roles, goals and tasks** ("crews"), sequential or hierarchical processes. **Use when:** quick multi-agent prototypes with clear roles. Snippet: [Week 6 §4](06_MCP_Context_Engineering_Multi_Agent.md#4-multi-agent-orchestration-patterns-interview-imp).

### FastAPI
**What:** async Python web framework that uses type hints (Pydantic) for validation and auto-generates OpenAPI docs. **Use when:** serving your AI app as an API, streaming with `StreamingResponse`. Verified example: [Week 1 AI Gateway](01_Python_and_LLM_Fundamentals.md#7-weekly-build---the-ai-gateway).

### Streamlit
**What:** turn a Python script into a web app with a few lines - chat UIs, dashboards, demos. **Use when:** internal tools, demo day, cost/eval dashboards.

```python
# Not executed: run with `streamlit run app.py`
import streamlit as st
st.title("Ticket dashboard")
st.metric("Avg cost per ticket", "$0.0059")
if q := st.chat_input("Ask about a policy"):
    st.chat_message("user").write(q)
    st.chat_message("assistant").write(answer(q))      # your RAG function
```

---

## 4. Data: Vector Stores and Memory

### Qdrant
**What:** open-source vector database (Rust) with HNSW, rich payload filtering, sparse+dense hybrid search with built-in RRF, quantization, multi-tenancy. **Start:** `docker run -p 6333:6333 qdrant/qdrant`, or `QdrantClient(":memory:")` in tests. Snippet: [Week 2 §5](02_RAG_Foundations.md#5-vector-databases-and-indexing-interview-imp).

### pgvector
**What:** PostgreSQL extension adding a `vector` type, distance operators (`<->` L2, `<=>` cosine, `<#>` inner product) and HNSW/IVFFlat indexes. **Use when:** you already run Postgres and want joins, transactions, backups and row-level security with your vectors. SQL: [Week 2 §5](02_RAG_Foundations.md#5-vector-databases-and-indexing-interview-imp).

### Redis
**What:** in-memory key-value store: sessions, agent memory, caches (incl. vector search for semantic caching), rate limiting, queues, LangGraph checkpoints. **Start:** `docker run -p 6379:6379 redis`. Snippet: [Week 4 §7](04_Agents_and_State_Machines.md#7-agent-memory).

---

## 5. Evals and Observability

### Langfuse
**What:** open-source (self-hostable) LLM engineering platform: traces, cost and latency, prompt management with versions, datasets, LLM-as-a-judge evaluators, user feedback. Snippet: [Week 5 §2](05_Evals_and_Observability.md#2-end-to-end-tracing-interview-imp).

### LangSmith
**What:** LangChain's hosted platform with the same jobs (tracing, datasets, evals, prompt hub); zero-config with LangChain/LangGraph (`LANGSMITH_TRACING=true`). **Choose:** Langfuse for open-source/self-hosting; LangSmith if you're all-in on LangChain.

### RAGAS
**What:** library of RAG and agent metrics (faithfulness, context precision/recall, answer relevancy, tool-call accuracy) using LLM judges, plus test-set generation. What each metric computes: [Week 5 §6](05_Evals_and_Observability.md#6-evaluating-rag-pipelines-interview-imp).

### GitHub Actions
**What:** CI/CD inside GitHub: run tests, evals, builds and deploys on every push/PR; secrets for API keys; required status checks block merges. Workflow: [Week 5 §8](05_Evals_and_Observability.md#8-weekly-build---the-regression--telemetry-gate).

---

## 6. Apps, Protocols and Deployment

### MCP SDK
**What:** official SDKs (Python, TypeScript, Java, Kotlin, C#, Go…) to build MCP servers and clients. Python 2.x uses `MCPServer` (renamed from `FastMCP` in 1.x) and `Client`. Verified examples: [Week 6](06_MCP_Context_Engineering_Multi_Agent.md#1-mcp---the-model-context-protocol-interview-imp).

### Docker
**What:** package the app and dependencies into an image that runs the same everywhere; Compose runs app + Qdrant + Redis + Langfuse together. Full guide: [Docker index](../docker/00_Docker_Index.md).

```yaml
# docker-compose.yml (not executed here)
services:
  api:    { build: ., ports: ["8000:8000"], env_file: .env, depends_on: [qdrant, redis] }
  qdrant: { image: qdrant/qdrant, ports: ["6333:6333"], volumes: ["qdrant:/qdrant/storage"] }
  redis:  { image: redis:7, ports: ["6379:6379"] }
volumes: { qdrant: {} }
```

### AWS
**What you'd use:** **Bedrock** (managed Claude, Llama, Mistral, Titan embeddings, Knowledge Bases for managed RAG, Guardrails), ECS Fargate / App Runner / Lambda (compute), RDS Postgres + pgvector or OpenSearch (vectors), ElastiCache (Redis), S3 (documents), SQS (queues), CloudWatch / X-Ray (observability), IAM + Secrets Manager (security). Same patterns exist on GCP (Vertex AI) and Azure (Azure OpenAI, AI Search).

---

## 7. Choosing a Stack

| Situation | Suggested stack |
|---|---|
| Learning / this course, zero cost | Ollama + plain Python + FastAPI + Qdrant (Docker) + Langfuse (self-hosted) |
| Startup MVP | OpenRouter (tiering) + LangGraph + pgvector + Redis + Langfuse + Docker on one VM |
| Enterprise on AWS | Bedrock + LangGraph on ECS + RDS pgvector/OpenSearch + ElastiCache + CloudWatch/OTel + GitHub Actions eval gates |
| Java/Spring shop | Spring AI or LangChain4j (same concepts: ChatClient, VectorStore, tools/MCP) + pgvector; Python only where ML libraries require it |

#### 📘 Terms Explained

| Term | Simple meaning |
|---|---|
| **SDK** | Software Development Kit - a library for using a service from code. |
| **Vendor lock-in** | Being stuck with one provider because switching is expensive. |
| **Self-hosting** | Running open-source software on your own servers instead of a vendor's cloud. |
| **Spring AI / LangChain4j** | Java frameworks that bring LLM, RAG, tools and MCP support to Spring Boot/Java apps. |

⬅️ [10 Capstone & Interview Prep](10_Capstone_and_Interview_Prep.md) · ⬆️ [00 Index](00_AI_Engineering_Index.md)
