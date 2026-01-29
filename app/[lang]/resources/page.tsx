import { Suspense } from "react";
import { getValidLocale, type Locale } from "@/lib/config";
import { getDictionary } from "@/lib/i18n/get-dict";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export const dynamic = "force-static";

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);

  return {
    title: `Resources | Evision IT`,
    description: "Educational resources and guides for digital transformation",
    openGraph: {
      title: "Resources",
      description: "Educational resources and guides for digital transformation",
      type: "website",
    },
  };
}

export default async function ResourcesPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);

  const resources = [
    {
      id: "guides",
      title: "Implementation Guides",
      description: "Step-by-step guides for implementing digital solutions",
      count: 12,
    },
    {
      id: "case-studies",
      title: dict.caseStudies.title,
      description: "Learn from real-world project examples",
      count: 15,
    },
    {
      id: "webinars",
      title: "Webinars & Workshops",
      description: "Live training sessions and recorded workshops",
      count: 8,
    },
    {
      id: "documentation",
      title: "Technical Documentation",
      description: "Comprehensive API and integration documentation",
      count: 25,
    },
    {
      id: "whitepapers",
      title: "Whitepapers",
      description: "In-depth research and industry insights",
      count: 6,
    },
    {
      id: "templates",
      title: "Templates & Checklists",
      description: "Ready-to-use templates for planning and execution",
      count: 20,
    },
  ];

  return (
    <>
      <Section padding="lg" className="bg-gradient-to-b from-muted/50 to-background">
        <Container size="sm">
          <Breadcrumbs
            items={[
              { label: "Resources", href: `/${locale}/resources` },
            ]}
            locale={locale}
          />

          <div className="mt-8 text-center">
            <Badge variant="secondary" className="mb-6">
              Resources
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance mb-4">
              Learning Resources
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Guides, documentation, and tools to help you succeed
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <Card key={resource.id} className="glass hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {resource.count} {resource.count === 1 ? "item" : "items"}
                    </span>
                    <Button variant="outline" size="sm">
                      {dict.cta.secondary}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
