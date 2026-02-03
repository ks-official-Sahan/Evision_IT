import { type Locale } from "@/lib/config";
import { getDictionary, getValidLocale } from "@/lib/i18n/get-dict";
import ResourcesClient from "./client";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);

  return {
    title: `Resources & Learning Center | Evision IT`,
    description:
      "Access free educational resources including implementation guides, case studies, webinars, technical documentation, whitepapers, and templates for digital transformation.",
    keywords: [
      "IT resources",
      "digital transformation guides",
      "web development tutorials",
      "case studies Sri Lanka",
      "technical documentation",
      "IT whitepapers",
      "development templates",
    ],
    openGraph: {
      title: "Resources & Learning Center | Evision IT",
      description:
        "Free educational resources and guides for digital transformation success.",
      type: "website",
    },
  };
}

// ItemList Schema for SEO
function getItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Evision IT Resources",
    description:
      "Educational resources for digital transformation and IT solutions",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Implementation Guides",
        description: "Step-by-step guides for implementing digital solutions",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Case Studies",
        description: "Real-world project examples and success stories",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Webinars & Workshops",
        description: "Live training sessions and recorded workshops",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Technical Documentation",
        description: "Comprehensive API and integration documentation",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Whitepapers",
        description: "In-depth research and industry insights",
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Templates & Checklists",
        description: "Ready-to-use templates for planning and execution",
      },
    ],
  };
}

export default async function ResourcesPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      {/* ItemList Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getItemListSchema()),
        }}
      />
      <ResourcesClient locale={locale} dict={dict} />
    </>
  );
}
