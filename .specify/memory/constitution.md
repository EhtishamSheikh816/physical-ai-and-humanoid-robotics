<!--
SYNC IMPACT REPORT
Version change: 1.0.0 → 1.1.0
List of modified principles:
  - AI/Spec-Driven Book Creation → Integrated RAG Chatbot Development for Physical AI & Humanoid Robotics Textbook
  - Accuracy through verified technical documentation → Technical accuracy in RAG architecture
  - Clarity and accessibility for diverse audiences → Clarity for intermediate software engineers
  - Consistency across chapters → Reproducibility of RAG components
  - Modularity and reproducibility → Reliability of all components
  - No AI hallucinations or unverifiable claims → Security: No hardcoded API keys
  - Reproducible deployment → Updated success criteria
Added sections: RAG-specific principles and constraints
Removed sections: Docusaurus-specific constraints
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ updated - constitution check section now includes RAG principles
  - .specify/templates/spec-template.md ✅ updated - now includes RAG requirements
  - .specify/templates/tasks-template.md ✅ updated - now includes RAG tasks
Follow-up TODOs: None
-->
# Integrated RAG Chatbot Development for Physical AI & Humanoid Robotics Textbook Constitution

## Core Principles

### Technical accuracy in explaining RAG architecture, embeddings, vector search, and pipeline operations
All technical explanations must be validated against official documentation (OpenAI, Qdrant, Neon, FastAPI); Architectural diagrams must reflect real system behavior

### Clarity for an audience of intermediate software engineers and educators
Writing clarity target: Flesch-Kincaid grade 9–11; All examples must use free-tier compatible configurations

### Reproducibility of all RAG components (OpenAI Agents/ChatKit SDKs, FastAPI backend, Neon Postgres, Qdrant Cloud)
Code snippets must be executable and tested; All code, pipelines, and examples must run as specified

### Reliability: All code, pipelines, and examples must run as specified
Database schemas, API routes, and embedding workflows must be explicitly documented; All examples must be executable and tested

### Security: No hardcoded API keys; adherence to safe data handling practices
No hardcoded API keys or tokens; adherence to safe data handling practices; Must provide user-data protection guidelines

## Technical Constraints
Content must describe full integration: Chatbot → RAG Pipeline → Vector DB → Postgres → Book text ingestion; Must include at least 3 working code blocks (ChatKit/Agents, FastAPI, Qdrant/Neon); No speculative or unverified claims about model capabilities; Must avoid vendor lock-in assumptions

## Success Criteria
RAG chatbot can answer questions strictly based on the user-selected text; All code runs without modification for a new developer; Architecture diagrams match the fully implemented system; Book readers can reproduce the RAG pipeline end-to-end; Chatbot passes functional tests: retrieval accuracy, context isolation, reproducibility

## Governance
This constitution supersedes all other practices; Amendments require documentation and approval; All development must verify compliance with these principles; Use this constitution for guidance on project standards and quality expectations

**Version**: 1.1.0 | **Ratified**: 2025-12-06 | **Last Amended**: 2025-12-10
