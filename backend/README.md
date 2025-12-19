# RAG Chatbot Backend

An Integrated Retrieval-Augmented Generation (RAG) Chatbot backend for book content, built with FastAPI, OpenAI, Qdrant, and Neon Postgres.

## Tech Stack

- **FastAPI**: Modern, fast web framework for building APIs with Python 3.11+
- **OpenAI**: For generating embeddings and powering the chat agent
- **Qdrant Cloud**: Vector database for semantic search (Free Tier)
- **Neon Serverless Postgres**: Relational database for metadata storage
- **Async Architecture**: Non-blocking operations throughout

## Features

- **Two Chat Modes**:
  1. `full_book` → Retrieve from Qdrant vector store
  2. `selected_text` → Answer strictly using user-provided selected text only
- **Embedding Generation**: Using OpenAI's text-embedding models
- **Text Chunking**: Automatic text splitting with overlap
- **Context-Aware Responses**: Strict context boundaries enforcement
- **Production Ready**: Proper error handling, validation, and security

## Setup

### Prerequisites

- Python 3.11+
- OpenAI API Key
- Qdrant Cloud account (Free Tier)
- Neon Postgres account

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create your environment file:
   ```bash
   cp .env.example .env
   ```

5. Fill in the environment variables in `.env`:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `QDRANT_URL`: Your Qdrant Cloud URL
   - `QDRANT_API_KEY`: Your Qdrant API key
   - `NEON_DB_URL`: Your Neon Postgres connection string
   - `APP_SECRET_KEY`: Your secret key for JWT tokens
   - Other configuration variables as needed

## Configuration

### Qdrant Setup

1. Sign up for Qdrant Cloud at [qdrant.tech](https://qdrant.tech/)
2. Create a new cluster
3. Get your cluster URL and API key
4. Set `QDRANT_URL` and `QDRANT_API_KEY` in your `.env` file

### Neon Postgres Setup

1. Sign up for Neon at [neon.tech](https://neon.tech/)
2. Create a new project
3. Get your connection string from the project dashboard
4. Set `NEON_DB_URL` in your `.env` file

## Running the Application

### Development

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Production

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`.

## API Endpoints

### Ingest Content
```
POST /api/ingest
```

Request Body:
```json
{
  "book_title": "string",
  "content": "string",
  "chapter_title": "string | null",
  "page_numbers": "string | null"
}
```

### Chat with Book Content
```
POST /api/chat
```

Request Body:
```json
{
  "question": "string",
  "selected_text": "string | null",
  "mode": "full_book | selected_text"
}
```

## RAG Workflow

1. **Ingestion**: Text content is chunked and stored in both Qdrant (as embeddings) and Neon Postgres (as metadata)
2. **Query Processing**: When a question is asked, it's converted to an embedding
3. **Similarity Search**: The query embedding is compared against stored embeddings in Qdrant
4. **Context Retrieval**: Relevant text chunks are retrieved based on similarity scores
5. **Response Generation**: OpenAI generates a response using the retrieved context

## Selected-Text Mode Logic

When `mode` is set to `selected_text`:
- The `selected_text` field is required
- The system only uses the provided text to answer the question
- No vector database or external knowledge is used
- This ensures responses are strictly based on the user-provided text

## Error Handling

- If the answer is not found in the provided context, the system responds with: "The answer is not available in the provided content."
- No hallucinations - responses are strictly based on provided context
- Proper validation using Pydantic models

## Environment Variables

- `OPENAI_API_KEY`: OpenAI API key
- `QDRANT_URL`: Qdrant Cloud URL
- `QDRANT_API_KEY`: Qdrant API key (optional for local instances)
- `QDRANT_COLLECTION_NAME`: Collection name in Qdrant (default: book_content)
- `NEON_DB_URL`: Neon Postgres connection string
- `APP_SECRET_KEY`: Secret key for JWT tokens
- `ALGORITHM`: JWT algorithm (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time (default: 30)
- `EMBEDDING_MODEL`: OpenAI embedding model (default: text-embedding-3-small)
- `EMBEDDING_DIMENSION`: Embedding dimension (default: 1536)
- `CHUNK_SIZE`: Text chunk size (default: 1000)
- `CHUNK_OVERLAP`: Text chunk overlap (default: 200)

## Security

- JWT-based authentication
- Input validation with Pydantic models
- SQL injection prevention through SQLAlchemy ORM
- CORS configured for secure cross-origin requests

## Production Considerations

- Use environment-specific configuration
- Implement proper logging and monitoring
- Set up health checks
- Configure proper CORS settings for your frontend domain
- Use connection pooling for database operations
- Implement rate limiting if needed