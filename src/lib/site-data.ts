export const whatsappNumber = "14167868958";
export const phoneDisplay = "+1 (416) 786-8958";
export const phoneHref = "tel:+14167868958";
export const dealershipAddress = "1639 Bayview Ave, East York, ON M4G 3B5";
export const dealershipCity = "East York, Toronto / GTA";
export const businessHours = "Mon–Sat: 10:00 AM – 7:00 PM · Sun: By Appointment";

export const mapEmbedUrl =
  "https://www.google.com/maps?q=1639+Bayview+Ave,+East+York,+ON+M4G+3B5&output=embed";
export const mapDirectionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=1639+Bayview+Ave,+East+York,+ON+M4G+3B5";

export const siteUrl = "https://automaven.ca";
export const dealershipEmail = "info@automaven.ca";
export const smsHref = "sms:+14167868958";

export const getWhatsAppUrl = (message: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

export const FINANCE_ESTIMATE_EVENT = "autoMavenFinanceEstimate";

export type FinanceEstimateDetail = {
  vehiclePrice: number;
  downPayment: number;
  interestRate: number;
  termMonths: number;
  vehicleName: string;
};

export function getVehicleInquiryWhatsAppUrl(vehicle: {
  name: string;
  mileage: string;
  priceDisplay: string;
}) {
  const message = `Hi Auto Maven, I would like more information about this vehicle:

Vehicle: ${vehicle.name}
Mileage: ${vehicle.mileage}
Price: ${vehicle.priceDisplay}
Page: ${siteUrl}/#inventory

Please send me more details, availability, and next steps.`;

  return getWhatsAppUrl(message);
}

export const navLinks = [
  { href: "#inventory", label: "Inventory" },
  { href: "#find-my-car", label: "Find My Car" },
  { href: "#finance", label: "Finance" },
  { href: "#trade", label: "Trade-In" },
  { href: "#services", label: "Services" },
  { href: "#location", label: "Location" },
  { href: "#contact", label: "Contact" },
];

export const sourcingSteps = [
  {
    title: "Share Your Criteria",
    text: "Tell us what vehicle you want and your budget.",
  },
  {
    title: "We Search the Market",
    text: "We check retail, wholesale, auction, and dealer sources.",
  },
  {
    title: "Review Your Options",
    text: "We send you suitable options with clear numbers and next steps.",
  },
];

export const sourcingTrustBadges = [
  "Market-Based Search",
  "Toronto/GTA",
  "Wholesale + Retail Insight",
  "OMVIC Licensed",
];

export const heroTrustBadges = [
  "OMVIC Licensed",
  "Toronto/GTA",
  "Wholesale + Retail Insight",
  "Flexible Financing",
];

export const trustStrip = [
  {
    title: "OMVIC Licensed",
    description:
      "Registered Ontario dealer with compliant sales practices and consumer protection.",
  },
  {
    title: "Market-Based Pricing",
    description:
      "Listings and guidance grounded in wholesale, retail, and real GTA market movement.",
  },
  {
    title: "Financing Support",
    description:
      "Flexible lender options with transparent terms for a wide range of credit profiles.",
  },
  {
    title: "Vehicle Sourcing",
    description:
      "We locate specific makes and models through dealer, auction, and wholesale networks.",
  },
];

/** Badge types map to future Google Sheet boolean/enum columns. */
export type VehicleImageBadgeType =
  | "carfax"
  | "cleanCarfax"
  | "lowKm"
  | "oneOwner"
  | "cleanTitle"
  | "greatDeal"
  | "freshSafety"
  | "commercialReady"
  | "commercial"
  | "luxury"
  | "highDemand"
  | "family"
  | "truck"
  | "van"
  | "fuel"
  | "performance"
  | "default";

export type VehicleImageBadge = {
  label: string;
  type: VehicleImageBadgeType;
};

export type Vehicle = {
  name: string;
  mileage: string;
  price: number;
  priceDisplay: string;
  image: string;
  description: string;
  badges: string[];
  /** Future Google Sheet fields can map to imageBadges: carfax, cleanCarfax, lowKm, oneOwner, cleanTitle, greatDeal, freshSafety, commercialReady */
  imageBadges: VehicleImageBadge[];
};

export const vehicles: Vehicle[] = [
  {
    name: "2023 Mercedes-Benz CLA 250 4MATIC",
    mileage: "42,000 km",
    price: 34995,
    priceDisplay: "$34,995",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
    description:
      "Premium compact luxury sedan with AWD confidence, sport styling, and strong Toronto/GTA resale appeal.",
    badges: ["AWD", "Luxury Sedan", "Carfax Available"],
    imageBadges: [
      { label: "CARFAX", type: "carfax" },
      { label: "Luxury Pick", type: "luxury" },
    ],
  },
  {
    name: "2022 Toyota RAV4 LE AWD",
    mileage: "86,000 km",
    price: 27995,
    priceDisplay: "$27,995",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Toyota%20RAV4%202.5L%20LTD%20HEV%202022%20%282%29.jpg",
    description:
      "Practical compact SUV with Toyota reliability, strong demand, and family-friendly utility.",
    badges: ["AWD", "SUV", "Certified Available"],
    imageBadges: [
      { label: "Clean Carfax", type: "cleanCarfax" },
      { label: "Great Deal", type: "greatDeal" },
      { label: "High Demand", type: "highDemand" },
    ],
  },
  {
    name: "2021 Honda Civic EX",
    mileage: "74,000 km",
    price: 22995,
    priceDisplay: "$22,995",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/2022%20Honda%20Civic%20Sedan%20EX%20in%20Platinum%20White%20Pearl%2C%20front%20left.jpg",
    description:
      "Reliable compact sedan with low ownership cost, strong resale value, and everyday usability.",
    badges: ["Sedan", "Fuel Efficient", "Carfax Available"],
    imageBadges: [
      { label: "Low KM", type: "lowKm" },
      { label: "One Owner", type: "oneOwner" },
      { label: "Clean Title", type: "cleanTitle" },
    ],
  },
  {
    name: "2020 Ford F-150 XLT 4x4",
    mileage: "118,000 km",
    price: 34995,
    priceDisplay: "$34,995",
    image:
      "https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?auto=format&fit=crop&w=1200&q=80",
    description:
      "Full-size pickup with 4x4 capability, towing utility, and broad buyer appeal across the GTA.",
    badges: ["4x4", "Truck", "Work Ready"],
    imageBadges: [
      { label: "CARFAX", type: "carfax" },
      { label: "4x4", type: "truck" },
      { label: "Work Ready", type: "commercial" },
    ],
  },
  {
    name: "2021 BMW 330i xDrive",
    mileage: "69,000 km",
    price: 29995,
    priceDisplay: "$29,995",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Sport luxury sedan with xDrive AWD, premium interior, and attractive finance-market demand.",
    badges: ["xDrive", "Sport Sedan", "Luxury"],
    imageBadges: [
      { label: "Luxury Pick", type: "luxury" },
      { label: "Clean Title", type: "cleanTitle" },
    ],
  },
  {
    name: "2020 Audi Q5 Progressiv quattro",
    mileage: "92,000 km",
    price: 24995,
    priceDisplay: "$24,995",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
    description:
      "Premium AWD SUV with quattro traction, leather, and strong used luxury SUV demand.",
    badges: ["quattro", "Luxury SUV", "AWD"],
    imageBadges: [
      { label: "Clean Carfax", type: "cleanCarfax" },
      { label: "Great Deal", type: "greatDeal" },
    ],
  },
  {
    name: "2015 Dodge Grand Caravan SE",
    mileage: "185,000 km",
    price: 8995,
    priceDisplay: "$8,995",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Dodge%20Grand%20Caravan%20SE%203.6%202015%20%2823281927634%29.jpg",
    description:
      "Affordable family minivan with practical seating, cargo flexibility, and strong value for budget-conscious buyers.",
    badges: ["Minivan", "Family Value", "Budget Friendly"],
    imageBadges: [
      { label: "Family Value", type: "family" },
      { label: "Budget Friendly", type: "greatDeal" },
    ],
  },
  {
    name: "2020 Ford Transit T-250 Medium Roof",
    mileage: "97,000 km",
    price: 31995,
    priceDisplay: "$31,995",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/2023%20Ford%20Transit%20250%20Medium%20Roof%20130%22%20WB%20AWD%20in%20Oxford%20White%2C%20front%20right%2C%202025-05-02.jpg",
    description:
      "Commercial cargo van with medium roof utility, strong business demand, and excellent work-ready flexibility.",
    badges: ["Cargo Van", "Business Ready", "Medium Roof"],
    imageBadges: [
      { label: "Commercial Ready", type: "commercialReady" },
      { label: "Medium Roof", type: "van" },
    ],
  },
  {
    name: "2018 Ford Transit Connect XL",
    mileage: "142,000 km",
    price: 17995,
    priceDisplay: "$17,995",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/2018%20Ford%20Transit%20Connect%20200%201.5%20Front.jpg",
    description:
      "Compact commercial van ideal for deliveries, trades, service routes, and small business operations.",
    badges: ["Compact Van", "Commercial", "Fuel Efficient"],
    imageBadges: [
      { label: "Commercial", type: "commercial" },
      { label: "Fuel Efficient", type: "fuel" },
    ],
  },
  {
    name: "2012 RAM 1500 SLT 4x4 White",
    mileage: "198,000 km",
    price: 14995,
    priceDisplay: "$14,995",
    image:
      "https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?auto=format&fit=crop&w=1200&q=80",
    description:
      "White full-size pickup with 4x4 capability, work-truck appeal, towing utility, and strong value in the used truck market.",
    badges: ["4x4", "Pickup", "Work Truck"],
    imageBadges: [
      { label: "4x4", type: "truck" },
      { label: "Work Truck", type: "commercial" },
    ],
  },
  {
    name: "2020 Toyota Sienna LE White",
    mileage: "128,000 km",
    price: 28995,
    priceDisplay: "$28,995",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/2020%20Toyota%20Sienna%20FWD%20LE%208-Passenger%20in%20Super%20White%2C%20front%20right.jpg",
    description:
      "White family minivan with Toyota reliability, strong resale value, spacious seating, and high demand among GTA families.",
    badges: ["Minivan", "Family", "Toyota Reliability"],
    imageBadges: [
      { label: "Family Van", type: "family" },
      { label: "Clean Title", type: "cleanTitle" },
    ],
  },
  {
    name: "2020 Porsche 911 Carrera Black",
    mileage: "39,000 km",
    price: 119995,
    priceDisplay: "$119,995",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    description:
      "Black premium sports coupe with iconic performance, luxury presence, and high-end enthusiast appeal.",
    badges: ["Sports Car", "Luxury", "Performance"],
    imageBadges: [
      { label: "Luxury Pick", type: "luxury" },
      { label: "Performance", type: "performance" },
    ],
  },
];

export const services = [
  {
    title: "Used Vehicle Sales",
    text: "Hand-selected inventory with transparent pricing, history review, and clear buying guidance.",
  },
  {
    title: "Vehicle Sourcing",
    text: "Tell us what you want. We search retail, wholesale, auction, and dealer networks across Ontario.",
  },
  {
    title: "Accident & Bodywork Support",
    text: "Repair direction, safety readiness, resale planning, and practical post-accident support.",
  },
  {
    title: "Dealer / Auction Consulting",
    text: "Auction analysis, max bid strategy, repair cost review, and flip-profit calculations.",
  },
];

export const financeHighlights = [
  {
    title: "Fast Pre-Approval",
    text: "Understand your budget early so you can shop with confidence and clarity.",
  },
  {
    title: "All Credit Welcome",
    text: "Newcomers, first-time buyers, and credit rebuilders — we work with specialized lenders.",
  },
  {
    title: "Transparent Terms",
    text: "Rate, term, payment, and total cost explained before you commit to anything.",
  },
];

export const tradeInSteps = [
  "Share vehicle details",
  "Receive market-based estimate",
  "Apply trade value toward next purchase",
];

export const footerQuickLinks = [
  ...navLinks,
  { href: "#guide", label: "Auto Maven Guide" },
];
