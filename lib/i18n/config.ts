/* ============================================================================
   I18N Configuration - Multi-Language Support
   ============================================================================ */

import { SUPPORTED_LOCALES, LOCALE_LABELS, DEFAULT_LOCALE, type Locale } from "@/lib/config";

export const i18nConfig = {
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localeLabels: LOCALE_LABELS,
  
  /* Locale-specific settings for routing & content */
  localeSettings: {
    en: {
      name: "English",
      code: "en",
      nativeName: "English",
      direction: "ltr",
      dateFormat: "MM/DD/YYYY",
      numberFormat: { decimal: ".", thousands: "," },
    },
    si: {
      name: "සිංහල",
      code: "si",
      nativeName: "Sinhala",
      direction: "ltr",
      dateFormat: "YYYY-MM-DD",
      numberFormat: { decimal: ".", thousands: "," },
    },
    ta: {
      name: "தமிழ்",
      code: "ta",
      nativeName: "Tamil",
      direction: "ltr",
      dateFormat: "DD/MM/YYYY",
      numberFormat: { decimal: ".", thousands: "," },
    },
    ar: {
      name: "العربية",
      code: "ar",
      nativeName: "Arabic",
      direction: "rtl",
      dateFormat: "DD/MM/YYYY",
      numberFormat: { decimal: "٫", thousands: "٬" },
    },
  } as const,
};

/* Helper function to get locale from Next.js params */
export function getLocaleFromParams(params: { lang?: string }): Locale {
  const locale = params.lang as Locale;
  return SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
}

/* Helper function to get dictionary for locale */
export async function getDictionary(locale: Locale) {
  return import(`./dictionaries/${locale}.json`).then((module) => module.default);
}

/* Type-safe locale check */
export function isValidLocale(locale: unknown): locale is Locale {
  return typeof locale === "string" && SUPPORTED_LOCALES.includes(locale as Locale);
}
