import { createHash } from "node:crypto";
export const runtime="nodejs";
const MAX=3*1024*1024;
const rates=new Map<string,{count:number,until:number}>();
function fail(error:string,status=400){return Response.json({error},{status})}
export async function POST(request:Request){
 const origin=request.headers.get("origin");
 if(!origin || origin!==new URL(request.url).origin)return fail("Please submit from this website.",403);
 const key=process.env.RESEND_API_KEY, from=process.env.ESTIMATE_EMAIL_FROM, to=process.env.ESTIMATE_EMAIL_TO;
 const smtp=process.env.ESTIMATE_EMAIL_PROVIDER==="smtp";
 const smtpReady=Boolean(process.env.SMTP_HOST&&process.env.SMTP_USER&&process.env.SMTP_PASS&&["465","587"].includes(process.env.SMTP_PORT||""));
 if(process.env.ESTIMATE_EMAIL_ENABLED!=="true"||!(smtp?smtpReady:key)||!from||!to)return fail("Email submission is not available yet. Please use WhatsApp or call us.",503);
 if(!request.headers.get("content-type")?.startsWith("multipart/form-data"))return fail("Invalid request.");
 const rateKey=createHash("sha256").update(request.headers.get("x-forwarded-for")?.split(",")[0]||"unknown").digest("hex");
 const now=Date.now();for(const [k,v]of rates)if(v.until<now)rates.delete(k);
 const rate=rates.get(rateKey);
 if(rate && rate.count>=5)return fail("Please wait before sending another request.",429);
 rates.set(rateKey,{count:(rate?.count||0)+1,until:rate?.until||now+600000});
 try{
  const reader=request.body?.getReader();if(!reader)return fail("Empty request.");
  let size=0;const chunks:Uint8Array[]=[];
  while(true){const part=await reader.read();if(part.done)break;size+=part.value.length;if(size>MAX+65536){await reader.cancel();return fail("Photos must total 3 MB or less.",413)}chunks.push(part.value)}
  const data=await new Request(request.url,{method:"POST",headers:{"content-type":request.headers.get("content-type")!},body:Buffer.concat(chunks)}).formData();
  const get=(name:string)=>typeof data.get(name)==="string"?String(data.get(name)).trim():"";
  if(get("website"))return fail("Unable to submit.");
  if(get("consent")!=="yes")return fail("Please accept the privacy notice.");
  if(get("fullName").length<2||get("fullName").length>100||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))||get("email").length>254||get("phone").length<7||get("phone").length>25)return fail("Check your name, email and phone number.");
  if(!/^\d{4}$/.test(get("year"))||Number(get("year"))<1900||Number(get("year"))>new Date().getFullYear()+1||!get("make")||get("make").length>60||!get("model")||get("model").length>80)return fail("Check your vehicle details.");
  if(get("vin")&&!/^[A-HJ-NPR-Z0-9]{17}$/.test(get("vin")))return fail("Check your VIN.");
  if(get("description").length<10||get("description").length>4000)return fail("Describe the damage in 10–4,000 characters.");
  if(!["Accident","Cosmetic","Not sure"].includes(get("repairType"))||!["No claim","Claim started","Considering a claim","Not sure"].includes(get("insurance"))||!["Phone","Email","Text"].includes(get("contactMethod")))return fail("Please select your repair, claim and contact preferences.");
  const files=data.getAll("photos");if(files.length>10)return fail("Choose up to 10 photos.");
  const attachments=[];let total=0;
  for(const file of files){
   if(!(file instanceof File)||!file.size)return fail("Invalid photo.");
   total+=file.size;if(total>MAX)return fail("Photos must total 3 MB or less.",413);
   const b=Buffer.from(await file.arrayBuffer());
   const jpg=b[0]===255&&b[1]===216&&b[2]===255;
   const png=b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
   const webp=b.toString("ascii",0,4)==="RIFF"&&b.toString("ascii",8,12)==="WEBP";
   const ext=jpg&&file.type==="image/jpeg"?"jpg":png&&file.type==="image/png"?"png":webp&&file.type==="image/webp"?"webp":"";
   if(!ext)return fail("Only JPG, PNG or WebP photos are supported.");
   attachments.push({filename:"damage-"+(attachments.length+1)+"."+ext,content:b.toString("base64")});
  }
  const names=["fullName","email","phone","contactMethod","vin","year","make","model","repairType","insurance","description"];
  const text="AUTO MAVEN preliminary estimate inquiry\n\n"+names.map(n=>n+": "+get(n)).join("\n")+"\n\nPrivacy consent: yes. Not a repair booking.";
  const id=createHash("sha256").update(JSON.stringify({to,text,attachments})).digest("hex");
  if(smtp){
   const {default:nodemailer}=await import("nodemailer");
   const port=Number(process.env.SMTP_PORT);
   const transport=nodemailer.createTransport({host:process.env.SMTP_HOST,port,secure:port===465,requireTLS:port===587,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS},tls:{minVersion:"TLSv1.2",rejectUnauthorized:true},connectionTimeout:10000,greetingTimeout:10000,socketTimeout:20000,disableFileAccess:true,disableUrlAccess:true});
   try{
    const result=await transport.sendMail({from,to,replyTo:get("email"),subject:"AUTO MAVEN — New estimate request",text,attachments:attachments.map(a=>({...a,content:Buffer.from(a.content,"base64")}))});
    if(!result.accepted?.length||result.rejected?.length)return fail("Email was not accepted. Please try again or use WhatsApp.",502);
    return Response.json({reference:result.messageId},{headers:{"Cache-Control":"no-store"}});
   }finally{transport.close()}
  }
  const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:"Bearer "+key,"Content-Type":"application/json","Idempotency-Key":id},body:JSON.stringify({from,to:[to],reply_to:get("email"),subject:"AUTO MAVEN — New estimate request",text,attachments}),signal:AbortSignal.timeout(15000)});
  const result=await response.json();if(!response.ok||!result.id)return fail("Email was not accepted. Please try again or use WhatsApp.",502);
  return Response.json({reference:result.id},{headers:{"Cache-Control":"no-store"}});
 }catch{return fail("We could not confirm submission. Please retry or use WhatsApp.",502)}
}
