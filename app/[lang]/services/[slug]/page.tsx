import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getValidLocale, type Locale } from "@/lib/config";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { ServiceCard } from "@/components/cards/service-card";
import { serviceSchema, faqSchema } from "@/lib/json-ld";
import { siteConfig } from "@/lib/config";
import { services, getServiceBySlug, getRelatedServices } from "@/lib/data";
import { ArrowRight, Check, MessageCircle } from "lucide-react";

interface ServicePageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  return services.flatMap((service) => [
    { lang: "en", slug: service.slug },
    { lang: "si", slug: service.slug },
    { lang: "ta", slug: service.slug },
    { lang: "ar", slug: service.slug },
  ]);
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: `${service.title}`,
      description: service.description,
      url: `${siteConfig.url}/${locale}/services/${service.slug}`,
    },
    alternates: {
      canonical: `/${locale}/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug, lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(service.id, 3);

  return (
    <>
      {/* JSON-LD Markup */}
      <JsonLd data={serviceSchema(service, locale)} />

      {/* Hero Section */}
      <Section padding="lg" className="bg-gradient-to-b from-muted/50 to-background">
        <Container size="sm">
          <Breadcrumbs
            items={[
              { label: "Services", href: `/${locale}/services` },
              { label: service.title, href: `/${locale}/services/${service.slug}` },
            ]}
            locale={locale}
          />

          <div className="mt-8">
            <Badge variant="secondary" className="mb-6">
              {service.category}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance mb-4">
              {service.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
              {service.description}
            </p>
          </div>
        </Container>
      </Section>

      {/* Problems We Solve */}
      <Section>
        <Container size="sm">
          <h2 className="text-3xl font-bold text-foreground mb-8">Problems We Solve</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.problems?.map((problem, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <Check className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <p className="text-foreground">{problem}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Our Process */}
      {service.process && service.process.length > 0 && (
        <Section background="muted">
          <Container size="sm">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Our Process
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step, idx) => (
                <Card key={idx} className="relative">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold">
                        {idx + 1}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Deliverables */}
      {service.deliverables && service.deliverables.length > 0 && (
        <Section>
          <Container size="sm">
            <h2 className="text-3xl font-bold text-foreground mb-8">Deliverables</h2>
            <div className="space-y-3">
              {service.deliverables.map((deliverable, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors"
                >
                  <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{deliverable}</span>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <Section background="muted">
          <Container>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Related Services
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedServices.map((relatedService) => (
                <ServiceCard
                  key={relatedService.slug}
                  service={relatedService}
                  href={`/${locale}/services/${relatedService.slug}`}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* CTA Section */}
      <Section className="text-center">
        <Container size="sm">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Let's discuss how we can help you achieve your business goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-cta">
              <Link href={`/${locale}/contact`}>Schedule a Consultation</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/${locale}`}>Back to Home</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
