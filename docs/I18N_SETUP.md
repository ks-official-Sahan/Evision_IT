# Multi-Language Infrastructure (i18n) Setup

This document explains the internationalization (i18n) architecture for Evision IT.

## Supported Locales

- **en** - English (default)
- **si** - Sinhala (Sri Lanka)
- **ta** - Tamil (Sri Lanka)
- **ar** - Arabic (UAE, Middle East)

## Architecture Overview

### 1. Proxy Middleware (`/proxy.ts`)

Handles all incoming requests and:
- Detects user's preferred language from `Accept-Language` header
- Redirects to locale-specific URL if not already prefixed
- Skips public assets, API routes, and static files

### 2. Dynamic Routing (`/app/[lang]/`)

Uses Next.js dynamic segments to support locale-prefixed routes:
```
/en              → English home page
/en/services     → English services page
/si              → Sinhala home page
/si/services     → Sinhala services page
/ar              → Arabic home page (RTL)
/ta              → Tamil home page
```

### 3. Locale Layout (`/app/[lang]/layout.tsx`)

Wraps all locale routes and:
- Generates metadata with locale-specific content
- Sets HTML `lang` and `dir` attributes (rtl for Arabic)
- Adds hreflang canonical + alternate tags for SEO
- Provides locale to layout components (SiteHeader, SiteFooter)

### 4. Translation Management

#### Dictionary Files (`/lib/i18n/dictionaries/`)

Each locale has a JSON file with all UI strings:
```json
{
  "nav": { "home": "Home", ... },
  "hero": { "headline": "...", ... },
  ...
}
```

#### Dictionary Loading (`/lib/i18n/get-dict.ts`)

- Server-side only (no client-side translation bloat)
- Uses dynamic imports with caching for performance
- Fallback to English if locale dictionary fails
- Type-safe dictionary structure

#### Configuration (`/lib/i18n/config.ts`)

- Locale validation and helpers
- Locale-specific settings (direction, date format, etc.)
- Maps locales to native names for language switcher

## Usage

### Server Components (RSC)

```tsx
import { getDictionary, getValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/config";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);

  return (
    <h1>{dict.hero.headline}</h1>
    <p>{dict.hero.tagline}</p>
  );
}
```

### Passing Locale to Components

```tsx
<SiteHeader locale={locale} />
<SiteFooter locale={locale} />
```

### Building Routes Dynamically

```tsx
// In SiteHeader or other layout components that accept locale prop:
const href = link.href === "/" ? `/${locale}` : `/${locale}${link.href}`;
<Link href={href}>{link.label}</Link>
```

## Database Schema

All content models support translations via `translations` object:

```typescript
{
  _id: ObjectId,
  slug: "service-name",
  translations: {
    en: { title: "English Title", description: "..." },
    si: { title: "සිංහල Titel", description: "..." },
    ar: { title: "العنوان العربي", description: "..." },
    ta: { title: "தமிழ் தலைப்பு", description: "..." }
  }
}
```

## Adding New Translations

1. **Add key to base dictionary** (`/lib/i18n/dictionaries/en.json`):
   ```json
   {
     "newSection": {
       "title": "New Section Title",
       "description": "Description text"
     }
   }
   ```

2. **Add to all other locales**:
   - `/lib/i18n/dictionaries/si.json`
   - `/lib/i18n/dictionaries/ta.json`
   - `/lib/i18n/dictionaries/ar.json`

3. **Use in component**:
   ```tsx
   const dict = await getDictionary(locale);
   <h2>{dict.newSection.title}</h2>
   ```

## SEO Considerations

### Hreflang Tags

The layout automatically generates:
- **Canonical URL**: Points to current locale version
- **Alternate links**: Link to all other locale versions
- **Language attribute**: Set on `<html lang="en">` tag
- **Direction attribute**: Set on `<html dir="rtl">` for Arabic

### Metadata per Locale

Metadata is generated with locale-specific content:
- Title and description use locale dictionary
- OpenGraph locale tag reflects current locale
- Language codes follow BCP 47 standard

### Structured Data (JSON-LD)

Schema.org markup includes:
- `inLanguage` property for each locale
- Locale-specific organization data (addresses, phones)

## Static Generation

All pages are pre-rendered using `generateStaticParams()`:

```typescript
export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}
```

This ensures all locale routes are statically generated at build time.

## Environment Variables

Add to `.env.local`:

```bash
MONGODB_URI=mongodb+srv://...
NEXT_PUBLIC_GTM_ID=GTM-XXXXX
NEXT_PUBLIC_GA4_ID=G-XXXXX
```

## Deployment Notes

1. **Vercel**: Auto-detects i18n routing
2. **Build**: Generates static pages for all locales
3. **Performance**: Uses ISR for dynamic content updates
4. **CDN**: Routes automatically cached per locale

## Testing

### Manual Testing

1. Visit `/en` - Should show English
2. Visit `/si` - Should show Sinhala
3. Visit `/ar` - Should show Arabic with RTL layout
4. Visit `/` with `Accept-Language: ar` header - Should redirect to `/ar`

### Language Switcher (Future)

To add language switcher:

```tsx
<select onChange={(e) => router.push(`/${e.target.value}`)}>
  {SUPPORTED_LOCALES.map((locale) => (
    <option key={locale} value={locale}>
      {LOCALE_LABELS[locale].label}
    </option>
  ))}
</select>
```

## Performance Optimization

- **Dictionary Caching**: Dictionaries cached in-memory after first load
- **Static Generation**: All routes pre-rendered at build time
- **No Client Bundle**: Translations loaded server-side only
- **ISR**: Dynamic content can be revalidated on-demand

## Future Enhancements

1. **RTL Support**: Full Arabic interface mirroring
2. **Number/Date Formatting**: Locale-specific formats
3. **Language Switcher**: User-accessible language selector
4. **Content Management**: Admin interface for translations
5. **Automatic Translation**: Integration with translation APIs
