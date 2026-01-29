"use client";

import { siteConfig } from "./config";

// GA4 Event Types
type GA4Event =
  | "book_consultation"
  | "get_quote"
  | "whatsapp_click"
  | "form_submit"
  | "page_view"
  | "service_view"
  | "case_study_view"
  | "blog_view";

interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

// Track GA4 events
export function trackEvent(eventName: GA4Event, params?: EventParams) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

// Google Ads conversion tracking
export function trackConversion(conversionLabel: string, value?: number) {
  if (typeof window !== "undefined" && window.gtag && siteConfig.analytics.ga4Id) {
    window.gtag("event", "conversion", {
      send_to: `${siteConfig.analytics.ga4Id}/${conversionLabel}`,
      value: value,
      currency: "USD",
    });
  }
}

// Bing UET conversion tracking
export function trackBingConversion(goalType: string, value?: number) {
  if (typeof window !== "undefined" && window.uetq) {
    window.uetq.push("event", goalType, {
      event_category: "conversion",
      event_label: goalType,
      event_value: value,
    });
  }
}

// Pre-built event helpers
export const analytics = {
  bookConsultation: (source?: string) => {
    trackEvent("book_consultation", { source });
    trackConversion("CONSULTATION_CONVERSION_LABEL");
    trackBingConversion("consultation");
  },

  getQuote: (service?: string) => {
    trackEvent("get_quote", { service });
    trackConversion("QUOTE_CONVERSION_LABEL");
    trackBingConversion("quote_request");
  },

  whatsappClick: (page?: string) => {
    trackEvent("whatsapp_click", { page });
    trackConversion("WHATSAPP_CONVERSION_LABEL");
  },

  formSubmit: (formName: string, formData?: EventParams) => {
    trackEvent("form_submit", { form_name: formName, ...formData });
    trackConversion("FORM_CONVERSION_LABEL");
    trackBingConversion("form_submission");
  },

  serviceView: (serviceSlug: string, serviceName: string) => {
    trackEvent("service_view", {
      service_slug: serviceSlug,
      service_name: serviceName,
    });
  },

  caseStudyView: (slug: string, title: string) => {
    trackEvent("case_study_view", { slug, title });
  },

  blogView: (slug: string, title: string, category: string) => {
    trackEvent("blog_view", { slug, title, category });
  },
};

// TypeScript declarations for global analytics objects
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    uetq?: {
      push: (...args: unknown[]) => void;
    };
  }
}
