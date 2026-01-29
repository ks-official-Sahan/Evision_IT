"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Shield,
  Layers,
  Accessibility,
  ArrowRight,
  Smartphone,
  Monitor,
} from "lucide-react";

const trustBadges = [
  { icon: Zap, label: "Performance-first" },
  { icon: Shield, label: "Security-by-design" },
  { icon: Layers, label: "Scalable delivery" },
  { icon: Accessibility, label: "Accessible UX" },
];

export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-background pt-8 pb-16 lg:pt-16 lg:pb-24"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Digital transformation for growing businesses
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              High-performance websites, apps, e-commerce and digital
              marketing—backed by enterprise-grade infrastructure and security
              expertise.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                size="lg"
                onClick={() => scrollToSection("#contact")}
                className="gap-2"
              >
                Book a Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("#contact")}
              >
                Get a Quote
              </Button>
              <button
                type="button"
                onClick={() => scrollToSection("#case-studies")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
              >
                View Work
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 pt-6">
              {trustBadges.map((badge) => (
                <Badge
                  key={badge.label}
                  variant="secondary"
                  className="gap-2 px-3 py-1.5 text-sm font-medium"
                >
                  <badge.icon className="h-3.5 w-3.5 text-accent" />
                  {badge.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Right - Product Mockup */}
          <div className="relative">
            <div className="relative mx-auto max-w-lg">
              {/* Desktop Mockup */}
              <div className="rounded-xl border border-border bg-card p-4 shadow-xl">
                <div className="flex items-center gap-2 pb-3 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="h-5 w-32 rounded-full bg-muted" />
                  </div>
                </div>
                <div className="pt-4 space-y-3">
                  <div className="h-6 w-3/4 rounded bg-muted" />
                  <div className="h-4 w-full rounded bg-muted/60" />
                  <div className="h-4 w-5/6 rounded bg-muted/60" />
                  <div className="grid grid-cols-3 gap-3 pt-4">
                    <div className="h-20 rounded-lg bg-accent/10 border border-accent/20" />
                    <div className="h-20 rounded-lg bg-muted" />
                    <div className="h-20 rounded-lg bg-muted" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <div className="h-10 flex-1 rounded-lg bg-primary" />
                    <div className="h-10 w-24 rounded-lg bg-muted" />
                  </div>
                </div>
              </div>

              {/* Mobile Mockup (floating) */}
              <div className="absolute -right-4 bottom-8 w-32 rounded-2xl border border-border bg-card p-2 shadow-xl lg:-right-8 lg:w-40">
                <div className="rounded-lg bg-muted/30 p-2">
                  <div className="flex items-center gap-2 pb-2">
                    <Smartphone className="h-3 w-3 text-muted-foreground" />
                    <div className="h-2 w-12 rounded bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-muted/60" />
                    <div className="h-3 w-3/4 rounded bg-muted/60" />
                    <div className="h-8 w-full rounded bg-accent/20 mt-3" />
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -left-4 top-12 rounded-lg border border-border bg-card px-3 py-2 shadow-lg lg:-left-8">
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium">Web + Mobile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
