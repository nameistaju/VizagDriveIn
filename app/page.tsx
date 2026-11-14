import HeroArrival from "@/components/sections/HeroArrival";
import IntroStrip from "@/components/sections/IntroStrip";
import Stalls from "@/components/sections/Stalls";
import BiryaniShowcase from "@/components/sections/BiryaniShowcase";
import MenuSection from "@/components/sections/MenuSection";
import PlayZone from "@/components/sections/PlayZone";
import Seating from "@/components/sections/Seating";
import Visit from "@/components/sections/Visit";

export default function Home() {
  return (
    <main className="block w-full min-h-screen">
      {/* 1. HeroArrival: Scroll-scrubbed hero arrival video, nighttime atmosphere */}
      <HeroArrival />

      {/* 2. IntroStrip: Night street food festival vibe & concept manifesto */}
      <IntroStrip />

      {/* 3. Stalls: 8 multi-cuisine stalls showcase with cursor pill interaction */}
      <Stalls />

      {/* 4. BiryaniShowcase: Scroll-scrubbed biryani unwrapping sensory experience */}
      <BiryaniShowcase />

      {/* 5. MenuSection: Bold editorial tasting menu with image hover previews */}
      <MenuSection />

      {/* 6. PlayZone: 8-Ball pool lounge & box cricket turf arena */}
      <PlayZone />

      {/* 7. Seating: Open-air seating vs climate-controlled indoor AC */}
      <Seating />

      {/* 8. Visit: Timings, map directions, parking details, and WhatsApp connect */}
      <Visit />
    </main>
  );
}
