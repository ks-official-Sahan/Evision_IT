"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "Web", "App", "E-commerce", "Marketing"];

const caseStudies = [
  {
    id: 1,
    category: "Web",
    title: "Enterprise SaaS Platform Redesign",
    outcome: "+42% Leads",
    summary:
      "Complete UX overhaul for a B2B software company, resulting in significantly improved conversion rates and user engagement metrics.",
    image: "bg-gradient-to-br from-accent/20 to-accent/5",
  },
  {
    id: 2,
    category: "E-commerce",
    title: "Multi-vendor Marketplace Launch",
    outcome: "+28% Conversion",
    summary:
      "Built a scalable marketplace platform with advanced search, secure payments, and vendor management for a retail client.",
    image: "bg-gradient-to-br from-primary/10 to-muted",
  },
  {
    id: 3,
    category: "App",
    title: "Healthcare Mobile Application",
    outcome: "2.1s LCP",
    summary:
      "Developed a HIPAA-compliant mobile app for patient engagement with real-time notifications and secure messaging.",
    image: "bg-gradient-to-br from-accent/15 to-muted",
  },
];

export function CaseStudiesSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredStudies =
    activeFilter === "All"
      ? caseStudies
      : caseStudies.filter((study) => study.category === activeFilter);

  return (
    <section id="case-studies" className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4">
            Case Studies
          </Badge>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl text-balance">
            Results you can measure
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Real projects, real outcomes. See how we help businesses achieve
            their digital goals.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                activeFilter === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Case Study Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStudies.map((study) => (
            <Card
              key={study.id}
              className="group overflow-hidden border-border hover:border-accent/50 transition-all hover:shadow-lg"
            >
              <div
                className={cn(
                  "h-48 w-full flex items-center justify-center",
                  study.image
                )}
              >
                <div className="text-4xl font-semibold text-accent">
                  {study.outcome}
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{study.category}</Badge>
                </div>
                <h3 className="text-lg font-semibold text-foreground mt-2">
                  {study.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {study.summary}
                </p>
                <Button variant="outline" size="sm" className="gap-2 group/btn bg-transparent">
                  View case study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
