"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useScrollVideo } from "@/lib/useScrollVideo";
import { HanddrawnUnderline } from "@/components/ui/HanddrawnDecorations";

export default function LeafFeastShowcase() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Smooth scroll video hook - scrubbing the fresh leaf dining presentation
  const { progress, isReducedMotion, hasError, activeSrc } = useScrollVideo({
    videoRef,
    triggerRef,
    scrollLength: "+=180%",
    damping: 0.2,
    desktopSrc: "/video/newvedio.mp4",
    mobileSrc: "/video/newvedio-720.mp4",
  });

  return (
    <div id="leaf-feast-showcase" className="w-full bg-charcoal text-cream flex flex-col">
      {/* 1. Header placed nicely ABOVE the video */}
      <div className="w-full bg-charcoal text-center py-14 sm:py-16 md:py-20 px-6 relative z-20">
        {/* Aesthetic Ananthagiri Hills Waterfall Sticker */}
        <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 pointer-events-none z-10 hidden md:block">
          <Image
            src="/stickers/Ananthagiri%20Hills%20Waterfall%20Diorama.png"
            alt="Ananthagiri Hills Waterfall"
            width={125}
            height={125}
            className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] rotate-6 select-none opacity-90"
          />
        </div>

        <span className="text-sm sm:text-base font-bakso tracking-wider text-[#D91A2A] block mb-2">
          Traditional Coastal Dining // The Ritual
        </span>
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream">
          The Banana Leaf{" "}
          <HanddrawnUnderline color="red">
            <span className="italic font-normal text-[#D91A2A]">Feast</span>
          </HanddrawnUnderline>
        </h2>
        <p className="mt-3 text-sm sm:text-base font-sans text-cream/70 max-w-xl mx-auto leading-relaxed">
          Spiced coastal delicacies and steaming hot pulavs served traditionally on fresh plantation banana leaves under the open coastal night sky.
        </p>
      </div>

      {/* 2. Full-Width Edge-to-Edge Video Canvas with NO border radius */}
      {isReducedMotion || hasError ? (
        <div className="relative w-full h-screen overflow-hidden bg-black border-none rounded-none">
          <Image
            src="/video/newvedio-poster.webp"
            alt="Authentic Banana Leaf Feast"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      ) : (
        <section
          ref={triggerRef}
          aria-label="Authentic Banana Leaf Feast Scroll Presentation"
          className="relative w-full h-screen overflow-hidden bg-black select-none"
        >
          {/* Edge-to-edge full-width video with NO border radius */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <video
              ref={videoRef}
              src={activeSrc}
              poster="/video/newvedio-poster.webp"
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
