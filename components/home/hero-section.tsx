"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { CTAGroup } from "@/components/ui/cta-group";
import { CheckCircle2, Star, Sparkles } from "lucide-react";
import { type Dictionary } from "@/lib/i18n/get-dict";
import { type Locale } from "@/lib/config";

interface HeroSectionProps {
  dict?: Dictionary;
  locale?: Locale;
}

export function HeroSection({ dict, locale = "en" }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  // Get translations with fallbacks
  const hero = dict?.hero || {};
  const trust = dict?.trust || {};

  const trustBadges = [
    { text: trust.clients || "100+ Projects Delivered", icon: Star },
    { text: trust.uptime || "99.9% Uptime", icon: CheckCircle2 },
    { text: trust.response || "24-hour Response", icon: Sparkles },
  ];

  const metrics = [
    { value: "100+", label: hero.projectsDelivered || "Projects Delivered" },
    { value: "30+", label: hero.activeClients || "Active Clients" },
    { value: "2+", label: hero.yearsExperience || "Years Experience" },
    { value: "24/7", label: hero.supportAvailable || "Support Available" },
  ];

  // Animation variants with proper typing (undefined for reduced motion)
  const containerVariants: Variants | undefined = prefersReducedMotion
    ? undefined
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.12 },
        },
      };

  const itemVariants: Variants | undefined = prefersReducedMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 z-1 bg-linear-to-b from-accent/8 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-1 bg-linear-to-r from-transparent via-accent/3 to-transparent pointer-events-none" />

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Announcement Badge with glow */}
          <motion.div variants={itemVariants}>
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-1.5 text-sm border-glow backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 mr-1.5 text-accent" />
              {dict?.common?.tagline || "Serving Sri Lanka & Global Clients"}
            </Badge>
          </motion.div>

          {/* H1 with gradient text and sr-only SEO keywords */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance"
          >
            {/* SEO-only content for AEO/GEO optimization */}
            <span className="sr-only">
              Leading IT Services, Web Development, Mobile App Development,
              E-commerce Solutions, Digital Marketing, SEO, and Cloud Services
              Company in Sri Lanka - Evision IT | Expert Software Development
              Team | Custom Business Solutions | Enterprise Web Applications
            </span>
            {hero.headline || "Digital transformation for"}{" "}
            {/* Gradient text with accessible fallback color */}
            <span
              className="text-gradient-accent inline-block"
              style={{ color: "var(--accent)" }} // Fallback for gradient-unsupported browsers
              aria-label={hero.tagline || "growing businesses"}
            >
              {hero.tagline || "growing businesses"}
            </span>
          </motion.h1>

          {/* Subheadline with improved contrast (uses updated --muted-foreground AAA ratio) */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty"
          >
            {dict?.common?.description ||
              "High-performance websites, apps, e-commerce and digital marketing—backed by enterprise-grade infrastructure and security expertise."}
          </motion.p>

          {/* CTA Buttons with enhanced styling */}
          <motion.div variants={itemVariants} className="mt-10">
            <CTAGroup
              primaryText={hero.cta || "Book Free Consultation"}
              primaryHref={`/${locale}/contact`}
              secondaryText={hero.secondary || "View Our Work"}
              secondaryHref={`/${locale}/case-studies`}
              showWhatsApp
              align="center"
              size="lg"
              className="[&>a:first-child]:btn-glow"
            />
          </motion.div>

          {/* Enhanced Trust Badges with glassmorphism */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-6"
          >
            {trustBadges.map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-subtle text-sm text-muted-foreground"
              >
                <badge.icon className="h-4 w-4 text-accent shrink-0" />
                <span>{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Glassmorphic Metrics Strip */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 lg:mt-24"
        >
          <div className="glass-card p-6 sm:p-8 mx-auto max-w-4xl">
            <div className="grid gap-6 sm:gap-8 grid-cols-2 md:grid-cols-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                  className="text-center"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-gradient-accent">
                    {metric.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
