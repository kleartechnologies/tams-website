"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { goToLogin, goToSignup } from "@/lib/navigation";

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  en: {
    nav: { features: "Features", how: "How it works", pricing: "Pricing", faq: "FAQ", login: "Login", cta: "Start Free Trial" },
    hero: {
      pill: "Built for Malaysian travel agencies 🇲🇾",
      title: "Stop managing your agency through WhatsApp & Excel",
      lead: "TAMS helps travel agencies manage bookings, payments, customers, invoices, and reports — all in one modern system.",
      cta1: "Start Free Trial", cta2: "Book Demo",
      meta1: "7-day free trial", meta2: "No credit card required", meta3: "Cancel anytime",
      fc1l: "Revenue", fc1v: "RM 84,000",
      fc2l: "Bookings", fc2v: "142",
      fc3l: "SST Ready", fc3v: "Auto-calculated",
      fc4l: "PDF invoices", fc4v: "One-click export",
    },
    trust: { head: "Trusted by travel agencies across Malaysia" },
    problem: {
      eyebrow: "The old way",
      title: "Manual operations are slowing your agency down",
      lead: "If these problems feel familiar, your team is spending too much time on admin instead of customers.",
      p1t: "Excel chaos", p1d: "Endless tabs, version conflicts, and broken formulas every busy season.",
      p2t: "Payment tracking nightmares", p2d: "Chasing deposits, matching receipts, never quite knowing who owes what.",
      p3t: "WhatsApp confusion", p3d: "Passport numbers, itineraries, and approvals scattered across endless chats.",
      p4t: "Invoice mistakes", p4d: "Wrong totals, missing SST, embarrassing typos sent to your customers.",
      p5t: "Missing reports", p5d: "You guess at margins instead of seeing real-time revenue and outstanding balances.",
      p6t: "Manual SST calculations", p6d: "Calculating Malaysian SST on every invoice by hand — error-prone and slow.",
    },
    bento: {
      eyebrow: "Features",
      title: "Everything you need in one system",
      lead: "From the first inquiry to the final invoice — TAMS handles the entire booking lifecycle so your team stays focused on customers.",
      feat_t: "Booking Management", feat_d: "Create, update, and track every booking with status, dates, and assigned consultants. One source of truth for your entire team.",
      cust_t: "Customer Management", cust_d: "Contacts, passports, preferences, and full booking history — searchable in one place.",
      pay_t: "Payment Tracking", pay_d: "Log deposits, balances, and refunds. Always know who's paid, partial, or overdue.",
      inv_t: "Invoice & PDF", inv_d: "Branded, SST-ready invoices generated in one click.",
      rep_t: "Reports & Analytics", rep_d: "Revenue, top destinations, outstanding payments — clear dashboards built for owners.",
      team_t: "Multi-user & Multi-agency", team_d: "Add your team, assign roles, and manage multiple branches from one login.",
    },
    show: {
      eyebrow: "Inside TAMS",
      title: "A real product, shipping every day",
      lead: "Every screen below reflects the live TAMS application — built for Malaysian travel agencies.",
      a_tag: "Bookings", a_t: "Manage bookings without spreadsheets",
      a_d: "Track inquiries, confirmations, payments, departures, and customer balances in one clean workflow.",
      a_b1: "Status pipeline — Inquiry → Quoted → Confirmed → Completed",
      a_b2: "Live balance & payment status per booking",
      a_b3: "Search across customers, package, booking no.",
      b_tag: "Packages", b_t: "Create and manage travel packages easily",
      b_d: "Handle Umrah, group tours, honeymoon packages, pricing, and departures in one place.",
      b_b1: "Adult & child pricing per package",
      b_b2: "Next-departure tracking at a glance",
      b_b3: "Umrah, Group Tour, Private Tour types",
      c_tag: "Invoices", c_t: "Generate professional invoices instantly",
      c_d: "Create branded invoices with SST calculations, payment tracking, and downloadable PDFs.",
      c_b1: "Auto SST 6% — no manual math",
      c_b2: "Account summary & balance due",
      c_b3: "One-click PDF export",
      d_tag: "Confirmations", d_t: "Professional booking confirmations for customers",
      d_d: "Automatically generate polished booking confirmations your customers can trust.",
      d_b1: "Traveller list with IC & pricing",
      d_b2: "Branded header with agency identity",
      d_b3: "Customer-ready PDF in one click",
    },
    uc: {
      eyebrow: "Built for every kind of trip",
      title: "From Umrah to corporate travel",
      lead: "TAMS adapts to how your agency actually works — across faith, leisure, and corporate segments.",
      umrah_tag: "Umrah & Hajj", umrah_t: "Faith-based travel",
      umrah_d: "Manage Umrah and Hajj groups with passport tracking, visa workflows, and group-level invoicing.",
      tour_tag: "Leisure & Holidays", tour_t: "Holiday packages",
      tour_d: "Reusable family, honeymoon, and group itineraries — Bali, Tokyo, Korea, Istanbul, and beyond.",
      corp_tag: "Corporate", corp_t: "Business travel",
      corp_d: "Handle corporate accounts, multiple travelers per booking, and company-billed invoices effortlessly.",
    },
    benefits: {
      eyebrow: "Why TAMS",
      title: "Why agencies choose TAMS",
      lead: "Stop juggling spreadsheets, sticky notes, and WhatsApp threads. Run a tighter operation with everything in one place.",
      b1t: "Save hours of admin work", b1d: "Automate invoices, reminders, and reports your team writes by hand today.",
      b2t: "Reduce booking errors", b2d: "One source of truth means no more conflicting versions or missed details.",
      b3t: "Track payments easily", b3d: "Know who has paid what, when — and what's outstanding — in real time.",
      b4t: "Look professional", b4d: "Branded, SST-compliant invoices that build trust with every customer.",
    },
    pricing: {
      eyebrow: "Pricing",
      title: "Simple pricing for travel agencies",
      lead: "Designed for Malaysian travel agencies. Transparent monthly pricing — no setup fees, no hidden costs.",
      basic_name: "Basic", basic_tag: "For small agencies getting started",
      basic_f1: "Up to 100 bookings / month", basic_f2: "Customer management",
      basic_f3: "Booking management", basic_f4: "Basic invoice generation", basic_f5: "Email support",
      basic_cta: "Start Free Trial",
      badge: "Most popular",
      pro_name: "Pro", pro_tag: "For growing agencies that want full control",
      pro_f1: "Everything in Basic", pro_f2: "Unlimited bookings",
      pro_f3: "Payment tracking & SST support", pro_f4: "Reports & analytics",
      pro_f5: "PDF invoice & export", pro_f6: "Multi-user / multi-agency", pro_f7: "Priority support",
      pro_cta: "Start Free Trial",
      note: "Designed for Malaysian travel agencies · SST ready · Cancel anytime",
    },
    faq: {
      eyebrow: "FAQ", title: "Frequently asked questions",
      q1: "Do I need to install anything?", a1: "No. TAMS runs entirely in your browser. Just sign up, log in, and start managing your agency — no downloads, no plugins, no servers to maintain.",
      q2: "Can I cancel anytime?", a2: "Yes. There are no contracts or lock-ins. Cancel from your account settings anytime and you won't be billed again.",
      q3: "Is SST supported?", a3: "Yes. TAMS includes built-in Malaysian SST support. Configure your rate once and it applies to invoices and reports automatically.",
      q4: "Can multiple staff use one account?", a4: "Yes. The Pro plan supports multiple users with role-based permissions, so your consultants, finance team, and managers each see what they need.",
      q5: "Is this suitable for small agencies?", a5: "TAMS is designed for solo operators and small teams as much as growing agencies. The Basic plan is built specifically for agencies just getting started.",
    },
    cta: {
      title: "Ready to grow your travel agency?",
      lead: "Join travel agencies running smoother, faster operations with TAMS.",
      btn1: "Start Free Trial", btn2: "Book Demo",
      note: "No credit card required · 7-day free trial",
    },
    footer: {
      tag: "The modern operating system for Malaysian travel agencies — bookings, customers, payments, and invoices in one clean place.",
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
      pill: "Direka untuk agensi pelancongan Malaysia 🇲🇾",
      title: "Berhenti urus agensi anda melalui WhatsApp & Excel",
      lead: "TAMS membantu agensi pelancongan urus tempahan, pembayaran, pelanggan, invois, dan laporan — semua dalam satu sistem moden.",
      cta1: "Cuba Percuma", cta2: "Tempah Demo",
      meta1: "Percubaan 7 hari", meta2: "Tiada kad kredit diperlukan", meta3: "Batal bila-bila masa",
      fc1l: "Pendapatan", fc1v: "RM 84,000",
      fc2l: "Tempahan", fc2v: "142",
      fc3l: "Sokong SST", fc3v: "Dikira automatik",
      fc4l: "Invois PDF", fc4v: "Eksport sekali klik",
    },
    trust: { head: "Dipercayai oleh agensi pelancongan di seluruh Malaysia" },
    problem: {
      eyebrow: "Cara lama",
      title: "Operasi manual melambatkan agensi anda",
      lead: "Jika masalah ini terasa biasa, pasukan anda menghabiskan terlalu banyak masa pada kerja pentadbiran berbanding pelanggan.",
      p1t: "Kekacauan Excel", p1d: "Banyak tab, fail bercanggah, dan formula rosak setiap musim sibuk.",
      p2t: "Sukar jejak pembayaran", p2d: "Mengejar deposit, menyemak resit, dan tidak tahu siapa berhutang berapa.",
      p3t: "Kekeliruan WhatsApp", p3d: "Nombor pasport, itinerari, dan kelulusan bertaburan dalam banyak sembang.",
      p4t: "Kesilapan invois", p4d: "Jumlah salah, SST tertinggal, kesilapan taip yang memalukan dihantar kepada pelanggan.",
      p5t: "Tiada laporan", p5d: "Anda hanya meneka margin tanpa melihat pendapatan dan baki tertunggak masa nyata.",
      p6t: "Kira SST secara manual", p6d: "Mengira SST Malaysia pada setiap invois secara manual — rawan kesilapan dan lambat.",
    },
    bento: {
      eyebrow: "Ciri-ciri",
      title: "Semua yang anda perlukan dalam satu sistem",
      lead: "Dari pertanyaan pertama hingga invois akhir — TAMS menguruskan keseluruhan kitaran tempahan supaya pasukan anda fokus pada pelanggan.",
      feat_t: "Pengurusan Tempahan", feat_d: "Cipta, kemas kini dan jejaki setiap tempahan dengan status, tarikh dan perunding. Satu sumber kebenaran untuk seluruh pasukan.",
      cust_t: "Pengurusan Pelanggan", cust_d: "Kenalan, pasport, citarasa, dan sejarah tempahan penuh — mudah dicari di satu tempat.",
      pay_t: "Pemantauan Pembayaran", pay_d: "Rekod deposit, baki dan bayaran balik. Sentiasa tahu siapa telah bayar, sebahagian, atau tertunggak.",
      inv_t: "Invois & PDF", inv_d: "Invois berjenama, siap SST, dijana sekali klik.",
      rep_t: "Laporan & Analitik", rep_d: "Pendapatan, destinasi popular, bayaran tertunggak — papan pemuka jelas untuk pemilik.",
      team_t: "Pelbagai Pengguna & Agensi", team_d: "Tambah pasukan, tetapkan peranan, dan urus beberapa cawangan dari satu log masuk.",
    },
    show: {
      eyebrow: "Di dalam TAMS",
      title: "Produk sebenar, dihantar setiap hari",
      lead: "Setiap skrin di bawah mencerminkan aplikasi TAMS yang aktif — dibina untuk agensi pelancongan Malaysia.",
      a_tag: "Tempahan", a_t: "Urus tempahan tanpa spreadsheet",
      a_d: "Jejaki pertanyaan, pengesahan, pembayaran, berlepas, dan baki pelanggan dalam satu aliran kerja yang kemas.",
      a_b1: "Saluran status — Pertanyaan → Sebut Harga → Disahkan → Selesai",
      a_b2: "Baki dan status pembayaran secara langsung bagi setiap tempahan",
      a_b3: "Cari mengikut pelanggan, pakej, nombor tempahan.",
      b_tag: "Pakej", b_t: "Cipta dan urus pakej pelancongan dengan mudah",
      b_d: "Urus Umrah, lawatan berkumpulan, pakej bulan madu, harga, dan berlepas di satu tempat.",
      b_b1: "Harga dewasa & kanak-kanak bagi setiap pakej",
      b_b2: "Jejak tarikh berlepas seterusnya sekilas pandang",
      b_b3: "Jenis Umrah, Lawatan Berkumpulan, Lawatan Persendirian",
      c_tag: "Invois", c_t: "Jana invois profesional serta-merta",
      c_d: "Buat invois berjenama dengan pengiraan SST, penjejakan pembayaran, dan PDF yang boleh dimuat turun.",
      c_b1: "SST automatik 6% — tiada matematik manual",
      c_b2: "Ringkasan akaun & baki kena bayar",
      c_b3: "Eksport PDF sekali klik",
      d_tag: "Pengesahan", d_t: "Pengesahan tempahan profesional untuk pelanggan",
      d_d: "Jana pengesahan tempahan yang sempurna secara automatik yang boleh dipercayai oleh pelanggan anda.",
      d_b1: "Senarai pengembara dengan IC & harga",
      d_b2: "Pengepala berjenama dengan identiti agensi",
      d_b3: "PDF sedia pelanggan sekali klik",
    },
    uc: {
      eyebrow: "Dibina untuk setiap jenis perjalanan",
      title: "Dari Umrah hingga perjalanan korporat",
      lead: "TAMS menyesuaikan diri dengan cara agensi anda benar-benar beroperasi — merentas segmen keagamaan, sukan dan korporat.",
      umrah_tag: "Umrah & Haji", umrah_t: "Pelancongan berasaskan iman",
      umrah_d: "Urus kumpulan Umrah dan Haji dengan penjejakan pasport, aliran kerja visa, dan penginvoisan peringkat kumpulan.",
      tour_tag: "Sukan & Percutian", tour_t: "Pakej percutian",
      tour_d: "Itinerari keluarga, bulan madu, dan berkumpulan yang boleh digunakan semula — Bali, Tokyo, Korea, Istanbul dan banyak lagi.",
      corp_tag: "Korporat", corp_t: "Perjalanan perniagaan",
      corp_d: "Urus akaun korporat, berbilang pengembara setiap tempahan, dan invois bil syarikat dengan mudah.",
    },
    benefits: {
      eyebrow: "Kenapa TAMS",
      title: "Kenapa agensi memilih TAMS",
      lead: "Berhenti bergelut dengan spreadsheet, nota melekit, dan benang WhatsApp. Jalankan operasi yang lebih kemas dengan semuanya di satu tempat.",
      b1t: "Jimat berjam-jam kerja pentadbiran", b1d: "Automasikan invois, peringatan dan laporan yang ditulis manual hari ini.",
      b2t: "Kurangkan kesilapan tempahan", b2d: "Satu sumber kebenaran — tiada lagi versi bercanggah atau butiran terlepas.",
      b3t: "Pantau pembayaran dengan mudah", b3d: "Tahu siapa bayar berapa, bila — dan apa yang tertunggak — secara masa nyata.",
      b4t: "Tampak profesional", b4d: "Invois berjenama yang mematuhi SST dan membina kepercayaan dengan setiap pelanggan.",
    },
    pricing: {
      eyebrow: "Harga",
      title: "Harga mudah untuk agensi pelancongan",
      lead: "Direka untuk agensi pelancongan Malaysia. Harga bulanan telus — tiada yuran pemasangan, tiada kos tersembunyi.",
      basic_name: "Basic", basic_tag: "Untuk agensi kecil yang baru bermula",
      basic_f1: "Sehingga 100 tempahan / bulan", basic_f2: "Pengurusan pelanggan",
      basic_f3: "Pengurusan tempahan", basic_f4: "Penjanaan invois asas", basic_f5: "Sokongan emel",
      basic_cta: "Cuba Percuma",
      badge: "Paling popular",
      pro_name: "Pro", pro_tag: "Untuk agensi yang berkembang dan mahukan kawalan penuh",
      pro_f1: "Semua dalam Basic", pro_f2: "Tempahan tanpa had",
      pro_f3: "Pemantauan pembayaran & SST", pro_f4: "Laporan & analitik",
      pro_f5: "Invois PDF & eksport", pro_f6: "Pelbagai pengguna / agensi", pro_f7: "Sokongan keutamaan",
      pro_cta: "Cuba Percuma",
      note: "Direka untuk agensi pelancongan Malaysia · Sokong SST · Batal bila-bila masa",
    },
    faq: {
      eyebrow: "Soalan Lazim", title: "Soalan yang sering ditanya",
      q1: "Adakah saya perlu memasang apa-apa?", a1: "Tidak. TAMS berjalan sepenuhnya dalam pelayar anda. Daftar, log masuk, dan mula mengurus agensi anda — tanpa muat turun, tanpa pemalam, tanpa pelayan untuk diselenggara.",
      q2: "Bolehkah saya batalkan bila-bila masa?", a2: "Boleh. Tiada kontrak atau ikatan. Batalkan dari tetapan akaun anda bila-bila masa dan anda tidak akan dikenakan bil lagi.",
      q3: "Adakah SST disokong?", a3: "Ya. TAMS menyokong SST Malaysia secara terbina. Tetapkan kadar anda sekali dan ia akan digunakan pada invois dan laporan secara automatik.",
      q4: "Bolehkah beberapa kakitangan guna satu akaun?", a4: "Boleh. Pelan Pro menyokong pelbagai pengguna dengan kebenaran berdasarkan peranan, supaya perunding, pasukan kewangan dan pengurus masing-masing melihat apa yang mereka perlukan.",
      q5: "Sesuaikah untuk agensi kecil?", a5: "TAMS direka untuk pengendali solo dan pasukan kecil sepertimana agensi yang sedang berkembang. Pelan Basic dibina khas untuk agensi yang baru bermula.",
    },
    cta: {
      title: "Bersedia untuk mengembangkan agensi anda?",
      lead: "Sertai agensi pelancongan yang menjalankan operasi lebih lancar dan pantas dengan TAMS.",
      btn1: "Cuba Percuma", btn2: "Tempah Demo",
      note: "Tiada kad kredit · Percubaan 7 hari",
    },
    footer: {
      tag: "Sistem operasi moden untuk agensi pelancongan Malaysia — tempahan, pelanggan, pembayaran, dan invois dalam satu tempat yang kemas.",
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

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const CheckSm = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const Plus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-summary" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        <span className={`faq-icon${open ? " open" : ""}`}><Plus /></span>
      </button>
      {open && <div className="faq-body">{a}</div>}
    </div>
  );
}

// ─── CheckBullet helper ───────────────────────────────────────────────────────
function CheckBullet({ text }: { text: string }) {
  return (
    <li>
      <span className="show-bullet-check"><CheckSm /></span>
      <span>{text}</span>
    </li>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [lang, setLangState] = useState<Lang>("en");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("tams-lang") as Lang | null;
    if (saved && saved in T) setLangState(saved);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.10 }
    );
    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  function switchLang(l: Lang) { setLangState(l); localStorage.setItem("tams-lang", l); }

  const t = T[lang];

  return (
    <>
      {/* ═══════════════════════════════════════ NAV ═══════════════════════════════════════ */}
      <header className={`nav-wrap${scrolled ? " scrolled" : ""}`}>
        <div className="container nav">
          <a href="#" className="brand">
            <span className="brand-mark">T</span>
            <span>TAMS</span>
          </a>

          <nav className="nav-links">
            <a href="#features">{t.nav.features}</a>
            <a href="#showcase">{t.nav.how}</a>
            <a href="#pricing">{t.nav.pricing}</a>
            <a href="#faq">{t.nav.faq}</a>
          </nav>

          <div className="nav-right">
            <div className="lang-toggle" role="group" aria-label="Language">
              <button type="button" className={lang === "en" ? "active" : ""} onClick={() => switchLang("en")}>EN</button>
              <button type="button" className={lang === "bm" ? "active" : ""} onClick={() => switchLang("bm")}>BM</button>
            </div>
            <button type="button" className="nav-link-login" onClick={goToLogin}>{t.nav.login}</button>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => goToSignup()}>{t.nav.cta}</button>
          </div>

          <button
            type="button"
            className={`nav-burger${mobileOpen ? " open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span /><span /><span />
          </button>
        </div>

        <div className={`mobile-drawer${mobileOpen ? " open" : ""}`}>
          <a href="#features" onClick={() => setMobileOpen(false)}>{t.nav.features}</a>
          <a href="#showcase" onClick={() => setMobileOpen(false)}>{t.nav.how}</a>
          <a href="#pricing" onClick={() => setMobileOpen(false)}>{t.nav.pricing}</a>
          <a href="#faq" onClick={() => setMobileOpen(false)}>{t.nav.faq}</a>
          <div className="drawer-divider" />
          <div className="drawer-lang">
            <span>{t.footer.lang}</span>
            <div className="lang-toggle">
              <button type="button" className={lang === "en" ? "active" : ""} onClick={() => switchLang("en")}>EN</button>
              <button type="button" className={lang === "bm" ? "active" : ""} onClick={() => switchLang("bm")}>BM</button>
            </div>
          </div>
          <button type="button" className="drawer-login" onClick={() => { goToLogin(); setMobileOpen(false); }}>{t.nav.login}</button>
          <button type="button" className="btn btn-blue btn-lg drawer-cta" onClick={() => { goToSignup(); setMobileOpen(false); }}>{t.nav.cta}</button>
        </div>
      </header>

      {/* ═══════════════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="hero">
        <div className="container hero-grid">
          {/* Left — copy */}
          <div className="hero-copy">
            <span className="eyebrow hero-pill">
              <span className="dot" />
              <span>{t.hero.pill}</span>
            </span>
            <h1>{t.hero.title}</h1>
            <p className="hero-lead">{t.hero.lead}</p>
            <div className="hero-ctas">
              <button type="button" className="btn btn-blue btn-lg" onClick={() => goToSignup()}>
                {t.hero.cta1}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </button>
              <button type="button" className="btn btn-ghost btn-lg" onClick={goToLogin}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                {t.hero.cta2}
              </button>
            </div>
            <div className="hero-meta">
              {[t.hero.meta1, t.hero.meta2, t.hero.meta3].map((m) => (
                <span key={m}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Right — screenshot + floating cards */}
          <div className="hero-shot-wrap">
            <div className="hero-shot-frame">
              <div className="hero-shot-tb">
                <div className="dots"><span /><span /><span /></div>
                <div className="url">app.usetams.com / dashboard</div>
              </div>
              <Image
                src="/images/TAMS-DASHBOARD.png"
                alt="TAMS dashboard — bookings, revenue, and outstanding payments at a glance"
                width={2940}
                height={1672}
                className="hero-shot-img"
                priority
              />
            </div>

            {/* Floating cards */}
            <div className="float-card fc-revenue">
              <div className="ic green">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <div>
                <div className="l">{t.hero.fc1l}</div>
                <div className="v">{t.hero.fc1v}</div>
              </div>
            </div>

            <div className="float-card fc-bookings">
              <div className="ic blue">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              </div>
              <div>
                <div className="l">{t.hero.fc2l}</div>
                <div className="v">{t.hero.fc2v} <span className="up">+18%</span></div>
              </div>
            </div>

            <div className="float-card fc-sst">
              <div className="ic indigo">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
              </div>
              <div>
                <div className="l">{t.hero.fc3l}</div>
                <div className="v">{t.hero.fc3v}</div>
              </div>
            </div>

            <div className="float-card fc-pdf">
              <div className="ic amber">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              </div>
              <div>
                <div className="l">{t.hero.fc4l}</div>
                <div className="v">{t.hero.fc4v}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ TRUST ═════════════════════════════════════ */}
      <section className="trust">
        <div className="container">
          <div className="trust-head">{t.trust.head}</div>
        </div>
        <div className="marquee">
          <div className="marquee-track">
            {[
              { letter: "S", bg: "linear-gradient(135deg,oklch(0.55 0.15 245),oklch(0.45 0.16 265))", name: "Safa Travel" },
              { letter: "A", bg: "linear-gradient(135deg,oklch(0.5 0.14 165),oklch(0.45 0.13 195))",  name: "Ar-Rayyan Holidays" },
              { letter: "W", bg: "linear-gradient(135deg,oklch(0.6 0.14 25),oklch(0.5 0.16 50))",    name: "Wanderly Travel" },
              { letter: "U", bg: "linear-gradient(135deg,oklch(0.5 0.16 270),oklch(0.4 0.18 290))",  name: "UmrahGo" },
              { letter: "H", bg: "linear-gradient(135deg,oklch(0.55 0.13 195),oklch(0.45 0.13 230))",name: "Horizon Travel" },
              { letter: "P", bg: "linear-gradient(135deg,oklch(0.6 0.16 50),oklch(0.5 0.14 15))",   name: "Pelangi Tours" },
              { letter: "M", bg: "linear-gradient(135deg,oklch(0.5 0.13 165),oklch(0.4 0.14 200))", name: "Mutiara Travel" },
              { letter: "Q", bg: "linear-gradient(135deg,oklch(0.45 0.15 275),oklch(0.55 0.14 245))",name: "Qiblat Journey" },
            ].flatMap((item, i) => [
              <span className="logo-pill" key={`a-${i}`}>
                <span className="logo-mark" style={{ background: item.bg }}>{item.letter}</span>
                {item.name}
              </span>,
              <span className="logo-pill" key={`b-${i}`} aria-hidden="true">
                <span className="logo-mark" style={{ background: item.bg }}>{item.letter}</span>
                {item.name}
              </span>,
            ])}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ PROBLEM ═══════════════════════════════════ */}
      <section className="section problems" id="problems">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow eyebrow-warn"><span className="dot" />{t.problem.eyebrow}</span>
            <h2 className="section-title">{t.problem.title}</h2>
            <p className="section-lead">{t.problem.lead}</p>
          </div>
          <div className="problem-grid reveal-stagger">
            {([
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="3" x2="9" y2="21" /></svg>, t: t.problem.p1t, d: t.problem.p1d },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>, t: t.problem.p2t, d: t.problem.p2d },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>, t: t.problem.p3t, d: t.problem.p3d },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="15" x2="15" y2="15" /></svg>, t: t.problem.p4t, d: t.problem.p4d },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 5-5" /></svg>, t: t.problem.p5t, d: t.problem.p5d },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>, t: t.problem.p6t, d: t.problem.p6d },
            ] as const).map((p) => (
              <article className="problem-card" key={p.t}>
                <div className="ic">{p.icon}</div>
                <h4>{p.t}</h4>
                <p>{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ FEATURES BENTO ═════════════════════════════ */}
      <section id="features" className="section" style={{ background: "var(--bg-soft)" }}>
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow"><span className="dot" />{t.bento.eyebrow}</span>
            <h2 className="section-title">{t.bento.title}</h2>
            <p className="section-lead">{t.bento.lead}</p>
          </div>
          <div className="bento">
            {/* Booking Management — span 3 */}
            <article className="bento-card feature span-3 reveal">
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              </div>
              <h3>{t.bento.feat_t}</h3>
              <p>{t.bento.feat_d}</p>
              <div className="mini-preview">
                <div className="row"><span className="name">Aisha · Bali 5D4N</span><span className="pill">Paid</span></div>
                <div className="row"><span className="name">Hafiz · Umrah 12D</span><span className="pill w">Pending</span></div>
                <div className="row"><span className="name">Mei Chen · Tokyo 7D</span><span className="pill">Paid</span></div>
                <div className="row"><span className="name">Daniel · Korea 6D</span><span className="pill">Paid</span></div>
              </div>
            </article>

            {/* Customer Management — span 3 */}
            <article className="bento-card span-3 reveal">
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              </div>
              <h3>{t.bento.cust_t}</h3>
              <p>{t.bento.cust_d}</p>
              <div className="mini-preview">
                <div className="row"><span className="name">Aisha Rahman</span><span className="pill b">12 trips</span></div>
                <div className="row"><span className="name">Hafiz Yusof</span><span className="pill b">7 trips</span></div>
                <div className="row"><span className="name">Mei Chen</span><span className="pill b">5 trips</span></div>
              </div>
            </article>

            {/* Payment Tracking — span 2 */}
            <article className="bento-card span-2 reveal">
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
              </div>
              <h3>{t.bento.pay_t}</h3>
              <p>{t.bento.pay_d}</p>
              <div className="mini-bars">
                {[35, 55, 42, 70, 60, 85, 75].map((h, i) => (
                  <span key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
            </article>

            {/* Invoice & PDF — span 2 */}
            <article className="bento-card span-2 reveal">
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" /></svg>
              </div>
              <h3>{t.bento.inv_t}</h3>
              <p>{t.bento.inv_d}</p>
              <div className="invoice-mini">
                <div className="h"><b>INV-2026-1042</b><span>Paid</span></div>
                <div className="lines">
                  <div className="l"><span>Bali 5D4N</span><span>RM 3,800</span></div>
                  <div className="l"><span>SST 8%</span><span>RM 304</span></div>
                </div>
                <div className="total"><span>Total</span><span>RM 4,104</span></div>
              </div>
            </article>

            {/* Reports — span 2 */}
            <article className="bento-card span-2 reveal">
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 5-5" /></svg>
              </div>
              <h3>{t.bento.rep_t}</h3>
              <p>{t.bento.rep_d}</p>
              <div className="mini-preview">
                <div className="row"><span className="name">Bali</span><span className="pill">RM 84k</span></div>
                <div className="row"><span className="name">Tokyo</span><span className="pill">RM 62k</span></div>
                <div className="row"><span className="name">Umrah</span><span className="pill">RM 51k</span></div>
              </div>
            </article>

            {/* Multi-user — span 6 */}
            <article className="bento-card span-6 reveal" style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 260 }}>
                <div className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </div>
                <h3>{t.bento.team_t}</h3>
                <p style={{ marginBottom: 0 }}>{t.bento.team_d}</p>
              </div>
              <div style={{ display: "flex", flex: 1, justifyContent: "flex-end", minWidth: 260 }}>
                {[
                  { init: "AR", bg: "oklch(0.95 0.04 245)", color: "var(--primary)" },
                  { init: "HY", bg: "oklch(0.95 0.04 165)", color: "oklch(0.45 0.13 165)" },
                  { init: "MC", bg: "oklch(0.95 0.04 280)", color: "var(--indigo)" },
                  { init: "DT", bg: "oklch(0.96 0.06 80)",  color: "oklch(0.5 0.14 60)" },
                  { init: "+8", bg: "var(--ink)",            color: "#fff", small: true },
                ].map((av, i) => (
                  <div key={i} style={{
                    width: 52, height: 52, borderRadius: "999px",
                    background: av.bg, color: av.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, border: "3px solid white",
                    marginLeft: i === 0 ? 0 : -12,
                    boxShadow: "var(--shadow-sm)",
                    fontSize: av.small ? 13 : 14,
                    flexShrink: 0,
                    position: "relative",
                  }}>
                    {av.init}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ SHOWCASE ═══════════════════════════════════ */}
      <section id="showcase" className="showcase">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow"><span className="dot" />{t.show.eyebrow}</span>
            <h2 className="section-title">{t.show.title}</h2>
            <p className="section-lead">{t.show.lead}</p>
          </div>

          {/* A — Bookings */}
          <div className="show-row">
            <div className="show-copy reveal">
              <span className="eyebrow"><span className="dot" />{t.show.a_tag}</span>
              <h3>{t.show.a_t}</h3>
              <p>{t.show.a_d}</p>
              <ul className="show-bullets">
                <CheckBullet text={t.show.a_b1} />
                <CheckBullet text={t.show.a_b2} />
                <CheckBullet text={t.show.a_b3} />
              </ul>
            </div>
            <div className="show-shot reveal">
              <div className="shot-frame">
                <div className="shot-chrome">
                  <div className="dots"><span /><span /><span /></div>
                  <div className="url-bar">app.usetams.com / bookings</div>
                </div>
                <div className="shot-body" style={{ padding: "16px 0 0" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px 12px" }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>Bookings</span>
                    <button className="btn btn-primary btn-sm">+ New booking</button>
                  </div>
                  <table className="shot-table">
                    <thead><tr><th>Customer</th><th>Package</th><th>Dates</th><th>Total</th><th>Status</th></tr></thead>
                    <tbody>
                      {[
                        { av: "AR", name: "Aisha Rahman", pkg: "Bali 5D4N", dates: "12–16 May", amt: "RM 4,104", s: "paid" },
                        { av: "HY", name: "Hafiz Yusof", pkg: "Umrah 12D", dates: "05–16 Jun", amt: "RM 11,200", s: "paid" },
                        { av: "MC", name: "Mei Chen", pkg: "Tokyo 7D6N", dates: "18–24 Jun", amt: "RM 6,280", s: "pending" },
                        { av: "DT", name: "Daniel Tan", pkg: "Korea 6D5N", dates: "22–27 Jun", amt: "RM 7,300", s: "paid" },
                        { av: "SA", name: "Siti Amirah", pkg: "Istanbul 9D", dates: "04–12 Jul", amt: "RM 8,100", s: "draft" },
                      ].map((b) => (
                        <tr key={b.name}>
                          <td><div style={{ display: "flex", alignItems: "center", gap: 8 }}><div className="shot-av">{b.av}</div><span style={{ fontWeight: 500, color: "var(--ink)", fontSize: 12 }}>{b.name}</span></div></td>
                          <td>{b.pkg}</td><td>{b.dates}</td><td style={{ fontWeight: 600 }}>{b.amt}</td>
                          <td><span className={`shot-tag ${b.s}`}>{b.s.charAt(0).toUpperCase() + b.s.slice(1)}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* B — Packages (reversed) */}
          <div className="show-row reverse">
            <div className="show-copy reveal">
              <span className="eyebrow"><span className="dot" />{t.show.b_tag}</span>
              <h3>{t.show.b_t}</h3>
              <p>{t.show.b_d}</p>
              <ul className="show-bullets">
                <CheckBullet text={t.show.b_b1} />
                <CheckBullet text={t.show.b_b2} />
                <CheckBullet text={t.show.b_b3} />
              </ul>
            </div>
            <div className="show-shot reveal">
              <div className="shot-frame">
                <div className="shot-chrome">
                  <div className="dots"><span /><span /><span /></div>
                  <div className="url-bar">app.usetams.com / packages</div>
                </div>
                <div className="shot-pkg-grid">
                  {[
                    { bg: "linear-gradient(135deg,oklch(0.45 0.18 260),oklch(0.35 0.2 250))", badge: "Umrah", t: "Umrah 12D", p: "RM 9,800" },
                    { bg: "linear-gradient(135deg,oklch(0.6 0.14 155),oklch(0.45 0.16 145))", badge: "Holiday", t: "Bali 5D4N", p: "RM 2,410" },
                    { bg: "linear-gradient(135deg,oklch(0.6 0.12 0),oklch(0.45 0.14 350))", badge: "Holiday", t: "Tokyo 7D6N", p: "RM 4,820" },
                    { bg: "linear-gradient(135deg,oklch(0.55 0.16 50),oklch(0.45 0.18 40))", badge: "Halal", t: "Istanbul 9D", p: "RM 6,100" },
                    { bg: "linear-gradient(135deg,oklch(0.6 0.12 330),oklch(0.45 0.14 320))", badge: "Holiday", t: "Korea 6D5N", p: "RM 3,650" },
                    { bg: "linear-gradient(135deg,oklch(0.65 0.14 80),oklch(0.5 0.16 70))", badge: "Holiday", t: "Dubai 5D4N", p: "RM 3,075" },
                  ].map((p) => (
                    <div className="shot-pkg" key={p.t}>
                      <div className="shot-pkg-art" style={{ background: p.bg }}>
                        <span className="shot-pkg-badge">{p.badge}</span>
                      </div>
                      <div className="shot-pkg-info">
                        <div className="t">{p.t}</div>
                        <div className="p">{p.p}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* C — Invoices */}
          <div className="show-row">
            <div className="show-copy reveal">
              <span className="eyebrow"><span className="dot" />{t.show.c_tag}</span>
              <h3>{t.show.c_t}</h3>
              <p>{t.show.c_d}</p>
              <ul className="show-bullets">
                <CheckBullet text={t.show.c_b1} />
                <CheckBullet text={t.show.c_b2} />
                <CheckBullet text={t.show.c_b3} />
              </ul>
            </div>
            <div className="show-shot reveal">
              <div className="shot-frame doc">
                <div className="shot-chrome">
                  <div className="dots"><span /><span /><span /></div>
                  <div className="url-bar">app.usetams.com / invoices / INV-2026-1042</div>
                </div>
                <div className="shot-invoice">
                  <div className="shot-inv-head">
                    <div>
                      <h4>Invoice</h4>
                      <div className="num">INV-2026-1042 · Issued 12 May 2026</div>
                    </div>
                    <div className="shot-inv-from">
                      <b>Wanderly Travel Sdn Bhd</b>
                      Lot 12, Jalan Tun Razak<br />
                      Kuala Lumpur · SST: W10-1234
                    </div>
                  </div>
                  <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginBottom: 12 }}>
                    <b style={{ color: "var(--ink)", display: "block", marginBottom: 2 }}>Billed to</b>
                    Aisha Rahman · aisha.rahman@gmail.com
                  </div>
                  <table className="shot-inv-tbl">
                    <thead><tr><th>Description</th><th className="r">Qty</th><th className="r">Amount</th></tr></thead>
                    <tbody>
                      <tr><td>Bali Holiday Package · 5D4N</td><td className="r">2</td><td className="r">RM 3,800.00</td></tr>
                      <tr><td>Travel Insurance Add-on</td><td className="r">2</td><td className="r">RM 320.00</td></tr>
                      <tr><td>Airport Transfer (Return)</td><td className="r">1</td><td className="r">RM 280.00</td></tr>
                    </tbody>
                  </table>
                  <div className="shot-inv-total">
                    <div><span>Subtotal</span><span>RM 4,400.00</span></div>
                    <div><span>SST 6%</span><span>RM 264.00</span></div>
                    <div className="grand"><span>Total</span><span>RM 4,664.00</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* D — Confirmations (reversed) */}
          <div className="show-row reverse">
            <div className="show-copy reveal">
              <span className="eyebrow"><span className="dot" />{t.show.d_tag}</span>
              <h3>{t.show.d_t}</h3>
              <p>{t.show.d_d}</p>
              <ul className="show-bullets">
                <CheckBullet text={t.show.d_b1} />
                <CheckBullet text={t.show.d_b2} />
                <CheckBullet text={t.show.d_b3} />
              </ul>
            </div>
            <div className="show-shot reveal">
              <div className="shot-frame doc">
                <div className="shot-chrome">
                  <div className="dots"><span /><span /><span /></div>
                  <div className="url-bar">app.usetams.com / confirmations / BC-2026-0089</div>
                </div>
                <div className="shot-confirm">
                  <div className="shot-confirm-head">
                    <div className="shot-confirm-logo">T</div>
                    <div>
                      <div className="shot-confirm-title">Booking Confirmation</div>
                      <div className="shot-confirm-sub">Wanderly Travel Sdn Bhd · BC-2026-0089</div>
                    </div>
                  </div>
                  <div className="shot-confirm-section">
                    <h6>Package Details</h6>
                    <div className="shot-confirm-row"><span>Package</span><b>Bali Family 5D4N</b></div>
                    <div className="shot-confirm-row"><span>Departure</span><b>12 May 2026</b></div>
                    <div className="shot-confirm-row"><span>Return</span><b>16 May 2026</b></div>
                    <div className="shot-confirm-row"><span>Hotel</span><b>Seminyak Beach Resort</b></div>
                  </div>
                  <div className="shot-confirm-section">
                    <h6>Travellers</h6>
                    <div className="shot-confirm-row"><span>Aisha Rahman (F)</span><b>RM 2,080</b></div>
                    <div className="shot-confirm-row"><span>Ahmad Rahman (M)</span><b>RM 2,080</b></div>
                    <div className="shot-confirm-row"><span>Nur Aisyah (Child)</span><b>RM 1,560</b></div>
                  </div>
                  <div className="shot-confirm-section">
                    <h6>Payment Summary</h6>
                    <div className="shot-confirm-row"><span>Total Package</span><b>RM 5,720</b></div>
                    <div className="shot-confirm-row"><span>Deposit Paid</span><b style={{ color: "var(--success)" }}>RM 2,000</b></div>
                    <div className="shot-confirm-row"><span>Balance Due</span><b style={{ color: "var(--warn)" }}>RM 3,720</b></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ USE CASES ══════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow"><span className="dot" />{t.uc.eyebrow}</span>
            <h2 className="section-title">{t.uc.title}</h2>
            <p className="section-lead">{t.uc.lead}</p>
          </div>
          <div className="usecases">
            {/* Umrah */}
            <article className="uc-card reveal">
              <div className="uc-art umrah">
                <svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <path d="M0 90 Q50 70 100 85 T200 80 L200 140 L0 140 Z" fill="white" opacity="0.2" />
                  <circle cx="160" cy="35" r="18" fill="white" opacity="0.6" />
                  <path d="M40 100 L40 70 Q40 55 55 55 L60 55 L60 70 L80 70 L80 55 L85 55 Q100 55 100 70 L100 100 Z" fill="white" opacity="0.5" />
                  <path d="M55 55 Q55 45 60 45 Q65 45 65 55" stroke="white" strokeWidth="2" fill="none" opacity="0.6" />
                  <path d="M75 55 Q75 45 80 45 Q85 45 85 55" stroke="white" strokeWidth="2" fill="none" opacity="0.6" />
                </svg>
                <span className="uc-label">{t.uc.umrah_tag}</span>
              </div>
              <div className="uc-body">
                <h3>{t.uc.umrah_t}</h3>
                <p>{t.uc.umrah_d}</p>
                <div className="uc-tags"><span>Passport tracking</span><span>Group invoicing</span><span>Visa status</span></div>
              </div>
            </article>

            {/* Leisure */}
            <article className="uc-card reveal">
              <div className="uc-art tour">
                <svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <path d="M0 100 L40 70 L80 90 L120 60 L160 75 L200 50 L200 140 L0 140 Z" fill="white" opacity="0.25" />
                  <circle cx="40" cy="35" r="12" fill="white" opacity="0.7" />
                  <circle cx="170" cy="40" r="8" fill="white" opacity="0.4" />
                </svg>
                <span className="uc-label">{t.uc.tour_tag}</span>
              </div>
              <div className="uc-body">
                <h3>{t.uc.tour_t}</h3>
                <p>{t.uc.tour_d}</p>
                <div className="uc-tags"><span>Bali</span><span>Tokyo</span><span>Korea</span><span>Istanbul</span></div>
              </div>
            </article>

            {/* Corporate */}
            <article className="uc-card reveal">
              <div className="uc-art corp">
                <svg viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <rect x="40" y="50" width="30" height="60" fill="white" opacity="0.4" />
                  <rect x="80" y="35" width="30" height="75" fill="white" opacity="0.5" />
                  <rect x="120" y="25" width="30" height="85" fill="white" opacity="0.4" />
                  <rect x="48" y="60" width="4" height="6" fill="white" opacity="0.7" />
                  <rect x="58" y="60" width="4" height="6" fill="white" opacity="0.7" />
                  <rect x="88" y="45" width="4" height="6" fill="white" opacity="0.7" />
                  <rect x="98" y="45" width="4" height="6" fill="white" opacity="0.7" />
                  <rect x="128" y="35" width="4" height="6" fill="white" opacity="0.7" />
                  <rect x="138" y="35" width="4" height="6" fill="white" opacity="0.7" />
                </svg>
                <span className="uc-label">{t.uc.corp_tag}</span>
              </div>
              <div className="uc-body">
                <h3>{t.uc.corp_t}</h3>
                <p>{t.uc.corp_d}</p>
                <div className="uc-tags"><span>Corporate accounts</span><span>Multi-traveler</span><span>Company billing</span></div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ BENEFITS ═══════════════════════════════════ */}
      <section className="section benefits" style={{ background: "var(--bg-soft)" }}>
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow"><span className="dot" />{t.benefits.eyebrow}</span>
            <h2 className="section-title">{t.benefits.title}</h2>
            <p className="section-lead">{t.benefits.lead}</p>
          </div>
          <div className="benefits-grid">
            <div className="benefit reveal">
              <div className="ic green">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <div><h4>{t.benefits.b1t}</h4><p>{t.benefits.b1d}</p></div>
            </div>
            <div className="benefit reveal">
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <div><h4>{t.benefits.b2t}</h4><p>{t.benefits.b2d}</p></div>
            </div>
            <div className="benefit reveal">
              <div className="ic indigo">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
              </div>
              <div><h4>{t.benefits.b3t}</h4><p>{t.benefits.b3d}</p></div>
            </div>
            <div className="benefit reveal">
              <div className="ic amber">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" /></svg>
              </div>
              <div><h4>{t.benefits.b4t}</h4><p>{t.benefits.b4d}</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ PRICING ════════════════════════════════════ */}
      <section id="pricing" className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow"><span className="dot" />{t.pricing.eyebrow}</span>
            <h2 className="section-title">{t.pricing.title}</h2>
            <p className="section-lead">{t.pricing.lead}</p>
          </div>

          <div className="pricing-grid-new">
            {/* Basic */}
            <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 36, transition: "all .25s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-strong)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-md)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
            >
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{t.pricing.basic_name}</h3>
              <p style={{ fontSize: 14, color: "var(--ink-3)", marginBottom: 20 }}>{t.pricing.basic_tag}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 24 }}>
                <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.03em" }}>RM 99</span>
                <span style={{ fontSize: 14, color: "var(--ink-3)" }}>/ {lang === "bm" ? "bulan" : "month"}</span>
              </div>
              <button type="button" className="btn btn-ghost" style={{ width: "100%", marginBottom: 24, justifyContent: "center" }} onClick={() => goToSignup()}>
                {t.pricing.basic_cta}
              </button>
              <ul style={{ listStyle: "none", display: "grid", gap: 12, fontSize: 14 }}>
                {[t.pricing.basic_f1, t.pricing.basic_f2, t.pricing.basic_f3, t.pricing.basic_f4, t.pricing.basic_f5].map((f) => (
                  <li key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "var(--ink-2)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="3" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro */}
            <div style={{ background: "var(--bg-deep)", backgroundImage: "radial-gradient(500px 300px at 100% 0%, oklch(0.5 0.18 275 / 0.5), transparent 60%), linear-gradient(160deg, var(--bg-deep), oklch(0.10 0.03 240))", borderRadius: "var(--radius-lg)", padding: 36, color: "white", position: "relative", boxShadow: "0 24px 60px rgba(15,30,50,.2)" }}>
              <div style={{ position: "absolute", top: -12, right: 24, background: "oklch(0.7 0.13 165)", color: "oklch(0.18 0.04 240)", padding: "4px 12px", borderRadius: 999, fontSize: 11.5, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                {t.pricing.badge}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{t.pricing.pro_name}</h3>
              <p style={{ fontSize: 14, color: "oklch(0.78 0.02 245)", marginBottom: 20 }}>{t.pricing.pro_tag}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 24 }}>
                <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.03em" }}>RM 199</span>
                <span style={{ fontSize: 14, color: "oklch(0.78 0.02 245)" }}>/ {lang === "bm" ? "bulan" : "month"}</span>
              </div>
              <button type="button" className="btn" style={{ width: "100%", marginBottom: 24, justifyContent: "center", background: "white", color: "var(--ink)" }} onClick={() => goToSignup()}>
                {t.pricing.pro_cta}
              </button>
              <ul style={{ listStyle: "none", display: "grid", gap: 12, fontSize: 14 }}>
                {[t.pricing.pro_f1, t.pricing.pro_f2, t.pricing.pro_f3, t.pricing.pro_f4, t.pricing.pro_f5, t.pricing.pro_f6, t.pricing.pro_f7].map((f) => (
                  <li key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "oklch(0.92 0.02 245)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="oklch(0.7 0.13 165)" strokeWidth="3" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="pricing-note">{t.pricing.note}</p>
        </div>
      </section>

      {/* ══════════════════════════════════════ FAQ ════════════════════════════════════════ */}
      <section id="faq" className="section" style={{ background: "var(--bg-soft)" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="section-head reveal">
            <span className="eyebrow"><span className="dot" />{t.faq.eyebrow}</span>
            <h2 className="section-title">{t.faq.title}</h2>
          </div>
          <div className="faq-list">
            <FAQItem q={t.faq.q1} a={t.faq.a1} />
            <FAQItem q={t.faq.q2} a={t.faq.a2} />
            <FAQItem q={t.faq.q3} a={t.faq.a3} />
            <FAQItem q={t.faq.q4} a={t.faq.a4} />
            <FAQItem q={t.faq.q5} a={t.faq.a5} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ FINAL CTA ══════════════════════════════════ */}
      <section className="final-cta">
        <div className="final-cta-card">
          <h2>{t.cta.title}</h2>
          <p>{t.cta.lead}</p>
          <div className="btns">
            <button type="button" className="btn btn-blue btn-lg" onClick={() => goToSignup()}>
              {t.cta.btn1}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </button>
            <button type="button" className="btn btn-ghost btn-lg" onClick={goToLogin}>{t.cta.btn2}</button>
          </div>
          <p className="note">{t.cta.note}</p>
        </div>
      </section>

      {/* ══════════════════════════════════════ FOOTER ═════════════════════════════════════ */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="brand footer-brand">
                <span className="brand-mark">T</span>
                <span>TAMS</span>
              </a>
              <p className="footer-tag">{t.footer.tag}</p>
            </div>
            <div className="footer-col">
              <h5>{t.footer.product}</h5>
              <ul>
                <li><a href="#features">{t.nav.features}</a></li>
                <li><a href="#pricing">{t.nav.pricing}</a></li>
                <li><a href="#showcase">{t.nav.how}</a></li>
                <li><a href="#">{t.footer.changelog}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>{t.footer.company}</h5>
              <ul>
                <li><a href="#">{t.footer.about}</a></li>
                <li><a href="#">{t.footer.customers}</a></li>
                <li><a href="#">{t.footer.careers}</a></li>
                <li><a href="#">{t.footer.contact}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>{t.footer.resources}</h5>
              <ul>
                <li><a href="#">{t.footer.help}</a></li>
                <li><a href="#">{t.footer.sst}</a></li>
                <li><a href="#">{t.footer.api}</a></li>
                <li><a href="#">{t.footer.status}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>{t.footer.lang}</h5>
              <div className="lang-toggle" style={{ display: "inline-flex" }}>
                <button type="button" className={lang === "en" ? "active" : ""} onClick={() => switchLang("en")}>EN</button>
                <button type="button" className={lang === "bm" ? "active" : ""} onClick={() => switchLang("bm")}>BM</button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>{t.footer.copy}</span>
            <div className="legal">
              <a href="#">{t.footer.privacy}</a>
              <a href="#">{t.footer.terms}</a>
              <a href="#">{t.footer.security}</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
