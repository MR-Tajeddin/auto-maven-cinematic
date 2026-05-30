"use client";

import { FormEvent, useState } from "react";
import { getWhatsAppUrl } from "@/lib/site-data";

// Future upgrade:
// Send this sourcing request to Google Sheets, CRM, or email instead of WhatsApp.

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#d4af37]/60 focus:ring-1 focus:ring-[#d4af37]/30";

const labelClass = "mb-1.5 block text-xs font-medium text-white/60";

function line(label: string, value: string) {
  return value.trim() ? `${label}: ${value.trim()}` : "";
}

export default function VehicleSourcingForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [minimumYear, setMinimumYear] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [paymentType, setPaymentType] = useState("Not Sure");
  const [tradeInAvailable, setTradeInAvailable] = useState("Not Sure");
  const [notes, setNotes] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = [
      "Hi Auto Maven, I would like help finding a vehicle.",
      "",
      "Customer:",
      line("Name", fullName),
      line("Phone", phone),
      "",
      "Vehicle Request:",
      line("Preferred Brand", make),
      line("Preferred Model", model),
      line("Minimum Year", minimumYear),
      line("Maximum Mileage", maxMileage),
      line("Maximum Budget", maxBudget),
      line("Payment Type", paymentType),
      line("Trade-In Available", tradeInAvailable),
      line("Notes / Must-Have Features", notes),
      "",
      "Please send me suitable options and next steps.",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-6"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <label htmlFor="sourcing-name" className={labelClass}>
            Full Name
          </label>
          <input
            id="sourcing-name"
            className={fieldClass}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your name"
            required
          />
        </div>

        <div className="xl:col-span-1">
          <label htmlFor="sourcing-phone" className={labelClass}>
            Phone Number
          </label>
          <input
            id="sourcing-phone"
            className={fieldClass}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (416) 000-0000"
            required
          />
        </div>

        <div className="xl:col-span-1">
          <label htmlFor="sourcing-make" className={labelClass}>
            Preferred Brand / Make
          </label>
          <input
            id="sourcing-make"
            className={fieldClass}
            value={make}
            onChange={(e) => setMake(e.target.value)}
            placeholder="Toyota, Honda, BMW..."
          />
        </div>

        <div>
          <label htmlFor="sourcing-model" className={labelClass}>
            Preferred Model
          </label>
          <input
            id="sourcing-model"
            className={fieldClass}
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="RAV4, Civic, F-150..."
          />
        </div>

        <div>
          <label htmlFor="sourcing-year" className={labelClass}>
            Minimum Year
          </label>
          <input
            id="sourcing-year"
            type="number"
            className={fieldClass}
            value={minimumYear}
            onChange={(e) => setMinimumYear(e.target.value)}
            placeholder="2020"
          />
        </div>

        <div>
          <label htmlFor="sourcing-mileage" className={labelClass}>
            Maximum Mileage
          </label>
          <input
            id="sourcing-mileage"
            className={fieldClass}
            value={maxMileage}
            onChange={(e) => setMaxMileage(e.target.value)}
            placeholder="100,000 km"
          />
        </div>

        <div>
          <label htmlFor="sourcing-budget" className={labelClass}>
            Maximum Budget
          </label>
          <input
            id="sourcing-budget"
            className={fieldClass}
            value={maxBudget}
            onChange={(e) => setMaxBudget(e.target.value)}
            placeholder="$30,000"
          />
        </div>

        <div>
          <label htmlFor="sourcing-payment" className={labelClass}>
            Payment Type
          </label>
          <select
            id="sourcing-payment"
            className={fieldClass}
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            {["Finance", "Cash", "Lease Takeover", "Not Sure"].map((option) => (
              <option key={option} value={option} className="bg-[#0a0f1a]">
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sourcing-trade" className={labelClass}>
            Trade-In Available
          </label>
          <select
            id="sourcing-trade"
            className={fieldClass}
            value={tradeInAvailable}
            onChange={(e) => setTradeInAvailable(e.target.value)}
          >
            {["Yes", "No", "Not Sure"].map((option) => (
              <option key={option} value={option} className="bg-[#0a0f1a]">
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 xl:col-span-3">
          <label htmlFor="sourcing-notes" className={labelClass}>
            Notes / Must-Have Features
          </label>
          <textarea
            id="sourcing-notes"
            className={`${fieldClass} min-h-[110px] resize-y`}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="AWD, 7 seats, hybrid, low KM, one owner, no accident, leather, sunroof, white/black color, etc."
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 w-full rounded-full bg-[#d4af37] px-6 py-4 text-sm font-bold text-black transition hover:bg-[#e6c35c]"
      >
        Send My Car Request
      </button>
    </form>
  );
}
