"use client";

import React from "react"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MessageCircle, MapPin, Clock, Send } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@evision.lk",
    href: "mailto:hello@evision.lk",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+94 11 234 5678",
    href: "tel:+94112345678",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+94 77 123 4567",
    href: "https://wa.me/94771234567",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Colombo, Sri Lanka",
    href: null,
  },
];

const interests = [
  "Web Design & Development",
  "App Development",
  "E-commerce",
  "Digital Marketing",
  "Infrastructure & Hosting",
  "IT Support",
  "Other",
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", phone: "", interest: "", message: "" });
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Contact Us
          </Badge>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Let&apos;s start a conversation
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your digital presence? Get in touch and let&apos;s
            discuss how we can help.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact Methods */}
          <div className="lg:col-span-2 space-y-4">
            {contactMethods.map((method) => (
              <Card key={method.label} className="border-border">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <method.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {method.label}
                    </p>
                    {method.href ? (
                      <a
                        href={method.href}
                        target={
                          method.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          method.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="font-medium text-foreground hover:text-accent transition-colors"
                      >
                        {method.value}
                      </a>
                    ) : (
                      <p className="font-medium text-foreground">
                        {method.value}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Business Hours */}
            <Card className="border-accent/30 bg-accent/5">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Business Hours</p>
                  <p className="font-medium text-foreground">
                    Mon - Fri: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-3 border-border">
            <CardHeader>
              <CardTitle>Book a Free Consultation</CardTitle>
              <p className="text-sm text-muted-foreground">
                No obligation. Clear next steps. We respond within 24 hours.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone / WhatsApp</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+94 XX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interest">Interested In</Label>
                    <Select
                      value={formData.interest}
                      onValueChange={(value) =>
                        setFormData({ ...formData, interest: value })
                      }
                    >
                      <SelectTrigger id="interest">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {interests.map((interest) => (
                          <SelectItem
                            key={interest}
                            value={interest.toLowerCase().replace(/\s+/g, "-")}
                          >
                            {interest}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                  <p className="text-sm text-muted-foreground">
                    Your data is secure. We never share your information.
                  </p>
                  <Button type="submit" size="lg" className="gap-2">
                    <Send className="h-4 w-4" />
                    Book Free Consultation
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
