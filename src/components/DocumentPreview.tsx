import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileImage, File } from 'lucide-react';

interface DocumentPreviewProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClearFile: () => void;
}

export default function DocumentPreview({
  onFileSelect,
  selectedFile,
  onClearFile,
}: DocumentPreviewProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onFileSelect(file);

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleClear = () => {
    setPreview(null);
    onClearFile();
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 border-r border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Document Preview</h3>
        <p className="text-sm text-gray-500 mt-1">Upload your document to begin</p>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-6 overflow-auto">
        {!selectedFile ? (
          <div
            {...getRootProps()}
            className={`
              h-full min-h-[400px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all
              ${
                isDragActive
                  ? 'border-ocean-500 bg-ocean-50'
                  : 'border-gray-300 bg-white hover:border-ocean-400 hover:bg-ocean-50/30'
              }
            `}
          >
            <input {...getInputProps()} />
            <Upload className={`w-16 h-16 mb-4 ${isDragActive ? 'text-ocean-500' : 'text-gray-400'}`} />
            <p className="text-lg font-medium text-gray-700 mb-2">
              {isDragActive ? 'Drop your document here' : 'Upload a document'}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Drag and drop or click to browse
            </p>
            <div className="flex gap-2 text-xs text-gray-400">
              <span className="px-2 py-1 bg-gray-100 rounded">PNG</span>
              <span className="px-2 py-1 bg-gray-100 rounded">JPG</span>
              <span className="px-2 py-1 bg-gray-100 rounded">PDF</span>
              <span className="px-2 py-1 bg-gray-100 rounded">TIFF</span>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            {/* File Info */}
            <div className="flex items-center justify-between mb-4 p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                {selectedFile.type.startsWith('image/') ? (
                  <FileImage className="w-8 h-8 text-ocean-500" />
                ) : (
                  <File className="w-8 h-8 text-ocean-500" />
                )}
                <div>
                  <div className="font-medium text-gray-800">{selectedFile.name}</div>
                  <div className="text-sm text-gray-500">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </div>
                </div>
              </div>
              <button
                onClick={handleClear}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Preview */}
            {preview && selectedFile.type.startsWith('image/') && (
              <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center p-4">
                <img
                  src={preview}
                  alt="Document preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}

            {/* PDF Preview Placeholder */}
            {selectedFile.type === 'application/pdf' && (
              <div className="flex-1 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <File className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">PDF Document</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedFile.name}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
