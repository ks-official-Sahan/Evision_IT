"use client";

import { Search, Lightbulb, Rocket, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover & Audit",
    description:
      "We analyze your current state, goals, and competitive landscape to identify opportunities.",
  },
  {
    icon: Lightbulb,
    title: "Strategy & Design",
    description:
      "Craft a tailored roadmap and design solutions that align with your business objectives.",
  },
  {
    icon: Rocket,
    title: "Build & Launch",
    description:
      "Our engineers develop and deploy your solution with rigorous testing and quality assurance.",
  },
  {
    icon: RefreshCw,
    title: "Optimize & Support",
    description:
      "Continuous improvement and dedicated support to ensure long-term success and growth.",
  },
];

export function ProcessSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl text-balance">
            How we deliver results
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven process that ensures quality, transparency, and measurable
            outcomes.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line (desktop only) */}
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-border" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="relative text-center">
                {/* Step Number with Icon */}
                <div className="relative inline-flex flex-col items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-card border-2 border-accent text-accent z-10">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    {index + 1}
                  </div>
                </div>

                <h3 className="mt-6 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
