"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Target } from "lucide-react";

interface ResultMetric {
  metric: string;
  value: string;
  description: string;
}

interface ResultsMetricsProps {
  results: ResultMetric[];
  className?: string;
  animated?: boolean;
}

function parseValue(value: string): {
  number: number;
  suffix: string;
  prefix: string;
} {
  // Extract numeric value and any prefix/suffix
  const match = value.match(/^([+-]?)(\$)?(\d+(?:\.\d+)?)(.*)/);
  if (!match) return { number: 0, suffix: value, prefix: "" };

  const [, sign, dollar, num, rest] = match;
  return {
    number: parseFloat(num),
    suffix: rest || "",
    prefix: `${sign || ""}${dollar || ""}`,
  };
}

function AnimatedCounter({
  value,
  duration = 2000,
}: {
  value: string;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateValue();
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value]);

  const animateValue = () => {
    const { number, suffix, prefix } = parseValue(value);
    const startTime = Date.now();
    const isDecimal = value.includes(".");

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);

      const current = number * eased;
      const formatted = isDecimal
        ? current.toFixed(1)
        : Math.round(current).toString();

      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  };

  return <span ref={ref}>{displayValue}</span>;
}

export function ResultsMetrics({
  results,
  className,
  animated = true,
}: ResultsMetricsProps) {
  const getIcon = (value: string) => {
    if (value.startsWith("+") || value.startsWith("$")) {
      return (
        <TrendingUp className="w-5 h-5 text-green-500" aria-hidden="true" />
      );
    }
    if (value.startsWith("-") && !value.includes("$")) {
      return (
        <TrendingDown className="w-5 h-5 text-amber-500" aria-hidden="true" />
      );
    }
    return <Target className="w-5 h-5 text-accent" aria-hidden="true" />;
  };

  return (
    <div
      className={cn(
        "grid gap-4 sm:gap-6",
        results.length === 3
          ? "grid-cols-1 sm:grid-cols-3"
          : "grid-cols-2 sm:grid-cols-4",
        className,
      )}
      role="list"
      aria-label="Key results and metrics"
    >
      {results.map((result, index) => (
        <div
          key={index}
          role="listitem"
          className={cn(
            "relative group p-5 rounded-xl",
            "bg-card/80 backdrop-blur-md border border-border/50",
            "hover:bg-card/90 hover:border-accent/30 transition-all duration-300",
            "text-center",
          )}
        >
          {/* Icon */}
          <div className="flex justify-center mb-3">
            {getIcon(result.value)}
          </div>

          {/* Value */}
          <div className="text-3xl sm:text-4xl font-bold text-accent mb-1">
            {animated ? <AnimatedCounter value={result.value} /> : result.value}
          </div>

          {/* Metric name */}
          <div className="text-sm font-medium text-foreground mb-1">
            {result.metric}
          </div>

          {/* Description */}
          <div className="text-xs text-muted-foreground">
            {result.description}
          </div>

          {/* Subtle glow on hover */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(37, 187, 232, 0.08) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
        </div>
      ))}
    </div>
  );
}
