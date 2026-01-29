import { siteConfig } from "./config";
import type { Locale } from "./config";

const LOCALE_CODES: Record<Locale, string> = {
  en: "en-US",
  si: "si-LK",
  ta: "ta-IN",
  ar: "ar-AE",
};

const LOCALE_TO_LANGUAGE: Record<Locale, string> = {
  en: "English",
  si: "Sinhala",
  ta: "Tamil",
  ar: "العربية",
};

interface HreflangLink {
  rel: "alternate";
  hrefLang: string;
  href: string;
}

/**
 * Generate hreflang links for a given path across all supported locales
 * Used for SEO to indicate which language version of a page is available
 */
export function generateHreflangs(path: string, locale: Locale): HreflangLink[] {
  const cleanPath = path.replace(/^\/[a-z]{2}\//, "/").replace(/\/$/, "");

  const hreflangs: HreflangLink[] = [
    // Self-referencing hreflang
    {
      rel: "alternate",
      hrefLang: LOCALE_CODES[locale],
      href: `${siteConfig.url}/${locale}${cleanPath}`,
    },
  ];

  // Add alternative language versions
  const otherLocales = Object.keys(LOCALE_CODES).filter(
    (l) => l !== locale
  ) as Locale[];

  for (const otherLocale of otherLocales) {
    hreflangs.push({
      rel: "alternate",
      hrefLang: LOCALE_CODES[otherLocale],
      href: `${siteConfig.url}/${otherLocale}${cleanPath}`,
    });
  }

  // Add x-default for default locale
  hreflangs.push({
    rel: "alternate",
    hrefLang: "x-default",
    href: `${siteConfig.url}${cleanPath}`,
  });

  return hreflangs;
}

/**
 * Generate language selector links for navigation/UI
 */
export function getLanguageSelectors(
  currentPath: string,
  currentLocale: Locale
) {
  const cleanPath = currentPath.replace(/^\/[a-z]{2}/, "");

  return Object.entries(LOCALE_TO_LANGUAGE).map(([locale, name]) => ({
    locale: locale as Locale,
    name,
    href: `/${locale}${cleanPath}`,
    active: locale === currentLocale,
  }));
}

/**
 * Generate Open Graph locale metadata
 */
export function generateOpenGraphLocales(defaultLocale: Locale) {
  return Object.keys(LOCALE_CODES).map((locale) => LOCALE_CODES[locale as Locale]);
}

/**
 * Detect locale from URL pathname
 */
export function detectLocaleFromPath(pathname: string): Locale | null {
  const match = pathname.match(/^\/([a-z]{2})(\/|$)/);
  return match ? (match[1] as Locale) : null;
}

/**
 * Build canonical URL with locale
 */
export function buildCanonicalUrl(path: string, locale: Locale): string {
  const cleanPath = path.replace(/^\/[a-z]{2}/, "");
  return `${siteConfig.url}/${locale}${cleanPath}`;
}

/**
 * Get locale-specific geolocation hints
 */
export const LOCALE_GEOLOCATION = {
  en: { country: "US", region: "Global" },
  si: { country: "LK", region: "Sri Lanka" },
  ta: { country: "IN", region: "South India" },
  ar: { country: "AE", region: "Middle East" },
};

/**
 * Get locale-specific currency
 */
export const LOCALE_CURRENCY: Record<Locale, string> = {
  en: "USD",
  si: "LKR",
  ta: "INR",
  ar: "AED",
};
