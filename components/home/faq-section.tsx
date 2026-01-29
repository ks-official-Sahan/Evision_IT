"use client";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/json-ld";
import { generalFaqs } from "@/lib/data";
import { Clock, Package, ArrowRight } from "lucide-react";

const quickAnswers = [
  {
    icon: Clock,
    question: "Typical timeline?",
    answer: "4-8 weeks for websites, 3-6 months for complex apps.",
  },
  {
    icon: Package,
    question: "What's included?",
    answer: "Design, development, testing, training, and 30-day support.",
  },
  {
    icon: ArrowRight,
    question: "After the consult?",
    answer: "You receive a proposal with scope, timeline, and pricing.",
  },
];

export function FAQSection() {
  return (
    <Section background="muted">
      <JsonLd data={faqSchema(generalFaqs)} />

      <SectionHeader
        badge="FAQ"
        title="Frequently asked questions"
        description="Quick answers to common questions about working with us."
      />

      <div className="mx-auto max-w-3xl">
        {/* Quick Answers Block */}
        <Card className="mb-10 border-accent/30 bg-accent/5">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
              Quick Answers
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {quickAnswers.map((item) => (
                <div key={item.question} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.question}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Accordion FAQ */}
        <Accordion type="single" collapsible className="w-full">
          {generalFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-foreground hover:text-accent">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
