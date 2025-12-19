from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class ChatRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=2000)
    selected_text: Optional[str] = None
    mode: str = Field(..., pattern="^(full_book|selected_text)$")


class ChatResponse(BaseModel):
    answer: str
    sources: Optional[List[str]] = []
    mode: str


class IngestRequest(BaseModel):
    book_title: str = Field(..., min_length=1, max_length=500)
    content: str = Field(..., min_length=1)
    chapter_title: Optional[str] = None
    page_numbers: Optional[str] = None


class IngestResponse(BaseModel):
    message: str
    chunks_processed: int
    document_id: str


class ErrorResponse(BaseModel):
    detail: str