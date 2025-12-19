from qdrant_client import QdrantClient
from qdrant_client.http import models
from typing import List, Optional
import uuid
from app.core.config import settings


class QdrantService:
    def __init__(self):
        if settings.qdrant_api_key:
            self.client = QdrantClient(
                url=settings.qdrant_url,
                api_key=settings.qdrant_api_key,
                prefer_grpc=True
            )
        else:
            # For local Qdrant instance without API key
            self.client = QdrantClient(url=settings.qdrant_url)

        self.collection_name = settings.qdrant_collection_name
        self._create_collection_if_not_exists()

    def _create_collection_if_not_exists(self):
        """Create the collection if it doesn't exist"""
        try:
            self.client.get_collection(self.collection_name)
        except:
            # Collection doesn't exist, create it
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=models.VectorParams(
                    size=settings.embedding_dimension,
                    distance=models.Distance.COSINE
                )
            )

    async def store_embedding(self, vector: List[float], payload: dict) -> str:
        """Store an embedding vector with its payload"""
        point_id = str(uuid.uuid4())

        self.client.upsert(
            collection_name=self.collection_name,
            points=[
                models.PointStruct(
                    id=point_id,
                    vector=vector,
                    payload=payload
                )
            ]
        )

        return point_id

    async def search_similar(self, query_vector: List[float], limit: int = 5) -> List[dict]:
        """Search for similar vectors"""
        results = self.client.search(
            collection_name=self.collection_name,
            query_vector=query_vector,
            limit=limit
        )

        return [
            {
                "id": result.id,
                "payload": result.payload,
                "score": result.score
            }
            for result in results
        ]

    async def delete_by_payload_field(self, field: str, value: str):
        """Delete points based on payload field value"""
        self.client.delete(
            collection_name=self.collection_name,
            points_selector=models.FilterSelector(
                filter=models.Filter(
                    must=[
                        models.FieldCondition(
                            key=field,
                            match=models.MatchValue(value=value)
                        )
                    ]
                )
            )
        )

    async def get_point(self, point_id: str) -> Optional[dict]:
        """Get a specific point by ID"""
        points = self.client.retrieve(
            collection_name=self.collection_name,
            ids=[point_id]
        )

        if points:
            point = points[0]
            return {
                "id": point.id,
                "payload": point.payload,
                "vector": point.vector
            }

        return None


# Global instance
qdrant_service = QdrantService()