"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  MessageCircle,
  Phone,
  Mail,
  X,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { siteConfig } from "@/lib/config";

interface FloatingCTAProps {
  locale?: string;
  className?: string;
}

interface ActionItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  href: string;
  color: string;
  ariaLabel: string;
}

export function FloatingCTA({ locale = "en", className }: FloatingCTAProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const prefersReducedMotion = useReducedMotion();

  // WhatsApp link with pre-filled message
  const whatsappNumber = siteConfig.contact.phone;
  const whatsappMessage = encodeURIComponent(
    "Hi! I'm interested in learning more about Evision IT services.",
  );
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\+/g, "")}?text=${whatsappMessage}`;

  const actions: ActionItem[] = [
    {
      id: "whatsapp",
      icon: <MessageCircle className="h-5 w-5" />,
      label: "WhatsApp",
      href: whatsappLink,
      color: "bg-[#25D366] hover:bg-[#20bd5a]",
      ariaLabel: "Contact us via WhatsApp",
    },
    {
      id: "call",
      icon: <Phone className="h-5 w-5" />,
      label: "Call",
      href: `tel:${whatsappNumber}`,
      color: "bg-blue-500 hover:bg-blue-600",
      ariaLabel: "Call us directly",
    },
    {
      id: "contact",
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      href: `/${locale}/contact`,
      color: "bg-purple-500 hover:bg-purple-600",
      ariaLabel: "Send us an email via contact form",
    },
    {
      id: "meeting",
      icon: <Calendar className="h-5 w-5" />,
      label: "Book a Call",
      href: `/${locale}/contact?type=meeting`,
      color: "bg-accent hover:bg-accent/90",
      ariaLabel: "Schedule a meeting with our team",
    },
  ];

  const toggleOpen = () => setIsOpen(!isOpen);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.8,
      transition: { duration: 0.15 },
    },
  };

  const fabVariants = {
    closed: { rotate: 0 },
    open: { rotate: 45 },
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3",
        className,
      )}
    >
      {/* Action buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col items-end gap-3 mb-2"
          >
            {actions.map((action) => (
              <motion.a
                key={action.id}
                variants={itemVariants}
                href={action.href}
                target={action.id === "whatsapp" ? "_blank" : undefined}
                rel={
                  action.id === "whatsapp" ? "noopener noreferrer" : undefined
                }
                className={cn(
                  "group flex items-center gap-3 rounded-full shadow-lg transition-all duration-200",
                  "min-h-11", // WCAG 2.5.8: 44px minimum touch target
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  action.color,
                  "text-white px-4 py-3",
                )}
                aria-label={action.ariaLabel}
                onClick={() => setIsOpen(false)}
              >
                {/* Label - shows on hover on desktop, always visible on mobile */}
                <span className="text-sm font-medium whitespace-nowrap">
                  {action.label}
                </span>
                {/* Icon */}
                <span className="flex h-6 w-6 items-center justify-center">
                  {action.icon}
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB button */}
      <motion.button
        onClick={toggleOpen}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full shadow-xl",
          "bg-accent text-accent-foreground",
          "transition-all duration-300 hover:shadow-2xl",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isOpen
            ? "hover:bg-destructive hover:text-destructive-foreground"
            : "btn-glow animate-pulse-subtle",
        )}
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        aria-label={isOpen ? "Close contact options" : "Open contact options"}
        aria-expanded={isOpen}
      >
        <motion.div
          variants={fabVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageSquare className="h-6 w-6" />
          )}
        </motion.div>
      </motion.button>

      {/* Tooltip when closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ delay: 2, duration: 0.3 }}
            className="absolute bottom-16 right-0 hidden sm:block"
          >
            <div className="glass px-3 py-1.5 rounded-lg text-sm text-foreground whitespace-nowrap">
              Need help? 👋
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
