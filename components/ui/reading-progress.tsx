"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring } from "framer-motion";

interface ReadingProgressProps {
  className?: string;
  color?: "accent" | "primary" | "gradient";
  height?: "sm" | "md";
  showPercentage?: boolean;
}

export function ReadingProgress({
  className,
  color = "accent",
  height = "sm",
  showPercentage = false,
}: ReadingProgressProps) {
  const [percentage, setPercentage] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setPercentage(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  const heightClasses = {
    sm: "h-1",
    md: "h-1.5",
  };

  const colorClasses = {
    accent: "bg-accent",
    primary: "bg-primary",
    gradient: "bg-gradient-to-r from-accent via-primary to-accent",
  };

  return (
    <>
      {/* Progress Bar */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-[60]",
          "bg-border/30 backdrop-blur-sm",
          heightClasses[height],
          className,
        )}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      >
        <motion.div
          className={cn(
            "h-full origin-left",
            colorClasses[color],
            "shadow-[0_0_10px_var(--accent)]",
          )}
          style={{ scaleX }}
        />
      </div>

      {/* Optional Percentage Indicator */}
      {showPercentage && percentage > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "fixed top-4 right-4 z-[60]",
            "px-3 py-1.5 rounded-full",
            "bg-card/80 backdrop-blur-md border border-border/50",
            "text-xs font-medium text-muted-foreground",
            "shadow-lg",
          )}
        >
          {percentage}%
        </motion.div>
      )}
    </>
  );
}
