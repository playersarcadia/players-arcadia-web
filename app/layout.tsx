import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Players Arcadia",
  description: "Pro-level tools for running seamless mobile esports tournaments with fast, effortless payouts across the continent.",
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
    <html lang="en" className="bg-gray-50">
      <body className="bg-gray-50">
        <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 min-h-screen bg-white">
          <Header />
          <main className="pt-16 sm:pt-18 md:pt-20 lg:pt-22 xl:pt-24">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

