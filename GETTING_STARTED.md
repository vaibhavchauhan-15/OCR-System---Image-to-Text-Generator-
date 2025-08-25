# OCR System - Image to Text Generator

> Repository: [https://github.com/vaibhavchauhan-15/OCR-System---Image-to-Text-Generator-](https://github.com/vaibhavchauhan-15/OCR-System---Image-to-Text-Generator-)

## Getting Started

To run this project, follow these steps:

### Prerequisites

1. [Python 3.10+](https://www.python.org/downloads/)
2. [Node.js 18+](https://nodejs.org/)
3. [Docker](https://www.docker.com/products/docker-desktop/) (optional, for containerized deployment)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up the Google Cloud Vision API:
   - Create a project on [Google Cloud Platform](https://console.cloud.google.com/)
   - Enable the Vision API
   - Create a service account and download the credentials JSON file
   - Set the environment variable:
     ```bash
     $env:GOOGLE_APPLICATION_CREDENTIALS="path\to\your-credentials.json"
     ```

5. Start the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```
   The API will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```bash
   copy .env.local.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at http://localhost:3000

### Using Docker (Optional)

To run the entire application using Docker:

```bash
docker-compose up
```

## API Documentation

Once the backend is running, you can access the API documentation at:
- http://localhost:8000/docs (Swagger UI)
- http://localhost:8000/redoc (ReDoc)

## License

MIT License
