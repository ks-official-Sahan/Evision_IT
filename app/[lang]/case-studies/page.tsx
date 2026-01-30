import { Suspense } from "react";
import { type Locale } from "@/lib/config";
import { getValidLocale, getDictionary } from "@/lib/i18n/get-dict";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CaseStudiesClientContent } from "./client-content";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function CaseStudiesPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);
  const caseStudiesDict = dict?.caseStudies || {};

  return (
    <>
      {/* Hero Section */}
      <Section
        padding="lg"
        className="bg-gradient-to-b from-muted/50 to-background"
      >
        <Container size="sm">
          <Breadcrumbs
            items={[
              {
                label: caseStudiesDict.title || "Case Studies",
                href: `/${locale}/case-studies`,
              },
            ]}
            locale={locale}
          />

          <div className="mt-8 text-center">
            <Badge variant="secondary" className="mb-6">
              {caseStudiesDict.badge || "Case Studies"}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance mb-4">
              {caseStudiesDict.headline || "Real results from real projects"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              {caseStudiesDict.subheadline ||
                "See how we've helped businesses across industries achieve their digital transformation goals."}
            </p>
          </div>
        </Container>
      </Section>

      {/* Client-side filters and grid */}
      <Suspense fallback={<div className="h-96 animate-pulse bg-muted" />}>
        <CaseStudiesClientContent locale={locale} dict={dict} />
      </Suspense>
    </>
  );
}
