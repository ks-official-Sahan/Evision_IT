"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface GlassCardArticleProps {
  href: string;
  image: string;
  imageAlt: string;
  category: string;
  title: string;
  excerpt: string;
  metadata?: {
    date?: string;
    readTime?: number;
    author?: string;
  };
  variant?: "default" | "wide" | "tall" | "featured";
  className?: string;
}

export function GlassCardArticle({
  href,
  image,
  imageAlt,
  category,
  title,
  excerpt,
  metadata,
  variant = "default",
  className,
}: GlassCardArticleProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setSpotlightPos({ x, y });
    };

    card.addEventListener("mousemove", handleMouseMove);
    return () => card.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const imageHeight =
    variant === "featured" || variant === "tall"
      ? "h-48 md:h-56"
      : "h-40 md:h-44";

  return (
    <Link
      ref={cardRef}
      href={href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl",
        "bg-card/90 backdrop-blur-xl border border-border/60",
        "transition-all duration-300 ease-in-out",
        "hover:bg-card hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1",
        "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
        className,
      )}
      style={
        {
          "--spotlight-x": `${spotlightPos.x}%`,
          "--spotlight-y": `${spotlightPos.y}%`,
        } as React.CSSProperties
      }
    >
      {/* Spotlight gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle at var(--spotlight-x) var(--spotlight-y), rgba(37, 187, 232, 0.12) 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      {/* Image container - fixed height for consistency */}
      <div className={cn("relative overflow-hidden shrink-0", imageHeight)}>
        {!imageError ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-accent/10 via-muted to-muted flex items-center justify-center">
            <div className="text-center text-muted-foreground/60">
              <ImageOff className="w-10 h-10 mx-auto mb-2" aria-hidden="true" />
              <span className="text-xs">Image unavailable</span>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-card/90 via-card/30 to-transparent" />

        {/* Category badge */}
        <Badge
          className="absolute top-3 left-3 bg-accent/90 text-accent-foreground backdrop-blur-sm shadow-md"
          variant="secondary"
        >
          {category}
        </Badge>
      </div>

      {/* Content - grow to fill remaining space */}
      <div className="flex flex-col grow p-5">
        <h3
          className={cn(
            "font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors mb-2",
            variant === "featured" ? "text-xl" : "text-base",
          )}
        >
          {title}
        </h3>

        <p className="text-muted-foreground line-clamp-2 text-sm grow mb-3">
          {excerpt}
        </p>

        {/* Metadata row */}
        {metadata && (
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {metadata.date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <time dateTime={metadata.date}>
                  {new Date(metadata.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </span>
            )}
            {metadata.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                {metadata.readTime} min
              </span>
            )}
          </div>
        )}

        {/* Read more indicator - always at bottom */}
        <div className="flex items-center gap-1 text-accent text-sm font-medium pt-3 mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Read more</span>
          <ArrowRight
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl border-2 border-accent/0 group-hover:border-accent/20 transition-colors pointer-events-none"
        aria-hidden="true"
      />
    </Link>
  );
}
