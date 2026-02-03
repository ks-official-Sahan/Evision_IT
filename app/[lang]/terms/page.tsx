import { type Locale } from "@/lib/config";
import { getDictionary, getValidLocale } from "@/lib/i18n/get-dict";
import TermsClient from "./client";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);

  return {
    title: `${dict.terms.title} | Evision IT`,
    description: `${dict.terms.acceptance} - Review Evision IT's terms of service, acceptable use policy, and legal agreements for using our services.`,
    robots: "noindex,follow",
    openGraph: {
      title: `${dict.terms.title} | Evision IT`,
      description: `${dict.terms.acceptance} - Legal terms for using Evision IT services.`,
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
        name: "What are the terms for using Evision IT services?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "By accessing Evision IT's website or services, you agree to use them only for lawful purposes and in a way that does not infringe upon the rights of others. You must not introduce malware, attempt unauthorized access, or violate any applicable laws.",
        },
      },
      {
        "@type": "Question",
        name: "Who owns the intellectual property on Evision IT's website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All content on Evision IT's website including text, graphics, logos, images, and software is the property of Evision IT or its content suppliers and is protected by international copyright and trademark laws.",
        },
      },
      {
        "@type": "Question",
        name: "What is Evision IT's liability limitation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evision IT is not liable for any indirect, incidental, special, consequential, or punitive damages including loss of profits, data, or other intangible losses arising from the use or inability to use our services.",
        },
      },
      {
        "@type": "Question",
        name: "Which jurisdiction governs Evision IT's terms of service?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evision IT's Terms of Service are governed by the laws of Sri Lanka. Any disputes shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.",
        },
      },
    ],
  };
}

export default async function TermsPage({ params }: PageProps) {
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
      <TermsClient locale={locale} dict={dict} />
    </>
  );
}
