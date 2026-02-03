"use client";

import React from "react";
import Link from "next/link";
import type { Route } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Rocket,
  Server,
  Shield,
  Zap,
  Globe,
  Code,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Icon mapping for solutions
const iconMap: Record<string, React.ElementType> = {
  "digital-products": Rocket,
  "it-infrastructure": Server,
  "managed-support": Shield,
  default: Zap,
};

interface Solution {
  id: string;
  title: string;
  description: string;
  icon?: string;
  features: string[];
  href?: string;
  isPopular?: boolean;
}

interface SolutionCardEnhancedProps {
  solution: Solution;
  locale?: string;
  className?: string;
  variant?: "default" | "featured";
}

export function SolutionCardEnhanced({
  solution,
  locale = "en",
  className,
  variant = "default",
}: SolutionCardEnhancedProps) {
  const IconComponent = (iconMap[solution.id] || iconMap["default"]) as any;
  const href = solution.href || `/${locale}/solutions#${solution.id}`;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        "glass-card-enhanced spotlight-card",
        "hover:shadow-xl hover:-translate-y-1",
        variant === "featured" && "border-accent/30 bg-accent/5",
        className,
      )}
    >
      {/* Spotlight gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(37, 187, 232, 0.06), transparent 40%)",
        }}
      />

      {/* Popular badge */}
      {solution.isPopular && (
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="default" className="bg-accent text-accent-foreground">
            Popular
          </Badge>
        </div>
      )}

      <CardHeader className="relative z-10 pb-4">
        {/* Icon container with glow effect */}
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-xl mb-4",
            "bg-linear-to-br from-accent/20 to-accent/5",
            "border border-accent/20",
            "group-hover:from-accent/30 group-hover:to-accent/10",
            "group-hover:border-accent/40 group-hover:shadow-lg group-hover:shadow-accent/20",
            "transition-all duration-300",
          )}
        >
          <IconComponent className="h-7 w-7 text-accent" />
        </div>

        <CardTitle className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
          {solution.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground mt-2 text-pretty">
          {solution.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="relative z-10 pt-0">
        {/* Features list */}
        <div className="space-y-2.5 mb-6">
          {solution.features.map((feature: string, index: number) => (
            <div
              key={feature}
              className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-accent/70 group-hover:bg-accent transition-colors" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          variant="outline"
          className={cn(
            "w-full bg-transparent border-border/50",
            "group-hover:border-accent/50 group-hover:bg-accent/5",
            "transition-all duration-300",
          )}
          asChild
        >
          <Link href={href as Route}>
            <span>Learn More</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default SolutionCardEnhanced;
