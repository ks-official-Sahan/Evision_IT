import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Quote } from "lucide-react";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { HeroArticle } from "@/components/ui/hero-article";
import { ResultsMetrics } from "@/components/ui/results-metrics";
import { GlassCardArticle } from "@/components/ui/glass-card-article";

import {
  getCaseStudyBySlug,
  getRelatedCaseStudies,
  caseStudies,
} from "@/lib/data";
import { caseStudySchema, breadcrumbSchema } from "@/lib/json-ld";
import { siteConfig, type Locale, SUPPORTED_LOCALES } from "@/lib/config";
import { getValidLocale } from "@/lib/i18n/get-dict";

interface CaseStudyPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

// Generate static params for all case studies across all locales
export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];

  for (const locale of SUPPORTED_LOCALES) {
    for (const caseStudy of caseStudies) {
      params.push({ lang: locale, slug: caseStudy.slug });
    }
  }

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = getValidLocale(lang) as Locale;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  const url = `${siteConfig.url}/${locale}/case-studies/${slug}`;

  return {
    title: `${caseStudy.title} | Case Study`,
    description: caseStudy.excerpt,
    keywords: [
      caseStudy.category,
      caseStudy.client,
      ...caseStudy.services,
      "case study",
      "success story",
    ],
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.excerpt,
      url,
      type: "article",
      images: [
        {
          url: caseStudy.image,
          width: 1200,
          height: 630,
          alt: caseStudy.title,
        },
      ],
      publishedTime: caseStudy.publishedAt,
      section: "Case Studies",
    },
    twitter: {
      card: "summary_large_image",
      title: caseStudy.title,
      description: caseStudy.excerpt,
      images: [caseStudy.image],
    },
    alternates: {
      canonical: url,
      languages: SUPPORTED_LOCALES.reduce(
        (acc, l) => ({
          ...acc,
          [l]: `${siteConfig.url}/${l}/case-studies/${slug}`,
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

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { lang, slug } = await params;
  const locale = getValidLocale(lang) as Locale;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const relatedCaseStudies = getRelatedCaseStudies(slug, 3);

  // Breadcrumb items for SEO schema
  const breadcrumbItems = [
    { name: "Home", url: `${siteConfig.url}/${locale}` },
    { name: "Case Studies", url: `${siteConfig.url}/${locale}/case-studies` },
    {
      name: caseStudy.title,
      url: `${siteConfig.url}/${locale}/case-studies/${slug}`,
    },
  ];

  return (
    <>
      {/* Structured Data */}
      <JsonLd data={caseStudySchema(caseStudy, locale)} />
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />

      {/* Hero Section */}
      <HeroArticle
        type="case-study"
        breadcrumbs={[
          { label: "Home", href: `/${locale}` },
          { label: "Case Studies", href: `/${locale}/case-studies` },
          { label: caseStudy.client },
        ]}
        category={caseStudy.category}
        title={caseStudy.title}
        excerpt={caseStudy.excerpt}
        image={caseStudy.image}
        imageAlt={`${caseStudy.client} case study`}
        metadata={{
          date: caseStudy.publishedAt,
          client: caseStudy.client,
        }}
      />

      {/* Main Content Area */}
      <main id="main-content">
        {/* Results Section - Key Performance Metrics */}
        <Section
          className="py-12 md:py-16 bg-muted/30"
          aria-labelledby="results-heading"
        >
          <Container>
            <h2
              id="results-heading"
              className="text-2xl md:text-3xl font-bold text-center mb-8"
            >
              Key Results
            </h2>
            {/* SEO: Metrics demonstrate measurable business impact */}
            <p className="sr-only">
              Measurable outcomes achieved for {caseStudy.client} including
              performance improvements, revenue growth, and operational
              efficiency gains through our {caseStudy.category.toLowerCase()}{" "}
              solutions.
            </p>
            <ResultsMetrics results={caseStudy.results} />
          </Container>
        </Section>

        {/* Services Used */}
        <Section className="py-12 md:py-16" aria-labelledby="services-heading">
          <Container>
            <div className="max-w-3xl mx-auto">
              <h2 id="services-heading" className="text-xl font-semibold mb-4">
                Services Delivered
              </h2>
              {/* SEO: Internal linking to service pages */}
              <p className="sr-only">
                Professional services provided to {caseStudy.client} including
                {caseStudy.services.join(", ")}.
              </p>
              <div className="flex flex-wrap gap-2">
                {caseStudy.services.map((service) => (
                  <Link
                    key={service}
                    href={`/${locale}/services/${service}`}
                    className="group"
                  >
                    <Badge
                      variant="outline"
                      className="px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors cursor-pointer"
                    >
                      {service
                        .split("-")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ")}
                      <ExternalLink className="w-3 h-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Content Section */}
        <Section className="py-12 md:py-16 bg-muted/20">
          <Container>
            <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
              <h2>About This Project</h2>
              <p>{caseStudy.content}</p>

              {/* Placeholder for future rich content */}
              <div className="not-prose my-8 p-6 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50">
                <p className="text-muted-foreground text-sm text-center">
                  Full case study details coming soon. Contact us for more
                  information.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* Testimonial Section */}
        {caseStudy.testimonial && (
          <Section className="py-16 md:py-24">
            <Container>
              <div className="max-w-4xl mx-auto text-center">
                <Quote
                  className="w-12 h-12 mx-auto mb-6 text-accent/50"
                  aria-hidden="true"
                />
                <blockquote className="text-2xl md:text-3xl font-medium text-foreground italic mb-6 text-balance">
                  "{caseStudy.testimonial.quote}"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                    {caseStudy.testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">
                      {caseStudy.testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {caseStudy.testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </Container>
          </Section>
        )}

        {/* Related Case Studies */}
        {relatedCaseStudies.length > 0 && (
          <Section
            className="py-12 md:py-16 bg-muted/30"
            aria-labelledby="related-heading"
          >
            <Container>
              <h2
                id="related-heading"
                className="text-2xl md:text-3xl font-bold mb-8"
              >
                Related Success Stories
              </h2>
              <p className="sr-only">
                Explore more success stories similar to {caseStudy.client}
                &apos;s project in the {caseStudy.category} category.
              </p>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedCaseStudies.map((related) => (
                  <GlassCardArticle
                    key={related.slug}
                    href={`/${locale}/case-studies/${related.slug}`}
                    image={related.image}
                    imageAlt={`${related.client} case study`}
                    category={related.category}
                    title={related.title}
                    excerpt={related.excerpt}
                    metadata={{ date: related.publishedAt }}
                  />
                ))}
              </div>
            </Container>
          </Section>
        )}
      </main>

      {/* Back Navigation */}
      <Section className="py-8 md:py-12">
        <Container className="text-center">
          <Link href={`/${locale}/case-studies`}>
            <Button variant="outline" size="lg" className="group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Case Studies
            </Button>
          </Link>
        </Container>
      </Section>

      {/* CTA Section - Lead Generation */}
      <Section
        className="py-16 md:py-24 bg-linear-to-br from-accent/10 via-background to-background"
        aria-labelledby="cta-heading"
      >
        <Container className="text-center">
          <h2 id="cta-heading" className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Achieve Similar Results?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help transform your business with
            tailored IT solutions.
          </p>
          {/* SEO: CTA encourages user engagement */}
          <p className="sr-only">
            Contact {siteConfig.name} today to discuss your digital
            transformation project. We specialize in delivering measurable
            results like those achieved for {caseStudy.client}.
          </p>
          <Link href={`/${locale}/contact`}>
            <Button size="lg" className="btn-glow">
              Start Your Project
            </Button>
          </Link>
        </Container>
      </Section>
    </>
  );
}
