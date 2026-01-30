"use client";

import { CardContent } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { type Locale } from "@/lib/config";
import { getValidLocale } from "@/lib/i18n/get-dict";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CaseStudiesClientContent } from "./client-content";
import Filter from "@/components/icons/filter"; // Import Filter icon
import ArrowRight from "@/components/icons/arrow-right"; // Import ArrowRight icon

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function CaseStudiesPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;

  const industries = ["Technology", "Finance", "Healthcare"]; // Example industries
  const availableServices = ["Web Development", "Data Analytics", "SEO"]; // Example services
  const filteredCaseStudies = []; // Example filtered case studies
  let activeIndustry = null; // Declare activeIndustry variable
  let activeService = null; // Declare activeService variable

  const setActiveIndustry = (industry: string | null) => {
    activeIndustry = industry;
  }; // Declare setActiveIndustry function

  const setActiveService = (service: string | null) => {
    activeService = service;
  }; // Declare setActiveService function

  return (
    <>
      {/* Hero Section */}
      <Section
        padding="lg"
        className="bg-gradient-to-b from-muted/50 to-background"
      >
        <Container size="sm">
          <Breadcrumbs
            items={[{ label: "Case Studies", href: `/${locale}/case-studies` }]}
            locale={locale}
          />

          <div className="mt-8 text-center">
            <Badge variant="secondary" className="mb-6">
              Case Studies
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance mb-4">
              Real results from real projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              See how we've helped businesses across industries achieve their
              digital transformation goals.
            </p>
          </div>
        </Container>
      </Section>

      {/* Client-side filters and grid */}
      <Suspense fallback={<div className="h-96" />}>
        <CaseStudiesClientContent locale={locale} />
      </Suspense>
    </>
  );
}
