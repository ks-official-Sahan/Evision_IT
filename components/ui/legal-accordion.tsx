"use client";

import React from "react";
import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LegalAccordionItem {
  id: string;
  title: string;
  icon?: LucideIcon;
  content: React.ReactNode;
}

interface LegalAccordionProps {
  items: LegalAccordionItem[];
  className?: string;
  defaultOpen?: string[];
}

export function LegalAccordion({
  items,
  className,
  defaultOpen = [],
}: LegalAccordionProps) {
  return (
    <AccordionPrimitive.Root
      type="multiple"
      defaultValue={defaultOpen}
      className={cn("space-y-4", className)}
    >
      {items.map((item, index) => (
        <AccordionPrimitive.Item
          key={item.id}
          value={item.id}
          id={item.id}
          className={cn(
            "group",
            "bg-card/50 backdrop-blur-sm",
            "border border-border/50 rounded-xl",
            "overflow-hidden",
            "transition-all duration-300",
            "hover:border-accent/30 hover:shadow-md",
            "data-[state=open]:border-accent/40 data-[state=open]:shadow-lg",
          )}
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
              className={cn(
                "flex flex-1 items-center gap-4 p-5 md:p-6",
                "text-left font-semibold",
                "transition-colors duration-200",
                "hover:bg-accent/5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
                "[&[data-state=open]>svg:last-child]:rotate-180",
              )}
            >
              {/* Section Number */}
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center",
                  "rounded-lg bg-accent/10 text-accent",
                  "text-sm font-bold",
                  "transition-colors duration-200",
                  "group-data-[state=open]:bg-accent group-data-[state=open]:text-accent-foreground",
                )}
              >
                {item.icon ? <item.icon className="h-4 w-4" /> : index + 1}
              </span>

              {/* Title */}
              <span className="flex-1 text-base md:text-lg text-foreground">
                {item.title}
              </span>

              {/* Chevron */}
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-muted-foreground",
                  "transition-transform duration-300 ease-out",
                )}
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>

          <AccordionPrimitive.Content
            className={cn(
              "overflow-hidden",
              "data-[state=closed]:animate-accordion-up",
              "data-[state=open]:animate-accordion-down",
            )}
          >
            <div
              className={cn(
                "px-5 pb-5 md:px-6 md:pb-6",
                "pl-[4.25rem] md:pl-[4.75rem]", // Align with title text
                "prose prose-sm md:prose-base dark:prose-invert max-w-none",
                "text-muted-foreground leading-relaxed",
                // Prose customizations
                "[&>p]:mb-4 [&>p:last-child]:mb-0",
                "[&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2",
                "[&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-2",
                "[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2",
                "[&_strong]:text-foreground [&_strong]:font-semibold",
              )}
            >
              {item.content}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

// Alternative simpler version for inline content
interface LegalSectionProps {
  id: string;
  title: string;
  icon?: LucideIcon;
  number?: number;
  children: React.ReactNode;
  className?: string;
}

export function LegalSection({
  id,
  title,
  icon: Icon,
  number,
  children,
  className,
}: LegalSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24", // Offset for fixed header
        "py-8 border-b border-border/30 last:border-0",
        className,
      )}
    >
      <h2 className="flex items-center gap-4 mb-6">
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center",
            "rounded-xl bg-accent/10 text-accent",
            "text-sm font-bold",
          )}
        >
          {Icon ? <Icon className="h-5 w-5" /> : number}
        </span>
        <span className="text-xl md:text-2xl font-bold text-foreground">
          {title}
        </span>
      </h2>
      <div
        className={cn(
          "pl-14", // Align with title
          "prose prose-base dark:prose-invert max-w-none",
          "text-muted-foreground leading-relaxed",
          "[&>p]:mb-4 [&>p:last-child]:mb-0",
          "[&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2",
          "[&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-2",
          "[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2",
          "[&_strong]:text-foreground [&_strong]:font-semibold",
        )}
      >
        {children}
      </div>
    </section>
  );
}
