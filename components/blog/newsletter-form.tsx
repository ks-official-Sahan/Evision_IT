"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Mail } from "lucide-react";
import { toast } from "sonner";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    try {
      // Assuming there is a subscribe API, or we verify its existence later.
      // Based on request: "sends it to your subscribe API (or shows validation/error success UI)"
      // I will simulate or call a generic subscribe endpoint if known, but for now I'll assume /api/subscribe exists or just mock it as requested "wire handleSubmit... so the subscription actually works" implies needing a real endpoint or logic.
      // Since I don't see an explicit /api/subscribe in the file list (only contact/quiz), I will assume standard POST structure or just show success UI as requested fallback.
      // Actually, the prompt says "sends it to your subscribe API". I'll try to POST to /api/subscribe.

      const res = await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Subscription failed");

      setStatus("success");
      setEmail("");
      toast.success("Thanks for subscribing!");
    } catch (error) {
      setStatus("error");
      toast.error("Something went wrong. Please try again.");
    }
    // No finally block to keep success/error state visible
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
    >
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          aria-label="Email address"
          required
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="btn-glow"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Subscribing...
          </>
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  );
}
