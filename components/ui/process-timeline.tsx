"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProcessStep {
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
  className?: string;
}

export function ProcessTimeline({ steps, className }: ProcessTimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Desktop: Horizontal Timeline */}
      <div className="hidden lg:block">
        <div className="flex items-start justify-between gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 relative">
              {/* Step content */}
              <div className="text-center">
                {/* Step number with connector */}
                <div className="relative flex items-center justify-center mb-6">
                  {/* Connector line (before) */}
                  {index > 0 && (
                    <div className="absolute right-1/2 top-1/2 h-0.5 w-full -translate-y-1/2 bg-linear-to-r from-accent/50 to-accent animate-gradient-flow" />
                  )}

                  {/* Step circle */}
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-accent to-accent/70 text-accent-foreground font-bold text-lg shadow-lg shadow-accent/30">
                    {index + 1}
                  </div>

                  {/* Connector line (after) */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-1/2 h-0.5 w-full -translate-y-1/2 bg-linear-to-r from-accent to-accent/50 animate-gradient-flow" />
                  )}
                </div>

                {/* Step title */}
                <h4 className="font-semibold text-foreground mb-2">
                  {step.title}
                </h4>

                {/* Step description */}
                <p className="text-sm text-muted-foreground text-pretty max-w-[200px] mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet: Vertical Timeline */}
      <div className="lg:hidden space-y-0">
        {steps.map((step, index) => (
          <div key={index} className="relative flex gap-4">
            {/* Left side: Step number and connector */}
            <div className="flex flex-col items-center">
              {/* Step circle */}
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-accent to-accent/70 text-accent-foreground font-bold shadow-lg shadow-accent/30">
                {index + 1}
              </div>

              {/* Vertical connector line */}
              {index < steps.length - 1 && (
                <div className="w-0.5 h-full min-h-[60px] bg-linear-to-b from-accent to-accent/30" />
              )}
            </div>

            {/* Right side: Content */}
            <div className="flex-1 pb-8">
              <h4 className="font-semibold text-foreground mb-1">
                {step.title}
              </h4>
              <p className="text-sm text-muted-foreground text-pretty">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProcessTimeline;
