import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, Cloud, Shield, Settings, ArrowRight } from "@/components/icons"
import { Section, Container, Breadcrumbs } from "@/components/ui"
import { Metadata } from "next"
import { getServicesByCategory } from "@/lib/services"
import { ServiceCard } from "@/components/service-card"

/*
  DEPRECATED: This page has been moved to app/[lang]/solutions/page.tsx
  All solutions content is now served with full i18n support (EN, SI, TA, AR)
  
  This file is kept for backward compatibility and will redirect users.
  To access solutions, use: /en/solutions, /si/solutions, /ta/solutions, or /ar/solutions
  
  To be removed in v2.0.0 after migration period.
*/

import { redirect } from "next/navigation";

export default function SolutionsPageDeprecated() {
  redirect("/en/solutions");
}

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Comprehensive IT solutions for digital products, cloud infrastructure, cybersecurity, and managed services.",
  openGraph: {
    title: "Solutions | Evision",
    description:
      "Comprehensive IT solutions for digital products, cloud infrastructure, cybersecurity, and managed services.",
  },
};

const solutionCategories = [
  {
    id: "digital",
    icon: Palette,
    title: "Digital Products & Growth",
    description:
      "Launch and grow your online presence with custom websites, mobile apps, e-commerce platforms, and data-driven marketing strategies.",
    featured: true,
    category: "digital" as const,
  },
  {
    id: "infrastructure",
    icon: Cloud,
    title: "Cloud & Infrastructure",
    description:
      "Build reliable, scalable foundations with cloud migration, network design, and DevOps practices that grow with your business.",
    category: "infrastructure" as const,
  },
  {
    id: "security",
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Protect your business with comprehensive security assessments, compliance consulting, and 24/7 threat monitoring.",
    category: "security" as const,
  },
  {
    id: "managed",
    icon: Settings,
    title: "Managed IT Services",
    description:
      "Focus on your core business while we handle IT operations, support, and strategic technology consulting.",
    category: "managed" as const,
  },
];

function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <Section padding="lg" className="bg-gradient-to-b from-muted/50 to-background">
        <Container size="sm">
          <Breadcrumbs items={[{ label: "Solutions", href: "/solutions" }]} />
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Solutions
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Comprehensive IT solutions for every challenge
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              From digital transformation to enterprise security, we provide
              end-to-end solutions tailored to your business needs.
            </p>
          </div>
        </Container>
      </Section>

      {/* Solution Categories */}
      {solutionCategories.map((solution) => {
        const services = getServicesByCategory(solution.category);
        return (
          <Section
            key={solution.id}
            id={solution.id}
            background={solution.featured ? "muted" : "default"}
          >
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-12 items-start">
              {/* Category Info */}
              <div className="lg:sticky lg:top-24">
                <Card
                  className={cn(
                    "h-full",
                    solution.featured && "border-accent/50 bg-accent/5"
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-lg",
                          solution.featured
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-foreground"
                        )}
                      >
                        {solution.icon && <solution.icon className="h-6 w-6" />}
                      </div>
                      {solution.featured && <Badge>Primary Focus</Badge>}
                    </div>
                    <CardTitle className="mt-4 text-2xl">
                      {solution.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {solution.description}
                    </p>
                    <Button asChild className="mt-6 w-full">
                      <Link href="/contact">
                        Discuss Your Project
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Services Grid */}
              <div className="lg:col-span-2">
                <h2 className="sr-only">{solution.title} Services</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {services.map((service) => (
                    <ServiceCard key={service.slug} service={service} />
                  ))}
                </div>
              </div>
            </div>
          </Section>
        );
      })}

      {/* CTA */}
      <Section background="primary" className="text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Not sure which solution fits your needs?
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Book a free consultation and we&apos;ll help you identify the right
            approach for your business.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Book Free Consultation</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10">
              <Link href="/case-studies">View Case Studies</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
