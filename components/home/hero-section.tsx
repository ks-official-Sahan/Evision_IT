"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { CTAGroup } from "@/components/ui/cta-group";
import { MetricStrip } from "@/components/ui/metric-strip";
import { CheckCircle2 } from "lucide-react";

const trustBadges = [
  "200+ projects delivered",
  "50+ active clients",
  "99.9% uptime SLA",
];

const metrics = [
  { value: "200+", label: "Projects Delivered" },
  { value: "50+", label: "Active Clients" },
  { value: "8+", label: "Years Experience" },
  { value: "24/7", label: "Support Available" },
];

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = prefersReducedMotion
    ? {}
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 },
        },
      };

  const itemVariants = prefersReducedMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      };

  return (
    <section className="relative overflow-hidden bg-background pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Announcement Badge */}
          <motion.div variants={itemVariants}>
            <Badge variant="secondary" className="mb-6">
              Serving Sri Lanka & Global Clients
            </Badge>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance"
          >
            Digital transformation for{" "}
            <span className="text-accent">growing businesses</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty"
          >
            High-performance websites, apps, e-commerce and digital
            marketing—backed by enterprise-grade infrastructure and security
            expertise.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="mt-8">
            <CTAGroup
              primaryText="Book Free Consultation"
              primaryHref="/contact"
              secondaryText="View Our Work"
              secondaryHref="/case-studies"
              showWhatsApp
              align="center"
              size="lg"
            />
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            {trustBadges.map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="h-4 w-4 text-accent" />
                {badge}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Metrics Strip */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 lg:mt-20"
        >
          <MetricStrip metrics={metrics} />
        </motion.div>
      </Container>
    </section>
  );
}
