import type { Metadata } from "next";
import { type Locale } from "@/lib/config";
import { getValidLocale } from "@/lib/i18n/get-dict";
import { BlogClientContent } from "./client-content";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export const metadata: Metadata = {
  title: "Blog | Evision IT",
  description:
    "Stay updated with our latest articles on digital transformation, IT strategy, and industry trends.",
};

export default async function BlogPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;

  return <BlogClientContent locale={locale} />;
}
