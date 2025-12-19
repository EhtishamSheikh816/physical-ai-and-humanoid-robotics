from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from app.api.chat import router as chat_router
from app.api.ingest import router as ingest_router
from app.core.config import settings

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting up RAG Chatbot API...")

    # Initialize services if needed
    # For example, verify database connections, etc.

    yield

    # Shutdown
    logger.info("Shutting down RAG Chatbot API...")


# Create FastAPI app
app = FastAPI(
    title="RAG Chatbot API",
    description="An Integrated Retrieval-Augmented Generation (RAG) Chatbot API for book content",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(chat_router, prefix="/api", tags=["chat"])
app.include_router(ingest_router, prefix="/api", tags=["ingest"])


@app.get("/")
async def root():
    return {"message": "RAG Chatbot API is running!"}


@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}