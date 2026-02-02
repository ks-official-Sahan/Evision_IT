"use client";

import React from "react";

import Link from "next/link";
import type { Route } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Icon as Icons } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/data";

interface ServiceCardProps {
  service: Service;
  variant?: "default" | "compact" | "featured";
  className?: string;
  locale?: string;
}

export function ServiceCard({
  service,
  variant = "default",
  className,
  locale = "en",
}: ServiceCardProps) {
  const IconComponent = Icons[
    service.icon as keyof typeof Icons
  ] as React.ElementType;
  const href = `/${locale}/services/${service.slug}`;

  // Compact variant (e.g. for sidebar or lists)
  if (variant === "compact") {
    return (
      <Link href={href as Route}>
        <Card
          className={cn(
            "group h-full transition-all duration-300 hover:border-accent/40 bg-card/50 hover:bg-card/80",
            className,
          )}
        >
          <CardContent className="flex items-center gap-4 p-4">
            {IconComponent && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                <IconComponent className="h-5 w-5" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-foreground truncate group-hover:text-accent transition-colors">
                {service.shortTitle}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {service.excerpt}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0 group-hover:translate-x-1" />
          </CardContent>
        </Card>
      </Link>
    );
  }

  // Default / Featured variant with Spotlight and Glassmorphism
  return (
    <Link href={href as Route}>
      <Card
        className={cn(
          "group relative h-full overflow-hidden transition-all duration-300",
          "glass-card-enhanced",
          "hover:-translate-y-1 hover:shadow-xl",
          {
            "border-accent/40 bg-accent/5": variant === "featured",
          },
          className,
        )}
      >
        {/* Spotlight Effect Overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(37, 187, 232, 0.06), transparent 40%)",
          }}
        />

        <CardHeader>
          <div className="flex items-start justify-between gap-4 relative z-10">
            {IconComponent && (
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-accent/10 to-accent/5 border border-accent/10 text-accent group-hover:from-accent/20 group-hover:to-accent/10 group-hover:border-accent/30 group-hover:shadow-lg group-hover:shadow-accent/10 transition-all duration-300">
                <IconComponent className="h-6 w-6" />
              </div>
            )}
            {service.isFeatured && (
              <Badge
                variant="default"
                className="shrink-0 bg-accent text-accent-foreground shadow-sm"
              >
                Popular
              </Badge>
            )}
          </div>
          <CardTitle className="mt-4 text-xl group-hover:text-accent transition-colors relative z-10">
            {service.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 text-pretty">
            {service.excerpt}
          </p>
          <div className="flex items-center text-sm font-semibold text-accent/90 group-hover:text-accent">
            Learn more
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
