"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useScrollVideo } from "@/lib/useScrollVideo";
import { HanddrawnUnderline } from "@/components/ui/HanddrawnDecorations";

export default function BiryaniShowcase() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Smooth scroll video hook - scrubbing the banana-leaf reveal
  const { progress, isReducedMotion, hasError, activeSrc } = useScrollVideo({
    videoRef,
    triggerRef,
    scrollLength: "+=180%",
    damping: 0.2,
    desktopSrc: "/video/newBananaLeaf.mp4",
    mobileSrc: "/video/newBananaLeaf-720.mp4",
  });

  return (
    <div id="biryani-showcase" className="w-full bg-charcoal text-cream flex flex-col">
      {/* 1. Header nicely placed ABOVE the video with "Our Special Dish" */}
      <div className="w-full bg-charcoal text-center py-14 sm:py-16 md:py-20 px-6 relative z-20">
        <span className="text-sm sm:text-base font-bakso tracking-wider text-[#D91A2A] block mb-2">
          The Coastal Dum Ritual
        </span>
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream">
          Our Special{" "}
          <HanddrawnUnderline color="red">
            <span className="italic font-normal text-[#D91A2A]">Dish</span>
          </HanddrawnUnderline>
        </h2>
        <p className="mt-3 text-sm sm:text-base font-sans text-cream/70 max-w-xl mx-auto leading-relaxed">
          Slow-cooked dum biryani sealed inside fresh coastal banana leaves, locking in rich royal saffron, aged basmati aromas, and melt-in-mouth tender cuts.
        </p>
      </div>

      {/* 2. Full-Width Edge-to-Edge Video Canvas with NO border radius and NO text overlay on the video */}
      {isReducedMotion || hasError ? (
        <div className="relative w-full h-screen overflow-hidden bg-black border-none rounded-none">
          <Image
            src="/video/biryani-unwrap-poster.webp"
            alt="Signature Banana Leaf Dum Biryani"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      ) : (
        <section
          ref={triggerRef}
          aria-label="Signature Banana Leaf Biryani Scroll Reveal"
          className="relative w-full h-screen overflow-hidden bg-black select-none"
        >
          {/* Edge-to-edge full-width video with NO border radius */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <video
              ref={videoRef}
              src={activeSrc}
              poster="/video/biryani-unwrap-poster.webp"
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle contrast tint */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          </div>
        </section>
      )}
    </div>
  );
}
