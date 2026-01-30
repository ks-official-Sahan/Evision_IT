"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { type Locale } from "@/lib/config";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { caseStudies } from "@/lib/data";
import { ArrowRight, Filter } from "lucide-react";

interface CaseStudiesClientContentProps {
  locale: Locale;
  dict?: any;
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

  const caseStudiesDict = dict?.caseStudies || {};

  // Get unique categories and services for filters
  const categories = useMemo(() => {
    return Array.from(new Set(caseStudies.map((cs) => cs.category)));
  }, []);

  const availableServices = useMemo(() => {
    return Array.from(new Set(caseStudies.flatMap((cs) => cs.services)));
  }, []);

  // Filter case studies
  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter((cs) => {
      if (activeCategory && cs.category !== activeCategory) return false;
      if (activeService && !cs.services.includes(activeService)) return false;
      return true;
    });
  }, [activeCategory, activeService]);

  return (
    <>
      {/* Filters Section */}
      <Section background="muted">
        <Container>
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {caseStudiesDict.filterByCategory || "Filter by Category"}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={activeCategory === null ? "default" : "outline"}
                  onClick={() => setActiveCategory(null)}
                  className="text-sm"
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
                    className="text-sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {caseStudiesDict.filterByService || "Filter by Service"}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={activeService === null ? "default" : "outline"}
                  onClick={() => setActiveService(null)}
                  className="text-sm"
                >
                  {caseStudiesDict.allServices || "All Services"}
                </Button>
                {availableServices.map((service) => (
                  <Button
                    key={service}
                    variant={activeService === service ? "default" : "outline"}
                    onClick={() => setActiveService(service)}
                    className="text-sm"
                  >
                    {service}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Case Studies Grid */}
      <Section>
        <Container>
          {filteredCaseStudies.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCaseStudies.map((caseStudy) => (
                <Link
                  key={caseStudy.slug}
                  href={`/${locale}/case-studies/${caseStudy.slug}`}
                >
                  <Card className="h-full glass hover:shadow-lg transition-shadow cursor-pointer">
                    {/* Image Placeholder */}
                    <div className="h-48 bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">
                        {caseStudiesDict.projectImage || "Project Image"}
                      </span>
                    </div>

                    <CardHeader>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {caseStudy.category}
                        </Badge>
                        {caseStudy.services[0] && (
                          <Badge variant="outline" className="text-xs">
                            {caseStudy.services[0]}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">
                        {caseStudy.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {caseStudy.excerpt}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3">
                        {caseStudy.results[0] && (
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase">
                              {caseStudy.results[0].metric}
                            </p>
                            <p className="text-sm font-bold text-accent">
                              {caseStudy.results[0].value}
                            </p>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-accent text-sm font-medium">
                          {caseStudiesDict.readCaseStudy || "Read Case Study"}
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                {caseStudiesDict.noResults || "No case studies found."}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setActiveCategory(null);
                  setActiveService(null);
                }}
              >
                {caseStudiesDict.clearFilters || "Clear Filters"}
              </Button>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
