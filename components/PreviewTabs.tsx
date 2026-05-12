"use client";

import { useState } from "react";
import { useLang } from "@/contexts/LangContext";
import { getDestinationEmoji } from "@/lib/destinationEmoji";

const bookingRows = [
  { av: "SL", cls: "", name: "Sarah Lim", email: "sarah.l@gmail.com", dest: "Bali · 5D4N", dates: "12 May – 16 May", total: "RM 4,820", statusKey: "statusPaid" as const },
  { av: "HM", cls: "g", name: "Hafiz Mansor", email: "hafiz.m@gmail.com", dest: "Madinah · Umrah 12D", dates: "05 Jun – 16 Jun", total: "RM 11,200", statusKey: "statusPaid" as const },
  { av: "NB", cls: "w", name: "Nur Balqis", email: "balqis@hotmail.com", dest: "Istanbul · 9D7N", dates: "18 Jun – 26 Jun", total: "RM 12,200", statusKey: "statusPending" as const },
  { av: "CW", cls: "", name: "Chong Wei", email: "cw@business.my", dest: "Seoul · 6D5N", dates: "22 Jun – 27 Jun", total: "RM 7,300", statusKey: "statusDraft" as const },
  { av: "FA", cls: "g", name: "Farah Ahmad", email: "farah@email.com", dest: "Dubai · 5D4N", dates: "04 Jul – 08 Jul", total: "RM 6,150", statusKey: "statusPaid" as const },
];

const pkgRows = [
  { bg: "bg-umrah", badge: "Umrah", titleKey: "Umrah 12 Hari", descKey: "Madinah & Makkah · KLIA", price: "RM 9,800" },
  { bg: "bg-bali", badge: "Holiday", titleKey: "Bali 5H4M", descKey: "Resort Seminyak · Private transfers", price: "RM 2,410" },
  { bg: "bg-tokyo", badge: "Holiday", titleKey: "Tokyo 7H6M", descKey: "Shinjuku · Fuji · JR Pass", price: "RM 4,820" },
  { bg: "bg-istanbul", badge: "Halal", titleKey: "Istanbul 9H7M", descKey: "Old City + Cappadocia · Halal", price: "RM 6,100" },
  { bg: "bg-korea", badge: "Holiday", titleKey: "Korea 6H5M", descKey: "Seoul · Nami Island · Cherry blossom", price: "RM 3,650" },
  { bg: "bg-dubai", badge: "Holiday", titleKey: "Dubai 5H4M", descKey: "Downtown · Desert safari · Burj Khalifa", price: "RM 3,075" },
];

const topDests = [
  { cls: "", name: "Madinah / Makkah", meta: "42 bookings", tag: "29%" },
  { cls: "g", name: "Bali", meta: "31 bookings", tag: "22%" },
  { cls: "w", name: "Tokyo", meta: "28 bookings", tag: "19%", pending: true },
];

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default function PreviewTabs() {
  const { t } = useLang();
  const pv = t.preview;
  const tabKeys = ["dashboard", "bookings", "packages", "invoice"] as const;
  const [active, setActive] = useState<typeof tabKeys[number]>("dashboard");

  const statusCls: Record<string, string> = {
    statusPaid: "",
    statusPending: "pending",
    statusDraft: "draft",
  };
  const statusLabel: Record<string, string> = {
    statusPaid: pv.statusPaid,
    statusPending: pv.statusPending,
    statusDraft: pv.statusDraft,
  };

  return (
    <section className="preview" id="preview">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{pv.eyebrow}</span>
          <h2>{pv.title}</h2>
          <p className="lead" style={{ marginTop: 14 }}>{pv.lead}</p>
        </div>

        <div className="preview-tabs-wrap">
          <div className="preview-tabs" role="tablist">
            {tabKeys.map((key, i) => (
              <button
                key={key}
                className={`preview-tab${active === key ? " active" : ""}`}
                onClick={() => setActive(key)}
              >
                {pv.tabs[i]}
              </button>
            ))}
          </div>
        </div>

        <div className="preview-frame">
          {/* ── DASHBOARD ── */}
          <div className={`preview-panel${active === "dashboard" ? " active" : ""}`}>
            <div className="dash" style={{ borderRadius: 0, border: 0, boxShadow: "none" }}>
              <div className="dash-chrome">
                <div className="lights"><span /><span /><span /></div>
                <div className="url">app.usetams.com / dashboard</div>
              </div>
              <div className="dash-body" style={{ minHeight: 460 }}>
                <aside className="dash-sidebar">
                  <div className="dash-side-brand"><div className="logo">T</div><b>TAMS</b></div>
                  <div className="dash-side-section">{t.hero.sidebar.workspace}</div>
                  <div className="dash-side-item active">
                    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                    <span>{t.hero.sidebar.dashboard}</span>
                  </div>
                  {[t.hero.sidebar.bookings, t.hero.sidebar.customers, t.hero.sidebar.payments, t.hero.sidebar.invoices].map((label) => (
                    <div className="dash-side-item" key={label}><span style={{ width: 14 }} /><span>{label}</span></div>
                  ))}
                </aside>
                <div className="dash-main">
                  <div className="dash-main-head">
                    <h4>{pv.dashTitle}</h4>
                    <span className="pill">● Live</span>
                  </div>
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
                      <div className="dash-card-title"><b>{pv.topTitle}</b></div>
                      <div className="b-list">
                        {topDests.map((d) => (
                          <div className="b-row" key={d.name}>
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-lg">
                              {getDestinationEmoji(d.name)}
                            </div>
                            <div className="b-info"><div className="b-name">{d.name}</div><div className="b-meta">{d.meta}</div></div>
                            <span className={`b-tag${d.pending ? " pending" : ""}`}>{d.tag}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── BOOKINGS ── */}
          <div className={`preview-panel${active === "bookings" ? " active" : ""}`}>
            <div className="table-mock">
              <div className="table-head">
                <h3>{pv.bookingsTitle}</h3>
                <div className="actions">
                  <div className="search-box"><SearchIcon /><span>{pv.searchBookings}</span></div>
                  <button className="btn btn-primary btn-sm">{pv.newBooking}</button>
                </div>
              </div>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>{pv.colCustomer}</th><th>{pv.colDest}</th>
                    <th>{pv.colDate}</th><th>{pv.colTotal}</th><th>{pv.colStatus}</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((b) => (
                    <tr key={b.name}>
                      <td>
                        <div className="cust">
                          <div className={`av${b.cls ? ` ${b.cls}` : ""}`}>{b.av}</div>
                          <div>{b.name}<small>{b.email}</small></div>
                        </div>
                      </td>
                      <td>{b.dest}</td>
                      <td>{b.dates}</td>
                      <td>{b.total}</td>
                      <td><span className={`status-tag${statusCls[b.statusKey] ? ` ${statusCls[b.statusKey]}` : ""}`}>{statusLabel[b.statusKey]}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── PACKAGES ── */}
          <div className={`preview-panel${active === "packages" ? " active" : ""}`}>
            <div className="packages-mock">
              <div className="table-head">
                <h3>{pv.packagesTitle}</h3>
                <div className="actions">
                  <div className="search-box"><SearchIcon /><span>{pv.searchPackages}</span></div>
                  <button className="btn btn-primary btn-sm">{pv.newPackage}</button>
                </div>
              </div>
              <div className="pkg-grid">
                {pkgRows.map((p) => (
                  <div className="pkg-card" key={p.titleKey}>
                    <div className={`pkg-img ${p.bg}`}>
                      <span className="badge">{p.badge}</span>
                    </div>
                    <div className="pkg-info">
                      <div className="t">{p.titleKey}</div>
                      <div className="d">{p.descKey}</div>
                      <div className="price-row">
                        <span className="pf">{pv.pkgFrom}</span>
                        <div><span className="pa">{p.price}</span><span className="pp">{pv.pkgPax}</span></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── INVOICE ── */}
          <div className={`preview-panel${active === "invoice" ? " active" : ""}`}>
            <div className="invoice-mock">
              <div className="invoice-side">
                <h3>{pv.invoiceTitle}</h3>
                <p>{pv.invoiceLead}</p>
                <div className="invoice-meta">
                  <div><span>{pv.invoiceNum}</span><span>INV-2026-0142</span></div>
                  <div><span>{pv.invoiceStatus}</span><span style={{ color: "oklch(0.85 0.15 155)" }}>{pv.invoiceStatusPaid}</span></div>
                  <div><span>{pv.invoiceSst}</span><span>RM 357.04</span></div>
                  <div><span>{pv.invoiceTotal}</span><span>RM 4,820.00</span></div>
                </div>
              </div>
              <div className="invoice-paper">
                <div className="inv-head">
                  <div>
                    <h4>{pv.invoiceHeading}</h4>
                    <div className="num">INV-2026-0142 · <span>{pv.invoiceIssued}</span></div>
                  </div>
                  <div className="inv-from">
                    <b>Wanderly Travel Sdn Bhd</b>
                    Lot 12, Jalan Tun Razak<br />
                    Kuala Lumpur · SST: W10-1234
                  </div>
                </div>
                <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginBottom: 14 }}>
                  <b style={{ color: "var(--ink)", display: "block", fontSize: 13, marginBottom: 2 }}>{pv.invoiceBilled}</b>
                  Sarah Lim · sarah.l@gmail.com
                </div>
                <table className="inv-tbl">
                  <thead>
                    <tr>
                      <th>{pv.invoiceDesc}</th>
                      <th className="r">{pv.invoiceQty}</th>
                      <th className="r">{pv.invoiceAmt}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Bali Holiday Package · 5D4N</td><td className="r">2</td><td className="r">RM 3,800.00</td></tr>
                    <tr><td>Travel Insurance Add-on</td><td className="r">2</td><td className="r">RM 320.00</td></tr>
                    <tr><td>Airport Transfer (Return)</td><td className="r">1</td><td className="r">RM 342.96</td></tr>
                  </tbody>
                </table>
                <div className="inv-totals">
                  <div><span>{pv.invoiceSubtotal}</span><span>RM 4,462.96</span></div>
                  <div><span>{pv.invoiceSst}</span><span>RM 357.04</span></div>
                  <div className="grand"><span>{pv.invoiceGrand}</span><span>RM 4,820.00</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
