import Link from "next/link";
import { cacheLife } from "next/cache";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { siteConfig, type Locale } from "@/lib/config";
import { Linkedin, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

interface SiteFooterProps {
  locale?: Locale;
}

const getFooterLinks = (locale: Locale) => ({
  solutions: [
    { label: "Digital Products", href: `/${locale}/solutions#digital` },
    { label: "Infrastructure", href: `/${locale}/solutions#infrastructure` },
    { label: "Security", href: `/${locale}/solutions#security` },
    { label: "Managed IT", href: `/${locale}/solutions#managed` },
  ],
  services: [
    { label: "Web Development", href: `/${locale}/services/web-development` },
    { label: "Mobile Apps", href: `/${locale}/services/mobile-apps` },
    { label: "E-commerce", href: `/${locale}/services/e-commerce` },
    {
      label: "Digital Marketing",
      href: `/${locale}/services/digital-marketing`,
    },
  ],
  company: [
    { label: "About Us", href: `/${locale}/company` },
    { label: "Case Studies", href: `/${locale}/case-studies` },
    { label: "Blog", href: `/${locale}/blog` },
    { label: "Contact", href: `/${locale}/contact` },
  ],
  legal: [
    { label: "Privacy Policy", href: `/${locale}/privacy` },
    { label: "Terms of Service", href: `/${locale}/terms` },
  ],
});

const socialLinks = [
  {
    icon: Linkedin,
    href: siteConfig.links.linkedin,
    label: "LinkedIn",
  },
  {
    icon: Facebook,
    href: siteConfig.links.facebook,
    label: "Facebook",
  },
  {
    icon: Twitter,
    href: siteConfig.links.twitter,
    label: "Twitter",
  },
];

export async function SiteFooter({ locale = "en" }: SiteFooterProps) {
  "use cache";
  cacheLife({ stale: 86400, revalidate: 604800, expire: 2592000 });

  const footerLinks = getFooterLinks(locale);
  return (
    <footer className="border-t border-border bg-muted/30">
      <Container>
        <div className="py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href={`/${locale}`} className="inline-block">
                {/* Light theme logo (shown in light mode) */}
                <Image
                  src="/logo/logo_dark.png"
                  alt={siteConfig.name}
                  width={160}
                  height={50}
                  className="h-10 w-auto dark:hidden"
                />
                {/* Dark theme logo (shown in dark mode) */}
                <Image
                  src="/logo/logo_light.png"
                  alt={siteConfig.name}
                  width={160}
                  height={50}
                  className="h-10 w-auto hidden dark:block"
                />
              </Link>
              <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
                {siteConfig.description}
              </p>
              <div className="mt-6 space-y-3">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {siteConfig.contact.email}
                </a>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {siteConfig.contact.phone}
                </a>
                <p className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  {siteConfig.contact.address}
                </p>
              </div>
              <div className="mt-6 flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h3 className="font-semibold text-foreground">Solutions</h3>
              <ul className="mt-4 space-y-2">
                {footerLinks.solutions.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">Services</h3>
              <ul className="mt-4 space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">Company</h3>
              <ul className="mt-4 space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <h3 className="mt-6 font-semibold text-foreground">Legal</h3>
              <ul className="mt-4 space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              {siteConfig.tagline}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
