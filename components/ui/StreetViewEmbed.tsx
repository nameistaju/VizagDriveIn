"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface StreetViewEmbedProps {
  src: string;
  title?: string;
  label: string;
  className?: string;
  coverImage?: string;
}

export default function StreetViewEmbed({
  src,
  title,
  label,
  className = "",
  coverImage,
}: StreetViewEmbedProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {/* Interactive Embed Container */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#14110f] border border-cream/15 shadow-xl">
        {!isLoaded ? (
          /* Click-to-load Cover Button (NO iframe loaded initially) */
          <button
            type="button"
            onClick={() => setIsLoaded(true)}
            aria-label={`Explore ${label} in 360 degrees`}
            className="group relative w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-[#181412] hover:bg-[#1e1916] border border-transparent hover:border-[#E00902]/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E00902] focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal cursor-pointer overflow-hidden"
          >
            {/* Real Photo Placeholder Cover if provided */}
            {coverImage && (
              <div className="absolute inset-0 w-full h-full z-0">
                <Image
                  src={coverImage}
                  alt={label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/55 pointer-events-none" />
              </div>
            )}

            {/* 360° Spherical Icon */}
            <div className="relative z-10 w-16 h-16 rounded-2xl bg-charcoal/80 backdrop-blur-md border border-cream/20 group-hover:border-[#E00902]/50 group-hover:scale-105 flex items-center justify-center text-[#E00902] transition-all duration-300 shadow-md">
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <span className="absolute -top-1 -right-1 text-[10px] font-mono font-bold bg-[#E00902] text-white px-1.5 py-0.5 rounded-md shadow-sm">
                360°
              </span>
            </div>

            {/* Spot Label */}
            <h4 className="relative z-10 mt-4 font-display text-xl sm:text-2xl font-bold text-cream tracking-tight group-hover:text-[#E00902] transition-colors duration-300 drop-shadow-md">
              {label}
            </h4>

            <p className="relative z-10 mt-1 text-xs font-mono text-cream/70 uppercase tracking-widest drop-shadow-sm">
              Interactive Panorama View
            </p>

            {/* Red Action Button */}
            <div className="relative z-10 mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#E00902] hover:bg-[#c20802] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 group-hover:scale-105 shadow-lg">
              <span>Explore in 360°</span>
              <span className="text-sm font-bold">↗</span>
            </div>
          </button>
        ) : (
          /* Live Street View Iframe with Controls */
          <div className="relative w-full h-full">
            <iframe
              src={src}
              title={title || `Street view of ${label}`}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full border-0 rounded-2xl"
            />

            {/* Mobile Scroll Protection & Instruction Box */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none px-3.5 py-1.5 rounded-xl bg-charcoal/85 backdrop-blur-md border border-cream/20 text-[11px] font-mono tracking-wide text-cream/90 shadow-md">
              <span className="text-[#E00902] mr-1.5">✦</span>
              <span>Use two fingers to look around</span>
            </div>

            {/* Close Button that unmounts iframe and returns to cover */}
            <button
              type="button"
              onClick={() => setIsLoaded(false)}
              aria-label={`Close 360 view for ${label}`}
              className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-charcoal/90 hover:bg-[#E00902] text-cream text-xs font-mono uppercase tracking-wider border border-cream/20 hover:border-[#E00902] transition-all duration-200 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E00902]"
            >
              <span>✕</span>
              <span>Close</span>
            </button>
          </div>
        )}
      </div>

      {/* Mandatory Disclaimer Under Embed */}
      <span className="mt-2 text-[11px] font-mono text-cream/45 tracking-wide px-1">
        Street View imagery from 2021. Things may have changed.
      </span>
    </div>
  );
}
