---
id: 1
title: "RAG Chatbot Constitution Creation"
stage: constitution
date_iso: 2025-12-10
surface: agent
model: claude-sonnet-4-5-20250929
feature: "none"
branch: "001-physical-ai-textbook"
user: "user"
command: "/sp.constitution"
labels:
  - "constitution"
  - "rag"
  - "chatbot"
  - "physical-ai"
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - ".specify/memory/constitution.md"
  - "history/prompts/constitution/1-rag-chatbot-constitution.constitution.prompt.md"
tests:
  - "Constitution file validates against project requirements"
  - "Principles align with RAG chatbot development goals"
outcome: "Successfully created project constitution for RAG chatbot development"
evaluation: "Constitution meets all specified requirements with appropriate principles for technical accuracy, clarity, reproducibility, reliability, and security"
---

# Prompt History Record: RAG Chatbot Constitution Creation

## Original User Prompt

```
Project: Integrated RAG Chatbot Development for Physical AI & Humanoid Robotics Textbook
Core principles:
- Technical accuracy in explaining RAG architecture, embeddings, vector search, and pipeline operations
- Clarity for an audience of intermediate software engineers and educators
- Reproducibility of all RAG components (OpenAI Agents/ChatKit SDKs, FastAPI backend, Neon Postgres, Qdrant Cloud)
- Reliability: All code, pipelines, and examples must run as specified
- Security: No hardcoded API keys; adherence to safe data handling practices

Key standards:
- All technical explanations must be validated against official documentation (OpenAI, Qdrant, Neon, FastAPI)
- Architectural diagrams must reflect real system behavior
- Code snippets must be executable and tested
- Database schemas, API routes, and embedding workflows must be explicitly documented
- Writing clarity target: Flesch-Kincaid grade 9–11
- All examples must use free-tier compatible configurations

Constraints:
- Content must describe full integration: Chatbot → RAG Pipeline → Vector DB → Postgres → Book text ingestion
- Must include at least 3 working code blocks (ChatKit/Agents, FastAPI, Qdrant/Neon)
- No speculative or unverified claims about model capabilities
- Must provide user-data protection guidelines
- Must avoid vendor lock-in assumptions

Success criteria:
- RAG chatbot can answer questions strictly based on the user-selected text
- All code runs without modification for a new developer
- Architecture diagrams match the fully implemented system
- Book readers can reproduce the RAG pipeline end-to-end
- Chatbot passes functional tests: retrieval accuracy, context isolation, reproducibility
```

## Assistant Response Summary

Created a comprehensive project constitution for the Integrated RAG Chatbot Development for Physical AI & Humanoid Robotics Textbook. The constitution includes five core principles addressing technical accuracy, clarity, reproducibility, reliability, and security. It also defines technical constraints and success criteria that align with the project requirements. The constitution replaces the previous Docusaurus-focused constitution with RAG-specific principles and governance guidelines.

## Key Changes Made

- Updated project focus from Docusaurus book creation to RAG chatbot development
- Incorporated all specified core principles into the constitution
- Added specific technical constraints for the RAG integration
- Defined measurable success criteria for the chatbot functionality
- Updated version from 1.0.0 to 1.1.0 with appropriate governance information