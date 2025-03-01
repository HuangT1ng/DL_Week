from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

# Add your misinformation detection endpoints here
@app.post("/api/analyze-text")
async def analyze_text(text: str):
    # Add your text analysis logic here
    return {
        "flagged_content": [
            {
                "text": "coffee causes superhuman abilities",
                "reason": "Exaggerated claim with no scientific basis",
                "credibility": 20,
            },
            {
                "text": "drinking 10 cups a day increases IQ by 50%",
                "reason": "No peer-reviewed studies support this claim",
                "credibility": 15,
            }
        ]
    }