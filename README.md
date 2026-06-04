# web_development
ASHEN PAUL — Portfolio Website
A fully accessible, multi-page personal portfolio built to WCAG 2.2 AA standards and modern HTML5 semantic conventions. Designed to score 100 on Lighthouse Accessibility and SEO audits.

📁 Project Structure:

portfolio/
├── index.html          ← Home page
├── about.html          ← About & experience
├── projects.html       ← Projects & case studies
├── contact.html        ← Accessible contact form
└── assets/
    ├── style.css       ← All styles (CSS custom properties, responsive, a11y)
    ├── main.js         ← Nav toggle, filter, form validation


    └── favicon.svg     ← SVG favicon

♿ Accessibility Features
Feature
Detail
Skip link
#main-content skip navigation on every page
Semantic HTML5
<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>, <address>
ARIA landmarks
role="banner", role="contentinfo", aria-label on every <nav>
ARIA states
aria-current="page", aria-expanded, aria-pressed, aria-invalid, aria-required
ARIA live regions
Form errors (role="alert"), filter status (aria-live="polite"), form feedback (aria-live="assertive")
Keyboard navigation
Full tab order, visible focus ring (3px coral outline), Escape closes mobile menu
Reduced motion
prefers-reduced-motion disables marquee + transitions
High contrast
forced-colors: active media query support
Colour contrast
All text passes WCAG AA (4.5:1 minimum)
Form labels
Every input has a <label>, hints via aria-describedby, errors via aria-describedby + role="alert"

🔍 SEO Features
Unique <title> and <meta name="description"> on every page
<link rel="canonical"> on every page
Open Graph + Twitter Card meta tags
Schema.org JSON-LD structured data (Person) on home page
Semantic heading hierarchy (h1 → h2 → h3) on every page
<time datetime="..."> for machine-readable dates
rel="noopener noreferrer" on all external links

🛠️ Git Workflow

# Check what files have changed
git status

# View a log of your commits
git log --oneline

# Create a feature branch (good practice)
git checkout -b feature/update-projects

# After changes, merge back to main
git checkout main
git merge feature/update-projects
git push
