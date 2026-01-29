"use client";

import React from "react"

import { cn } from "@/lib/utils";
import { Container } from "./container";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerSize?: "default" | "sm" | "lg" | "full";
  background?: "default" | "muted" | "accent" | "primary";
  padding?: "default" | "sm" | "lg" | "none";
  animate?: boolean;
}

export function Section({
  containerSize = "default",
  background = "default",
  padding = "default",
  animate = true,
  className,
  children,
  ...props
}: SectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animate && !prefersReducedMotion;

  const content = (
    <Container size={containerSize}>{children}</Container>
  );

  return (
    <section
      className={cn(
        {
          "py-12 lg:py-16": padding === "sm",
          "py-16 lg:py-24": padding === "default",
          "py-20 lg:py-32": padding === "lg",
          "py-0": padding === "none",
          "bg-background": background === "default",
          "bg-muted/50": background === "muted",
          "bg-accent text-accent-foreground": background === "accent",
          "bg-primary text-primary-foreground": background === "primary",
        },
        className
      )}
      {...props}
    >
      {shouldAnimate ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {content}
        </motion.div>
      ) : (
        content
      )}
    </section>
  );
}
