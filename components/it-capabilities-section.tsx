"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, ShieldCheck, HardDrive, Headphones } from "lucide-react";

const capabilities = [
  {
    icon: Server,
    title: "Infrastructure",
    description:
      "Enterprise-grade servers, cloud solutions, and data center services for maximum uptime.",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    description:
      "Comprehensive security audits, threat monitoring, and compliance management.",
  },
  {
    icon: HardDrive,
    title: "Backup/DR",
    description:
      "Automated backups, disaster recovery planning, and business continuity solutions.",
  },
  {
    icon: Headphones,
    title: "Managed Support",
    description:
      "24/7 monitoring, proactive maintenance, and responsive technical support.",
  },
];

export function ITCapabilitiesSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl text-balance">
            Digital delivery backed by enterprise-grade IT
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Our digital solutions are supported by robust infrastructure and
            security expertise.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability) => (
            <Card key={capability.title} className="border-border text-center">
              <CardHeader className="pb-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <capability.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-base mt-4">
                  {capability.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {capability.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
