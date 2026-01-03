import { useState } from 'react';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import { AlertCircle, Loader2 } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import OptionsBar from './components/OptionsBar';
import DocumentPreview from './components/DocumentPreview';
import ResultsPanel from './components/ResultsPanel';
import { ocrService } from './services/api';
import type { OCRResponse } from './types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

function OCRApp() {
  const [selectedFeature, setSelectedFeature] = useState('document-ocr');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [language, setLanguage] = useState('eng');
  const [saveToDb, setSaveToDb] = useState(false);
  const [result, setResult] = useState<OCRResponse | null>(null);

  // Helper to safely extract error message
  const getErrorMessage = (error: any): string => {
    try {
      if (!error) return '';
      return (
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        'An error occurred during text extraction'
      );
    } catch (e) {
      return 'An unexpected error occurred';
    }
  };

  const mutation = useMutation({
    mutationFn: (params: { image: File; language: string; saveToDb: boolean }) =>
      ocrService.extractText(params),
    onSuccess: (data) => {
      console.log('OCR Success:', data);
      setResult(data);
    },
    onError: (error: any) => {
      console.error('OCR Error:', error);
      console.error('Error response:', error.response?.data);
    },
  });

  const handleExtract = () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }

    mutation.mutate({
      image: selectedFile,
      language,
      saveToDb,
    });
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setResult(null);
    mutation.reset();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar selectedFeature={selectedFeature} onFeatureSelect={setSelectedFeature} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Options Bar */}
        <OptionsBar
          language={language}
          onLanguageChange={setLanguage}
          saveToDb={saveToDb}
          onSaveToDbChange={setSaveToDb}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Document Preview */}
          <div className="flex-1">
            <DocumentPreview
              selectedFile={selectedFile}
              onFileSelect={setSelectedFile}
              onClearFile={handleClearFile}
            />
          </div>

          {/* Right: Results Panel */}
          <div className="flex-1">
            <ResultsPanel
              result={result}
              isLoading={mutation.isPending}
              error={getErrorMessage(mutation.error)}
            />
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {selectedFile && !mutation.error && (
                <>
                  <AlertCircle className="w-4 h-4" />
                  <span>Ready to extract text from {selectedFile.name}</span>
                </>
              )}
              {mutation.error && (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>Error: {getErrorMessage(mutation.error)}</span>
                </div>
              )}
            </div>
            <button
              onClick={handleExtract}
              disabled={!selectedFile || mutation.isPending}
              className="px-6 py-2.5 bg-ocean-600 text-white font-medium rounded-lg hover:bg-ocean-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {mutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {mutation.isPending ? 'Extracting...' : 'Extract Text'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <OCRApp />
    </QueryClientProvider>
  );
}
