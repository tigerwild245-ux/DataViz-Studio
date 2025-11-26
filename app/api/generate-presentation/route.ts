// API Route: Generate complete HTML presentation
// Creates standalone HTML with all CSS/JS inline

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const {
            analyzedData,
            theme,
            palette,
            selectedFeatures
        } = await request.json();

        if (!analyzedData) {
            return NextResponse.json(
                { error: 'No analyzed data provided' },
                { status: 400 }
            );
        }

        // Generate complete HTML
        const html = generatePresentationHTML(
            analyzedData,
            theme || 'modern',
            palette || 'purple',
            selectedFeatures || []
        );

        return NextResponse.json({
            success: true,
            html,
            size: html.length,
        });

    } catch (error: any) {
        console.error('Generation error:', error);
        return NextResponse.json(
            {
                error: 'Failed to generate presentation',
                details: error.message
            },
            { status: 500 }
        );
    }
}

// Generate complete presentation HTML
function generatePresentationHTML(
    analyzedData: any,
    theme: string,
    palette: string,
    selectedFeatures: string[]
): string {
    const { title, subtitle, keyMetrics, insights, visualizations } = analyzedData;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        ${generateCSS(theme, palette)}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${title}</h1>
            <p class="subtitle">${subtitle}</p>
            <p class="date">${new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })}</p>
        </div>
        
        <div class="navigation">
            <button class="nav-btn active" onclick="showSlide(0)">📊 Overview</button>
            <button class="nav-btn" onclick="showSlide(1)">📈 Metrics</button>
            <button class="nav-btn" onclick="showSlide(2)">💡 Insights</button>
        </div>
        
        <div class="slide active" id="slide-0">
            <h2 class="slide-title">Executive Summary</h2>
            <p class="summary">${analyzedData.summary || ''}</p>
            ${generateMetricsGrid(keyMetrics)}
        </div>
        
        <div class="slide" id="slide-1">
            <h2 class="slide-title">Key Metrics</h2>
            ${generateVisualizationSlide(visualizations, selectedFeatures)}
        </div>
        
        <div class="slide" id="slide-2">
            <h2 class="slide-title">Insights & Recommendations</h2>
            ${generateInsightsSection(insights)}
            ${generateRecommendationsSection(analyzedData.recommendations || [])}
        </div>
        
        <div class="control-panel">
            <button class="control-btn" onclick="prevSlide()">◀ Prev</button>
            <button class="control-btn" onclick="nextSlide()">Next ▶</button>
            <button class="control-btn" onclick="window.print()">🖨 Print</button>
        </div>
    </div>
    
    <script>
        ${generateJavaScript()}
    </script>
</body>
</html>`;
}

// Generate CSS with theme and palette
function generateCSS(theme: string, palette: string): string {
    const themeColors = getThemeColors(theme);
    const paletteColors = getPaletteColors(palette);

    return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: ${themeColors.background};
      color: #343A40;
      line-height: 1.6;
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
      text-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    
    .subtitle { font-size: 1.3rem; opacity: 0.9; }
    .date { font-size: 1rem; opacity: 0.8; margin-top: 10px; }
    
    .navigation {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }
    
    .nav-btn {
      background: rgba(255,255,255,0.9);
      border: 2px solid transparent;
      padding: 12px 25px;
      border-radius: 25px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .nav-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    }
    
    .nav-btn.active {
      background: ${paletteColors.primary};
      color: white;
    }
    
    .slide {
      display: none;
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      animation: slideIn 0.5s ease;
    }
    
    .slide.active { display: block; }
    
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .slide-title {
      font-size: 2rem;
      color: ${paletteColors.primary};
      margin-bottom: 30px;
      border-bottom: 3px solid ${paletteColors.primary};
      padding-bottom: 15px;
    }
    
    .summary {
      font-size: 1.2rem;
      color: #555;
      margin-bottom: 30px;
      line-height: 1.8;
    }
    
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    
    .metric-card {
      background: linear-gradient(135deg, ${paletteColors.primary}, ${paletteColors.secondary});
      color: white;
      padding: 25px;
      border-radius: 15px;
      text-align: center;
      transition: transform 0.3s ease;
    }
    
    .metric-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0,0,0,0.2);
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
    
    .insights-list, .recommendations-list {
      list-style: none;
      padding: 0;
    }
    
    .insight-item, .recommendation-card {
      background: #f5f7fa;
      padding: 20px;
      margin-bottom: 15px;
      border-radius: 12px;
      border-left: 5px solid ${paletteColors.primary};
    }
    
    .priority-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: bold;
      margin-bottom: 10px;
    }
    
    .priority-HIGH { background: #D32F2F; color: white; }
    .priority-MEDIUM { background: #F57C00; color: white; }
    .priority-LOW { background: #388E3C; color: white; }
    
    .control-panel {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      padding: 10px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 1000;
    }
    
    .control-btn {
      background: ${paletteColors.primary};
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }
    
    .control-btn:hover {
      background: ${paletteColors.secondary};
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

// Helper functions
function getThemeColors(theme: string) {
    const themes: any = {
        modern: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
        minimal: { background: 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)' },
        corporate: { background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' },
        vibrant: { background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
        dark: { background: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)' },
        nature: { background: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)' },
    };
    return themes[theme] || themes.modern;
}

function getPaletteColors(palette: string) {
    const palettes: any = {
        purple: { primary: '#6A4C93', secondary: '#9370DB' },
        ocean: { primary: '#2C8B8B', secondary: '#48C9B0' },
        sunset: { primary: '#FF6B9D', secondary: '#FFA07A' },
        forest: { primary: '#134E5E', secondary: '#71B280' },
        coral: { primary: '#FF6B6B', secondary: '#FF8C8C' },
        midnight: { primary: '#2C3E50', secondary: '#34495E' },
    };
    return palettes[palette] || palettes.purple;
}

function generateMetricsGrid(metrics: any[]) {
    if (!metrics || metrics.length === 0) return '';

    return `
    <div class="metrics-grid">
      ${metrics.map(m => `
        <div class="metric-card">
          <div class="metric-value">${m.value}</div>
          <div class="metric-label">${m.label}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function generateInsightsSection(insights: string[]) {
    if (!insights || insights.length === 0) return '';

    return `
    <h3 style="margin-top: 30px; margin-bottom: 20px;">Key Insights</h3>
    <ul class="insights-list">
      ${insights.map(insight => `
        <li class="insight-item">💡 ${insight}</li>
      `).join('')}
    </ul>
  `;
}

function generateRecommendationsSection(recommendations: any[]) {
    if (!recommendations || recommendations.length === 0) return '';

    return `
    <h3 style="margin-top: 30px; margin-bottom: 20px;">Recommendations</h3>
    <div class="recommendations-list">
      ${recommendations.map(rec => `
        <div class="recommendation-card">
          <span class="priority-badge priority-${rec.priority}">${rec.priority} PRIORITY</span>
          <h4 style="margin: 10px 0;">${rec.title}</h4>
          <p>${rec.description}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function generateVisualizationSlide(visualizations: any[], selectedFeatures: string[]) {
    return '<p style="font-size: 1.1rem;">Detailed visualizations based on your data analysis.</p>';
}

function generateJavaScript(): string {
    return `
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const navBtns = document.querySelectorAll('.nav-btn');
    
    function showSlide(index) {
      slides.forEach(s => s.classList.remove('active'));
      navBtns.forEach(b => b.classList.remove('active'));
      currentSlide = index;
      slides[currentSlide].classList.add('active');
      navBtns[currentSlide].classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function nextSlide() {
      if (currentSlide < slides.length - 1) showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
      if (currentSlide > 0) showSlide(currentSlide - 1);
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
