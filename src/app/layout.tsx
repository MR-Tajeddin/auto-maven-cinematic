import type { Metadata } from "next";
import "./globals.css";

const title = "Auto Maven | Vehicle Sourcing & Auto Consulting Toronto / GTA";
const description =
  "Automotive consulting, vehicle sourcing assistance, market guidance, payment estimate support, and trade-in guidance for Toronto and the GTA.";

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
        alt: "Auto Maven automotive consulting and vehicle sourcing in Toronto",
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
