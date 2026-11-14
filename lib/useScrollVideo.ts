"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface UseScrollVideoOptions {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  triggerRef: React.RefObject<HTMLElement | null>;
  scrollLength?: string;
  desktopSrc?: string;
  mobileSrc?: string;
  damping?: number;
  onProgress?: (progress: number) => void;
}

export interface UseScrollVideoReturn {
  isReady: boolean;
  progress: number;
  isReducedMotion: boolean;
  hasError: boolean;
  activeSrc: string;
}

export function useScrollVideo({
  videoRef,
  triggerRef,
  scrollLength,
  desktopSrc = "/video/hero-arrival-scrub.mp4",
  mobileSrc = "/video/hero-arrival-scrub-720.mp4",
  damping = 0.1,
  onProgress,
}: UseScrollVideoOptions): UseScrollVideoReturn {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [activeSrc, setActiveSrc] = useState<string>(desktopSrc);

  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const isSeekingRef = useRef<boolean>(false);
  const seekTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Determine active source based on viewport width
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      setActiveSrc(isMobile ? mobileSrc : desktopSrc);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [desktopSrc, mobileSrc]);

  // Main setup effect
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      setIsReducedMotion(true);
      return;
    }

    const video = videoRef.current;
    const trigger = triggerRef.current;

    if (!video || !trigger) return;

    let isMounted = true;

    const handleError = () => {
      if (!isMounted) return;
      console.warn("[useScrollVideo] Video failed to load, falling back to static poster.");
      setHasError(true);
    };

    video.addEventListener("error", handleError);

    // Frame-accurate video seek loop
    const tick = () => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;

      // Smooth progress with lerp damping
      const next = current + (target - current) * damping;
      currentProgressRef.current = Math.abs(target - next) < 0.0001 ? target : next;

      // Update external / local state
      setProgress(currentProgressRef.current);
      if (onProgress) {
        onProgress(currentProgressRef.current);
      }

      // Unlock seek lock if browser completed seeking natively
      if (isSeekingRef.current && (!video || !video.seeking)) {
        isSeekingRef.current = false;
      }

      // Seek video if duration is available and ready
      if (
        video &&
        video.duration &&
        !isNaN(video.duration) &&
        video.readyState >= 1 &&
        !isSeekingRef.current
      ) {
        // Clamp slightly inside duration bounds to avoid EOF hang
        const safeDuration = Math.max(0, video.duration - 0.04);
        const targetTime = currentProgressRef.current * safeDuration;
        const delta = Math.abs(video.currentTime - targetTime);

        // Seek when delta is greater than ~1 frame duration (0.02s)
        if (delta > 0.02) {
          isSeekingRef.current = true;
          try {
            video.currentTime = targetTime;
          } catch (e) {
            isSeekingRef.current = false;
          }

          if (seekTimeoutRef.current) clearTimeout(seekTimeoutRef.current);
          seekTimeoutRef.current = setTimeout(() => {
            isSeekingRef.current = false;
          }, 80);
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
    };

    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("timeupdate", handleSeeked);
    video.addEventListener("canplay", handleSeeked);

    // Initialize ScrollTrigger immediately so layout & pinning don't depend on network media
    const initScrollTrigger = () => {
      if (!isMounted || !trigger) return;

      const isMobile = window.innerWidth < 768;
      const defaultLength = isMobile ? "+=300%" : "+=400%";
      const endLength = scrollLength || defaultLength;

      // Kill any previous trigger instance
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }

      if (video) {
        video.pause();
        if (video.currentTime === 0) {
          try {
            video.currentTime = 0.001;
          } catch (e) {}
        }
      }

      // Create pin & scrub trigger
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: trigger,
        start: "top top",
        end: endLength,
        pin: true,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          targetProgressRef.current = self.progress;
        },
      });

      ScrollTrigger.refresh();
      setIsReady(true);

      // Start smoothing rAF loop
      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };

    initScrollTrigger();

    const handleMediaReady = () => {
      if (!isMounted || !video) return;
      if (video.currentTime === 0) {
        try {
          video.currentTime = 0.001;
        } catch (e) {}
      }
      ScrollTrigger.refresh();
      setIsReady(true);
    };

    video.addEventListener("loadedmetadata", handleMediaReady);
    video.addEventListener("loadeddata", handleMediaReady);
    video.addEventListener("canplay", handleMediaReady);

    // Explicitly kick off video load so offscreen videos are buffered by the browser
    try {
      video.load();
    } catch (e) {}

    return () => {
      isMounted = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (seekTimeoutRef.current) {
        clearTimeout(seekTimeoutRef.current);
        seekTimeoutRef.current = null;
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      video.removeEventListener("error", handleError);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("timeupdate", handleSeeked);
      video.removeEventListener("canplay", handleSeeked);
      video.removeEventListener("loadedmetadata", handleMediaReady);
      video.removeEventListener("loadeddata", handleMediaReady);
    };
  }, [videoRef, triggerRef, scrollLength, activeSrc, damping, onProgress]);

  return {
    isReady,
    progress,
    isReducedMotion,
    hasError,
    activeSrc,
  };
}
