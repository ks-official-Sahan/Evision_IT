import type { Metadata } from "next";
import { type Locale, SUPPORTED_LOCALES } from "@/lib/config";
import { getValidLocale } from "@/lib/i18n/get-dict";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { ContactForm } from "@/components/forms/contact-form";
import { contactPageSchema } from "@/lib/json-ld";
import { siteConfig } from "@/lib/config";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;

  return {
    title: "Contact Us",
    description:
      "Get in touch with Evision IT. We'd love to hear about your project.",
    openGraph: {
      title: `Contact Us | ${siteConfig.name}`,
      description:
        "Get in touch with Evision IT. We'd love to hear about your project.",
      url: `${siteConfig.url}/${locale}/contact`,
      siteName: siteConfig.name,
      type: "website",
      locale:
        locale === "ar"
          ? "ar_AE"
          : locale === "si"
            ? "si_LK"
            : locale === "ta"
              ? "ta_LK"
              : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Us | Evision IT",
      description:
        "Get in touch with Evision IT. We'd love to hear about your project.",
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/contact`,
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((l) => [l, `${siteConfig.url}/${l}/contact`]),
      ),
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;

  const contactInfo = [
    {
      title: "Email",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      icon: Mail,
      description: "For general inquiries and support",
    },
    {
      title: "Phone",
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phone}`,
      icon: Phone,
      description: "Mon-Fri from 9am to 6pm",
    },
    {
      title: "Office",
      value: siteConfig.contact.address,
      href: "#",
      icon: MapPin,
      description: "Come visit our HQ",
    },
    {
      title: "Business Hours",
      value: "Mon - Fri: 9:00 AM - 6:00 PM",
      href: null,
      icon: Clock,
      description: "Weekend: 10:00 AM - 2:00 PM",
    },
  ];

  return (
    <>
      <JsonLd data={contactPageSchema(locale)} />

      {/* SEO-optimized screen reader content */}
      <div className="sr-only">
        <h1>Contact Evision IT - IT Services Company in Sri Lanka</h1>
        <p>
          Get in touch with Evision IT, Sri Lanka&apos;s leading IT services
          company based in Nugegoda. We offer web development, mobile app
          development, e-commerce solutions, digital marketing, cloud services,
          and cybersecurity. Email: {siteConfig.contact.email}. Phone:{" "}
          {siteConfig.contact.phone}. Address: {siteConfig.contact.address}.
          Request a free consultation for your next project.
        </p>
      </div>

      {/* Hero Section */}
      <Section padding="lg" className="relative overflow-hidden pt-24 md:pt-32">
        {/* Background Beams/Gradient */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-accent/10 via-background to-background" />

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Column: Content */}
            <div className="flex flex-col justify-center">
              <Breadcrumbs
                items={[{ label: "Contact", href: `/contact` }]}
                locale={locale}
                className="mb-8"
              />

              <Badge
                variant="outline"
                className="w-fit mb-6 px-4 py-2 border-accent/30 bg-accent/5 text-accent animate-fade-in"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Let&apos;s Talk
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
                <span className="text-foreground">Start Your </span>
                <span className="text-gradient-accent">Digital Journey</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-xl mb-10 leading-relaxed">
                Ready to transform your business? Whether you have a
                groundbreaking idea or need expert technical advice, our team is
                here to help you succeed.
              </p>

              {/* Contact Cards Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((item, index) => (
                  <Card
                    key={index}
                    className="bg-card/30 backdrop-blur-sm border-border/50 hover:border-accent/40 transition-colors group"
                  >
                    <CardContent className="p-4 flex gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors shrink-0">
                        <item.icon className="h-5 w-5 text-accent" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground text-sm">
                          {item.title}
                        </h3>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-sm font-medium hover:text-accent transition-colors truncate block"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground truncate">
                            {item.value}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="relative">
              {/* Decorative Elements behind form */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-30 delay-1000 animate-pulse" />

              <div className="relative z-10">
                <ContactForm locale={locale} />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
