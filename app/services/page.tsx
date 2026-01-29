import { Badge } from "@/components/ui/badge"
import { redirect } from "next/navigation";
import { Section, Container, Breadcrumbs, ServiceCard } from "@/components";
import { services } from "@/data/services"; // Assuming services data is imported from a data file

/*
  DEPRECATED: This page has been moved to app/[lang]/services/page.tsx
  All services content is now served with full i18n support (EN, SI, TA, AR)
  
  This file is kept for backward compatibility and will redirect users.
  To access services, use: /en/services, /si/services, /ta/services, or /ar/services
  
  To be removed in v2.0.0 after migration period.
*/

export function ServicesPageDeprecated() {
  redirect("/en/services");
}

const categoryLabels = {
  digital: "Digital Products & Growth",
  infrastructure: "Cloud & Infrastructure",
  security: "Cybersecurity",
  managed: "Managed IT",
};

export function ServicesPage() {
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
          <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />
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

      {/* Services by Category */}
      {Object.entries(groupedServices).map(([category, categoryServices]) => (
        <Section key={category} id={category}>
          <div className="mb-8">
            <Badge variant="outline" className="mb-2">
              {categoryLabels[category as keyof typeof categoryLabels]}
            </Badge>
            <h2 className="text-2xl font-semibold text-foreground">
              {categoryLabels[category as keyof typeof categoryLabels]}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryServices.map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
                variant={service.isFeatured ? "featured" : "default"}
              />
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}
