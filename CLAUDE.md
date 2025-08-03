# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a website for POSN Computer Science Camp 1 tutorial materials (เอกสารติว สอวน. คอมพิวเตอร์ ค่าย 1 ปี พ.ศ. 2568). The website serves as a comprehensive study guide covering mathematics and computer science topics required for the POSN computer science competition.

## Project Structure

```
/
├── index.html          # Main homepage with navigation to all chapters
├── styles.css          # Main stylesheet with responsive design
├── script.js          # JavaScript for navigation and interactivity
├── chapter-styles.css  # Additional styles specific to chapter content pages
├── chapter-script.js   # JavaScript for chapter page functionality (TOC navigation)
├── chapters/           # Directory for individual chapter content pages
├── pdfs/              # Directory for PDF resources (currently empty)
└── .gitattributes     # Git configuration for text normalization
```

## Development Commands

This is a static website project using vanilla HTML, CSS, and JavaScript. No build process is required.

### Local Development
- Open `index.html` in a web browser to view the site
- Use a local server for better development experience: `python -m http.server 8000`
- Access at `http://localhost:8000`

### Deployment
- The site can be deployed to GitHub Pages directly from the main branch
- All files should be in the root directory for GitHub Pages compatibility

## Content Structure

The website is organized into three main sections:

1. **ส่วนที่ 1: คณิตศาสตร์** (Mathematics) - Chapters 1-8
2. **ส่วนที่ 2: วิทยาการคำนวณ** (Computer Science) - Chapters 9-10  
3. **ส่วนที่ 3: แนวข้อสอบและกลยุทธ์** (Exam Prep) - Chapters 11-12

Each chapter is subdivided into multiple sections with individual HTML pages in the `chapters/` directory.

## Technical Notes

- Uses Thai language content with UTF-8 encoding
- Responsive design supports mobile and desktop viewing
- Navigation includes smooth scrolling and active state tracking
- Search functionality for finding content across chapters
- Font: Sarabun (Google Fonts) for Thai language support
- Color scheme: Blue gradient header with clean white content cards
- MathJax integration for mathematical expressions in chapter content
- Two-tier JavaScript architecture: `script.js` for main page, `chapter-script.js` for chapter pages
- Breadcrumb navigation system for chapter pages linking back to main sections

## Content Development

- Chapter content pages should be created in `chapters/` directory
- Follow naming convention: `ch{chapter}-{section}.html` (e.g., `ch1-1.html`)
- Each content page should include:
  - MathJax configuration for mathematical expressions
  - Breadcrumb navigation linking back to main page and section
  - Both `../styles.css` and `../chapter-styles.css` stylesheets
  - Reference to `../chapter-script.js` for TOC functionality
- Mathematical content uses LaTeX syntax with MathJax rendering
- Maintain consistent styling with the main page design