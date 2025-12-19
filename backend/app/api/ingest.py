from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
import uuid

from app.models.schemas import IngestRequest, IngestResponse, ErrorResponse
from app.db.postgres import get_db
from app.services.rag_service import rag_service

router = APIRouter()


@router.post("/ingest", response_model=IngestResponse, responses={
    400: {"model": ErrorResponse},
    422: {"model": ErrorResponse}
})
async def ingest_endpoint(
    request: IngestRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Ingest book content into the vector database and metadata store
    """
    try:
        # Validate input
        if not request.content or not request.content.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Content is required and cannot be empty"
            )

        if not request.book_title or not request.book_title.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Book title is required and cannot be empty"
            )

        # Store document in both PostgreSQL and Qdrant
        chunks_processed = await rag_service.store_document(
            db=db,
            title=request.book_title,
            content=request.content,
            chapter_title=request.chapter_title,
            page_numbers=request.page_numbers
        )

        document_id = str(uuid.uuid4())

        return IngestResponse(
            message=f"Successfully ingested book content. Processed {chunks_processed} chunks.",
            chunks_processed=int(chunks_processed),
            document_id=document_id
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while ingesting the content: {str(e)}"
        )