/* ============================================================================
   SITE CONFIGURATION - Evision IT
   ============================================================================ */

export const SUPPORTED_LOCALES = ["en", "si", "ta", "ar"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, { label: string; nativeName: string; dir: "ltr" | "rtl" }> = {
  en: { label: "English", nativeName: "English", dir: "ltr" },
  si: { label: "සිංහල", nativeName: "Sinhala", dir: "ltr" },
  ta: { label: "தமிழ்", nativeName: "Tamil", dir: "ltr" },
  ar: { label: "العربية", nativeName: "Arabic", dir: "rtl" },
};

export const DEFAULT_LOCALE: Locale = "en";

export const siteConfig = {
  name: "Evision IT",
  tagline: "Crafting Digital Excellence",
  description:
    "High-performance websites, apps, e-commerce and digital marketing—backed by enterprise-grade infrastructure and security expertise.",
  url: "https://evision-it.com",
  ogImage: "https://evision-it.com/og-image.jpg",

  /* Brand Colors - Used across components */
  brand: {
    primary: "#0A1665" /* Evision Blue */,
    accent: "#25BBE8" /* Cyan */,
    secondary: "#005A5A" /* Teal */,
  },

  contact: {
    name: "Sri Lanka",
    countryCode: "LK",
    phone: "+94 77 712 3456",
    email: "hello@evision-it.com",
    address: "123 Tech Park, Colombo 03, Sri Lanka",
    timezone: "Asia/Colombo",
    currency: "LKR",
  },

  /* Multi-Region Contact Information */
  regions: {
    lk: {
      name: "Sri Lanka",
      countryCode: "LK",
      phone: "+94 77 712 3456",
      email: "hello@evision-it.com",
      address: "123 Tech Park, Colombo 03, Sri Lanka",
      timezone: "Asia/Colombo",
      currency: "LKR",
    },
    ae: {
      name: "United Arab Emirates",
      countryCode: "AE",
      phone: "+971 4 XXX XXXX",
      email: "dubai@evision-it.com",
      address: "Dubai Silicon Oasis, Dubai, UAE",
      timezone: "Asia/Dubai",
      currency: "AED",
    },
    sg: {
      name: "Singapore",
      countryCode: "SG",
      phone: "+65 XXXX XXXX",
      email: "singapore@evision-it.com",
      address: "Singapore, SG",
      timezone: "Asia/Singapore",
      currency: "SGD",
    },
  },

  /* Social Links */
  links: {
    whatsapp: "https://wa.me/94777123456",
    linkedin: "https://linkedin.com/company/evision",
    facebook: "https://facebook.com/evisionit",
    twitter: "https://twitter.com/evisionit",
    github: "https://github.com/evision-it",
    clutch: "https://clutch.co/profile/evision-it",
  },

  /* Sitemap & Navigation */
  navigation: {
    main: [
      { href: "/", label: "Home" },
      { href: "/solutions", label: "Solutions" },
      { href: "/services", label: "Services" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/blog", label: "Blog" },
      { href: "/company", label: "Company" },
      { href: "/contact", label: "Contact" },
    ],
    footer: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/accessibility", label: "Accessibility" },
      { href: "/sitemap", label: "Sitemap" },
    ],
  },

  /* Analytics Configuration */
  analytics: {
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "",
    bingVerification: process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
    bingUetId: process.env.NEXT_PUBLIC_BING_UET_ID || "",
  },

  /* Cloud/Media Configuration */
  cloudinary: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "evision",
  },

  /* Database Configuration (MongoDB) */
  database: {
    mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/evision-it",
  },

  /* SEO Configuration */
  seo: {
    siteName: "Evision IT",
    twitterHandle: "@evisionit",
    locale: "en_US",
    searchConsoleVerification:
      process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  },
};

/* Legacy Navigation Export (Backward Compatibility) */
export const navLinks = siteConfig.navigation.main;
