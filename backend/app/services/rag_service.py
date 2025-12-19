from typing import List, Optional
from app.services.embedding_service import embedding_service
from app.db.qdrant import qdrant_service
from app.db.postgres import Document
from app.utils.text_splitter import text_splitter
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import sessionmaker
import logging

logger = logging.getLogger(__name__)


class RAGService:
    def __init__(self):
        self.embedding_service = embedding_service
        self.qdrant_service = qdrant_service
        self.text_splitter = text_splitter

    async def retrieve_context(self, query: str, limit: int = 5) -> List[dict]:
        """
        Retrieve relevant context from the vector database
        """
        try:
            # Generate embedding for the query
            query_embedding = await self.embedding_service.generate_embedding(query)

            # Search for similar documents in Qdrant
            results = await self.qdrant_service.search_similar(
                query_vector=query_embedding,
                limit=limit
            )

            return results
        except Exception as e:
            logger.error(f"Error retrieving context: {str(e)}")
            return []

    async def process_selected_text_mode(self, question: str, selected_text: str) -> str:
        """
        Process question using only the selected text (no vector search)
        """
        if not selected_text or not selected_text.strip():
            return "The answer is not available in the provided content."

        # In selected_text mode, we pass the selected text directly to the OpenAI agent
        # without using vector database or external knowledge
        return selected_text

    async def store_document(
        self,
        db: AsyncSession,
        title: str,
        content: str,
        chapter_title: Optional[str] = None,
        page_numbers: Optional[str] = None
    ) -> str:
        """
        Store document in both PostgreSQL and Qdrant
        """
        try:
            # Split content into chunks
            chunks = self.text_splitter.split_text(content)
            chunks_processed = 0

            for chunk in chunks:
                # Generate embedding for the chunk
                embedding = await self.embedding_service.generate_embedding(chunk)

                # Store in Qdrant
                point_id = await self.qdrant_service.store_embedding(
                    vector=embedding,
                    payload={
                        "title": title,
                        "content": chunk,
                        "chapter_title": chapter_title,
                        "page_numbers": page_numbers
                    }
                )

                # Store document metadata in PostgreSQL
                db_document = Document(
                    title=title,
                    content=chunk,
                    chapter_title=chapter_title,
                    page_numbers=page_numbers,
                    embedding_id=point_id
                )
                db.add(db_document)

                chunks_processed += 1

            await db.commit()
            return str(chunks_processed)
        except Exception as e:
            await db.rollback()
            logger.error(f"Error storing document: {str(e)}")
            raise


# Global instance
rag_service = RAGService()