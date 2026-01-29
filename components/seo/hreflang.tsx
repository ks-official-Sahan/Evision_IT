import { generateHreflangs } from "@/lib/hreflang";
import type { Locale } from "@/lib/config";

interface HreflangProps {
  path: string;
  locale: Locale;
}

/**
 * Hreflang component for SEO
 * Renders alternate link tags for each supported language version of a page
 */
export function Hreflang({ path, locale }: HreflangProps) {
  const hreflangs = generateHreflangs(path, locale);

  return (
    <>
      {hreflangs.map((link) => (
        <link
          key={link.hrefLang}
          rel={link.rel}
          hrefLang={link.hrefLang}
          href={link.href}
        />
      ))}
    </>
  );
}

/**
 * Hreflang metadata object for use with Next.js metadata API
 */
export function getHreflangMetadata(path: string, locale: Locale) {
  const hreflangs = generateHreflangs(path, locale);

  return {
    alternates: {
      languages: Object.fromEntries(
        hreflangs
          .filter((link) => link.hrefLang !== "x-default")
          .map((link) => [link.hrefLang, link.href])
      ),
      canonical: hreflangs.find((link) => link.hrefLang.startsWith(locale))
        ?.href,
    },
  };
}
