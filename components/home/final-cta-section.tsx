"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { CTAGroup } from "@/components/ui/cta-group";
import { CheckCircle2, Sparkles } from "lucide-react";
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
    <Section
      background="primary"
      className="text-center relative overflow-hidden"
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent/20 pointer-events-none" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="mx-auto max-w-2xl relative z-10"
      >
        {/* Decorative element */}
        <motion.div
          initial={prefersReducedMotion ? {} : { scale: 0 }}
          whileInView={prefersReducedMotion ? {} : { scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm animate-pulse-subtle">
            <Sparkles className="h-7 w-7 text-accent" />
          </div>
        </motion.div>

        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
          {finalCta.title || "Ready to transform your digital presence?"}
        </h2>
        <p className="mt-5 text-lg opacity-90 text-pretty max-w-xl mx-auto">
          {finalCta.description ||
            "Let's discuss your project and explore how we can help you achieve your business goals."}
        </p>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <CTAGroup
            primaryText={finalCta.cta || "Book Free Consultation"}
            primaryHref={`/${locale}/contact`}
            showWhatsApp
            align="center"
            size="lg"
            className="[&>a:first-child]:bg-white dark:[&>a:first-child]:bg-accent [&>a:first-child]:text-primary dark:[&>a:first-child]:text-white [&>a:first-child]:hover:bg-white/90 dark:[&>a:first-child]:hover:bg-accent/90 [&>a:first-child]:shadow-xl [&>a:first-child]:hover:shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-2 text-sm opacity-90"
            >
              <CheckCircle2 className="h-4 w-4 text-accent" />
              {benefit}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}
