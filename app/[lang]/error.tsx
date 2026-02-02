"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to monitoring service
    console.error("[Error Boundary]", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-destructive/5 blur-[100px] rounded-full pointer-events-none" />

      <Container size="sm" className="relative z-10">
        <motion.div
          className="text-center bg-background/50 backdrop-blur-sm p-8 rounded-3xl border border-dashed border-border"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Error Icon */}
          <motion.div
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10 border border-destructive/20 shadow-lg"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </motion.div>

          {/* Error Message */}
          <motion.h1
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-destructive to-orange-500 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Something went wrong
          </motion.h1>
          {/* <motion.h1
            className="text-3xl font-bold text-destructive mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Something went wrong
          </motion.h1> */}

          <motion.p
            className="text-muted-foreground mb-8 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            We apologize for the inconvenience. Our system encountered an
            unexpected issue.
          </motion.p>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === "development" && error.message && (
            <motion.div
              className="mb-8 p-4 rounded-xl bg-muted/80 text-left overflow-auto max-w-full border border-border"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-xs font-mono text-destructive font-semibold mb-1">
                Error Trace:
              </p>
              <p className="text-xs font-mono text-muted-foreground break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs font-mono text-muted-foreground mt-2 border-t border-border pt-2">
                  Digest: {error.digest}
                </p>
              )}
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={reset}
              className="gap-2 rounded-full px-6 shadow-md hover:shadow-lg transition-all"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button
              variant="outline"
              asChild
              className="gap-2 rounded-full px-6 bg-background/50 hover:bg-muted/50"
            >
              <Link href="/">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
