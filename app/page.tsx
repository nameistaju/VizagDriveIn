import HeroArrival from "@/components/sections/HeroArrival";
import IntroStrip from "@/components/sections/IntroStrip";
import Stalls from "@/components/sections/Stalls";
import FoodLoop from "@/components/sections/FoodLoop";
import BiryaniShowcase from "@/components/sections/BiryaniShowcase";
import MenuSection from "@/components/sections/MenuSection";
import LeafFeastShowcase from "@/components/sections/LeafFeastShowcase";
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

      {/* 4. FoodLoop: Transparent horizontal loop scroll of cutout food dishes */}
      <FoodLoop />

      {/* 5. BiryaniShowcase: Scroll-scrubbed banana leaf biryani unwrap experience */}
      <BiryaniShowcase />

      {/* 6. MenuSection: Bold editorial tasting menu with image hover previews */}
      <MenuSection />

      {/* 7. LeafFeastShowcase: Scroll-scrubbed coastal banana leaf feast ritual */}
      <LeafFeastShowcase />

      {/* 8. PlayZone: 8-Ball pool lounge & box cricket turf arena */}
      <PlayZone />

      {/* 9. Seating: Open-air seating vs climate-controlled indoor AC */}
      <Seating />

      {/* 10. Visit: Timings, map directions, parking details, and WhatsApp connect */}
      <Visit />
    </main>
  );
}
