import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Features — TAMS Travel Agency Management System",
  description: "Explore all TAMS features: booking management, payments, invoicing, reports and more.",
};

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 60 }}>
        <Features />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
