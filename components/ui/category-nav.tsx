"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Category {
  id: string;
  label: string;
}

interface CategoryNavProps {
  categories: Category[];
  activeCategory?: string;
  className?: string;
}

export function CategoryNav({
  categories,
  activeCategory,
  className,
}: CategoryNavProps) {
  const [activeId, setActiveId] = React.useState<string | undefined>(
    activeCategory,
  );

  const scrollToCategory = (categoryId: string) => {
    setActiveId(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      const offset = 100; // Offset for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const sectionIds = categories.map((cat) => cat.id);

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveId(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories]);

  return (
    <nav
      className={cn(
        "bg-background/80 backdrop-blur-md rounded-xl border border-border/50 p-4 sticky top-24 z-30",
        "shadow-lg shadow-accent/5",
        className,
      )}
    >
      <h3 className="font-semibold mb-4 px-2 text-sm text-muted-foreground uppercase tracking-wider">
        Categories
      </h3>
      <div className="flex flex-col gap-1.5">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            size="sm"
            onClick={() => scrollToCategory(category.id)}
            className={cn(
              "justify-start text-left relative overflow-hidden transition-all duration-300",
              activeId === category.id
                ? "text-accent font-medium bg-accent/10 hover:bg-accent/15"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
          >
            {activeId === category.id && (
              <motion.div
                layoutId="activeCategory"
                className="absolute left-0 w-0.5 h-full bg-accent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
            <span className={cn("ml-2", activeId === category.id && "ml-3")}>
              {category.label}
            </span>
          </Button>
        ))}
      </div>
    </nav>
  );
}
