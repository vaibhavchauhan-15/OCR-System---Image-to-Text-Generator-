import os
from pydantic import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    APP_NAME: str = "OCR System API"
    APP_VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    
    # Google Cloud Vision API settings
    GOOGLE_APPLICATION_CREDENTIALS: Optional[str] = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
    
    # PaddleOCR settings
    PADDLEOCR_USE_ANGLE_CLS: bool = True
    PADDLEOCR_LANG: str = "en"
    
    # Storage settings
    UPLOAD_DIR: str = "uploads"
    MAX_UPLOAD_SIZE: int = 10 * 1024 * 1024  # 10MB
    
    # Database settings
    DATABASE_URL: Optional[str] = os.getenv("DATABASE_URL")
    
    # CORS settings
    CORS_ORIGINS: list = ["*"]
    
    class Config:
        env_file = ".env"

settings = Settings()
