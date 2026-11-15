import HeroArrival from "@/components/sections/HeroArrival";
import IntroStrip from "@/components/sections/IntroStrip";
import Stalls from "@/components/sections/Stalls";
import BiryaniShowcase from "@/components/sections/BiryaniShowcase";
import MostLovedDishes from "@/components/sections/MostLovedDishes";
import MenuSection from "@/components/sections/MenuSection";
import LeafFeastShowcase from "@/components/sections/LeafFeastShowcase";
import SpacesCards from "@/components/sections/SpacesCards";
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

      {/* 3. Stalls: 11 multi-cuisine stalls promenade */}
      <Stalls />

      {/* 4. BiryaniShowcase: Scroll-scrubbed banana leaf biryani unwrap experience */}
      <BiryaniShowcase />

      {/* 6. MostLovedDishes: Premium cinematic interactive showcase with radiant sunburst & dynamic mood */}
      <MostLovedDishes />

      {/* 7. MenuSection: Bold editorial tasting menu with image hover previews */}
      <MenuSection />

      {/* 7. LeafFeastShowcase: Scroll-scrubbed coastal banana leaf feast ritual */}
      <LeafFeastShowcase />

      {/* 8. SpacesCards: 3 Interactive arch cards (Indoor AC, Snooker, Shakes Town) with wave curves */}
      <SpacesCards />

      {/* 9. PlayZone: 8-Ball pool lounge & box cricket turf arena */}
      <PlayZone />

      {/* 9. Seating: Open-air seating vs climate-controlled indoor AC */}
      <Seating />

      {/* 10. Visit: Timings, map directions, parking details, and WhatsApp connect */}
      <Visit />
    </main>
  );
}
