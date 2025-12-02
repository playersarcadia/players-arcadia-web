import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  title: {
    default: "Players Arcadia - Pro Esports Tournament Platform",
    template: "%s | Players Arcadia",
  },
  description: "Pro-level tools for running seamless mobile esports tournaments with fast, effortless payouts across the continent. Join Players Arcadia today!",
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Players Arcadia - Pro Esports Tournament Platform",
    description: "Pro-level tools for running seamless mobile esports tournaments with fast, effortless payouts across the continent.",
    siteName: "Players Arcadia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Players Arcadia - Pro Esports Tournament Platform",
    description: "Pro-level tools for running seamless mobile esports tournaments with fast, effortless payouts across the continent.",
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
    icon: [
      { url: "/icons/favicon.ico", sizes: "any" },
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/icons/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-50 scroll-smooth">
      <body className="bg-gray-50">
        <Analytics />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:bg-[#082C73] focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
        >
          Skip to main content
        </a>
        <ErrorBoundary>
          <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 min-h-screen bg-white flex flex-col">
            <Header />
            <main className="pt-16 sm:pt-18 md:pt-20 lg:pt-22 xl:pt-24 flex-1" id="main-content" role="main" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}

