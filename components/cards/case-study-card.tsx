"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/lib/data";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  variant?: "default" | "featured";
  className?: string;
  index?: number;
  locale?: string;
}

export function CaseStudyCard({
  caseStudy,
  variant = "default",
  className,
  index = 0,
  locale = "en",
}: CaseStudyCardProps) {
  const isFeatured = variant === "featured";
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={cn(
        isFeatured && index === 0 && "case-study-featured",
        className,
      )}
    >
      <Link
        href={`/${locale}/case-studies/${caseStudy.slug}`}
        className="block h-full"
      >
        <div className="case-study-card group h-full">
          {/* Image Container */}
          <div className="relative aspect-16/10 overflow-hidden bg-muted">
            {!imageError ? (
              <Image
                src={caseStudy.image || "/placeholder.svg"}
                alt={caseStudy.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-accent/10 via-muted to-muted flex items-center justify-center">
                <ImageOff className="w-10 h-10 text-muted-foreground/40" />
                <span className="sr-only">Image unavailable</span>
              </div>
            )}
            {/* Gradient Overlay */}
            <div className="case-study-image-overlay" />
            {/* Glass Overlay on Hover */}
            <div className="case-study-glass-overlay" />

            {/* Category Badge */}
            <div className="absolute bottom-4 left-4 z-10">
              <span className="case-study-badge">{caseStudy.category}</span>
            </div>
          </div>

          {/* Content */}
          <div className="case-study-content">
            {/* Client Name */}
            <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
              {caseStudy.client}
            </p>

            {/* Title */}
            <h3 className="font-bold text-lg text-foreground line-clamp-2 mb-2 transition-colors group-hover:text-accent">
              {caseStudy.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {caseStudy.excerpt}
            </p>

            {/* Results Metrics */}
            {isFeatured &&
              caseStudy.results &&
              caseStudy.results.length > 0 && (
                <div className="case-study-results">
                  {caseStudy.results.slice(0, 3).map((result, idx) => (
                    <div key={result.metric} className="case-study-metric">
                      <div className="case-study-metric-value">
                        {result.value}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {result.metric}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            {/* View Link */}
            <div className="case-study-link mt-4">
              <span>View case study</span>
              <ArrowRight className="h-4 w-4 case-study-link-arrow" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
