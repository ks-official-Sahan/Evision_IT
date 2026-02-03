"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("[Error Boundary]", error);
  }, [error]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-destructive/5 blur-[100px] rounded-full pointer-events-none" />

      <Container size="sm" className="relative z-10">
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8 sm:p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Glass Reflection */}
          <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent pointer-events-none" />

          {/* Error Icon */}
          <motion.div
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10 border border-destructive/20 shadow-lg relative"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-destructive" />
            <AlertTriangle className="h-10 w-10 text-destructive relative z-10" />
          </motion.div>

          {/* Error Message */}
          <div className="space-y-4 mb-8">
            <motion.h1
              className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-destructive to-orange-500"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Something went wrong
            </motion.h1>
            <motion.p
              className="text-muted-foreground text-lg max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              We encountered an unexpected error. Our team has been notified and
              is looking into it.
            </motion.p>
          </div>

          {/* Technical Details (Collapsed by default, maybe visible in dev) */}
          {process.env.NODE_ENV === "development" && (
            <motion.div
              className="mb-8 p-4 bg-muted/30 rounded-lg border border-border text-left overflow-auto max-h-48 scrollbar-thin scrollbar-thumb-muted-foreground/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ delay: 0.5 }}
            >
              <p className="font-mono text-xs text-destructive mb-2 font-semibold">
                Error Digest: {error.digest}
              </p>
              <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap break-all">
                {error.message}
                {error.stack}
              </pre>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={reset}
              size="lg"
              className="w-full sm:w-auto gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg hover:shadow-destructive/20 transition-all duration-300"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto gap-2 border-white/10 hover:bg-white/5"
              onClick={() => (window.location.href = "/")}
            >
              <Home className="h-4 w-4" />
              Return Home
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
