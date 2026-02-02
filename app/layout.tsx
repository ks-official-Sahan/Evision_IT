import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from "@/components/analytics/google-tag-manager";
import "@/app/globals.css";
import { ClientEffects } from "@/components/layout/client-effects";
import { Suspense } from "react";
import LightRays from "@/components/layout/LightRays";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Evision IT",
  description: "Innovative Tech Solutions for Visionary Businesses",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1c1e" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased relative`}
      >
        <GoogleTagManagerNoScript />

        {/* Global background effect - fixed to viewport, behind all content */}
        <Suspense fallback={null}>
          <div
            className="fixed inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: -10 }}
            aria-hidden="true"
          >
            <LightRays
              raysOrigin="top-center"
              raysColor="#5dfeca"
              raysSpeed={0.5}
              lightSpread={0.9}
              rayLength={1.4}
              followMouse={true}
              mouseInfluence={0.02}
              noiseAmount={0}
              distortion={0.01}
            />
          </div>
        </Suspense>

        {/* Main content wrapper */}
        <div className="relative z-0">{children}</div>

        <Analytics />
        <GoogleTagManager />
        <Suspense fallback={null}>
          <ClientEffects />
        </Suspense>
      </body>
    </html>
  );
}
