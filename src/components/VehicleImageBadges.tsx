import type { VehicleImageBadge } from "@/lib/site-data";

type VehicleImageBadgesProps = {
  badges?: VehicleImageBadge[];
};

const MAX_IMAGE_BADGES = 3;

const allowedBadgeTypes = new Set([
  "lowKm",
  "oneOwner",
  "cleanCarfax",
  "greatDeal",
  "highDemand",
]);

function getImageBadgeClass(type: string) {
  const base =
    "inline-flex w-fit items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-black shadow-lg backdrop-blur-md ring-1";

  switch (type) {
    case "cleanCarfax":
      return `${base} bg-black/85 text-white ring-white/25`;
    case "lowKm":
      return `${base} bg-emerald-500/25 text-emerald-100 ring-emerald-300/55`;
    case "oneOwner":
      return `${base} bg-blue-500/25 text-blue-100 ring-blue-300/55`;
    case "greatDeal":
      return `${base} bg-[#d4af37]/30 text-[#ffe08a] ring-[#d4af37]/65`;
    case "highDemand":
      return `${base} bg-orange-500/25 text-orange-100 ring-orange-300/55`;
    default:
      return `${base} bg-black/75 text-white ring-white/20`;
  }
}

function normalizeLabel(label: string) {
  return label.trim();
}

export default function VehicleImageBadges({ badges = [] }: VehicleImageBadgesProps) {
  const visible = badges
    .filter((badge) => allowedBadgeTypes.has(badge.type))
    .slice(0, MAX_IMAGE_BADGES);

  if (visible.length === 0) return null;

  return (
    <div className="absolute left-3 top-3 z-10 flex max-w-[92%] flex-wrap gap-2">
      {visible.map((badge) => (
        <span
          key={`${badge.type}-${badge.label}`}
          className={getImageBadgeClass(badge.type)}
        >
          {badge.type === "cleanCarfax" && (
            <>
              <span className="h-2.5 w-2.5 rounded-sm bg-red-500" aria-hidden />
              <span className="tracking-wide">CARFAX</span>
            </>
          )}

          {badge.type !== "cleanCarfax" && (
            <>
              {badge.type === "lowKm" && (
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" aria-hidden />
              )}
              {badge.type === "oneOwner" && (
                <span className="h-2.5 w-2.5 rounded-full bg-blue-300" aria-hidden />
              )}
              {badge.type === "greatDeal" && (
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffe08a]" aria-hidden />
              )}
              {badge.type === "highDemand" && (
                <span className="h-2.5 w-2.5 rounded-full bg-orange-300" aria-hidden />
              )}
              <span className="tracking-wide">{normalizeLabel(badge.label)}</span>
            </>
          )}
        </span>
      ))}
    </div>
  );
}
