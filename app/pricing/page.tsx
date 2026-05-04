import Navbar from '@/components/Navbar';
import PricingSection from '@/components/pricing/PricingSection';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Pricing — TAMS Travel Agency Management System',
  description: 'Simple, transparent pricing for Malaysian travel agencies. Start free, upgrade as you grow.',
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 60 }}>

        {/* ── Header ── */}
        <section className="pt-20 pb-4 bg-gray-50 text-center">
          <div className="max-w-xl mx-auto px-4">
            <span className="eyebrow">Pricing</span>
            <h1
              className="mt-3 mb-3 text-gray-900 font-extrabold"
              style={{ fontSize: 'clamp(28px, 4vw, 42px)', letterSpacing: '-1.2px', lineHeight: 1.12 }}
            >
              Simple pricing for travel agencies
            </h1>
            <p className="text-base text-gray-500 leading-relaxed">
              Start free. Upgrade as you grow. No hidden fees.
            </p>
          </div>
        </section>

        {/* ── Cards ── */}
        <section className="py-16 bg-gray-50">
          <PricingSection />

          <p className="text-center text-sm text-gray-400 mt-12">
            No credit card required &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; SST compliant
          </p>
        </section>

        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
