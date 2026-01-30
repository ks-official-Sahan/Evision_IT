# Complete I18n Implementation & SEO/AEO/GEO Optimization Guide

## Status: Phase 2/3 Complete

### COMPLETED TASKS

#### ✅ Phase 1: Full Language Dictionary Expansion
All 4 languages now have comprehensive, complete translations:
- **English (en.json)**: 100+ keys covering all pages, CTAs, FAQs, contact forms, legal pages
- **Sinhala (si.json)**: Complete native Sinhala translations with proper character encoding
- **Tamil (ta.json)**: Full Tamil translations with category-specific content
- **Arabic (ar.json)**: Complete RTL-ready Arabic translations with proper formatting

**Dictionary Coverage:**
- Common UI elements
- Navigation and headers
- Hero sections and CTAs
- Service/Solution descriptions
- Case studies and blog
- Contact forms with validation messages
- Legal pages (Privacy & Terms)
- FAQ content
- Error pages
- Footer and metadata

#### ✅ Phase 2: Locale-Based Page Structure (Partial)
Completed locale-based pages:
- `/app/[lang]/page.tsx` - Home page (already existed)
- `/app/[lang]/services/page.tsx` - Service listing
- `/app/[lang]/services/[slug]/page.tsx` - Service detail with related services
- `/app/[lang]/blog/page.tsx` - Blog with category filters
- `/app/[lang]/blog/[slug]/page.tsx` - Blog article detail
- `/app/[lang]/case-studies/page.tsx` - Case studies with industry/service filters
- `/app/[lang]/case-studies/client-content.tsx` - Client-side filtering component
- `/app/[lang]/contact/page.tsx` - Contact form with multi-language support
- `/app/[lang]/company/page.tsx` - About page with mission/vision/values (NEW)
- `/app/[lang]/company/client.tsx` - Company client component (NEW)
- `/app/[lang]/privacy/page.tsx` - Privacy policy (NEW)
- `/app/[lang]/terms/page.tsx` - Terms of service (NEW)

### REMAINING TASKS (CRITICAL)

#### Phase 2B: Remove Duplicate Non-Localized Routes
The following old pages MUST be deleted or redirected to avoid duplicate content:
- `app/page.tsx` → Redirect to `app/[lang]/page.tsx` (default to /en)
- `app/blog/page.tsx` → DELETE
- `app/blog/[slug]/page.tsx` → DELETE
- `app/case-studies/page.tsx` → DELETE
- `app/case-studies/[slug]/page.tsx` → DELETE
- `app/contact/page.tsx` → DELETE
- `app/services/page.tsx` → DELETE
- `app/services/[slug]/page.tsx` → DELETE
- `app/company/page.tsx` → DELETE
- `app/privacy/page.tsx` → DELETE
- `app/resources/page.tsx` → DELETE or CONVERT to `/[lang]/resources`
- `app/solutions/page.tsx` → DELETE or CONVERT to `/[lang]/solutions`
- `app/terms/page.tsx` → DELETE

**Action:** Update `next.config.mjs` redirects to handle old routes:
```javascript
redirects: async () => [
  { source: '/blog', destination: '/en/blog', permanent: true },
  { source: '/blog/:slug', destination: '/en/blog/:slug', permanent: true },
  { source: '/services', destination: '/en/services', permanent: true },
  { source: '/services/:slug', destination: '/en/services/:slug', permanent: true },
  // ... etc
]
```

#### Phase 3: Entity-Based JSON-LD Schema Implementation
Enhance `/lib/json-ld.ts` with complete entity-based SEO:

**Required Schema Types:**
1. **Organization** - Company entity with locations, social profiles
2. **LocalBusiness** - Business details for each market (SL, Dubai, Singapore)
3. **Service** - Each service with AEO-optimized Q&A
4. **Article** - Blog posts with author, publication date, keywords
5. **FAQPage** - FAQ schema for answer engines
6. **BreadcrumbList** - Navigation hierarchy for crawlers
7. **SoftwareApplication** - If offering SaaS products
8. **AggregateRating** - Client testimonials and ratings

**Entity Authority Signals:**
- Link Evision IT to high-authority mentions (GitHub, Clutch, LinkedIn)
- Create structured data for service expertise (years, certifications, tech stack)
- Add author bios for blog writers
- Include contact information in LocalBusiness schema

#### Phase 4: AEO/GEO Content Optimization
Modify pages to support Answer Engine & Generative Engine Optimization:

**Content Structure Improvements Needed:**
1. **FAQ Schema** - Format all FAQs in Question/Answer schema
   - Add "Frequently Asked Questions" section to every service page
   - Use specific, conversational question phrasing
   - Keep answers concise (40-60 words for featured snippet)

2. **Lists & Tables** - Make content machine-extractable
   - Service features as `<ul>` lists
   - Pricing in `<table>` format
   - Process steps in ordered lists

3. **Inverted Pyramid** - Front-load key information
   - Service pages: Lead with answer, then expand
   - Blog posts: Direct answer in first 2 sentences
   - Case studies: Results summary first, methodology second

4. **E-E-A-T Signals** - Build trust for LLMs
   - Author credentials on blog posts
   - Company certifications and awards
   - Client success metrics with data
   - Team expertise documentation

#### Phase 5: API Route Locale Support
Update all API routes to handle locale-specific logic:

**Routes to Update:**
- `/api/quiz-submission` - Add locale field for tracking by market
- `/api/contact-submission` - Format responses in user's language
- Any future `/api/[locale]/...` routes for localized data

**Implementation:**
```typescript
export async function POST(req: Request, { params }: { params: { locale: Locale } }) {
  const locale = getValidLocale(params.locale);
  // ... handle locale-specific business logic
}
```

#### Phase 6: Comprehensive SEO Metadata
Update metadata generation on all pages:

**Metadata to Include:**
- `title` - Locale + keyword + brand (55-60 chars)
- `description` - Market-specific value prop (155-160 chars)
- `keywords` - Locale-relevant service keywords
- `og:title`, `og:description`, `og:image` - Social sharing
- `og:locale` - Proper hreflang alternates for each language
- `twitter:card` - Social sharing format

**hreflang Implementation:**
Every page must include alternate language links:
```html
<link rel="alternate" hreflang="en" href="https://evisionit.com/en/services" />
<link rel="alternate" hreflang="si" href="https://evisionit.com/si/services" />
<link rel="alternate" hreflang="ta" href="https://evisionit.com/ta/services" />
<link rel="alternate" hreflang="ar" href="https://evisionit.com/ar/services" />
<link rel="alternate" hreflang="x-default" href="https://evisionit.com/en/services" />
```

#### Phase 7: GEO Localization for Market Targeting
Customize content for specific geographic markets:

**Dubai/UAE Focus:**
- AED pricing in contact forms
- "Premium UAE services" messaging
- Dubai office address in LocalBusiness schema
- Arabic content priority

**Singapore Focus:**
- SGD pricing
- "Asia-Pacific solutions" messaging
- Singapore office/partnership mentions

**Sri Lanka Focus:**
- LKR pricing option
- Local team emphasis
- Colombo headquarters

### IMPLEMENTATION CHECKLIST

**Week 1 - Route Consolidation:**
- [ ] Delete duplicate old pages (app/blog, app/services, etc)
- [ ] Update next.config.mjs redirects
- [ ] Update sitemap.ts to only include [lang] routes
- [ ] Test all locale routes work properly
- [ ] Verify no 404s on old URLs

**Week 2 - Schema & Metadata:**
- [ ] Enhance json-ld.ts with all schema types
- [ ] Add metadata generation to all pages
- [ ] Implement hreflang links in layout.tsx
- [ ] Create entity reference documentation
- [ ] Test schema with Google Rich Results tester

**Week 3 - AEO/GEO Content:**
- [ ] Add FAQ sections to all service pages
- [ ] Format pricing as tables
- [ ] Convert features to semantic lists
- [ ] Write inverted-pyramid blog intros
- [ ] Add author bios to blog posts

**Week 4 - Testing & Optimization:**
- [ ] Crawl site with SEMrush/Ahrefs
- [ ] Check mobile rendering in each language
- [ ] Test featured snippet eligibility
- [ ] Verify language detection working
- [ ] Monitor Core Web Vitals per locale

### LOCALE-SPECIFIC OPTIMIZATIONS

#### Content Regional Defaults:
```typescript
// In lib/config.ts
const REGIONAL_CONFIG = {
  en: { currency: 'USD', timezone: 'UTC', markets: ['Global'] },
  si: { currency: 'LKR', timezone: 'Asia/Colombo', markets: ['Sri Lanka'] },
  ta: { currency: 'INR', timezone: 'Asia/Kolkata', markets: ['South India'] },
  ar: { currency: 'AED', timezone: 'Asia/Dubai', markets: ['UAE', 'Middle East'] },
};
```

#### Language-Specific CMS Data:
All dynamic content (services, case studies, blog) should include:
- `locale` field for market assignment
- `keywords_[locale]` for SEO in each language
- `description_[locale]` for unique market positioning
- `image_[locale]` for culturally appropriate visuals

### MONITORING & KPIs

**Track per locale:**
- Organic traffic by language
- CTR from SERPs (especially featured snippets)
- Share of Voice for key terms
- Zero-click impressions
- LLM citation mentions (monitor Perplexity, Claude, ChatGPT)
- Conversion rate by language
- Average dwell time by locale

### KNOWN ISSUES TO ADDRESS

1. **Blog client filtering** - useSearchParams needs Suspense boundary (see warning in case-studies/page.tsx)
2. **Old page redirects** - 301 redirects not yet configured in next.config.mjs
3. **locale param typing** - Some components may have Promise<{ lang: string }> issues
4. **Analytics tracking** - GA4 events should include locale dimension
5. **Form validation** - Contact form needs locale-specific phone/address validation

### REFERENCES & RESOURCES

- **Entity-Based SEO:** Google Knowledge Graph documentation
- **AEO:** Position Zero content patterns
- **GEO:** LLM Training Data standards
- **i18n Best Practices:** Next.js i18n docs
- **hreflang:** Google International Targeting guide

---

## Next Steps for Developer

1. **Start with Route Consolidation** - Delete old pages, set up redirects
2. **Test all [lang] routes** - Ensure no 404s, proper locale detection
3. **Implement Schema** - Start with Organization and Service types
4. **Add AEO Content** - FAQ schema and inverted pyramid writing
5. **Monitor & Iterate** - Track metrics, optimize content based on performance

All language dictionaries are complete and ready to use. Focus now on structural consolidation and schema implementation.
