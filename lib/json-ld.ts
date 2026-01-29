import { siteConfig, type Locale } from "./config";
import type { Service, BlogPost, CaseStudy } from "./data";

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
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    foundingDate: "2020",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phone,
        contactType: "customer service",
        availableLanguage: ["English", "Sinhala", "Tamil", "Arabic"],
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
      streetAddress: siteConfig.contact.address,
      addressCountry: "LK",
    },
    sameAs: [
      siteConfig.links.linkedin,
      siteConfig.links.facebook,
      siteConfig.links.twitter,
    ],
    knowsAbout: [
      "Web Development",
      "Mobile Applications",
      "Cloud Migration",
      "Cybersecurity",
      "IT Infrastructure",
      "Digital Marketing",
    ],
    areaServed: locationMap[locale],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

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

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressCountry: "LK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.contact.coordinates?.lat || 6.9271,
      longitude: siteConfig.contact.coordinates?.lng || 80.7789,
    },
    image: `${siteConfig.url}/og-image.jpg`,
    areaServed: [
      { "@type": "Country", name: "Sri Lanka" },
      { "@type": "Country", name: "Global" },
    ],
  };
}

export function serviceSchema(service: Service, locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    serviceType: service.category,
    areaServed: {
      "@type": "Country",
      name: "Sri Lanka",
    },
    inLanguage: locale,
  };
}

export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
  };
}

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

// AEO (Answer Engine Optimization) schema for zero-click content
export function answerEngineSchema(serviceName: string, answers: { question: string; answer: string; answerType: "direct" | "list" | "table" }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: `Answers about ${serviceName}`,
    description: `Frequently asked questions and direct answers about ${serviceName}`,
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

// GEO (Generative Engine Optimization) schema for entity authority
export function entityAuthoritySchema(entityName: string, expertise: string[], certifications: string[], thirdPartyMentions: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: entityName,
    description: `Authority in ${expertise.join(", ")}`,
    expertise: expertise,
    certifications: certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: cert,
    })),
    // Third-party mentions for topical authority
    mentions: thirdPartyMentions.map((mention) => ({
      "@type": "WebPage",
      url: mention,
    })),
  };
}

export function caseStudySchema(caseStudy: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description: caseStudy.excerpt,
    image: caseStudy.image,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
  };
}
