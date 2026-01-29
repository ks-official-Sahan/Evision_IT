"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Metric {
  value: string;
  label: string;
}

interface MetricStripProps {
  metrics: Metric[];
  variant?: "default" | "compact";
  className?: string;
}

export function MetricStrip({
  metrics,
  variant = "default",
  className,
}: MetricStripProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "grid gap-6 sm:gap-8",
        {
          "grid-cols-2 md:grid-cols-4": metrics.length === 4,
          "grid-cols-3": metrics.length === 3,
          "grid-cols-2": metrics.length === 2,
        },
        className
      )}
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className={cn("text-center", {
            "border-l border-border pl-6 first:border-l-0 first:pl-0":
              variant === "default",
          })}
        >
          <div
            className={cn("font-semibold text-foreground", {
              "text-3xl lg:text-4xl": variant === "default",
              "text-2xl lg:text-3xl": variant === "compact",
            })}
          >
            {metric.value}
          </div>
          <div
            className={cn("text-muted-foreground mt-1", {
              "text-sm": variant === "default",
              "text-xs": variant === "compact",
            })}
          >
            {metric.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
