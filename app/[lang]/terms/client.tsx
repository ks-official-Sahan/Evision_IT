"use client";

import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FloatingToc } from "@/components/ui/floating-toc";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { LegalAccordion } from "@/components/ui/legal-accordion";
import type { Locale } from "@/lib/config";
import { motion } from "framer-motion";
import {
  FileCheck,
  CheckSquare,
  Copyright,
  ShieldAlert,
  RefreshCw,
  Ban,
  Globe,
  Gavel,
  Mail,
  Calendar,
  Scale,
  AlertTriangle,
} from "lucide-react";

interface TermsClientProps {
  locale: Locale;
  dict: any;
}

export default function TermsClient({ locale, dict }: TermsClientProps) {
  const lastUpdated = "January 28, 2025";

  const tocItems = [
    { id: "acceptance", title: dict.terms.acceptance, level: 1 },
    { id: "acceptable-use", title: dict.terms.acceptanceUse, level: 1 },
    {
      id: "intellectual-property",
      title: dict.terms.intellectualProperty,
      level: 1,
    },
    { id: "limitation", title: dict.terms.limitation, level: 1 },
    { id: "prohibited-activities", title: "Prohibited Activities", level: 1 },
    { id: "governing-law", title: "Governing Law", level: 1 },
    { id: "changes", title: dict.terms.changes, level: 1 },
    { id: "contact", title: dict.terms.contact, level: 1 },
  ];

  const sections = [
    {
      id: "acceptance",
      title: dict.terms.acceptance,
      icon: CheckSquare,
      content: (
        <>
          <p>
            By accessing and using this website or any of Evision IT&apos;s
            services, you accept and agree to be bound by the terms and
            provisions of this agreement. If you do not agree to abide by these
            terms, please do not use this website.
          </p>
          <p>
            These Terms of Service apply to all visitors, users, and others who
            access or use our services, including without limitation browsers,
            vendors, customers, merchants, and contributors of content.
          </p>
        </>
      ),
    },
    {
      id: "acceptable-use",
      title: dict.terms.acceptanceUse,
      icon: FileCheck,
      content: (
        <>
          <p>
            You agree to use this website and our services only for lawful
            purposes and in a way that does not infringe upon the rights of
            others or restrict their use and enjoyment.
          </p>
          <p>
            <strong>Acceptable uses include:</strong>
          </p>
          <ul>
            <li>Browsing and researching our services and offerings</li>
            <li>Contacting us for legitimate business inquiries</li>
            <li>Using our services as intended and as described</li>
            <li>Sharing our content with proper attribution</li>
          </ul>
          <p>
            Any use of our website or services that violates our policies,
            applicable laws, or ethical standards may result in termination of
            access and potential legal action.
          </p>
        </>
      ),
    },
    {
      id: "intellectual-property",
      title: dict.terms.intellectualProperty,
      icon: Copyright,
      content: (
        <>
          <p>
            All content on this website, including but not limited to text,
            graphics, logos, images, audio clips, video clips, digital
            downloads, data compilations, and software, is the property of
            Evision IT or its content suppliers and is protected by
            international copyright and trademark laws.
          </p>
          <p>
            <strong>You may not:</strong>
          </p>
          <ul>
            <li>
              Reproduce, duplicate, copy, sell, resell, or exploit any portion
              of our content without express written permission
            </li>
            <li>Modify or create derivative works based on our materials</li>
            <li>
              Use our trademarks, logos, or branding without authorization
            </li>
            <li>
              Remove any copyright or other proprietary notices from our
              materials
            </li>
          </ul>
          <p>
            Evision IT and the Evision IT logo are registered trademarks. All
            other trademarks appearing on this website are the property of their
            respective owners.
          </p>
        </>
      ),
    },
    {
      id: "limitation",
      title: dict.terms.limitation,
      icon: ShieldAlert,
      content: (
        <>
          <p>
            In no event shall Evision IT, its directors, employees, partners,
            agents, suppliers, or affiliates be liable for any indirect,
            incidental, special, consequential, or punitive damages, including
            without limitation:
          </p>
          <ul>
            <li>
              Loss of profits, data, use, goodwill, or other intangible losses
            </li>
            <li>
              Damages arising from the use or inability to use our services
            </li>
            <li>
              Damages arising from unauthorized access to or alteration of your
              transmissions or data
            </li>
            <li>Damages arising from any third-party content or conduct</li>
          </ul>
          <p>
            The foregoing limitation of liability shall apply to the fullest
            extent permitted by law in the applicable jurisdiction. Some
            jurisdictions do not allow the exclusion of certain warranties or
            the limitation of liability for incidental or consequential damages,
            so some of the above limitations may not apply to you.
          </p>
        </>
      ),
    },
    {
      id: "prohibited-activities",
      title: "Prohibited Activities",
      icon: Ban,
      content: (
        <>
          <p>
            The following activities are strictly prohibited when using our
            website or services:
          </p>
          <ul>
            <li>
              Attempting to gain unauthorized access to our systems, networks,
              or data
            </li>
            <li>Introducing viruses, malware, or other malicious code</li>
            <li>
              Interfering with or disrupting the integrity or performance of our
              services
            </li>
            <li>
              Using automated systems (bots, scrapers) without authorization
            </li>
            <li>Impersonating another person or entity</li>
            <li>Using our services for illegal activities or purposes</li>
            <li>
              Harassing, threatening, or defaming others through our platforms
            </li>
            <li>
              Violating any applicable local, national, or international law
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "governing-law",
      title: "Governing Law",
      icon: Gavel,
      content: (
        <>
          <p>
            These Terms of Service and any separate agreements whereby we
            provide you services shall be governed by and construed in
            accordance with the laws of Sri Lanka.
          </p>
          <p>
            Any disputes arising from these terms or your use of our services
            shall be subject to the exclusive jurisdiction of the courts of Sri
            Lanka. You agree to submit to the personal jurisdiction of such
            courts.
          </p>
          <p>
            If any provision of these terms is found to be unenforceable or
            invalid, that provision shall be limited or eliminated to the
            minimum extent necessary so that these terms shall otherwise remain
            in full force and effect.
          </p>
        </>
      ),
    },
    {
      id: "changes",
      title: dict.terms.changes,
      icon: RefreshCw,
      content: (
        <>
          <p>
            Evision IT reserves the right to update, change, or replace any part
            of these Terms of Service at any time by posting updates or changes
            to our website. It is your responsibility to check our website
            periodically for changes.
          </p>
          <p>
            <strong>When we make changes:</strong>
          </p>
          <ul>
            <li>
              We will update the &quot;Last Updated&quot; date at the top of
              this page
            </li>
            <li>Significant changes will be announced via our website</li>
            <li>
              Your continued use of our services after any changes constitutes
              acceptance of those changes
            </li>
          </ul>
          <p>
            We encourage you to review these terms regularly to stay informed
            about updates.
          </p>
        </>
      ),
    },
    {
      id: "contact",
      title: dict.terms.contact,
      icon: Mail,
      content: (
        <>
          <p>
            For questions, concerns, or clarifications about these Terms of
            Service, please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:legal@evisionit.com">legal@evisionit.com</a>
            </li>
            <li>
              <strong>Address:</strong> Evision IT, Nugegoda, Sri Lanka
            </li>
            <li>
              <strong>Phone:</strong> +94 76 355 4795
            </li>
          </ul>
          <p>
            We will make every effort to respond to your inquiry within 5
            business days.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      {/* Reading Progress */}
      <ReadingProgress color="primary" />

      {/* Floating TOC */}
      <FloatingToc items={tocItems} title="Terms of Service" />

      {/* Sr-only SEO content */}
      <div className="sr-only">
        <h1>Terms of Service - Evision IT Legal Agreement</h1>
        <p>
          Evision IT terms of service outline the legal agreement between you
          and Evision IT when using our website and services. Learn about
          acceptable use, intellectual property rights, limitation of liability,
          prohibited activities, and governing law. By using our services, you
          agree to these terms.
        </p>
      </div>

      {/* Hero Section */}
      <Section padding="lg" className="relative overflow-hidden pt-24 md:pt-32">
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute top-20 left-0 -ml-32 w-64 h-64 bg-primary/15 rounded-full blur-3xl opacity-40" />

        <Container size="sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Breadcrumbs
              items={[{ label: dict.terms.title, href: `/${locale}/terms` }]}
              className="mb-8"
            />

            <div className="flex flex-col items-start gap-4">
              <Badge
                variant="outline"
                className="px-4 py-2 border-primary/30 bg-primary/5 text-primary"
              >
                <Scale className="w-4 h-4 mr-2" />
                Legal Document
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {dict.terms.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {dict.terms.lastUpdated}: {lastUpdated}
                </span>
                <span className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Sri Lanka Jurisdiction
                </span>
              </div>

              <div className="flex items-start gap-3 p-4 mt-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Please read these terms carefully before using our services.
                  By using our website, you agree to be bound by these terms.
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Content Section with Accordion */}
      <Section className="xl:pl-72">
        <Container size="sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <LegalAccordion items={sections} defaultOpen={["acceptance"]} />
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
