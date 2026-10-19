import type { Metadata } from "next";
import Header from "./components/Header";
import { Footer } from "./components/Shared";
import Analytics from "./components/Analytics";
import { siteConfig } from "./site-config";
import "./globals.css";
export const metadata: Metadata = {
 metadataBase: new URL(siteConfig.origin),
 verification: siteConfig.googleSearchConsoleVerification ? {google:siteConfig.googleSearchConsoleVerification} : undefined,
 title: {default:"AUTO MAVEN | Auto Body & Paint — Coming Soon in Ontario",template:"%s | AUTO MAVEN"},
 description:"AUTO MAVEN INC. is preparing to launch auto body repair, collision repair and painting services in Ontario. Request a preliminary estimate and send vehicle damage photos through WhatsApp.",
 openGraph:{title:"AUTO MAVEN — Auto Body & Paint",description:"From Accident to Repair — We Handle It All. Ontario auto body and paint facility coming soon.",images:[{url:"/images/auto-maven-logo.jpg",width:1254,height:1254}],type:"website",locale:"en_CA"},
 robots:{index:true,follow:true},
 icons:{icon:"/images/auto-maven-logo.jpg",apple:"/images/auto-maven-logo.jpg"},
};
export default function RootLayout({children}:{children:React.ReactNode}){
 const organization={"@context":"https://schema.org","@type":"Organization",name:"AUTO MAVEN INC.",url:"https://automaven.ca",logo:"https://www.automaven.ca/images/auto-maven-logo.jpg",telephone:"+1-416-786-8958",email:"info@automaven.ca",description:"Ontario-based automotive company preparing to launch auto body and paint services. Repair facility coming soon. Corporate office by appointment only.",address:{"@type":"PostalAddress",streetAddress:"1639 Bayview Avenue",addressLocality:"East York",addressRegion:"ON",postalCode:"M4G 3B5",addressCountry:"CA"}};
 return <html lang="en"><body><Header/><main id="main">{children}</main><Footer/><Analytics measurementId={siteConfig.googleAnalyticsId}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organization)}}/></body></html>
}
