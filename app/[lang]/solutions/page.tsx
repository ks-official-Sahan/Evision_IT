import { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Zap,
  Clock,
  Users,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SolutionCardEnhanced } from "@/components/cards/solution-card-enhanced";
import { ProcessTimeline } from "@/components/ui/process-timeline";
import {
  getDictionary,
  getValidLocale,
  type Dictionary,
} from "@/lib/i18n/get-dict";
import { Locale, siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = getValidLocale(lang);
  const dict = await getDictionary(locale);

  const title = (dict.solutions as any)?.title || "Business Solutions";
  const description =
    (dict.solutions as any)?.description ||
    "Comprehensive digital solutions tailored to your business needs. From custom software to IT infrastructure.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/solutions`,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/${locale}/solutions`,
      type: "website",
    },
  };
}

// Solutions data with enhanced fields
const solutions = [
  {
    id: "digital-products",
    title: "Digital Product Development",
    description:
      "Transform your ideas into powerful digital products with custom software, web & mobile apps designed for growth.",
    icon: "rocket",
    isPopular: true,
    features: [
      "Custom Web Applications",
      "Mobile App Development",
      "E-Commerce Solutions",
      "SaaS Product Development",
    ],
    href: "/en/services?category=development",
  },
  {
    id: "it-infrastructure",
    title: "IT Infrastructure Solutions",
    description:
      "Build a secure, scalable IT foundation with cloud infrastructure, security, and enterprise networking.",
    icon: "server",
    features: [
      "Cloud Migration & Setup",
      "Network Architecture",
      "Security Implementation",
      "Disaster Recovery Planning",
    ],
    href: "/en/services?category=infrastructure",
  },
  {
    id: "managed-support",
    title: "Managed IT Support",
    description:
      "Keep your systems running smoothly with proactive monitoring, maintenance, and 24/7 technical support.",
    icon: "shield",
    features: [
      "24/7 System Monitoring",
      "Preventive Maintenance",
      "Help Desk Support",
      "Performance Optimization",
    ],
    href: "/en/services?category=support",
  },
];

// Process steps for "How We Work" section
const processSteps = [
  {
    title: "Discover",
    description:
      "We analyze your business needs and goals to understand the challenge.",
  },
  {
    title: "Design",
    description:
      "Our team crafts a tailored solution blueprint and project roadmap.",
  },
  {
    title: "Develop",
    description:
      "We build your solution using best practices and cutting-edge tech.",
  },
  {
    title: "Deploy",
    description: "Launch your solution with comprehensive testing and support.",
  },
];

// Why choose us benefits
const benefits = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Agile development with rapid iteration cycles",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description: "Expert professionals assigned to your project",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock technical assistance",
  },
];

// FAQ data for AEO optimization
const faqs = [
  {
    question: "What types of businesses do you work with?",
    answer:
      "We work with businesses of all sizes, from startups to enterprises. Our solutions are tailored to meet the specific needs of each client, whether you're in retail, healthcare, finance, or any other industry.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on complexity and scope. A simple website might take 4-6 weeks, while a complex enterprise application could take 3-6 months. We provide detailed timelines during our initial consultation.",
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer:
      "Yes, we offer comprehensive managed support packages that include monitoring, maintenance, updates, and technical support. We believe in building long-term partnerships with our clients.",
  },
  {
    question: "Can you integrate with our existing systems?",
    answer:
      "Absolutely. We specialize in creating solutions that integrate seamlessly with your existing infrastructure, including CRM systems, ERPs, databases, and third-party APIs.",
  },
];

export default async function SolutionsPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang);
  const dict = await getDictionary(locale);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: dict.nav?.solutions || "Solutions", href: `/${locale}/solutions` },
  ];

  // JSON-LD structured data for SEO
  const solutionsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Business Solutions",
    description: "Comprehensive digital solutions for business growth",
    itemListElement: solutions.map((solution, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: solution.title,
        description: solution.description,
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
        },
      },
    })),
  };

  // FAQ Schema for AEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={solutionsSchema} />
      <JsonLd data={faqSchema} />

      {/* Screen reader optimized heading */}
      <h1 className="sr-only">
        {(dict.solutions as any)?.title || "Business Solutions"} -{" "}
        {siteConfig.name}
      </h1>

      {/* Hero Section */}
      <Section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-accent/5 via-transparent to-transparent" />

        <Container className="relative z-10">
          <Breadcrumbs items={breadcrumbItems} className="mb-8" />

          <div className="max-w-3xl">
            {/* Animated badge */}
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 border-accent/30 bg-accent/5 text-accent animate-fade-in"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Tailored for Your Success
            </Badge>

            {/* Hero heading with gradient */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              <span className="text-foreground">Solutions That </span>
              <span className="text-gradient-accent">Drive Growth</span>
            </h2>

            {/* Hero description */}
            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mb-8">
              {(dict.solutions as any)?.description ||
                "From digital product development to managed IT support, we deliver comprehensive solutions that transform your business and accelerate success."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="btn-cta btn-glow" asChild>
                <Link href={`/${locale}/contact` as Route}>
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={`/${locale}/services` as Route}>
                  Explore Services
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Solutions Grid */}
      <Section className="py-16 md:py-24 section-gradient-1">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Our Solutions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Comprehensive Business Solutions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
              Choose from our range of tailored solutions designed to address
              your specific business challenges and goals.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution) => (
              <SolutionCardEnhanced
                key={solution.id}
                solution={solution}
                locale={locale}
                variant={solution.isPopular ? "featured" : "default"}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* How We Work - Process Timeline */}
      <Section className="py-16 md:py-24 bg-muted/30">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Our Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery and
              client satisfaction.
            </p>
          </div>

          <ProcessTimeline steps={processSteps} className="max-w-4xl mx-auto" />
        </Container>
      </Section>

      {/* Why Choose Us */}
      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                Why Choose Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
                Partner With Experts Who Care
              </h2>
              <p className="text-muted-foreground mb-8 text-pretty">
                We don&apos;t just build solutions—we build partnerships. Our
                team is committed to your success from day one, providing
                expertise, support, and innovation every step of the way.
              </p>

              <ul className="space-y-4">
                {[
                  "Proven track record with 200+ successful projects",
                  "Industry-certified professionals on every team",
                  "Transparent communication and reporting",
                  "Flexible engagement models to suit your needs",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <Card key={index} className="glass-card text-center p-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-accent/10 text-accent mx-auto mb-4">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section for AEO */}
      <Section className="py-16 md:py-24 bg-muted/30">
        <Container className="max-w-3xl">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find answers to common questions about our solutions and services.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card px-6 border-none"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-20 md:py-28 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-accent/10 via-transparent to-accent/5 -z-10" />

        <Container className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            Let&apos;s discuss how our solutions can help you achieve your
            goals. Schedule a free consultation today.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="btn-cta btn-glow" asChild>
              <Link href={`/${locale}/contact` as Route}>
                Schedule Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={`tel:${siteConfig.contact?.phone}`}>
                Call {siteConfig.contact?.phone}
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
