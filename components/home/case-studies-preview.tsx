"use client";

import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { CaseStudyCard } from "@/components/cards/case-study-card";
import { ArrowRight } from "lucide-react";
import { getFeaturedCaseStudies } from "@/lib/data";

export function CaseStudiesPreview() {
  const featuredCaseStudies = getFeaturedCaseStudies().slice(0, 3);

  return (
    <Section background="muted">
      <SectionHeader
        badge="Case Studies"
        title="Results that speak for themselves"
        description="See how we've helped businesses like yours achieve measurable growth."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredCaseStudies.map((caseStudy) => (
          <CaseStudyCard
            key={caseStudy.slug}
            caseStudy={caseStudy}
            variant="featured"
          />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/case-studies">
            View All Case Studies
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
