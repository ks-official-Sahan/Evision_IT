"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Rocket,
  TrendingUp,
  Shield,
  Globe,
  Zap,
} from "lucide-react";

const goals = [
  {
    id: "launch",
    icon: Rocket,
    title: "Launch a new product",
    description: "Web app, mobile app, or e-commerce store",
    href: "/services/web-development",
  },
  {
    id: "grow",
    icon: TrendingUp,
    title: "Grow my online presence",
    description: "SEO, marketing, and conversion optimization",
    href: "/services/digital-marketing",
  },
  {
    id: "secure",
    icon: Shield,
    title: "Secure my business",
    description: "Security audits, compliance, and protection",
    href: "/services/cybersecurity",
  },
  {
    id: "scale",
    icon: Globe,
    title: "Scale my infrastructure",
    description: "Cloud migration and managed services",
    href: "/services/cloud-solutions",
  },
  {
    id: "optimize",
    icon: Zap,
    title: "Optimize performance",
    description: "Speed up existing apps and websites",
    href: "/services/web-development",
  },
];

export function GoalSelector() {
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = React.useState<string | null>(null);

  const handleGoalSelect = (goalId: string, href: string) => {
    setSelectedGoal(goalId);
    // Small delay for visual feedback before navigation
    setTimeout(() => router.push(href), 200);
  };

  return (
    <Section background="muted">
      <SectionHeader
        badge="What's your goal?"
        title="Tell us what you're looking to achieve"
        description="Select your primary goal and we'll guide you to the right solution."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {goals.map((goal) => (
          <button
            key={goal.id}
            onClick={() => handleGoalSelect(goal.id, goal.href)}
            className="text-left w-full"
          >
            <Card
              className={cn(
                "h-full transition-all hover:border-accent hover:shadow-md cursor-pointer",
                selectedGoal === goal.id && "border-accent bg-accent/5 ring-2 ring-accent/20"
              )}
            >
              <CardContent className="p-5">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                    selectedGoal === goal.id
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  <goal.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-medium text-foreground">
                  {goal.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {goal.description}
                </p>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </Section>
  );
}
