import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { LangProvider } from "@/contexts/LangContext";
import "./globals.css";

export const metadata: Metadata = {
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
  openGraph: {
    title: "TAMS — Travel Agency Management System",
    description: "Manage your travel agency smarter. Bookings, payments, invoices and reports in one place.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LangProvider>
          {children}
        </LangProvider>
        <Analytics />
      </body>
    </html>
  );
}
