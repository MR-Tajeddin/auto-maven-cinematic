"use client";
import { FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function RequestForm({kind}:{kind:"estimate"|"contact"}){
 function submit(e:FormEvent<HTMLFormElement>){
 e.preventDefault();
 const data=new FormData(e.currentTarget);
 const labels:Record<string,string>={fullName:"Name",email:"Email",phone:"Phone",contactMethod:"Preferred contact",year:"Year",make:"Make",model:"Model",repairType:"Repair type",insurance:"Claim status",description:"Details"};
 const lines=[kind==="estimate"?"Hi Auto Maven, I would like a preliminary repair estimate.":"Hi Auto Maven, I have an inquiry."];
 for(const [key,label] of Object.entries(labels)){const value=data.get(key);if(value)lines.push(label+": "+String(value));}
 if(kind==="estimate")lines.push("I will attach damage photos in this chat.");
 window.location.assign("https://wa.me/14167868958?text="+encodeURIComponent(lines.join("\n")));
 }
 return <form className="form-panel" onSubmit={submit} aria-label={kind==="estimate"?"Auto body repair estimate request":"Contact Auto Maven"}>
  <h2 className="form-section-title"><span>01</span>{kind==="estimate"?"Get your auto body repair estimate":"Send us a message"}</h2>
  <p className="form-required">Fields marked * are required.</p>
  <div className="honeypot" aria-hidden="true"><label htmlFor="company-website">Website</label><input id="company-website" name="website" tabIndex={-1} autoComplete="off"/></div>
  <div className="fields">
   <div className="field full"><label htmlFor="fullName">Full name <b>*</b></label><input id="fullName" name="fullName" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your full name"/></div>
   <div className="field full-mobile"><label htmlFor="email">Email address <b>*</b></label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com"/></div>
   <div className="field full-mobile"><label htmlFor="phone">Phone number <b>*</b></label><input id="phone" name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={25} placeholder="(416) 555-0123"/></div>
   <div className="field full"><label htmlFor="contactMethod">Preferred contact method <b>*</b></label><select id="contactMethod" name="contactMethod" required defaultValue=""><option value="" disabled>Select a contact method</option><option value="Phone">Phone call</option><option value="Email">Email</option><option value="Text">Text message</option></select></div>
  </div>
  {kind==="estimate"&&<>
   <h2 className="form-section-title"><span>02</span>Your vehicle & repair needs</h2>
   <div className="fields">
    <div className="field"><label htmlFor="year">Vehicle year <b>*</b></label><input id="year" name="year" type="number" inputMode="numeric" min={1900} max={new Date().getFullYear()+1} required placeholder="2022"/></div>
    <div className="field"><label htmlFor="make">Make <b>*</b></label><input id="make" name="make" required maxLength={60} placeholder="e.g. Toyota"/></div>
    <div className="field full"><label htmlFor="model">Model <b>*</b></label><input id="model" name="model" required maxLength={80} placeholder="e.g. Camry"/></div>
    <div className="field full-mobile"><label htmlFor="repairType">Repair type <b>*</b></label><select name="repairType" id="repairType" required defaultValue=""><option value="" disabled>Select repair type</option><option value="Accident">Accident damage</option><option value="Cosmetic">Cosmetic repair</option><option value="Not sure">Not sure yet</option></select></div>
    <div className="field full-mobile"><label htmlFor="insurance">Insurance claim status <b>*</b></label><select name="insurance" id="insurance" required defaultValue=""><option value="" disabled>Select claim status</option><option value="No claim">No claim / paying privately</option><option value="Claim started">Claim already started</option><option value="Considering a claim">Considering a claim</option><option value="Not sure">Not sure / prefer to discuss</option></select></div>
   </div>
  </>}
  <div className="field full" style={{marginTop:20}}><label htmlFor="description">{kind==="estimate"?"Describe the damage":"How can we help?"} <b>*</b></label><textarea name="description" id="description" required minLength={10} maxLength={4000} rows={4} placeholder={kind==="estimate"?"Tell us which areas are damaged and what you’d like us to look at…":"Tell us a little about your inquiry…"}/></div>
  {kind==="estimate"&&<p className="upload-tip">Continue to WhatsApp, then attach 5–10 clear photos of your vehicle. Photos are sent in WhatsApp, not uploaded to this website.</p>}
  <label className="check-field"><input type="checkbox" name="consent" required value="yes"/><span>I agree that AUTO MAVEN INC. may use my details{kind==="estimate"?" and photos":""} to review and respond to this inquiry. I have read the <Link href="/privacy" target="_blank" rel="noopener">privacy notice</Link>. <b>*</b></span></label>
  <button type="submit" className="button gold form-submit">Continue in WhatsApp <ArrowUpRight size={18}/></button><p className="form-note">This opens a prepared message. Review it, attach photos if needed, and press Send in WhatsApp to contact us.</p>
  <p className="form-note">Auto Body & Paint Shop — Coming Soon. {kind==="estimate"?"Online estimates are preliminary and may change following an in-person inspection. ":""}Sending an inquiry does not confirm a repair appointment.</p>
 </form>;
}
