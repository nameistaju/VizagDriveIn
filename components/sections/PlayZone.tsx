"use client";

import React from "react";
import Image from "next/image";
import StreetViewEmbed from "@/components/ui/StreetViewEmbed";
import { STREET_VIEWS } from "@/data/streetview";
import { HanddrawnUnderline } from "@/components/ui/HanddrawnDecorations";

export default function PlayZone() {
  const poolWhatsappUrl = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(
    "Hi, I'd like to book 8-ball pool"
  )}`;

  const cricketWhatsappUrl = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(
    "Hi, I'd like to book box cricket"
  )}`;

  return (
    <section
      id="play-zone"
      aria-label="Play Zone: 8-Ball Pool & Cricket Box"
      className="relative w-full bg-charcoal text-cream py-24 md:py-32 overflow-hidden border-b border-cream/10"
    >
      {/* Aesthetic TU-142 Aircraft Museum Sticker */}
      <div className="absolute right-6 lg:right-16 top-16 pointer-events-none z-10 hidden md:block">
        <Image
          src="/stickers/TU-142%20Aircraft%20Museum%20Exhibit.png"
          alt="TU-142 Aircraft Museum"
          width={150}
          height={150}
          className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] -rotate-6 select-none opacity-90"
        />
      </div>

      {/* Aesthetic Kambalakonda Wildlife Sanctuary Sticker */}
      <div className="absolute left-6 lg:left-12 bottom-12 pointer-events-none z-10 hidden md:block">
        <Image
          src="/stickers/Kambalakonda%20Wildlife%20Sanctuary%20Diorama.png"
          alt="Kambalakonda Wildlife Sanctuary"
          width={135}
          height={135}
          className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] rotate-6 select-none opacity-90"
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-cream">
            The Play{" "}
            <HanddrawnUnderline color="teal">
              <span className="italic font-normal text-teal">Zone</span>
            </HanddrawnUnderline>
          </h2>
          <p className="mt-3 text-cream/70 font-sans text-base sm:text-lg leading-relaxed">
            Take a break between courses or bring your crew for competitive night matches.
          </p>
        </div>

        {/* Two Clean Cards Side-by-Side (Minimal: Media + Title + WhatsApp CTA) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {/* Card 1: 8-Ball Pool */}
          <div className="group relative flex flex-col justify-between rounded-3xl bg-cream/[0.03] hover:bg-cream/[0.06] border border-cream/15 hover:border-[#E00902]/50 transition-all duration-300 p-6 sm:p-7">
            <div>
              <StreetViewEmbed
                src={STREET_VIEWS.pool.src}
                label={STREET_VIEWS.pool.label}
                coverImage="/images/8ballpool.png"
                title="8-ball pool lounge 360 degree street view"
              />

              {/* Title & Icon Header */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src="/icons/8ballicon.png"
                      alt="8-Ball Pool Icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream group-hover:text-[#E00902] transition-colors duration-300">
                    8-Ball Pool
                  </h3>
                </div>
              </div>
            </div>

            {/* Book on WhatsApp CTA */}
            <div className="mt-6">
              <a
                href={poolWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E00902] hover:bg-[#c20802] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E00902]"
                aria-label="Book 8-ball pool slot on WhatsApp"
              >
                <span>Book on WhatsApp</span>
                <span className="text-base font-bold">↗</span>
              </a>
            </div>
          </div>

          {/* Card 2: Cricket Box */}
          <div className="group relative flex flex-col justify-between rounded-3xl bg-cream/[0.03] hover:bg-cream/[0.06] border border-cream/15 hover:border-[#E00902]/50 transition-all duration-300 p-6 sm:p-7">
            <div>
              <StreetViewEmbed
                src={STREET_VIEWS.cricket.src}
                label={STREET_VIEWS.cricket.label}
                coverImage="/images/cricket.png"
                title="Box cricket turf arena 360 degree street view"
              />

              {/* Title & Icon Header */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src="/icons/criket icon.png"
                      alt="Box Cricket Icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream group-hover:text-[#E00902] transition-colors duration-300">
                    Cricket Box
                  </h3>
                </div>
              </div>
            </div>

            {/* Book on WhatsApp CTA */}
            <div className="mt-6">
              <a
                href={cricketWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E00902] hover:bg-[#c20802] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E00902]"
                aria-label="Book box cricket turf slot on WhatsApp"
              >
                <span>Book on WhatsApp</span>
                <span className="text-base font-bold">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
