"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { useScrollVideo } from "@/lib/useScrollVideo";

export default function HeroArrival() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { progress, isReducedMotion, hasError, activeSrc } = useScrollVideo({
    videoRef,
    triggerRef,
    desktopSrc: "/video/hero-arrival-scrub.mp4",
    mobileSrc: "/video/hero-arrival-scrub-720.mp4",
  });

  // Beat 0 (0% - 15%): Title & Action Buttons
  let heroOpacity = 1;
  let heroY = 0;
  if (progress > 0.12) {
    heroOpacity = Math.max(0, 1 - (progress - 0.12) / 0.03);
    heroY = (progress - 0.12) * -120;
  }

  // Beat 1 (20% - 40%): "Pull up."
  let beat1Opacity = 0;
  let beat1Y = 20;
  if (progress >= 0.18 && progress <= 0.42) {
    if (progress < 0.22) {
      const t = (progress - 0.18) / 0.04;
      beat1Opacity = t;
      beat1Y = 20 * (1 - t);
    } else if (progress > 0.38) {
      const t = (progress - 0.38) / 0.04;
      beat1Opacity = Math.max(0, 1 - t);
      beat1Y = -20 * t;
    } else {
      beat1Opacity = 1;
      beat1Y = 0;
    }
  }

  // Beat 2 (45% - 65%): "Walk in."
  let beat2Opacity = 0;
  let beat2Y = 20;
  if (progress >= 0.43 && progress <= 0.67) {
    if (progress < 0.47) {
      const t = (progress - 0.43) / 0.04;
      beat2Opacity = t;
      beat2Y = 20 * (1 - t);
    } else if (progress > 0.63) {
      const t = (progress - 0.63) / 0.04;
      beat2Opacity = Math.max(0, 1 - t);
      beat2Y = -20 * t;
    } else {
      beat2Opacity = 1;
      beat2Y = 0;
    }
  }

  // Beat 3 (70% - 95%): "Sit down. Eat well."
  let beat3Opacity = 0;
  let beat3Y = 20;
  if (progress >= 0.68 && progress <= 0.98) {
    if (progress < 0.72) {
      const t = (progress - 0.68) / 0.04;
      beat3Opacity = t;
      beat3Y = 20 * (1 - t);
    } else if (progress > 0.93) {
      const t = (progress - 0.93) / 0.04;
      beat3Opacity = Math.max(0, 1 - t);
      beat3Y = -20 * t;
    } else {
      beat3Opacity = 1;
      beat3Y = 0;
    }
  }

  // Fallback static layout
  if (isReducedMotion || hasError) {
    return (
      <section
        id="hero-arrival"
        aria-label="The Vizag Drive In Hero Arrival"
        className="relative min-h-screen w-full flex items-center justify-center bg-charcoal text-cream overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <Image
            src="/video/hero-arrival-poster.webp"
            alt="The Vizag Drive In aerial evening view"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container mx-auto px-6 py-24 text-center max-w-3xl relative z-10">
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-cream">
            The Vizag <span className="italic font-normal text-[#E00902]">Drive In</span>
          </h1>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#visit"
              className="px-6 py-3 rounded-xl bg-cream/10 hover:bg-cream/20 text-cream border border-cream/20 font-medium text-xs sm:text-sm tracking-wide transition-colors"
            >
              Get Directions
            </a>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#E00902] hover:bg-[#c20802] text-white font-semibold text-xs sm:text-sm tracking-wide transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero-arrival"
      ref={triggerRef}
      aria-label="The Vizag Drive In Scroll Arrival Experience"
      className="relative w-full h-screen overflow-hidden bg-charcoal text-cream select-none"
    >
      {/* Fullscreen Video Canvas */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
        <video
          ref={videoRef}
          src={activeSrc}
          poster="/video/hero-arrival-poster.webp"
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center"
        />

        {/* Clean solid dark overlay (No gradients) */}
        <div className="absolute inset-0 bg-black/45 pointer-events-none" />
      </div>

      {/* BEAT 0: Initial Hero State (0% - 15%) - Decreased Text Size */}
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 transition-all duration-75 will-change-transform"
        style={{
          opacity: heroOpacity,
          transform: `translate3d(0, ${heroY}px, 0)`,
          pointerEvents: heroOpacity > 0.05 ? "auto" : "none",
        }}
      >
        <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-cream">
          The Vizag <span className="italic font-normal text-[#E00902]">Drive In</span>
        </h1>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#visit"
            className="px-6 py-3 rounded-xl bg-cream/10 hover:bg-cream/20 text-cream border border-cream/20 font-medium text-xs sm:text-sm tracking-wider uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E00902]"
            aria-label="Get Directions to The Vizag Drive In"
          >
            Get Directions
          </a>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-[#E00902] hover:bg-[#c20802] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E00902]"
            aria-label="Contact The Vizag Drive In on WhatsApp"
          >
            WhatsApp
          </a>
        </div>

        {/* Scroll Cue */}
        <div
          className="absolute bottom-10 flex flex-col items-center gap-2 text-[11px] uppercase tracking-widest text-cream/60 font-sans pointer-events-none"
          aria-hidden="true"
        >
          <span>Scroll to arrive</span>
          <div className="w-5 h-9 rounded-full border border-cream/30 flex items-start justify-center p-1">
            <div className="w-1.5 h-2.5 bg-[#E00902] rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* BEAT 1 (20% - 40%): "Pull up." - Decreased Size */}
      <div
        className="absolute bottom-12 sm:bottom-16 md:bottom-20 left-6 sm:left-12 md:left-20 z-20 pointer-events-none transition-all duration-75 will-change-transform"
        style={{
          opacity: beat1Opacity,
          transform: `translate3d(0, ${beat1Y}px, 0)`,
        }}
      >
        <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-cream">
          Pull <span className="italic font-normal text-[#E00902]">up.</span>
        </h2>
      </div>

      {/* BEAT 2 (45% - 65%): "Walk in." - Decreased Size */}
      <div
        className="absolute bottom-12 sm:bottom-16 md:bottom-20 left-6 sm:left-12 md:left-20 z-20 pointer-events-none transition-all duration-75 will-change-transform"
        style={{
          opacity: beat2Opacity,
          transform: `translate3d(0, ${beat2Y}px, 0)`,
        }}
      >
        <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-cream">
          Walk <span className="italic font-normal text-[#E00902]">in.</span>
        </h2>
      </div>

      {/* BEAT 3 (70% - 95%): "Sit down. Eat well." - Decreased Size */}
      <div
        className="absolute bottom-12 sm:bottom-16 md:bottom-20 left-6 sm:left-12 md:left-20 z-20 pointer-events-none transition-all duration-75 will-change-transform"
        style={{
          opacity: beat3Opacity,
          transform: `translate3d(0, ${beat3Y}px, 0)`,
        }}
      >
        <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-cream">
          Sit down. <span className="italic font-normal text-[#E00902]">Eat well.</span>
        </h2>
      </div>

      {/* Solid bottom line (No gradients) */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-[#E00902] z-30 transition-all duration-75 pointer-events-none"
        style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        aria-hidden="true"
      />
    </section>
  );
}
