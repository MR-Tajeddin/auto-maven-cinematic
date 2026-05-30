"use client";

import { useState } from "react";
import { getWhatsAppUrl } from "@/lib/site-data";

const intentOptions = [
  "Buy a Vehicle",
  "Sell My Vehicle",
  "Trade-In",
  "Apply for Financing",
  "Source a Specific Vehicle",
  "General Inquiry",
];

export default function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [intent, setIntent] = useState("");
  const [message, setMessage] = useState("");

  const whatsappHref = getWhatsAppUrl(
    [
      "Hi Auto Maven,",
      fullName && `My name is ${fullName}.`,
      phone && `Phone: ${phone}.`,
      email && `Email: ${email}.`,
      intent && `I want to: ${intent}.`,
      message && message,
    ]
      .filter(Boolean)
      .join(" "),
  );

  const fieldClass =
    "w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[#d4af37]/60 focus:ring-1 focus:ring-[#d4af37]/30";

  return (
    <div className="grid gap-4">
      <input
        className={fieldClass}
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        className={fieldClass}
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        className={fieldClass}
        placeholder="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <select
        className={fieldClass}
        value={intent}
        onChange={(e) => setIntent(e.target.value)}
      >
        <option value="">I want to...</option>
        {intentOptions.map((option) => (
          <option key={option} value={option} className="bg-[#0a0f1a]">
            {option}
          </option>
        ))}
      </select>
      <textarea
        className={`${fieldClass} min-h-32 resize-y`}
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="rounded-full bg-[#d4af37] px-6 py-3 text-center text-sm font-bold text-black transition hover:bg-[#e6c35c]"
      >
        Send Message on WhatsApp
      </a>
    </div>
  );
}
