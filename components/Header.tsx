"use client";

import React from "react";
import Image from "next/image";

export default function Header() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 pointer-events-none bg-transparent">
      <div className="container mx-auto px-6 md:px-12 h-20 flex items-center justify-start">
        {/* ONLY the GIF, as it is, increased size, no text, no borders */}
        <a
          href="#"
          onClick={scrollToTop}
          className="relative pointer-events-auto transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none"
          aria-label="The Vizag Drive In - Scroll to Top"
        >
          <div className="relative w-28 h-16 sm:w-36 sm:h-20">
            <Image
              src="/images/arrival.gif"
              alt="The Vizag Drive In"
              fill
              unoptimized
              priority
              className="object-contain object-left"
            />
          </div>
        </a>
      </div>
    </header>
  );
}
