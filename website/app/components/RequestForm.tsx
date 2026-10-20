"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function RequestForm({kind,emailEnabled=false}:{kind:"estimate"|"contact",emailEnabled?:boolean}){
 const [channel,setChannel]=useState<"whatsapp"|"email">("whatsapp");
 const [mode,setMode]=useState<"vin"|"manual">("vin");
 const [vin,setVin]=useState("");
 const [vehicle,setVehicle]=useState({year:"",make:"",model:""});
 const [lookupBusy,setLookupBusy]=useState(false);
 const [lookupMessage,setLookupMessage]=useState("");
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState("");
 const [reference,setReference]=useState("");
 const [photos,setPhotos]=useState<File[]>([]);
 async function lookup(){
  setLookupBusy(true);setLookupMessage("");setVehicle({year:"",make:"",model:""});
  try{const r=await fetch("/api/vin?vin="+encodeURIComponent(vin));const d=await r.json();if(!r.ok)throw Error(d.error);setVehicle({year:d.year,make:d.make,model:d.model});setLookupMessage(d.warning||"Vehicle found. Please check the details below.");}
  catch(e){setLookupMessage(e instanceof Error?e.message:"Lookup failed. Please enter details manually.");}
  finally{setLookupBusy(false)}
 }
 function addPhotos(files:FileList|null){
  if(!files)return;setError("");
  const next=[...photos,...Array.from(files)];
  if(next.length>10){setError("Choose up to 10 photos.");return}
  if(next.some(f=>!["image/jpeg","image/png","image/webp"].includes(f.type)||!f.size)){setError("Use JPG, PNG or WebP photos. Convert HEIC photos first.");return}
  if(next.reduce((s,f)=>s+f.size,0)>3*1024*1024){setError("Keep photos under 3 MB combined, or send full-size photos on WhatsApp.");return}
  setPhotos(next);
 }
 async function submit(e:FormEvent<HTMLFormElement>){
 e.preventDefault();if(busy||lookupBusy)return;setError("");
 const data=new FormData(e.currentTarget);
 if(kind==="estimate"&&channel==="email"){
  if(!emailEnabled){setError("Email submission is not available yet. Please use WhatsApp.");return}
  setBusy(true);photos.forEach(p=>data.append("photos",p));
  try{const r=await fetch("/api/estimate-email",{method:"POST",body:data});const d=await r.json();if(!r.ok||!d.reference)throw Error(d.error||"Unable to submit.");setReference(d.reference);}
  catch(e){setError(e instanceof Error?e.message:"Unable to submit.");}
  finally{setBusy(false)}return;
 }
 const labels:Record<string,string>={fullName:"Name",email:"Email",phone:"Phone",contactMethod:"Preferred contact",vin:"VIN",year:"Year",make:"Make",model:"Model",repairType:"Repair type",insurance:"Claim status",description:"Details"};
 const lines=[kind==="estimate"?"Hi Auto Maven, I would like a preliminary repair estimate.":"Hi Auto Maven, I have an inquiry."];
 for(const [key,label] of Object.entries(labels)){const value=data.get(key);if(value)lines.push(label+": "+String(value));}
 if(kind==="estimate")lines.push("I will attach damage photos in this chat.");
 window.location.assign("https://wa.me/14167868958?text="+encodeURIComponent(lines.join("\n")));
 }
 if(reference)return <div className="form-panel" role="status"><h2>Request submitted.</h2><p>Your request and photos were accepted by our email service for delivery. This is not a confirmed estimate or booking.</p><p>Reference: {reference}</p><a href="tel:+14167868958">Questions? Call (416) 786-8958</a></div>;
 return <form className="form-panel" onSubmit={submit} aria-label={kind==="estimate"?"Auto body repair estimate request":"Contact Auto Maven"}>
  <h2 className="form-section-title"><span>01</span>{kind==="estimate"?"Get your auto body repair estimate":"Send us a message"}</h2>
  {kind==="estimate"&&<fieldset className="estimate-choice"><legend>How would you like to send your request?</legend><label><input type="radio" name="channel" value="whatsapp" checked={channel==="whatsapp"} onChange={()=>setChannel("whatsapp")} disabled={busy}/> WhatsApp</label><label><input type="radio" name="channel" value="email" checked={channel==="email"} onChange={()=>setChannel("email")} disabled={busy}/> Email with photos</label></fieldset>}
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
   <fieldset className="estimate-choice"><legend>Identify your vehicle</legend><label><input type="radio" name="vehicleMode" value="vin" checked={mode==="vin"} onChange={()=>setMode("vin")} disabled={lookupBusy||busy}/> Use VIN</label><label><input type="radio" name="vehicleMode" value="manual" checked={mode==="manual"} onChange={()=>{setMode("manual");setLookupMessage("")}} disabled={lookupBusy||busy}/> Enter details manually</label></fieldset>
   {mode==="vin"&&<div className="field"><label htmlFor="vin">VIN (17 characters)</label><input id="vin" name="vin" value={vin} onChange={e=>{setVin(e.target.value.toUpperCase().replace(/\s/g,""));setVehicle({year:"",make:"",model:""});setLookupMessage("")}} maxLength={17} pattern="[A-HJ-NPR-Z0-9]{17}" required disabled={lookupBusy||busy}/><button type="button" className="button outline-dark" onClick={lookup} disabled={lookupBusy||busy||vin.length!==17}>{lookupBusy?"Looking up…":"Find my vehicle"}</button><p className="form-note">VIN lookup uses NHTSA vehicle data. Check the results; missing or incorrect details can be entered manually.</p><p role="status">{lookupMessage}</p></div>}
   <div className="fields">
    <div className="field"><label htmlFor="year">Vehicle year <b>*</b></label><input id="year" name="year" value={vehicle.year} onChange={e=>setVehicle({...vehicle,year:e.target.value})} type="number" inputMode="numeric" min={1900} max={new Date().getFullYear()+1} required placeholder="2022"/></div>
    <div className="field"><label htmlFor="make">Make <b>*</b></label><input id="make" name="make" value={vehicle.make} onChange={e=>setVehicle({...vehicle,make:e.target.value})} required maxLength={60} placeholder="e.g. Toyota"/></div>
    <div className="field full"><label htmlFor="model">Model <b>*</b></label><input id="model" name="model" value={vehicle.model} onChange={e=>setVehicle({...vehicle,model:e.target.value})} required maxLength={80} placeholder="e.g. Camry"/></div>
    <div className="field full-mobile"><label htmlFor="repairType">Repair type <b>*</b></label><select name="repairType" id="repairType" required defaultValue=""><option value="" disabled>Select repair type</option><option value="Accident">Accident damage</option><option value="Cosmetic">Cosmetic repair</option><option value="Not sure">Not sure yet</option></select></div>
    <div className="field full-mobile"><label htmlFor="insurance">Insurance claim status <b>*</b></label><select name="insurance" id="insurance" required defaultValue=""><option value="" disabled>Select claim status</option><option value="No claim">No claim / paying privately</option><option value="Claim started">Claim already started</option><option value="Considering a claim">Considering a claim</option><option value="Not sure">Not sure / prefer to discuss</option></select></div>
   </div>
  </>}
  <div className="field full" style={{marginTop:20}}><label htmlFor="description">{kind==="estimate"?"Describe the damage":"How can we help?"} <b>*</b></label><textarea name="description" id="description" required minLength={10} maxLength={4000} rows={4} placeholder={kind==="estimate"?"Tell us which areas are damaged and what you’d like us to look at…":"Tell us a little about your inquiry…"}/></div>
  {kind==="estimate"&&channel==="whatsapp"&&<p className="upload-tip">Continue to WhatsApp, then attach 5–10 clear photos of your vehicle. Photos are sent in WhatsApp, not uploaded to this website.</p>}
  {kind==="estimate"&&channel==="email"&&<div className="field" style={{marginTop:24}}><label htmlFor="photos">Attach damage photos</label><input id="photos" type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={busy} onChange={e=>{addPhotos(e.target.files);e.target.value=""}}/><p className="form-note">Up to 10 JPG, PNG or WebP images, 3 MB combined. Photos are attached to your email request.</p><ul>{photos.map((p,i)=><li key={i}>{p.name} <button type="button" disabled={busy} aria-label={"Remove "+p.name} onClick={()=>setPhotos(photos.filter((_,n)=>n!==i))}>Remove</button></li>)}</ul>{!emailEnabled&&<p role="status">Email delivery to info@automaven.ca is being set up. Please use WhatsApp for now.</p>}</div>}
  <label className="check-field"><input type="checkbox" name="consent" required value="yes"/><span>I agree that AUTO MAVEN INC. may use my details{kind==="estimate"?" and photos":""} to review and respond to this inquiry. I have read the <Link href="/privacy" target="_blank" rel="noopener">privacy notice</Link>. <b>*</b></span></label>
  {error&&<p className="form-error" role="alert">{error}</p>}
  <button type="submit" className="button gold form-submit" disabled={busy||lookupBusy||(channel==="email"&&!emailEnabled)}>{busy?"Sending…":channel==="email"?"Send estimate by email":"Continue in WhatsApp"} <ArrowUpRight size={18}/></button>{channel==="whatsapp"&&<p className="form-note">This opens a prepared message. Review it, attach photos if needed, and press Send in WhatsApp to contact us.</p>}
  <p className="form-note">Auto Body & Paint Shop — Coming Soon. {kind==="estimate"?"Online estimates are preliminary and may change following an in-person inspection. ":""}Sending an inquiry does not confirm a repair appointment.</p>
 </form>;
}
