"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HanddrawnUnderline } from "@/components/ui/HanddrawnDecorations";

interface StatusInfo {
  isOpen: boolean;
  statusText: string;
  subText: string;
  currentTimeString: string;
}

const WORDS = [
  { text: "Visakhapatnam’s", isAccent: false },
  { text: "moonlit", isAccent: false },
  { text: "gathering", isAccent: false },
  { text: "ground", isAccent: false },
  { text: "where", isAccent: false },
  { text: "curated", isAccent: false },
  { text: "street", isAccent: false },
  { text: "feasts,", isAccent: false },
  { text: "lively", isAccent: false },
  { text: "box", isAccent: false },
  { text: "cricket", isAccent: false },
  { text: "clashes,", isAccent: false },
  { text: "and", isAccent: false },
  { text: "coastal", isAccent: false },
  { text: "night", isAccent: false },
  { text: "breezes", isAccent: false },
  { text: "converge.", isAccent: true },
];

export default function IntroStrip() {
  const [status, setStatus] = useState<StatusInfo>({
    isOpen: true,
    statusText: "Open Evenings",
    subText: "5:00 PM – Late",
    currentTimeString: "",
  });

  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const featuresRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const computeKolkataStatus = () => {
      try {
        const now = new Date();

        const timeFormatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        const hour24Formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
          weekday: "short",
        });

        const parts = hour24Formatter.formatToParts(now);
        const weekday = parts.find((p) => p.type === "weekday")?.value || "Fri";
        const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "18", 10);
        const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
        const currentMinutes = hour * 60 + minute;

        const isWeekendSession =
          weekday === "Fri" ||
          weekday === "Sat" ||
          (weekday === "Sat" && hour < 4) ||
          (weekday === "Sun" && hour < 4);

        const closingHour = isWeekendSession ? 2 : 1;
        const closingMinutes = closingHour * 60;

        let isOpen = false;
        let statusText = "Closed";
        let subText = "Opens at 5:00 PM";

        if (currentMinutes >= 17 * 60) {
          isOpen = true;
          statusText = "Open Now";
          subText = `Until ${closingHour}:00 AM`;
        } else if (currentMinutes < closingMinutes) {
          isOpen = true;
          statusText = "Open Now";
          subText = `Until ${closingHour}:00 AM`;
        } else {
          isOpen = false;
          statusText = "Closed";
          subText = "Opens today at 5:00 PM";
        }

        setStatus({
          isOpen,
          statusText,
          subText,
          currentTimeString: timeFormatter.format(now),
        });
      } catch (err) {
        console.error("Failed to compute Asia/Kolkata status:", err);
      }
    };

    computeKolkataStatus();
    const interval = setInterval(computeKolkataStatus, 60000);

    return () => clearInterval(interval);
  }, []);

  // Pinned scroll-scrub word coloring animation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      wordsRef.current.forEach((span, i) => {
        if (!span) return;
        span.style.color = WORDS[i].isAccent ? "#D91A2A" : "#F5F0E8";
        span.style.opacity = "1";
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.innerWidth < 768;
    const scrollDistance = isMobile ? window.innerHeight * 1.05 : window.innerHeight * 1.35;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      // Scrub through each word, illuminating it from dim to fully colored
      wordsRef.current.forEach((wordSpan, index) => {
        if (!wordSpan) return;
        const isAccent = WORDS[index].isAccent;

        tl.to(
          wordSpan,
          {
            color: isAccent ? "#D91A2A" : "#F5F0E8",
            opacity: 1,
            ease: "none",
            duration: 0.45,
          },
          index * 0.35
        );
      });

      // Feature tags brighten as text coloring completes
      if (featuresRef.current) {
        tl.fromTo(
          featuresRef.current,
          { opacity: 0.35, y: 8 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power1.out" },
          ">-0.4"
        );
      }
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const features = [
    "Open-air seating",
    "8+ food stalls",
    "Pool & Cricket",
    "Dedicated parking",
  ];

  return (
    <section
      ref={sectionRef}
      id="intro-strip"
      aria-label="Welcome and Experience Concept"
      className="relative z-20 w-full min-h-screen bg-[#14110f] text-cream flex flex-col justify-between py-12 sm:py-16 md:py-20 overflow-hidden select-none"
    >
      {/* Aesthetic Landmark Stickers (Used as-is, no borders/cards) */}
      <div className="absolute left-4 lg:left-12 top-28 pointer-events-none z-10 hidden md:block">
        <Image
          src="/stickers/Kailasagiri%20Shiva%20Monument%20Cutout.png"
          alt="Kailasagiri Shiva Monument"
          width={130}
          height={130}
          className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] -rotate-6 select-none opacity-90"
        />
      </div>
      <div className="absolute right-4 lg:right-12 bottom-24 pointer-events-none z-10 hidden md:block">
        <Image
          src="/stickers/Vizag%20Zoo%20Entrance%20Arch.png"
          alt="Vizag Zoo Entrance Arch"
          width={140}
          height={140}
          className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] rotate-6 select-none opacity-90"
        />
      </div>

      {/* Top Header: Real-time Open/Closed indicator */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <div className="flex items-center gap-2.5 text-xs font-mono tracking-wider">
          <span className="relative flex h-2 w-2">
            {status.isOpen ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
              </>
            ) : (
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D91A2A]" />
            )}
          </span>
          <span
            className={
              status.isOpen
                ? "text-teal font-semibold uppercase"
                : "text-[#D91A2A] font-semibold uppercase"
            }
          >
            {status.statusText}
          </span>
          <span className="text-cream/30">•</span>
          <span className="text-cream/70">{status.subText}</span>
          {status.currentTimeString && (
            <span className="text-cream/40 hidden sm:inline">
              ({status.currentTimeString} IST)
            </span>
          )}
        </div>
      </div>

      {/* Main Center Headline: Word-by-Word Scroll Color Reveal */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center max-w-5xl my-auto py-8">
        <p className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.3] md:leading-[1.25] tracking-tight max-w-4xl flex flex-wrap justify-center items-center">
          {WORDS.map((word, i) => (
            <span
              key={`${word.text}-${i}`}
              ref={(el) => {
                wordsRef.current[i] = el;
              }}
              style={{
                color: "rgba(243, 233, 220, 0.2)",
                opacity: 0.35,
              }}
              className="inline-block mr-[0.25em] will-change-[color,opacity]"
            >
              {word.isAccent ? (
                <HanddrawnUnderline color="red">
                  <span className="italic font-normal text-[#D91A2A]">{word.text}</span>
                </HanddrawnUnderline>
              ) : (
                word.text
              )}
            </span>
          ))}
        </p>
      </div>

      {/* Bottom Footer: Feature list + Minimal scrub progress line */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <div
          ref={featuresRef}
          className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm font-sans tracking-wide text-cream/75 transition-opacity"
        >
          {features.map((feat, i) => (
            <React.Fragment key={feat}>
              {i > 0 && <span className="text-[#E00902]/40">•</span>}
              <span>{feat}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
