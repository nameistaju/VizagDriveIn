"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { HanddrawnUnderline } from "@/components/ui/HanddrawnDecorations";

export interface LovedDish {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  accentColor: string;
  glowColor: string;
  bgGradient: string;
}

const MOST_LOVED_DISHES: LovedDish[] = [
  {
    id: "chicken-biryani",
    name: "Chicken Biryani Platter",
    category: "CUSTOMER FAVOURITE",
    description:
      "Fragrant dum-cooked rice, tender chicken and flavours worth coming back for.",
    image: "/food/Chicken Biryani Platter with Raita.png",
    accentColor: "#D91A2A",
    glowColor: "rgba(217, 26, 42, 0.45)",
    bgGradient: "radial-gradient(ellipse at 70% 50%, rgba(217, 26, 42, 0.22) 0%, rgba(20, 17, 15, 0.98) 70%)",
  },
  {
    id: "crispy-idli-bites",
    name: "Crispy Idli Bites",
    category: "BESTSELLER",
    description:
      "Golden-crisped bite-sized idlis tossed in aromatic spices, served with fresh coconut chutney.",
    image: "/food/Crispy Idli Bites with Chutneys.png",
    accentColor: "#1A6FBF",
    glowColor: "rgba(26, 111, 191, 0.45)",
    bgGradient: "radial-gradient(ellipse at 70% 50%, rgba(26, 111, 191, 0.22) 0%, rgba(20, 17, 15, 0.98) 70%)",
  },
  {
    id: "flaky-parotta",
    name: "Flaky Malabar Parotta",
    category: "CHEF'S SPECIAL",
    description:
      "Layered, buttery hot parottas paired with slow-simmered coastal chicken curry.",
    image: "/food/Flaky Parotta with Chicken Curry and Onions.png",
    accentColor: "#D97706",
    glowColor: "rgba(217, 119, 6, 0.45)",
    bgGradient: "radial-gradient(ellipse at 70% 50%, rgba(217, 119, 6, 0.22) 0%, rgba(20, 17, 15, 0.98) 70%)",
  },
  {
    id: "golden-fritters",
    name: "Golden Punugulu & Fritters",
    category: "STREET CLASSIC",
    description:
      "Crispy street-style fritters freshly fried, served with spicy ginger and tangy peanut chutneys.",
    image: "/food/Golden Fritter Platter with Chutneys.png",
    accentColor: "#EAB308",
    glowColor: "rgba(234, 179, 8, 0.45)",
    bgGradient: "radial-gradient(ellipse at 70% 50%, rgba(234, 179, 8, 0.2) 0%, rgba(20, 17, 15, 0.98) 70%)",
  },
  {
    id: "golden-puri-thali",
    name: "Golden Puri Thali",
    category: "MORNING TO MIDNIGHT",
    description:
      "Puffed, golden hot puris accompanied by rich potato masala and coastal condiments.",
    image: "/food/Golden Puri Thali with Curries and Chutney.png",
    accentColor: "#D91A2A",
    glowColor: "rgba(217, 26, 42, 0.4)",
    bgGradient: "radial-gradient(ellipse at 70% 50%, rgba(217, 26, 42, 0.2) 0%, rgba(20, 17, 15, 0.98) 70%)",
  },
  {
    id: "chicken-shawarma",
    name: "Grilled Chicken Shawarma",
    category: "LATE NIGHT CRAVING",
    description:
      "Spiced rotisserie chicken, pickled veggies and garlic toum wrapped in warm khubz.",
    image: "/food/Grilled Chicken Shawarma Wraps.png",
    accentColor: "#1A6FBF",
    glowColor: "rgba(26, 111, 191, 0.4)",
    bgGradient: "radial-gradient(ellipse at 70% 50%, rgba(26, 111, 191, 0.2) 0%, rgba(20, 17, 15, 0.98) 70%)",
  },
  {
    id: "spicy-crispy-chicken",
    name: "Andhra Crispy Chicken",
    category: "SPICY SIGNATURE",
    description:
      "Tender chicken morsels deep-fried with fiery Andhra chillies and crispy curry leaves.",
    image: "/food/Spicy Crispy Chicken with Curry Leaves.png",
    accentColor: "#D91A2A",
    glowColor: "rgba(217, 26, 42, 0.5)",
    bgGradient: "radial-gradient(ellipse at 70% 50%, rgba(217, 26, 42, 0.25) 0%, rgba(20, 17, 15, 0.98) 70%)",
  },
  {
    id: "spicy-podi-idli",
    name: "Spicy Ghee Podi Idli",
    category: "SOUTHERN ICON",
    description:
      "Steamed soft idlis generously drenched in pure country ghee and fiery gunpowder podi.",
    image: "/food/Spicy Podi Idli Thali with Chutneys.png",
    accentColor: "#D97706",
    glowColor: "rgba(217, 119, 6, 0.4)",
    bgGradient: "radial-gradient(ellipse at 70% 50%, rgba(217, 119, 6, 0.2) 0%, rgba(20, 17, 15, 0.98) 70%)",
  },
  {
    id: "cheese-pizza",
    name: "Fire-Baked Cheese Pizza",
    category: "CROWD PLEASER",
    description:
      "Hand-stretched crust loaded with molten mozzarella, herb tomato sauce, and charred edges.",
    image: "/food/Stretchy Cheese Pizza Slice.png",
    accentColor: "#D91A2A",
    glowColor: "rgba(217, 26, 42, 0.45)",
    bgGradient: "radial-gradient(ellipse at 70% 50%, rgba(217, 26, 42, 0.22) 0%, rgba(20, 17, 15, 0.98) 70%)",
  },
  {
    id: "freakshakes-trio",
    name: "Trio of Decadent Freakshakes",
    category: "SWEET FINALE",
    description:
      "Thick hand-spun milkshakes piled high with brownies, waffle crisps, and whipped cream.",
    image: "/food/Trio of Decadent Freakshakes.png",
    accentColor: "#1A6FBF",
    glowColor: "rgba(26, 111, 191, 0.45)",
    bgGradient: "radial-gradient(ellipse at 70% 50%, rgba(26, 111, 191, 0.22) 0%, rgba(20, 17, 15, 0.98) 70%)",
  },
];

/**
 * Sunburst Radial Ray Background Generator
 * Recreates the energetic radial ray focal burst from the reference image,
 * dynamically styled to the dish's palette with soft diffused vignette.
 */
function SunburstRays({ color }: { color: string }) {
  // Pre-calculated 24 ray wedges radiating outward from center (500, 500)
  const rayAngles = Array.from({ length: 24 }, (_, i) => i * 15);

  return (
    <svg
      viewBox="0 0 1000 1000"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen transition-opacity duration-1000"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="rayMaskGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="25%" stopColor="#fff" stopOpacity="0.8" />
          <stop offset="85%" stopColor="#fff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="rayMask">
          <rect width="1000" height="1000" fill="url(#rayMaskGrad)" />
        </mask>
      </defs>

      <g mask="url(#rayMask)">
        {rayAngles.map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const radNext = ((angle + 7.5) * Math.PI) / 180;
          const r = 700;
          const x1 = 500;
          const y1 = 500;
          const x2 = 500 + r * Math.cos(rad);
          const y2 = 500 + r * Math.sin(rad);
          const x3 = 500 + r * Math.cos(radNext);
          const y3 = 500 + r * Math.sin(radNext);

          return (
            <polygon
              key={angle}
              points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
              fill={color}
              className="transition-colors duration-1000"
            />
          );
        })}
      </g>
    </svg>
  );
}

export default function MostLovedDishes() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [displayDish, setDisplayDish] = useState(MOST_LOVED_DISHES[0]);

  const activeDish = MOST_LOVED_DISHES[activeIdx];

  const handleSelectDish = (idx: number) => {
    if (idx === activeIdx || animating) return;
    setAnimating(true);
    setActiveIdx(idx);

    // Smooth cinematic crossfade: exit 300ms, update, enter 700ms
    setTimeout(() => {
      setDisplayDish(MOST_LOVED_DISHES[idx]);
      setAnimating(false);
    }, 280);
  };

  return (
    <section
      id="most-loved"
      aria-label="Most Loved Dishes Showcase"
      className="relative w-full min-h-[750px] lg:min-h-[820px] bg-charcoal text-cream overflow-hidden py-16 sm:py-20 md:py-24 select-none flex flex-col justify-between"
      style={{
        background: displayDish.bgGradient,
        transition: "background 1000ms ease-out",
      }}
    >
      {/* 1. Cinematic Radiant Sunburst Background (Inspired by reference burst image) */}
      <SunburstRays color={displayDish.accentColor} />

      {/* 2. Soft Ambient Radial Lighting behind Food */}
      <div
        className="absolute right-0 lg:right-[15%] top-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] lg:w-[650px] h-[340px] sm:h-[500px] lg:h-[650px] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: displayDish.glowColor,
        }}
      />

      {/* 3. Subtle Film Grain & Warm Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/80 pointer-events-none" />

      {/* 4. Main Stage Composition: Left Info + Right Hero Food */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT SIDE: Dish Information */}
          <div
            className={`lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-350 ease-out ${
              animating
                ? "opacity-0 translate-y-3"
                : "opacity-100 translate-y-0"
            }`}
          >
            {/* Eyebrow Label: MOST LOVED */}
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-scarlet animate-ping" />
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-scarlet font-semibold">
                MOST LOVED
              </span>
            </div>

            {/* Category Tag */}
            <span
              className="inline-block text-xs font-mono font-bold tracking-widest px-3 py-1 rounded-full mb-4 border transition-colors duration-500 uppercase"
              style={{
                borderColor: `${displayDish.accentColor}60`,
                backgroundColor: `${displayDish.accentColor}18`,
                color: displayDish.accentColor,
              }}
            >
              {displayDish.category}
            </span>

            {/* Large Dish Name with Bold New Kansas Typography */}
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-cream leading-[1.1] mb-5">
              <HanddrawnUnderline color="red">
                <span>{displayDish.name}</span>
              </HanddrawnUnderline>
            </h3>

            {/* Appetising Description */}
            <p className="font-sans text-cream/75 text-base sm:text-lg leading-relaxed max-w-md mb-8">
              {displayDish.description}
            </p>

            {/* Minimal CTA Buttons */}
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-scarlet hover:bg-[#b01320] text-white font-medium text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-xl shadow-scarlet/25 hover:scale-105 active:scale-95"
              >
                Order Now ↗
              </a>
              <a
                href="#menu-showcase"
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-cream border border-white/15 font-medium text-xs sm:text-sm uppercase tracking-widest transition-colors duration-300"
              >
                Explore Menu
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: Large Hero Food Image (45-55% width, floating depth) */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[320px] sm:min-h-[440px] lg:min-h-[540px]">
            <div
              className={`relative w-full max-w-[340px] sm:max-w-[480px] lg:max-w-[560px] aspect-square transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                animating
                  ? "opacity-0 scale-90 -translate-y-2"
                  : "opacity-100 scale-100 translate-y-0"
              }`}
            >
              {/* Natural Ambient Contact Shadow Underneath */}
              <div
                aria-hidden="true"
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-12 rounded-[50%] blur-2xl pointer-events-none transition-all duration-700"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                }}
              />

              {/* Floating Hero Food Image */}
              <div className="relative w-full h-full animate-food-float drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)]">
                <Image
                  src={displayDish.image}
                  alt={displayDish.name}
                  fill
                  priority
                  className="object-contain object-center"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 45vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. DISH NAVIGATION: Circular Dish Thumbnails Row at Bottom */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-4 relative z-20">
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-cream/40 mb-3 block">
            SELECT DISH ({activeIdx + 1} / {MOST_LOVED_DISHES.length})
          </span>

          {/* Horizontally scrollable on mobile, centered on desktop */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-5 overflow-x-auto max-w-full pb-2 px-2 no-scrollbar">
            {MOST_LOVED_DISHES.map((dish, idx) => {
              const isSelected = activeIdx === idx;

              return (
                <button
                  key={dish.id}
                  onClick={() => handleSelectDish(idx)}
                  aria-label={`Select ${dish.name}`}
                  className={`group relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden transition-all duration-300 ease-out focus:outline-none ${
                    isSelected
                      ? "ring-2 sm:ring-4 ring-white shadow-2xl scale-110 sm:scale-115"
                      : "ring-1 ring-white/20 opacity-60 hover:opacity-100 hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: isSelected
                      ? `${dish.accentColor}30`
                      : "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-contain p-1 transition-transform duration-300 group-hover:scale-110"
                    sizes="64px"
                  />
                  {isSelected && (
                    <span
                      className="absolute inset-0 rounded-full border-2 pointer-events-none"
                      style={{ borderColor: dish.accentColor }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
