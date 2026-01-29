"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/lib/data";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  variant?: "default" | "featured";
  className?: string;
}

export function CaseStudyCard({
  caseStudy,
  variant = "default",
  className,
}: CaseStudyCardProps) {
  return (
    <Link href={`/case-studies/${caseStudy.slug}`}>
      <Card
        className={cn(
          "group h-full overflow-hidden transition-all hover:shadow-lg hover:border-accent",
          className
        )}
      >
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={caseStudy.image || "/placeholder.svg"}
            alt={caseStudy.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <Badge variant="secondary" className="bg-background/90">
              {caseStudy.category}
            </Badge>
          </div>
        </div>
        <CardContent className="p-5">
          <p className="text-xs font-medium text-accent uppercase tracking-wide">
            {caseStudy.client}
          </p>
          <h3 className="mt-2 font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
            {caseStudy.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {caseStudy.excerpt}
          </p>

          {variant === "featured" && caseStudy.results.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4">
              {caseStudy.results.slice(0, 3).map((result) => (
                <div key={result.metric} className="text-center">
                  <div className="text-lg font-semibold text-foreground">
                    {result.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {result.metric}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center text-sm font-medium text-accent">
            View case study
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
