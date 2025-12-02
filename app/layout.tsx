import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

