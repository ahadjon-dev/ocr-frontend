import { FileText, FileSearch, FileCheck, Layers, Settings, HelpCircle } from 'lucide-react';
import type { OCRFeature } from '../types';

interface SidebarProps {
  selectedFeature: string;
  onFeatureSelect: (featureId: string) => void;
}

const features: OCRFeature[] = [
  {
    id: 'document-ocr',
    name: 'Document OCR',
    description: 'Extract text from images and documents',
    icon: 'FileText',
    available: true,
  },
  {
    id: 'document-parsing',
    name: 'Document Parsing',
    description: 'Extract structured data from documents',
    icon: 'FileSearch',
    available: false,
  },
  {
    id: 'document-classification',
    name: 'Classification',
    description: 'Classify document types automatically',
    icon: 'FileCheck',
    available: false,
  },
  {
    id: 'universal-extraction',
    name: 'Universal Extraction',
    description: 'Custom extraction with AI',
    icon: 'Layers',
    available: false,
  },
];

const iconMap = {
  FileText,
  FileSearch,
  FileCheck,
  Layers,
};

export default function Sidebar({ selectedFeature, onFeatureSelect }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-ocean-600">Fergani OCR</h1>
        <p className="text-sm text-gray-500 mt-1">Uzbek Language Document Processing</p>
      </div>

      {/* Features */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Features
        </div>
        {features.map((feature) => {
          const Icon = iconMap[feature.icon as keyof typeof iconMap];
          const isSelected = selectedFeature === feature.id;
          const isDisabled = !feature.available;

          return (
            <button
              key={feature.id}
              onClick={() => !isDisabled && onFeatureSelect(feature.id)}
              disabled={isDisabled}
              className={`
                w-full flex items-start gap-3 p-3 rounded-lg transition-all
                ${
                  isSelected
                    ? 'bg-ocean-50 text-ocean-700 border border-ocean-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1 text-left">
                <div className="font-medium text-sm">{feature.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {feature.description}
                </div>
                {isDisabled && (
                  <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    Coming Soon
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button className="w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
          <HelpCircle className="w-4 h-4" />
          Help & Docs
        </button>
      </div>
    </div>
  );
}
