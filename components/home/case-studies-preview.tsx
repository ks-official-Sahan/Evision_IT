"use client";

import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { CaseStudyCard } from "@/components/cards/case-study-card";
import { ArrowRight, Briefcase } from "lucide-react";
import { getFeaturedCaseStudies } from "@/lib/data";
import { motion } from "framer-motion";
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
    <Section background="muted" className="overflow-hidden">
      <SectionHeader
        badge={caseStudies.badge || "Case Studies"}
        title={caseStudies.sectionTitle || "Results that speak for themselves"}
        description={
          caseStudies.sectionDescription ||
          "See how we've helped businesses like yours achieve measurable growth."
        }
      />

      {/* Featured Layout: First card spans 2 columns on lg */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredCaseStudies.map((caseStudy, index) => (
          <CaseStudyCard
            key={caseStudy.slug}
            caseStudy={caseStudy}
            variant="featured"
            index={index}
            locale={locale}
          />
        ))}
      </div>

      {/* View All CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center"
      >
        <Button asChild variant="outline" size="lg" className="group">
          <Link href={`/${locale}/case-studies`}>
            <Briefcase className="mr-2 h-4 w-4" />
            {caseStudies.viewAllCaseStudies || "View All Case Studies"}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
}
