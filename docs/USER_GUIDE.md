# DataViz Studio - User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Uploading Files](#uploading-files)
3. [Customizing Your Presentation](#customizing-your-presentation)
4. [Understanding the Output](#understanding-the-output)
5. [Tips & Best Practices](#tips--best-practices)
6. [Troubleshooting](#troubleshooting)

---

## Getting Started

### What is DataViz Studio?
DataViz Studio transforms your data files into beautiful, interactive HTML presentations. Simply upload your files, choose your preferences, and generate a standalone presentation that can be viewed in any web browser.

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- No special software or installation required

### Opening the Application
1. Navigate to the DataViz-Studio folder
2. Double-click `index.html`
3. The application opens in your default browser

---

## Uploading Files

### Supported Formats
DataViz Studio supports 6 file formats:

**Excel Files** (.xlsx, .xls)
- Financial reports, sales data, analytics
- Multiple sheets supported
- Automatically detects headers and data types

**CSV Files** (.csv)
- Simple tabular data
- Auto-detects delimiters (comma, semicolon, tab)
- Perfect for exports from databases or spreadsheets

**PDF Files** (.pdf)
- Text extraction and table detection
- Multi-page documents supported
- Note: Complex layouts may require manual review

**PowerPoint Files** (.pptx, .ppt)
- Extracts slide content and text
- Preserves slide order
- Note: Full parsing requires server-side processing

**Word Documents** (.docx, .doc)
- Extracts headings, paragraphs, tables
- Maintains document structure
- Note: Full parsing requires server-side processing

**JSON Files** (.json)
- Structured data
- Nested objects and arrays
- API responses, configuration files

### How to Upload

**Method 1: Drag & Drop**
1. Open File Explorer
2. Select your file(s)
3. Drag them onto the upload zone
4. Release to upload

**Method 2: Click to Browse**
1. Click anywhere in the upload zone
2. File browser opens
3. Select one or multiple files
4. Click "Open"

### Managing Uploaded Files
- View all uploaded files in the list below the upload zone
- See file name, type icon, and file size
- Click "Remove" to delete a file from the list
- Upload multiple files to combine data

---

## Customizing Your Presentation

### Custom Instructions
Add specific guidance for your presentation in the text area:

**Examples:**
- "Focus on Q4 revenue metrics"
- "Emphasize team performance and growth trends"
- "Highlight top 5 customers by revenue"
- "Show year-over-year comparison"

**Character Limit:** 500 characters

### Selecting Features
Choose which visual components to include:

**Expandable Cards** - Great for detailed lists and categorized information  
**Flip Cards** - Perfect for before/after comparisons  
**Pop-out Cards** - Ideal for detailed information that doesn't fit on main slide  
**Timeline (Vertical)** - Best for chronological milestones  
**Timeline (Horizontal)** - Perfect for project roadmaps  
**Pie Charts** - Ideal for percentage distributions  
**Bar Charts** - Great for comparative values  
**Line Charts** - Perfect for trends over time  
**SWOT Grid** - Designed for strategic analysis  
**Metric Cards** - Showcase key performance indicators  
**Team Cards** - Display team members and roles  
**Recommendation Cards** - Prioritized action items

**Tip:** All features are selected by default. Deselect ones you don't need.

### Choosing a Theme
Select the overall design style:

**Modern** - Purple/blue gradients, contemporary feel  
**Minimal** - Clean white/gray, professional simplicity  
**Corporate** - Navy professional, business-appropriate  
**Vibrant** - Colorful and energetic, creative vibe  
**Dark** - Dark mode elegance, easy on eyes  
**Nature** - Green earth tones, organic feel

### Choosing a Color Palette
Select the primary color scheme:

**Purple** (#6A4C93) - Creative, sophisticated  
**Ocean** (#2C8B8B) - Calming, trustworthy  
**Sunset** (#FF6B9D) - Warm, passionate  
**Forest** (#134E5E) - Natural, stable  
**Coral** (#FF6B6B) - Energetic, friendly  
**Midnight** (#2C3E50) - Professional, serious

**Note:** Theme and palette work together to create your final look.

---

## Understanding the Output

### What You Get
A single, standalone HTML file containing:
- All your data visualizations
- Interactive components
- Navigation between slides
- Print-friendly styles
- Keyboard shortcuts
- All CSS and JavaScript inline (no external dependencies)

### File Structure
The generated presentation includes:

**Header Section**
- Title
- Subtitle
- Date

**Navigation Bar**
- Buttons to jump between slides
- Active slide indicator

**Multiple Slides**
- Overview/Executive Summary
- Detailed Metrics
- Key Insights
- Additional slides based on your data

**Control Panel** (bottom-right)
- Previous/Next buttons
- Print button
- Fullscreen toggle (if applicable)

### Using the Presentation

**Navigate Slides:**
- Click navigation buttons at top
- Use "Prev" / "Next" buttons in control panel
- Press Arrow Right / Arrow Left keys
- Press Spacebar to advance

**Interactive Elements:**
- Click expandable cards to reveal content
- Click flip cards to see back side
- Click pop-out cards to open modal
- Hover over elements for effects

**Print:**
- Click Print button in control panel
- Or press Ctrl+P (Cmd+P on Mac)
- Each slide prints on separate page
- Navigation hidden in print view

---

## Tips & Best Practices

### Data Preparation
✅ **Clean your data** - Remove empty rows/columns  
✅ **Use clear headers** - Descriptive column names  
✅ **Consistent formatting** - Same date formats, units  
✅ **Reasonable file sizes** - Keep under 10MB per file

### Feature Selection
✅ **Less is more** - Don't use all features if not needed  
✅ **Match to content** - Pie charts for %, timelines for dates  
✅ **Think about audience** - Corporate theme for executives  
✅ **Test output** - Generate and review before presenting

### Custom Instructions
✅ **Be specific** - "Show top 5" vs "Show important ones"  
✅ **Mention priorities** - What matters most?  
✅ **Note exclusions** - What to skip or de-emphasize  
✅ **Specify preferences** - Desired charts, colors, focus areas

### Presentation Design
✅ **Consistent theme** - Stick with one theme  
✅ **Readable palette** - Ensure good contrast  
✅ **Logical flow** - Overview → Details → Insights  
✅ **Test on devices** - Check mobile, tablet, desktop

---

## Troubleshooting

### Generate Button is Disabled
**Cause:** No files uploaded  
**Solution:** Upload at least one valid file

### File Not Parsing Correctly
**Causes:** 
- Unsupported file format
- Corrupted file
- Complex structure

**Solutions:**
- Verify file extension is supported
- Try opening file in native application first
- Simplify data structure
- Try exporting to CSV for simpler parsing

### Generated HTML Looks Different
**Cause:** Browser compatibility  
**Solution:** Use latest Chrome, Firefox, or Edge

### Download Not Starting
**Cause:** Browser popup blocker  
**Solutions:**
- Check browser notification area for blocked popup
- Allow downloads from this page
- Try in different browser

### Missing Data in Output
**Causes:**
- Complex file structure
- Parsing limitations

**Solutions:**
- Review uploaded file structure
- Try simpler data format (CSV or JSON)
- Check browser console for errors (F12)

### Performance Issues
**Causes:**
- Very large files (>10MB)
- Too many files uploaded
- Complex visualizations

**Solutions:**
- Split large files into smaller chunks
- Upload fewer files at once
- Deselect unused features
- Use simpler data structures

---

## Advanced Usage

### Combining Multiple Files
Upload related files together:
- Q1.xlsx, Q2.xlsx, Q3.xlsx, Q4.xlsx → Full year report
- sales.csv, marketing.csv, operations.csv → Department overview
- Mix formats for comprehensive analysis

### Custom Styling
For developers familiar with HTML/CSS:
1. Generate presentation
2. Open in text editor
3. Modify CSS variables in `<style>` section
4. Save and reload

### Sharing Presentations
Generated HTML files can be:
- ✅ Emailed as attachments
- ✅ Uploaded to web hosting
- ✅ Shared via file sharing services
- ✅ Opened offline (no internet needed)
- ✅ Embedded in websites (with proper permissions)

---

## Keyboard Shortcuts

**In Generated Presentation:**
- `→` or `Space` - Next slide
- `←` - Previous slide
- `Ctrl+P` / `Cmd+P` - Print
- `F11` - Fullscreen (browser native)

---

## Best Results Checklist

Before generating your presentation:

- [ ] Files are clean and well-structured
- [ ] Headers are descriptive and clear
- [ ] Custom instructions are specific
- [ ] Features selected match your data
- [ ] Theme and palette complement each other
- [ ] File sizes are reasonable (<10MB)
- [ ] You've reviewed data for accuracy

After generating:

- [ ] Download successful
- [ ] Open in browser to verify
- [ ] All slides display correctly
- [ ] Interactive elements work
- [ ] Navigation functions properly
- [ ] Print preview looks good
- [ ] Mobile/responsive view tested

---

## Getting Help

**Check the troubleshooting section** for common issues

**Review examples** in the samples folder

**Browser console** (F12) may show helpful errors

**Try simpler data** if complex files fail

---

## Examples

### Example 1: Sales Report
**Files:** sales-2024.xlsx  
**Instructions:** "Focus on Q4 performance, show top 5 products"  
**Features:** Metric Cards, Bar Charts, Line Charts  
**Theme:** Corporate  
**Palette:** Ocean

### Example 2: Team Structure
**Files:** org-chart.json  
**Instructions:** "Display team hierarchy with roles"  
**Features:** Team Cards, Expandable Cards  
**Theme:** Modern  
**Palette:** Purple

### Example 3: Project Timeline
**Files:** project-plan.csv  
**Instructions:** "Show milestones and deliverables"  
**Features:** Timeline (both), Metric Cards  
**Theme:** Minimal  
**Palette:** Forest

---

**Need more help?** Check README.md or open an issue on GitHub.

**Happy presenting!** 🚀
