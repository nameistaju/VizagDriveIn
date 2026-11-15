"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stalls, FoodStall, stripTodo } from "@/data/stalls";
import { siteConfig } from "@/data/site";

export default function Stalls() {
  const [selectedStall, setSelectedStall] = useState<FoodStall | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  // Detect mobile vs desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Desktop ScrollTrigger Horizontal Scrub
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // On mobile or reduced motion, use natural touch-scroll without vertical pin-spacers
    if (window.innerWidth < 768 || prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    const bgText = bgTextRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 140);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: () => `+=${Math.max(1800, getDistance() * 0.85)}`,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });

      if (bgText) {
        gsap.to(bgText, {
          x: () => -getDistance() * 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.max(1800, getDistance() * 0.85)}`,
            scrub: 1.1,
            invalidateOnRefresh: true,
          },
        });
      }
    }, section);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [isMobile]);

  // Mobile horizontal scroll listener for updating active stall counter & progress
  const handleMobileScroll = useCallback(() => {
    if (!trackRef.current || !isMobile) return;
    const track = trackRef.current;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) return;
    const progress = Math.min(1, Math.max(0, track.scrollLeft / maxScroll));
    setScrollProgress(progress);
  }, [isMobile]);

  // Navigation button handler for both mobile & desktop
  const handleStepScroll = (direction: number) => {
    if (!trackRef.current) return;
    if (isMobile) {
      // On mobile, scroll track horizontally directly
      const itemWidth = 280;
      trackRef.current.scrollBy({ left: direction * itemWidth, behavior: "smooth" });
    } else {
      // On desktop, advance the page scroll
      const stepAmount = window.innerHeight * 0.6;
      window.scrollBy({ top: direction * stepAmount, behavior: "smooth" });
    }
  };

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedStall) {
        setSelectedStall(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedStall]);

  const activeIndex = Math.min(11, Math.max(1, Math.floor(scrollProgress * 11) + 1));

  return (
    <section
      ref={sectionRef}
      id="stalls"
      aria-label="The Vizag Drive In 3D Artisan Kiosks Promenade"
      className="relative z-10 w-full min-h-[560px] md:h-screen bg-[#14110f] text-cream overflow-hidden select-none flex flex-col justify-between pt-16 md:pt-24 pb-6 sm:pb-8"
    >
      {/* 1. Subtle Parallax Watermark Background Typography (Layer 1) */}
      <div
        ref={bgTextRef}
        aria-hidden="true"
        className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap pointer-events-none select-none text-[20vw] md:text-[16vw] font-display font-black leading-none text-white/[0.03] tracking-tighter uppercase z-0"
      >
        VIZAG DRIVE IN • 11 3D ARTISAN STALLS • NIGHT PROMENADE • FLAVORS OF VIZAG •
      </div>

      {/* 2. Top Header - Minimal & Aesthetic (Layer 2) */}
      <div className="relative z-10 w-full px-6 sm:px-12">
        <div className="container mx-auto flex items-end justify-between gap-4 border-b border-cream/10 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E00902] animate-pulse" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#E00902]">
                THE PROMENADE // 11 ARTISAN KIOSKS
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-cream">
              The <span className="italic font-normal text-[#E00902]">Stalls</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-6 text-xs font-mono tracking-wider text-cream/70">
            {/* Prev / Next navigation buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleStepScroll(-1)}
                aria-label="Previous Kiosk"
                className="w-8 h-8 rounded-lg bg-cream/10 hover:bg-[#E00902] text-cream hover:text-white flex items-center justify-center transition-colors font-bold text-sm"
              >
                ←
              </button>
              <button
                onClick={() => handleStepScroll(1)}
                aria-label="Next Kiosk"
                className="w-8 h-8 rounded-lg bg-cream/10 hover:bg-[#E00902] text-cream hover:text-white flex items-center justify-center transition-colors font-bold text-sm"
              >
                →
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[#E00902] font-bold text-sm">
                {String(activeIndex).padStart(2, "0")}
              </span>
              <span>/ 11</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Horizontal Promenade Track of Standalone 1:1 3D Stalls (Layer 3) */}
      <div className="relative z-10 w-full flex-grow flex items-center overflow-visible py-4 md:py-6">
        <div
          ref={trackRef}
          onScroll={handleMobileScroll}
          className="flex items-end gap-6 sm:gap-12 md:gap-24 px-6 sm:px-16 md:pl-16 md:pr-32 will-change-transform overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {stalls.map((stall) => {
            const cleanName = stripTodo(stall.name);
            const cleanCuisine = stripTodo(stall.cuisine);
            const cleanPrice = stripTodo(stall.priceRange);

            return (
              <div
                key={stall.id}
                onClick={() => setSelectedStall(stall)}
                className="group relative flex-none w-[240px] sm:w-[290px] md:w-[370px] lg:w-[400px] flex flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-2 snap-center"
              >
                {/* 3D Stall Container: Strict 1:1 Ratio with NO borders, NO card boxes, NO badges */}
                <div className="relative w-full aspect-square flex items-center justify-center">
                  {/* Standalone 1:1 3D Stall PNG (transparent background) */}
                  <div className="relative w-full h-full">
                    <Image
                      src={stall.image}
                      alt={`${cleanName} 3D Kiosk`}
                      fill
                      sizes="(max-width: 640px) 240px, (max-width: 1024px) 370px, 400px"
                      priority={stall.stallNumber === "01" || stall.stallNumber === "02"}
                      className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Ground Contact Shadow (grounds the 3D model in physical space) */}
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-3 w-[75%] h-5 bg-black/60 rounded-[100%] blur-md pointer-events-none group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Minimal Aesthetic Typography Below the Stall */}
                <div className="mt-4 w-full text-center sm:text-left flex flex-col items-center sm:items-start">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#E00902] tracking-widest">
                      #{stall.stallNumber}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-cream/30" />
                    <span className="font-mono text-[11px] tracking-wider uppercase text-cream/50 truncate max-w-[180px]">
                      {cleanCuisine}
                    </span>
                  </div>

                  <h3 className="mt-1 font-display text-lg sm:text-2xl font-bold tracking-tight text-cream group-hover:text-[#E00902] transition-colors duration-200">
                    {cleanName}
                  </h3>

                  <div className="mt-2 flex items-center gap-3 text-xs font-mono">
                    <span className="text-[#E00902] group-hover:underline font-semibold flex items-center gap-1">
                      <span>View Menu</span>
                      <span className="group-hover:translate-x-1 transition-transform">↗</span>
                    </span>
                    <span className="text-cream/40">•</span>
                    <span className="text-cream/50">{cleanPrice}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Horizontal Progress Bar & Jump Link (Layer 4) */}
      <div className="relative z-10 w-full px-6 sm:px-12">
        <div className="container mx-auto flex items-center justify-between gap-6 pt-3 border-t border-cream/10">
          {/* Scroll progress track */}
          <div className="flex-grow max-w-md h-[2px] bg-cream/15 overflow-hidden rounded-full">
            <div
              className="h-full bg-[#E00902] transition-all duration-75 ease-out"
              style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
            />
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-cream/40 hidden sm:inline">
              SWIPE OR USE ARROWS ➔
            </span>
            <a
              href="#menu-showcase"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-cream/10 hover:bg-[#E00902] text-cream hover:text-white transition-colors uppercase tracking-wider"
            >
              <span>Tasting Menu</span>
              <span>↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* 5. Minimal Stall Details Modal */}
      {selectedStall && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="stall-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedStall(null)}
        >
          <div
            className="relative w-full max-w-md bg-[#181412] border border-cream/20 rounded-3xl p-6 sm:p-8 text-cream shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedStall(null)}
              aria-label="Close modal"
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-cream/10 hover:bg-[#E00902] text-cream hover:text-white flex items-center justify-center transition-colors text-xs font-mono"
            >
              ✕
            </button>

            {/* Modal Stall 1:1 Image Preview */}
            <div className="relative w-48 h-48 mx-auto aspect-square">
              <Image
                src={selectedStall.image}
                alt={stripTodo(selectedStall.name)}
                fill
                sizes="192px"
                className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
              />
            </div>

            <div className="mt-4 text-center">
              <span className="text-xs font-mono text-[#E00902] tracking-widest uppercase">
                STALL #{selectedStall.stallNumber} • {stripTodo(selectedStall.cuisine)}
              </span>
              <h3
                id="stall-modal-title"
                className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight text-cream"
              >
                {stripTodo(selectedStall.name)}
              </h3>
              <p className="mt-2 text-xs sm:text-sm font-sans text-cream/70 leading-relaxed">
                {stripTodo(selectedStall.tagline)}
              </p>
            </div>

            <div className="mt-6 border-t border-cream/10 pt-4">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-cream/40 mb-2">
                Signature Specialties
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedStall.signatureDishes.map((dish, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-cream/5 border border-cream/10 text-xs font-sans text-cream/90"
                  >
                    {stripTodo(dish)}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-cream/10 flex items-center justify-between text-xs font-mono">
              <span className="text-cream/50">Avg: {stripTodo(selectedStall.priceRange)}</span>
              <a
                href={`${siteConfig.whatsappUrl}&text=Hi%2C%20I%20would%20like%20to%20order%20from%20${encodeURIComponent(
                  stripTodo(selectedStall.name)
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#E00902] text-white font-bold hover:bg-[#c20802] transition-colors"
              >
                Order on WhatsApp ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
