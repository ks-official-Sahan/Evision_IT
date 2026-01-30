import React from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "@/components/analytics/google-tag-manager";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/json-ld";
import { siteConfig, SUPPORTED_LOCALES, DEFAULT_LOCALE, LOCALE_LABELS, type Locale } from "@/lib/config";
import { getValidLocale } from "@/lib/i18n/get-dict";
import "@/app/globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

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
    keywords: [
      "web development",
      "mobile apps",
      "e-commerce",
      "digital marketing",
      "SEO",
      "cloud solutions",
      "cybersecurity",
      "IT services",
      "Sri Lanka",
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
        { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
        { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-icon.png",
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: SUPPORTED_LOCALES.reduce(
        (acc, l) => ({
          ...acc,
          [l]: `${siteConfig.url}/${l}`,
        }),
        {}
      ),
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1c1e" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
};

// Generate static params for all supported locales
export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const localeLabel = LOCALE_LABELS[locale];
  const direction = localeLabel.dir;

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <GoogleTagManager />
        {/* Alternate language links for SEO */}
        {SUPPORTED_LOCALES.map((altLocale) => (
          <link
            key={altLocale}
            rel="alternate"
            hrefLang={altLocale}
            href={`${siteConfig.url}/${altLocale}`}
          />
        ))}
        {/* Canonical URL */}
        <link rel="canonical" href={`${siteConfig.url}/${locale}`} />
      </head>
      <body className="font-sans antialiased">
        <GoogleTagManagerNoScript />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Skip to content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-md focus:outline-none"
          >
            Skip to main content
          </a>

          <div className="relative flex min-h-screen flex-col">
            {/* <SiteHeader locale={locale} /> */}
            <main id="main-content" className="flex-1">
              {children}
            </main>
            {/* <SiteFooter locale={locale} /> */}
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
