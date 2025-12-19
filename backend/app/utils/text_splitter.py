from typing import List
from langchain_text_splitters import RecursiveCharacterTextSplitter
from app.core.config import settings


class TextSplitter:
    def __init__(self):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=settings.chunk_size,
            chunk_overlap=settings.chunk_overlap,
            length_function=len,
            is_separator_regex=False,
        )

    def split_text(self, text: str) -> List[str]:
        """
        Split text into chunks of specified size with overlap
        """
        chunks = self.splitter.split_text(text)
        return chunks


# Global instance
text_splitter = TextSplitter()