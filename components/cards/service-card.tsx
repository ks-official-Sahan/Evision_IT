"use client";

import React from "react"

import Link from "next/link";
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
}

export function ServiceCard({
  service,
  variant = "default",
  className,
}: ServiceCardProps) {
  const IconComponent = Icons[service.icon as keyof typeof Icons] as React.ElementType;

  if (variant === "compact") {
    return (
      <Link href={`/services/${service.slug}`}>
        <Card className={cn("group h-full transition-colors hover:border-accent", className)}>
          <CardContent className="flex items-center gap-4 p-4">
            {IconComponent && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <IconComponent className="h-5 w-5" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-foreground truncate">
                {service.shortTitle}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {service.excerpt}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/services/${service.slug}`}>
      <Card
        className={cn(
          "group h-full transition-all hover:shadow-lg hover:border-accent",
          {
            "border-accent bg-accent/5": variant === "featured",
          },
          className
        )}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            {IconComponent && (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <IconComponent className="h-6 w-6" />
              </div>
            )}
            {service.isFeatured && (
              <Badge variant="secondary" className="shrink-0">
                Popular
              </Badge>
            )}
          </div>
          <CardTitle className="mt-4 text-lg group-hover:text-accent transition-colors">
            {service.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {service.excerpt}
          </p>
          <div className="mt-4 flex items-center text-sm font-medium text-accent">
            Learn more
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
