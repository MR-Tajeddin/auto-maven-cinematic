"use client";

import VehicleImageBadges from "@/components/VehicleImageBadges";
import VehicleInventoryImage from "@/components/VehicleInventoryImage";
import {
  FINANCE_ESTIMATE_EVENT,
  getWhatsAppUrl,
  siteUrl,
  type Vehicle,
} from "@/lib/site-data";

const glassCard =
  "rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl";

const vehiclePageLink = `${siteUrl}/#inventory`;

type VehicleInventoryCardProps = {
  vehicle: Vehicle;
};

function roundDownPayment(price: number) {
  return Math.round((price * 0.3) / 500) * 500;
}

function buildInquiryMessage(vehicle: Vehicle) {
  return [
    "Hi Auto Maven, I would like more information about this vehicle:",
    "",
    `Vehicle: ${vehicle.name}`,
    `Mileage: ${vehicle.mileage}`,
    `Price: ${vehicle.priceDisplay}`,
    `Page: ${vehiclePageLink}`,
    "",
    "Please send me more details, availability, and next steps.",
  ].join("\n");
}

export default function VehicleInventoryCard({ vehicle }: VehicleInventoryCardProps) {
  const handleFinanceEstimate = () => {
    const downPayment = Math.min(roundDownPayment(vehicle.price), vehicle.price);

    window.dispatchEvent(
      new CustomEvent(FINANCE_ESTIMATE_EVENT, {
        detail: {
          vehiclePrice: vehicle.price,
          downPayment,
          interestRate: 10,
          termMonths: 36,
          vehicleName: vehicle.name,
        },
      }),
    );

    document.getElementById("finance")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <article
      className={`${glassCard} group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/35`}
    >
      <div className="relative h-52 shrink-0 overflow-hidden">
        <VehicleInventoryImage
          src={vehicle.image}
          alt={vehicle.name}
          name={vehicle.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03050a]/90 via-[#03050a]/10 to-transparent" />

        <VehicleImageBadges badges={vehicle.imageBadges ?? []} />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold leading-snug text-white">
          {vehicle.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/50">
          {vehicle.description}
        </p>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-white/10 pt-4">
          <span className="text-sm text-[#c4c9d4]">{vehicle.mileage}</span>
          <span className="text-2xl font-black text-[#d4af37]">
            {vehicle.priceDisplay}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {vehicle.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-[#d4af37]/20 bg-[#d4af37]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#e6c35c]"
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <button
            type="button"
            onClick={handleFinanceEstimate}
            className="rounded-full bg-[#d4af37] px-3 py-2.5 text-center text-xs font-bold text-black transition hover:bg-[#e6c35c]"
          >
            Finance Estimate
          </button>
          <a
            href={getWhatsAppUrl(buildInquiryMessage(vehicle))}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 bg-black/30 px-3 py-2.5 text-center text-xs font-bold text-white backdrop-blur transition hover:border-[#d4af37]/50 hover:text-[#d4af37]"
          >
            Request More Info
          </a>
        </div>
      </div>
    </article>
  );
}
