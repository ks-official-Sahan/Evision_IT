"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Target, Star, Shield, Users, Sparkles } from "lucide-react";

const timeline = [
  { year: "2018", label: "Founded", description: "Started with a vision" },
  { year: "2020", label: "50+ Clients", description: "Rapid growth" },
  { year: "2023", label: "Global Expansion", description: "International reach" },
  { year: "Today", label: "Industry Leaders", description: "Trusted partner" },
];

const values = [
  { icon: Sparkles, label: "Excellence" },
  { icon: Shield, label: "Trust" },
  { icon: Users, label: "Ownership" },
  { icon: Star, label: "Clarity" },
];

export function CompanySection() {
  return (
    <section id="company" className="py-16 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            About Evision
          </Badge>
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl text-balance">
            Crafting Digital Excellence
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine technical expertise with strategic thinking to deliver
            exceptional digital experiences.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid gap-6 md:grid-cols-2 mb-16">
          <Card className="border-accent/30 bg-card">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
                <Eye className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To empower growing businesses with world-class digital
                experiences and resilient IT foundations that drive sustainable
                growth and competitive advantage.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <Target className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To deliver secure, high-performance digital products and IT
                solutions through disciplined engineering, measurable outcomes,
                and exceptional support.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Story Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground text-center mb-8">
            Our Story
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-border" />

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {timeline.map((item, index) => (
                <div key={item.year} className="relative text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-card border-2 border-accent text-accent font-semibold text-sm z-10 relative">
                    {item.year}
                  </div>
                  <h4 className="mt-4 font-semibold text-foreground">
                    {item.label}
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <h3 className="text-2xl font-semibold text-foreground text-center mb-8">
            Our Values
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {values.map((value) => (
              <div
                key={value.label}
                className="flex items-center gap-3 rounded-full bg-card border border-border px-5 py-3"
              >
                <value.icon className="h-5 w-5 text-accent" />
                <span className="font-medium text-foreground">{value.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
