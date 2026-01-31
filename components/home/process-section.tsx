"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { MessageSquare, Lightbulb, Code2, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Locale } from "@/lib/config";
import { type Dictionary } from "@/lib/i18n/get-dict";

interface ProcessSectionProps {
  dict?: Dictionary;
  locale?: Locale;
}

export function ProcessSection({ dict, locale = "en" }: ProcessSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const process = dict?.process || {};

  const steps = [
    {
      number: "01",
      icon: MessageSquare,
      title: process.discovery || "Discovery",
      description:
        process.discoveryDesc ||
        "We learn about your business, goals, and challenges through in-depth consultation.",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      number: "02",
      icon: Lightbulb,
      title: process.strategy || "Strategy",
      description:
        process.strategyDesc ||
        "We develop a tailored solution plan with clear milestones and deliverables.",
      gradient: "from-amber-400 to-orange-500",
    },
    {
      number: "03",
      icon: Code2,
      title: process.build || "Build",
      description:
        process.buildDesc ||
        "Our team executes with agile methodology, keeping you informed throughout.",
      gradient: "from-emerald-400 to-teal-500",
    },
    {
      number: "04",
      icon: Rocket,
      title: process.launchSupport || "Launch & Support",
      description:
        process.launchSupportDesc ||
        "We deploy your solution and provide ongoing maintenance and optimization.",
      gradient: "from-purple-400 to-violet-500",
    },
  ];

  return (
    <Section>
      <SectionHeader
        badge={process.badge || "Our Process"}
        title={process.sectionTitle || "How we deliver results"}
        description={
          process.sectionDescription ||
          "A proven methodology that ensures successful project outcomes."
        }
      />

      <div className="relative">
        {/* Connection Line (desktop) */}
        <div className="hidden lg:block absolute top-20 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-0.5">
          <div className="w-full h-full bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 opacity-30 rounded-full" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.4 }}
                className="relative"
              >
                <div className="glass-card h-full text-center p-6 pt-10 relative">
                  {/* Step Number Badge */}
                  <div
                    className={cn(
                      "absolute -top-4 left-1/2 -translate-x-1/2",
                      "flex h-10 w-10 items-center justify-center",
                      "rounded-full bg-gradient-to-br shadow-lg",
                      step.gradient,
                      "text-white text-sm font-bold z-10",
                    )}
                  >
                    {step.number}
                  </div>

                  {/* Icon Container */}
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-foreground">
                    <Icon className="h-8 w-8" />
                  </div>

                  {/* Content */}
                  <h3 className="mt-5 font-semibold text-foreground text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
