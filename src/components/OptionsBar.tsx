import { Languages } from 'lucide-react';

interface OptionsBarProps {
  language: string;
  onLanguageChange: (language: string) => void;
  saveToDb: boolean;
  onSaveToDbChange: (save: boolean) => void;
}

const languages = [
  { code: 'eng', name: 'English', flag: '🇬🇧' },
  { code: 'uzb', name: 'Uzbek (Latin)', flag: '🇺🇿' },
  { code: 'uzb_cyrl', name: 'Uzbek (Cyrillic)', flag: '🇺🇿' },
  { code: 'rus', name: 'Russian', flag: '🇷🇺' },
  { code: 'kor', name: 'Korean', flag: '🇰🇷' },
];

export default function OptionsBar({
  language,
  onLanguageChange,
  saveToDb,
  onSaveToDbChange,
}: OptionsBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center gap-6">
        {/* Language Selector */}
        <div className="flex items-center gap-3">
          <Languages className="w-4 h-4 text-gray-500" />
          <label className="text-sm font-medium text-gray-700">Language:</label>
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Save to Database */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="save-to-db"
            checked={saveToDb}
            onChange={(e) => onSaveToDbChange(e.target.checked)}
            className="w-4 h-4 text-ocean-600 border-gray-300 rounded focus:ring-ocean-500"
          />
          <label htmlFor="save-to-db" className="text-sm text-gray-700">
            Save to database
          </label>
        </div>

        {/* Info */}
        <div className="ml-auto text-xs text-gray-500">
          Using Tesseract OCR Engine
        </div>
      </div>
    </div>
  );
}
