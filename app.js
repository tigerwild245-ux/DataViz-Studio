// DataViz Studio - Main Application Logic
// ===========================================

// State Management
const AppState = {
    files: [],
    selectedFeatures: new Set(),
    selectedTheme: 'modern',
    selectedPalette: 'purple',
    customInstructions: '',
    extractedData: null
};

// Feature definitions
const FEATURES = [
    { id: 'expandable', name: 'Expandable Cards', icon: '📋', description: 'Click-to-reveal accordion sections' },
    { id: 'flip', name: 'Flip Cards', icon: '🔄', description: '3D CSS flip animation cards' },
    { id: 'popout', name: 'Pop-out Cards', icon: '🪟', description: 'Modal overlay on click' },
    { id: 'timeline-vertical', name: 'Timeline (Vertical)', icon: '📍', description: 'Vertical milestones view' },
    { id: 'timeline-horizontal', name: 'Timeline (Horizontal)', icon: '📊', description: 'Horizontal roadmap view' },
    { id: 'pie', name: 'Pie Charts', icon: '🥧', description: 'CSS conic-gradient based' },
    { id: 'bar', name: 'Bar Charts', icon: '📊', description: 'Flexbox-based stacked bars' },
    { id: 'line', name: 'Line Charts', icon: '📈', description: 'SVG-based trend lines' },
    { id: 'swot', name: 'SWOT Grid', icon: '🎯', description: '4-quadrant analysis layout' },
    { id: 'metrics', name: 'Metric Cards', icon: '💯', description: 'Big number KPI cards' },
    { id: 'team', name: 'Team Cards', icon: '👥', description: 'People/member cards' },
    { id: 'recommendations', name: 'Recommendations', icon: '💡', description: 'Priority badge cards' }
];

// DOM Elements
const elements = {
    uploadZone: document.getElementById('uploadZone'),
    fileInput: document.getElementById('fileInput'),
    fileList: document.getElementById('fileList'),
    customInstructions: document.getElementById('customInstructions'),
    charCount: document.getElementById('charCount'),
    featureGrid: document.getElementById('featureGrid'),
    themeGrid: document.getElementById('themeGrid'),
    paletteGrid: document.getElementById('paletteGrid'),
    generateBtn: document.getElementById('generateBtn'),
    processingOverlay: document.getElementById('processingOverlay'),
    processingStage: document.getElementById('processingStage'),
    processingMessage: document.getElementById('processingMessage'),
    progressFill: document.getElementById('progressFill')
};

// Initialize Application
function init() {
    setupEventListeners();
    renderFeatures();
    // Select all features by default
    FEATURES.forEach(feature => AppState.selectedFeatures.add(feature.id));
    updateFeatureUI();
}

// Setup Event Listeners
function setupEventListeners() {
    // File upload
    elements.uploadZone.addEventListener('click', () => elements.fileInput.click());
    elements.fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop
    elements.uploadZone.addEventListener('dragover', handleDragOver);
    elements.uploadZone.addEventListener('dragleave', handleDragLeave);
    elements.uploadZone.addEventListener('drop', handleDrop);
    
    // Custom instructions
    elements.customInstructions.addEventListener('input', handleInstructionsChange);
    
    // Theme selection
    elements.themeGrid.addEventListener('click', handleThemeSelect);
    
    // Palette selection
    elements.paletteGrid.addEventListener('click', handlePaletteSelect);
    
    // Generate button
    elements.generateBtn.addEventListener('click', handleGenerate);
}

// Render Feature Cards
function renderFeatures() {
    elements.featureGrid.innerHTML = FEATURES.map(feature => `
        <div class="feature-card selected" data-feature="${feature.id}">
            <div class="feature-header">
                <input type="checkbox" checked data-feature-checkbox="${feature.id}">
                <span class="feature-icon">${feature.icon}</span>
                <span class="feature-name">${feature.name}</span>
            </div>
            <p class="feature-description">${feature.description}</p>
        </div>
    `).join('');
    
    // Add click handlers
    elements.featureGrid.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'INPUT') {
                const checkbox = card.querySelector('input[type="checkbox"]');
                checkbox.checked = !checkbox.checked;
            }
            handleFeatureToggle(card);
        });
    });
}

// Handle Feature Toggle
function handleFeatureToggle(card) {
    const featureId = card.dataset.feature;
    const checkbox = card.querySelector('input[type="checkbox"]');
    
    if (checkbox.checked) {
        AppState.selectedFeatures.add(featureId);
        card.classList.add('selected');
    } else {
        AppState.selectedFeatures.delete(featureId);
        card.classList.remove('selected');
    }
}

function updateFeatureUI() {
    elements.featureGrid.querySelectorAll('.feature-card').forEach(card => {
        const featureId = card.dataset.feature;
        const checkbox = card.querySelector('input[type="checkbox"]');
        if (AppState.selectedFeatures.has(featureId)) {
            checkbox.checked = true;
            card.classList.add('selected');
        }
    });
}

// File Handling
function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    addFiles(files);
}

function handleDragOver(event) {
    event.preventDefault();
    elements.uploadZone.classList.add('dragover');
}

function handleDragLeave(event) {
    event.preventDefault();
    elements.uploadZone.classList.remove('dragover');
}

function handleDrop(event) {
    event.preventDefault();
    elements.uploadZone.classList.remove('dragover');
    const files = Array.from(event.dataTransfer.files);
    addFiles(files);
}

function addFiles(newFiles) {
    // Filter valid file types
    const validExtensions = ['.xlsx', '.xls', '.csv', '.pdf', '.pptx', '.ppt', '.docx', '.doc', '.json'];
    const validFiles = newFiles.filter(file => {
        const ext = '.' + file.name.split('.').pop().toLowerCase();
        return validExtensions.includes(ext);
    });
    
    AppState.files = [...AppState.files, ...validFiles];
    renderFileList();
    updateGenerateButton();
}

function removeFile(index) {
    AppState.files.splice(index, 1);
    renderFileList();
    updateGenerateButton();
}

function renderFileList() {
    if (AppState.files.length === 0) {
        elements.fileList.classList.remove('has-files');
        elements.fileList.innerHTML = '';
        return;
    }
    
    elements.fileList.classList.add('has-files');
    elements.fileList.innerHTML = AppState.files.map((file, index) => {
        const icon = getFileIcon(file.name);
        const size = formatFileSize(file.size);
        
        return `
            <div class="file-item">
                <div class="file-info">
                    <span class="file-icon">${icon}</span>
                    <div class="file-details">
                        <div class="file-name">${file.name}</div>
                        <div class="file-size">${size}</div>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFile(${index})">Remove</button>
            </div>
        `;
    }).join('');
}

function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const icons = {
        'xlsx': '📊', 'xls': '📊',
        'csv': '📄',
        'pdf': '📕',
        'pptx': '📊', 'ppt': '📊',
        'docx': '📝', 'doc': '📝',
        'json': '{ }'
    };
    return icons[ext] || '📄';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Handle Instructions Change
function handleInstructionsChange(event) {
    AppState.customInstructions = event.target.value;
    elements.charCount.textContent = event.target.value.length;
}

// Handle Theme Selection
function handleThemeSelect(event) {
    const themeCard = event.target.closest('.theme-card');
    if (!themeCard) return;
    
    elements.themeGrid.querySelectorAll('.theme-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    themeCard.classList.add('selected');
    AppState.selectedTheme = themeCard.dataset.theme;
}

// Handle Palette Selection
function handlePaletteSelect(event) {
    const paletteCard = event.target.closest('.palette-card');
    if (!paletteCard) return;
    
    elements.paletteGrid.querySelectorAll('.palette-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    paletteCard.classList.add('selected');
    AppState.selectedPalette = paletteCard.dataset.palette;
}

// Update Generate Button State
function updateGenerateButton() {
    elements.generateBtn.disabled = AppState.files.length === 0;
}

// Handle Generate Presentation
async function handleGenerate() {
    try {
        showProcessing('Analyzing Files...', 0);
        
        // Parse all files
        await parseFiles();
        updateProgress(30, 'Extracting Data...', 'Processing your uploaded files');
        
        // Simulate AI analysis (in production, this would call Gemini API)
        await simulateAIAnalysis();
        updateProgress(60, 'Generating Components...', 'Creating visual elements');
        
        // Generate HTML
        await generatePresentation();
        updateProgress(90, 'Finalizing...', 'Almost ready');
        
        await new Promise(resolve => setTimeout(resolve, 500));
        updateProgress(100, 'Complete!', 'Your presentation is ready');
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        hideProcessing();
        
    } catch (error) {
        console.error('Generation error:', error);
        hideProcessing();
        alert('An error occurred while generating the presentation. Please try again.');
    }
}

// Parse Files
async function parseFiles() {
    const parsedData = [];
    
    for (const file of AppState.files) {
        const ext = file.name.split('.').pop().toLowerCase();
        
        try {
            if (ext === 'xlsx' || ext === 'xls') {
                const data = await parseExcel(file);
                parsedData.push({ type: 'excel', data, filename: file.name });
            } else if (ext === 'csv') {
                const data = await parseCSV(file);
                parsedData.push({ type: 'csv', data, filename: file.name });
            } else if (ext === 'json') {
                const data = await parseJSON(file);
                parsedData.push({ type: 'json', data, filename: file.name });
            } else {
                // For PDF, Word, PowerPoint - show placeholder
                parsedData.push({ 
                    type: ext, 
                    data: { message: 'File uploaded successfully. Full parsing requires server-side processing.' },
                    filename: file.name 
                });
            }
        } catch (error) {
            console.error(`Error parsing ${file.name}:`, error);
        }
    }
    
    AppState.extractedData = parsedData;
    return parsedData;
}

// Parse Excel File
function parseExcel(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                
                const result = {};
                workbook.SheetNames.forEach(sheetName => {
                    const worksheet = workbook.Sheets[sheetName];
                    result[sheetName] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                });
                
                resolve(result);
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

// Parse CSV File
function parseCSV(file) {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            complete: (results) => resolve(results.data),
            error: reject,
            header: false,
            skipEmptyLines: true
        });
    });
}

// Parse JSON File
function parseJSON(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const json = JSON.parse(e.target.result);
                resolve(json);
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = reject;
        reader.readAsText(file);
    });
}

// Simulate AI Analysis
async function simulateAIAnalysis() {
    // In production, this would call the Gemini API
    // For now, we'll create sample analyzed data
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    AppState.analyzedData = {
        title: 'Data Analysis Report',
        subtitle: 'Generated by DataViz Studio',
        summary: 'Comprehensive analysis of your data with key insights and visualizations.',
        metrics: [
            { label: 'Total Records', value: '12.5K', trend: 'up' },
            { label: 'Categories', value: '8', trend: 'neutral' },
            { label: 'Completion Rate', value: '94%', trend: 'up' },
            { label: 'Active Items', value: '156', trend: 'down' }
        ],
        insights: [
            'Strong performance across all metrics',
            'Steady growth in key areas',
            'Opportunities for optimization identified'
        ]
    };
}

// Generate Presentation HTML
async function generatePresentation() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const html = createPresentationHTML();
    downloadHTML(html, 'DataViz-Presentation.html');
}

// Create Presentation HTML
function createPresentationHTML() {
    const { title, subtitle, metrics, insights } = AppState.analyzedData || {};
    const theme = AppState.selectedTheme;
    const palette = AppState.selectedPalette;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title || 'Data Presentation'}</title>
    <style>
        ${generatePresentationCSS(theme, palette)}
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>${title || 'Data Analysis Presentation'}</h1>
            <p class="subtitle">${subtitle || 'Generated by DataViz Studio'}</p>
            <p class="date">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        
        <!-- Navigation -->
        <div class="navigation">
            <button class="nav-btn active" onclick="showSlide(0)">📊 Overview</button>
            <button class="nav-btn" onclick="showSlide(1)">📈 Metrics</button>
            <button class="nav-btn" onclick="showSlide(2)">💡 Insights</button>
        </div>
        
        <!-- Slide 1: Overview -->
        <div class="slide active" id="slide-0">
            <h2 class="slide-title">Executive Summary</h2>
            ${generateMetricsGrid(metrics)}
        </div>
        
        <!-- Slide 2: Detailed Metrics -->
        <div class="slide" id="slide-1">
            <h2 class="slide-title">Detailed Analysis</h2>
            ${generateDetailedMetrics()}
        </div>
        
        <!-- Slide 3: Insights -->
        <div class="slide" id="slide-2">
            <h2 class="slide-title">Key Insights</h2>
            ${generateInsightsSection(insights)}
        </div>
        
        <!-- Control Panel -->
        <div class="control-panel">
            <button class="control-btn" onclick="prevSlide()">◀ Prev</button>
            <button class="control-btn" onclick="nextSlide()">Next ▶</button>
            <button class="control-btn" onclick="window.print()">🖨 Print</button>
        </div>
    </div>
    
    <script>
        ${generatePresentationJS()}
    </script>
</body>
</html>`;
}

// Generate Presentation CSS
function generatePresentationCSS(theme, palette) {
    // Include all the CSS from the specification
    return `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 1.1rem;
            line-height: 1.6;
            background: ${getThemeBackground(theme)};
            color: #343A40;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 50px;
            color: white;
        }
        
        .header h1 {
            font-size: 3rem;
            margin-bottom: 15px;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        
        .subtitle {
            font-size: 1.3rem;
            opacity: 0.9;
        }
        
        .date {
            font-size: 1rem;
            opacity: 0.8;
            margin-top: 10px;
        }
        
        .navigation {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-bottom: 40px;
            flex-wrap: wrap;
        }
        
        .nav-btn {
            background: rgba(255, 255, 255, 0.9);
            border: 2px solid transparent;
            padding: 12px 25px;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #343A40;
        }
        
        .nav-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
        
        .nav-btn.active {
            background: ${getPaletteColor(palette)};
            color: white;
            border-color: white;
        }
        
        .slide {
            display: none;
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            animation: slideIn 0.5s ease;
        }
        
        .slide.active {
            display: block;
        }
        
        .slide-title {
            font-size: 2rem;
            color: ${getPaletteColor(palette)};
            margin-bottom: 30px;
            border-bottom: 3px solid ${getPaletteColor(palette)};
            padding-bottom: 15px;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        
        .metric-card {
            background: linear-gradient(135deg, ${getPaletteColor(palette)} 0%, ${getPaletteSecondary(palette)} 100%);
            color: white;
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }
        
        .metric-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }
        
        .metric-value {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .metric-label {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        .insights-list {
            list-style: none;
            padding: 0;
        }
        
        .insight-item {
            background: #f5f7fa;
            padding: 20px;
            margin-bottom: 15px;
            border-radius: 12px;
            border-left: 5px solid ${getPaletteColor(palette)};
            font-size: 1.1rem;
        }
        
        .control-panel {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 10px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .control-btn {
            background: ${getPaletteColor(palette)};
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        }
        
        .control-btn:hover {
            background: ${getPaletteSecondary(palette)};
            transform: scale(1.05);
        }
        
        @media (max-width: 768px) {
            .header h1 { font-size: 2rem; }
            .metrics-grid { grid-template-columns: 1fr; }
            .control-panel {
                bottom: 10px;
                right: 10px;
                left: 10px;
                flex-direction: row;
                justify-content: center;
            }
        }
        
        @media print {
            .control-panel, .navigation { display: none !important; }
            .slide { display: block !important; page-break-after: always; }
        }
    `;
}

// Generate Presentation JavaScript
function generatePresentationJS() {
    return `
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const navBtns = document.querySelectorAll('.nav-btn');
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            navBtns.forEach(btn => btn.classList.remove('active'));
            
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            navBtns[currentSlide].classList.add('active');
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        function nextSlide() {
            if (currentSlide < slides.length - 1) {
                showSlide(currentSlide + 1);
            }
        }
        
        function prevSlide() {
            if (currentSlide > 0) {
                showSlide(currentSlide - 1);
            }
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            }
        });
    `;
}

// Helper Functions for Theme/Palette
function getThemeBackground(theme) {
    const backgrounds = {
        modern: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minimal: 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)',
        corporate: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        vibrant: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        dark: 'linear-gradient(135deg, #0f2027 0%, #203a43 0%, #2c5364 100%)',
        nature: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)'
    };
    return backgrounds[theme] || backgrounds.modern;
}

function getPaletteColor(palette) {
    const colors = {
        purple: '#6A4C93',
        ocean: '#2C8B8B',
        sunset: '#FF6B9D',
        forest: '#134E5E',
        coral: '#FF6B6B',
        midnight: '#2C3E50'
    };
    return colors[palette] || colors.purple;
}

function getPaletteSecondary(palette) {
    const colors = {
        purple: '#9370DB',
        ocean: '#48C9B0',
        sunset: '#FFA07A',
        forest: '#71B280',
        coral: '#FF8C8C',
        midnight: '#34495E'
    };
    return colors[palette] || colors.purple;
}

// Generate Metrics Grid
function generateMetricsGrid(metrics) {
    if (!metrics || metrics.length === 0) {
        metrics = [
            { label: 'Total Items', value: '1,234' },
            { label: 'Categories', value: '12' },
            { label: 'Status', value: '98%' },
            { label: 'Active', value: '456' }
        ];
    }
    
    return `
        <div class="metrics-grid">
            ${metrics.map(metric => `
                <div class="metric-card">
                    <div class="metric-value">${metric.value}</div>
                    <div class="metric-label">${metric.label}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// Generate Detailed Metrics
function generateDetailedMetrics() {
    return `
        <p style="font-size: 1.1rem; margin-bottom: 30px;">
            Detailed breakdown of your data with comprehensive metrics and visualizations.
        </p>
        ${generateMetricsGrid([
            { label: 'Revenue', value: '$2.4M' },
            { label: 'Growth', value: '+24%' },
            { label: 'Customers', value: '8,523' },
            { label: 'Retention', value: '92%' },
            { label: 'NPS Score', value: '78' },
            { label: 'Churn Rate', value: '2.1%' }
        ])}
    `;
}

// Generate Insights Section
function generateInsightsSection(insights) {
    if (!insights || insights.length === 0) {
        insights = [
            'Data shows strong positive trends across key performance indicators',
            'Opportunities identified for growth in emerging market segments',
            'Recommended focus areas include customer retention and product expansion'
        ];
    }
    
    return `
        <ul class="insights-list">
            ${insights.map(insight => `
                <li class="insight-item">💡 ${insight}</li>
            `).join('')}
        </ul>
    `;
}

// Download HTML
function downloadHTML(htmlContent, filename) {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Processing Overlay Functions
function showProcessing(stage, progress) {
    elements.processingOverlay.classList.add('active');
    updateProgress(progress, stage);
}

function hideProcessing() {
    elements.processingOverlay.classList.remove('active');
}

function updateProgress(percent, stage, message = '') {
    elements.progressFill.style.width = percent + '%';
    elements.processingStage.textContent = stage;
    if (message) {
        elements.processingMessage.textContent = message;
    }
}

// Make removeFile globally accessible
window.removeFile = removeFile;

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
