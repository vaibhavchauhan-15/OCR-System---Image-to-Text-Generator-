from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends, BackgroundTasks, Query
from typing import Optional, List
import time
import os
import json

from app.models.schemas import OCRRequest, OCRResponse, HealthResponse
from app.services.ocr_service import OCRService
from app.core.config import settings

router = APIRouter()
ocr_service = OCRService()

@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Check API health status"""
    return HealthResponse(
        status="ok",
        version=settings.APP_VERSION
    )

@router.post("/extract", response_model=OCRResponse)
async def extract_text(
    file: UploadFile = File(...),
    language: str = Form("en"),
    enhance_image: bool = Form(True),
    structured_output: bool = Form(False)
):
    """Extract text from uploaded image"""
    start_time = time.time()
    
    # Check file size
    file_size = 0
    file_content = await file.read()
    file_size = len(file_content)
    
    if file_size > settings.MAX_UPLOAD_SIZE:
        raise HTTPException(
            status_code=413,
            detail=f"File too large. Maximum size is {settings.MAX_UPLOAD_SIZE/(1024*1024)}MB"
        )
    
    # Check file type
    content_type = file.content_type
    if not content_type or not content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="File must be an image"
        )
    
    # Create OCR request
    request = OCRRequest(
        language=language,
        enhance_image=enhance_image,
        structured_output=structured_output
    )
    
    # Save the file
    filename = f"{int(time.time())}_{file.filename}"
    await ocr_service.save_image(file_content, filename)
    
    # Process OCR
    result = await ocr_service.process_image(file_content, request)
    result.processing_time = time.time() - start_time
    
    return result

@router.post("/batch-extract")
async def batch_extract_text(
    files: List[UploadFile] = File(...),
    language: str = Form("en"),
    enhance_image: bool = Form(True),
    structured_output: bool = Form(False),
    background_tasks: BackgroundTasks = None
):
    """Extract text from multiple uploaded images (batch processing)"""
    # Implementation for batch processing
    raise HTTPException(status_code=501, detail="Batch processing not implemented yet")

@router.get("/supported-languages")
async def get_supported_languages():
    """Get list of supported languages for OCR"""
    languages = {
        "en": "English",
        "hi": "Hindi",
        # Add more languages
    }
    return languages
