import { Badge } from "@/components/ui/badge"
import { Section, Container, Breadcrumbs, CaseStudyCard } from "@/components/ui"
import caseStudies from "@/data/caseStudies"

/*
  DEPRECATED: This page has been moved to app/[lang]/case-studies/page.tsx
  All case studies content is now served with full i18n support (EN, SI, TA, AR)
  
  This file is kept for backward compatibility and will redirect users.
  To access case studies, use: /en/case-studies, /si/case-studies, /ta/case-studies, or /ar/case-studies
  
  To be removed in v2.0.0 after migration period.
*/

import { redirect } from "next/navigation";

export function CaseStudiesPageDeprecated() {
  redirect("/en/case-studies");
}

export function CaseStudiesPage() {
  const featuredStudies = caseStudies.filter((c) => c.featured);
  const otherStudies = caseStudies.filter((c) => !c.featured);

  return (
    <>
      {/* Hero */}
      <Section padding="lg" className="bg-gradient-to-b from-muted/50 to-background">
        <Container size="sm">
          <Breadcrumbs items={[{ label: "Case Studies", href: "/case-studies" }]} />
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Case Studies
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Real results for real businesses
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Discover how we&apos;ve helped companies transform their digital
              presence and achieve measurable business outcomes.
            </p>
          </div>
        </Container>
      </Section>

      {/* Featured Case Studies */}
      {featuredStudies.length > 0 && (
        <Section>
          <div className="mb-8">
            <Badge variant="outline" className="mb-2">
              Featured
            </Badge>
            <h2 className="text-2xl font-semibold text-foreground">
              Featured Projects
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredStudies.map((caseStudy) => (
              <CaseStudyCard
                key={caseStudy.slug}
                caseStudy={caseStudy}
                variant="featured"
              />
            ))}
          </div>
        </Section>
      )}

      {/* All Case Studies */}
      {otherStudies.length > 0 && (
        <Section background="muted">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              More Projects
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
