import { Badge } from "@/components/ui/badge"
import { Section, Container, Breadcrumbs } from "@/components/ui"
import { siteConfig } from "@/config/site"
/*
  DEPRECATED: This page has been moved to app/[lang]/terms/page.tsx
  All terms content is now served with full i18n support (EN, SI, TA, AR)
  
  This file is kept for backward compatibility and will redirect users.
  To access terms of service, use: /en/terms, /si/terms, /ta/terms, or /ar/terms
  
  To be removed in v2.0.0 after migration period.
*/

import { redirect } from "next/navigation";

export default function TermsPageDeprecated() {
  redirect("/en/terms");
}

export function TermsPage() {
  return (
    <>
      <Section padding="lg" className="bg-gradient-to-b from-muted/50 to-background">
        <Container size="sm">
          <Breadcrumbs items={[{ label: "Terms of Service", href: "/terms" }]} />
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Legal
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-6 text-muted-foreground">
              Last updated: January 1, 2025
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="sm">
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the services provided by {siteConfig.name}
              (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to be bound by these
              Terms of Service. If you do not agree to these terms, please do
              not use our services.
            </p>

            <h2>2. Services</h2>
            <p>
              {siteConfig.name} provides IT services including web development,
              mobile app development, e-commerce solutions, digital marketing,
              cloud services, cybersecurity, and managed IT services. The
              specific scope of services will be outlined in individual project
              agreements.
            </p>

            <h2>3. Client Responsibilities</h2>
            <p>As a client, you agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Respond to requests for feedback and approvals in a timely manner</li>
              <li>Ensure you have rights to any content provided to us</li>
              <li>Make payments according to agreed terms</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>

            <h2>4. Project Agreements</h2>
            <p>
              Each project will be governed by a separate agreement specifying
              scope, timeline, deliverables, and pricing. In case of conflict
              between these Terms and a project agreement, the project agreement
              prevails.
            </p>

            <h2>5. Intellectual Property</h2>
            <h3>Client Content</h3>
            <p>
              You retain ownership of content you provide. You grant us a
              license to use this content solely for project delivery.
            </p>
            <h3>Deliverables</h3>
            <p>
              Upon full payment, ownership of custom deliverables transfers to
              you, except for pre-existing materials, third-party components,
              and our proprietary tools.
            </p>

            <h2>6. Payment Terms</h2>
            <ul>
              <li>Payments are due according to the project agreement</li>
              <li>Late payments may incur additional charges</li>
              <li>Work may be paused for overdue payments</li>
              <li>All fees are in the currency specified in the agreement</li>
            </ul>

            <h2>7. Warranties and Limitations</h2>
            <p>
              We provide services with reasonable skill and care. However, we do
              not guarantee specific results, search rankings, or business
              outcomes. Our liability is limited to the amount paid for the
              specific service in question.
            </p>

            <h2>8. Confidentiality</h2>
            <p>
              Both parties agree to keep confidential information private and
              not disclose it to third parties without consent, except as
              required by law.
            </p>

            <h2>9. Termination</h2>
            <p>
              Either party may terminate services with written notice as
              specified in the project agreement. Upon termination, you must pay
              for work completed, and we will provide deliverables for paid
              work.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These terms are governed by the laws of Sri Lanka. Any disputes
              shall be resolved in the courts of Colombo, Sri Lanka.
            </p>

            <h2>11. Changes to Terms</h2>
            <p>
              We may update these terms at any time. Continued use of our
              services after changes constitutes acceptance of the new terms.
            </p>

            <h2>12. Contact</h2>
            <p>
              For questions about these terms, contact us at{" "}
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
            </p>
          </article>
        </Container>
      </Section>
    </>
  );
}
