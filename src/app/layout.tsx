import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QuoteModal from "@/components/common/QuoteModal";
import { QuoteProvider } from "@/context/QuoteContext";
import { constructMetadata } from "@/lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900`}
      >
        <QuoteProvider>
          <Navbar />
          <main className="flex-grow pt-16 lg:pt-20">
            {children}
          </main>
          <Footer />
          <QuoteModal />
        </QuoteProvider>
      </body>
    </html>
  );
}
