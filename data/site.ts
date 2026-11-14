export interface SiteConfig {
  name: string;
  tagline: string;
  address: string;
  mapsUrl: string;
  phone: string;
  whatsappUrl: string;
  timings: {
    weekdays: string;
    weekends: string;
    note: string;
  };
  parkingNote: string;
  poolRates: {
    ratePerHour: string;
    tablesCount: string;
    timing: string;
  };
  cricketRates: {
    ratePerHourWeekday: string;
    ratePerHourWeekend: string;
    boxSpecs: string;
    timing: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "The Vizag Drive In",
  // TODO: Verify exact official tagline
  tagline: "TODO: [Official Tagline - e.g. Visakhapatnam's Premier Open-Air Night Dining & Play Arena]",
  // TODO: Add official street address, landmark, and pincode
  address: "TODO: [Exact Street Address & Landmark, Visakhapatnam, Andhra Pradesh, PIN]",
  // TODO: Add official Google Maps location URL
  mapsUrl: "TODO: [https://maps.google.com/?cid=...]",
  // TODO: Add official contact telephone / mobile number
  phone: "TODO: [+91 9XXXXXXXXX]",
  // TODO: Add official WhatsApp chat link with prefilled message
  whatsappUrl: "TODO: [https://wa.me/91XXXXXXXXXX?text=Hi%20Vizag%20Drive%20In]",
  timings: {
    // TODO: Verify official operating hours
    weekdays: "TODO: [e.g. 5:00 PM – 1:00 AM]",
    weekends: "TODO: [e.g. 5:00 PM – 2:00 AM]",
    note: "TODO: [Kitchen stalls close 30 minutes prior to closing time]",
  },
  // TODO: Verify exact parking capacity and valet/drive-in service details
  parkingNote: "TODO: [Dedicated on-site parking available for cars and bikes with valet assistance]",
  poolRates: {
    // TODO: Verify official 8-ball pool hourly rates and details
    ratePerHour: "TODO: [₹XXX / hour]",
    tablesCount: "TODO: [X Tournament-grade 8-ball pool tables]",
    timing: "TODO: [Open from 4:00 PM onwards]",
  },
  cricketRates: {
    // TODO: Verify official box cricket hourly slot pricing and booking rules
    ratePerHourWeekday: "TODO: [₹XXX / hour (Weekdays)]",
    ratePerHourWeekend: "TODO: [₹XXX / hour (Weekends)]",
    boxSpecs: "TODO: [Floodlit turf arena with high-net enclosure]",
    timing: "TODO: [Slots open from 4:00 PM till midnight]",
  },
};
