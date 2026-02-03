import React from "react";
import Image from "next/image";
import { Clock, Calendar, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface HeroArticleProps {
  type: "blog" | "case-study";
  breadcrumbs: { label: string; href?: string }[];
  category: string;
  title: string;
  excerpt?: string;
  image?: string;
  imageAlt?: string;
  metadata?: {
    date?: string;
    readTime?: number;
    client?: string;
  };
  className?: string;
}

export function HeroArticle({
  type,
  breadcrumbs,
  category,
  title,
  excerpt,
  image,
  imageAlt,
  metadata,
  className,
}: HeroArticleProps) {
  return (
    <Section
      className={cn(
        "relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden",
        className,
      )}
    >
      {/* Background image with overlay */}
      {image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-background/70 via-background/85 to-background" />
        </div>
      )}

      {/* Fallback gradient if no image */}
      {!image && (
        <div
          className="absolute inset-0 z-0 bg-linear-to-br from-accent/5 via-background to-background"
          aria-hidden="true"
        />
      )}

      <Container className="relative z-10">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {crumb.href ? (
                    <BreadcrumbLink href={crumb.href}>
                      {crumb.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Category badge */}
        <Badge
          variant="secondary"
          className="mb-4 bg-accent/20 text-accent border-accent/30"
        >
          {type === "case-study" ? "Case Study" : category}
        </Badge>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance max-w-4xl mb-4">
          {title}
        </h1>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-6 text-pretty">
            {excerpt}
          </p>
        )}

        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground">
          {metadata?.date && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <time dateTime={metadata.date}>
                {new Date(metadata.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </span>
          )}

          {metadata?.readTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" aria-hidden="true" />
              {metadata.readTime} min read
            </span>
          )}

          {metadata?.client && (
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4" aria-hidden="true" />
              <span className="font-medium text-foreground">
                {metadata.client}
              </span>
            </span>
          )}
        </div>
      </Container>
    </Section>
  );
}
