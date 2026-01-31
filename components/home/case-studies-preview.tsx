"use client";

import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { CaseStudyCard } from "@/components/cards/case-study-card";
import { ArrowRight } from "lucide-react";
import { getFeaturedCaseStudies } from "@/lib/data";
import { type Dictionary } from "@/lib/i18n/get-dict";
import { type Locale } from "@/lib/config";

interface CaseStudiesPreviewProps {
  dict?: any;
  locale?: Locale;
}

export function CaseStudiesPreview({
  dict,
  locale = "en",
}: CaseStudiesPreviewProps) {
  const featuredCaseStudies = getFeaturedCaseStudies().slice(0, 3);
  const caseStudies = dict?.caseStudies || {};

  return (
    <Section background="muted">
      <SectionHeader
        badge={caseStudies.badge || "Case Studies"}
        title={caseStudies.sectionTitle || "Results that speak for themselves"}
        description={
          caseStudies.sectionDescription ||
          "See how we've helped businesses like yours achieve measurable growth."
        }
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
        <Button asChild variant="outline" size="lg" className="btn-glow">
          <Link href={`/${locale}/case-studies`}>
            {caseStudies.viewAllCaseStudies || "View All Case Studies"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
