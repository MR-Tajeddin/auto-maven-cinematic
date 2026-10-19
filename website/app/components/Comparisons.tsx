"use client";
import { useState } from "react";
import { ArrowUpRight, MoveHorizontal, Info } from "lucide-react";
import Link from "next/link";
export function Comparison({image,title,hero=false}:{image:string,title:string,hero?:boolean}){
 const [value,setValue]=useState(48);
 return <div className={"comparison-shell "+(hero?"hero-comparison":"")}>
  <div className="comparison" role="group" aria-label={title+", illustrative before and after comparison"}>
   <div className="comparison-image after" style={{backgroundImage:"url("+image+")"}}/>
   <div className="comparison-image before" style={{backgroundImage:"url("+image+")",clipPath:"inset(0 "+(100-value)+"% 0 0)"}}/>
   <span className="compare-label before-label">BEFORE</span><span className="compare-label after-label">AFTER</span>
   <div className="comparison-line" style={{left:value+"%"}}><span><MoveHorizontal size={20}/></span></div>
   <input type="range" min="0" max="100" value={value} onChange={e=>setValue(Number(e.target.value))} aria-label={"Compare before and after: "+title} aria-valuetext={value+" percent before image visible"}/>
   {hero&&<div className="hero-photo-title"><span>FROM DAMAGE</span><strong>to a fresh start.</strong></div>}
  </div>
  <p className="image-disclosure"><Info size={12}/> AI-generated illustration. Not an AUTO MAVEN completed repair.</p>
 </div>
}
const examples=[
 {id:"collision",n:"01",title:"Collision & panel restoration",image:"/images/collision-demo.webp",text:"From visible impact damage to a restored body shape. An illustration of collision and body panel repair.",tags:["Collision damage","Body panel restoration"]},
 {id:"bumper",n:"02",title:"Bumpers, dents & scratches",image:"/images/bumper-demo.webp",text:"An illustrative look at cosmetic damage, bumper repair and a clean, consistent finish.",tags:["Bumper repair","Dent repair","Scratch repair"]},
 {id:"paint",n:"03",title:"A finish that changes everything",image:"/images/paint-demo.webp",text:"A visual demonstration of refinishing and paint correction, from dull and scratched to smooth and reflective.",tags:["Automotive painting","Paint correction"]},
];
export function Showcase(){
 const [active,setActive]=useState(0);
 const ex=examples[active];
 return <div className="showcase"><div><Comparison image={ex.image} title={ex.title}/></div><div className="showcase-sidebar"><span className="eyebrow">ENVISION THE POSSIBILITIES</span>{examples.map((x,i)=><button className={"showcase-tab "+(active===i?"selected":"")} key={x.id} onClick={()=>setActive(i)} aria-pressed={active===i}><span>{x.n}</span><div><h3>{x.title}</h3>{active===i&&<p>{x.text}</p>}</div><ArrowUpRight size={18}/></button>)}<p className="small-print">A preview of the work we’re preparing to offer. Actual results depend on the vehicle, damage and agreed repair scope.</p><Link className="text-link" href="/estimate">What does your vehicle need? <ArrowUpRight size={17}/></Link></div></div>
}
export function Gallery(){
 const [filter,setFilter]=useState("All examples");
 const filters=["All examples",...examples.flatMap(x=>x.tags)];
 return <><div className="filter-row" aria-label="Filter illustrative repair examples">{filters.map(x=><button key={x} className={filter===x?"selected":""} aria-pressed={filter===x} onClick={()=>setFilter(x)}>{x}</button>)}</div><div className="gallery-grid">{examples.filter(x=>filter==="All examples"||x.tags.includes(filter)).map(x=><article className="gallery-card" key={x.id}><Comparison image={x.image} title={x.title}/><div className="gallery-copy"><span className="eyebrow">ILLUSTRATIVE EXAMPLE {x.n}</span><h2>{x.title}</h2><p>{x.text}</p><div className="tags">{x.tags.map(t=><span key={t}>{t}</span>)}</div></div></article>)}</div></>
}
