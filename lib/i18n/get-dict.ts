/* ============================================================================
   Get Dictionary - Server-Side Translation Loading
   ============================================================================ */

import type { Locale } from "@/lib/config";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/lib/config";

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

// Cache for loaded dictionaries to avoid repeated imports
const dictionaryCache: Map<Locale, Dictionary> = new Map();

/**
 * Load translation dictionary for a given locale
 * Uses dynamic imports with caching for performance
 */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  // Return from cache if available
  if (dictionaryCache.has(locale)) {
    return dictionaryCache.get(locale)!;
  }

  try {
    // Dynamically import the locale-specific JSON file
    const dictionary = await import(`./dictionaries/${locale}.json`).then(
      (module) => module.default as Dictionary
    );

    // Cache the dictionary
    dictionaryCache.set(locale, dictionary);
    return dictionary;
  } catch (error) {
    console.error(`[i18n] Failed to load dictionary for locale: ${locale}`);

    // Fallback to English if locale fails
    if (locale !== DEFAULT_LOCALE) {
      return getDictionary(DEFAULT_LOCALE);
    }

    // Return empty dictionary as last resort
    return {} as Dictionary;
  }
}

/**
 * Validate and get locale from params
 * Returns default locale if invalid
 */
export function getValidLocale(locale: unknown): Locale {
  if (typeof locale === "string" && SUPPORTED_LOCALES.includes(locale as Locale)) {
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
  return typeof locale === "string" && SUPPORTED_LOCALES.includes(locale as Locale);
}
