from typing import List, Dict, Any
from pydantic import BaseModel
from nlp_utils import *
import json

class TextContent(BaseModel):
    text: str
    reason: str
    authenticity: str

def process_text(text_content: str) -> List[Dict[str, str]]:
    """
    Process the text content and return identified misinformation.
    This is a placeholder function that will be replaced with actual logic later.
    
    Args:
        text_content: The text content to analyze
        
    Returns:
        A list of dictionaries containing identified text segments with their
        authenticity assessment and reasoning.
    """
    top_k_sources = search_top_k_sources(text_content, 5)

    trusted_sources = []
    for sources in top_k_sources:
        trusted_source = get_website_text_content(sources)
        trusted_sources.append(trusted_source)
    
    sentences = break_into_sentences(text_content)

    client = api_init()
    analysis_result = cross_validation_with_LLM(sentences, trusted_sources, client, prompt)
    misinformation = []
    
    for result in analysis_result:
        try:
            # Parse the JSON string into a list of dictionaries
            parsed_result = json.loads(result)
            
            # Convert each item in the parsed result to TextContent
            for item in parsed_result:
                content = TextContent(
                    text=item["text"],
                    reason=item["reason"],
                    authenticity=item["authenticity"]
                )
                misinformation.append(content)
                
        except json.JSONDecodeError as e:
            print(f"Error parsing JSON result: {e}")
            continue
    
    # Return the list of dictionaries
    return [{"text": item.text, "reason": item.reason, "authenticity": item.authenticity} 
            for item in misinformation]