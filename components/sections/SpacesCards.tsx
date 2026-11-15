"use client";

import React, { useState } from "react";
import Image from "next/image";
import WavyDivider from "@/components/ui/WavyDivider";

interface SpaceCard {
  id: string;
  image: string;
  alt: string;
}

const CARDS: SpaceCard[] = [
  {
    id: "indoor",
    image: "/indoorr.png",
    alt: "Indoor AC Lounge & Dining",
  },
  {
    id: "snooker",
    image: "/Snooker.png",
    alt: "Snooker & 8-Ball Pool Arena",
  },
  {
    id: "town",
    image: "/town.png",
    alt: "Shakes Town Dessert Promenade",
  },
];

export default function SpacesCards() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  React.useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="spaces"
      aria-label="Vizag Drive In Experience Spaces"
      className="relative w-full bg-[#8E171E] overflow-hidden"
    >
      {/* Top Organic Wave Curve - Transition from previous section */}
      <WavyDivider position="top" waveColor="#8E171E" bgColor="#14110f" />

      {/* Aesthetic Floating Cultural Stickers */}
      {/* Sticker 1: Red & White Coastal Lighthouse (Top Left corner of section) */}
      <div className="absolute top-10 left-4 sm:left-10 lg:left-16 pointer-events-none z-20 select-none hidden sm:block">
        <Image
          src="/stickers/Red and White Coastal Lighthouse.png"
          alt=""
          width={110}
          height={110}
          className="w-20 md:w-24 lg:w-28 h-auto drop-shadow-2xl transform -rotate-12 opacity-95 transition-transform duration-300 hover:rotate-0"
        />
      </div>

      {/* Sticker 2: Lush Coffee Branch (Top Right corner of card 3) */}
      <div className="absolute top-8 right-4 sm:right-10 lg:right-16 pointer-events-none z-20 select-none hidden sm:block">
        <Image
          src="/stickers/Lush Coffee Branch with Ripe Cherries.png"
          alt=""
          width={100}
          height={100}
          className="w-18 md:w-22 lg:w-26 h-auto drop-shadow-2xl transform rotate-12 opacity-95 transition-transform duration-300 hover:rotate-0"
        />
      </div>

      {/* Sticker 3: TU-142 Aircraft (Bottom Center floating between cards) */}
      <div className="absolute bottom-12 right-1/4 pointer-events-none z-20 select-none hidden lg:block">
        <Image
          src="/stickers/TU-142 Aircraft Museum Exhibit.png"
          alt=""
          width={110}
          height={110}
          className="w-22 lg:w-26 h-auto drop-shadow-2xl transform -rotate-6 opacity-90"
        />
      </div>

      {/* Main 3-Card Interactive Stage */}
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-16 sm:py-20 md:py-28 relative z-10">
        <div
          className="flex flex-col sm:flex-row items-stretch justify-center gap-4 sm:gap-6 md:gap-8 w-full max-w-6xl mx-auto h-[780px] sm:h-[480px] md:h-[560px] lg:h-[640px]"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {CARDS.map((card, idx) => {
            // Flexible width calculation on desktop/tablet:
            // When one card is hovered:
            // - The hovered card expands to flex-[1.9]
            // - Non-hovered cards shrink to flex-[0.55]
            // Total flex: 1.9 + 0.55 + 0.55 = 3.0 (Conservatively preserves 100% total container width)
            // When none hovered: all 3 cards equal flex-1
            const isHovered = hoveredIdx === idx;
            const hasHover = hoveredIdx !== null;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                className="group relative flex-1 min-h-[240px] sm:min-h-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[flex,transform] h-full rounded-[40px] sm:rounded-[60px] md:rounded-[80px] lg:rounded-[90px] overflow-hidden cursor-pointer shadow-2xl border-2 border-white/10"
                style={{
                  flex: isDesktop
                    ? hasHover
                      ? isHovered
                        ? 1.85
                        : 0.575
                      : 1
                    : undefined,
                  transform: isHovered ? "scale(1.015)" : "scale(1)",
                }}
              >
                {/* Image fills card completely with rounded arch mask */}
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  priority={idx === 0}
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 30vw"
                />

                {/* Subtle vignette gloss matching reference 4 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Organic Wave Curve - Seamless transition into subsequent section */}
      <WavyDivider position="bottom" waveColor="#8E171E" bgColor="#14110f" />
    </section>
  );
}
