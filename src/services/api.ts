import axios from 'axios';
import type { OCRResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // Don't set Content-Type for FormData - let browser set it with boundary
});

export interface ExtractTextParams {
  image: File;
  language: string;
  saveToDb?: boolean;
}

export const ocrService = {
  /**
   * Extract text from an image or PDF using Tesseract OCR
   */
  extractText: async (params: ExtractTextParams): Promise<OCRResponse> => {
    const formData = new FormData();
    
    // Use different endpoint and field name for PDFs
    const isPDF = params.image.type === 'application/pdf';
    const endpoint = isPDF ? '/api/v1/ocr/multi-format/extract/' : '/api/v1/ocr/extract/';
    const fieldName = isPDF ? 'file' : 'image';
    
    formData.append(fieldName, params.image);
    formData.append('language', params.language);
    if (params.saveToDb !== undefined) {
      formData.append('save_to_db', params.saveToDb.toString());
    }

    console.log('Sending OCR request:', {
      filename: params.image.name,
      type: params.image.type,
      size: params.image.size,
      language: params.language,
      saveToDb: params.saveToDb,
      endpoint,
      fieldName
    });

    try {
      const response = await apiClient.post<OCRResponse>(endpoint, formData);
      console.log('OCR response received:', response.data);
      
      // Backend returns {image: {text, confidence, ...}} for PDFs
      const data: any = response.data;
      if (data.image) {
        return data.image;
      }
      
      return response.data;
    } catch (error: any) {
      console.error('OCR request failed:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw error;
    }
  },

  /**
   * Health check for OCR service
   */
  healthCheck: async (): Promise<{ status: string; available: boolean }> => {
    const response = await apiClient.get('/api/v1/ocr/health/');
    return response.data;
  },

  /**
   * Get supported languages
   */
  getSupportedLanguages: async (): Promise<{ languages: string[] }> => {
    const response = await apiClient.get('/api/v1/ocr/languages/');
    return response.data;
  },
};

export default apiClient;
