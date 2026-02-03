"use client";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ResourceCard, ResourceGrid } from "@/components/cards/resource-card";
import type { Locale } from "@/lib/config";
import { motion, Variants } from "framer-motion";
import {
  BookOpen,
  FileText,
  Video,
  Code,
  FileSearch,
  ClipboardList,
  Sparkles,
  GraduationCap,
  ArrowRight,
  Download,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ResourcesClientProps {
  locale: Locale;
  dict: any;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ResourcesClient({
  locale,
  dict,
}: ResourcesClientProps) {
  const resources = [
    {
      id: "guides",
      title: "Implementation Guides",
      description:
        "Step-by-step guides for implementing digital solutions and best practices",
      icon: BookOpen,
      count: 12,
      href: `/${locale}/resources/guides`,
    },
    {
      id: "case-studies",
      title: dict.caseStudies.title,
      description: "Learn from real-world project examples and success stories",
      icon: FileSearch,
      count: 15,
      href: `/${locale}/case-studies`,
      featured: true,
    },
    {
      id: "webinars",
      title: "Webinars & Workshops",
      description:
        "Live training sessions and recorded workshops from industry experts",
      icon: Video,
      count: 8,
      href: `/${locale}/resources/webinars`,
      badge: "New",
    },
    {
      id: "documentation",
      title: "Technical Documentation",
      description: "Comprehensive API references and integration documentation",
      icon: Code,
      count: 25,
      href: `/${locale}/resources/docs`,
    },
    {
      id: "whitepapers",
      title: "Whitepapers",
      description: "In-depth research papers and industry insights",
      icon: FileText,
      count: 6,
      href: `/${locale}/resources/whitepapers`,
    },
    {
      id: "templates",
      title: "Templates & Checklists",
      description: "Ready-to-use templates for planning and project execution",
      icon: ClipboardList,
      count: 20,
      href: `/${locale}/resources/templates`,
    },
  ];

  const featuredResource = {
    title: "Digital Transformation Starter Kit",
    description:
      "Everything you need to begin your digital transformation journey. Includes guides, templates, and expert insights.",
    ctas: [
      { label: "Download Free", href: "#", icon: Download },
      { label: "Learn More", href: `/${locale}/contact`, icon: ArrowRight },
    ],
  };

  return (
    <>
      {/* Sr-only SEO content */}
      <div className="sr-only">
        <h1>Resources - Evision IT Learning Center Sri Lanka</h1>
        <p>
          Access Evision IT's comprehensive learning resources including
          implementation guides, case studies, webinars, technical
          documentation, whitepapers, and templates. Free educational content
          for digital transformation, web development, mobile app development,
          and IT solutions in Sri Lanka.
        </p>
      </div>

      {/* Hero Section */}
      <Section padding="lg" className="relative overflow-hidden pt-24 md:pt-32">
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-accent/10 via-background to-background" />
        <div className="absolute top-20 right-0 -mr-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 left-0 -ml-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />

        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants}>
              <Breadcrumbs
                items={[{ label: "Resources", href: `/${locale}/resources` }]}
                locale={locale}
                className="justify-center mb-8"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Badge
                variant="outline"
                className="mb-6 px-4 py-2 border-accent/30 bg-accent/5 text-accent"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Learning Center
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              <span className="text-foreground">Knowledge </span>
              <span className="text-gradient-accent">Resources</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Guides, documentation, and tools to accelerate your digital
              transformation journey and help you succeed.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* Featured Resource Banner */}
      <Section padding="sm" className="relative">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-linear-to-r from-accent/20 via-accent/10 to-primary/20 border border-accent/30 p-6 md:p-8"
          >
            {/* Decorative */}
            <div className="absolute right-0 top-0 -mr-20 -mt-20 w-64 h-64 bg-accent/30 rounded-full blur-3xl opacity-50" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg">
                <Rocket className="h-8 w-8" />
              </div>

              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {featuredResource.title}
                </h2>
                <p className="text-muted-foreground max-w-xl">
                  {featuredResource.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {featuredResource.ctas.map((cta, idx) => (
                  <Button
                    key={idx}
                    variant={idx === 0 ? "default" : "outline"}
                    size="lg"
                    asChild
                  >
                    <Link href={cta.href} className="gap-2">
                      {cta.label}
                      <cta.icon className="h-4 w-4" />
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Resources Grid */}
      <Section>
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="mb-8 flex items-center justify-between"
            >
              <div>
                <Badge
                  variant="outline"
                  className="mb-4 px-4 py-2 border-accent/30 bg-accent/5 text-accent"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Browse Resources
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Explore Our Library
                </h2>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <ResourceGrid>
                {resources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    title={resource.title}
                    description={resource.description}
                    icon={resource.icon}
                    itemCount={resource.count}
                    href={resource.href}
                    featured={resource.featured}
                    badge={resource.badge}
                  />
                ))}
              </ResourceGrid>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-muted/30 via-muted/50 to-background" />

        <Container size="sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Need Custom Solutions?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Our team of experts is ready to help you build tailored solutions
              for your business needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href={`/${locale}/contact`}>
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href={`/${locale}/services`}>View Services</Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
