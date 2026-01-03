# Fergana OCR - Frontend

Modern React TypeScript frontend for the Fergana OCR Platform - specialized in Uzbek document processing.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC)

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Tech Stack

- **React 18+** with TypeScript
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Query** - Server state management
- **Axios** - HTTP client
- **React Dropzone** - File uploads
- **Lucide React** - Beautiful icons

## 📋 Features

- ✅ **Document OCR** - Extract text from images and PDFs using Tesseract
- ⏳ **Document Parsing** - Extract structured data (Coming Soon)
- ⏳ **Classification** - Auto-detect document types (Coming Soon)
- ⏳ **Universal Extraction** - AI-powered custom extraction (Coming Soon)

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Then update the values:

```env
# For local development
VITE_API_URL=http://localhost:8001

# For production (Railway backend)
VITE_API_URL=https://web-production-8677.up.railway.app
```

## 🌐 Supported Languages

- 🇬🇧 English (eng)
- 🇺🇿 Uzbek Latin (uzb)
- 🇺🇿 Uzbek Cyrillic (uzb_cyrl)
- 🇷🇺 Russian (rus)
- 🇰🇷 Korean (kor)

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/        # React components
│   │   ├── Sidebar.tsx           # Left navigation
│   │   ├── Navbar.tsx            # Top navigation
│   │   ├── OptionsBar.tsx        # Language & settings
│   │   ├── DocumentPreview.tsx   # File upload & preview
│   │   ├── ResultsPanel.tsx      # Extraction results
│   │   └── ErrorBoundary.tsx     # Error handling
│   ├── services/          # API services
│   │   └── api.ts                # OCR service with axios
│   ├── types/             # TypeScript types
│   │   └── index.ts              # Type definitions
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles (Tailwind)
├── .env                   # Environment variables (not in git)
├── .env.example           # Example environment variables
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── package.json           # Dependencies
```

## 🔌 API Integration

The frontend connects to the Django REST API backend.

### Endpoints

- **Images**: `POST /api/v1/ocr/extract/`
- **PDFs**: `POST /api/v1/ocr/multi-format/extract/`
- **Health**: `GET /api/v1/ocr/health/`
- **Languages**: `GET /api/v1/ocr/languages/`

### Request Format

```typescript
FormData {
  image: File,              // or 'file' for PDFs
  language: string,         // eng, uzb, uzb_cyrl, rus, kor
  save_to_db: boolean       // optional
}
```

### Response Format

```json
{
  "text": "Extracted text...",
  "confidence": 95.5,
  "language": "eng",
  "processingTime": 1.23
}
```

## 🚀 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Environment Variables for Production

Set these in your hosting platform:

```
VITE_API_URL=https://web-production-8677.up.railway.app
```

## 🎨 UI Features

- **Drag & Drop Upload** - Easy file upload interface
- **Real-time Preview** - See your document before processing
- **Loading States** - Smooth animations during processing
- **Error Handling** - User-friendly error messages
- **Responsive Design** - Works on all screen sizes
- **Copy & Download** - Easy result management

## 🧪 Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Hot Module Reload

Vite provides instant HMR - your changes appear immediately without page refresh.

### Type Checking

```bash
npx tsc --noEmit
```

### Linting

```bash
npm run lint
```

## 📝 License

Part of the Fergana OCR Platform

## 🔗 Links

- **Backend Repository**: [fergani-ocr](https://github.com/ahadjon-dev/fergani-ocr)
- **Live Backend**: https://web-production-8677.up.railway.app
- **Documentation**: See `TECHNICAL_SPEC.md` in backend repo

## 🤝 Contributing

This is part of a larger Uzbek document processing platform. Contributions are welcome!

## 📧 Contact

For questions or support, please open an issue in the repository.
