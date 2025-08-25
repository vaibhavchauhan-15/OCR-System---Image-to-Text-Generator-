from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field

class OCRRequest(BaseModel):
    language: str = Field(default="en", description="Language code for OCR")
    enhance_image: bool = Field(default=True, description="Apply image preprocessing")
    structured_output: bool = Field(default=False, description="Extract structured data when possible")

class StructuredData(BaseModel):
    key_value_pairs: List[Dict[str, str]] = Field(default=[], description="Extracted key-value pairs")
    tables: List[List[List[str]]] = Field(default=[], description="Extracted tables")

class OCRResponse(BaseModel):
    text: str = Field(..., description="Extracted text content")
    confidence: float = Field(..., description="Confidence score of OCR")
    engine: str = Field(..., description="OCR engine used")
    engine_used: Optional[str] = Field(None, description="Specific OCR engine version used")
    structured_data: Optional[StructuredData] = Field(None, description="Structured data extracted")
    processing_time: float = Field(..., description="Time taken to process in seconds")
    word_count: Optional[int] = Field(0, description="Number of words in extracted text")
    
class HealthResponse(BaseModel):
    status: str = Field(..., description="API health status")
    version: str = Field(..., description="API version")
