"use client";

import React, { useEffect, useState } from "react";

interface StatusInfo {
  isOpen: boolean;
  statusText: string;
  subText: string;
  currentTimeString: string;
}

export default function IntroStrip() {
  const [status, setStatus] = useState<StatusInfo>({
    isOpen: true,
    statusText: "Open Evenings",
    subText: "5:00 PM – Late",
    currentTimeString: "",
  });

  useEffect(() => {
    const computeKolkataStatus = () => {
      try {
        const now = new Date();

        const timeFormatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        const hour24Formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
          weekday: "short",
        });

        const parts = hour24Formatter.formatToParts(now);
        const weekday = parts.find((p) => p.type === "weekday")?.value || "Fri";
        const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "18", 10);
        const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
        const currentMinutes = hour * 60 + minute;

        const isWeekendSession =
          weekday === "Fri" ||
          weekday === "Sat" ||
          (weekday === "Sat" && hour < 4) ||
          (weekday === "Sun" && hour < 4);

        const closingHour = isWeekendSession ? 2 : 1;
        const closingMinutes = closingHour * 60;

        let isOpen = false;
        let statusText = "Closed";
        let subText = "Opens at 5:00 PM";

        if (currentMinutes >= 17 * 60) {
          isOpen = true;
          statusText = "Open Now";
          subText = `Until ${closingHour}:00 AM`;
        } else if (currentMinutes < closingMinutes) {
          isOpen = true;
          statusText = "Open Now";
          subText = `Until ${closingHour}:00 AM`;
        } else {
          isOpen = false;
          statusText = "Closed";
          subText = "Opens today at 5:00 PM";
        }

        setStatus({
          isOpen,
          statusText,
          subText,
          currentTimeString: timeFormatter.format(now),
        });
      } catch (err) {
        console.error("Failed to compute Asia/Kolkata status:", err);
      }
    };

    computeKolkataStatus();
    const interval = setInterval(computeKolkataStatus, 60000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    "Open-air seating",
    "8+ food stalls",
    "Pool & Cricket",
    "Dedicated parking",
  ];

  return (
    <section
      id="intro-strip"
      aria-label="Welcome and Experience Concept"
      className="relative z-20 w-full bg-[#14110f] text-cream border-y border-cream/10 py-20 md:py-28 overflow-hidden block"
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center max-w-5xl">
        {/* Real-time Open/Closed indicator (clean text, no pill container) */}
        <div className="flex items-center gap-2.5 text-xs font-mono tracking-wider mb-8">
          <span className="relative flex h-2 w-2">
            {status.isOpen ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
              </>
            ) : (
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E00902]" />
            )}
          </span>
          <span
            className={
              status.isOpen
                ? "text-teal font-semibold uppercase"
                : "text-[#E00902] font-semibold uppercase"
            }
          >
            {status.statusText}
          </span>
          <span className="text-cream/30">•</span>
          <span className="text-cream/70">{status.subText}</span>
          {status.currentTimeString && (
            <span className="text-cream/40 hidden sm:inline">
              ({status.currentTimeString} IST)
            </span>
          )}
        </div>

        {/* Big One Sentence Copy */}
        <p className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.25] md:leading-[1.2] text-cream tracking-tight max-w-4xl">
          Visakhapatnam’s moonlit gathering ground where curated street feasts,
          lively box cricket clashes, and coastal night breezes{" "}
          <span className="italic font-normal text-[#E00902] underline decoration-[#E00902]/30 underline-offset-8">
            converge.
          </span>
        </p>

        {/* Feature list */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm font-sans tracking-wide text-cream/75">
          {features.map((feat, i) => (
            <React.Fragment key={feat}>
              {i > 0 && <span className="text-[#E00902]/40">•</span>}
              <span>{feat}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
