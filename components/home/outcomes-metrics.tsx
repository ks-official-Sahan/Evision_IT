"use client";

import React from "react"

import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Zap, BarChart3, Clock } from "lucide-react";
import { motion, useMotionValue, useTransform, useEffect } from "framer-motion";

interface OutcomeMetric {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  color: "accent" | "secondary" | "primary";
}

const outcomeMetrics: OutcomeMetric[] = [
  {
    icon: <TrendingUp className="h-6 w-6" />,
    value: "204%",
    label: "Average Traffic Growth",
    description: "Client websites see significant organic traffic increases within 6 months",
    color: "accent",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    value: "80%",
    label: "Performance Improvement",
    description: "Pages load 80% faster with our optimization techniques",
    color: "secondary",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    value: "3.5x",
    label: "Conversion Rate Increase",
    description: "Better UX and design lead to higher conversion rates",
    color: "primary",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    value: "50%",
    label: "Faster Time-to-Market",
    description: "Agile development methodology accelerates product launches",
    color: "accent",
  },
];

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
    const animation = {
      duration,
    };
    count.set(numericValue, animation);
  }, [count, numericValue, duration]);

  return <motion.span>{displayValue}</motion.span>;
}

export function OutcomesMetrics() {
  return (
    <Section background="muted">
      <SectionHeader
        badge="Results & Impact"
        title="Real outcomes from real projects"
        description="Here's what our clients have achieved by partnering with us."
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
              How we deliver these results
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">→</span>
                <span>
                  <strong className="text-foreground">Technical Excellence:</strong> Modern
                  tech stacks, best practices, and continuous optimization
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">→</span>
                <span>
                  <strong className="text-foreground">Data-Driven Strategy:</strong> Every
                  decision backed by analytics and user research
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">→</span>
                <span>
                  <strong className="text-foreground">Ongoing Optimization:</strong>
                  Continuous monitoring, testing, and improvements post-launch
                </span>
              </li>
            </ul>
          </div>
        </Container>
      </motion.div>
    </Section>
  );
}
