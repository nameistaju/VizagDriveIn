"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import StreetViewEmbed from "@/components/ui/StreetViewEmbed";
import { STREET_VIEWS } from "@/data/streetview";

type SeatingTab = "indoor" | "outdoor";

export default function Seating() {
  const [activeTab, setActiveTab] = useState<SeatingTab>("indoor");
  const tabRefs = useRef<{ [key in SeatingTab]?: HTMLButtonElement | null }>({});

  const tabs: {
    id: SeatingTab;
    label: string;
    viewKey: "indoor" | "outdoor";
    coverImage: string;
    icon: string;
  }[] = [
    {
      id: "indoor",
      label: "Indoor AC",
      viewKey: "indoor",
      coverImage: "/images/indoor.png",
      icon: "/icons/AcIcon.png",
    },
    {
      id: "outdoor",
      label: "Open-air seating",
      viewKey: "outdoor",
      coverImage: "/images/outdoor.png",
      icon: "/icons/outdoorIcon.png",
    },
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, currentId: SeatingTab) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const nextTab: SeatingTab = currentId === "indoor" ? "outdoor" : "indoor";
      setActiveTab(nextTab);
      tabRefs.current[nextTab]?.focus();
    }
  };

  const currentTabConfig = tabs.find((t) => t.id === activeTab)!;

  return (
    <section
      id="seating"
      aria-label="Dining Spaces: Indoor AC and Open-Air Seating"
      className="relative w-full bg-charcoal text-cream py-24 md:py-32 overflow-hidden border-b border-cream/10"
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream">
            Pick your <span className="italic font-normal text-[#E00902]">spot</span>
          </h2>
          <p className="mt-4 text-cream/70 font-sans text-base sm:text-lg leading-relaxed">
            Choose your preferred dining vibe. Step inside our panoramic views before you arrive.
          </p>

          {/* Tab Selector */}
          <div
            role="tablist"
            aria-label="Seating Spaces"
            onKeyDown={(e) => handleKeyDown(e, activeTab)}
            className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-cream/5 border border-cream/15 mt-8 backdrop-blur-md"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[tab.id] = el;
                  }}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2.5 px-6 sm:px-8 py-2.5 rounded-xl text-xs sm:text-sm font-sans tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E00902] ${
                    isActive
                      ? "bg-[#E00902] text-white font-bold scale-[1.01]"
                      : "text-cream/70 hover:text-cream hover:bg-cream/10"
                  }`}
                >
                  <div className="relative w-5 h-5 flex-shrink-0">
                    <Image
                      src={tab.icon}
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Panel displaying StreetViewEmbed with Cover Image */}
        <div
          role="tabpanel"
          id={`panel-${currentTabConfig.id}`}
          aria-labelledby={`tab-${currentTabConfig.id}`}
          className="w-full mt-4"
        >
          <div key={currentTabConfig.id} className="w-full animate-in fade-in duration-300">
            <StreetViewEmbed
              src={STREET_VIEWS[currentTabConfig.viewKey].src}
              label={STREET_VIEWS[currentTabConfig.viewKey].label}
              coverImage={currentTabConfig.coverImage}
              title={`360 degree panoramic street view of ${currentTabConfig.label}`}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
