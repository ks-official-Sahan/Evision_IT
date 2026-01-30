"use client";

import React, { useEffect } from "react";

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Zap, BarChart3, Clock } from "lucide-react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { type Locale } from "@/lib/config";

interface CounterProps {
  value: string;
  duration?: number;
}

function AnimatedCounter({ value, duration = 2 }: CounterProps) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const count = useMotionValue(0);
  const displayValue = useTransform(count, (latest) => {
    const suffix = value.replace(/[0-9]/g, "");
    return `${Math.floor(latest)}${suffix}`;
  });

  useEffect(() => {
    const controls = animate(count, numericValue, {
      duration,
    });
    return controls.stop;
  }, [count, numericValue, duration]);

  return <motion.span>{displayValue}</motion.span>;
}

interface OutcomesMetricsProps {
  dict?: any;
  locale?: Locale;
}

export function OutcomesMetrics({ dict, locale = "en" }: OutcomesMetricsProps) {
  const outcomes = dict?.outcomes || {};

  const outcomeMetrics = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      value: "204%",
      label: outcomes.trafficGrowth || "Average Traffic Growth",
      description:
        outcomes.trafficGrowthDesc ||
        "Client websites see significant organic traffic increases within 6 months",
      color: "accent" as const,
    },
    {
      icon: <Zap className="h-6 w-6" />,
      value: "80%",
      label: outcomes.performanceImprovement || "Performance Improvement",
      description:
        outcomes.performanceDesc ||
        "Pages load 80% faster with our optimization techniques",
      color: "secondary" as const,
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      value: "3.5x",
      label: outcomes.conversionIncrease || "Conversion Rate Increase",
      description:
        outcomes.conversionDesc ||
        "Better UX and design lead to higher conversion rates",
      color: "primary" as const,
    },
    {
      icon: <Clock className="h-6 w-6" />,
      value: "50%",
      label: outcomes.fasterTimeToMarket || "Faster Time-to-Market",
      description:
        outcomes.fasterTimeDesc ||
        "Agile development methodology accelerates product launches",
      color: "accent" as const,
    },
  ];

  return (
    <Section background="muted">
      <SectionHeader
        badge={outcomes.badge || "Results & Impact"}
        title={outcomes.title || "Real outcomes from real projects"}
        description={
          outcomes.description ||
          "Here's what our clients have achieved by partnering with us."
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        {outcomeMetrics.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="h-full glass hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg flex-shrink-0 ${
                      metric.color === "accent"
                        ? "bg-accent/10 text-accent"
                        : metric.color === "secondary"
                          ? "bg-secondary/10 text-secondary"
                          : "bg-primary/10 text-primary"
                    }`}
                  >
                    {metric.icon}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                    <AnimatedCounter value={metric.value} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                    {metric.label}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional Context Section */}
      <motion.div
        className="mt-12 pt-12 border-t border-border"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <Container>
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {outcomes.howWeDeliver || "How we deliver these results"}
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">→</span>
                <span>
                  <strong className="text-foreground">
                    {outcomes.technicalExcellence || "Technical Excellence:"}
                  </strong>{" "}
                  {outcomes.technicalExcellenceDesc ||
                    "Modern tech stacks, best practices, and continuous optimization"}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">→</span>
                <span>
                  <strong className="text-foreground">
                    {outcomes.dataDrivenStrategy || "Data-Driven Strategy:"}
                  </strong>{" "}
                  {outcomes.dataDrivenStrategyDesc ||
                    "Every decision backed by analytics and user research"}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">→</span>
                <span>
                  <strong className="text-foreground">
                    {outcomes.ongoingOptimization || "Ongoing Optimization:"}
                  </strong>{" "}
                  {outcomes.ongoingOptimizationDesc ||
                    "Continuous monitoring, testing, and improvements post-launch"}
                </span>
              </li>
            </ul>
          </div>
        </Container>
      </motion.div>
    </Section>
  );
}
