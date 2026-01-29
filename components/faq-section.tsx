"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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

const faqs = [
  {
    question: "How long does a website project take?",
    answer:
      "Standard websites: 4-8 weeks. Complex web apps: 3-6 months. We provide a detailed timeline during discovery.",
  },
  {
    question: "What are your pricing options?",
    answer:
      "Fixed-price, time & materials, or retainer. Transparent quotes with no hidden fees—tailored to your budget.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes. Maintenance packages include updates, security patches, monitoring, and technical support (up to 24/7).",
  },
  {
    question: "When will I see SEO results?",
    answer:
      "Initial improvements in 2-3 months; significant gains in 6-12 months. Paid ads deliver immediate traffic.",
  },
  {
    question: "How do you handle security?",
    answer:
      "SSL, secure coding, regular audits, encryption, and compliance with GDPR/PCI-DSS where applicable.",
  },
  {
    question: "Can you host my website?",
    answer:
      "Yes. Managed hosting on AWS, Google Cloud, or Azure—including scaling, backups, and monitoring.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-16 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4">
            FAQ
          </Badge>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Quick answers to common questions about working with us.
          </p>
        </div>

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

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
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
    </section>
  );
}
