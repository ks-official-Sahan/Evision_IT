"use client";

import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Award, Shield, Users } from "lucide-react";
import { type Dictionary } from "@/lib/i18n/get-dict";
import { type Locale } from "@/lib/config";

interface TrustBarProps {
  locale?: Locale;
  dict?: Dictionary;
}

export function TrustBar({ locale = "en", dict }: TrustBarProps) {
  const trust = dict?.trust || {};

  const trustSignals = [
    {
      icon: CheckCircle2,
      label: trust.projectsDelivered || "100+ Projects Delivered",
      description:
        trust.projectsDeliveredDesc ||
        "Proven track record of successful implementations",
    },
    {
      icon: Users,
      label: trust.activeClients || "30+ Active Clients",
      description:
        trust.activeClientsDesc || "Trusted by businesses across industries",
    },
    {
      icon: Award,
      label: trust.uptimeSLA || "99.9% Uptime SLA",
      description:
        trust.uptimeSLADesc || "Enterprise-grade reliability and support",
    },
    {
      icon: Shield,
      label: trust.isoCertified || "ISO 27001 Certified",
      description:
        trust.isoCertifiedDesc || "Security and compliance standards met",
    },
  ];

  return (
    <Section className="bg-transparent">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustSignals.map((signal, idx) => {
            const Icon = signal.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 flex-shrink-0">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1">
                    {signal.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {signal.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Client Logos Section - Optional */}
        <div className="mt-12 pt-12 border-t border-border text-center">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
            {trust.trustedBy || "Trusted by leading companies"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {/* Placeholder for client logos - replace with actual logos */}
            <div className="h-12 px-6 bg-muted/30 rounded-lg flex items-center">
              <span className="text-muted-foreground text-sm font-medium">
                Client Logo 1
              </span>
            </div>
            <div className="h-12 px-6 bg-muted/30 rounded-lg flex items-center">
              <span className="text-muted-foreground text-sm font-medium">
                Client Logo 2
              </span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
