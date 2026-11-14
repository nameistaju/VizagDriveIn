"use client";

import React from "react";
import Image from "next/image";

const FOOD_ITEMS = [
  {
    name: "Chicken Biryani Platter with Raita",
    src: "/food/Chicken%20Biryani%20Platter%20with%20Raita.png",
  },
  {
    name: "Crispy Idli Bites with Chutneys",
    src: "/food/Crispy%20Idli%20Bites%20with%20Chutneys.png",
  },
  {
    name: "Flaky Parotta with Chicken Curry and Onions",
    src: "/food/Flaky%20Parotta%20with%20Chicken%20Curry%20and%20Onions.png",
  },
  {
    name: "Golden Fritter Platter with Chutneys",
    src: "/food/Golden%20Fritter%20Platter%20with%20Chutneys.png",
  },
  {
    name: "Golden Puri Thali with Curries and Chutney",
    src: "/food/Golden%20Puri%20Thali%20with%20Curries%20and%20Chutney.png",
  },
  {
    name: "Grilled Chicken Shawarma Wraps",
    src: "/food/Grilled%20Chicken%20Shawarma%20Wraps.png",
  },
  {
    name: "Spicy Crispy Chicken with Curry Leaves",
    src: "/food/Spicy%20Crispy%20Chicken%20with%20Curry%20Leaves.png",
  },
  {
    name: "Spicy Podi Idli Thali with Chutneys",
    src: "/food/Spicy%20Podi%20Idli%20Thali%20with%20Chutneys.png",
  },
  {
    name: "Stretchy Cheese Pizza Slice",
    src: "/food/Stretchy%20Cheese%20Pizza%20Slice.png",
  },
  {
    name: "Trio of Decadent Freakshakes",
    src: "/food/Trio%20of%20Decadent%20Freakshakes.png",
  },
];

export default function FoodLoop() {
  // Duplicate array to create a completely seamless infinite loop
  const duplicatedItems = [...FOOD_ITEMS, ...FOOD_ITEMS];

  return (
    <section
      aria-label="Signature Dishes Showcase"
      className="relative w-full overflow-hidden bg-transparent py-8 sm:py-12 md:py-16 select-none"
    >
      <div className="flex w-max animate-food-loop items-center">
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex-none px-4 sm:px-6 md:px-8"
          >
            <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px]">
              <Image
                src={item.src}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 180px, (max-width: 1024px) 280px, 320px"
                className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] hover:scale-105 transition-transform duration-300 ease-out"
                priority={index < 4}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
