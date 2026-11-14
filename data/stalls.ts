export interface FoodStall {
  id: string;
  name: string;
  cuisine: string;
  category: string;
  tagline: string;
  signatureDishes: string[];
  priceRange: string;
  image: string;
  stallNumber: string;
  locationGuide: string;
}

export function stripTodo(text: string): string {
  return text.replace(/^TODO:\s*\[?/, "").replace(/\]?$/, "").trim();
}

export const stalls: FoodStall[] = [
  {
    id: "uncles-pulavs",
    name: "Uncle’s Pulavs",
    cuisine: "Andhra Pulavs & Dum Biryani",
    category: "Biryani & Pulav",
    tagline: "Slow-simmered spiced handis & traditional banana-leaf dum",
    signatureDishes: [
      "Chicken Pulav Handi",
      "Mutton Dum Biryani in Banana Leaf",
      "Mirchi Ka Salan & Raitha",
    ],
    priceRange: "₹250 - ₹500",
    image: "/Newstalls/Uncle’s Pulavs Andhra Food Stall.png",
    stallNumber: "01",
    locationGuide: "East Courtyard • Opposite Open-Air Screen",
  },
  {
    id: "grill-citi",
    name: "Grill Citi",
    cuisine: "Charcoal Grills & Tandoor",
    category: "Tandoor & Kebabs",
    tagline: "Live clay oven tikkas, juicy seekh & smoky shawarmas",
    signatureDishes: [
      "Murgh Malai Tikka Skewers",
      "Mutton Galouti Kebabs",
      "Paneer Tikka Angara",
    ],
    priceRange: "₹220 - ₹480",
    image: "/Newstalls/Grill Citi Kebab Stall.png",
    stallNumber: "02",
    locationGuide: "North Plaza • Near Central Fountain",
  },
  {
    id: "gustoso-cafe",
    name: "Gustoso Café & Pizzeria",
    cuisine: "Wood-Fired Pizza & Brews",
    category: "Café & Pizza",
    tagline: "Blistered thin-crust artisan pies & cold drip brews",
    signatureDishes: [
      "Smoked Pepperoni Pizza",
      "Truffle Mushroom Fettuccine",
      "Iced Caramel Cold Brew",
    ],
    priceRange: "₹280 - ₹600",
    image: "/Newstalls/Gustoso Café Kiosk_ Warm Tasty Vibes.png",
    stallNumber: "03",
    locationGuide: "West Promenade • Beside 8-Ball Pool Lounge",
  },
  {
    id: "tamen-ramen",
    name: "TAMEN Ramen Bar",
    cuisine: "Japanese Ramen & Dim Sum",
    category: "Pan-Asian & Ramen",
    tagline: "Steaming rich tonkotsu broth bowls & fluffy steamed baos",
    signatureDishes: [
      "Rich Tonkotsu Ramen",
      "Steamed Truffle Edamame Dim Sum",
      "Crispy Teriyaki Baos",
    ],
    priceRange: "₹220 - ₹450",
    image: "/Newstalls/TAMEN Ramen Stall Glow.png",
    stallNumber: "04",
    locationGuide: "West Promenade • Next to Box Cricket Arena",
  },
  {
    id: "mr-weenie",
    name: "Mr. Weenie",
    cuisine: "Gourmet Dogs & Smashed Burgers",
    category: "Burgers & Dogs",
    tagline: "Flame-grilled footlongs, sharp cheddar & brioche buns",
    signatureDishes: [
      "Chili Cheese Footlong Dog",
      "Double Smashed Brioche Burger",
      "Loaded Jalapeño Crinkle Fries",
    ],
    priceRange: "₹180 - ₹380",
    image: "/Newstalls/Mr. Weenie’s Vibrant Hotdog Kiosk.png",
    stallNumber: "05",
    locationGuide: "South Food Court • Lineup #05",
  },
  {
    id: "red-roast",
    name: "Red Roast",
    cuisine: "Indo-Chinese & Wok Sizzlers",
    category: "Wok & Indo-Chinese",
    tagline: "High-flame tossed hakka noodles & fiery dragon chili",
    signatureDishes: [
      "Schezwan Wok Hakka Noodles",
      "Crispy Chilli Chicken Dry",
      "Paneer Manchurian Sizzler",
    ],
    priceRange: "₹180 - ₹360",
    image: "/Newstalls/Red Roast Chinese Kiosk.png",
    stallNumber: "06",
    locationGuide: "East Courtyard • Corner Kiosk #06",
  },
  {
    id: "rajadhani",
    name: "Rajadhani Tandoori",
    cuisine: "Royal Mughlai & Clay Oven",
    category: "Royal Indian & Tandoor",
    tagline: "Authentic frontier kebabs & slow-braised curries",
    signatureDishes: [
      "Frontier Mutton Chaap",
      "Butter Chicken Masala Handi",
      "Garlic Butter Naan",
    ],
    priceRange: "₹240 - ₹550",
    image: "/Newstalls/Rajadhani Indian Chinese Tandoori Stall.png",
    stallNumber: "07",
    locationGuide: "North Courtyard • Royal Lineup #07",
  },
  {
    id: "moocham",
    name: "Moocham Tiffin House",
    cuisine: "Pure Ghee South Tiffins",
    category: "Tiffins & Street",
    tagline: "Steamed button idlis, podi tosses & crisp golden dosas",
    signatureDishes: [
      "Pure Ghee Podi Idli Stack",
      "Mysore Masala Dosa",
      "Filter Kaapi",
    ],
    priceRange: "₹90 - ₹220",
    image: "/Newstalls/Moocham Tiffin House Kiosk.png",
    stallNumber: "08",
    locationGuide: "Morning Deck • South Promenade #08",
  },
  {
    id: "shakes-town",
    name: "Shakes Town",
    cuisine: "Monster Shakes & Coolers",
    category: "Shakes & Beverages",
    tagline: "Decadent thickshakes, boba infusions & crushed mocktails",
    signatureDishes: [
      "Nutella Brownie Overload Shake",
      "Brown Sugar Boba Milk Tea",
      "Blue Curacao Citrus Splash",
    ],
    priceRange: "₹120 - ₹280",
    image: "/Newstalls/Shakes Town Dessert Kiosk.png",
    stallNumber: "09",
    locationGuide: "South Corridor • Dessert Deck #09",
  },
  {
    id: "ice-cream-factory",
    name: "The Ice Cream Factory",
    cuisine: "Artisanal Gelato & Waffles",
    category: "Ice Cream & Desserts",
    tagline: "Handcrafted gelato scoops & warm Belgian chocolate waffles",
    signatureDishes: [
      "Belgian Chocolate Waffle Stack",
      "Lotus Biscoff Swirl Gelato",
      "Sizzling Brownie with Vanilla Pod Scoop",
    ],
    priceRange: "₹130 - ₹300",
    image: "/Newstalls/The Ice Cream Factory Kiosk.png",
    stallNumber: "10",
    locationGuide: "South Corridor • Sweet Street Front #10",
  },
  {
    id: "ifruit-dessert",
    name: "ifruit Real Fruit Kiosk",
    cuisine: "Fresh Fruit Pops & Naturals",
    category: "Fresh Fruits & Pops",
    tagline: "100% natural fruit pops, sorbets & seasonal refreshers",
    signatureDishes: [
      "Alphonso Mango Real Fruit Bar",
      "Wild Berry Sorbet",
      "Tender Coconut Pop",
    ],
    priceRange: "₹80 - ₹200",
    image: "/Newstalls/Colourful ifruit Dessert Kiosk Storefront.png",
    stallNumber: "11",
    locationGuide: "West Garden Walk • Kiosk #11",
  },
];
