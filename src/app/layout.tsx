import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";
import "@/index.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "EightyMile Travels | Premium Travel Planning",
  description:
    "Premium travel planning for private movement, corporate travel, and tailored journeys.",
  openGraph: {
    title: "EightyMile Travels",
    description:
      "Travel planning for private journeys, corporate movement, and tailored itineraries.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EightyMile Travels",
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
