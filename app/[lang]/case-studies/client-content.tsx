"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { type Locale } from "@/lib/config";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCardArticle } from "@/components/ui/glass-card-article";
import { EmptyState } from "@/components/ui/empty-state";
import { caseStudies } from "@/lib/data";
import { Filter, X, Briefcase, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseStudiesClientContentProps {
  locale: Locale;
  dict?: Record<string, unknown>;
}

export function CaseStudiesClientContent({
  locale,
  dict,
}: CaseStudiesClientContentProps) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const selectedService = searchParams.get("service");

  const [activeCategory, setActiveCategory] = useState<string | null>(
    selectedCategory,
  );
  const [activeService, setActiveService] = useState<string | null>(
    selectedService,
  );

  const caseStudiesDict = (dict?.caseStudies || {}) as Record<string, string>;

  // Get unique categories and services for filters
  const categories = useMemo(() => {
    return Array.from(new Set(caseStudies.map((cs) => cs.category)));
  }, []);

  const availableServices = useMemo(() => {
    const serviceSet = new Set(caseStudies.flatMap((cs) => cs.services));
    return Array.from(serviceSet);
  }, []);

  // Filter case studies
  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter((cs) => {
      if (activeCategory && cs.category !== activeCategory) return false;
      if (activeService && !cs.services.includes(activeService)) return false;
      return true;
    });
  }, [activeCategory, activeService]);

  const clearFilters = useCallback(() => {
    setActiveCategory(null);
    setActiveService(null);
  }, []);

  const hasActiveFilters = activeCategory !== null || activeService !== null;

  // Format service name for display
  const formatServiceName = (service: string) => {
    return service
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <>
      {/* Filters Section */}
      <Section
        className="py-8 md:py-12 bg-muted/30 border-y border-border/30"
        aria-labelledby="case-studies-filters-heading"
      >
        <Container>
          {/* Screen reader heading */}
          <h2 id="case-studies-filters-heading" className="sr-only">
            Filter case studies by category or service type
          </h2>

          <div className="flex flex-col gap-6 md:gap-8">
            {/* Category filters */}
            <div>
              <h3
                id="category-filter-heading"
                className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2"
              >
                <Layers className="h-4 w-4 text-accent" aria-hidden="true" />
                {caseStudiesDict.filterByCategory || "Filter by Category"}
              </h3>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-labelledby="category-filter-heading"
              >
                <Button
                  variant={activeCategory === null ? "default" : "outline"}
                  onClick={() => setActiveCategory(null)}
                  size="sm"
                  aria-pressed={activeCategory === null}
                  className={cn(
                    "transition-all",
                    activeCategory === null && "shadow-md",
                  )}
                >
                  {caseStudiesDict.allCategories || "All Categories"}
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      activeCategory === category ? "default" : "outline"
                    }
                    onClick={() => setActiveCategory(category)}
                    size="sm"
                    aria-pressed={activeCategory === category}
                    className={cn(
                      "transition-all",
                      activeCategory === category && "shadow-md",
                    )}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Service filters */}
            <div>
              <h3
                id="service-filter-heading"
                className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2"
              >
                <Briefcase className="h-4 w-4 text-accent" aria-hidden="true" />
                {caseStudiesDict.filterByService || "Filter by Service"}
              </h3>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-labelledby="service-filter-heading"
              >
                <Button
                  variant={activeService === null ? "default" : "outline"}
                  onClick={() => setActiveService(null)}
                  size="sm"
                  aria-pressed={activeService === null}
                  className={cn(
                    "transition-all",
                    activeService === null && "shadow-md",
                  )}
                >
                  {caseStudiesDict.allServices || "All Services"}
                </Button>
                {availableServices.map((service) => (
                  <Button
                    key={service}
                    variant={activeService === service ? "default" : "outline"}
                    onClick={() => setActiveService(service)}
                    size="sm"
                    aria-pressed={activeService === service}
                    className={cn(
                      "transition-all",
                      activeService === service && "shadow-md",
                    )}
                  >
                    {formatServiceName(service)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Active filters summary */}
            {hasActiveFilters && (
              <div
                className="flex items-center gap-3 pt-2 border-t border-border/30"
                role="status"
                aria-live="polite"
              >
                <span className="text-sm text-muted-foreground">
                  Active filters:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeCategory && (
                    <Badge
                      variant="secondary"
                      className="gap-1 pr-1 bg-accent/20 text-accent"
                    >
                      {activeCategory}
                      <button
                        onClick={() => setActiveCategory(null)}
                        className="ml-1 p-0.5 rounded-full hover:bg-accent/30 transition-colors"
                        aria-label={`Remove ${activeCategory} category filter`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {activeService && (
                    <Badge
                      variant="secondary"
                      className="gap-1 pr-1 bg-accent/20 text-accent"
                    >
                      {formatServiceName(activeService)}
                      <button
                        onClick={() => setActiveService(null)}
                        className="ml-1 p-0.5 rounded-full hover:bg-accent/30 transition-colors"
                        aria-label={`Remove ${formatServiceName(activeService)} service filter`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Case Studies Grid */}
      <Section
        className="py-12 md:py-16"
        aria-labelledby="case-studies-grid-heading"
      >
        <Container>
          {/* Screen reader heading */}
          <h2 id="case-studies-grid-heading" className="sr-only">
            Case studies and success stories
          </h2>

          {filteredCaseStudies.length > 0 ? (
            <>
              {/* Results count */}
              <p
                className="text-sm text-muted-foreground mb-6"
                role="status"
                aria-live="polite"
              >
                Showing {filteredCaseStudies.length} of {caseStudies.length}{" "}
                case studies
              </p>

              {/* Grid - uniform height cards */}
              <div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                role="list"
              >
                {filteredCaseStudies.map((caseStudy, index) => (
                  <div key={caseStudy.slug} role="listitem">
                    <GlassCardArticle
                      href={`/${locale}/case-studies/${caseStudy.slug}`}
                      image={caseStudy.image}
                      imageAlt={`${caseStudy.client} - ${caseStudy.title}`}
                      category={caseStudy.category}
                      title={caseStudy.title}
                      excerpt={caseStudy.excerpt}
                      metadata={{ date: caseStudy.publishedAt }}
                      className={cn(
                        "h-full animate-fade-in",
                        `stagger-${Math.min(index + 1, 5)}`,
                      )}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              icon={<Filter className="h-12 w-12" />}
              title={caseStudiesDict.noResults || "No case studies found"}
              description="Try adjusting your filters to see more results."
              action={
                <Button variant="outline" onClick={clearFilters}>
                  {caseStudiesDict.clearFilters || "Clear Filters"}
                </Button>
              }
            />
          )}
        </Container>
      </Section>
    </>
  );
}
