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
      {/* 1. Desktop Header placed nicely ABOVE the video */}
      <div className="hidden md:block w-full bg-charcoal text-center py-16 md:py-20 px-6 relative z-20">
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

      {/* 2. Full-Width Edge-to-Edge Video Canvas with uncropped mobile framing */}
      {isReducedMotion || hasError ? (
        <div className="relative w-full h-screen overflow-hidden bg-black border-none rounded-none">
          {/* Mobile Overlay Header occupying the top empty space */}
          <div className="absolute top-0 left-0 right-0 z-30 pt-8 px-6 text-center pointer-events-none md:hidden flex flex-col items-center">
            <span className="text-xs font-bakso tracking-wider text-[#D91A2A] block mb-1 drop-shadow">
              Traditional Coastal Dining // The Ritual
            </span>
            <h2 className="font-display text-2xl font-bold tracking-tight text-cream drop-shadow">
              The Banana Leaf{" "}
              <HanddrawnUnderline color="red">
                <span className="italic font-normal text-[#D91A2A]">Feast</span>
              </HanddrawnUnderline>
            </h2>
          </div>

          <Image
            src="/video/newvedio-poster.webp"
            alt="Authentic Banana Leaf Feast"
            fill
            priority
            className="object-contain md:object-cover object-center"
          />
        </div>
      ) : (
        <section
          ref={triggerRef}
          aria-label="Authentic Banana Leaf Feast Scroll Presentation"
          className="relative w-full h-screen overflow-hidden bg-black select-none"
        >
          {/* Mobile Overlay Header (Occupies the top space seamlessly) */}
          <div className="absolute top-0 left-0 right-0 z-30 pt-10 px-6 text-center pointer-events-none md:hidden flex flex-col items-center">
            <span className="text-xs font-bakso tracking-wider text-[#D91A2A] block mb-1.5 drop-shadow">
              Traditional Coastal Dining // The Ritual
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-cream drop-shadow-md">
              The Banana Leaf{" "}
              <HanddrawnUnderline color="red">
                <span className="italic font-normal text-[#D91A2A]">Feast</span>
              </HanddrawnUnderline>
            </h2>
            <p className="mt-2 text-xs sm:text-sm font-sans text-cream/75 max-w-xs mx-auto leading-relaxed drop-shadow">
              Delicacies served traditionally on fresh plantation banana leaves.
            </p>
          </div>

          {/* Mobile Bottom Scroll Hint (Occupies the bottom space seamlessly) */}
          <div className="absolute bottom-6 left-0 right-0 z-30 text-center pointer-events-none md:hidden">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cream/60 bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
              Scroll to Explore ↓
            </span>
          </div>

          {/* Edge-to-edge full-width video with uncropped mobile framing */}
          <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
            {/* Ambient blurred backdrop on mobile so food colors fill edges */}
            <video
              src={activeSrc}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center blur-2xl opacity-40 scale-110 pointer-events-none md:hidden"
            />
            {/* Main crisp video (object-contain on mobile, object-cover on desktop) */}
            <video
              ref={videoRef}
              src={activeSrc}
              poster="/video/newvedio-poster.webp"
              muted
              playsInline
              preload="auto"
              className="relative z-10 w-full h-full object-contain md:object-cover object-center"
            />
            {/* Subtle contrast tint */}
            <div className="absolute inset-0 bg-black/15 pointer-events-none z-20" />
          </div>
        </section>
      )}
    </div>
  );
}
