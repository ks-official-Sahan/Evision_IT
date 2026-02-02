"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Optimized Background Boxes Component
 *
 * Replaces 500+ DOM nodes with a single CSS-based grid pattern.
 * Uses CSS background-image with repeating linear gradients and
 * a subtle shimmer animation for the same visual effect.
 *
 * DOM Impact: 500+ nodes → 1 node
 */
export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  // Don't render until hydrated and only if motion is allowed
  if (!isHydrated || prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute -top-1/4 left-1/4 -z-10 h-full w-full overflow-hidden",
        className,
      )}
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      {...rest}
    >
      {/* CSS Grid Pattern - replaces 500 DOM nodes */}
      <div
        className="absolute inset-0 h-[200%] w-[200%]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(51 65 85 / 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(51 65 85 / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "64px 32px",
        }}
      />

      {/* Cross marks at grid intersections using pseudo-pattern */}
      <div
        className="absolute inset-0 h-[200%] w-[200%]"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgb(51 65 85 / 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "128px 64px",
          backgroundPosition: "0 0",
        }}
      />

      {/* Animated shimmer overlay */}
      <div
        className="absolute inset-0 h-[200%] w-[400%] animate-shimmer"
        style={{
          background: `linear-gradient(
            90deg, 
            transparent 0%, 
            rgba(147, 197, 253, 0.03) 25%, 
            rgba(168, 85, 247, 0.05) 50%, 
            rgba(147, 197, 253, 0.03) 75%, 
            transparent 100%
          )`,
          backgroundSize: "50% 100%",
        }}
      />
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
