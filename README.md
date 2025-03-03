# Misinformation Detection Demo

A web plugin that utilizes multimodal LLM with RAG using vector database for search optimization
that detects and highlights potential misinformation and ai generated images in websites

## Quick Link to our slide deck for more info
https://drive.google.com/drive/folders/1H1IcqwwBJ7O5mC4o4JkMNXXiuTL-qfII?usp=drive_link

## Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/HuangT1ng/DL_Week.git
cd DL_Week
```

### 2. Backend Setup
```bash
# Create and activate virtual environment
python -m venv venv

# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
cd backend
pip install -r requirements.txt

# Start FastAPI server
uvicorn server:app --reload
```
Backend runs on http://localhost:8000

### 3. Frontend Setup
```bash
# Open new terminal
cd frontend
npm install
npm run dev
```
Frontend runs on http://localhost:3000

## Project Structure

```
.
├── backend/
│   ├── server.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx
    │   │   └── layout.tsx
    │   └── components/
    │       └── MisinformationDemo.tsx
    └── public/
        └── images/
```

## Development

### Running Backend
```bash
cd backend
uvicorn server:app --reload
```

### Running Frontend
```bash
cd frontend
npm run dev
```

## Troubleshooting

### `Module not found` errors
```bash
cd frontend
npm install
```

### Python dependency errors
```bash
# Activate virtual environment first
cd backend
pip install -r requirements.txt
```

### Port already in use
Check and kill process using port 3000 or 8000:
```bash
# Windows
netstat -ano | findstr :3000

# macOS/Linux
lsof -i :3000
```
