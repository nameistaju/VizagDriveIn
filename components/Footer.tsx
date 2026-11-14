import React from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-cream relative overflow-hidden pt-12 border-t border-cream/5">
      {/* Main Streamlined Footer Content (Minimal info, blends with skyline) */}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/5">
          {/* Brand Emblem */}
          <div className="flex items-center gap-4">
            <div className="relative w-28 h-16 flex-shrink-0">
              <Image
                src="/images/arrival.gif"
                alt="The Vizag Drive In"
                fill
                unoptimized
                className="object-contain object-left"
              />
            </div>
            <div>
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-cream block">
                THE VIZAG <span className="italic font-normal text-[#E00902]">DRIVE IN</span>
              </span>
              <span className="text-[11px] uppercase tracking-widest text-cream/50 font-mono">
                Visakhapatnam, Andhra Pradesh • Open 5:00 PM – Late
              </span>
            </div>
          </div>

          {/* Quick Nav & WhatsApp Action */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <a href="#hero-arrival" className="text-cream/70 hover:text-[#E00902] transition-colors">
              Arrival
            </a>
            <a href="#stalls" className="text-cream/70 hover:text-[#E00902] transition-colors">
              Stalls
            </a>
            <a href="#menu-showcase" className="text-cream/70 hover:text-[#E00902] transition-colors">
              Menu
            </a>
            <a href="#biryani-showcase" className="text-cream/70 hover:text-[#E00902] transition-colors">
              Biryani
            </a>
            <a href="#play-zone" className="text-cream/70 hover:text-[#E00902] transition-colors">
              Play Zone
            </a>
            <a href="#visit" className="text-cream/70 hover:text-[#E00902] transition-colors">
              Visit
            </a>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E00902] hover:bg-[#c20802] text-white font-semibold text-xs uppercase tracking-wider transition-colors ml-2 shadow-md"
            >
              <span>WhatsApp</span>
              <span className="text-sm">↗</span>
            </a>
          </div>
        </div>

        {/* Minimal Copyright Line */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-cream/40 gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} The Vizag Drive In. All rights reserved.</p>
          <p className="text-[#E00902]">Visakhapatnam's Premier Night Dining Arena</p>
        </div>
      </div>

      {/* Vizag Night Skyline & Lighthouse Glow Panorama (Seamlessly blended with pure black background) */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[21/7] md:aspect-[3/1] max-h-[360px] overflow-hidden select-none pointer-events-none -mt-4">
        <Image
          src="/images/vizag-skyline.png"
          alt="Vizag Coastal Night Skyline and Lighthouse Glow"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>
    </footer>
  );
}
