import type { VehicleImageBadge } from "@/lib/site-data";

/** Max badges shown on card images (keeps layout clean). */
export const MAX_IMAGE_BADGES = 3;

/**
 * Future Google Sheet columns can map to imageBadges via type:
 * carfax, cleanCarfax, lowKm, oneOwner, cleanTitle, greatDeal,
 * freshSafety, commercialReady, commercial, luxury, highDemand,
 * family, truck, van, fuel, performance
 */
export function getImageBadgeClass(type: VehicleImageBadge["type"]): string {
  const base =
    "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold backdrop-blur-md";

  switch (type) {
    case "carfax":
      return `${base} border-white/25 bg-black/80 text-white`;
    case "cleanCarfax":
      return `${base} border-emerald-400/35 bg-black/75 text-white`;
    case "lowKm":
      return `${base} border-emerald-400/40 bg-emerald-500/18 text-emerald-200`;
    case "oneOwner":
      return `${base} border-blue-400/40 bg-blue-500/18 text-blue-200`;
    case "cleanTitle":
      return `${base} border-white/30 bg-white/15 text-white`;
    case "greatDeal":
      return `${base} border-[#d4af37]/45 bg-[#d4af37]/20 text-[#f5d56b]`;
    case "freshSafety":
      return `${base} border-teal-400/40 bg-teal-500/18 text-teal-100`;
    case "commercial":
    case "commercialReady":
      return `${base} border-orange-400/40 bg-orange-500/18 text-orange-200`;
    case "luxury":
      return `${base} border-purple-300/35 bg-purple-500/18 text-purple-100`;
    case "highDemand":
      return `${base} border-[#d4af37]/40 bg-[#d4af37]/15 text-[#e6c35c]`;
    case "family":
      return `${base} border-sky-400/35 bg-sky-500/15 text-sky-100`;
    case "truck":
      return `${base} border-slate-300/30 bg-slate-500/20 text-slate-100`;
    case "van":
    case "fuel":
      return `${base} border-amber-400/35 bg-amber-500/15 text-amber-100`;
    case "performance":
      return `${base} border-red-400/35 bg-red-500/15 text-red-100`;
    default:
      return `${base} border-white/15 bg-black/60 text-white/90`;
  }
}

export function shouldUppercaseBadgeLabel(badge: VehicleImageBadge): boolean {
  if (badge.type === "carfax") return true;
  const shortLabels = ["Low KM", "4x4", "CARFAX"];
  return shortLabels.includes(badge.label) || badge.label.length <= 8;
}
