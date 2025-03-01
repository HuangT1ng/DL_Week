from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import torch
from PIL import Image
import numpy as np
from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection
from transformers import Blip2Processor, Blip2ForConditionalGeneration
import io
import clip

app = FastAPI()

# Connect to Milvus vector database
connections.connect("default", host="localhost", port="19530")

# Define Milvus collection schema
fields = [
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True),
    FieldSchema(name="image_embedding", dtype=DataType.FLOAT_VECTOR, dim=512),
    FieldSchema(name="authenticity", dtype=DataType.VARCHAR, max_length=50),
    FieldSchema(name="probability", dtype=DataType.FLOAT),
    FieldSchema(name="reason", dtype=DataType.VARCHAR, max_length=1000),
    FieldSchema(name="caption", dtype=DataType.VARCHAR, max_length=1000),
]
schema = CollectionSchema(fields, "Image Analysis Cache")
collection = Collection("image_analysis", schema)

# Create index for efficient similarity search
index_params = {
    "index_type": "IVF_FLAT",
    "metric_type": "COSINE",
    "params": {"nlist": 128},
}
collection.create_index("image_embedding", index_params)

# Load CLIP model for image embeddings
device = "cuda" if torch.cuda.is_available() else "cpu"
clip_model, clip_preprocess = clip.load("ViT-B/32", device=device)

# Load BLIP-2 for multimodal analysis
processor = Blip2Processor.from_pretrained("Salesforce/blip2-opt-2.7b")
blip_model = Blip2ForConditionalGeneration.from_pretrained("Salesforce/blip2-opt-2.7b").to(device)

# Mock classifier (replace with real model in production)
class MockClassifier:
    def __call__(self, image):
        # Simulate AI detection probability
        return np.random.rand()

mock_classifier = MockClassifier()

def generate_embedding(image):
    """Generate CLIP embedding for an image"""
    image = clip_preprocess(image).unsqueeze(0).to(device)
    with torch.no_grad():
        embedding = clip_model.encode_image(image)
    return embedding.cpu().numpy().flatten()

@app.post("/api/analyze")
async def analyze_image(file: UploadFile = File(...)):
    try:
        # Load and preprocess image
        image = Image.open(io.BytesIO(await file.read())).convert("RGB")
        
        # Generate image embedding
        embedding = generate_embedding(image)
        
        # Check cache using similarity search
        search_params = {"metric_type": "COSINE", "params": {"nprobe": 10}}
        results = collection.search([embedding], "image_embedding", search_params, limit=1)
        
        if results[0].distances and results[0].distances[0] > 0.95:
            # Cache hit: return stored analysis
            hit = collection.query(
                expr=f"id == {results[0].ids[0]}",
                output_fields=["authenticity", "probability", "reason", "caption"]
            )[0]
            return JSONResponse({
                "authenticity": hit["authenticity"],
                "probability": hit["probability"],
                "reason": hit["reason"],
                "caption": hit["caption"]
            })
        
        # Cache miss: perform new analysis
        # 1. Classify authenticity
        prob_ai = mock_classifier(image)
        authenticity = "Likely AI-Generated" if prob_ai > 0.5 else "Likely Real"
        
        # 2. Generate caption
        inputs = processor(image, return_tensors="pt").to(device)
        caption_ids = blip_model.generate(**inputs)
        caption = processor.decode(caption_ids[0], skip_special_tokens=True)
        
        # 3. Generate explanation
        prompt = f"Explain why this image is {'AI-generated' if prob_ai > 0.5 else 'real'}."
        inputs = processor(image, text=prompt, return_tensors="pt").to(device)
        reason_ids = blip_model.generate(**inputs, max_new_tokens=100)
        reason = processor.decode(reason_ids[0], skip_special_tokens=True)
        
        # Store analysis in vector database
        collection.insert([
            [embedding],
            [authenticity],
            [prob_ai],
            [reason],
            [caption]
        ])
        
        return JSONResponse({
            "authenticity": authenticity,
            "probability": prob_ai,
            "reason": reason,
            "caption": caption
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)