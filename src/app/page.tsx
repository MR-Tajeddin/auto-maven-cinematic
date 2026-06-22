import Image from "next/image";
import ContactChannels from "@/components/ContactChannels";
import ContactForm from "@/components/ContactForm";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import SiteChrome from "@/components/SiteChrome";
import VehicleInventoryCard from "@/components/VehicleInventoryCard";
import VehicleSourcingForm from "@/components/VehicleSourcingForm";
import FinanceCalculator from "@/components/FinanceCalculator";
import {
  businessHours,
  dealershipAddress,
  dealershipCity,
  financeHighlights,
  footerQuickLinks,
  getWhatsAppUrl,
  legalDisclaimer,
  mapDirectionsUrl,
  mapEmbedUrl,
  phoneDisplay,
  phoneHref,
  services,
  sourcingSteps,
  sourcingTrustBadges,
  tradeInSteps,
  trustStrip,
  vehicles,
} from "@/lib/site-data";

const glassCard =
  "rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#03050a] text-white">
      <SiteChrome
        businessHours={businessHours}
        dealershipAddress={dealershipAddress}
      />

      <ScrollVideoHero />

      {/* 3. Market Examples */}
      <section id="inventory" className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-6 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
            Market Examples
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
            Market & Sourcing Examples
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/50">
            These examples show the type of vehicles Auto Maven can help you
            research, compare, and source through appropriate market channels.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleInventoryCard key={vehicle.name} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* 4. Find My Car */}
      <section
        id="find-my-car"
        className="border-y border-white/[0.08] bg-[#050a14]/50 px-5 py-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
              Find My Car
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Custom Vehicle Sourcing Request
            </h2>
            <p className="mt-2 text-lg font-medium text-[#d4af37]/90">
              Tell us what you want. We&apos;ll help you search the market.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <p className="leading-7 text-white/55">
                Looking for a specific vehicle? Share your ideal make, model,
                budget, mileage, and must-have features. Auto Maven helps review
                retail, wholesale, auction, and partner-market options across
                Toronto and the GTA.
              </p>

              <div className="mt-8 space-y-4">
                {sourcingSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className={`${glassCard} flex gap-4 p-5`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 text-sm font-bold text-[#d4af37]">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-white">{step.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-white/50">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {sourcingTrustBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-3 py-1.5 text-xs font-semibold text-[#e6c35c]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <VehicleSourcingForm />
          </div>
        </div>
      </section>

      {/* 5. Trust Strip */}
      <section className="border-y border-white/[0.08] bg-[#050a14]/80 px-5 py-10">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustStrip.map((item) => (
            <div key={item.title} className={`${glassCard} p-5 transition hover:border-[#d4af37]/30`}>
              <div className="mb-2 h-px w-10 bg-[#d4af37]" />
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#c4c9d4]/80">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Payment Section */}
      <section id="finance" className="border-y border-white/[0.08] bg-[#050a14]/60 px-5 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
              Payment Guide
            </p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">
              Vehicle Payment Estimate
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">
              Estimate a monthly payment scenario using vehicle price, down
              payment, interest rate, and term. This is guidance only.
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-[#c4c9d4]">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                Budget Planning
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                Scenario Guidance
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                Transparent Inputs
              </li>
            </ul>
          </div>

          <div className="mb-6 grid gap-4 md:grid-cols-3">
            {financeHighlights.map((item) => (
              <div key={item.title} className={`${glassCard} p-5`}>
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/50">{item.text}</p>
              </div>
            ))}
          </div>

          <FinanceCalculator defaultVehiclePrice={30000} />
        </div>
      </section>

      {/* 6. Trade-In Section */}
      <section id="trade" className="mx-auto max-w-7xl px-5 py-12">
        <div className={`${glassCard} grid gap-6 p-6 md:p-8 lg:grid-cols-2`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
              Trade-In
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight">
              Trade smarter with market-based guidance
            </h2>
            <p className="mt-5 leading-7 text-white/55">
              We help you review your vehicle using wholesale insight, retail
              demand, and GTA market trends so you understand your position
              before moving forward.
            </p>

            <ol className="mt-6 space-y-4">
              {tradeInSteps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 text-sm font-bold text-[#d4af37]">
                    {index + 1}
                  </span>
                  <span className="pt-1.5 text-[#c4c9d4]">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={getWhatsAppUrl(
                  "Hi Auto Maven, I would like market guidance for my trade-in vehicle.",
                )}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#d4af37] px-7 py-3 text-center text-sm font-bold text-black transition hover:bg-[#e6c35c]"
              >
                Get Trade-In Guidance
              </a>
              <a
                href={phoneHref}
                className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-bold text-white transition hover:border-[#d4af37] hover:text-[#d4af37]"
              >
                Call Now
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Wholesale Insight",
                text: "Auction and dealer-market context behind every estimate.",
              },
              {
                title: "No Pressure",
                text: "Clear numbers explained before you commit to any next step.",
              },
              {
                title: "Market Position",
                text: "Understand how your vehicle may fit into current demand.",
              },
              {
                title: "Sell or Trade",
                text: "Review practical options for selling, trading, or sourcing your next vehicle.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-white/10 bg-black/30 p-5"
              >
                <h3 className="font-bold">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/50">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Auto Maven Guide */}
      <section id="guide" className="border-y border-white/[0.08] bg-[#050a14]/60 px-5 py-12">
        <div className="mx-auto grid max-w-7xl items-center gap-6 lg:grid-cols-2">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem] border border-[#d4af37]/20 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
            <Image
              src="/brand/owl.png"
              alt="Your Auto Maven Guide"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 80vw, 400px"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
              Guidance
            </p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">
              Your Auto Maven Guide
            </h2>
            <p className="mt-4 text-lg leading-7 text-[#c4c9d4]/90">
              We help you understand vehicle history, wholesale value, retail
              price, safety cost, reconditioning, and resale potential before
              you decide.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex rounded-full border border-[#d4af37]/40 px-7 py-3 text-sm font-bold text-[#d4af37] transition hover:bg-[#d4af37]/10"
            >
              Speak With Our Team
            </a>
          </div>
        </div>
      </section>

      {/* 8. Services */}
      <section id="services" className="mx-auto max-w-7xl px-5 py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
          Services
        </p>
        <h2 className="mt-3 text-4xl font-black md:text-5xl">How We Can Help</h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className={`${glassCard} p-6 transition hover:border-[#d4af37]/30`}
            >
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/50">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Location */}
      <section id="location" className="border-t border-white/[0.08] bg-[#050a14]/40 px-5 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
                Location
              </p>
              <h2 className="mt-3 text-4xl font-black">Visit Auto Maven</h2>
              <p className="mt-4 text-lg text-white">{dealershipAddress}</p>
              <p className="mt-1 text-[#c4c9d4]">{dealershipCity}</p>
              <a
                href={phoneHref}
                className="mt-4 inline-block text-lg font-bold text-[#d4af37] transition hover:text-[#e6c35c]"
              >
                {phoneDisplay}
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <iframe
              title="Auto Maven location on Google Maps"
              src={mapEmbedUrl}
              className="h-[320px] w-full border-0 md:h-[400px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={mapDirectionsUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#d4af37] px-7 py-3 text-center text-sm font-bold text-black transition hover:bg-[#e6c35c]"
            >
              Get Directions
            </a>
            <a
              href={getWhatsAppUrl(
                "Hi Auto Maven, I would like to schedule a consultation or vehicle-sourcing discussion.",
              )}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-7 py-3 text-center text-sm font-bold text-white transition hover:border-[#d4af37] hover:text-[#d4af37]"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>

      {/* 10. Contact */}
      <section id="contact" className="px-5 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
              Contact
            </p>
            <h2 className="mt-3 text-4xl font-black">Get in Touch</h2>
            <p className="mt-4 max-w-2xl leading-7 text-white/55">
              Reach Auto Maven your way — WhatsApp for the fastest reply, or use
              call, text, email, and social channels below. We respond with clear
              next steps.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#c4c9d4]">
              <span>{dealershipAddress}</span>
              <span className="text-white/25">·</span>
              <span>{businessHours}</span>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
                Connect With Us
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/50">
                Choose the fastest way to reach Auto Maven. Account links are
                placeholders for now and will be connected to real profiles
                later.
              </p>
              <div className="mt-6">
                <ContactChannels />
              </div>
            </div>

            <div className={`${glassCard} p-6 md:p-8`}>
              <h3 className="text-xl font-bold">Send a Message</h3>
              <p className="mt-2 text-sm text-white/50">
                Your message opens in WhatsApp with your details pre-filled.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="border-t border-white/[0.08] bg-[#050a14] px-5 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-[1.3fr_1fr_1fr]">
            <div>
              <div className="relative h-10 w-36 overflow-hidden rounded-lg border border-white/10">
                <Image
                  src="/brand/logo.jpeg"
                  alt="Auto Maven"
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 max-w-sm text-sm leading-6 text-white/50">
                Automotive consulting, vehicle sourcing assistance, market
                guidance, payment estimate support, and trade-in guidance in
                Toronto and the GTA.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#c4c9d4]">
                Contact
              </p>
              <div className="mt-4 space-y-2 text-sm text-white/50">
                <a href={phoneHref} className="block hover:text-[#d4af37]">
                  {phoneDisplay}
                </a>
                <p>{dealershipAddress}</p>
                <p>{businessHours}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#c4c9d4]">
                Quick Links
              </p>
              <div className="mt-4 grid gap-2 text-sm text-white/50">
                {footerQuickLinks.map((link) => (
                  <a
                    key={link.href + link.label}
                    href={link.href}
                    className="transition hover:text-[#d4af37]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-5 text-white/35">
            {legalDisclaimer}
          </p>
          <p className="mt-4 text-center text-xs text-white/35">
            © {new Date().getFullYear()} Auto Maven. {dealershipAddress}. All
            rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
