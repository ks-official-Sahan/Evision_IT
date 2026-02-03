import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { type Locale, SUPPORTED_LOCALES, siteConfig } from "@/lib/config";
import { getValidLocale } from "@/lib/i18n/get-dict";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ServiceCard } from "@/components/cards/service-card";
import { ProcessTimeline } from "@/components/ui/process-timeline";
import {
  getServiceBySlug,
  getRelatedServices,
  getAllServices,
} from "@/lib/cached-data";
import { ArrowRight, CheckCircle2, Sparkles, Zap, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports";

// Icon cache to prevent re-creation of components heavily
const iconCache = new Map<string, React.ComponentType<any>>();

const getIcon = (name: string) => {
  // Normalize PascalCase to kebab-case if needed
  const normalizedName = name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .trim();

  if (!iconCache.has(normalizedName)) {
    const importFn =
      dynamicIconImports[normalizedName as keyof typeof dynamicIconImports];
    if (importFn) {
      iconCache.set(normalizedName, dynamic(importFn));
    } else {
      // Try as-is just in case
      const rawImport =
        dynamicIconImports[name as keyof typeof dynamicIconImports];
      if (rawImport) {
        iconCache.set(normalizedName, dynamic(rawImport));
      }
    }
  }
  return iconCache.get(normalizedName);
};

const DynamicIcon = ({
  name,
  ...props
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) => {
  const LucideIcon = getIcon(name);

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <LucideIcon {...props} />;
};

interface PageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const services = getAllServices();
  const params = [];

  for (const locale of SUPPORTED_LOCALES) {
    for (const service of services) {
      params.push({
        lang: locale,
        slug: service.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = getValidLocale(lang) as Locale;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.title,
    description: service.excerpt,
    openGraph: {
      title: `${service.title} | ${siteConfig.name}`,
      description: service.excerpt,
      url: `${siteConfig.url}/${locale}/services/${slug}`,
      siteName: siteConfig.name,
      type: "article",
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/services/${slug}`,
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((l) => [
          l,
          `${siteConfig.url}/${l}/services/${slug}`,
        ]),
      ),
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { lang, slug } = await params;
  const locale = getValidLocale(lang) as Locale;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Ensure related services fetch works with fallback
  const relatedServices = getRelatedServices(service.relatedServices || []);

  // JSON-LD Schemas
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.excerpt,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    serviceType: service.category,
    areaServed: "Worldwide",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Convert service process steps to Timeline format safely
  const timelineSteps =
    service.process?.map((step) => ({
      title: step.title,
      description: step.description,
    })) || [];

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      {/* SEO-optimized screen reader content */}
      <div className="sr-only">
        <h1>{service.title} Services in Sri Lanka by Evision IT</h1>
        <p>
          Professional {service.title.toLowerCase()} services including{" "}
          {service.features?.slice(0, 3).join(", ")}. We solve challenges like{" "}
          {Array.isArray(service.problems)
            ? service.problems
                .slice(0, 2)
                .map((p: any) => p.title || p)
                .join(", ")
            : "business challenges"}
          . Our proven process ensures quality delivery. Contact Evision IT for
          expert {service.shortTitle.toLowerCase()} solutions.
        </p>
      </div>

      {/* Hero Section */}
      <Section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Background Beams/Gradient */}
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-accent/5 via-transparent to-transparent" />

        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: "Services", href: "/services" },
              { label: service.shortTitle, href: `/services/${slug}` },
            ]}
            locale={locale}
            className="mb-8"
          />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-3xl">
              <Badge
                variant="outline"
                className="mb-6 px-4 py-2 border-accent/30 bg-accent/5 text-accent animate-fade-in"
              >
                {service.category.replace("-", " ").toUpperCase()}
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
                <span className="text-gradient-accent">{service.title}</span>
              </h1>

              <div className="text-lg md:text-xl text-muted-foreground text-pretty mb-8 leading-relaxed">
                <p>{service.description}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="btn-cta btn-glow" asChild>
                  <Link href={`/${locale}/contact` as any}>
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#process">Our Process</a>
                </Button>
              </div>
            </div>

            {/* Visual Element / Icon */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full scale-150" />
                <div className="relative z-10 p-12 rounded-3xl bg-linear-to-br from-background/80 to-background/40 border border-white/10 backdrop-blur-xl shadow-2xl animate-float">
                  <DynamicIcon
                    name={service.icon as any}
                    className="h-32 w-32 text-accent"
                    strokeWidth={1}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Problems We Solve (Bento Grid Style) */}
      {service.problems && service.problems.length > 0 && (
        <Section className="py-16 md:py-24 bg-muted/30">
          <Container>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                Challenges
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Problems We Solve
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We address key business challenges with targeted, effective
                solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.problems.map((problem, index) => (
                <Card
                  key={index}
                  className={cn(
                    "border-none shadow-sm hover:shadow-md transition-all duration-300",
                    index === 0
                      ? "lg:col-span-2 lg:row-span-2 bg-accent/5 border-accent/20"
                      : "bg-card",
                  )}
                >
                  <CardContent className="p-8 h-full flex flex-col justify-center">
                    <div className="mb-4 h-10 w-10 flex items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Zap className="h-5 w-5" />
                    </div>
                    <h3
                      className={cn(
                        "font-bold mb-3",
                        index === 0 ? "text-2xl" : "text-xl",
                      )}
                    >
                      Challenge #{index + 1}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {problem}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Process Section */}
      {service.process && service.process.length > 0 && (
        <Section id="process" className="py-16 md:py-24">
          <Container>
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                Workflow
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Process
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A transparent, step-by-step approach to delivering results.
              </p>
            </div>

            <ProcessTimeline
              steps={timelineSteps}
              className="max-w-5xl mx-auto"
            />
          </Container>
        </Section>
      )}

      {/* Deliverables */}
      {service.deliverables && service.deliverables.length > 0 && (
        <Section className="py-16 md:py-24 section-gradient-1">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">
                  Benefits
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  What You Get
                </h2>
                <p className="text-muted-foreground mb-8">
                  Comprehensive deliverables ensuring high-quality results.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {service.deliverables.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border/50 shadow-sm"
                    >
                      <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                      <span className="font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative lg:h-[400px] rounded-2xl overflow-hidden bg-accent/5 p-8 flex items-center justify-center border border-accent/10">
                <div className="text-center">
                  <Sparkles className="h-16 w-16 text-accent/50 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
                  <p className="text-muted-foreground">
                    We deliver excellence in every project.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* FAQ Section */}
      {service.faqs && service.faqs.length > 0 && (
        <Section className="py-16 md:py-24 bg-muted/30">
          <Container className="max-w-3xl">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                FAQ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Common Questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {service.faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="glass-card px-6 border-none"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
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
        <Section className="py-16 md:py-24">
          <Container>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">Related Services</h2>
                <p className="text-muted-foreground">
                  Explore complementary solutions.
                </p>
              </div>
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link href={`/${locale}/services` as any}>
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedServices.slice(0, 3).map((service) => (
                <ServiceCard
                  key={service.slug}
                  service={service}
                  locale={locale}
                  variant="default"
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
            Let&apos;s discuss how we can help you achieve your business goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-cta">
              <Link href={`/${locale}/contact` as any}>
                Schedule a Consultation
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/${locale}` as any}>Back to Home</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
