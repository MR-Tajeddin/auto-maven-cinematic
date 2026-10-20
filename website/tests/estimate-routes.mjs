import ts from "typescript";
import nodemailer from "nodemailer";
import {readFileSync,writeFileSync,mkdtempSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import assert from "node:assert/strict";
const temp=mkdtempSync(join(process.cwd(),".maven-routes-"));
async function route(name){const p=join(temp,name+".mjs");writeFileSync(p,ts.transpileModule(readFileSync("app/api/"+name+"/route.ts","utf8"),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText);return import(p)}
const originalFetch=globalThis.fetch;
const originalTransport=nodemailer.createTransport;
try{
 const vin=await route("vin");
 assert.equal((await vin.GET(new Request("https://example.test/api/vin?vin=INVALID"))).status,400);
 globalThis.fetch=async()=>Response.json({Results:[{Make:"TOYOTA",Model:"Camry",ModelYear:"2022",ErrorCode:"0"}]});
 assert.equal((await (await vin.GET(new Request("https://example.test/api/vin?vin=5UXWX7C50BA000000"))).json()).model,"Camry");
 globalThis.fetch=async()=>{throw Error("timeout")};
 assert.equal((await vin.GET(new Request("https://example.test/api/vin?vin=5UXWX7C50BA000000"))).status,503);
 const email=await route("estimate-email");
 let seq=0;
 function request({badFile=false,count=1,origin="https://example.test"}={}){
  const f=new FormData();
  for(const [k,v]of Object.entries({fullName:"Test Person",email:"test@example.test",phone:"4165550100",contactMethod:"Email",year:"2022",make:"Toyota",model:"Camry",repairType:"Cosmetic",insurance:"No claim",description:"Front bumper scratch",consent:"yes"}))f.set(k,v);
  for(let i=0;i<count;i++)f.append("photos",new File([badFile?"not image":new Uint8Array([255,216,255,0])],"photo.jpg",{type:"image/jpeg"}));
  return new Request("https://example.test/api/estimate-email",{method:"POST",headers:{origin,"x-forwarded-for":"test-"+(++seq)},body:f});
 }
 delete process.env.RESEND_API_KEY;
 assert.equal((await email.POST(request())).status,503);
 process.env.ESTIMATE_EMAIL_ENABLED="true";process.env.RESEND_API_KEY="test-only";process.env.ESTIMATE_EMAIL_FROM="sender@example.test";process.env.ESTIMATE_EMAIL_TO="owner@example.test";
 assert.equal((await email.POST(request({origin:"https://wrong.test"}))).status,403);
 assert.equal((await email.POST(request({badFile:true}))).status,400);
 assert.equal((await email.POST(request({count:11}))).status,400);
 let captured;
 globalThis.fetch=async(url,opts)=>{captured=JSON.parse(opts.body);assert.equal(url,"https://api.resend.com/emails");return Response.json({id:"mock-accepted"})};
 const result=await email.POST(request({count:10}));
 assert.equal(result.status,200);assert.equal(captured.attachments.length,10);assert.equal(captured.reply_to,"test@example.test");assert.deepEqual(captured.to,["owner@example.test"]);
 globalThis.fetch=async()=>Response.json({error:"provider rejected"},{status:500});
 assert.equal((await email.POST(request())).status,502);
 process.env.ESTIMATE_EMAIL_PROVIDER="smtp";
 assert.equal((await email.POST(request())).status,503);
 process.env.SMTP_HOST="smtp.example.test";process.env.SMTP_USER="owner@example.test";process.env.SMTP_PASS="mock-only";process.env.SMTP_PORT="465";
 let options, mail, closed=false;
 nodemailer.createTransport=(opts)=>{options=opts;return {sendMail:async(message)=>{mail=message;return {accepted:["owner@example.test"],rejected:[],messageId:"smtp-mock"}},close(){closed=true}}};
 assert.equal((await email.POST(request())).status,200);
 assert.equal(options.secure,true);assert.equal(options.tls.rejectUnauthorized,true);assert.equal(mail.to,"owner@example.test");assert.equal(mail.replyTo,"test@example.test");assert.ok(Buffer.isBuffer(mail.attachments[0].content));assert.ok(closed);
 process.env.SMTP_PORT="587";
 assert.equal((await email.POST(request())).status,200);assert.equal(options.requireTLS,true);assert.equal(options.secure,false);
 nodemailer.createTransport=()=>({sendMail:async()=>{throw Error("SMTP rejected")},close(){}});
 assert.equal((await email.POST(request())).status,502);
 console.log("PASS: SMTP configuration, TLS, attachments, recipient, reply-to and failure; VIN validation, lookup and outage fallback; email unavailable, cross-origin, fake photo, photo count, 10 attachments, fixed recipient, reply-to and provider failure. No real email sent.");
}finally{nodemailer.createTransport=originalTransport;globalThis.fetch=originalFetch;rmSync(temp,{recursive:true,force:true})}
