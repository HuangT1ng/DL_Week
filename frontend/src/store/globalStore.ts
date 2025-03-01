interface TextContent {
  text: string;
  reason: string;
  authenticity: string;
}

interface ImageContent {
  source: string;
  alt_text: string;
  reason: string;
  authenticity: string;
}

interface FactCheckData {
  text_content: TextContent[];
  images: ImageContent[];
}

export let globalFactCheckData: FactCheckData | null = null;

export const setGlobalFactCheckData = (data: FactCheckData) => {
  globalFactCheckData = data;
}; 