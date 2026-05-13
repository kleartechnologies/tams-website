import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LangProvider } from "@/contexts/LangContext";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://usetams.com"),
  title: "TAMS — Travel Agency Management System",
  description:
    "Manage bookings, payments, customers and reports in one system. Built for Malaysian travel agencies with SST support.",
  keywords: [
    "travel agency management system",
    "TAMS",
    "sistem agensi pelancongan",
    "invois SST Malaysia",
    "booking management",
    "travel agency software Malaysia",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TAMS — Travel Agency Management System",
    description: "Manage your travel agency smarter. Bookings, payments, invoices and reports in one place.",
    type: "website",
    url: "https://usetams.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "TAMS — Travel Agency Management System",
    description: "Manage your travel agency smarter. Bookings, payments, invoices and reports in one place.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ fontFamily: "var(--font-inter), Inter, system-ui, sans-serif" }}>
        <LangProvider>
          {children}
        </LangProvider>
        <Analytics />
      </body>
    </html>
  );
}
