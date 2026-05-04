"use client";

import { useEffect, useState } from "react";
import { goToLogin, goToSignup } from "@/lib/navigation";
import PricingSection from "@/components/pricing/PricingSection";

// ─── Translations (matches every data-i18n key in the HTML) ──────────────────

const T = {
  en: {
    nav: { features: "Features", how: "How it works", pricing: "Pricing", faq: "FAQ", login: "Login", cta: "Start Free Trial" },
    hero: {
      pill: "Built for Malaysian travel agencies · SST ready",
      title: "Run Your Travel Agency Smarter",
      lead: "Manage bookings, payments, customers, and reports — all in one system.",
      cta1: "Start Free Trial", cta2: "Book Demo",
      meta1: "7-day free trial", meta2: "No credit card required", meta3: "Cancel anytime",
      side: { workspace: "Workspace", dashboard: "Dashboard", bookings: "Bookings", customers: "Customers", payments: "Payments", invoices: "Invoices", insights: "Insights", reports: "Reports" },
      greeting: "Good morning, Aisha 👋",
      kpi1: "Bookings (Apr)", kpi2: "Revenue", kpi3: "Outstanding", kpi3sub: "3 invoices",
      chartTitle: "Revenue trend", chartRange: "Last 30 days",
      recent: "Recent bookings",
      float1: "Invoice paid", float2: "New booking",
    },
    trust: { head: "Used by travel agencies across Malaysia" },
    problem: {
      eyebrow: "The old way", title: "Manual work is slowing your agency down",
      lead: "If any of these feel familiar, you're spending more time on admin than on customers.",
      p1t: "Bookings live in Excel", p1d: "Endless tabs, version conflicts, and broken formulas every busy season.",
      p2t: "Payments tracked by hand", p2d: "Chasing deposits, matching receipts, and never quite knowing who owes what.",
      p3t: "Customer info gets lost", p3d: "Passport numbers in WhatsApp, preferences in your head, follow-ups forgotten.",
      p4t: "No real financial overview", p4d: "You guess at margins instead of seeing real-time revenue and outstanding balances.",
    },
    features: {
      eyebrow: "Features", title: "Everything you need in one system",
      lead: "From the first inquiry to the final invoice — TAMS handles the entire booking lifecycle.",
      f1t: "Booking Management", f1d: "Create, update, and track every booking with status, dates, and assigned consultants.",
      f2t: "Customer Management", f2d: "Keep contacts, passports, preferences, and full booking history in one searchable place.",
      f3t: "Payment Tracking", f3d: "Log deposits, balances, and refunds. Know exactly which bookings are paid, partial, or overdue.",
      f4t: "Invoice & PDF Generation", f4d: "Branded, SST-ready invoices generated in one click — emailed or downloaded as PDF.",
      f5t: "Reports & Analytics", f5d: "Revenue, top destinations, outstanding payments — clear dashboards built for non-technical owners.",
      f6t: "Multi-user & Multi-agency", f6d: "Add your team, assign roles, and manage multiple branches or agencies from one login.",
    },
    preview: {
      eyebrow: "Product preview", title: "See how it works",
      lead: "Real screens from TAMS — designed for travel agency teams, not IT departments.",
      tab1: "Dashboard", tab2: "Bookings", tab3: "Packages", tab4: "Invoice",
      dashTitle: "Dashboard overview", topTitle: "Top destinations",
      bookingsTitle: "Bookings", bookingsSearch: "Search bookings…", bookingsNew: "+ New booking",
      bH1: "Customer", bH2: "Destination", bH3: "Dates", bH4: "Total", bH5: "Status",
      paid: "Paid", pending: "Pending", draft: "Draft",
      packagesTitle: "Travel Packages", packagesSearch: "Search packages…", packagesNew: "+ New package",
      from: "From", pax: "/ pax",
      invTitle: "Branded invoices, instantly.",
      invLead: "One click to generate a professional, SST-compliant invoice — ready to email or download as PDF.",
      invNum: "Invoice number", invStatus: "Status", invStatusPaid: "✓ Paid",
      invSst: "SST (8%)", invTotal: "Total", invHeading: "Invoice",
      invIssued: "Issued 22 Apr 2026", invBilled: "Billed to",
      invDesc: "Description", invQty: "Qty", invAmt: "Amount",
      invSubtotal: "Subtotal", invLine1: "Bali Holiday Package · 5D4N",
      invLine2: "Travel Insurance Add-on", invLine3: "Airport Transfer (Return)",
    },
    how: {
      eyebrow: "How it works", title: "Get started in minutes",
      lead: "No setup calls, no IT team required.",
      s1t: "Create account", s1d: "Sign up in two minutes — no credit card required.",
      s2t: "Add packages", s2d: "Build reusable Umrah, holiday, and corporate packages.",
      s3t: "Start managing bookings", s3d: "Take bookings, log payments, and send invoices instantly.",
    },
    benefits: {
      eyebrow: "Why TAMS", title: "Why agencies choose TAMS",
      lead: "Stop juggling spreadsheets. Run a tighter operation with everything in one place.",
      b1t: "Save hours of admin work", b1d: "Automate invoices, reminders, and reports your team writes by hand today.",
      b2t: "Reduce booking errors", b2d: "One source of truth means no more conflicting versions or missed details.",
      b3t: "Track payments easily", b3d: "Know who has paid what, when — and what's outstanding — in real time.",
      b4t: "Look professional", b4d: "Branded, SST-compliant invoices that build trust with every customer.",
      qEyebrow: "Trusted by Malaysian agencies",
      qText: "\"We used to lose two full days a month reconciling bookings and invoices. With TAMS, that's done in an afternoon.\"",
      qRole: "Owner · Pelangi Tours, Shah Alam",
      stat1n: "12hrs", stat1l: "saved per week", stat2n: "98%", stat2l: "invoice accuracy",
    },
    pricing: {
      eyebrow: "Pricing", title: "Simple pricing for travel agencies",
      lead: "Designed for Malaysian travel agencies. Transparent monthly pricing — no setup fees, no hidden costs.",
      basicName: "Basic", basicTag: "For small agencies getting started", basicPeriod: "/ month",
      basicF1: "Up to 100 bookings / month", basicF2: "Customer management",
      basicF3: "Booking management", basicF4: "Basic invoice generation", basicF5: "Email support",
      basicCta: "Start Free Trial",
      badge: "Most popular",
      proName: "Pro", proTag: "For growing agencies that want full control", proPeriod: "/ month",
      proF1: "Everything in Basic", proF2: "Unlimited bookings", proF3: "Payment tracking & SST support",
      proF4: "Reports & analytics", proF5: "PDF invoice & export",
      proF6: "Multi-user / multi-agency", proF7: "Priority support",
      proCta: "Start Free Trial",
      note: "Designed for Malaysian travel agencies · SST ready · Cancel anytime",
    },
    testi: {
      eyebrow: "Customer stories", title: "Loved by travel agencies across Malaysia",
      q1: "\"Our team picked it up in an afternoon. Bookings, invoices, and SST are no longer a headache.\"",
      n1: "Aisha Rahman", r1: "Owner · Pelangi Tours, Shah Alam",
      q2: "\"We run Umrah and leisure packages side by side. TAMS handles both without us forcing it.\"",
      n2: "Encik Hafiz", r2: "Director · Barakah Travel, Penang",
      q3: "\"The invoice generator alone saves us a full day every month. Worth it.\"",
      n3: "Mei Chen", r3: "Operations · Voyageur Travel, KL",
    },
    faq: {
      eyebrow: "FAQ", title: "Frequently asked questions",
      q1: "Do I need to install anything?", a1: "No. TAMS runs entirely in your browser.",
      q2: "Can I cancel anytime?", a2: "Yes. There are no contracts or lock-ins.",
      q3: "Is SST supported?", a3: "Yes. TAMS includes built-in Malaysian SST support.",
      q4: "Can multiple staff use one account?", a4: "Yes. Pro plan supports multiple users with role-based permissions.",
      q5: "Is this suitable for small agencies?", a5: "Yes. The Basic plan is built specifically for agencies just getting started.",
    },
    cta: {
      title: "Ready to grow your travel agency?",
      lead: "Join travel agencies running smoother, faster operations with TAMS.",
      btn1: "Start Free Trial", btn2: "Book Demo",
      note: "No credit card required · 7-day free trial",
    },
    footer: {
      tag: "The modern operating system for Malaysian travel agencies.",
      product: "Product", company: "Company", resources: "Resources",
      changelog: "Changelog", about: "About", customers: "Customers",
      contact: "Contact", careers: "Careers", help: "Help center",
      sst: "SST guide", api: "API", status: "Status",
      copy: "© 2026 TAMS Sdn Bhd · All rights reserved.",
      privacy: "Privacy", terms: "Terms", security: "Security", lang: "Language",
    },
  },
  bm: {
    nav: { features: "Ciri-ciri", how: "Cara guna", pricing: "Harga", faq: "Soalan Lazim", login: "Log Masuk", cta: "Cuba Percuma" },
    hero: {
      pill: "Direka untuk agensi pelancongan Malaysia · Sokong SST",
      title: "Urus Agensi Pelancongan Anda Dengan Lebih Bijak",
      lead: "Urus tempahan, pembayaran, pelanggan dan laporan dalam satu sistem.",
      cta1: "Cuba Percuma", cta2: "Tempah Demo",
      meta1: "Percubaan 7 hari", meta2: "Tiada kad kredit diperlukan", meta3: "Batal bila-bila masa",
      side: { workspace: "Ruang Kerja", dashboard: "Papan Pemuka", bookings: "Tempahan", customers: "Pelanggan", payments: "Pembayaran", invoices: "Invois", insights: "Statistik", reports: "Laporan" },
      greeting: "Selamat pagi, Aisha 👋",
      kpi1: "Tempahan (Apr)", kpi2: "Pendapatan", kpi3: "Tertunggak", kpi3sub: "3 invois",
      chartTitle: "Aliran pendapatan", chartRange: "30 hari lepas",
      recent: "Tempahan terkini",
      float1: "Invois dibayar", float2: "Tempahan baru",
    },
    trust: { head: "Dipercayai oleh agensi pelancongan di seluruh Malaysia" },
    problem: {
      eyebrow: "Cara lama", title: "Kerja manual melambatkan operasi agensi anda",
      lead: "Jika anda kenal masalah ini, anda sebenarnya menghabiskan lebih banyak masa pada kerja pentadbiran berbanding melayan pelanggan.",
      p1t: "Tempahan dalam Excel", p1d: "Banyak tab, fail bercanggah, dan formula rosak setiap musim sibuk.",
      p2t: "Pembayaran direkod manual", p2d: "Mengejar deposit, menyemak resit, dan tidak pasti siapa berhutang berapa.",
      p3t: "Maklumat pelanggan hilang", p3d: "Nombor pasport dalam WhatsApp, citarasa dalam ingatan, susulan terlupa.",
      p4t: "Tiada gambaran kewangan jelas", p4d: "Anda hanya meneka margin, tanpa pendapatan dan baki tertunggak masa nyata.",
    },
    features: {
      eyebrow: "Ciri-ciri", title: "Semua yang anda perlukan dalam satu sistem",
      lead: "Dari pertanyaan pertama hingga invois akhir — TAMS menguruskan keseluruhan kitaran tempahan.",
      f1t: "Pengurusan Tempahan", f1d: "Cipta, kemas kini dan jejaki setiap tempahan dengan status, tarikh dan perunding bertugas.",
      f2t: "Pengurusan Pelanggan", f2d: "Simpan kenalan, pasport, citarasa dan sejarah tempahan dalam satu tempat yang mudah dicari.",
      f3t: "Pemantauan Pembayaran", f3d: "Rekod deposit, baki dan bayaran balik. Tahu tempahan mana telah dibayar penuh atau tertunggak.",
      f4t: "Penjanaan Invois & PDF", f4d: "Invois berjenama, mematuhi SST, dijana sekali klik — emel atau muat turun sebagai PDF.",
      f5t: "Laporan & Analitik", f5d: "Pendapatan, destinasi popular, bayaran tertunggak — papan pemuka jelas untuk pemilik bukan teknikal.",
      f6t: "Pelbagai pengguna & agensi", f6d: "Tambah pasukan, tetapkan peranan, dan urus beberapa cawangan atau agensi dari satu log masuk.",
    },
    preview: {
      eyebrow: "Pratonton produk", title: "Lihat bagaimana ia berfungsi",
      lead: "Skrin sebenar daripada TAMS — direka untuk pasukan agensi pelancongan, bukan jabatan IT.",
      tab1: "Papan Pemuka", tab2: "Tempahan", tab3: "Pakej", tab4: "Invois",
      dashTitle: "Ringkasan papan pemuka", topTitle: "Destinasi popular",
      bookingsTitle: "Tempahan", bookingsSearch: "Cari tempahan…", bookingsNew: "+ Tempahan baru",
      bH1: "Pelanggan", bH2: "Destinasi", bH3: "Tarikh", bH4: "Jumlah", bH5: "Status",
      paid: "Dibayar", pending: "Menunggu", draft: "Draf",
      packagesTitle: "Pakej Pelancongan", packagesSearch: "Cari pakej…", packagesNew: "+ Pakej baru",
      from: "Dari", pax: "/ org",
      invTitle: "Invois berjenama, serta-merta.",
      invLead: "Sekali klik untuk menjana invois profesional yang mematuhi SST — sedia diemel atau dimuat turun sebagai PDF.",
      invNum: "Nombor invois", invStatus: "Status", invStatusPaid: "✓ Dibayar",
      invSst: "SST (8%)", invTotal: "Jumlah", invHeading: "Invois",
      invIssued: "Dikeluarkan 22 Apr 2026", invBilled: "Diakaunkan kepada",
      invDesc: "Keterangan", invQty: "Kuantiti", invAmt: "Jumlah",
      invSubtotal: "Subjumlah", invLine1: "Pakej Percutian Bali · 5H4M",
      invLine2: "Tambahan Insurans Pelancongan", invLine3: "Pengangkutan Lapangan Terbang (Pergi-Balik)",
    },
    how: {
      eyebrow: "Cara guna", title: "Mula dalam beberapa minit",
      lead: "Tiada panggilan persediaan, tiada pasukan IT diperlukan.",
      s1t: "Daftar akaun", s1d: "Daftar dalam dua minit — tanpa kad kredit.",
      s2t: "Tambah pakej", s2d: "Bina pakej Umrah, percutian dan korporat yang boleh digunakan semula.",
      s3t: "Mula urus tempahan", s3d: "Terima tempahan, rekod pembayaran, dan hantar invois serta-merta.",
    },
    benefits: {
      eyebrow: "Kenapa TAMS", title: "Kenapa agensi memilih TAMS",
      lead: "Berhenti bergelut dengan spreadsheet. Jalankan operasi yang lebih kemas dengan semuanya di satu tempat.",
      b1t: "Jimat berjam-jam kerja pentadbiran", b1d: "Automasikan invois, peringatan dan laporan yang ditulis manual hari ini.",
      b2t: "Kurangkan kesilapan tempahan", b2d: "Satu sumber kebenaran — tiada lagi versi bercanggah atau butiran terlepas.",
      b3t: "Pantau pembayaran dengan mudah", b3d: "Tahu siapa bayar berapa, bila — dan apa yang tertunggak — secara masa nyata.",
      b4t: "Tampak profesional", b4d: "Invois berjenama yang mematuhi SST dan membina kepercayaan dengan setiap pelanggan.",
      qEyebrow: "Dipercayai agensi Malaysia",
      qText: "\"Dulu kami hilang dua hari sebulan untuk semak tempahan dan invois. Dengan TAMS, semua siap satu petang.\"",
      qRole: "Pemilik · Pelangi Tours, Shah Alam",
      stat1n: "12 jam", stat1l: "dijimatkan seminggu", stat2n: "98%", stat2l: "ketepatan invois",
    },
    pricing: {
      eyebrow: "Harga", title: "Harga mudah untuk agensi pelancongan",
      lead: "Direka untuk agensi pelancongan Malaysia. Harga bulanan telus — tiada yuran pemasangan, tiada kos tersembunyi.",
      basicName: "Basic", basicTag: "Untuk agensi kecil yang baru bermula", basicPeriod: "/ bulan",
      basicF1: "Sehingga 100 tempahan / bulan", basicF2: "Pengurusan pelanggan",
      basicF3: "Pengurusan tempahan", basicF4: "Penjanaan invois asas", basicF5: "Sokongan emel",
      basicCta: "Cuba Percuma",
      badge: "Paling popular",
      proName: "Pro", proTag: "Untuk agensi yang berkembang dan mahukan kawalan penuh", proPeriod: "/ bulan",
      proF1: "Semua dalam Basic", proF2: "Tempahan tanpa had", proF3: "Pemantauan pembayaran & SST",
      proF4: "Laporan & analitik", proF5: "Invois PDF & eksport",
      proF6: "Pelbagai pengguna / agensi", proF7: "Sokongan keutamaan",
      proCta: "Cuba Percuma",
      note: "Direka untuk agensi pelancongan Malaysia · Sokong SST · Batal bila-bila masa",
    },
    testi: {
      eyebrow: "Kisah pelanggan", title: "Disayangi agensi pelancongan di seluruh Malaysia",
      q1: "\"Pasukan kami faham gunanya dalam satu petang. Tempahan, invois dan SST tidak lagi memeningkan.\"",
      n1: "Aisha Rahman", r1: "Pemilik · Pelangi Tours, Shah Alam",
      q2: "\"Kami uruskan pakej Umrah dan percutian serentak. TAMS sokong kedua-duanya tanpa masalah.\"",
      n2: "Encik Hafiz", r2: "Pengarah · Barakah Travel, Pulau Pinang",
      q3: "\"Penjana invois sahaja menjimatkan satu hari penuh setiap bulan. Sangat berbaloi.\"",
      n3: "Mei Chen", r3: "Operasi · Voyageur Travel, KL",
    },
    faq: {
      eyebrow: "Soalan Lazim", title: "Soalan yang sering ditanya",
      q1: "Adakah saya perlu memasang apa-apa?", a1: "Tidak. TAMS berjalan sepenuhnya dalam pelayar anda.",
      q2: "Bolehkah saya batalkan bila-bila masa?", a2: "Boleh. Tiada kontrak atau ikatan.",
      q3: "Adakah SST disokong?", a3: "Ya. TAMS menyokong SST Malaysia secara terbina.",
      q4: "Bolehkah beberapa kakitangan guna satu akaun?", a4: "Boleh. Pelan Pro menyokong pelbagai pengguna dengan kebenaran berdasarkan peranan.",
      q5: "Sesuaikah untuk agensi kecil?", a5: "Ya. Pelan Basic dibina khas untuk agensi yang baru bermula.",
    },
    cta: {
      title: "Bersedia untuk mengembangkan agensi anda?",
      lead: "Sertai agensi pelancongan yang menjalankan operasi lebih lancar dan pantas dengan TAMS.",
      btn1: "Cuba Percuma", btn2: "Tempah Demo",
      note: "Tiada kad kredit · Percubaan 7 hari",
    },
    footer: {
      tag: "Sistem operasi moden untuk agensi pelancongan Malaysia.",
      product: "Produk", company: "Syarikat", resources: "Sumber",
      changelog: "Log Perubahan", about: "Tentang Kami", customers: "Pelanggan",
      contact: "Hubungi", careers: "Kerjaya", help: "Pusat Bantuan",
      sst: "Panduan SST", api: "API", status: "Status",
      copy: "© 2026 TAMS Sdn Bhd · Hak cipta terpelihara.",
      privacy: "Privasi", terms: "Terma", security: "Keselamatan", lang: "Bahasa",
    },
  },
} as const;

type Lang = keyof typeof T;

// ─── SVG helpers ──────────────────────────────────────────────────────────────

const Check14 = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Star = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2l2.39 6.96H22l-6.18 4.49L18.18 22 12 17.27 5.82 22l2.36-8.55L2 8.96h7.61z" />
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const CheckSm = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [lang, setLangState] = useState<Lang>("en");
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("tams-lang") as Lang | null;
    if (saved && saved in T) setLangState(saved);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function switchLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("tams-lang", l);
  }

  const t = T[lang];

  return (
    <>
      {/* =================== NAV =================== */}
      <header className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
        <div className="container nav-inner">
          <a className="brand" href="#">
            <div className="logo">T</div>
            <div className="brand-text">
              <span className="brand-name">TAMS</span>
              <span className="brand-tag">Travel Agency Management System</span>
            </div>
          </a>
          <nav className="nav-links">
            <a href="#features">{t.nav.features}</a>
            <a href="#how">{t.nav.how}</a>
            <a href="#pricing">{t.nav.pricing}</a>
            <a href="#faq">{t.nav.faq}</a>
          </nav>
          <div className="nav-cta">
            <div className="lang-switch" role="group" aria-label="Language switcher">
              <button type="button" className={lang === "en" ? "active" : ""} aria-pressed={lang === "en"} onClick={() => switchLang("en")}>EN</button>
              <button type="button" className={lang === "bm" ? "active" : ""} aria-pressed={lang === "bm"} onClick={() => switchLang("bm")}>BM</button>
            </div>
            <button type="button" className="btn btn-link" onClick={goToLogin}>{t.nav.login}</button>
            <button type="button" className="btn btn-primary btn-sm" onClick={goToSignup}>{t.nav.cta}</button>
          </div>
        </div>
      </header>

      {/* =================== HERO =================== */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-text">
            <span className="hero-pill">
              <span className="dot">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              <span>{t.hero.pill}</span>
            </span>
            <h1>{t.hero.title}</h1>
            <p className="lead">{t.hero.lead}</p>
            <div className="hero-ctas">
              <button type="button" className="btn btn-primary btn-lg" onClick={goToSignup}>
                <span>{t.hero.cta1}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </button>
              <button type="button" className="btn btn-ghost btn-lg" onClick={goToLogin}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                <span>{t.hero.cta2}</span>
              </button>
            </div>
            <div className="hero-meta">
              {([t.hero.meta1, t.hero.meta2, t.hero.meta3] as const).map((m) => (
                <div className="hero-meta-item" key={m}>
                  <Check14 /><span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="hero-visual" style={{ position: "relative" }}>
            <div className="dash">
              <div className="dash-chrome">
                <div className="lights"><span /><span /><span /></div>
                <div className="url">app.tams.my / dashboard</div>
              </div>
              <div className="dash-body">
                <aside className="dash-sidebar">
                  <div className="dash-side-brand"><div className="logo">T</div><b>TAMS</b></div>
                  <div className="dash-side-section">{t.hero.side.workspace}</div>
                  <div className="dash-side-item active">
                    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
                    <span>{t.hero.side.dashboard}</span>
                  </div>
                  <div className="dash-side-item">
                    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11V7a3 3 0 0 1 6 0v4" /><rect x="5" y="11" width="14" height="10" rx="2" /></svg>
                    <span>{t.hero.side.bookings}</span>
                  </div>
                  <div className="dash-side-item">
                    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /></svg>
                    <span>{t.hero.side.customers}</span>
                  </div>
                  <div className="dash-side-item">
                    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    <span>{t.hero.side.payments}</span>
                  </div>
                  <div className="dash-side-item">
                    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                    <span>{t.hero.side.invoices}</span>
                  </div>
                  <div className="dash-side-section">{t.hero.side.insights}</div>
                  <div className="dash-side-item">
                    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>
                    <span>{t.hero.side.reports}</span>
                  </div>
                </aside>
                <div className="dash-main">
                  <div className="dash-main-head">
                    <h4>{t.hero.greeting}</h4>
                    <span className="pill">● Live</span>
                  </div>
                  <div className="kpis">
                    <div className="kpi"><div className="label">{t.hero.kpi1}</div><div className="value">142</div><div className="delta">↑ 18%</div></div>
                    <div className="kpi"><div className="label">{t.hero.kpi2}</div><div className="value">RM 84.2k</div><div className="delta">↑ 12%</div></div>
                    <div className="kpi"><div className="label">{t.hero.kpi3}</div><div className="value">RM 6,400</div><div className="delta warn">{t.hero.kpi3sub}</div></div>
                  </div>
                  <div className="dash-row">
                    <div className="dash-card">
                      <div className="dash-card-title">
                        <b>{t.hero.chartTitle}</b><span>{t.hero.chartRange}</span>
                      </div>
                      <div className="chart">
                        <svg viewBox="0 0 280 92" preserveAspectRatio="none">
                          <line className="grid-line" x1="0" y1="20" x2="280" y2="20" />
                          <line className="grid-line" x1="0" y1="50" x2="280" y2="50" />
                          <line className="grid-line" x1="0" y1="80" x2="280" y2="80" />
                          <path className="area" d="M0,72 L20,66 L40,58 L60,62 L80,48 L100,52 L120,40 L140,44 L160,30 L180,34 L200,22 L220,28 L240,18 L260,24 L280,12 L280,92 L0,92 Z" />
                          <path className="line" d="M0,72 L20,66 L40,58 L60,62 L80,48 L100,52 L120,40 L140,44 L160,30 L180,34 L200,22 L220,28 L240,18 L260,24 L280,12" />
                          <circle className="dot" cx="280" cy="12" r="3" />
                        </svg>
                      </div>
                    </div>
                    <div className="dash-card">
                      <div className="dash-card-title"><b>{t.hero.recent}</b></div>
                      <div className="b-list">
                        {[
                          { av: "SL", cls: "", name: "Sarah Lim", meta: "Bali · 5D4N", tag: t.preview.paid, pending: false },
                          { av: "HM", cls: "g", name: "Hafiz Mansor", meta: "Madinah · Umrah 12D", tag: t.preview.paid, pending: false },
                          { av: "NB", cls: "w", name: "Nur Balqis", meta: "Istanbul · 9D7N", tag: t.preview.pending, pending: true },
                        ].map((b) => (
                          <div className="b-row" key={b.name}>
                            <div className={`b-avatar${b.cls ? ` ${b.cls}` : ""}`}>{b.av}</div>
                            <div className="b-info"><div className="b-name">{b.name}</div><div className="b-meta">{b.meta}</div></div>
                            <span className={`b-tag${b.pending ? " pending" : ""}`}>{b.tag}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="float-card a">
              <div className="ic">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <div><div className="lbl">{t.hero.float1}</div><div className="val">RM 4,820</div></div>
            </div>
            <div className="float-card b">
              <div className="ic">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11V7a3 3 0 0 1 6 0v4" /><rect x="5" y="11" width="14" height="10" rx="2" /></svg>
              </div>
              <div><div className="lbl">{t.hero.float2}</div><div className="val">Umrah · 12D</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* =================== TRUST =================== */}
      <section className="trust">
        <div className="container">
          <div className="trust-head">{t.trust.head}</div>
          <div className="trust-row">
            {["Wanderly", "Voyageur", "Pelangi Tours", "Barakah Travel", "Horizon Travel"].map((name) => (
              <div className="trust-logo" key={name}><span className="mark" />{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== PROBLEM =================== */}
      <section className="problem">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t.problem.eyebrow}</span>
            <h2>{t.problem.title}</h2>
            <p className="lead" style={{ marginTop: 14 }}>{t.problem.lead}</p>
          </div>
          <div className="problem-grid">
            {[
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>, t: t.problem.p1t, d: t.problem.p1d },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>, t: t.problem.p2t, d: t.problem.p2d },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>, t: t.problem.p3t, d: t.problem.p3d },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>, t: t.problem.p4t, d: t.problem.p4d },
            ].map((p) => (
              <div className="problem-card" key={p.t}>
                <div className="strike">✕</div>
                <div className="ic">{p.icon}</div>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== FEATURES =================== */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t.features.eyebrow}</span>
            <h2>{t.features.title}</h2>
            <p className="lead" style={{ marginTop: 14 }}>{t.features.lead}</p>
          </div>
          <div className="features-grid">
            {[
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11V7a3 3 0 0 1 6 0v4" /><rect x="5" y="11" width="14" height="10" rx="2" /></svg>, t: t.features.f1t, d: t.features.f1d },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, t: t.features.f2t, d: t.features.f2d },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="7" y1="15" x2="9" y2="15" /></svg>, t: t.features.f3t, d: t.features.f3d },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>, t: t.features.f4t, d: t.features.f4d },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>, t: t.features.f5t, d: t.features.f5d },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="4" /><circle cx="17" cy="7" r="3" /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /><path d="M21 21v-2a4 4 0 0 0-3-3.87" /></svg>, t: t.features.f6t, d: t.features.f6d },
            ].map((f) => (
              <div className="feature" key={f.t}>
                <div className="ic">{f.icon}</div>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== PRODUCT PREVIEW =================== */}
      <section className="preview">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t.preview.eyebrow}</span>
            <h2>{t.preview.title}</h2>
            <p className="lead" style={{ marginTop: 14 }}>{t.preview.lead}</p>
          </div>

          <div className="preview-tabs-wrap">
            <div className="preview-tabs" role="tablist">
              {(["dashboard", "bookings", "packages", "invoice"] as const).map((tab, i) => (
                <button
                  key={tab}
                  className={`preview-tab${activeTab === tab ? " active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {[t.preview.tab1, t.preview.tab2, t.preview.tab3, t.preview.tab4][i]}
                </button>
              ))}
            </div>
          </div>

          <div className="preview-frame">
            {/* DASHBOARD PANEL */}
            <div className={`preview-panel${activeTab === "dashboard" ? " active" : ""}`}>
              <div className="dash" style={{ borderRadius: 0, border: 0, boxShadow: "none" }}>
                <div className="dash-chrome">
                  <div className="lights"><span /><span /><span /></div>
                  <div className="url">app.tams.my / dashboard</div>
                </div>
                <div className="dash-body" style={{ minHeight: 460 }}>
                  <aside className="dash-sidebar">
                    <div className="dash-side-brand"><div className="logo">T</div><b>TAMS</b></div>
                    <div className="dash-side-section">{t.hero.side.workspace}</div>
                    <div className="dash-side-item active">
                      <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
                      <span>{t.hero.side.dashboard}</span>
                    </div>
                    {[
                      { label: t.hero.side.bookings, icon: <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11V7a3 3 0 0 1 6 0v4" /><rect x="5" y="11" width="14" height="10" rx="2" /></svg> },
                      { label: t.hero.side.customers, icon: <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /></svg> },
                      { label: t.hero.side.payments, icon: <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /></svg> },
                      { label: t.hero.side.invoices, icon: <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg> },
                    ].map((item) => (
                      <div className="dash-side-item" key={item.label}>{item.icon}<span>{item.label}</span></div>
                    ))}
                  </aside>
                  <div className="dash-main">
                    <div className="dash-main-head"><h4>{t.preview.dashTitle}</h4><span className="pill">● Live</span></div>
                    <div className="kpis">
                      <div className="kpi"><div className="label">{t.hero.kpi1}</div><div className="value">142</div><div className="delta">↑ 18%</div></div>
                      <div className="kpi"><div className="label">{t.hero.kpi2}</div><div className="value">RM 84.2k</div><div className="delta">↑ 12%</div></div>
                      <div className="kpi"><div className="label">{t.hero.kpi3}</div><div className="value">RM 6,400</div><div className="delta warn">{t.hero.kpi3sub}</div></div>
                    </div>
                    <div className="dash-row">
                      <div className="dash-card">
                        <div className="dash-card-title"><b>{t.hero.chartTitle}</b><span>{t.hero.chartRange}</span></div>
                        <div className="chart">
                          <svg viewBox="0 0 280 92" preserveAspectRatio="none">
                            <line className="grid-line" x1="0" y1="20" x2="280" y2="20" />
                            <line className="grid-line" x1="0" y1="50" x2="280" y2="50" />
                            <line className="grid-line" x1="0" y1="80" x2="280" y2="80" />
                            <path className="area" d="M0,72 L20,66 L40,58 L60,62 L80,48 L100,52 L120,40 L140,44 L160,30 L180,34 L200,22 L220,28 L240,18 L260,24 L280,12 L280,92 L0,92 Z" />
                            <path className="line" d="M0,72 L20,66 L40,58 L60,62 L80,48 L100,52 L120,40 L140,44 L160,30 L180,34 L200,22 L220,28 L240,18 L260,24 L280,12" />
                          </svg>
                        </div>
                      </div>
                      <div className="dash-card">
                        <div className="dash-card-title"><b>{t.preview.topTitle}</b></div>
                        <div className="b-list">
                          {[
                            { av: "🕌", cls: "", name: "Madinah / Makkah", meta: "42 bookings", tag: "29%", p: false },
                            { av: "🇮🇩", cls: "g", name: "Bali", meta: "31 bookings", tag: "22%", p: false },
                            { av: "🇯🇵", cls: "w", name: "Tokyo", meta: "28 bookings", tag: "19%", p: true },
                          ].map((d) => (
                            <div className="b-row" key={d.name}>
                              <div className={`b-avatar${d.cls ? ` ${d.cls}` : ""}`} style={{ fontSize: 14 }}>{d.av}</div>
                              <div className="b-info"><div className="b-name">{d.name}</div><div className="b-meta">{d.meta}</div></div>
                              <span className={`b-tag${d.p ? " pending" : ""}`}>{d.tag}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BOOKINGS PANEL */}
            <div className={`preview-panel${activeTab === "bookings" ? " active" : ""}`}>
              <div className="table-mock">
                <div className="table-head">
                  <h3>{t.preview.bookingsTitle}</h3>
                  <div className="actions">
                    <div className="search-box">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                      <span>{t.preview.bookingsSearch}</span>
                    </div>
                    <button className="btn btn-primary btn-sm">{t.preview.bookingsNew}</button>
                  </div>
                </div>
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>{t.preview.bH1}</th><th>{t.preview.bH2}</th>
                      <th>{t.preview.bH3}</th><th>{t.preview.bH4}</th><th>{t.preview.bH5}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { av: "SL", cls: "", name: "Sarah Lim", email: "sarah.l@gmail.com", dest: "Bali · 5D4N", dates: "12 May – 16 May", total: "RM 4,820", s: "paid" },
                      { av: "HM", cls: "g", name: "Hafiz Mansor", email: "hafiz.m@gmail.com", dest: "Madinah · Umrah 12D", dates: "05 Jun – 16 Jun", total: "RM 11,200", s: "paid" },
                      { av: "NB", cls: "w", name: "Nur Balqis", email: "balqis@hotmail.com", dest: "Istanbul · 9D7N", dates: "18 Jun – 26 Jun", total: "RM 12,200", s: "pending" },
                      { av: "CW", cls: "", name: "Chong Wei", email: "cw@business.my", dest: "Seoul · 6D5N", dates: "22 Jun – 27 Jun", total: "RM 7,300", s: "draft" },
                      { av: "FA", cls: "g", name: "Farah Ahmad", email: "farah@email.com", dest: "Dubai · 5D4N", dates: "04 Jul – 08 Jul", total: "RM 6,150", s: "paid" },
                    ].map((b) => (
                      <tr key={b.name}>
                        <td><div className="cust"><div className={`av${b.cls ? ` ${b.cls}` : ""}`}>{b.av}</div><div>{b.name}<small>{b.email}</small></div></div></td>
                        <td>{b.dest}</td><td>{b.dates}</td><td>{b.total}</td>
                        <td><span className={`status-tag${b.s !== "paid" ? ` ${b.s}` : ""}`}>{b.s === "paid" ? t.preview.paid : b.s === "pending" ? t.preview.pending : t.preview.draft}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PACKAGES PANEL */}
            <div className={`preview-panel${activeTab === "packages" ? " active" : ""}`}>
              <div className="packages-mock">
                <div className="table-head">
                  <h3>{t.preview.packagesTitle}</h3>
                  <div className="actions">
                    <div className="search-box">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                      <span>{t.preview.packagesSearch}</span>
                    </div>
                    <button className="btn btn-primary btn-sm">{t.preview.packagesNew}</button>
                  </div>
                </div>
                <div className="pkg-grid">
                  {[
                    { bg: "bg-umrah", badge: "Umrah", title: "Umrah 12 Days", desc: "Madinah & Makkah · Direct flight from KLIA", price: "RM 9,800" },
                    { bg: "bg-bali", badge: "Holiday", title: "Bali Family 5D4N", desc: "Seminyak resort · Private transfers · Half-board", price: "RM 2,410" },
                    { bg: "bg-tokyo", badge: "Holiday", title: "Tokyo Highlights 7D6N", desc: "Shinjuku stay · Mt. Fuji day trip · JR Pass included", price: "RM 4,820" },
                    { bg: "bg-istanbul", badge: "Halal", title: "Istanbul Heritage 9D7N", desc: "Old City + Cappadocia · Halal-friendly itinerary", price: "RM 6,100" },
                    { bg: "bg-korea", badge: "Holiday", title: "Korea Spring 6D5N", desc: "Seoul · Nami Island · Cherry blossom season", price: "RM 3,650" },
                    { bg: "bg-dubai", badge: "Holiday", title: "Dubai Express 5D4N", desc: "Downtown stay · Desert safari · Burj Khalifa", price: "RM 3,075" },
                  ].map((p) => (
                    <div className="pkg-card" key={p.title}>
                      <div className={`pkg-img ${p.bg}`}><span className="badge">{p.badge}</span></div>
                      <div className="pkg-info">
                        <div className="t">{p.title}</div>
                        <div className="d">{p.desc}</div>
                        <div className="price-row">
                          <span className="pf">{t.preview.from}</span>
                          <div><span className="pa">{p.price}</span><span className="pp">{t.preview.pax}</span></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* INVOICE PANEL */}
            <div className={`preview-panel${activeTab === "invoice" ? " active" : ""}`}>
              <div className="invoice-mock">
                <div className="invoice-side">
                  <h3>{t.preview.invTitle}</h3>
                  <p>{t.preview.invLead}</p>
                  <div className="invoice-meta">
                    <div><span>{t.preview.invNum}</span><span>INV-2026-0142</span></div>
                    <div><span>{t.preview.invStatus}</span><span style={{ color: "var(--accent-deep)" }}>{t.preview.invStatusPaid}</span></div>
                    <div><span>{t.preview.invSst}</span><span>RM 357.04</span></div>
                    <div><span>{t.preview.invTotal}</span><span>RM 4,820.00</span></div>
                  </div>
                </div>
                <div className="invoice-paper">
                  <div className="inv-head">
                    <div>
                      <h4>{t.preview.invHeading}</h4>
                      <div className="num">INV-2026-0142 · <span>{t.preview.invIssued}</span></div>
                    </div>
                    <div className="inv-from">
                      <b>Wanderly Travel Sdn Bhd</b>
                      Lot 12, Jalan Tun Razak<br />
                      Kuala Lumpur · SST: W10-1234
                    </div>
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginBottom: 14 }}>
                    <b style={{ color: "var(--ink)", display: "block", fontSize: 13, marginBottom: 2 }}>{t.preview.invBilled}</b>
                    Sarah Lim · sarah.l@gmail.com
                  </div>
                  <table className="inv-tbl">
                    <thead><tr>
                      <th>{t.preview.invDesc}</th>
                      <th className="r">{t.preview.invQty}</th>
                      <th className="r">{t.preview.invAmt}</th>
                    </tr></thead>
                    <tbody>
                      <tr><td>{t.preview.invLine1}</td><td className="r">2</td><td className="r">RM 3,800.00</td></tr>
                      <tr><td>{t.preview.invLine2}</td><td className="r">2</td><td className="r">RM 320.00</td></tr>
                      <tr><td>{t.preview.invLine3}</td><td className="r">1</td><td className="r">RM 342.96</td></tr>
                    </tbody>
                  </table>
                  <div className="inv-totals">
                    <div><span>{t.preview.invSubtotal}</span><span>RM 4,462.96</span></div>
                    <div><span>{t.preview.invSst}</span><span>RM 357.04</span></div>
                    <div className="grand"><span>{t.preview.invTotal}</span><span>RM 4,820.00</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================== HOW IT WORKS =================== */}
      <section className="how" id="how">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t.how.eyebrow}</span>
            <h2>{t.how.title}</h2>
            <p className="lead" style={{ marginTop: 14 }}>{t.how.lead}</p>
          </div>
          <div className="how-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {[
              { n: "1", t: t.how.s1t, d: t.how.s1d },
              { n: "2", t: t.how.s2t, d: t.how.s2d },
              { n: "3", t: t.how.s3t, d: t.how.s3d },
            ].map((s) => (
              <div className="step" key={s.n}>
                <div className="step-num">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== BENEFITS =================== */}
      <section className="benefits">
        <div className="container">
          <div className="benefits-grid">
            <div>
              <span className="eyebrow">{t.benefits.eyebrow}</span>
              <h2 style={{ margin: "18px 0 16px" }}>{t.benefits.title}</h2>
              <p className="lead" style={{ marginBottom: 32 }}>{t.benefits.lead}</p>
              <div className="benefits-list">
                {[
                  { t: t.benefits.b1t, d: t.benefits.b1d },
                  { t: t.benefits.b2t, d: t.benefits.b2d },
                  { t: t.benefits.b3t, d: t.benefits.b3d },
                  { t: t.benefits.b4t, d: t.benefits.b4d },
                ].map((b) => (
                  <div className="benefit-row" key={b.t}>
                    <div className="check"><Check14 /></div>
                    <div><h3>{b.t}</h3><p>{b.d}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="benefits-stat-card">
              <div className="bsc-eyebrow">{t.benefits.qEyebrow}</div>
              <div className="bsc-quote">{t.benefits.qText}</div>
              <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 12, position: "relative", zIndex: 1 }}>
                <div style={{ width: 40, height: 40, borderRadius: 999, background: "oklch(0.7 0.14 155 / 0.4)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 14 }}>AR</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Aisha Rahman</div>
                  <div style={{ fontSize: 12.5, color: "oklch(0.85 0.03 230)" }}>{t.benefits.qRole}</div>
                </div>
              </div>
              <div className="bsc-stats">
                <div className="bsc-stat"><div className="num">{t.benefits.stat1n}</div><div className="lbl">{t.benefits.stat1l}</div></div>
                <div className="bsc-stat"><div className="num">{t.benefits.stat2n}</div><div className="lbl">{t.benefits.stat2l}</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================== PRICING =================== */}
      <section id="pricing" style={{ padding: "80px 0", background: "var(--surface-2)" }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t.pricing.eyebrow}</span>
            <h2>Simple pricing for travel agencies</h2>
            <p className="lead" style={{ marginTop: 14 }}>Start free. Upgrade as you grow. No hidden fees.</p>
          </div>
        </div>
        <PricingSection />
        <p style={{ textAlign: "center", fontSize: 13, color: "var(--ink-4)", marginTop: 32 }}>
          No credit card required &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; SST compliant
        </p>
      </section>

      {/* =================== TESTIMONIALS =================== */}
      <section className="testi">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t.testi.eyebrow}</span>
            <h2>{t.testi.title}</h2>
          </div>
          <div className="testi-grid">
            {[
              { q: t.testi.q1, n: t.testi.n1, r: t.testi.r1, av: "AR", cls: "" },
              { q: t.testi.q2, n: t.testi.n2, r: t.testi.r2, av: "EH", cls: "g" },
              { q: t.testi.q3, n: t.testi.n3, r: t.testi.r3, av: "MC", cls: "w" },
            ].map((tc) => (
              <div className="testi-card" key={tc.n}>
                <div className="stars">{[0,1,2,3,4].map((i) => <Star key={i} />)}</div>
                <blockquote>{tc.q}</blockquote>
                <div className="who">
                  <div className={`av${tc.cls ? ` ${tc.cls}` : ""}`}>{tc.av}</div>
                  <div><div className="name">{tc.n}</div><div className="role">{tc.r}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== FAQ =================== */}
      <section className="faq" id="faq">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t.faq.eyebrow}</span>
            <h2>{t.faq.title}</h2>
          </div>
          <div className="faq-list">
            {[
              { q: t.faq.q1, a: t.faq.a1 },
              { q: t.faq.q2, a: t.faq.a2 },
              { q: t.faq.q3, a: t.faq.a3 },
              { q: t.faq.q4, a: t.faq.a4 },
              { q: t.faq.q5, a: t.faq.a5 },
            ].map((item, i) => (
              <details key={item.q} className="faq-item" open={i === 0 || undefined}>
                <summary>
                  <span>{item.q}</span>
                  <span className="faq-icon"><PlusIcon /></span>
                </summary>
                <div className="faq-body">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* =================== FINAL CTA =================== */}
      <section className="final-cta">
        <div className="container final-cta-inner">
          <h2>{t.cta.title}</h2>
          <p>{t.cta.lead}</p>
          <div className="hero-ctas" style={{ justifyContent: "center" }}>
            <button type="button" className="btn btn-primary btn-lg" onClick={goToSignup}>
              <span>{t.cta.btn1}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </button>
            <button type="button" className="btn btn-ghost btn-lg" onClick={goToLogin}>{t.cta.btn2}</button>
          </div>
          <div style={{ marginTop: 18, fontSize: 13, color: "oklch(0.85 0.02 230)" }}>{t.cta.note}</div>
        </div>
      </section>

      {/* =================== FOOTER =================== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a className="brand" href="#">
                <div className="logo">T</div>
                <div className="brand-text">
                  <span className="brand-name">TAMS</span>
                  <span className="brand-tag">Travel Agency Management System</span>
                </div>
              </a>
              <p>{t.footer.tag}</p>
            </div>
            <div className="footer-col">
              <h4>{t.footer.product}</h4>
              <ul>
                <li><a href="#features">{t.nav.features}</a></li>
                <li><a href="#pricing">{t.nav.pricing}</a></li>
                <li><a href="#how">{t.nav.how}</a></li>
                <li><a href="#">{t.footer.changelog}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{t.footer.company}</h4>
              <ul>
                <li><a href="#">{t.footer.about}</a></li>
                <li><a href="#">{t.footer.customers}</a></li>
                <li><a href="#">{t.footer.contact}</a></li>
                <li><a href="#">{t.footer.careers}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{t.footer.resources}</h4>
              <ul>
                <li><a href="#">{t.footer.help}</a></li>
                <li><a href="#">{t.footer.sst}</a></li>
                <li><a href="#">{t.footer.api}</a></li>
                <li><a href="#">{t.footer.status}</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div>{t.footer.copy}</div>
            <div className="right">
              <a href="#">{t.footer.privacy}</a>
              <a href="#">{t.footer.terms}</a>
              <a href="#">{t.footer.security}</a>
              <span className="footer-lang">
                <span>{t.footer.lang}</span>
                <span className="lang-switch">
                  <button type="button" className={lang === "en" ? "active" : ""} onClick={() => switchLang("en")}>EN</button>
                  <button type="button" className={lang === "bm" ? "active" : ""} onClick={() => switchLang("bm")}>BM</button>
                </span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
