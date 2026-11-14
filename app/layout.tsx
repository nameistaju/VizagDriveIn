import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import HeroLoader from "@/components/HeroLoader";
import GrainOverlay from "@/components/GrainOverlay";

const fontDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "600", "700", "900"],
});

const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
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
      className={`${fontDisplay.variable} ${fontSans.variable} scroll-smooth`}
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
