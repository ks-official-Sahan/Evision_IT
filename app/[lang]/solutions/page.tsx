import { Suspense } from "react";
import { type Locale } from "@/lib/config";
import { getDictionary, getValidLocale } from "@/lib/i18n/get-dict";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { organizationSchema } from "@/lib/json-ld";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export const dynamic = "force-static";

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);

  return {
    title: `${dict.solutions.title} | Evision IT`,
    description: dict.common.description,
    openGraph: {
      title: dict.solutions.title,
      description: dict.common.description,
      type: "website",
    },
  };
}

export default async function SolutionsPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);

  const solutions = [
    {
      id: "digital-products",
      title: dict.solutions.digitalProducts.name,
      description: dict.solutions.digitalProducts.description,
      icon: "🚀",
      features: dict.solutions.digitalProducts.features || [],
    },
    {
      id: "it-infrastructure",
      title: dict.solutions.itInfrastructure.name,
      description: dict.solutions.itInfrastructure.description,
      icon: "🏗️",
      features: dict.solutions.itInfrastructure.features || [],
    },
    {
      id: "managed-support",
      title: dict.solutions.managedSupport.name,
      description: dict.solutions.managedSupport.description,
      icon: "🛡️",
      features: dict.solutions.managedSupport.features || [],
    },
  ];

  const schemaMarkup = organizationSchema(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <Section
        padding="lg"
        className="bg-gradient-to-b from-muted/50 to-background"
      >
        <Container size="sm">
          <Breadcrumbs
            items={[
              { label: dict.nav.solutions, href: `/${locale}/solutions` },
            ]}
            locale={locale}
          />

          <div className="mt-8 text-center">
            <Badge variant="secondary" className="mb-6">
              {dict.solutions.title}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance mb-4">
              {dict.solutions.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              {dict.common.description}
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution) => (
              <Card
                key={solution.id}
                className="glass hover:shadow-lg transition-all"
              >
                <CardHeader>
                  <div className="text-4xl mb-2">{solution.icon}</div>
                  <CardTitle>{solution.title}</CardTitle>
                  <CardDescription>{solution.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    {solution.features.map((feature: string) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    {dict.cta.secondary}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
