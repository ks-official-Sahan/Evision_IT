'use client';

import { Textarea } from "@/components/ui/textarea";
import { SelectItem } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MessageCircle, MapPin, CheckCircle2, Send, Clock } from "lucide-react";
import React from "react";
import { redirect } from "next/navigation";
import siteConfig from "@/siteConfig";
import analytics from "@/analytics";
import Section from "@/components/ui/section";
import Container from "@/components/ui/container";
import Breadcrumbs from "@/components/ui/breadcrumbs";

/*
  DEPRECATED: This page has been moved to app/[lang]/contact/page.tsx
  All contact content is now served with full i18n support (EN, SI, TA, AR)
  
  This file is kept for backward compatibility and will redirect users.
  To access contact, use: /en/contact, /si/contact, /ta/contact, or /ar/contact
  
  To be removed in v2.0.0 after migration period.
*/

export default function ContactPageDeprecated() {
  redirect("/en/contact");
}

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "Send us an email anytime",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: Phone,
    title: "Phone",
    description: "Call during business hours",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Chat with us instantly",
    value: "Send a message",
    href: siteConfig.links.whatsapp,
    external: true,
  },
  {
    icon: MapPin,
    title: "Office",
    description: "Visit us in person",
    value: siteConfig.contact.address,
  },
];

const services = [
  "Web Development",
  "Mobile App Development",
  "E-commerce Solutions",
  "Digital Marketing & SEO",
  "Cloud Solutions",
  "Cybersecurity",
  "Managed IT Services",
  "Other",
];

const budgetRanges = [
  "Under $5,000",
  "$5,000 - $15,000",
  "$15,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000+",
  "Not sure yet",
];

function ContactPage() {
  const [formState, setFormState] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Track conversion
    analytics.formSubmit("contact_form", {
      service: formData.service,
      budget: formData.budget,
    });

    setFormState("success");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* Hero */}
      <Section padding="lg" className="bg-gradient-to-b from-muted/50 to-background">
        <Container size="sm">
          <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Contact
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Let&apos;s start a conversation
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Ready to transform your business? Get in touch with our team for a
              free consultation and discover how we can help you achieve your
              goals.
            </p>
          </div>
        </Container>
      </Section>

      {/* Contact Methods */}
      <Section padding="sm">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactMethods.map((method) => (
            <Card key={method.title} className="text-center">
              <CardContent className="pt-6 pb-5">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-foreground">
                  <method.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-medium text-foreground">
                  {method.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
                {method.href ? (
                  <a
                    href={method.href}
                    target={method.external ? "_blank" : undefined}
                    rel={method.external ? "noopener noreferrer" : undefined}
                    className="mt-2 block text-sm font-medium text-accent hover:underline"
                  >
                    {method.value}
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-foreground">{method.value}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contact Form */}
      <Section background="muted">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Book a Free Consultation</CardTitle>
                <p className="text-sm text-muted-foreground">
                  No obligation. Clear next steps. We respond within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                {formState === "success" ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                      <CheckCircle2 className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-foreground">
                      Message sent successfully!
                    </h3>
                    <p className="mt-2 text-muted-foreground max-w-sm">
                      Thank you for reaching out. We&apos;ll get back to you
                      within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6 bg-transparent"
                      onClick={() => {
                        setFormState("idle");
                        setFormData({
                          name: "",
                          email: "",
                          company: "",
                          phone: "",
                          service: "",
                          budget: "",
                          message: "",
                        });
                      }}
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Full Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Smith"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@company.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your Company Ltd."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+94 77 123 4567"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="service">
                          Service Interested In{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, service: value }))
                          }
                          required
                        >
                          <SelectTrigger id="service">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget Range</Label>
                        <Select
                          value={formData.budget}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, budget: value }))
                          }
                        >
                          <SelectTrigger id="budget">
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetRanges.map((range) => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Project Details{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project, goals, and timeline..."
                        rows={5}
                        required
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                      <p className="text-sm text-muted-foreground">
                        Your data is secure. We never share your information.
                      </p>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={formState === "submitting"}
                        className="gap-2"
                      >
                        {formState === "submitting" ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Book Free Consultation
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Business Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Monday - Friday: 9:00 AM - 6:00 PM (IST)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Saturday: 9:00 AM - 1:00 PM (IST)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Sunday: Closed
                  </span>
                </div>
                <p className="text-sm text-muted-foreground pt-2">
                  For urgent matters, please use WhatsApp for faster response.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/30 bg-accent/5">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-foreground">
                  What happens next?
                </h3>
                <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-medium">
                      1
                    </span>
                    We review your requirements
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-medium">
                      2
                    </span>
                    Schedule a discovery call
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-medium">
                      3
                    </span>
                    Receive a tailored proposal
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
