import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import HeroLoader from "@/components/HeroLoader";
import GrainOverlay from "@/components/GrainOverlay";

const fontNewKansas = localFont({
  src: [
    {
      path: "../public/fonts/NewKansas-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/NewKansas-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

const fontFilsonSoft = localFont({
  src: [
    {
      path: "../public/fonts/FilsonSoft-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/FilsonSoft-Medium.woff",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

const fontBaksoSapi = localFont({
  src: "../public/fonts/BaksoSapi.otf",
  variable: "--font-bakso",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Vizag Drive In | Modern Open-Air Dining & Play Arena",
  description:
    "Visakhapatnam's premier open-air night dining space featuring curated multi-cuisine food stalls, breezy outdoor seating, indoor AC lounge, 8-ball pool, and floodlit box cricket arena.",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  keywords: [
    "Vizag Drive In",
    "Visakhapatnam Food Court",
    "Open Air Dining Vizag",
    "Box Cricket Vizag",
    "8 Ball Pool Vizag",
    "Drive In Visakhapatnam",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontNewKansas.variable} ${fontFilsonSoft.variable} ${fontBaksoSapi.variable} scroll-smooth`}
    >
      <body className="bg-charcoal text-cream min-h-screen relative antialiased selection:bg-[#E00902] selection:text-white">
        <SmoothScrollProvider>
          <HeroLoader />
          <GrainOverlay />
          <Header />
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
