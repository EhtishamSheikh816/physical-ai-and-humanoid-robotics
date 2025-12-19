from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.models.schemas import ChatRequest, ChatResponse, ErrorResponse
from app.db.postgres import get_db
from app.services.rag_service import rag_service
from app.services.openai_agent import openai_agent

router = APIRouter()


@router.post("/chat", response_model=ChatResponse, responses={
    400: {"model": ErrorResponse},
    422: {"model": ErrorResponse}
})
async def chat_endpoint(
    request: ChatRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Main chat endpoint that handles both full_book and selected_text modes
    """
    try:
        if request.mode == "selected_text":
            # In selected_text mode, we only use the provided selected_text
            if not request.selected_text or not request.selected_text.strip():
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="selected_text is required in selected_text mode"
                )

            # Prepare context with selected text
            context = [{"content": request.selected_text}]

            # Generate response using OpenAI
            answer = await openai_agent.generate_response(
                question=request.question,
                context=context,
                mode="selected_text"
            )

            return ChatResponse(
                answer=answer,
                sources=[],
                mode=request.mode
            )
        elif request.mode == "full_book":
            # In full_book mode, retrieve context from vector database
            retrieved_context = await rag_service.retrieve_context(request.question)

            if not retrieved_context:
                answer = "The answer is not available in the provided content."
            else:
                # Generate response using OpenAI with retrieved context
                answer = await openai_agent.generate_response(
                    question=request.question,
                    context=retrieved_context,
                    mode="full_book"
                )

            # Extract sources from retrieved context
            sources = []
            if retrieved_context:
                for item in retrieved_context:
                    payload = item.get("payload", {})
                    source_info = f"Title: {payload.get('title', 'Unknown')}"
                    if payload.get('chapter_title'):
                        source_info += f", Chapter: {payload.get('chapter_title')}"
                    if payload.get('page_numbers'):
                        source_info += f", Pages: {payload.get('page_numbers')}"
                    sources.append(source_info)

            return ChatResponse(
                answer=answer,
                sources=sources,
                mode=request.mode
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid mode. Use 'full_book' or 'selected_text'"
            )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while processing your request: {str(e)}"
        )