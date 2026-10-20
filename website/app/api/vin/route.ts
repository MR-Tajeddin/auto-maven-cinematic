export const runtime = "nodejs";
export async function GET(request: Request) {
 const vin = new URL(request.url).searchParams.get("vin")?.trim().toUpperCase() || "";
 if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) return Response.json({error:"Enter a valid 17-character VIN (no I, O or Q)."}, {status:400});
 try {
  const response = await fetch("https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/"+vin+"?format=json", {signal:AbortSignal.timeout(10000),cache:"no-store"});
  if(!response.ok) throw new Error("Lookup unavailable");
  const data = await response.json();
  const v = data.Results?.[0];
  if(!v?.Make || !v?.Model || !/^\d{4}$/.test(v.ModelYear)) return Response.json({error:"We could not identify this vehicle. Please enter its details manually."},{status:422});
  return Response.json({year:v.ModelYear,make:v.Make,model:v.Model,warning:v.ErrorCode !== "0" ? "The VIN lookup returned a warning. Please check the VIN and vehicle details." : ""},{headers:{"Cache-Control":"no-store"}});
 } catch {return Response.json({error:"VIN lookup is unavailable. Please enter your vehicle details manually."},{status:503})}
}
