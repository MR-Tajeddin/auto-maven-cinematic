import { siteConfig } from "./site-config";
export default function sitemap(){return ["","/auto-body-repair","/paint-services","/accident-assistance","/gallery","/other-services","/about","/contact","/estimate","/privacy"].map(path=>({url:siteConfig.origin+path,changeFrequency:"monthly" as const,priority:path===""?1:0.7}))}
