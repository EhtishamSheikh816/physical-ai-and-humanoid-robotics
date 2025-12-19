from openai import OpenAI
from typing import List, Dict, Any
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)


class OpenAIAgent:
    def __init__(self):
        self.client = OpenAI(api_key=settings.openai_api_key)
        self.model = "gpt-4o"  # Using GPT-4 Turbo for better performance

    async def generate_response(
        self,
        question: str,
        context: List[Dict[str, Any]] = None,
        mode: str = "full_book"
    ) -> str:
        """
        Generate response using OpenAI based on the mode and context
        """
        try:
            if mode == "selected_text":
                # In selected_text mode, we use only the provided selected_text
                # without vector database or external knowledge
                return await self._generate_response_for_selected_text_mode(question, context)
            else:
                # In full_book mode, we use the retrieved context from vector database
                return await self._generate_response_for_full_book_mode(question, context)
        except Exception as e:
            logger.error(f"Error generating response: {str(e)}")
            return "The answer is not available in the provided content."

    async def _generate_response_for_full_book_mode(
        self,
        question: str,
        context: List[Dict[str, Any]] = None
    ) -> str:
        """
        Generate response for full_book mode using retrieved context
        """
        if not context:
            return "The answer is not available in the provided content."

        # Build context string from retrieved documents
        context_str = "\n\n".join([item["payload"]["content"] for item in context if "payload" in item and "content" in item["payload"]])

        if not context_str.strip():
            return "The answer is not available in the provided content."

        # Create system message with instructions
        system_message = """You are an AI assistant that answers questions based on provided book content.
        Only use the information provided in the context to answer the question.
        If the answer is not available in the provided context, respond with:
        'The answer is not available in the provided content.'
        Do not hallucinate or make up information."""

        user_message = f"""
        Context: {context_str}

        Question: {question}

        Answer the question based only on the provided context.
        """

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message}
            ],
            temperature=0.3,
            max_tokens=1000
        )

        return response.choices[0].message.content

    async def _generate_response_for_selected_text_mode(
        self,
        question: str,
        selected_text: List[Dict[str, Any]] = None
    ) -> str:
        """
        Generate response for selected_text mode using only the provided text
        """
        if not selected_text or not selected_text[0].get("content", "").strip():
            return "The answer is not available in the provided content."

        selected_content = selected_text[0]["content"]

        # Create system message with instructions for selected text mode
        system_message = """You are an AI assistant that answers questions based only on the provided selected text.
        Only use the information in the selected text to answer the question.
        Do not use any external knowledge or make up information.
        If the answer is not available in the provided selected text, respond with:
        'The answer is not available in the provided content.'
        Do not hallucinate or make up information."""

        user_message = f"""
        Selected Text: {selected_content}

        Question: {question}

        Answer the question based only on the provided selected text.
        """

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message}
            ],
            temperature=0.3,
            max_tokens=1000
        )

        return response.choices[0].message.content


# Global instance
openai_agent = OpenAIAgent()