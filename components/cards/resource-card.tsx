import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, type LucideIcon } from "lucide-react";
import Link from "next/link";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  itemCount?: number;
  href?: string;
  badge?: string;
  featured?: boolean;
  className?: string;
}

export function ResourceCard({
  title,
  description,
  icon: Icon,
  itemCount,
  href = "#",
  badge,
  featured = false,
  className,
}: ResourceCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden",
        // Glassmorphism base
        "bg-card/50 backdrop-blur-sm",
        "border-border/50",
        // Hover effects
        "transition-all duration-300 ease-out",
        "hover:bg-card/70 hover:border-accent/40",
        "hover:shadow-xl hover:shadow-accent/5",
        "hover:-translate-y-1",
        // Featured variant
        featured && [
          "bg-gradient-to-br from-accent/5 via-card/50 to-card/50",
          "border-accent/30",
          "shadow-lg shadow-accent/10",
        ],
        className,
      )}
    >
      {/* Decorative gradient on hover */}
      <div
        className={cn(
          "absolute inset-0 -z-10 opacity-0 transition-opacity duration-300",
          "bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))]",
          "from-accent/10 via-transparent to-transparent",
          "group-hover:opacity-100",
        )}
      />

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          {/* Icon Container */}
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center",
              "rounded-xl",
              "bg-accent/10 text-accent",
              "transition-all duration-300",
              "group-hover:bg-accent group-hover:text-accent-foreground",
              "group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent/25",
            )}
          >
            <Icon className="h-6 w-6" />
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {featured && (
              <Badge
                variant="default"
                className="bg-accent/90 text-accent-foreground"
              >
                Featured
              </Badge>
            )}
            {badge && (
              <Badge variant="outline" className="border-border/50">
                {badge}
              </Badge>
            )}
          </div>
        </div>

        <CardTitle className="mt-4 text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
          {title}
        </CardTitle>

        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          {/* Item Count */}
          {itemCount !== undefined && (
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{itemCount}</span>{" "}
              {itemCount === 1 ? "item" : "items"}
            </span>
          )}

          {/* CTA Button */}
          <Button
            variant="ghost"
            size="sm"
            asChild
            className={cn(
              "ml-auto gap-2",
              "text-muted-foreground",
              "group-hover:text-accent",
              "transition-colors",
            )}
          >
            <Link href={href}>
              Learn More
              <ArrowRight
                className={cn(
                  "h-4 w-4",
                  "transition-transform duration-300",
                  "group-hover:translate-x-1",
                )}
              />
            </Link>
          </Button>
        </div>
      </CardContent>

      {/* Bottom accent line */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-0.5",
          "bg-gradient-to-r from-transparent via-accent/50 to-transparent",
          "opacity-0 transition-opacity duration-300",
          "group-hover:opacity-100",
        )}
      />
    </Card>
  );
}

// Grid wrapper for consistent layouts
interface ResourceGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 2 | 3;
}

export function ResourceGrid({
  children,
  className,
  columns = 3,
}: ResourceGridProps) {
  return (
    <div
      className={cn(
        "grid gap-6",
        columns === 2 && "md:grid-cols-2",
        columns === 3 && "md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}
