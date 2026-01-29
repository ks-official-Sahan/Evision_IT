"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Globe,
  Smartphone,
  ShoppingCart,
  BarChart3,
  Server,
  Network,
  HardDrive,
  Headphones,
  ChevronRight,
} from "lucide-react";

const services = [
  {
    id: "web",
    icon: Globe,
    title: "Web Design & Development",
    shortDescription:
      "Custom websites that convert visitors into customers.",
    fullDescription:
      "We create stunning, fast-loading websites optimized for search engines and conversions. From corporate sites to complex web applications, our development team delivers pixel-perfect designs with clean, maintainable code.",
    mostRequested: true,
  },
  {
    id: "app",
    icon: Smartphone,
    title: "App Development",
    shortDescription:
      "Native and cross-platform mobile applications.",
    fullDescription:
      "Build engaging mobile experiences for iOS and Android. We specialize in React Native and native development, ensuring your app performs beautifully across all devices with intuitive user interfaces.",
    mostRequested: false,
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-commerce Development",
    shortDescription:
      "Online stores built for growth and conversions.",
    fullDescription:
      "Launch a powerful e-commerce platform with secure payments, inventory management, and seamless checkout. We work with Shopify, WooCommerce, and custom solutions to match your business needs.",
    mostRequested: true,
  },
  {
    id: "marketing",
    icon: BarChart3,
    title: "Digital Marketing",
    shortDescription: "SEO, Paid Ads, Social Media & Analytics.",
    fullDescription:
      "Drive qualified traffic and boost conversions with data-driven marketing strategies. Our services include SEO optimization, PPC campaigns, social media management, and comprehensive analytics reporting.",
    mostRequested: false,
  },
  {
    id: "servers",
    icon: Server,
    title: "Servers & Hardware",
    shortDescription: "Enterprise-grade server solutions.",
    fullDescription:
      "From rack servers to cloud infrastructure, we design and deploy hardware solutions that scale with your business. Our certified engineers ensure optimal performance and reliability.",
    mostRequested: false,
  },
  {
    id: "networking",
    icon: Network,
    title: "Enterprise Networking",
    shortDescription: "Robust network infrastructure.",
    fullDescription:
      "Build a secure, high-performance network infrastructure. We handle everything from network design and implementation to ongoing monitoring and optimization for businesses of all sizes.",
    mostRequested: false,
  },
  {
    id: "backup",
    icon: HardDrive,
    title: "Backup & Disaster Recovery",
    shortDescription: "Protect your critical business data.",
    fullDescription:
      "Never lose critical data again. Our backup and disaster recovery solutions ensure business continuity with automated backups, rapid recovery procedures, and tested restoration processes.",
    mostRequested: false,
  },
  {
    id: "support",
    icon: Headphones,
    title: "IT Support",
    shortDescription: "Remote and on-site technical support.",
    fullDescription:
      "Get expert IT support when you need it. Our team provides responsive remote assistance and on-site support to keep your systems running smoothly and your team productive.",
    mostRequested: false,
  },
];

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<
    (typeof services)[0] | null
  >(null);

  return (
    <section id="services" className="py-16 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Our Services
          </Badge>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl text-balance">
            Everything you need to grow online
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital and IT services tailored to your business goals.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card
              key={service.id}
              className="group cursor-pointer border-border hover:border-accent/50 transition-all hover:shadow-md"
              onClick={() => setSelectedService(service)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                    <service.icon className="h-5 w-5" />
                  </div>
                  {service.mostRequested && (
                    <Badge variant="secondary" className="text-xs">
                      Most Requested
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-base mt-3">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {service.shortDescription}
                </p>
                <button
                  type="button"
                  className="inline-flex items-center text-sm font-medium text-accent hover:underline"
                >
                  Learn more
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Detail Dialog */}
        <Dialog
          open={!!selectedService}
          onOpenChange={() => setSelectedService(null)}
        >
          <DialogContent className="sm:max-w-lg">
            {selectedService && (
              <>
                <DialogHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
                    <selectedService.icon className="h-6 w-6" />
                  </div>
                  <DialogTitle className="text-xl">
                    {selectedService.title}
                  </DialogTitle>
                  <DialogDescription className="text-base leading-relaxed pt-2">
                    {selectedService.fullDescription}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-3 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setSelectedService(null);
                      document
                        .querySelector("#contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedService(null)}
                  >
                    Close
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
