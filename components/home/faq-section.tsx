"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/json-ld";
import { generalFaqs } from "@/lib/data";
import { Clock, Package, ArrowRight, HelpCircle } from "lucide-react";
import { type Locale } from "@/lib/config";

interface FAQSectionProps {
  dict?: any;
  locale?: Locale;
}

export function FAQSection({ dict, locale = "en" }: FAQSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const faq = dict?.faq || {};

  const quickAnswers = [
    {
      icon: Clock,
      question: faq.typicalTimeline || "Typical timeline?",
      answer:
        faq.typicalTimelineAnswer ||
        "4-8 weeks for websites, 3-6 months for complex apps.",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      icon: Package,
      question: faq.whatsIncluded || "What's included?",
      answer:
        faq.whatsIncludedAnswer ||
        "Design, development, testing, training, and 30-day support.",
      gradient: "from-emerald-400 to-teal-500",
    },
    {
      icon: ArrowRight,
      question: faq.afterConsult || "After the consult?",
      answer:
        faq.afterConsultAnswer ||
        "You receive a proposal with scope, timeline, and pricing.",
      gradient: "from-purple-400 to-violet-500",
    },
  ];

  return (
    <Section background="muted" className="section-gradient-1">
      <JsonLd data={faqSchema(generalFaqs)} />

      <SectionHeader
        badge={faq.badge || "FAQ"}
        title={faq.sectionTitle || "Frequently asked questions"}
        description={
          faq.sectionDescription ||
          "Quick answers to common questions about working with us."
        }
      />

      <div className="mx-auto max-w-3xl">
        {/* Quick Answers Block - Glassmorphic */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 mb-10 border-accent/20"
        >
          <div className="flex items-center gap-2 mb-5">
            <HelpCircle className="h-5 w-5 text-accent" />
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              {faq.quickAnswers || "Quick Answers"}
            </h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {quickAnswers.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.question}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                  className="flex gap-3"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} shadow-md`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.question}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Accordion FAQ */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-3">
            {generalFaqs.map((faqItem, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-subtle px-5 border-none"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-accent py-4">
                  {faqItem.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faqItem.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </Section>
  );
}
