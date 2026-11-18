import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { RevenueCatInit } from "@/components/revenuecat-init";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carrypost — Short stories. Read right here.",
  description:
    "Carrypost is a library of short fiction — longer than an article, shorter than a book, written to be read in one sitting. No downloads, no apps, just the page.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <RevenueCatInit />
        {children}
      </body>
    </html>
  );
}
