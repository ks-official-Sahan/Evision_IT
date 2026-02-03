"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/20 blur-[80px] rounded-full pointer-events-none opacity-50 animate-pulse-subtle" />

        {/* Liquid Glass Container */}
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

          {/* Skeleton Structure */}
          <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-muted/20 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-32 rounded-full bg-muted/20 animate-pulse" />
                <div className="h-3 w-24 rounded-full bg-muted/10 animate-pulse" />
              </div>
            </div>

            {/* Content Body Skeleton */}
            <div className="space-y-3">
              <div className="h-24 w-full rounded-xl bg-muted/10 animate-pulse" />
              <div className="h-4 w-3/4 rounded-full bg-muted/20 animate-pulse" />
              <div className="h-4 w-1/2 rounded-full bg-muted/20 animate-pulse" />
            </div>

            {/* Button Skeleton */}
            <div className="pt-2">
              <div className="h-10 w-28 rounded-lg bg-accent/10 animate-pulse" />
            </div>
          </div>

          {/* Brand Loader Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/20 backdrop-blur-[2px] z-10">
            <motion.div
              className="relative h-16 w-16"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div
                className="absolute inset-0 rounded-full border-t-2 border-l-2 border-accent opacity-20 animate-spin"
                style={{ animationDuration: "3s" }}
              ></div>
              <div
                className="absolute inset-1 rounded-full border-b-2 border-r-2 border-accent opacity-40 animate-spin"
                style={{ animationDuration: "2s" }}
              ></div>
              <div
                className="absolute inset-2 rounded-full border-t-2 border-accent animate-spin"
                style={{ animationDuration: "1.5s" }}
              ></div>

              {/* Center Logo/Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-3 w-3 bg-accent rounded-full animate-pulse"></div>
              </div>
            </motion.div>

            <motion.p
              className="mt-4 text-sm font-medium text-muted-foreground tracking-widest uppercase"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Loading
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
