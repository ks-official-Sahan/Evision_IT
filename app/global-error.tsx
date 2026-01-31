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
      <body className="min-h-screen flex items-center justify-center bg-neutral-950 text-white font-sans antialiased overflow-hidden relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/20 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[100px] rounded-full" />
        </div>

        <div className="text-center px-4 relative z-10 max-w-md w-full">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-sm shadow-2xl animate-in zoom-in duration-500">
            <AlertTriangle className="h-12 w-12 text-red-500 animate-[bounce_1s_infinite]" />
          </div>

          <h1 className="text-4xl font-bold mb-4 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            System Error
          </h1>
          <p className="text-neutral-400 mb-8 text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            A critical system error prevented the application from loading.
          </p>

          <button
            onClick={reset}
            className="group inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-neutral-200 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
          >
            <RefreshCw className="h-5 w-5 transition-transform group-hover:rotate-180" />
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
