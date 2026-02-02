"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Palette,
  Cloud,
  Shield,
  Settings,
  Sparkles,
} from "lucide-react";
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
  const prefersReducedMotion = useReducedMotion();
  const solutions = dict?.solutions || {};

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
      gradient: "from-accent via-accent/80 to-cyan-400",
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
      gradient: "from-blue-400 to-indigo-500",
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
      gradient: "from-rose-400 to-red-500",
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
      gradient: "from-purple-400 to-violet-500",
    },
  ];

  return (
    <Section className="section-gradient-2">
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
        {solutionItems.map((solution, idx) => {
          const Icon = solution.icon;
          return (
            <motion.div
              key={solution.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
            >
              <Link href={solution.href} className="block h-full">
                <div
                  className={cn(
                    "glass-card h-full p-6 group relative overflow-hidden",
                    solution.featured && "border-accent/40",
                  )}
                >
                  {/* Featured glow effect */}
                  {solution.featured && (
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent pointer-events-none" />
                  )}

                  {/* Header */}
                  <div className="flex items-start justify-between relative z-10">
                    <div
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg transition-all duration-300",
                        solution.gradient,
                        "group-hover:scale-110 group-hover:shadow-xl",
                      )}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    {solution.featured && (
                      <Badge className="flex items-center gap-1 bg-accent/10 text-accent border-accent/30">
                        <Sparkles className="h-3 w-3" />
                        {(solutions.primaryFocus as string) || "Primary Focus"}
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="mt-5 relative z-10">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      {solution.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {solution.description}
                    </p>

                    {/* Service Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {solution.services.map((service: string) => (
                        <span
                          key={service}
                          className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    {/* Arrow Link */}
                    <div className="mt-5 flex items-center text-sm font-medium text-accent">
                      {(solutions.exploreSolutions as string) ||
                        "Explore solutions"}
                      <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* View All CTA */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <Button asChild variant="outline" size="lg" className="btn-glow">
          <Link href={`/${locale}/solutions`}>
            {(solutions.viewAllSolutions as string) || "View All Solutions"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
}
