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

# New models for the text processing pipeline
class TextContent(BaseModel):
    text: str
    reason: str
    authenticity: str

class ImageContent(BaseModel):
    source: str
    alt_text: str
    reason: str
    authenticity: str

class ProcessedContent(BaseModel):
    text_content: List[TextContent]
    images: List[ImageContent]

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
    
    # NEW: Return processed content instead of just a success message
    # This simulates a text processing pipeline without changing your existing code structure
    processed_content = ProcessedContent(
        text_content=[
            TextContent(
                text="Eric Trump and Donald Trump Jr. were reportedly panicking Thursday after getting their tongues stuck to a frozen column near the West Wing of the White House.",
                reason="This is satirical content with no factual basis. It originates from a satirical source and should not be interpreted as real news.",
                authenticity="Satire / Fake News"
            ),
            TextContent(
                text="We're going to die out here! We're going to thtarve to death!",
                reason="This is an exaggerated and fabricated speech, likely intended for humor or satire rather than factual reporting.",
                authenticity="Exaggerated / Misleading"
            )
        ],
        images=[
            ImageContent(
                source="/images/trump-boys.jpg",
                alt_text="Trump Boys at White House",
                reason="AI detected this as a digitally manipulated satirical image. It has been altered to fit a humorous or fictional narrative.",
                authenticity="Digitally Manipulated / Satirical Image"
            ),
            ImageContent(
                source="/images/eric-adams.jpg",
                alt_text="Political Profile: Eric Adams",
                reason="AI detected this as a mismatched image. The image displayed is kevin hart.",
                authenticity="Mismatched Image"
            )
        ]
    )
    
    return processed_content