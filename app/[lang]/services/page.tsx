import type { Metadata } from "next";
import { Suspense } from "react";
import { type Locale, SUPPORTED_LOCALES, siteConfig } from "@/lib/config";
import { getValidLocale } from "@/lib/i18n/get-dict";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ServiceCard } from "@/components/cards/service-card";
import { CategoryNav } from "@/components/ui/category-nav";
import { getAllServices } from "@/lib/cached-data";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles } from "lucide-react";

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

// Categories for Navigation
// Categories for Navigation
const categories = [
  { id: "digital", label: "Digital Products" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "security", label: "Cybersecurity" },
  { id: "managed", label: "Managed IT" },
];

// Loading skeleton for service cards
function ServiceCardSkeleton() {
  return (
    <div className="rounded-2xl border bg-card/50 p-6 space-y-4">
      <Skeleton className="h-12 w-12 rounded-lg" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

// Services list component
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
      <div className="space-y-24">
        {Object.entries(groupedServices).map(([category, categoryServices]) => (
          <div key={category} id={category} className="scroll-mt-32">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-bold text-foreground">
                {categoryLabels[category as keyof typeof categoryLabels] ||
                  category}
              </h2>
              <div className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
            </div>

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
      </div>
    </>
  );
}

export default async function ServicesPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;

  return (
    <>
      {/* SEO-optimized screen reader heading */}
      <h1 className="sr-only">
        IT Services in Sri Lanka - Web Development, Mobile Apps, Cloud
        Solutions, Cybersecurity | Evision IT
      </h1>

      {/* Hero Section */}
      <Section padding="lg" className="relative overflow-hidden pt-24 md:pt-32">
        {/* Background Beams/Gradient */}
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-accent/5 via-transparent to-transparent" />

        <Container className="relative z-10">
          <Breadcrumbs
            items={[{ label: "Services", href: "/services" }]}
            locale={locale}
            className="mb-8"
          />

          <div className="max-w-4xl">
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 border-accent/30 bg-accent/5 text-accent animate-fade-in"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Comprehensive Expertise
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              <span className="text-foreground">Full-Spectrum </span>
              <span className="text-gradient-accent">IT Services</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mb-8">
              From crafting digital products to securing enterprise
              infrastructure, we deliver expert services tailored to drive your
              business forward.
            </p>
          </div>
        </Container>
      </Section>

      {/* Main Content with Sticky Sidebar */}
      <Section className="pb-24 pt-0">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Navigation (Desktop) */}
            <aside className="hidden lg:block w-64 shrink-0">
              <CategoryNav categories={categories} activeCategory="digital" />
            </aside>

            {/* Mobile Navigation (Horizontal scroll) - could be added if needed, or stick to simple vertical layout */}

            {/* Services Content */}
            <div className="flex-1 min-w-0">
              <Suspense
                fallback={
                  <div className="space-y-16">
                    {[1, 2].map((i) => (
                      <div key={i}>
                        <Skeleton className="h-8 w-64 mb-8" />
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                          {[...Array(3)].map((_, k) => (
                            <ServiceCardSkeleton key={k} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                }
              >
                <ServicesList locale={locale} />
              </Suspense>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
