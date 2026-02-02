"use client";

import * as React from "react";
import { type Locale } from "@/lib/config";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  locale: Locale;
}

export function ContactForm({ locale }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      projectType: formData.get("projectType"),
      budget: formData.get("budget"),
      timeline: formData.get("timeline"),
      message: formData.get("message"),
      locale,
      website: formData.get("website"), // Honeypot field
    };

    try {
      const response = await fetch("/api/contact-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSuccess(true);
      e.currentTarget.reset();
      toast({
        title: "Success",
        description: "Thank you for reaching out! We'll get back to you soon.",
      });

      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("[v0] Contact form error:", error);
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="glass border-accent/20 bg-accent/5 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-tr from-accent/10 via-transparent to-transparent pointer-events-none" />
        <CardContent className="pt-6 h-full flex flex-col items-center justify-center min-h-[500px] text-center p-8 relative z-10">
          <div className="h-20 w-20 bg-accent/10 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
            <CheckCircle2 className="h-10 w-10 text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Message Sent!
          </h3>
          <p className="text-muted-foreground mb-8 max-w-xs text-balance">
            Thanks for starting the conversation. Our team is reviewing your
            details and will get back to you within 24 hours.
          </p>
          <Button
            variant="outline"
            onClick={() => setIsSuccess(false)}
            className="group"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass border-white/10 dark:border-white/5 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Subtle top sheen */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-2xl font-semibold flex items-center gap-2">
          Send us a message
        </CardTitle>
        <CardDescription className="text-base">
          Fill out the form below and we'll help you build something amazing.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Honeypot field - hidden from users */}
          <input type="hidden" name="website" />

          {/* Name Fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                First Name <span className="text-accent">*</span>
              </label>
              <Input
                name="firstName"
                placeholder="John"
                required
                disabled={isSubmitting}
                className="bg-background/50 border-input/50 focus:border-accent/50 focus:bg-background/80 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Last Name <span className="text-accent">*</span>
              </label>
              <Input
                name="lastName"
                placeholder="Doe"
                required
                disabled={isSubmitting}
                className="bg-background/50 border-input/50 focus:border-accent/50 focus:bg-background/80 transition-all"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email <span className="text-accent">*</span>
              </label>
              <Input
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                disabled={isSubmitting}
                className="bg-background/50 border-input/50 focus:border-accent/50 focus:bg-background/80 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Phone
              </label>
              <Input
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                disabled={isSubmitting}
                className="bg-background/50 border-input/50 focus:border-accent/50 focus:bg-background/80 transition-all"
              />
            </div>
          </div>

          {/* Company & Project Type */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Company
              </label>
              <Input
                name="company"
                placeholder="Your Company"
                disabled={isSubmitting}
                className="bg-background/50 border-input/50 focus:border-accent/50 focus:bg-background/80 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Project Type
              </label>
              <div className="relative">
                <select
                  name="projectType"
                  className="flex h-10 w-full rounded-md border border-input/50 bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-accent/50 focus:bg-background/80 transition-all appearance-none"
                  disabled={isSubmitting}
                >
                  <option value="">Select project type...</option>
                  <option value="web-development">Web Development</option>
                  <option value="mobile-apps">Mobile Apps</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="digital-marketing">Digital Marketing</option>
                  <option value="cloud-solutions">Cloud Solutions</option>
                  <option value="cybersecurity">Cybersecurity</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-muted-foreground">
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Message <span className="text-accent">*</span>
            </label>
            <Textarea
              name="message"
              placeholder="Tell us about your project..."
              rows={4}
              required
              disabled={isSubmitting}
              className="resize-none bg-background/50 border-input/50 focus:border-accent/50 focus:bg-background/80 transition-all"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full btn-cta bg-accent hover:bg-accent/90 text-white font-semibold h-11"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center pt-2">
            Protected by reCAPTCHA and the Google{" "}
            <a href="#" className="underline hover:text-foreground">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-foreground">
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
