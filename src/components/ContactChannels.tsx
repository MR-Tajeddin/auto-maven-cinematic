import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaSms,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import {
  dealershipEmail,
  getWhatsAppUrl,
  phoneDisplay,
  phoneHref,
  smsHref,
} from "@/lib/site-data";

const glassCard =
  "rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl";

type ContactChannel = {
  label: string;
  subtitle: string;
  href: string;
  Icon: IconType;
  meta?: string;
  external: boolean;
};

const channels: ContactChannel[] = [
  {
    label: "WhatsApp",
    subtitle: "Fastest response",
    href: getWhatsAppUrl(
      "Hi Auto Maven, I found your website and would like more information.",
    ),
    Icon: FaWhatsapp,
    external: true,
  },
  {
    label: "Call",
    subtitle: "Speak directly",
    href: phoneHref,
    Icon: FaPhoneAlt,
    meta: phoneDisplay,
    external: false,
  },
  {
    label: "Text Message",
    subtitle: "Quick questions",
    href: smsHref,
    Icon: FaSms,
    external: false,
  },
  {
    label: "Email",
    subtitle: "Documents & details",
    href: `mailto:${dealershipEmail}`,
    Icon: FaEnvelope,
    meta: dealershipEmail,
    external: false,
  },
  {
    label: "Telegram",
    subtitle: "Updates & direct chat",
    href: "https://t.me/automaven",
    Icon: FaTelegramPlane,
    external: true,
  },
  {
    label: "Instagram",
    subtitle: "Inventory & reels",
    href: "https://instagram.com/automaven.ca",
    Icon: FaInstagram,
    external: true,
  },
  {
    label: "Facebook",
    subtitle: "Community updates",
    href: "https://facebook.com/automavenca",
    Icon: FaFacebookF,
    external: true,
  },
  {
    label: "LinkedIn",
    subtitle: "Business profile",
    href: "https://linkedin.com/company/auto-maven",
    Icon: FaLinkedinIn,
    external: true,
  },
];

export default function ContactChannels() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {channels.map(({ label, subtitle, href, Icon, meta, external }) => (
        <a
          key={label}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className={`${glassCard} group flex items-center gap-5 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[#d4af37]/50 hover:bg-white/[0.07] md:p-6`}
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] transition duration-300 group-hover:border-[#d4af37]/50 group-hover:bg-[#d4af37]/15">
            <Icon className="h-6 w-6" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-bold text-white md:text-xl">
              {label}
            </span>
            <span className="mt-1 block text-sm text-white/50">{subtitle}</span>
            {meta && (
              <span className="mt-2 block truncate text-sm font-medium text-[#d4af37]">
                {meta}
              </span>
            )}
          </span>
        </a>
      ))}
    </div>
  );
}
