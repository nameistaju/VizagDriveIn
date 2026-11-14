"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useScrollVideo } from "@/lib/useScrollVideo";

export default function BiryaniShowcase() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Smooth scroll video hook - scrubbing the banana-leaf reveal
  const { progress, isReducedMotion, hasError, activeSrc } = useScrollVideo({
    videoRef,
    triggerRef,
    scrollLength: "+=200%",
    desktopSrc: "/video/biryani-unwrap-scrub.mp4",
    mobileSrc: "/video/biryani-unwrap-scrub-720.mp4",
  });

  return (
    <div id="biryani-showcase" className="w-full bg-charcoal text-cream flex flex-col">
      {/* 1. Header nicely placed ABOVE the video with "Our Special Dish" */}
      <div className="w-full bg-charcoal text-center py-14 sm:py-16 md:py-20 px-6 border-t border-b border-cream/10 relative z-20">
        <span className="text-xs font-mono uppercase tracking-widest text-[#E00902] block mb-3">
          The Coastal Dum Ritual
        </span>
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream">
          Our Special <span className="italic font-normal text-[#E00902]">Dish</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base font-sans text-cream/70 max-w-xl mx-auto leading-relaxed">
          Slow-cooked dum biryani sealed inside fresh coastal banana leaves, locking in rich royal saffron, aged basmati aromas, and melt-in-mouth tender cuts.
        </p>
      </div>

      {/* 2. Full-Width Edge-to-Edge Video Canvas with NO border radius and NO text overlay on the video */}
      {isReducedMotion || hasError ? (
        <div className="relative w-full aspect-video sm:h-[55vh] md:h-screen overflow-hidden bg-black border-none rounded-none">
          <Image
            src="/video/biryani-unwrap-poster.webp"
            alt="Signature Banana Leaf Dum Biryani"
            fill
            priority
            className="object-contain md:object-cover object-center"
          />
        </div>
      ) : (
        <section
          ref={triggerRef}
          aria-label="Signature Banana Leaf Biryani Scroll Reveal"
          className="relative w-full aspect-video sm:h-[55vh] md:h-screen overflow-hidden bg-black select-none border-none rounded-none flex items-center justify-center"
        >
          {/* Edge-to-edge full-width video with NO border radius */}
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <video
              ref={videoRef}
              src={activeSrc}
              poster="/video/biryani-unwrap-poster.webp"
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-contain md:object-cover object-center"
            />
            {/* Subtle contrast tint */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </div>

          {/* Clean minimal bottom scrub progress bar (No gradients, solid red) */}
          <div
            className="absolute bottom-0 left-0 h-[3px] bg-[#E00902] z-30 transition-all duration-75 pointer-events-none"
            style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
            aria-hidden="true"
          />
        </section>
      )}
    </div>
  );
}
