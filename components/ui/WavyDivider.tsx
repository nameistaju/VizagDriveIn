"use client";

import React from "react";

interface WavyDividerProps {
  position?: "top" | "bottom";
  waveColor?: string;
  bgColor?: string;
  className?: string;
}

/**
 * Smooth organic wavy divider inspired by the reference wave aesthetic.
 * Connects sections seamlessly with high-precision SVG paths and zero gaps.
 */
export default function WavyDivider({
  position = "top",
  waveColor = "#8E171E",
  bgColor = "#14110f",
  className = "",
}: WavyDividerProps) {
  if (position === "bottom") {
    return (
      <div
        aria-hidden="true"
        className={`w-full overflow-hidden leading-none pointer-events-none select-none block -mt-[1px] relative z-10 ${className}`}
        style={{ backgroundColor: bgColor }}
      >
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12 md:h-16 lg:h-20 block"
        >
          <path
            d="M0,0 L1440,0 L1440,40 C1220,78 980,12 720,48 C460,82 220,15 0,42 Z"
            fill={waveColor}
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden leading-none pointer-events-none select-none block -mb-[1px] relative z-10 ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-8 sm:h-12 md:h-16 lg:h-20 block"
      >
        <path
          d="M0,42 C220,15 460,82 720,48 C980,12 1220,78 1440,40 L1440,80 L0,80 Z"
          fill={waveColor}
        />
      </svg>
    </div>
  );
}
