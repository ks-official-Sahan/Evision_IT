/**
 * JSON-LD Schema Generators - SEO/AEO/GEO Optimized
 *
 * Following the "Search Everywhere Optimization" paradigm:
 * - Organization/LocalBusiness for entity authority (GEO)
 * - FAQPage for Position Zero/Featured Snippets (AEO)
 * - Service schemas for service discovery
 * - ImageObject for asset indexing
 * - Person schemas for E-E-A-T signals
 */

import { siteConfig, type Locale } from "./config";
import type { Service, BlogPost, CaseStudy } from "./data";

// ============================================
// CORE ORGANIZATION SCHEMAS
// ============================================

export function organizationSchema(locale: Locale = "en") {
  const locationMap: Record<Locale, string> = {
    en: "Global",
    si: "Sri Lanka",
    ta: "South India",
    ar: "UAE",
  };

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName || "Evision IT (PVT) Ltd.",
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      "@id": `${siteConfig.url}/#logo`,
      url: `${siteConfig.url}/logo/logo_light.png`,
      contentUrl: `${siteConfig.url}/logo/logo_light.png`,
      width: 512,
      height: 180,
      caption: `${siteConfig.name} Logo`,
    },
    image: {
      "@type": "ImageObject",
      url: siteConfig.ogImage,
      width: 1200,
      height: 630,
    },
    description: siteConfig.description,
    foundingDate: "2020",
    slogan: siteConfig.tagline,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phone,
        contactType: "customer service",
        availableLanguage: ["English", "Sinhala", "Tamil", "Arabic"],
        areaServed: locationMap[locale],
      },
      {
        "@type": "ContactPoint",
        email: siteConfig.contact.email,
        contactType: "technical support",
        availableLanguage: ["English"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Evision IT, Mirihana",
      addressLocality: siteConfig.contact.addressLocality,
      addressRegion: siteConfig.contact.addressRegion || "Western Province",
      postalCode: siteConfig.contact.postalCode,
      addressCountry: "LK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.contact.coordinates?.lat || 6.8649,
      longitude: siteConfig.contact.coordinates?.lng || 79.8997,
    },
    sameAs: [
      siteConfig.links.linkedin,
      siteConfig.links.facebook,
      siteConfig.links.twitter,
      siteConfig.links.github,
    ],
    knowsAbout: [
      "Web Development",
      "Mobile Application Development",
      "E-commerce Solutions",
      "Cloud Migration",
      "Cybersecurity",
      "IT Infrastructure",
      "Digital Marketing",
      "SEO Optimization",
      "UI/UX Design",
    ],
    areaServed: [
      { "@type": "Country", name: "Sri Lanka" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Singapore" },
      { "@type": "Country", name: "India" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IT Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Web Development" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Mobile App Development" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "E-commerce Solutions" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Digital Marketing" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Cloud & Infrastructure" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Cybersecurity" },
        },
      ],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: ["en", "si", "ta", "ar"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ============================================
// LOCAL BUSINESS SCHEMA (Local SEO)
// ============================================

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService", "ITService"],
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: "$$",
    currenciesAccepted: "LKR, USD, AED",
    paymentAccepted: ["Cash", "Credit Card", "Bank Transfer"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Evision IT, Mirihana",
      addressLocality: siteConfig.contact.addressLocality,
      addressRegion: siteConfig.contact.addressRegion || "Western Province",
      postalCode: siteConfig.contact.postalCode,
      addressCountry: "LK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.contact.coordinates?.lat || 6.8649,
      longitude: siteConfig.contact.coordinates?.lng || 79.8997,
    },
    image: [`${siteConfig.url}/logo/logo_light.png`, siteConfig.ogImage],
    logo: `${siteConfig.url}/logo/logo_light.png`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Colombo" },
      { "@type": "City", name: "Nugegoda" },
      { "@type": "Country", name: "Sri Lanka" },
    ],
    sameAs: [
      siteConfig.links.linkedin,
      siteConfig.links.facebook,
      siteConfig.links.twitter,
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

// ============================================
// BREADCRUMB SCHEMA
// ============================================

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ============================================
// SERVICE SCHEMA
// ============================================

export function serviceSchema(service: Service, locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/${locale}/services/${service.slug}#service`,
    name: service.title,
    description: service.description,
    provider: {
      "@id": `${siteConfig.url}/#organization`,
    },
    serviceType: service.category,
    category: getCategoryName(service.category),
    areaServed: [
      { "@type": "Country", name: "Sri Lanka" },
      { "@type": "Country", name: "Global" },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${siteConfig.url}/${locale}/services/${service.slug}`,
      servicePhone: siteConfig.contact.phone,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
    },
    inLanguage: locale,
  };
}

function getCategoryName(category: string): string {
  const categoryMap: Record<string, string> = {
    digital: "Digital Products & Growth",
    infrastructure: "Cloud & Infrastructure",
    security: "Cybersecurity",
    managed: "Managed IT Services",
  };
  return categoryMap[category] || category;
}

// ============================================
// ARTICLE / BLOG SCHEMA
// ============================================

export function articleSchema(post: BlogPost, locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${siteConfig.url}/${locale}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    image: {
      "@type": "ImageObject",
      url: post.image,
      width: 1200,
      height: 630,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: `${siteConfig.url}/team/${post.author.name.toLowerCase().replace(/\s+/g, "-")}`,
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/${locale}/blog/${post.slug}`,
    },
    inLanguage: locale,
    keywords: post.tags?.join(", "),
  };
}

// ============================================
// FAQ SCHEMA (AEO - Answer Engine Optimization)
// ============================================

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
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
}

// ============================================
// ANSWER ENGINE SCHEMA (AEO - Zero-Click Optimization)
// ============================================

export function answerEngineSchema(
  serviceName: string,
  answers: {
    question: string;
    answer: string;
    answerType: "direct" | "list" | "table";
  }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq-${serviceName.toLowerCase().replace(/\s+/g, "-")}`,
    name: `Frequently Asked Questions about ${serviceName}`,
    description: `Expert answers about ${serviceName} from ${siteConfig.name}`,
    mainEntity: answers.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
        encodingFormat: item.answerType === "list" ? "text/html" : "text/plain",
      },
    })),
  };
}

// ============================================
// ENTITY AUTHORITY SCHEMA (GEO - Generative Engine Optimization)
// ============================================

export function entityAuthoritySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#authority`,
    name: siteConfig.name,
    description: `${siteConfig.name} - Leading IT solutions provider in Sri Lanka specializing in web development, mobile apps, e-commerce, and digital marketing.`,
    expertise: [
      "Web Development",
      "Mobile Application Development",
      "E-commerce Solutions",
      "Digital Marketing",
      "Cloud Migration",
      "Cybersecurity",
      "IT Infrastructure Management",
      "SEO & Search Optimization",
    ],
    award: [
      {
        "@type": "Award",
        name: "Top IT Solution Provider - Sri Lanka 2024",
      },
    ],
    memberOf: [
      {
        "@type": "Organization",
        name: "Sri Lanka Association of Software and Service Companies",
      },
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Google Cloud Partner",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Microsoft Partner Network",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "AWS Partner",
      },
    ],
    knowsAbout: [
      "Next.js",
      "React",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "PostgreSQL",
      "AWS",
      "Google Cloud Platform",
      "Microsoft Azure",
      "WordPress",
      "Shopify",
      "WooCommerce",
    ],
  };
}

// ============================================
// CASE STUDY SCHEMA
// ============================================

export function caseStudySchema(caseStudy: CaseStudy, locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${siteConfig.url}/${locale}/case-studies/${caseStudy.slug}#article`,
    headline: caseStudy.title,
    description: caseStudy.excerpt,
    articleSection: "Case Study",
    image: {
      "@type": "ImageObject",
      url: caseStudy.image,
      width: 1200,
      height: 630,
    },
    author: {
      "@id": `${siteConfig.url}/#organization`,
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/${locale}/case-studies/${caseStudy.slug}`,
    },
    inLanguage: locale,
    about: {
      "@type": "Thing",
      name: caseStudy.client || "Client Project",
    },
  };
}

// ============================================
// IMAGE OBJECT SCHEMA (for asset indexing)
// ============================================

export function imageSchema(
  imageUrl: string,
  caption: string,
  options?: {
    width?: number;
    height?: number;
    alt?: string;
    license?: string;
    contentLocation?: string;
  },
) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    url: imageUrl.startsWith("http")
      ? imageUrl
      : `${siteConfig.url}${imageUrl}`,
    contentUrl: imageUrl.startsWith("http")
      ? imageUrl
      : `${siteConfig.url}${imageUrl}`,
    caption: caption,
    name: options?.alt || caption,
    width: options?.width,
    height: options?.height,
    license: options?.license || `${siteConfig.url}/terms`,
    acquireLicensePage: `${siteConfig.url}/contact`,
    creditText: siteConfig.name,
    creator: {
      "@id": `${siteConfig.url}/#organization`,
    },
    copyrightHolder: {
      "@id": `${siteConfig.url}/#organization`,
    },
    contentLocation: options?.contentLocation
      ? { "@type": "Place", name: options.contentLocation }
      : undefined,
  };
}

// ============================================
// PERSON SCHEMA (for E-E-A-T signals)
// ============================================

export function personSchema(person: {
  name: string;
  role: string;
  description?: string;
  image?: string;
  expertise?: string[];
  sameAs?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.role,
    description: person.description,
    image: person.image,
    worksFor: {
      "@id": `${siteConfig.url}/#organization`,
    },
    knowsAbout: person.expertise || [],
    sameAs: person.sameAs || [],
  };
}

// ============================================
// SOFTWARE APPLICATION SCHEMA
// ============================================

export function softwareApplicationSchema(app: {
  name: string;
  description: string;
  screenshot?: string;
  operatingSystem?: string;
  applicationCategory?: string;
  offers?: { price: string; priceCurrency: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    screenshot: app.screenshot,
    operatingSystem: app.operatingSystem || "Web",
    applicationCategory: app.applicationCategory || "BusinessApplication",
    offers: app.offers
      ? {
          "@type": "Offer",
          price: app.offers.price,
          priceCurrency: app.offers.priceCurrency,
        }
      : undefined,
    author: {
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}

// ============================================
// HOWTO SCHEMA (for guides and tutorials)
// ============================================

export function howToSchema(howTo: {
  name: string;
  description: string;
  steps: { name: string; text: string; image?: string }[];
  totalTime?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.name,
    description: howTo.description,
    totalTime: howTo.totalTime,
    step: howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
    })),
  };
}

// ============================================
// COLLECTION PAGE SCHEMA
// ============================================

export function collectionPageSchema(
  title: string,
  description: string,
  items: { name: string; url: string }[],
  locale: Locale = "en",
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: description,
    inLanguage: locale,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}

// ============================================
// CONTACT PAGE SCHEMA
// ============================================

export function contactPageSchema(locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteConfig.url}/${locale}/contact#page`,
    name: "Contact Evision IT",
    description:
      "Get in touch with Evision IT for your next project. We offer web development, mobile apps, e-commerce, and digital marketing services.",
    mainEntity: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: locale,
  };
}

// ============================================
// WEB PAGE SCHEMA (generic)
// ============================================

export function webPageSchema(
  title: string,
  description: string,
  url: string,
  locale: Locale = "en",
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name: title,
    description: description,
    url: url,
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    about: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: locale,
  };
}
