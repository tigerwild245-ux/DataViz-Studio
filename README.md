# 📊 DataViz Studio

> **Transform Data Into Visual Stories**

A powerful Next.js application that converts data files (Excel, CSV, PDF, PowerPoint, Word, JSON) into stunning, interactive HTML presentations using Google Gemini AI.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![License](https://img.shields.io/badge/license-MIT-green)

**Live Demo**: Deploy to Vercel in 2 minutes!

---

## ✨ Features

### 🤖 AI-Powered Analysis
- **Google Gemini Integration** - Intelligent data analysis
- **Automatic Insight Generation** - Key metrics & trends
- **Smart Component Mapping** - AI selects best visualizations

### 📁 Universal File Support
- 📊 **Excel** (.xlsx, .xls) - Multi-sheet parsing
- 📄 **CSV** (.csv) - Smart delimiter detection  
- 📕 **PDF** (.pdf) - Text & table extraction
- 📊 **PowerPoint** (.pptx, .ppt) - Slide content extraction
- 📝 **Word** (.docx, .doc) - Document structure parsing
- **{ } JSON** (.json) - Nested data handling

### 🎨 12 Interactive Components
Expandable Cards • Flip Cards • Pop-out Modals • Vertical Timeline • Horizontal Roadmap • Pie Charts • Bar Charts • Line Charts • SWOT Grid • Metric Cards • Team Cards • Recommendations

### 🌈 Beautiful Themes & Palettes
**6 Themes**: Modern • Minimal • Corporate • Vibrant • Dark • Nature  
**6 Palettes**: Purple • Ocean • Sunset • Forest • Coral • Midnight

---

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/tigerwild245-ux/DataViz-Studio.git
cd DataViz-Studio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Environment Variables
```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local and add your Gemini API key
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-pro
```

**Get API Key**: https://makersuite.google.com/app/apikey

### 4. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000

---

## 🌐 Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tigerwild245-ux/DataViz-Studio)

### Manual Deploy

1. Push to GitHub (already done!)
2. Visit https://vercel.com/new
3. Import: `https://github.com/tigerwild245-ux/DataViz-Studio`
4. Add Environment Variable:
   - `GEMINI_API_KEY` = your Gemini API key
   - `GEMINI_MODEL` = `gemini-pro`
5. Click "Deploy"
6. Done! 🎉

**Full Guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 📖 How It Works

```
   📁 Upload Files
        ↓
   🔍 Server-Side Parsing
   (Excel, CSV, PDF, Word, PPT, JSON)
        ↓
   🤖 Gemini AI Analysis
   (Extract insights, metrics, patterns)
        ↓
   🎨 Generate HTML
   (Apply theme, add components)
        ↓
   📥 Download Presentation
   (Standalone HTML file)
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **AI**: Google Gemini API
- **File Parsing**: 
  - SheetJS (Excel)
  - PapaParse (CSV)
  - pdf-parse (PDF)
  - mammoth (Word)
- **Deployment**: Vercel
- **Styling**: Pure CSS (no framework needed)

---

## 📂 Project Structure

```
DataViz-Studio/
├── app/
│   └── api/                    # API Routes
│       ├── parse-file/         # File parsing endpoint
│       ├── analyze-data/       # Gemini AI analysis
│       └── generate-presentation/  # HTML generation
├── docs/
│   └── USER_GUIDE.md           # Detailed user guide
├── samples/
│   ├── sample-data.csv         # Test CSV
│   └── sample-data.json        # Test JSON
├── index.html                  # Main UI
├── app.js                      # Client logic
├── package.json                # Dependencies
├── next.config.js              # Next.js config
├── tsconfig.json               # TypeScript config
├── .env.example                # Environment template
└── DEPLOYMENT.md               # Deployment guide
```

---

## 🔐 Environment Variables

Required for Gemini AI integration:

```bash
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-pro
NODE_ENV=production
```

**On Vercel**: Add in Project Settings → Environment Variables

---

## 🎯 Use Cases

✅ **Business Reports** - Quarterly performance, sales analysis  
✅ **Data Science** - Dataset visualizations, statistical summaries  
✅ **Project Management** - Status updates, roadmaps, timelines  
✅ **Education** - Research presentations, survey results  
✅ **Marketing** - Campaign analytics, ROI reports

---

## 📝 API Documentation

### POST /api/parse-file
Parse uploaded files (multipart/form-data)

**Request:**
```javascript
const formData = new FormData();
formData.append('file', fileBlob);

fetch('/api/parse-file', {
  method: 'POST',
  body: formData
});
```

**Response:**
```json
{
  "success": true,
  "filename": "data.xlsx",
  "fileType": "excel",
  "data": { /* parsed content */ }
}
```

### POST /api/analyze-data
Analyze data with Gemini AI

**Request:**
```json
{
  "data": { /* parsed data */ },
  "customInstructions": "Focus on Q4 metrics",
  "fileType": "excel"
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "title": "Q4 Performance Report",
    "keyMetrics": [...],
    "insights": [...],
    "recommendations": [...]
  }
}
```

### POST /api/generate-presentation
Generate HTML presentation

**Request:**
```json
{
  "analyzedData": { /* AI analysis */ },
  "theme": "modern",
  "palette": "purple",
  "selectedFeatures": ["metrics", "bar-chart"]
}
```

**Response:**
```json
{
  "success": true,
  "html": "<!DOCTYPE html>...",
  "size": 85432
}
```

---

## 🧪 Testing

### In Codespaces
1. Open in GitHub Codespaces
2. Run `npm install`
3. Add `.env.local` with your Gemini API key
4. Run `npm run dev`
5. Upload `samples/sample-data.json`
6. Generate presentation

### Local Testing
```bash
npm install
cp .env.example .env.local
# Add your GEMINI_API_KEY
npm run dev
```

---

## 🐛 Troubleshooting

**Build Errors:**
- Ensure all dependencies installed: `npm install`
- Check Node.js version: node >= 18
- Verify TypeScript config: `npx tsc --noEmit`

**API Errors:**
- Verify Gemini API key is valid
- Check API key has no usage restrictions
- Monitor Gemini API quota

**File Parsing Issues:**
- Check file size (<10MB recommended)
- Verify file format is supported
- Try simpler data structure

---

## 📚 Documentation

- **User Guide**: [docs/USER_GUIDE.md](docs/USER_GUIDE.md)
- **Deployment**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Walkthrough**: See artifacts in `.gemini/` folder

---

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

MIT License - free for personal and commercial use.

---

## 🙏 Acknowledgments

- **Google Gemini** - AI-powered analysis
- **Vercel** - Seamless deployment
- **SheetJS** - Excel parsing
- **PapaParse** - CSV parsing
- **pdf-parse** - PDF extraction
- **mammoth** - Word document parsing

---

## 📧 Support

- 📖 **Documentation**: [docs/USER_GUIDE.md](docs/USER_GUIDE.md)
- 🚀 **Deployment Help**: [DEPLOYMENT.md](DEPLOYMENT.md)
- 🐛 **Issues**: https://github.com/tigerwild245-ux/DataViz-Studio/issues
- 💬 **Discussions**: https://github.com/tigerwild245-ux/DataViz-Studio/discussions

---

## 🌟 Show Your Support

If DataViz Studio helped you:
- ⭐ Star this repository
- 🔗 Share with your team
- 🐛 Report bugs
- 💡 Suggest features
- 🤝 Contribute code

---

**Made with ❤️ by the DataViz Studio Team**

*Transform your data into visual stories today!*

---

## 📊 Quick Links

- **Live Demo**: Deploy to Vercel →
- **GitHub**: https://github.com/tigerwild245-ux/DataViz-Studio
- **Get Gemini API Key**: https://makersuite.google.com/app/apikey
- **Vercel Deployment**: https://vercel.com/new

**Ready to get started?** Follow the Quick Start guide above! 🚀
