"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
declare global { interface Window { dataLayer:unknown[]; gtag?:(...args:unknown[])=>void; } }
export default function Analytics({measurementId}:{measurementId:string}){
 const [choice,setChoice]=useState<string|null>("loading");
 const [settings,setSettings]=useState(false);
 const pathname=usePathname();
 const valid=/^G-[A-Z0-9]+$/.test(measurementId);
 useEffect(()=>{if(valid){try{setChoice(localStorage.getItem("automaven-analytics"))}catch{setChoice(null)}}},[valid]);
 useEffect(()=>{
  if(!valid||choice!=="yes")return;
  const w=window as unknown as Record<string,unknown>;
  w["ga-disable-"+measurementId]=false;
  if(!document.getElementById("automaven-google-tag")){
   window.dataLayer=window.dataLayer||[];
   window.gtag=function(){window.dataLayer.push(arguments)};
   window.gtag("consent","default",{analytics_storage:"granted",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
   window.gtag("js",new Date());
   window.gtag("config",measurementId,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false});
   const s=document.createElement("script");s.id="automaven-google-tag";s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+measurementId;document.head.appendChild(s);
  }
  window.gtag?.("event","page_view",{page_location:window.location.origin+pathname,page_title:document.title,send_to:measurementId});
 },[valid,choice,pathname,measurementId]);
 function choose(value:string){
  try{localStorage.setItem("automaven-analytics",value)}catch{}
  if(value==="no"){
   (window as unknown as Record<string,unknown>)["ga-disable-"+measurementId]=true;
   // Remove first-party Analytics cookies after consent is withdrawn.
   const domains=[location.hostname,"."+location.hostname,"."+location.hostname.split(".").slice(-2).join(".")];
   document.cookie.split(";").forEach(c=>{const name=c.trim().split("=")[0];if(name.startsWith("_ga")){document.cookie=name+"=; Max-Age=0; path=/";domains.forEach(d=>{document.cookie=name+"=; Max-Age=0; path=/; domain="+d})}});
  }
  setChoice(value);setSettings(false);
 }
 if(!valid||choice==="loading")return null;
 return <>{choice===null||settings?<div className="analytics-banner" role="region" aria-label="Optional analytics"><p>May we use optional analytics to understand which pages are helpful? Your inquiry and photos are not sent to Analytics. <a href="/privacy">Privacy notice</a></p><div><button onClick={()=>choose("no")}>Decline</button><button className="gold" onClick={()=>choose("yes")}>Allow analytics</button></div></div>:<button className="analytics-settings" onClick={()=>setSettings(true)}>Analytics preferences</button>}</>
}
