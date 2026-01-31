"use client";

import React, { useEffect } from "react";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Container } from "@/components/ui/container";
import { TrendingUp, Zap, BarChart3, Clock, ArrowRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { type Locale } from "@/lib/config";

interface CounterProps {
  value: string;
  duration?: number;
}

function AnimatedCounter({ value, duration = 2 }: CounterProps) {
  const prefersReducedMotion = useReducedMotion();
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const count = useMotionValue(0);
  const displayValue = useTransform(count, (latest) => {
    const suffix = value.replace(/[0-9]/g, "");
    return `${Math.floor(latest)}${suffix}`;
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      count.set(numericValue);
      return;
    }
    const controls = animate(count, numericValue, {
      duration,
      ease: "easeOut",
    });
    return controls.stop;
  }, [count, numericValue, duration, prefersReducedMotion]);

  return <motion.span>{displayValue}</motion.span>;
}

interface OutcomesMetricsProps {
  dict?: any;
  locale?: Locale;
}

export function OutcomesMetrics({ dict, locale = "en" }: OutcomesMetricsProps) {
  const prefersReducedMotion = useReducedMotion();
  const outcomes = dict?.outcomes || {};

  const outcomeMetrics = [
    {
      icon: TrendingUp,
      value: "204%",
      label: outcomes.trafficGrowth || "Average Traffic Growth",
      description:
        outcomes.trafficGrowthDesc ||
        "Client websites see significant organic traffic increases within 6 months",
      gradient: "from-emerald-400 to-teal-500",
      progressColor: "bg-emerald-500",
      progressPercent: 90,
    },
    {
      icon: Zap,
      value: "80%",
      label: outcomes.performanceImprovement || "Performance Improvement",
      description:
        outcomes.performanceDesc ||
        "Pages load 80% faster with our optimization techniques",
      gradient: "from-amber-400 to-orange-500",
      progressColor: "bg-amber-500",
      progressPercent: 80,
    },
    {
      icon: BarChart3,
      value: "3.5x",
      label: outcomes.conversionIncrease || "Conversion Rate Increase",
      description:
        outcomes.conversionDesc ||
        "Better UX and design lead to higher conversion rates",
      gradient: "from-blue-400 to-indigo-500",
      progressColor: "bg-blue-500",
      progressPercent: 75,
    },
    {
      icon: Clock,
      value: "50%",
      label: outcomes.fasterTimeToMarket || "Faster Time-to-Market",
      description:
        outcomes.fasterTimeDesc ||
        "Agile development methodology accelerates product launches",
      gradient: "from-purple-400 to-violet-500",
      progressColor: "bg-purple-500",
      progressPercent: 50,
    },
  ];

  const deliveryPoints = [
    {
      title: outcomes.technicalExcellence || "Technical Excellence",
      desc:
        outcomes.technicalExcellenceDesc ||
        "Modern tech stacks, best practices, and continuous optimization",
    },
    {
      title: outcomes.dataDrivenStrategy || "Data-Driven Strategy",
      desc:
        outcomes.dataDrivenStrategyDesc ||
        "Every decision backed by analytics and user research",
    },
    {
      title: outcomes.ongoingOptimization || "Ongoing Optimization",
      desc:
        outcomes.ongoingOptimizationDesc ||
        "Continuous monitoring, testing, and improvements post-launch",
    },
  ];

  return (
    <Section background="muted" className="section-gradient-1">
      <SectionHeader
        badge={outcomes.badge || "Results & Impact"}
        title={outcomes.title || "Real outcomes from real projects"}
        description={
          outcomes.description ||
          "Here's what our clients have achieved by partnering with us."
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        {outcomeMetrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={idx}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="glass-card p-6 sm:p-8 group"
            >
              <div className="flex items-start gap-5">
                {/* Icon with gradient */}
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${metric.gradient} flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>

                <div className="flex-1">
                  {/* Large Value */}
                  <div className="text-4xl sm:text-5xl font-bold text-gradient-accent mb-1">
                    <AnimatedCounter value={metric.value} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {metric.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {metric.description}
                  </p>

                  {/* Progress Bar Visualization */}
                  <div className="mt-4">
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${metric.progressColor} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.progressPercent}%` }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.5 + idx * 0.1,
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* How We Deliver Section */}
      <motion.div
        className="mt-16 pt-12 border-t border-border/50"
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <Container size="sm">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground">
              {outcomes.howWeDeliver || "How we deliver these results"}
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {deliveryPoints.map((point, idx) => (
              <motion.div
                key={idx}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="glass-subtle p-5 text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <ArrowRight className="h-4 w-4 text-accent" />
                  <strong className="text-foreground font-semibold">
                    {point.title}
                  </strong>
                </div>
                <p className="text-sm text-muted-foreground">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.div>
    </Section>
  );
}
