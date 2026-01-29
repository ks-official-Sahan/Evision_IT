"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Lightbulb, Code2, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Discovery",
    description:
      "We learn about your business, goals, and challenges through in-depth consultation.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Strategy",
    description:
      "We develop a tailored solution plan with clear milestones and deliverables.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Build",
    description:
      "Our team executes with agile methodology, keeping you informed throughout.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Support",
    description:
      "We deploy your solution and provide ongoing maintenance and optimization.",
  },
];

export function ProcessSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section>
      <SectionHeader
        badge="Our Process"
        title="How we deliver results"
        description="A proven methodology that ensures successful project outcomes."
      />

      <div className="relative">
        {/* Connection Line (desktop) */}
        <div className="hidden lg:block absolute top-16 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-0.5 bg-border" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="h-full text-center relative">
                <CardContent className="pt-8 pb-6 px-5">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold z-10">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mx-auto mt-2 flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-foreground">
                    <step.icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-4 font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
