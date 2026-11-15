"use client";

import React from "react";

export type HighlightColor = "yellow" | "red" | "teal" | "cream";

interface HanddrawnHighlightProps {
  children: React.ReactNode;
  color?: HighlightColor;
  className?: string;
  rotate?: number;
}

export function HanddrawnHighlight({
  children,
  color = "yellow",
  className = "",
  rotate = -1,
}: HanddrawnHighlightProps) {
  // Color palette matching Aegean Sky (#1A6FBF), Sandy Linen (#F5F0E8), Scarlet Bikini (#D91A2A)
  const colorMap = {
    yellow: "bg-[#FFE875] text-[#14110f] selection:bg-[#14110f] selection:text-[#FFE875]",
    red: "bg-[#D91A2A] text-white selection:bg-white selection:text-[#D91A2A]",
    teal: "bg-[#1A6FBF] text-white selection:bg-white selection:text-[#1A6FBF]",
    cream: "bg-[#F5F0E8] text-[#14110f] selection:bg-[#14110f] selection:text-[#F5F0E8]",
  };

  const selectedColor = colorMap[color] || colorMap.yellow;

  return (
    <span className={`relative inline-block px-2.5 py-0.5 mx-0.5 ${className}`}>
      {/* Looseleaf Textured Marker Stroke Layer */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 -inset-x-1 -inset-y-0.5 -z-10 rounded-[4px_7px_3px_6px] ${selectedColor.split(" ")[0]} opacity-90 shadow-sm transition-transform duration-200 pointer-events-none`}
        style={{
          transform: `rotate(${rotate}deg)`,
        }}
      >
        {/* Subtle marker texture line overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 100 20"
        >
          <path
            d="M 2 10 Q 50 14, 98 9"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {/* Text Content */}
      <span className={`relative z-10 font-bold ${selectedColor.split(" ")[1]}`}>
        {children}
      </span>
    </span>
  );
}

interface HanddrawnUnderlineProps {
  children: React.ReactNode;
  color?: "red" | "yellow" | "teal" | "cream";
  strokeWidth?: number;
  className?: string;
}

export function HanddrawnUnderline({
  children,
  color = "red",
  strokeWidth = 3,
  className = "",
}: HanddrawnUnderlineProps) {
  const strokeColors = {
    red: "#D91A2A",
    yellow: "#FFE875",
    teal: "#1A6FBF",
    cream: "#F5F0E8",
  };

  const strokeColor = strokeColors[color] || strokeColors.red;

  return (
    <span className={`relative inline-block ${className}`}>
      <span>{children}</span>
      {/* Looseleaf Sketchy Hand-Drawn Pen Underline */}
      <svg
        aria-hidden="true"
        className="absolute left-0 -bottom-2 w-full h-3 overflow-visible pointer-events-none"
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
      >
        {/* Organic double-stroke pen wobble mimicking Looseleaf pen tool */}
        <path
          d="M 1 6 C 22 2, 58 10, 99 5 C 72 8, 32 3, 4 8"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-95"
        />
      </svg>
    </span>
  );
}
