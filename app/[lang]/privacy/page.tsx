import { type Locale } from "@/lib/config";
import { getDictionary, getValidLocale } from "@/lib/i18n/get-dict";
import PrivacyClient from "./client";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);

  return {
    title: `${dict.privacy.title} | Evision IT`,
    description: `${dict.privacy.introduction} - Learn how Evision IT collects, uses, and protects your personal data. GDPR compliant privacy policy.`,
    robots: "noindex,follow",
    openGraph: {
      title: `${dict.privacy.title} | Evision IT`,
      description: `${dict.privacy.introduction} - Learn how Evision IT protects your data.`,
      type: "website",
    },
  };
}

// FAQ Schema for AEO/GEO
function getFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What data does Evision IT collect?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evision IT collects information you provide directly such as name, email, phone number, and business information when you contact us or use our services. We also collect technical data like IP address and browser information for analytics.",
        },
      },
      {
        "@type": "Question",
        name: "How does Evision IT protect my data?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We implement industry-standard security measures including SSL/TLS encryption, secure data storage with access controls, regular security audits, and employee training on data protection best practices.",
        },
      },
      {
        "@type": "Question",
        name: "What are my rights regarding my personal data?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You have the right to access, rectify, erase, restrict processing, data portability, and object to processing of your personal data. Contact privacy@evisionit.com to exercise these rights.",
        },
      },
      {
        "@type": "Question",
        name: "How can I contact Evision IT about privacy concerns?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For privacy inquiries, contact us at privacy@evisionit.com, call +94 76 355 4795, or write to our address in Nugegoda, Sri Lanka. We respond within 30 days.",
        },
      },
    ],
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      {/* FAQ Schema for SEO/AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema()),
        }}
      />
      <PrivacyClient locale={locale} dict={dict} />
    </>
  );
}
