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
import { blogPosts, getFeaturedBlogPosts } from "@/lib/data";
import { BlogClientContent } from "./client-content";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);
  const blogDict = dict?.blog || {};

  const title = blogDict.title || "Blog";
  const description =
    blogDict.subheadline ||
    "Stay updated with our latest articles on digital transformation, IT strategy, and industry trends.";

  return {
    title,
    description,
    keywords: [
      "tech blog",
      "digital transformation",
      "IT strategy",
      "web development",
      "cybersecurity",
      "cloud computing",
      "business technology",
      "Sri Lanka IT",
    ],
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/${locale}/blog`,
      type: "website",
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} Blog`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/blog`,
      languages: SUPPORTED_LOCALES.reduce(
        (acc, l) => ({
          ...acc,
          [l]: `${siteConfig.url}/${l}/blog`,
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

function BlogSkeleton() {
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
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function BlogPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);
  const blogDict = dict?.blog || {};

  // Get featured posts for spotlight
  const featuredPosts = getFeaturedBlogPosts(3);

  // Prepare collection page schema
  const collectionItems = blogPosts.map((post) => ({
    name: post.title,
    url: `${siteConfig.url}/${locale}/blog/${post.slug}`,
  }));

  const breadcrumbItems = [
    { name: "Home", url: `${siteConfig.url}/${locale}` },
    { name: "Blog", url: `${siteConfig.url}/${locale}/blog` },
  ];

  return (
    <>
      {/* Structured Data */}
      <JsonLd
        data={collectionPageSchema(
          blogDict.title || "Blog",
          blogDict.subheadline ||
            "Latest insights on digital transformation and IT strategy",
          collectionItems,
          locale,
        )}
      />
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />

      {/* Hero Section */}
      <Section
        padding="lg"
        className="relative overflow-hidden bg-linear-to-b from-muted/50 via-muted/30 to-background"
        aria-labelledby="blog-hero-heading"
      >
        {/* Decorative elements */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          aria-hidden="true"
        >
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/5 w-56 h-56 bg-primary/10 rounded-full blur-2xl" />
        </div>

        <Container size="sm" className="relative z-10">
          <Breadcrumbs
            items={[
              { label: blogDict.title || "Blog", href: `/${locale}/blog` },
            ]}
            locale={locale}
          />

          <header className="mt-8 text-center">
            <Badge
              variant="secondary"
              className="mb-6 bg-accent/20 text-accent border-accent/30"
            >
              {blogDict.badge || "Insights & Resources"}
            </Badge>
            <h1
              id="blog-hero-heading"
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance mb-4"
            >
              {blogDict.headline || "Latest Insights & Tips"}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              {blogDict.subheadline ||
                "Stay updated with our latest articles on digital transformation, IT strategy, and industry trends."}
            </p>

            {/* SEO-optimized sr-only description */}
            <p className="sr-only">
              Explore {siteConfig.name}&apos;s technology blog featuring expert
              insights on web development, cloud computing, cybersecurity, and
              digital transformation strategies for businesses in Sri Lanka and
              globally. Our articles cover best practices, industry trends, and
              practical guides to help your business thrive in the digital age.
            </p>
          </header>
        </Container>
      </Section>

      {/* Main Content - Client-side search, filters, and grid */}
      <main id="main-content">
        <Suspense
          fallback={
            <Section>
              <Container>
                <BlogSkeleton />
              </Container>
            </Section>
          }
        >
          <BlogClientContent
            locale={locale}
            dict={dict}
            featuredPosts={featuredPosts}
          />
        </Suspense>
      </main>
    </>
  );
}
