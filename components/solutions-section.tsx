"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Rocket,
  Server,
  ShieldCheck,
  Headphones,
  Check,
} from "lucide-react";

const solutions = [
  {
    id: "digital",
    icon: Rocket,
    title: "Digital Products & Growth",
    description:
      "Drive revenue with high-converting websites, apps, and marketing strategies built for results.",
    deliverables: [
      "Web Design & Development",
      "App Development",
      "E-commerce",
      "Digital Marketing",
    ],
    highlighted: true,
  },
  {
    id: "infrastructure",
    icon: Server,
    title: "Infrastructure & Data Center",
    description:
      "Enterprise-grade hosting and hardware solutions for maximum uptime and performance.",
    deliverables: [
      "Server Solutions",
      "Cloud Infrastructure",
      "Enterprise Networking",
    ],
    highlighted: false,
  },
  {
    id: "security",
    icon: ShieldCheck,
    title: "Security & Resilience",
    description:
      "Protect your business with comprehensive security and disaster recovery planning.",
    deliverables: [
      "Security Audits",
      "Backup Solutions",
      "Disaster Recovery",
    ],
    highlighted: false,
  },
  {
    id: "managed",
    icon: Headphones,
    title: "Managed Services",
    description:
      "Focus on your business while we handle your IT infrastructure and support needs.",
    deliverables: ["IT Support", "Remote Assistance", "On-site Services"],
    highlighted: false,
  },
];

export function SolutionsSection() {
  return (
    <section id="solutions" className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Our Solutions
          </Badge>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl text-balance">
            Full-spectrum digital and IT capabilities
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From digital products to enterprise infrastructure—one partner for
            all your technology needs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution) => (
            <Card
              key={solution.id}
              className={
                solution.highlighted
                  ? "border-accent bg-accent/5 md:col-span-2 lg:col-span-2 lg:row-span-1"
                  : "border-border"
              }
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      solution.highlighted
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <solution.icon className="h-6 w-6" />
                  </div>
                  {solution.highlighted && (
                    <Badge className="bg-accent text-accent-foreground">
                      Primary Focus
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl mt-4">{solution.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {solution.description}
                </p>
                <ul className="space-y-2">
                  {solution.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <Check className="h-4 w-4 text-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
