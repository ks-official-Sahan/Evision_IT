import React from "react"
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Icon as Icons } from "lucide-react";
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
import {
  services,
  getServiceBySlug,
  getRelatedServices,
} from "@/lib/data";
import { ArrowRight, Check, MessageCircle } from "lucide-react";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
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
      title: `${service.title} | Evision`,
      description: service.description,
      url: `${siteConfig.url}/services/${service.slug}`,
    },
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(service.relatedServices);
  const IconComponent = Icons[service.icon as keyof typeof Icons] as React.ElementType;

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      {service.faqs.length > 0 && <JsonLd data={faqSchema(service.faqs)} />}

      {/* Hero */}
      <Section padding="lg" className="bg-gradient-to-b from-muted/50 to-background">
        <Container size="sm">
          <Breadcrumbs
            items={[
              { label: "Services", href: "/services" },
              { label: service.title, href: `/services/${service.slug}` },
            ]}
          />

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                {IconComponent && (
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <IconComponent className="h-7 w-7" />
                  </div>
                )}
                {service.isFeatured && <Badge>Popular Service</Badge>}
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {service.description}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Get a Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a
                    href={siteConfig.links.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features & Benefits */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">What&apos;s Included</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* FAQ */}
      {service.faqs.length > 0 && (
        <Section background="muted">
          <Container size="sm">
            <div className="text-center mb-10">
              <Badge variant="secondary" className="mb-4">
                FAQ
              </Badge>
              <h2 className="text-3xl font-semibold text-foreground">
                Common questions about {service.shortTitle}
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {service.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-foreground hover:text-accent">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Container>
        </Section>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <Section>
          <div className="text-center mb-10">
            <Badge variant="secondary" className="mb-4">
              Related Services
            </Badge>
            <h2 className="text-3xl font-semibold text-foreground">
              You might also be interested in
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((relatedService) => (
              <ServiceCard key={relatedService.slug} service={relatedService} />
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section background="primary" className="text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to get started with {service.shortTitle}?
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Let&apos;s discuss your project requirements and create a tailored
            solution for your business.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Book Free Consultation</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
