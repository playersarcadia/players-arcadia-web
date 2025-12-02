import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Players Arcadia",
  description: "Pro-level tools for running seamless mobile esports tournaments with fast, effortless payouts across the continent.",
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
          <main className="pt-24 sm:pt-26 md:pt-28 lg:pt-30 xl:pt-32">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

