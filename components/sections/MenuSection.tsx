"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  imageUrl: string;
}

const MENU_CATEGORIES = [
  "ALL",
  "BIRYANI & PULAV",
  "TANDOOR & GRILL",
  "TIFFINS & STREET",
  "SHAKES & DESSERTS",
];

const MENU_ITEMS: MenuItem[] = [
  {
    id: "potlam-biryani",
    name: "POTLAM DUM BIRYANI",
    category: "BIRYANI & PULAV",
    description: "Slow-steamed banana leaf parcel / aged basmati / royal saffron / tender meat",
    price: "₹280",
    imageUrl:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "malai-tikka",
    name: "GRILL CITI MALAI TIKKA",
    category: "TANDOOR & GRILL",
    description: "Charcoal smoked boneless chicken / cardamom malai / coriander mint chutney",
    price: "₹260",
    imageUrl:
      "https://images.unsplash.com/photo-1705359573325-f2006d5e459f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gongura-pulav",
    name: "GONGURA MUTTON PULAV",
    category: "BIRYANI & PULAV",
    description: "Tangy coastal sorrel leaves / seeraga samba rice / ghee roasted mutton cuts",
    price: "₹320",
    imageUrl:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "woodfired-pizza",
    name: "GUSTOSO MARGHERITA PIZZA",
    category: "TIFFINS & STREET",
    description: "San Marzano plum tomato / fresh buffalo mozzarella / sweet garden basil",
    price: "₹240",
    imageUrl:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ghee-idli",
    name: "MOOCHAM GHEE PODI IDLI",
    category: "TIFFINS & STREET",
    description: "Steamed fluffy idli button stack / fiery roasted gun-powder / pure country ghee",
    price: "₹90",
    imageUrl:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "dragon-chicken",
    name: "RED ROAST DRAGON CHICKEN",
    category: "TANDOOR & GRILL",
    description: "Crispy wok-tossed chicken slivers / dry red chillies / cashews / scallions",
    price: "₹210",
    imageUrl:
      "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "smoked-cheese-dog",
    name: "MR. WEENIE CHEESE DOG",
    category: "TIFFINS & STREET",
    description: "Flame-grilled frankfurter / melting sharp cheddar / sweet gherkin relish",
    price: "₹140",
    imageUrl:
      "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "belgian-shake",
    name: "BELGIAN CHOCO FREAKSHAKE",
    category: "SHAKES & DESSERTS",
    description: "Slow-churned dark Belgian chocolate / fudge brownie chunks / fresh whipped peaks",
    price: "₹160",
    imageUrl:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
  },
];

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [hoveredItem, setHoveredItem] = useState<MenuItem>(MENU_ITEMS[0]);

  const filteredItems =
    activeCategory === "ALL"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="menu-showcase"
      aria-label="The Vizag Drive In Curated Tasting Menu"
      className="relative w-full bg-[#E00902] text-cream overflow-hidden border-b border-cream/10 select-none"
    >
      {/* Top Header Block matching editorial reference poster */}
      <div className="w-full bg-[#f3e9dc] text-[#14110f] px-6 sm:px-12 pt-8 pb-4 border-b border-[#14110f]/10">
        <div className="container mx-auto max-w-6xl flex items-center justify-between text-xs font-mono tracking-widest uppercase">
          <span>THE VIZAG DRIVE IN // NIGHT FESTIVAL</span>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E00902] underline font-bold transition-colors"
          >
            RESERVE A TABLE ↗
          </a>
        </div>

        {/* Massive Typographic MENU Header */}
        <div className="container mx-auto max-w-6xl mt-4">
          <h2 className="font-display text-[22vw] sm:text-[18vw] md:text-[14vw] font-black leading-[0.8] tracking-tighter text-[#E00902] -mb-4 sm:-mb-6 md:-mb-8 uppercase">
            MENU
          </h2>
        </div>
      </div>

      {/* Main Red Menu Content Area */}
      <div className="container mx-auto max-w-6xl px-6 sm:px-12 py-12 md:py-20">
        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pb-8 border-b border-white/20 text-xs sm:text-sm font-mono tracking-wider">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`transition-all duration-200 uppercase py-1 ${
                  isActive
                    ? "text-white font-bold underline decoration-2 underline-offset-8"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {cat} ↗
              </button>
            );
          })}
        </div>

        {/* Menu Items List & Dynamic Hover Image Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 pt-10">
          {/* Menu Items List */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-white/15">
            {filteredItems.map((item) => {
              const isHovered = hoveredItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredItem(item)}
                  onClick={() => setHoveredItem(item)}
                  className={`group relative py-6 flex items-start gap-5 cursor-pointer transition-colors duration-200 ${
                    isHovered ? "bg-white/[0.06] -mx-4 px-4 rounded-2xl" : ""
                  }`}
                >
                  {/* Inline Thumbnail shown on hover (matching editorial reference) */}
                  <div
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-black/40 border border-white/30 transition-all duration-300 ${
                      isHovered
                        ? "opacity-100 scale-100 shadow-xl"
                        : "opacity-40 scale-90 sm:opacity-0 sm:w-0 sm:h-0 overflow-hidden"
                    }`}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Name and Description */}
                  <div className="flex-grow">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-lg sm:text-2xl font-bold tracking-tight text-white group-hover:translate-x-1 transition-transform duration-200">
                        {item.name}
                      </h3>
                      <span className="font-mono text-base sm:text-xl font-bold text-white whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                    <p className="mt-1 font-sans text-xs sm:text-sm text-white/75 leading-relaxed max-w-xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Featured Large Hover Image Display (matching 5th and 6th reference images) */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-center justify-start sticky top-28">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black">
              <Image
                src={hoveredItem.imageUrl}
                alt={hoveredItem.name}
                fill
                priority
                sizes="400px"
                className="object-cover transition-all duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            </div>

            <div className="mt-4 w-full p-4 rounded-2xl bg-white/10 border border-white/15 text-left">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-white/60 mb-1">
                Featured Selection
              </span>
              <h4 className="font-display text-lg font-bold text-white">
                {hoveredItem.name}
              </h4>
              <p className="mt-1 text-xs font-sans text-white/80">
                {hoveredItem.description}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs font-mono font-bold text-white pt-2 border-t border-white/15">
                <span>{hoveredItem.category}</span>
                <span className="text-base">{hoveredItem.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
