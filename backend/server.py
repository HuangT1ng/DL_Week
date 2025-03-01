from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ArticleContent(BaseModel):
    text: str
    images: List[str]

class FlaggedContent(BaseModel):
    text: str
    reason: str
    credibility: int

class Image(BaseModel):
    src: str
    alt: Optional[str] = ""

class ScrapedContent(BaseModel):
    text: str
    images: List[Image]

@app.get("/")
def read_root():
    return {"Hello": "World"}

# Add your misinformation detection endpoints here
@app.post("/api/analyze-content")
async def analyze_content(content: ArticleContent):
    try:
        # Process the text content
        # This is where you'd add your text analysis logic
        flagged_items = [
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

        # Process the images
        # Add image analysis logic here
        
        return {
            "flagged_content": flagged_items,
            "processed_images": len(content.images)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/scrape")
async def scrape_content(content: ScrapedContent):
    # Create a formatted JSON response
    formatted_content = {
        "text_content": content.text,
        "images": [
            {
                "source": img.src,
                "alt_text": img.alt
            } for img in content.images
        ]
    }
    
    # Print the formatted JSON to the terminal
    print("\n=== Scraped Content ===")
    print(json.dumps(formatted_content, indent=2))
    print("=====================\n")
    
    return {"status": "success", "message": "Content received and logged"}