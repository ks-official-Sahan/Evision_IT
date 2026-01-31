import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { JsonLd } from "@/components/seo/json-ld";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  entityAuthoritySchema,
} from "@/lib/json-ld";
import {
  siteConfig,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_LABELS,
  type Locale,
} from "@/lib/config";
import { getValidLocale } from "@/lib/i18n/get-dict";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

// Generate metadata with locale-aware content
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const localeLabel = LOCALE_LABELS[locale];

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${siteConfig.tagline}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.seo?.keywords || [
      "web development",
      "mobile apps",
      "e-commerce",
      "digital marketing",
      "SEO",
      "cloud solutions",
      "cybersecurity",
      "IT services",
      "Sri Lanka",
      "Evision IT",
    ],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_AE" : `${locale}_${locale.toUpperCase()}`,
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: `${siteConfig.name} — ${siteConfig.tagline}`,
      description: siteConfig.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} — ${siteConfig.tagline}`,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: "@evisionit",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      other: {
        "msvalidate.01": siteConfig.analytics.bingVerification,
      },
    },
    icons: {
      icon: [
        {
          url: "/light-favicon-32x32.png",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/dark-favicon-32x32.png",
          media: "(prefers-color-scheme: dark)",
        },
        { url: "/favicon.ico", type: "image/x-icon" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-icon.png",
    },
    manifest: "/site.webmanifest",
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: SUPPORTED_LOCALES.reduce(
        (acc, l) => ({
          ...acc,
          [l]: `${siteConfig.url}/${l}`,
        }),
        { "x-default": `${siteConfig.url}/en` },
      ),
    },
  };
}

// Generate static params for all supported locales
export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const localeLabel = LOCALE_LABELS[locale];
  const direction = localeLabel.dir;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      // enableSystem
      storageKey="evision-theme"
      disableTransitionOnChange={false}
    >
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Structured Data */}
      <JsonLd data={organizationSchema(locale)} />
      <JsonLd data={websiteSchema()} />
      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={entityAuthoritySchema()} />

      {/* Alternate language links for SEO - kept here as they depend on config */}
      {SUPPORTED_LOCALES.map((altLocale) => (
        <React.Fragment key={altLocale}>
          {/* Link tags inside body/div are not ideal but Next.js deduplicates head tags if Metadata API used. 
               However, manual <link> in body is ignored for head purposes.
               We should rely on generateMetadata for these. 
               The generateMetadata function ALREADY handles alternates.
               So we can remove these manual link tags as they are redundant and misplaced in a child layout.
           */}
        </React.Fragment>
      ))}

      <div dir={direction} className="relative flex min-h-screen flex-col">
        <SiteHeader locale={locale} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} />
      </div>
    </ThemeProvider>
  );
}
