import type { Metadata } from "next";
import { getValidLocale, type Locale } from "@/lib/config";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ServiceCard } from "@/components/cards/service-card";
import { services } from "@/lib/data";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;

  return {
    title: "Services",
    description:
      "Explore our full range of IT services including web development, mobile apps, e-commerce, digital marketing, cloud solutions, and cybersecurity.",
    openGraph: {
      title: "Services",
      description:
        "Explore our full range of IT services including web development, mobile apps, e-commerce, digital marketing, cloud solutions, and cybersecurity.",
    },
  };
}

const categoryLabels = {
  digital: "Digital Products & Growth",
  infrastructure: "Cloud & Infrastructure",
  security: "Cybersecurity",
  managed: "Managed IT",
};

export default async function ServicesPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;

  const groupedServices = services.reduce(
    (acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = [];
      }
      acc[service.category].push(service);
      return acc;
    },
    {} as Record<string, typeof services>
  );

  return (
    <>
      {/* Hero */}
      <Section padding="lg" className="bg-gradient-to-b from-muted/50 to-background">
        <Container size="sm">
          <Breadcrumbs
            items={[{ label: "Services", href: `/${locale}/services` }]}
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
              From digital products to enterprise infrastructure, we deliver expert services
              tailored to your business needs.
            </p>
          </div>
        </Container>
      </Section>

      {/* Services by Category */}
      <Section>
        <Container>
          {Object.entries(groupedServices).map(([category, categoryServices]) => (
            <div key={category} className="mb-16 last:mb-0">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                {categoryLabels[category as keyof typeof categoryLabels] || category}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categoryServices.map((service) => (
                  <ServiceCard
                    key={service.slug}
                    service={service}
                    href={`/${locale}/services/${service.slug}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </Container>
      </Section>
    </>
  );
}
