import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { ServiceCard } from "@/components/cards/service-card";
import { caseStudySchema } from "@/lib/json-ld";
import { siteConfig } from "@/lib/config";
import {
  caseStudies,
  getCaseStudyBySlug,
  getRelatedServices,
} from "@/lib/data";
import { ArrowRight, Quote } from "lucide-react";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: caseStudy.title,
    description: caseStudy.excerpt,
    openGraph: {
      title: `${caseStudy.title} | Evision`,
      description: caseStudy.excerpt,
      url: `${siteConfig.url}/case-studies/${caseStudy.slug}`,
      images: [{ url: caseStudy.image }],
    },
    alternates: {
      canonical: `/case-studies/${caseStudy.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const relatedServices = getRelatedServices(caseStudy.services);

  return (
    <>
      <JsonLd data={caseStudySchema(caseStudy)} />

      {/* Hero */}
      <Section padding="lg" className="bg-gradient-to-b from-muted/50 to-background">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Case Studies", href: "/case-studies" },
              { label: caseStudy.client, href: `/case-studies/${caseStudy.slug}` },
            ]}
          />

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                {caseStudy.category}
              </Badge>
              <p className="text-sm font-medium text-accent uppercase tracking-wide mb-2">
                {caseStudy.client}
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
                {caseStudy.title}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {caseStudy.excerpt}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {caseStudy.services.map((serviceSlug) => (
                  <Badge key={serviceSlug} variant="outline">
                    {serviceSlug.replace(/-/g, " ")}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
              <Image
                src={caseStudy.image || "/placeholder.svg"}
                alt={caseStudy.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Results */}
      <Section background="muted">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4">
            Results
          </Badge>
          <h2 className="text-3xl font-semibold text-foreground">
            Measurable outcomes
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {caseStudy.results.map((result) => (
            <Card key={result.metric} className="text-center">
              <CardContent className="pt-8 pb-6">
                <div className="text-4xl font-bold text-accent">
                  {result.value}
                </div>
                <div className="mt-2 text-lg font-medium text-foreground">
                  {result.metric}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {result.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Testimonial */}
      {caseStudy.testimonial && (
        <Section>
          <Container size="sm">
            <Card className="border-accent/30 bg-accent/5">
              <CardContent className="pt-8 pb-6 px-8 text-center">
                <Quote className="h-10 w-10 text-accent mx-auto mb-4" />
                <blockquote className="text-xl text-foreground leading-relaxed italic">
                  &ldquo;{caseStudy.testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-6">
                  <p className="font-semibold text-foreground">
                    {caseStudy.testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {caseStudy.testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Container>
        </Section>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <Section background="muted">
          <div className="text-center mb-10">
            <Badge variant="secondary" className="mb-4">
              Services Used
            </Badge>
            <h2 className="text-3xl font-semibold text-foreground">
              Technologies & services
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section background="primary" className="text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Want similar results for your business?
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Let&apos;s discuss how we can help you achieve your goals.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
