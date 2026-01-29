import type { Metadata } from "next";
import { getValidLocale, type Locale } from "@/lib/config";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/lib/config";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;

  return {
    title: "Contact Us",
    description: "Get in touch with Evision IT. We'd love to hear about your project.",
    openGraph: {
      title: "Contact Us | Evision IT",
      description: "Get in touch with Evision IT. We'd love to hear about your project.",
      url: `${siteConfig.url}/${locale}/contact`,
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;

  return (
    <>
      {/* Hero Section */}
      <Section padding="lg" className="bg-gradient-to-b from-muted/50 to-background">
        <Container size="sm">
          <Breadcrumbs
            items={[{ label: "Contact", href: `/${locale}/contact` }]}
            locale={locale}
          />

          <div className="mt-8 text-center">
            <Badge variant="secondary" className="mb-6">
              Get In Touch
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance mb-4">
              Let's discuss your project
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Have a question or ready to start? We'd love to hear from you. Get in touch with our team today.
            </p>
          </div>
        </Container>
      </Section>

      {/* Content Section */}
      <Section>
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 flex-shrink-0">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 flex-shrink-0">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Address</h3>
                    <p className="text-muted-foreground">{siteConfig.contact.address}</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 flex-shrink-0">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Saturday: 10:00 AM - 2:00 PM</p>
                    <p className="text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Send us a Message</h2>
              <ContactForm locale={locale} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
