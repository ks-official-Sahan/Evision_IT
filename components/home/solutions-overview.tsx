"use client";

import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Cloud, Shield, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Locale } from "@/lib/config";
import { type Dictionary } from "@/lib/i18n/get-dict";

interface SolutionsOverviewProps {
  dict?: any;
  locale?: Locale;
}

export function SolutionsOverview({
  dict,
  locale = "en",
}: SolutionsOverviewProps) {
  const solutions = dict?.solutions || {};
  const cta = dict?.cta || {};

  const solutionItems = [
    {
      id: "digital",
      icon: Palette,
      title: solutions.digitalProducts?.name || "Digital Products & Growth",
      description:
        solutions.digitalProducts?.description ||
        "Websites, apps, e-commerce, and digital marketing to launch and grow your online presence.",
      services: solutions.digitalProducts?.features || [
        "Web Development",
        "Mobile Apps",
        "E-commerce",
        "SEO & Marketing",
      ],
      href: `/${locale}/solutions#digital`,
      featured: true,
    },
    {
      id: "infrastructure",
      icon: Cloud,
      title: solutions.cloudInfrastructure?.name || "Cloud & Infrastructure",
      description:
        solutions.cloudInfrastructure?.description ||
        "Scalable cloud solutions and network infrastructure for reliable, high-performance operations.",
      services: solutions.cloudInfrastructure?.features || [
        "Cloud Migration",
        "Network Design",
        "DevOps",
        "Monitoring",
      ],
      href: `/${locale}/solutions#infrastructure`,
    },
    {
      id: "security",
      icon: Shield,
      title: solutions.cybersecurity?.name || "Cybersecurity",
      description:
        solutions.cybersecurity?.description ||
        "Protect your business with comprehensive security assessments, compliance, and monitoring.",
      services: solutions.cybersecurity?.features || [
        "Security Audits",
        "Penetration Testing",
        "Compliance",
        "Training",
      ],
      href: `/${locale}/solutions#security`,
    },
    {
      id: "managed",
      icon: Settings,
      title: solutions.managedIT?.name || "Managed IT Services",
      description:
        solutions.managedIT?.description ||
        "Proactive IT management and support so you can focus on your core business.",
      services: solutions.managedIT?.features || [
        "24/7 Support",
        "Maintenance",
        "Help Desk",
        "Strategic Consulting",
      ],
      href: `/${locale}/solutions#managed`,
    },
  ];

  return (
    <Section>
      <SectionHeader
        badge={solutions.badge || "Solutions"}
        title={
          solutions.sectionTitle || "Comprehensive IT solutions for every need"
        }
        description={
          solutions.sectionDescription ||
          "From digital products to enterprise security, we have the expertise to help your business thrive."
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        {solutionItems.map((solution) => (
          <Link key={solution.id} href={solution.href}>
            <Card
              className={cn(
                "group h-full transition-all hover:shadow-lg hover:border-accent",
                solution.featured &&
                  "md:row-span-1 border-accent/50 bg-accent/5",
              )}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-lg transition-colors",
                      solution.featured
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-foreground group-hover:bg-accent group-hover:text-accent-foreground",
                    )}
                  >
                    <solution.icon className="h-6 w-6" />
                  </div>
                  {solution.featured && (
                    <Badge>
                      {(solutions.primaryFocus as string) || "Primary Focus"}
                    </Badge>
                  )}
                </div>
                <CardTitle className="mt-4 text-xl group-hover:text-accent transition-colors">
                  {solution.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {solution.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {solution.services.map((service: string) => (
                    <Badge
                      key={service}
                      variant="secondary"
                      className="font-normal"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex items-center text-sm font-medium text-accent">
                  {(solutions.exploreSolutions as string) ||
                    "Explore solutions"}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button asChild variant="outline" size="lg">
          <Link href={`/${locale}/solutions`}>
            {(solutions.viewAllSolutions as string) || "View All Solutions"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
