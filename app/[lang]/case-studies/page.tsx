import { Suspense } from "react";
import type { Metadata } from "next";
import { type Locale, siteConfig, SUPPORTED_LOCALES } from "@/lib/config";
import { getValidLocale, getDictionary } from "@/lib/i18n/get-dict";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { collectionPageSchema, breadcrumbSchema } from "@/lib/json-ld";
import { caseStudies } from "@/lib/data";
import { CaseStudiesClientContent } from "./client-content";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);
  const caseStudiesDict = dict?.caseStudies || {};

  const title = caseStudiesDict.title || "Case Studies";
  const description =
    caseStudiesDict.subheadline ||
    "See how we've helped businesses across industries achieve their digital transformation goals.";

  return {
    title,
    description,
    keywords: [
      "case studies",
      "success stories",
      "digital transformation",
      "web development portfolio",
      "e-commerce success",
      "IT solutions",
      "business results",
      "Sri Lanka IT company",
    ],
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/${locale}/case-studies`,
      type: "website",
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} Case Studies & Success Stories`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/case-studies`,
      languages: SUPPORTED_LOCALES.reduce(
        (acc, l) => ({
          ...acc,
          [l]: `${siteConfig.url}/${l}/case-studies`,
        }),
        {},
      ),
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

function CaseStudiesSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="rounded-2xl overflow-hidden bg-card/50 border border-border/30"
        >
          <Skeleton className="h-48 w-full" />
          <div className="p-5 space-y-3">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function CaseStudiesPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);
  const caseStudiesDict = dict?.caseStudies || {};

  // Prepare collection page schema
  const collectionItems = caseStudies.map((cs) => ({
    name: cs.title,
    url: `${siteConfig.url}/${locale}/case-studies/${cs.slug}`,
  }));

  const breadcrumbItems = [
    { name: "Home", url: `${siteConfig.url}/${locale}` },
    { name: "Case Studies", url: `${siteConfig.url}/${locale}/case-studies` },
  ];

  return (
    <>
      {/* Structured Data */}
      <JsonLd
        data={collectionPageSchema(
          caseStudiesDict.title || "Case Studies",
          caseStudiesDict.subheadline ||
            "Our portfolio of successful digital transformation projects",
          collectionItems,
          locale,
        )}
      />
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />

      {/* Hero Section */}
      <Section
        padding="lg"
        className="relative overflow-hidden bg-linear-to-b from-muted/50 via-muted/30 to-background"
        aria-labelledby="case-studies-hero-heading"
      >
        {/* Decorative elements */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          aria-hidden="true"
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/10 rounded-full blur-2xl" />
        </div>

        <Container size="sm" className="relative z-10">
          <Breadcrumbs
            items={[
              {
                label: caseStudiesDict.title || "Case Studies",
                href: `/${locale}/case-studies`,
              },
            ]}
            locale={locale}
          />

          <header className="mt-8 text-center">
            <Badge
              variant="secondary"
              className="mb-6 bg-accent/20 text-accent border-accent/30"
            >
              {caseStudiesDict.badge || "Success Stories"}
            </Badge>
            <h1
              id="case-studies-hero-heading"
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance mb-4"
            >
              {caseStudiesDict.headline || "Real Results from Real Projects"}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              {caseStudiesDict.subheadline ||
                "See how we've helped businesses across industries achieve their digital transformation goals."}
            </p>

            {/* SEO-optimized sr-only description for AEO/GEO */}
            <p className="sr-only">
              Explore {siteConfig.name}&apos;s portfolio of successful projects
              including e-commerce transformations, enterprise web applications,
              mobile app development, and digital marketing campaigns. Our case
              studies demonstrate measurable results such as revenue growth,
              improved user engagement, and operational efficiency for
              businesses in Sri Lanka and internationally.
            </p>
          </header>
        </Container>
      </Section>

      {/* Main Content - Client-side filters and grid */}
      <main id="main-content">
        <Suspense
          fallback={
            <Section>
              <Container>
                <CaseStudiesSkeleton />
              </Container>
            </Section>
          }
        >
          <CaseStudiesClientContent locale={locale} dict={dict} />
        </Suspense>
      </main>
    </>
  );
}
