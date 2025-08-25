import io
import os
import time
import numpy as np
from typing import Dict, List, Any, Tuple, Optional
from PIL import Image
from paddleocr import PaddleOCR

from app.models.schemas import OCRRequest, OCRResponse, StructuredData
from app.core.config import settings
from app.services.image_preprocessor import ImagePreprocessor

class OCRService:
    """
    OCR Service using PaddleOCR
    """
    
    def __init__(self):
        """Initialize OCR engines"""
        # Initialize PaddleOCR with English as default
        self.ocr_engines = {}
        # Lazy loading - will initialize engines as needed
    
    def _get_ocr_engine(self, lang_code: str):
        """Get or initialize OCR engine for the specified language"""
        if lang_code not in self.ocr_engines:
            # Default to English if language not supported
            use_lang = lang_code if lang_code in ['en', 'hi'] else 'en'
            self.ocr_engines[lang_code] = PaddleOCR(use_gpu=False, lang=use_lang)
        return self.ocr_engines[lang_code]
    
    async def process_image(self, image_bytes: bytes, request: OCRRequest) -> OCRResponse:
        """
        Process an image and extract text using PaddleOCR
        
        Args:
            image_bytes: Raw image data
            request: OCR request parameters
            
        Returns:
            OCR response with extracted text
        """
        start_time = time.time()
        
        try:
            # Convert bytes to PIL Image
            image = Image.open(io.BytesIO(image_bytes))
            
            # Preprocess image if enhancement is requested
            if request.enhance_image:
                preprocessed_bytes = ImagePreprocessor.preprocess_image(image_bytes)
                image = Image.open(io.BytesIO(preprocessed_bytes))
            
            # Convert PIL Image to numpy array for PaddleOCR
            img_array = np.array(image)
            
            # Get OCR engine for the requested language
            ocr_engine = self._get_ocr_engine(request.language)
            
            # Run OCR
            result = ocr_engine.ocr(img_array, cls=False)
            
            # Extract text and confidence
            full_text = ""
            confidence_sum = 0
            confidence_count = 0
            
            # Process OCR results
            key_value_pairs = []
            
            if result and result[0]:
                for line in result[0]:
                    if line and len(line) >= 2:
                        text = line[1][0]  # Extract text
                        conf = line[1][1]  # Extract confidence
                        
                        full_text += text + " "
                        confidence_sum += conf
                        confidence_count += 1
                        
                        # For structured data, try to split by colon or equal
                        if request.structured_output and (":" in text or "=" in text):
                            if ":" in text:
                                parts = text.split(":", 1)
                            else:
                                parts = text.split("=", 1)
                            
                            if len(parts) == 2:
                                key_value_pairs.append({
                                    "key": parts[0].strip(),
                                    "value": parts[1].strip()
                                })
            
            # Calculate average confidence
            avg_confidence = confidence_sum / max(confidence_count, 1)
            
            # Count words
            word_count = len(full_text.split())
            
            return OCRResponse(
                text=full_text.strip(),
                confidence=avg_confidence,
                processing_time=time.time() - start_time,
                engine="PaddleOCR",
                engine_used=f"PaddleOCR-{request.language}",
                word_count=word_count,
                structured_data=StructuredData(
                    key_value_pairs=key_value_pairs
                )
            )
        except Exception as e:
            # Log the error and return a partial response
            print(f"OCR Error: {str(e)}")
            return OCRResponse(
                text=f"Error extracting text: {str(e)}",
                confidence=0.0,
                processing_time=time.time() - start_time,
                engine="PaddleOCR-error",
                word_count=0,
                structured_data=StructuredData(key_value_pairs=[])
            )
        
    async def save_image(self, image_bytes: bytes, filename: str) -> str:
        """
        Save image to uploads directory
        
        Args:
            image_bytes: Raw image data
            filename: Desired filename
            
        Returns:
            Path to the saved file
        """
        filepath = os.path.join(settings.UPLOAD_DIR, filename)
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        with open(filepath, "wb") as f:
            f.write(image_bytes)
            
        return filepath
