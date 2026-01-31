"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Home, FileQuestion, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground overflow-hidden relative">
      {/* Background Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 flex max-w-[64rem] flex-col items-center gap-4 text-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-muted/50 backdrop-blur-md border border-border shadow-xl mb-6"
        >
          <FileQuestion className="h-12 w-12 text-primary animate-pulse" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
        >
          404 - Page Not Found
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
        >
          The page you are looking for doesn't exist or has been moved.{" "}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <Button
            asChild
            size="lg"
            className="h-12 px-8 rounded-full shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
            <Link href="/contact">Contact Support</Link>
          <Button
            variant="outline"
            asChild
            size="lg"
            className="h-12 px-8 rounded-full backdrop-blur-sm bg-background/50 hover:bg-muted/50 transition-all duration-300"
          >
            <Link href="/contact">Contact Support</Link>          
            </Button>
        </motion.div>
      </div>
    </div>
  );
}
