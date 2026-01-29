"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Globe,
  Smartphone,
  ShoppingCart,
  TrendingUp,
  Cog,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const growthGoals = [
  {
    id: "website",
    icon: Globe,
    title: "Launch a high-converting website",
    description:
      "Get a fast, modern website that drives leads and establishes your brand presence online with conversion-optimized design.",
  },
  {
    id: "app",
    icon: Smartphone,
    title: "Build a mobile app",
    description:
      "Create native or cross-platform mobile applications that engage users and extend your business reach to mobile devices.",
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "Sell online (E-commerce)",
    description:
      "Launch a powerful online store with secure payments, inventory management, and seamless checkout experiences.",
  },
  {
    id: "marketing",
    icon: TrendingUp,
    title: "Rank & acquire customers",
    description:
      "Boost your visibility with SEO, paid advertising, and social media marketing strategies that drive qualified traffic.",
  },
  {
    id: "modernize",
    icon: Cog,
    title: "Modernize systems & automate",
    description:
      "Streamline operations with modern infrastructure, automation workflows, and integrated business systems.",
  },
];

export function GrowthSelector() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const selectedGoalData = growthGoals.find((g) => g.id === selectedGoal);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-muted/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Choose your growth goal
          </h2>
          <p className="mt-3 text-muted-foreground">
            Select what matters most to your business right now
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {growthGoals.map((goal) => (
            <button
              key={goal.id}
              type="button"
              onClick={() => setSelectedGoal(goal.id)}
              className={cn(
                "group flex flex-col items-center gap-3 rounded-xl border p-4 text-center transition-all lg:p-6",
                selectedGoal === goal.id
                  ? "border-accent bg-accent/5 shadow-md"
                  : "border-border bg-card hover:border-accent/50 hover:bg-card/80"
              )}
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                  selectedGoal === goal.id
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent"
                )}
              >
                <goal.icon className="h-6 w-6" />
              </div>
              <span
                className={cn(
                  "text-sm font-medium leading-tight",
                  selectedGoal === goal.id
                    ? "text-foreground"
                    : "text-muted-foreground group-hover:text-foreground"
                )}
              >
                {goal.title}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Goal Detail */}
        {selectedGoalData && (
          <Card className="mt-8 p-6 border-accent/30 bg-card">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <selectedGoalData.icon className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {selectedGoalData.title}
                </h3>
                <p className="mt-1 text-muted-foreground">
                  {selectedGoalData.description}
                </p>
              </div>
              <Button onClick={scrollToContact} className="gap-2 shrink-0">
                Talk to an expert
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
}
