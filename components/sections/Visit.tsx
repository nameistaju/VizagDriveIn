"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site";

export default function Visit() {
  return (
    <section
      id="visit"
      aria-label="Plan Your Visit & Directions"
      className="relative w-full bg-charcoal text-cream py-24 md:py-32 overflow-hidden border-b border-cream/10"
    >
      {/* Aesthetic Simhachalam Gopuram Sticker */}
      <div className="absolute left-6 lg:left-14 top-24 pointer-events-none z-10 hidden md:block">
        <Image
          src="/stickers/Simhachalam-Style%20Blue%20and%20Golden%20Gopuram.png"
          alt="Simhachalam Gopuram"
          width={130}
          height={130}
          className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] -rotate-6 select-none opacity-90"
        />
      </div>

      {/* Aesthetic INS Kurusura Submarine Museum Sticker */}
      <div className="absolute right-6 lg:right-14 top-24 pointer-events-none z-10 hidden md:block">
        <Image
          src="/stickers/INS%20Kurusura%20Submarine%20Museum%20Cutout.png"
          alt="INS Kurusura Submarine Museum"
          width={150}
          height={150}
          className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] rotate-6 select-none opacity-90"
        />
      </div>

      {/* Aesthetic Brick Stupa Ruins Sticker */}
      <div className="absolute right-8 lg:right-16 bottom-20 pointer-events-none z-10 hidden md:block">
        <Image
          src="/stickers/Brick%20Stupa%20Ruins%20with%20Buddha%20Statue.png"
          alt="Thotlakonda Stupa Ruins"
          width={135}
          height={135}
          className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] -rotate-3 select-none opacity-90"
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream">
            Plan Your <span className="italic font-normal text-[#E00902]">Evening</span>
          </h2>
          <p className="mt-4 text-cream/70 font-sans text-base sm:text-lg leading-relaxed">
            Conveniently located in Visakhapatnam with dedicated vehicle drive-in and parking.
            Open late every night.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Location & Directions */}
          <div className="p-8 rounded-3xl bg-cream/[0.03] border border-cream/15 hover:border-[#E00902]/40 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Clean 1:1 Icon (No extra container around it) */}
              <div className="relative w-16 h-16 mb-5 flex-shrink-0">
                <Image
                  src="/icons/mapIcon.png"
                  alt="Location Icon"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-display text-xl font-bold text-cream mb-2">
                Location & Map
              </h3>
              <p className="text-xs font-mono text-cream/50 mb-3">
                {siteConfig.address}
              </p>
              <p className="text-sm font-sans text-cream/75 leading-relaxed">
                Central Visakhapatnam location with easy access from major coastal arterial routes.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-cream/10">
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#E00902] hover:text-[#E00902]/80 transition-colors"
              >
                <span>Open in Google Maps</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Card 2: Operating Hours */}
          <div className="p-8 rounded-3xl bg-cream/[0.03] border border-cream/15 hover:border-teal/40 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Clean 1:1 Icon */}
              <div className="relative w-16 h-16 mb-5 flex-shrink-0">
                <Image
                  src="/icons/timeIcon.png"
                  alt="Operating Hours Icon"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-display text-xl font-bold text-cream mb-2">
                Night Hours
              </h3>
              <div className="space-y-2.5 text-xs font-mono text-cream/70 mb-3">
                <div className="flex justify-between py-1 border-b border-cream/5">
                  <span>Mon – Thu:</span>
                  <span className="text-cream font-medium">
                    {siteConfig.timings.weekdays}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-cream/5">
                  <span>Fri – Sun:</span>
                  <span className="text-[#E00902] font-medium">
                    {siteConfig.timings.weekends}
                  </span>
                </div>
              </div>
              <p className="text-xs font-sans text-cream/50">
                {siteConfig.timings.note}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-cream/10">
              <span className="text-xs font-mono text-teal uppercase tracking-wider">
                Open 7 Days a Week
              </span>
            </div>
          </div>

          {/* Card 3: Parking & WhatsApp */}
          <div className="p-8 rounded-3xl bg-cream/[0.03] border border-cream/15 hover:border-[#E00902]/40 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Clean 1:1 Icon */}
              <div className="relative w-16 h-16 mb-5 flex-shrink-0">
                <Image
                  src="/icons/parkingIcon.png"
                  alt="Parking & Entry Icon"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-display text-xl font-bold text-cream mb-2">
                Parking & Entry
              </h3>
              <p className="text-sm font-sans text-cream/75 leading-relaxed mb-4">
                {siteConfig.parkingNote}
              </p>
              <p className="text-xs font-mono text-cream/50">
                Contact: {siteConfig.phone}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-cream/10">
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#E00902] hover:bg-[#c20802] text-white font-semibold text-xs uppercase tracking-wider transition-colors"
              >
                <span>WhatsApp Desk</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Arrival Card Banner with Animated Arrival GIF - Solid background, NO gradients */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#181412] border border-cream/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
              <Image
                src="/images/arrival.gif"
                alt="The Vizag Drive In Arrival"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
            <div>
              <h4 className="font-display text-2xl sm:text-3xl font-bold text-cream">
                See You Tonight
              </h4>
              <p className="text-xs sm:text-sm text-cream/65 font-sans mt-1">
                Visakhapatnam’s moonlit street food festival and play arena.
              </p>
            </div>
          </div>

          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-xl bg-[#E00902] hover:bg-[#c20802] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-colors whitespace-nowrap"
          >
            Reserve Table or Slot ↗
          </a>
        </div>
      </div>
    </section>
  );
}
