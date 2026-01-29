# Evision IT - Enterprise B2B IT Services Website

A production-ready, multilingual B2B website for Evision IT built with Next.js 16, React 19, and modern web technologies.

## 🌍 Live Demo

- **Production**: https://evision.lk
- **Staging**: https://staging.evision.lk

## ✨ Key Features

### 🎨 Design System
- **Tailwind CSS v4** with fluid typography and responsive design
- **Dark mode** with OLED-optimized blacks
- **Glassmorphism effects** for modern aesthetics
- **Accessibility-first** with WCAG 2.2 compliance
- **25+ reusable components** built on shadcn/ui

### 🌐 Multilingual Support
- **4 languages**: English, Sinhala, Tamil, Arabic
- **Locale-aware routing** with automatic detection
- **Translated dictionaries** for all content
- **hreflang tags** for proper SEO
- **Regional settings** per market

### 📱 Pages & Features
- **Homepage** with animated hero, quiz builder, and social proof
- **Solution Finder Quiz** - 3-step AI-powered service recommender
- **Service Pages** with details, FAQs, and related services
- **Blog System** with categories, search, and reading time
- **Case Studies** with filterable portfolio
- **Contact Form** with validation and spam protection
- **Dynamic Sitemap** with hreflang support

### 🔧 Technical Features
- **API Routes** for form submissions and quiz tracking
- **MongoDB Atlas** integration with proper schemas
- **GA4 Analytics** with event tracking
- **JSON-LD Schema** markup for SEO
- **Security Headers** (CSP, X-Frame, HSTS)
- **3D Components** with Three.js and Framer Motion
- **Automated Redirects** for non-localized paths
- **Core Web Vitals** optimization

## 📋 Tech Stack

### Frontend
- **Next.js 16** (App Router, Server Components, Middleware)
- **React 19.2** with Canary features
- **TypeScript** for type safety
- **Tailwind CSS v4** with custom utilities
- **Framer Motion** for animations
- **React Three Fiber** for 3D content
- **shadcn/ui** components

### Backend & Database
- **MongoDB Atlas** for data storage
- **Mongoose** for schema management
- **API Routes** for serverless functions
- **JWT** for authentication (optional)

### Analytics & SEO
- **Google Analytics 4** with event tracking
- **JSON-LD Schema** markup
- **Sitemap generation**
- **robots.txt** configuration
- **Open Graph** meta tags

### DevOps & Deployment
- **Vercel** for hosting and CI/CD
- **Git** for version control
- **Environment variables** management
- **Security headers** configuration

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ with npm/yarn
- MongoDB Atlas account
- Vercel account (for production)

### Local Development

```bash
# 1. Clone repository
git clone https://github.com/evision-it/website.git
cd website

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your actual values

# 4. Run development server
npm run dev

# 5. Open browser
open http://localhost:3000
```

### Environment Variables

See `.env.example` for all required variables:
- MongoDB connection string
- GA4 measurement ID
- Email service credentials
- Recaptcha keys
- Vercel API token

## 📁 Project Structure

```
evision-website/
├── app/
│   ├── [lang]/                 # Locale-specific pages
│   │   ├── page.tsx           # Home page
│   │   ├── services/          # Service pages
│   │   ├── blog/              # Blog pages
│   │   ├── case-studies/      # Portfolio
│   │   └── contact/           # Contact form
│   ├── api/                   # API routes
│   │   ├── quiz-submission/   # Quiz handler
│   │   └── contact-submission/ # Contact form handler
│   └── layout.tsx             # Root layout with analytics
├── components/
│   ├── home/                  # Homepage components
│   ├── layout/                # Header, footer
│   ├── ui/                    # Reusable UI components
│   ├── forms/                 # Form components
│   ├── seo/                   # SEO components
│   └── providers/             # Context providers
├── lib/
│   ├── config.ts              # Site configuration
│   ├── data.ts                # Static data
│   ├── i18n/                  # i18n setup
│   ├── json-ld.ts             # Schema markup
│   └── analytics.ts           # GA4 tracking
├── public/
│   ├── fonts/                 # Web fonts
│   ├── robots.txt             # SEO
│   └── images/                # Static images
├── proxy.ts                   # Next.js 16 middleware
├── next.config.mjs            # Next.js configuration
└── package.json
```

## 🔗 Page Routes

### Public Pages
- `/` → Home page (auto-redirects to /en)
- `/en` → Home (English)
- `/en/services` → All services
- `/en/services/[slug]` → Service detail
- `/en/blog` → Blog listing
- `/en/blog/[slug]` → Blog article
- `/en/case-studies` → Portfolio
- `/en/case-studies/[slug]` → Case study detail
- `/en/contact` → Contact form

### Supported Locales
- `/en/` - English
- `/si/` - Sinhala
- `/ta/` - Tamil
- `/ar/` - Arabic

### API Routes
- `POST /api/quiz-submission` - Save quiz responses
- `POST /api/contact-submission` - Save contact form

## 🎯 Key Components

### Homepage Components
- `HeroSection` - Main hero with animations
- `TrustBar` - Social proof with metrics
- `SolutionFinderQuiz` - Interactive 3-step quiz
- `SolutionsOverview` - Service categories
- `OutcomesMetrics` - Results showcase

### Utility Components
- `Breadcrumbs` - Navigation breadcrumbs
- `JsonLd` - Schema markup renderer
- `ContactForm` - Reusable contact form
- `GA4Provider` - Analytics wrapper

## 📊 Database Schema

### Collections
- `pages` - Static pages with translations
- `services` - Service offerings
- `blogPosts` - Blog articles
- `caseStudies` - Portfolio items
- `quizSubmissions` - Solution finder responses
- `contactSubmissions` - Contact form entries

## 🔐 Security Features

- **Security Headers**: CSP, X-Frame-Options, X-XSS-Protection
- **Input Validation**: Zod schemas for all forms
- **Spam Protection**: Honeypot field in contact form
- **Rate Limiting**: Configurable per API endpoint
- **CORS**: Properly configured for API routes
- **Environment Variables**: Secure credential management

## ⚡ Performance

### Optimizations
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Dynamic imports
- **ISR**: 1-hour revalidation for most pages
- **CSS-in-JS**: Zero runtime CSS
- **Bundle Analysis**: Tree-shaking enabled

### Core Web Vitals Targets
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

## 📈 Analytics Setup

### GA4 Events Tracked
- `page_view` - Page visits
- `form_submission` - Contact form
- `quiz_completion` - Solution finder
- `service_interest` - Service clicks
- `blog_engagement` - Article views
- `language_change` - Locale changes

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Connect repository
vercel link

# Add environment variables
vercel env add MONGODB_URI
# ... add all other variables

# Deploy
git push origin main
# Automatic deployment on main branch
```

### Docker (Optional)

```bash
# Build image
docker build -t evision-website .

# Run container
docker run -p 3000:3000 evision-website
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Run tests (when implemented)
npm run test

# Build production bundle
npm run build
```

## 📚 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment & DevOps guide
- [.env.example](./.env.example) - Environment variables template
- [next.config.mjs](./next.config.mjs) - Next.js configuration
- [proxy.ts](./proxy.ts) - Middleware configuration

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/description`
2. Make changes and test locally
3. Push branch: `git push origin feature/description`
4. Create Pull Request with description

## 📝 Commit Convention

```
feat: Add new feature
fix: Fix a bug
docs: Update documentation
style: Format code
refactor: Refactor code
perf: Improve performance
test: Add tests
chore: Update dependencies
```

## 📞 Support

- **Issues**: GitHub Issues for bug reports
- **Email**: support@evision.lk
- **Slack**: #website-support channel

## 📄 License

© 2025 Evision IT. All rights reserved.

## ✅ Completed Phases

- ✅ Phase 1A: Design System & Theme Foundation
- ✅ Phase 1B: Multi-Language Infrastructure
- ✅ Phase 2: Home Page & Solution Finder Quiz
- ✅ Phase 3: Service Detail Pages & Portfolio
- ✅ Phase 4: Blog System & Content Architecture
- ✅ Phase 5: SEO & JSON-LD Schema
- ✅ Phase 6: 3D Hero & Advanced Interactions
- ✅ Phase 7: Forms, Analytics & Optimization
- ✅ Phase 8: Deployment & Final Polish

## 🎉 Ready for Production

This project is production-ready with:
- ✅ Responsive design for all devices
- ✅ Multilingual support with SEO optimization
- ✅ Security headers and input validation
- ✅ Analytics tracking and monitoring
- ✅ Performance optimizations
- ✅ Accessibility compliance (WCAG 2.2)
- ✅ Mobile-first approach
- ✅ Automated deployments

**Last Updated**: January 28, 2025


---

# 🛡️ Supreme Project Repository

Welcome to a project maintained, owned, or created under the exclusive rights of  
**Subasin Arachchige Sahan Sachintha** — CEO, Architect, and Supreme Owner of all source code, designs, IP, and revenue streams contained herein.

---

## 📦 Overview

This repository includes components, modules, or systems intended for internal, client, or commercial use.  
All assets are subject to **Supreme Proprietary License v1.0**, which **does not permit free usage** unless explicitly granted.

---

## 👑 Ownership & License

- **© 2025 Subasin Arachchige Sahan Sachintha**
- **License:** [LICENSE.md](./LICENSE.md)
- **Protected by:** International IP, Cybersecurity, and Cybercrime laws
- **Jurisdiction:** Colombo, Sri Lanka

---

## 🚫 Usage Restrictions

- ❌ Redistribution without explicit permission is forbidden
- ❌ Unauthorized modification is a violation of the license
- ❌ Any monetization must include a **minimum 10% royalty or commission**

For legal use, licensing, or partnership inquiries, contact:

> 📧 **ks.official.sahan@gmail.com**  
> 📱 **+94 768 701148**

---

## 💼 Business & Legal Attribution

- **Entity Name:** Evision IT (PVT) Ltd
- **License Version:** Supreme Proprietary License v1.0
- **Contact:** [GitHub Profile](https://github.com/ks-official-Sahan)

---

## ⚖️ Legal Notice

Any user or contributor acknowledges:

> “I accept that Subasin Arachchige Sahan Sachintha is the **sole intellectual and legal owner** of this codebase.  
> I shall not violate, reuse, sell, or clone any portion of this work without permission.”

---

## 🧾 Contents

- Code Modules
- Internal APIs
- Business Logic
- UI/UX assets
- Deployment Scripts

> All of which fall under supreme license protection and usage tracking.

---

## 🔐 Final Reminder

**Unauthorized use will trigger enforcement audits and possible legal actions.**

<!-- SUPREME_MARKER: README: 1d87e6f5-eabc-491c-a3e0-guard -->