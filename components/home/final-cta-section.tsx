"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { CTAGroup } from "@/components/ui/cta-group";
import { CheckCircle2 } from "lucide-react";
import { type Locale } from "@/lib/config";

interface FinalCTASectionProps {
  dict?: any;
  locale?: Locale;
}

export function FinalCTASection({ dict, locale = "en" }: FinalCTASectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const finalCta = dict?.finalCta || {};

  const benefits = [
    finalCta.noObligation || "No obligation consultation",
    finalCta.clearRoadmap || "Clear project roadmap",
    finalCta.transparentPricing || "Transparent pricing",
  ];

  return (
    <Section background="primary" className="text-center">
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
          {finalCta.title || "Ready to transform your digital presence?"}
        </h2>
        <p className="mt-4 text-lg opacity-90 text-pretty">
          {finalCta.description ||
            "Let's discuss your project and explore how we can help you achieve your business goals."}
        </p>

        <div className="mt-8">
          <CTAGroup
            primaryText={finalCta.cta || "Book Free Consultation"}
            primaryHref={`/${locale}/contact`}
            showWhatsApp
            align="center"
            size="lg"
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-2 text-sm opacity-90"
            >
              <CheckCircle2 className="h-4 w-4" />
              {benefit}
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
