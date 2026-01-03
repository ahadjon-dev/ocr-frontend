export interface OCRFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
  available: boolean;
}

export interface OCRRequest {
  image: File;
  language: string;
  feature: string;
  saveToDb?: boolean;
}

export interface OCRResponse {
  text: string;
  confidence?: number;
  language?: string;
  processingTime?: number;
  metadata?: {
    filename?: string;
    fileSize?: number;
    dimensions?: {
      width: number;
      height: number;
    };
  };
}

export interface ExtractionResult {
  rawText: string;
  structuredData?: any;
  confidence: number;
  processingTime: number;
  detectedLanguage?: string;
}
