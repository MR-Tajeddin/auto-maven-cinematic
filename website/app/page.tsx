import Link from "next/link";
import { ArrowUpRight, ArrowRight, Phone, ShieldCheck, MessageCircle, Sparkles, Camera, ClipboardCheck, CarFront, Paintbrush, Wrench, LifeBuoy, Check } from "lucide-react";
import { Comparison } from "./components/Comparisons";
import { EstimateCTA } from "./components/Shared";

const services = [
  { n: "01", title: "Collision repair", text: "A clear path forward after an accident. Planned repair solutions for collision-damaged vehicles.", icon: CarFront, link: "/auto-body-repair", tag: "RESTORE YOUR CONFIDENCE" },
  { n: "02", title: "Auto body repair", text: "From individual body panels to everyday dents, attention to the details that make a difference.", icon: Wrench, link: "/auto-body-repair", tag: "BRING BACK THE DETAILS" },
  { n: "03", title: "Automotive painting", text: "Refinishing, colour matching and paint correction. A considered approach to a beautiful finish.", icon: Paintbrush, link: "/paint-services", tag: "FINISH WITH PRECISION" },
  { n: "04", title: "Bumper repair", text: "Repair, restoration and replacement options for damaged bumpers.", icon: ShieldCheck, link: "/auto-body-repair#bumper-repair" },
  { n: "05", title: "Dent & scratch repair", text: "Planned solutions for dents, scratches and cosmetic body damage.", icon: Sparkles, link: "/auto-body-repair#dent-scratch" },
  { n: "06", title: "Accident assistance", text: "Guidance with the next steps, damage information and repair inquiries.", icon: LifeBuoy, link: "/accident-assistance" },
];

export default function Home() {
  return <>
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> OPENING SOON IN ONTARIO</div>
          <h1>Auto body repair<br />& <em>paint solutions.</em></h1>
          <h2>From Accident to Repair —<br className="desktop-break" /> We Handle It All.</h2>
          <p>A fresh start for your vehicle. Thoughtful repair solutions, clear communication and a finish worth looking forward to.</p>
          <div className="button-row">
            <Link className="button gold" href="/estimate">Get an estimate <ArrowUpRight size={18} /></Link>
            <a className="button outline" href="tel:+14167868958"><Phone size={16} /> (416) 786-8958</a>
          </div>
          <a className="hero-note" href="https://wa.me/14167868958?text=Hi%20Auto%20Maven%2C%20I%20would%20like%20an%20auto%20body%20repair%20estimate.%20I%20will%20send%20photos%20of%20the%20damage." target="_blank" rel="noopener noreferrer"><MessageCircle size={15} /> Send damage photos on WhatsApp →</a>
        </div>
        <div className="hero-visual">
          <div className="visual-topline"><span>THE ART OF A FRESH START</span><span>01 / AUTO MAVEN</span></div>
          <Comparison image="/images/collision-demo.webp" title="Collision repair transformation" hero />
          <div className="visual-bottomline"><span><span className="tiny-gold-dot" /> A NEW PERSPECTIVE ON REPAIR</span><span>Drag to explore <ArrowRight size={13} /></span></div>
        </div>
      </div>
      <div className="container promise-strip">
        <div><ShieldCheck /><span>Care in every detail</span></div>
        <div><MessageCircle /><span>Clear, honest communication</span></div>
        <div><Sparkles /><span>Your vehicle. Our focus.</span></div>
        <a href="/about">Meet Auto Maven <ArrowUpRight size={17} /></a>
      </div>
    </section>
    <section className="section light" id="services">
      <div className="container">
        <div className="section-heading">
          <div><span className="eyebrow">BUILT AROUND YOUR VEHICLE</span><h2>Complete body.<br /><span className="muted-heading">Exceptional finish.</span></h2></div>
          <div className="heading-aside"><p>Auto body and paint are at the heart of what we’re building.</p><span className="pill">PLANNED SERVICES · COMING SOON</span></div>
        </div>
        <div className="service-grid">{services.map((s, i) => <Link className={"service-card " + (i < 3 ? "featured-service" : "")} href={s.link} key={s.n}>
          <div className="service-top"><s.icon size={29} strokeWidth={1.4} /><span>{s.n}</span></div>
          {s.tag && <small>{s.tag}</small>}
          <h3>{s.title}<ArrowUpRight size={22} /></h3><p>{s.text}</p>
        </Link>)}</div>
        <div className="service-bottom"><span>More care, beyond body and paint.</span><Link href="/other-services">Explore other automotive services <ArrowRight size={17} /></Link></div>
      </div>
    </section>
    <section className="section about-home">
      <div className="container about-grid">
        <div className="mascot-frame"><img src="/images/auto-maven-mascot.jpg" width="1254" height="1254" alt="The official Auto Maven owl mascot holding car keys and a quality, value and trust checklist" loading="lazy"/><span className="mascot-caption">A WISE CHOICE FOR YOUR VEHICLE.</span></div>
        <div><span className="eyebrow">THE MINDSET BEHIND THE MAVEN</span><h2>Expertise starts<br />with <em>paying attention.</em></h2><p>A maven is someone who knows their craft. At AUTO MAVEN, that means listening carefully, explaining clearly and caring about every detail.</p><p>We’re an Ontario-based company preparing to bring professional auto body, collision repair and automotive painting solutions to our community.</p><ul className="check-list"><li><Check size={16}/> Clear communication from the first conversation</li><li><Check size={16}/> Transparent, considered estimates</li><li><Check size={16}/> A customer-focused repair experience</li></ul><Link className="text-link" href="/about">Get to know Auto Maven <ArrowUpRight size={18}/></Link></div>
      </div>
    </section>
    <EstimateCTA />
  </>;
}
