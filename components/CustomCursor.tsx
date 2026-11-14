"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices and respect reduced-motion
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    setIsEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractiveCard = !!target.closest(
          '[data-cursor="view"], .cursor-view-target, [data-stall-card]'
        );
        setIsHoveringCard(isInteractiveCard);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (!isEnabled || !isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {isHoveringCard ? (
        <div className="-translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full bg-amber text-charcoal font-sans text-xs font-bold uppercase tracking-wider shadow-glow-amber scale-100 transition-all duration-200 flex items-center gap-1.5">
          <span>View</span>
          <span className="text-[10px]">↗</span>
        </div>
      ) : (
        <div className="-translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-amber/80 shadow-[0_0_12px_#f5a623] transition-all duration-150" />
      )}
    </div>
  );
}
