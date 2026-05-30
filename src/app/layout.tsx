import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auto Maven | Luxury Used Vehicles Toronto / GTA",
  description:
    "Smarter way to buy, sell, and source cars in Toronto. OMVIC-licensed dealership with market-based guidance, flexible financing, and trade-in support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-[#03050a] font-sans text-white">
        {children}
      </body>
    </html>
  );
}
