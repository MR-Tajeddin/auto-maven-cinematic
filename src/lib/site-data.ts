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

export const siteUrl = "https://www.automaven.ca";
export const dealershipEmail = "info@automaven.ca";
export const smsHref = "sms:+14167868958";

export const legalDisclaimer =
  "Auto Maven provides automotive consulting, vehicle sourcing assistance, market guidance, and related support. Auto Maven is not currently registered as a motor vehicle dealer. Vehicle sales, payment arrangements, licensing, and final transaction paperwork, where applicable, are completed through an OMVIC-registered dealer or licensed partner.";

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
  const message = `Hi Auto Maven, I would like sourcing guidance about this vehicle type:

Vehicle example: ${vehicle.name}
Mileage: ${vehicle.mileage}
Reference price: ${vehicle.priceDisplay}
Page: ${siteUrl}/#inventory

Please send me market guidance and next steps.`;

  return getWhatsAppUrl(message);
}

export const navLinks = [
  { href: "#inventory", label: "Market Examples" },
  { href: "#find-my-car", label: "Find My Car" },
  { href: "#finance", label: "Payment Guide" },
  { href: "#trade", label: "Trade-In" },
  { href: "#services", label: "Services" },
  { href: "#location", label: "Location" },
  { href: "#contact", label: "Contact" },
];

export const sourcingSteps = [
  {
    title: "Share Your Criteria",
    text: "Tell us what vehicle you want and your target budget.",
  },
  {
    title: "We Search the Market",
    text: "We review retail, wholesale, auction, and dealer-market options.",
  },
  {
    title: "Review Your Options",
    text: "We send suitable examples with clear market guidance and next steps.",
  },
];

export const sourcingTrustBadges = [
  "Market-Based Search",
  "Toronto/GTA",
  "Wholesale + Retail Insight",
  "Sourcing Support",
];

export const heroTrustBadges = [
  "Vehicle Sourcing",
  "Toronto/GTA",
  "Wholesale + Retail Insight",
  "Payment Estimate Guidance",
];

export const trustStrip = [
  {
    title: "Sourcing Support",
    description:
      "Guidance for locating suitable vehicles through retail, wholesale, auction, and partner channels.",
  },
  {
    title: "Market-Based Guidance",
    description:
      "Advice grounded in wholesale, retail, and real GTA market movement.",
  },
  {
    title: "Payment Estimate Support",
    description:
      "Estimate payment scenarios with transparent inputs before you move forward.",
  },
  {
    title: "Trade-In Guidance",
    description:
      "Understand market value, resale position, and practical next steps for your current vehicle.",
  },
];

/**
 * Badge types map directly to future Google Sheet boolean columns.
 * Do not infer these in code; set them from inventory data:
 * lowKm, noAccident, oneOwner.
 */
export type VehicleImageBadgeType = "lowKm" | "noAccident" | "oneOwner";

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
  /** Future Google Sheet fields can map to imageBadges: lowKm, noAccident, oneOwner. */
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
      "Premium compact luxury sedan example with AWD confidence, sport styling, and strong Toronto/GTA market appeal.",
    badges: ["AWD", "Luxury Sedan", "Premium Sedan"],
    imageBadges: [
      { label: "Low KM", type: "lowKm" },
      { label: "No Accident", type: "noAccident" },
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
      "Compact SUV sourcing example with Toyota reliability, strong demand, and family-friendly utility.",
    badges: ["AWD", "SUV", "High Demand"],
    imageBadges: [
      { label: "Low KM", type: "lowKm" },
      { label: "No Accident", type: "noAccident" },
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
      "Compact sedan sourcing example with low ownership cost, strong resale value, and everyday usability.",
    badges: ["Sedan", "Fuel Efficient", "Compact"],
    imageBadges: [
      { label: "Low KM", type: "lowKm" },
      { label: "One Owner", type: "oneOwner" },
      { label: "No Accident", type: "noAccident" },
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
      "Full-size pickup sourcing example with 4x4 capability, towing utility, and broad GTA buyer appeal.",
    badges: ["4x4", "Truck", "Tow Utility"],
    imageBadges: [
      { label: "Low KM", type: "lowKm" },
      { label: "No Accident", type: "noAccident" },
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
      "Sport luxury sedan example with xDrive AWD, premium interior, and attractive market demand.",
    badges: ["xDrive", "Sport Sedan", "Luxury"],
    imageBadges: [
      { label: "Low KM", type: "lowKm" },
      { label: "No Accident", type: "noAccident" },
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
      "Premium AWD SUV example with quattro traction, leather, and strong used luxury SUV demand.",
    badges: ["quattro", "Luxury SUV", "AWD"],
    imageBadges: [
      { label: "Low KM", type: "lowKm" },
      { label: "No Accident", type: "noAccident" },
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
      "Affordable family minivan example with practical seating, cargo flexibility, and budget-friendly value.",
    badges: ["Minivan", "Family", "Budget Friendly"],
    imageBadges: [
      { label: "Low KM", type: "lowKm" },
      { label: "No Accident", type: "noAccident" },
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
      "Commercial cargo van example with medium roof utility, strong business demand, and work-ready flexibility.",
    badges: ["Cargo Van", "Business Ready", "Medium Roof"],
    imageBadges: [
      { label: "Low KM", type: "lowKm" },
      { label: "No Accident", type: "noAccident" },
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
      "Compact commercial van example for deliveries, trades, service routes, and small business use.",
    badges: ["Compact Van", "Commercial", "Fuel Efficient"],
    imageBadges: [
      { label: "Low KM", type: "lowKm" },
      { label: "No Accident", type: "noAccident" },
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
      "Full-size pickup example with 4x4 capability, work-truck appeal, towing utility, and used-truck value.",
    badges: ["4x4", "Pickup", "Work Truck"],
    imageBadges: [
      { label: "Low KM", type: "lowKm" },
      { label: "No Accident", type: "noAccident" },
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
      "Family minivan example with Toyota reliability, strong resale value, spacious seating, and high GTA demand.",
    badges: ["Minivan", "Family", "Toyota Reliability"],
    imageBadges: [
      { label: "Low KM", type: "lowKm" },
      { label: "No Accident", type: "noAccident" },
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
      "Premium sports coupe example with iconic performance, luxury presence, and enthusiast appeal.",
    badges: ["Sports Car", "Luxury", "Sports Coupe"],
    imageBadges: [
      { label: "Low KM", type: "lowKm" },
      { label: "One Owner", type: "oneOwner" },
      { label: "No Accident", type: "noAccident" },
    ],
  },
];

export const services = [
  {
    title: "Vehicle Purchase Guidance",
    text: "Market research, history review, pricing context, and clear next-step guidance before you commit.",
  },
  {
    title: "Vehicle Sourcing Support",
    text: "Tell us what you want. We help review retail, wholesale, auction, and partner-market options across Ontario.",
  },
  {
    title: "Accident & Bodywork Support",
    text: "Repair direction, safety readiness, resale planning, and practical post-accident support.",
  },
  {
    title: "Dealer / Auction Consulting",
    text: "Auction analysis, max-bid strategy, repair cost review, and resale-potential calculations.",
  },
];

export const financeHighlights = [
  {
    title: "Budget Planning",
    text: "Understand a realistic payment range early so you can shop with confidence and clarity.",
  },
  {
    title: "Scenario Guidance",
    text: "Compare down payment, rate, and term assumptions before speaking with a licensed dealer or lender.",
  },
  {
    title: "Transparent Inputs",
    text: "Rate, term, payment, and total-cost assumptions are shown clearly before you move forward.",
  },
];

export const tradeInSteps = [
  "Share vehicle details",
  "Receive market-based guidance",
  "Review options with a licensed partner where applicable",
];

export const footerQuickLinks = [
  ...navLinks,
  { href: "#guide", label: "Auto Maven Guide" },
];
