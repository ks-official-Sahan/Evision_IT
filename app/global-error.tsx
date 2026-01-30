"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("[Global Error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-50">
        <div className="text-center px-4">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Critical Error</h1>
          <p className="text-neutral-400 mb-8 max-w-md mx-auto">
            A critical error occurred. Please try refreshing the page.
          </p>

          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
