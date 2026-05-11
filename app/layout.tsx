import type { Metadata } from "next";
import "/globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  title: {
    default: "Players Arcadia - Pro Esports Tournament Platform",
    template: "%s | Players Arcadia",
  },
  description:
    "Pro-level tools for running seamless mobile esports tournaments with fast, effortless payouts across the continent. Join Players Arcadia today!",
  keywords: [
    "esports",
    "gaming tournaments",
    "mobile esports",
    "tournament platform",
    "gaming competitions",
    "esports platform",
    "Players Arcadia",
  ],
  authors: [{ name: "Players Arcadia" }],
  creator: "Players Arcadia",
  publisher: "Players Arcadia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Players Arcadia - Pro Esports Tournament Platform",
    description:
      "Pro-level tools for running seamless mobile esports tournaments with fast, effortless payouts across the continent.",
    siteName: "Players Arcadia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Players Arcadia - Pro Esports Tournament Platform",
    description:
      "Pro-level tools for running seamless mobile esports tournaments with fast, effortless payouts across the continent.",
    creator: "@playersarcadia",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/icons/gamersarc.svg", sizes: "any", type: "image/svg" }],
    apple: [
      { url: "/icons/gamersarc.svg", sizes: "180x180", type: "image/svg" },
    ],
  },
  manifest: "/icons/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Players Arcadia",
    description: "Pro-level tools for running seamless mobile esports tournaments with fast, effortless payouts across the continent.",
    url: baseUrl,
    logo: `${baseUrl}/icons/gamersarc-white.svg`,
    sameAs: [
      "https://twitter.com/playersarcadia",
      "https://facebook.com/playersarcadia",
      "https://instagram.com/playersarcadia",
      "https://linkedin.com/company/playersarcadia",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
    },
  };

  return (
    <html lang="en" className="bg-gray-50 scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Structured Data (Schema.org) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="bg-gray-50" suppressHydrationWarning>
        <Analytics />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:bg-[#082C73] focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
        >
          Skip to main content
        </a>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
