import { useState } from 'react';
import { Copy, Check, Download, FileText, Clock, Languages } from 'lucide-react';
import type { OCRResponse } from '../types';

interface ResultsPanelProps {
  result: OCRResponse | null;
  isLoading: boolean;
  error: string | null;
}

export default function ResultsPanel({ result, isLoading, error }: ResultsPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (result?.text) {
      navigator.clipboard.writeText(result.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (result?.text) {
      const blob = new Blob([result.text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `extracted-text-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Extraction Results</h3>
            <p className="text-sm text-gray-500 mt-1">
              {result ? 'Text extracted successfully' : 'Results will appear here'}
            </p>
          </div>
          {result && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-ocean-600 rounded-lg hover:bg-ocean-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-ocean-200 border-t-ocean-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Processing document...</p>
              <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
            </div>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-red-600 font-medium mb-2">Extraction Failed</p>
              <p className="text-sm text-gray-600">{error}</p>
            </div>
          </div>
        ) : result ? (
          <div className="space-y-4">
            {/* Metadata */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                {result.confidence !== undefined && result.confidence !== null && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-ocean-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-ocean-600" />
                    </div>
                    <div>
                      <div className="text-gray-500">Confidence</div>
                      <div className="font-semibold text-gray-800">
                        {typeof result.confidence === 'number' 
                          ? `${result.confidence.toFixed(1)}%` 
                          : `${result.confidence}%`}
                      </div>
                    </div>
                  </div>
                )}
                {result.processingTime !== undefined && result.processingTime !== null && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-gray-500">Processing Time</div>
                      <div className="font-semibold text-gray-800">
                        {typeof result.processingTime === 'number'
                          ? `${result.processingTime.toFixed(2)}s`
                          : `${result.processingTime}s`}
                      </div>
                    </div>
                  </div>
                )}
                {result.language && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Languages className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-gray-500">Language</div>
                      <div className="font-semibold text-gray-800">{result.language}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Extracted Text */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200">
                <h4 className="font-medium text-gray-800">Extracted Text</h4>
              </div>
              <div className="p-4">
                <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700 leading-relaxed">
                  {result.text}
                </pre>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium mb-2">No results yet</p>
              <p className="text-sm text-gray-500">
                Upload a document and click "Extract Text" to see results
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
