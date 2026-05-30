"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks, phoneDisplay, phoneHref } from "@/lib/site-data";

type SiteChromeProps = {
  businessHours: string;
  dealershipAddress: string;
};

const SCROLL_TOP_THRESHOLD = 80;
const INVENTORY_REVEAL_OFFSET = 100;

export default function SiteChrome({
  businessHours,
  dealershipAddress,
}: SiteChromeProps) {
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    const updateChrome = () => {
      const scrollY = window.scrollY;
      const inventory = document.getElementById("inventory");

      if (!inventory) {
        setHeaderVisible(true);
        return;
      }

      const inventoryTop = inventory.offsetTop;

      if (scrollY <= SCROLL_TOP_THRESHOLD) {
        setHeaderVisible(true);
        return;
      }

      if (scrollY >= inventoryTop - INVENTORY_REVEAL_OFFSET) {
        setHeaderVisible(true);
        return;
      }

      setHeaderVisible(false);
    };

    updateChrome();
    window.addEventListener("scroll", updateChrome, { passive: true });
    window.addEventListener("resize", updateChrome);

    return () => {
      window.removeEventListener("scroll", updateChrome);
      window.removeEventListener("resize", updateChrome);
    };
  }, []);

  const chromeClass = headerVisible
    ? "translate-y-0 opacity-100 pointer-events-auto"
    : "pointer-events-none -translate-y-full opacity-0";

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${chromeClass}`}
      aria-hidden={!headerVisible}
    >
      <div className="border-b border-white/[0.08] bg-[#050a14]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-5 py-2.5 text-xs text-[#c4c9d4] md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a
              href={phoneHref}
              className="font-medium text-white transition hover:text-[#d4af37]"
            >
              {phoneDisplay}
            </a>
            <span className="hidden text-white/20 md:inline">|</span>
            <span>{dealershipAddress}</span>
          </div>
          <p className="text-white/55">{businessHours}</p>
        </div>
      </div>

      <header className="border-b border-white/[0.08] bg-[#03050a]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2.5">
          <a
            href="#"
            className="relative h-10 w-36 shrink-0 overflow-hidden rounded-lg border border-white/10"
          >
            <Image
              src="/brand/logo.jpeg"
              alt="Auto Maven"
              fill
              sizes="144px"
              className="object-cover"
              priority
            />
          </a>

          <nav className="hidden items-center gap-6 text-sm text-[#c4c9d4] lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition hover:text-[#d4af37]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={phoneHref}
              className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#d4af37] hover:text-[#d4af37] sm:inline-flex"
            >
              Call Now
            </a>
            <a
              href="#contact"
              className="rounded-full bg-[#d4af37] px-4 py-2 text-sm font-bold text-black transition hover:bg-[#e6c35c] sm:px-5"
            >
              Contact Us
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}
