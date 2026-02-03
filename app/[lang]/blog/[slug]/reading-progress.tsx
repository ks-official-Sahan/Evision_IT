"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, scrollProgress)));
      setIsVisible(scrollTop > 100);
    };

    // Initial calculation
    updateProgress();

    // Add scroll listener with passive option for better performance
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-1 bg-border/30 transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0",
      )}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-linear-to-r from-accent via-accent to-accent/80 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
