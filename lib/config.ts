/* ============================================================================
   SITE CONFIGURATION - Evision IT
   ============================================================================ */

export const SUPPORTED_LOCALES = ["en", "si", "ta", "ar"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_LABELS: Record<
  Locale,
  { label: string; nativeName: string; dir: "ltr" | "rtl" }
> = {
  en: { label: "English", nativeName: "English", dir: "ltr" },
  si: { label: "සිංහල", nativeName: "Sinhala", dir: "ltr" },
  ta: { label: "தமிழ்", nativeName: "Tamil", dir: "ltr" },
  ar: { label: "العربية", nativeName: "Arabic", dir: "rtl" },
};

export const DEFAULT_LOCALE: Locale = "en";

export const siteConfig = {
  /* Company Identity */
  name: "Evision IT",
  legalName: "Evision IT (PVT) Ltd.",
  tagline: "Crafting Digital Excellence",
  description:
    "Sri Lanka's leading IT company delivering high-performance websites, mobile apps, e-commerce solutions, and digital marketing with enterprise-grade security.",

  /* Domain & URLs */
  url: "https://evision-it.com",
  domain: "evision-it.com",
  ogImage: "https://evision-it.com/og-image.png",

  /* Brand Colors - Used across components */
  brand: {
    primary: "#0A1665" /* Evision Blue */,
    accent: "#25BBE8" /* Cyan */,
    secondary: "#005A5A" /* Teal */,
  },

  /* Primary Contact Information */
  contact: {
    name: "Sri Lanka",
    countryCode: "LK",
    phone: "+94740178700",
    phoneDisplay: "+94 74 017 8700",
    email: "contact.evisionit@gmail.com",
    /* Registered Address */
    registeredAddress: "83/1, Raja Mawatha, Nugegoda, 10250, Sri Lanka",
    /* Company/Office Address */
    address: "Evision IT, Mirihana, Nugegoda, 10250, Sri Lanka",
    addressLocality: "Nugegoda",
    addressRegion: "Western Province",
    postalCode: "10250",
    timezone: "Asia/Colombo",
    currency: "LKR",
    coordinates: {
      lat: 6.8649,
      lng: 79.8997,
    },
  },

  /* Multi-Region Contact Information */
  regions: {
    lk: {
      name: "Sri Lanka",
      countryCode: "LK",
      phone: "+94740178700",
      email: "contact.evisionit@gmail.com",
      address: "Evision IT, Mirihana, Nugegoda, 10250, Sri Lanka",
      addressLocality: "Nugegoda",
      postalCode: "10250",
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
    whatsapp: "https://wa.me/94740178700",
    linkedin: "https://www.linkedin.com/company/evision-it-lk",
    facebook: "https://www.facebook.com/EVisionIt1",
    twitter: "https://x.com/evision-it",
    github: "https://github.com/Evision-IT",
    clutch: "https://clutch.co/profile/evision-it",
  },

  /* Logo & Assets */
  assets: {
    logo: {
      light: "/logo/logo_light.png",
      dark: "/logo/logo_dark.png",
      white: "/logo/logo_white.png",
      square: {
        light: "/logo/square/logo_light.png",
        dark: "/logo/square/logo_dark.png",
        white: "/logo/square/logo_white.png",
      },
    },
    favicon: "/favicon.ico",
    appleTouchIcon: "/apple-touch-icon.png",
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
    keywords: [
      "web development Sri Lanka",
      "mobile app development",
      "e-commerce solutions",
      "digital marketing agency",
      "IT services Colombo",
      "software development",
      "cloud solutions",
      "cybersecurity services",
      "SEO optimization",
      "Evision IT",
    ],
  },
};

/* Legacy Navigation Export (Backward Compatibility) */
export const navLinks = siteConfig.navigation.main;
