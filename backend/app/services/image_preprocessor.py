import cv2
import numpy as np
from PIL import Image
import io
from typing import Tuple

class ImagePreprocessor:
    """
    Image preprocessor for OCR optimization
    """
    
    @staticmethod
    def preprocess_image(image_bytes: bytes) -> bytes:
        """
        Apply preprocessing steps to improve OCR accuracy
        
        Args:
            image_bytes: Raw image bytes
            
        Returns:
            Processed image bytes
        """
        try:
            # Convert bytes to numpy array
            nparr = np.frombuffer(image_bytes, np.uint8)
            image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            if image is None:
                # If conversion fails, return original bytes
                return image_bytes
                
            # Apply preprocessing steps
            processed_image = ImagePreprocessor._apply_preprocessing(image)
            
            # Convert back to bytes
            success, buffer = cv2.imencode('.png', processed_image)
            if not success:
                return image_bytes  # Return original if encoding fails
            
            return buffer.tobytes()
        except Exception as e:
            print(f"Image preprocessing error: {str(e)}")
            # Return original image bytes if preprocessing fails
            return image_bytes
    
    @staticmethod
    def _apply_preprocessing(image: np.ndarray) -> np.ndarray:
        """
        Apply a series of preprocessing steps to the image
        
        Args:
            image: OpenCV image
            
        Returns:
            Processed OpenCV image
        """
        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Apply Gaussian blur to reduce noise
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)
        
        # Apply adaptive thresholding for better text extraction
        threshold = cv2.adaptiveThreshold(
            blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
            cv2.THRESH_BINARY, 11, 2
        )
        
        # Deskew the image if needed
        deskewed = ImagePreprocessor._deskew(threshold)
        
        return deskewed
    
    @staticmethod
    def _deskew(image: np.ndarray) -> np.ndarray:
        """
        Deskew the image to straighten text lines
        
        Args:
            image: Thresholded image
            
        Returns:
            Deskewed image
        """
        # Find all non-zero points
        coords = np.column_stack(np.where(image > 0))
        
        # Check if there are enough points to calculate angle
        if len(coords) <= 10:
            return image
        
        # Calculate rotated rectangle
        try:
            angle = cv2.minAreaRect(coords)[-1]
            
            # Adjust angle
            if angle < -45:
                angle = -(90 + angle)
            else:
                angle = -angle
                
            # Rotate the image to deskew it
            (h, w) = image.shape[:2]
            center = (w // 2, h // 2)
            M = cv2.getRotationMatrix2D(center, angle, 1.0)
            rotated = cv2.warpAffine(
                image, M, (w, h), 
                flags=cv2.INTER_CUBIC, 
                borderMode=cv2.BORDER_REPLICATE
            )
            return rotated
        except Exception as e:
            print(f"Deskew error: {str(e)}")
            # Fall back to original image if deskew fails
            return image
