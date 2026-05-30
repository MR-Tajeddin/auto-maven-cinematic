import type { Metadata } from "next";
import "./globals.css";

const title = "Auto Maven | Luxury Used Vehicles Toronto / GTA";
const description =
  "Smarter way to buy, sell, and source cars in Toronto. OMVIC-licensed dealership with market-based guidance, flexible financing, and trade-in support.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.automaven.ca"),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Auto Maven",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/brand/logo.jpeg",
        width: 1536,
        height: 1024,
        alt: "Auto Maven luxury used vehicle dealership in Toronto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/brand/logo.jpeg"],
  },
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
