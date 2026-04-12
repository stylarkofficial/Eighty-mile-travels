import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";
import "@/index.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Eighty Mile Travel | Premium Travel Planning",
  description:
    "Premium travel planning for private movement, corporate travel, and tailored journeys.",
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  openGraph: {
    title: "Eighty Mile Travel",
    description:
      "Travel planning for private journeys, corporate movement, and tailored itineraries.",
    type: "website",
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Eighty Mile Travel",
    description:
      "Travel planning for private journeys, corporate movement, and tailored itineraries.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}
