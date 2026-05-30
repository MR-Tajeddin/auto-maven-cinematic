import type { VehicleImageBadge } from "@/lib/site-data";

type VehicleImageBadgesProps = {
  badges?: VehicleImageBadge[];
};

const MAX_IMAGE_BADGES = 3;

const allowedBadgeTypes = new Set(["lowKm", "noAccident", "oneOwner"]);

function getImageBadgeClass(type: string) {
  const base =
    "inline-flex w-fit items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-black shadow-lg backdrop-blur-md ring-1";

  switch (type) {
    case "lowKm":
      return `${base} bg-emerald-500/25 text-emerald-100 ring-emerald-300/55`;
    case "noAccident":
      return `${base} bg-black/85 text-white ring-white/25`;
    case "oneOwner":
      return `${base} bg-blue-500/25 text-blue-100 ring-blue-300/55`;
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
          {badge.type === "lowKm" && (
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" aria-hidden />
          )}
          {badge.type === "noAccident" && (
            <span className="h-2.5 w-2.5 rounded-sm bg-red-500" aria-hidden />
          )}
          {badge.type === "oneOwner" && (
            <span className="h-2.5 w-2.5 rounded-full bg-blue-300" aria-hidden />
          )}
          <span className="tracking-wide">{normalizeLabel(badge.label)}</span>
        </span>
      ))}
    </div>
  );
}
