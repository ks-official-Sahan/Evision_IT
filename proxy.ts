import { NextRequest, NextResponse } from "next/server";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/lib/config";

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if locale is in pathname
  const localeInPathname = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (localeInPathname) {
    return NextResponse.next();
  }

  // If no locale, try to detect from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") || "";
  let preferredLocale = DEFAULT_LOCALE;

  for (const locale of SUPPORTED_LOCALES) {
    if (acceptLanguage.includes(locale)) {
      preferredLocale = locale;
      break;
    }
  }

  // Redirect to locale-prefixed URL
  if (pathname === "/" || pathname === "") {
    return NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
  }

  // Redirect other paths to locale-prefixed versions
  return NextResponse.redirect(
    new URL(`/${preferredLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    // Match all paths except static assets, api routes, etc.
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap).*)",
  ],
};
