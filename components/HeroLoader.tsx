"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const isMobile = window.innerWidth < 768;
    const videoSrc = isMobile
      ? "/video/hero-arrival-scrub-720.mp4"
      : "/video/hero-arrival-scrub.mp4";

    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;

    const markReady = () => {
      if (!isMounted) return;
      setTimeout(() => {
        if (isMounted) setIsLoading(false);
      }, 400);
    };

    video.addEventListener("canplaythrough", markReady, { once: true });
    video.addEventListener("canplay", markReady, { once: true });
    video.addEventListener("error", markReady, { once: true });

    video.src = videoSrc;
    video.load();

    const timeout = setTimeout(markReady, 2800);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      video.removeEventListener("canplaythrough", markReady);
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("error", markReady);
      video.src = "";
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal select-none transition-opacity duration-500 overflow-hidden"
    >
      {/* Desktop Background Image bg.png (Only rendered on desktop md:block) */}
      <div className="hidden md:block absolute inset-0 -z-10 pointer-events-none">
        <Image
          src="/images/bg.png"
          alt="The Vizag Drive In Background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      {/* Centered Arrival GIF */}
      <div className="relative w-64 h-48 sm:w-80 sm:h-60 z-10">
        <Image
          src="/images/arrival.gif"
          alt="Loading The Vizag Drive In"
          fill
          priority
          unoptimized
          className="object-contain"
        />
      </div>
    </div>
  );
}
