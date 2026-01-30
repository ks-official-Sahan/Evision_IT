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
    <div className="min-h-[80vh] flex items-center justify-center py-16">
      <Container size="sm">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Error Icon */}
          <motion.div
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </motion.div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Something went wrong
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            We apologize for the inconvenience. An unexpected error occurred
            while loading this page.
          </p>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === "development" && error.message && (
            <motion.div
              className="mb-8 p-4 rounded-lg bg-muted text-left overflow-auto max-w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xs font-mono text-muted-foreground break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs font-mono text-muted-foreground mt-2">
                  Digest: {error.digest}
                </p>
              )}
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={reset} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
