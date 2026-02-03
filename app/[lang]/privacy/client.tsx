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
  Shield,
  FileText,
  Database,
  Settings,
  Lock,
  UserCheck,
  Cookie,
  RefreshCw,
  Mail,
  Scale,
  Calendar,
} from "lucide-react";

interface PrivacyClientProps {
  locale: Locale;
  dict: any;
}

export default function PrivacyClient({ locale, dict }: PrivacyClientProps) {
  const lastUpdated = "January 28, 2025";

  const tocItems = [
    { id: "introduction", title: dict.privacy.introduction, level: 1 },
    { id: "data-collection", title: dict.privacy.dataCollection, level: 1 },
    { id: "data-use", title: dict.privacy.dataUse, level: 1 },
    { id: "data-protection", title: dict.privacy.dataProtection, level: 1 },
    { id: "your-rights", title: dict.privacy.yourRights, level: 1 },
    { id: "cookies", title: "Cookie Policy", level: 1 },
    { id: "updates", title: "Policy Updates", level: 1 },
    { id: "contact", title: dict.privacy.contact, level: 1 },
  ];

  const sections = [
    {
      id: "introduction",
      title: dict.privacy.introduction,
      icon: FileText,
      content: (
        <>
          <p>
            At Evision IT, we respect your privacy and are committed to
            protecting your personal data. This Privacy Policy explains how we
            collect, use, store, and protect your information when you use our
            website, services, or interact with us.
          </p>
          <p>
            This policy applies to all personal data processed by Evision IT,
            whether collected online, offline, or through our business
            operations. By using our services, you agree to the collection and
            use of information in accordance with this policy.
          </p>
        </>
      ),
    },
    {
      id: "data-collection",
      title: dict.privacy.dataCollection,
      icon: Database,
      content: (
        <>
          <p>We collect information you provide directly, such as when you:</p>
          <ul>
            <li>Contact us through our website forms or email</li>
            <li>Request a quote or consultation</li>
            <li>Subscribe to our newsletter or updates</li>
            <li>Engage with our services or support team</li>
            <li>Apply for employment opportunities</li>
          </ul>
          <p>
            <strong>Types of data collected include:</strong>
          </p>
          <ul>
            <li>Name and contact information (email, phone number, address)</li>
            <li>Business information (company name, job title)</li>
            <li>
              Technical data (IP address, browser type, device information)
            </li>
            <li>Usage data (pages visited, time spent, interactions)</li>
          </ul>
        </>
      ),
    },
    {
      id: "data-use",
      title: dict.privacy.dataUse,
      icon: Settings,
      content: (
        <>
          <p>We use your information to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Respond to your inquiries and support requests</li>
            <li>
              Send you relevant updates, newsletters, and marketing
              communications (with your consent)
            </li>
            <li>Analyze website usage to enhance user experience</li>
            <li>Comply with legal obligations and protect our rights</li>
            <li>Process payments and manage our business relationship</li>
          </ul>
        </>
      ),
    },
    {
      id: "data-protection",
      title: dict.privacy.dataProtection,
      icon: Lock,
      content: (
        <>
          <p>
            We implement industry-standard security measures to protect your
            data from unauthorized access, alteration, disclosure, or
            destruction. These measures include:
          </p>
          <ul>
            <li>SSL/TLS encryption for all data in transit</li>
            <li>Secure data storage with access controls</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Employee training on data protection best practices</li>
            <li>Incident response procedures for potential breaches</li>
          </ul>
          <p>
            While we strive to protect your personal information, no method of
            transmission over the Internet is 100% secure. We cannot guarantee
            absolute security but are committed to maintaining strong
            protections.
          </p>
        </>
      ),
    },
    {
      id: "your-rights",
      title: dict.privacy.yourRights,
      icon: UserCheck,
      content: (
        <>
          <p>You have the following rights regarding your personal data:</p>
          <ul>
            <li>
              <strong>Right to Access:</strong> Request a copy of your personal
              data we hold
            </li>
            <li>
              <strong>Right to Rectification:</strong> Request correction of
              inaccurate or incomplete data
            </li>
            <li>
              <strong>Right to Erasure:</strong> Request deletion of your
              personal data where applicable
            </li>
            <li>
              <strong>Right to Restrict Processing:</strong> Request limitation
              of how we use your data
            </li>
            <li>
              <strong>Right to Data Portability:</strong> Receive your data in a
              structured, machine-readable format
            </li>
            <li>
              <strong>Right to Object:</strong> Object to processing based on
              legitimate interests or direct marketing
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a href="mailto:privacy@evisionit.com">privacy@evisionit.com</a>.
          </p>
        </>
      ),
    },
    {
      id: "cookies",
      title: "Cookie Policy",
      icon: Cookie,
      content: (
        <>
          <p>
            We use cookies and similar tracking technologies to enhance your
            experience on our website. Cookies are small data files stored on
            your device that help us:
          </p>
          <ul>
            <li>Remember your preferences and settings</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Deliver personalized content and advertisements</li>
            <li>Improve website functionality and performance</li>
          </ul>
          <p>
            <strong>Types of cookies we use:</strong>
          </p>
          <ul>
            <li>
              <strong>Essential cookies:</strong> Required for basic website
              functionality
            </li>
            <li>
              <strong>Analytics cookies:</strong> Help us understand how
              visitors interact with our site
            </li>
            <li>
              <strong>Marketing cookies:</strong> Used to deliver relevant
              advertisements
            </li>
          </ul>
          <p>
            You can control cookies through your browser settings. However,
            disabling certain cookies may affect website functionality.
          </p>
        </>
      ),
    },
    {
      id: "updates",
      title: "Policy Updates",
      icon: RefreshCw,
      content: (
        <>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices, legal requirements, or for other
            operational reasons. When we make significant changes, we will:
          </p>
          <ul>
            <li>
              Post the updated policy on this page with a new effective date
            </li>
            <li>Notify you via email if you are a registered user</li>
            <li>Display a prominent notice on our website</li>
          </ul>
          <p>
            We encourage you to review this policy periodically to stay informed
            about how we protect your information.
          </p>
        </>
      ),
    },
    {
      id: "contact",
      title: dict.privacy.contact,
      icon: Mail,
      content: (
        <>
          <p>
            For privacy-related inquiries, data requests, or concerns about this
            policy, please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:privacy@evisionit.com">privacy@evisionit.com</a>
            </li>
            <li>
              <strong>Address:</strong> Evision IT, Nugegoda, Sri Lanka
            </li>
            <li>
              <strong>Phone:</strong> +94 76 355 4795
            </li>
          </ul>
          <p>
            We will respond to your request within 30 days in accordance with
            applicable data protection laws.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      {/* Reading Progress */}
      <ReadingProgress color="accent" />

      {/* Floating TOC */}
      <FloatingToc items={tocItems} title="Privacy Policy" />

      {/* Sr-only SEO content */}
      <div className="sr-only">
        <h1>Privacy Policy - Evision IT Sri Lanka Data Protection</h1>
        <p>
          Evision IT privacy policy explains how we collect, use, store, and
          protect your personal data. Learn about data collection practices,
          your rights under GDPR and data protection laws, cookie policy, and
          how to contact us for privacy inquiries. Evision IT is committed to
          protecting your privacy and securing your information.
        </p>
      </div>

      {/* Hero Section */}
      <Section padding="lg" className="relative overflow-hidden pt-24 md:pt-32">
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-accent/10 via-background to-background" />
        <div className="absolute top-20 right-0 -mr-32 w-64 h-64 bg-accent/15 rounded-full blur-3xl opacity-40" />

        <Container size="sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Breadcrumbs
              items={[
                { label: dict.privacy.title, href: `/${locale}/privacy` },
              ]}
              className="mb-8"
            />

            <div className="flex flex-col items-start gap-4">
              <Badge
                variant="outline"
                className="px-4 py-2 border-accent/30 bg-accent/5 text-accent"
              >
                <Shield className="w-4 h-4 mr-2" />
                Legal Document
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {dict.privacy.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {dict.privacy.lastUpdated}: {lastUpdated}
                </span>
                <span className="flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                  GDPR Compliant
                </span>
              </div>

              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mt-4">
                This policy describes how Evision IT collects, uses, and
                protects your personal information. Your privacy is important to
                us.
              </p>
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
            <LegalAccordion items={sections} defaultOpen={["introduction"]} />
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
