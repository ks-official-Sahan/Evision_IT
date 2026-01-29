"use client";

import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Cloud, Shield, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const solutions = [
  {
    id: "digital",
    icon: Palette,
    title: "Digital Products & Growth",
    description:
      "Websites, apps, e-commerce, and digital marketing to launch and grow your online presence.",
    services: ["Web Development", "Mobile Apps", "E-commerce", "SEO & Marketing"],
    href: "/solutions#digital",
    featured: true,
  },
  {
    id: "infrastructure",
    icon: Cloud,
    title: "Cloud & Infrastructure",
    description:
      "Scalable cloud solutions and network infrastructure for reliable, high-performance operations.",
    services: ["Cloud Migration", "Network Design", "DevOps", "Monitoring"],
    href: "/solutions#infrastructure",
  },
  {
    id: "security",
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Protect your business with comprehensive security assessments, compliance, and monitoring.",
    services: ["Security Audits", "Penetration Testing", "Compliance", "Training"],
    href: "/solutions#security",
  },
  {
    id: "managed",
    icon: Settings,
    title: "Managed IT Services",
    description:
      "Proactive IT management and support so you can focus on your core business.",
    services: ["24/7 Support", "Maintenance", "Help Desk", "Strategic Consulting"],
    href: "/solutions#managed",
  },
];

export function SolutionsOverview() {
  return (
    <Section>
      <SectionHeader
        badge="Solutions"
        title="Comprehensive IT solutions for every need"
        description="From digital products to enterprise security, we have the expertise to help your business thrive."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {solutions.map((solution) => (
          <Link key={solution.id} href={solution.href}>
            <Card
              className={cn(
                "group h-full transition-all hover:shadow-lg hover:border-accent",
                solution.featured && "md:row-span-1 border-accent/50 bg-accent/5"
              )}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-lg transition-colors",
                      solution.featured
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-foreground group-hover:bg-accent group-hover:text-accent-foreground"
                    )}
                  >
                    <solution.icon className="h-6 w-6" />
                  </div>
                  {solution.featured && (
                    <Badge>Primary Focus</Badge>
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
                  {solution.services.map((service) => (
                    <Badge key={service} variant="secondary" className="font-normal">
                      {service}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex items-center text-sm font-medium text-accent">
                  Explore solutions
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/solutions">
            View All Solutions
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
