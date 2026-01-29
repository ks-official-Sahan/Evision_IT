"use client";

import * as React from "react";
import { type Locale } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2 } from "lucide-react";

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
      <Card className="glass border-accent/50 bg-accent/5">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Thank you for your message!
            </h3>
            <p className="text-muted-foreground mb-6">
              We've received your inquiry and will get back to you as soon as possible.
            </p>
            <Button
              variant="outline"
              onClick={() => setIsSuccess(false)}
              className="text-sm"
            >
              Send Another Message
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot field - hidden from users */}
          <input type="hidden" name="website" />

          {/* Name Fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                First Name *
              </label>
              <Input
                name="firstName"
                placeholder="John"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Last Name *
              </label>
              <Input
                name="lastName"
                placeholder="Doe"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Email *
              </label>
              <Input
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Phone
              </label>
              <Input
                name="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Company & Project Type */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Company
              </label>
              <Input
                name="company"
                placeholder="Your Company"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Project Type
              </label>
              <select
                name="projectType"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground disabled:opacity-50"
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
            </div>
          </div>

          {/* Budget & Timeline */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Budget Range
              </label>
              <select
                name="budget"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground disabled:opacity-50"
                disabled={isSubmitting}
              >
                <option value="">Select budget range...</option>
                <option value="under-10k">Under $10,000</option>
                <option value="10k-25k">$10,000 - $25,000</option>
                <option value="25k-50k">$25,000 - $50,000</option>
                <option value="50k-100k">$50,000 - $100,000</option>
                <option value="over-100k">Over $100,000</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Timeline
              </label>
              <select
                name="timeline"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground disabled:opacity-50"
                disabled={isSubmitting}
              >
                <option value="">Select timeline...</option>
                <option value="asap">ASAP (1-2 months)</option>
                <option value="soon">Soon (2-6 months)</option>
                <option value="planned">Planned (6-12 months)</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Message *
            </label>
            <Textarea
              name="message"
              placeholder="Tell us about your project..."
              rows={5}
              required
              disabled={isSubmitting}
              className="resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full btn-cta"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            We'll get back to you within 24 hours.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
