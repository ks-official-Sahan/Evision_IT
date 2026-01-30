/* ============================================================================
   Get Dictionary - Server-Side Translation Loading
   ============================================================================ */

import type { Locale } from "@/lib/config";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/lib/config";

import { cacheLife } from "next/cache";

// Type-safe dictionary structure
export type Dictionary = {
  nav: Record<string, string>;
  hero: Record<string, string>;
  solutions: Record<string, Record<string, string>>;
  trust: Record<string, string>;
  cta: Record<string, string>;
  footer: Record<string, string>;
  [key: string]: any;
};

/**
 * Load translation dictionary for a given locale
 * Uses Next.js 16 "use cache" for Data Cache integration
 */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  "use cache";
  // Cache dictionaries for 24 hours (stale after 1 hour)
  cacheLife({ stale: 3600, revalidate: 86400, expire: 604800 });

  try {
    // Dynamically import the locale-specific JSON file
    const dictionary = await import(`./dictionaries/${locale}.json`).then(
      (module) => module.default as Dictionary,
    );

    return dictionary;
  } catch (error) {
    console.error(`[i18n] Failed to load dictionary for locale: ${locale}`);

    // Recursive fallback check to prevent infinite loop
    if (locale !== DEFAULT_LOCALE) {
      // Create a non-cached way to get default locale to avoid recursion issues if possible
      // or just assume standard import works
      const defaultDict = await import(
        `./dictionaries/${DEFAULT_LOCALE}.json`
      ).then((module) => module.default as Dictionary);
      return defaultDict;
    }

    return {} as Dictionary;
  }
}

/**
 * Validate and get locale from params
 * Returns default locale if invalid
 */
export function getValidLocale(locale: unknown): Locale {
  if (
    typeof locale === "string" &&
    SUPPORTED_LOCALES.includes(locale as Locale)
  ) {
    return locale as Locale;
  }
  return DEFAULT_LOCALE;
}

/**
 * Get all supported locales (for static generation)
 */
export function getAllLocales(): Locale[] {
  return [...SUPPORTED_LOCALES];
}

/**
 * Check if a locale is supported
 */
export function isSupportedLocale(locale: unknown): locale is Locale {
  return (
    typeof locale === "string" && SUPPORTED_LOCALES.includes(locale as Locale)
  );
}
