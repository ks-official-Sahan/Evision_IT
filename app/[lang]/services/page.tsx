import type { Metadata } from "next";
import { Suspense } from "react";
import { type Locale, SUPPORTED_LOCALES, siteConfig } from "@/lib/config";
import { getValidLocale } from "@/lib/i18n/get-dict";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ServiceCard } from "@/components/cards/service-card";
import { getAllServices, getServicesPageData } from "@/lib/cached-data";
import { Skeleton } from "@/components/ui/skeleton";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;

  return {
    title: "Services",
    description:
      "Explore our full range of IT services including web development, mobile apps, e-commerce, digital marketing, cloud solutions, and cybersecurity.",
    openGraph: {
      title: `Services | ${siteConfig.name}`,
      description:
        "Explore our full range of IT services including web development, mobile apps, e-commerce, digital marketing, cloud solutions, and cybersecurity.",
      url: `${siteConfig.url}/${locale}/services`,
      siteName: siteConfig.name,
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/services`,
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((l) => [l, `${siteConfig.url}/${l}/services`]),
      ),
    },
  };
}

const categoryLabels = {
  digital: "Digital Products & Growth",
  infrastructure: "Cloud & Infrastructure",
  security: "Cybersecurity",
  managed: "Managed IT",
};

// Loading skeleton for service cards
function ServiceCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <Skeleton className="h-12 w-12 rounded-lg" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

// Services list component - can be loaded separately
function ServicesList({ locale }: { locale: Locale }) {
  const services = getAllServices();

  const groupedServices = services.reduce(
    (acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = [];
      }
      acc[service.category].push(service);
      return acc;
    },
    {} as Record<string, typeof services>,
  );

  return (
    <>
      {Object.entries(groupedServices).map(([category, categoryServices]) => (
        <div key={category} className="mb-16 last:mb-0">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            {categoryLabels[category as keyof typeof categoryLabels] ||
              category}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categoryServices.map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
                locale={locale}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default async function ServicesPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;

  return (
    <>
      {/* Hero Section - Static, renders immediately */}
      <Section
        padding="lg"
        className="bg-gradient-to-b from-muted/50 to-background"
      >
        <Container size="sm">
          <Breadcrumbs
            items={[{ label: "Services", href: "/services" }]}
            locale={locale}
          />
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Services
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Full-spectrum IT services
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              From digital products to enterprise infrastructure, we deliver
              expert services tailored to your business needs.
            </p>
          </div>
        </Container>
      </Section>

      {/* Services by Category - Wrapped in Suspense for streaming */}
      <Section>
        <Container>
          <Suspense
            fallback={
              <div className="mb-16">
                <Skeleton className="h-8 w-64 mb-8" />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <ServiceCardSkeleton key={i} />
                  ))}
                </div>
              </div>
            }
          >
            <ServicesList locale={locale} />
          </Suspense>
        </Container>
      </Section>
    </>
  );
}
