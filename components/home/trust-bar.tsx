"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { CheckCircle2, Award, Shield, Users, Zap } from "lucide-react";
import { type Dictionary } from "@/lib/i18n/get-dict";
import { type Locale } from "@/lib/config";

interface TrustBarProps {
  locale?: Locale;
  dict?: Dictionary;
}

export function TrustBar({ locale = "en", dict }: TrustBarProps) {
  const prefersReducedMotion = useReducedMotion();
  const trust = dict?.trust || {};

  const trustSignals = [
    {
      icon: CheckCircle2,
      label: trust.projectsDelivered || "100+ Projects Delivered",
      description:
        trust.projectsDeliveredDesc ||
        "Proven track record of successful implementations",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: Users,
      label: trust.activeClients || "30+ Active Clients",
      description:
        trust.activeClientsDesc || "Trusted by businesses across industries",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      icon: Award,
      label: trust.uptimeSLA || "99.9% Uptime SLA",
      description:
        trust.uptimeSLADesc || "Enterprise-grade reliability and support",
      gradient: "from-amber-400 to-orange-500",
    },
    {
      icon: Shield,
      label: trust.isoCertified || "ISO 27001 Certified",
      description:
        trust.isoCertifiedDesc || "Security and compliance standards met",
      gradient: "from-purple-400 to-violet-500",
    },
  ];

  // Mock client logos - replace with actual logos/images
  const clientLogos = [
    "Fashion.lk",
    "TechCorp",
    "StartupHub",
    "DigitalFirst",
    "GrowthCo",
  ];

  return (
    <Section padding="sm" className="bg-transparent relative overflow-hidden">
      <Container>
        {/* Trust Signals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {trustSignals.map((signal, idx) => {
            const Icon = signal.icon;
            return (
              <motion.div
                key={idx}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="glass-card p-5 group"
              >
                <div className="flex items-start gap-4">
                  {/* Icon Container with gradient */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${signal.gradient} flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1">
                      {signal.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {signal.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Client Logos Marquee Section */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 pt-10 border-t border-border/50"
        >
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              {trust.trustedBy || "Trusted by leading companies"}
            </p>
          </div>

          {/* Logo Marquee Container */}
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            {/* Scrolling container */}
            <div className="flex animate-marquee hover:[animation-play-state:paused]">
              {/* First set */}
              {clientLogos.concat(clientLogos).map((logo, idx) => (
                <div
                  key={`logo-${idx}`}
                  className="flex-shrink-0 mx-6 h-14 px-8 glass-subtle flex items-center justify-center transition-all hover:scale-105"
                >
                  <span className="text-muted-foreground font-medium text-sm whitespace-nowrap">
                    {logo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Marquee Animation - Added inline for simplicity */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </Section>
  );
}
