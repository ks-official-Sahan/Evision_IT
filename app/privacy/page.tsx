import { Badge, Section, Container, Breadcrumbs } from "@/components/ui";
import siteConfig from "@/config/site";
/*
  DEPRECATED: This page has been moved to app/[lang]/privacy/page.tsx
  All privacy content is now served with full i18n support (EN, SI, TA, AR)
  
  This file is kept for backward compatibility and will redirect users.
  To access privacy policy, use: /en/privacy, /si/privacy, /ta/privacy, or /ar/privacy
  
  To be removed in v2.0.0 after migration period.
*/

import { redirect } from "next/navigation";

export function PrivacyPageDeprecated() {
  redirect("/en/privacy");
}

export default function PrivacyPage() {
  return (
    <>
      <Section padding="lg" className="bg-gradient-to-b from-muted/50 to-background">
        <Container size="sm">
          <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy" }]} />
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Legal
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Privacy Policy
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
            <h2>1. Introduction</h2>
            <p>
              {siteConfig.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is
              committed to protecting your personal data. This privacy policy
              explains how we collect, use, and safeguard your information when
              you visit our website or use our services.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>Information You Provide</h3>
            <ul>
              <li>Contact information (name, email, phone number)</li>
              <li>Company information</li>
              <li>Project requirements and messages</li>
              <li>Payment information (processed securely through third parties)</li>
            </ul>

            <h3>Information Collected Automatically</h3>
            <ul>
              <li>Device and browser information</li>
              <li>IP address and location data</li>
              <li>Pages visited and interaction data</li>
              <li>Cookies and similar technologies</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Provide and improve our services</li>
              <li>Respond to inquiries and support requests</li>
              <li>Send relevant communications (with your consent)</li>
              <li>Analyze website usage and improve user experience</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>4. Data Sharing</h2>
            <p>
              We do not sell your personal data. We may share information with:
            </p>
            <ul>
              <li>Service providers who assist our operations</li>
              <li>Analytics partners (anonymized data)</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your
              data, including encryption, secure servers, and regular security
              audits.
            </p>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2>7. Cookies</h2>
            <p>
              We use cookies to improve your browsing experience. You can manage
              cookie preferences through your browser settings.
            </p>

            <h2>8. Contact Us</h2>
            <p>
              For privacy-related inquiries, contact us at{" "}
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this policy periodically. We will notify you of
              significant changes through our website or email.
            </p>
          </article>
        </Container>
      </Section>
    </>
  );
}
