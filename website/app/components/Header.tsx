"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, ChevronDown, Phone, MessageCircle } from "lucide-react";
const services = [["Auto body repair","/auto-body-repair"],["Paint services","/paint-services"],["Accident assistance","/accident-assistance"],["Other automotive services","/other-services"]];
export default function Header(){
 const [open,setOpen]=useState(false);
 const [servicesOpen,setServicesOpen]=useState(false);
 const path=usePathname();
 useEffect(()=>{setOpen(false);setServicesOpen(false)},[path]);
 useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(false);setServicesOpen(false)}};window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey)},[]);
 return <>
  <a className="skip-link" href="#main">Skip to content</a>
  <div className="announcement"><span className="status-dot"/> AUTO BODY & PAINT FACILITY — COMING SOON <span className="announcement-divider">|</span><span className="announcement-extra"> A new standard of care is on its way.</span><Link href="/contact">Get in touch <ArrowUpRight size={13}/></Link></div>
  <header className="site-header"><div className="container nav-wrap">
   <Link href="/" className="brand" aria-label="Auto Maven home"><img src="/images/auto-maven-logo.jpg" width="180" height="94" alt="AUTO MAVEN official owl logo"/><span className="brand-caption">AUTO BODY & PAINT</span></Link>
   <nav className={open?"main-nav is-open":"main-nav"} aria-label="Main navigation">
    <Link href="/" aria-current={path==="/"?"page":undefined}>Home</Link>
    <div className="nav-dropdown"><button onClick={()=>setServicesOpen(!servicesOpen)} aria-expanded={servicesOpen} aria-controls="services-menu" className={path.includes("repair")||path.includes("services")?"active":""}>Our services <ChevronDown size={13}/></button>{servicesOpen&&<div id="services-menu" className="dropdown-panel">{services.map(([name,url])=><Link key={url} href={url}>{name}<ArrowUpRight size={14}/></Link>)}</div>}</div>
    <Link href="/gallery" aria-current={path==="/gallery"?"page":undefined}>Before & after</Link>
    <Link href="/about" aria-current={path==="/about"?"page":undefined}>About us</Link>
    <Link href="/contact" aria-current={path==="/contact"?"page":undefined}>Contact</Link>
   </nav>
   <Link className="button gold nav-cta" href="/estimate">Get an estimate <ArrowUpRight size={17}/></Link>
   <button className="menu-toggle" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
  </div></header>
  <a className="whatsapp-float" href="https://wa.me/14167868958?text=Hi%20Auto%20Maven%2C%20I%20would%20like%20to%20send%20photos%20for%20a%20repair%20estimate." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Auto Maven to send photos and request an estimate"><MessageCircle size={23}/><span>WhatsApp</span></a>
  <div className="mobile-action-bar"><a href="tel:+14167868958"><Phone size={17}/> Call now</a><Link href="/estimate">Get an estimate <ArrowUpRight size={17}/></Link></div>
 </>;
}
