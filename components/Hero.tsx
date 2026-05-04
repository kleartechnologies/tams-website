"use client";

import { useLang } from "@/contexts/LangContext";
import { goToSignup } from "@/lib/navigation";

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function SideIcon({ type }: { type: string }) {
  const p = { className: "ico", ...svgProps };
  if (type === "grid") return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>;
  if (type === "lock") return <svg {...p}><path d="M9 11V7a3 3 0 0 1 6 0v4" /><rect x="5" y="11" width="14" height="10" rx="2" /></svg>;
  if (type === "users") return <svg {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /></svg>;
  if (type === "card") return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
  if (type === "doc") return <svg {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>;
  return null;
}

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;

  const sidebarItems = [
    { icon: "grid", label: h.sidebar.dashboard, active: true },
    { icon: "lock", label: h.sidebar.bookings },
    { icon: "users", label: h.sidebar.customers },
    { icon: "card", label: h.sidebar.payments },
    { icon: "doc", label: h.sidebar.invoices },
  ];

  const recentBookings = [
    { av: "SL", cls: "", name: "Sarah Lim", dest: "Bali · 5D4N", status: h.statusPaid, pending: false },
    { av: "HM", cls: "g", name: "Hafiz Mansor", dest: "Madinah · Umrah 12D", status: h.statusPaid, pending: false },
    { av: "NB", cls: "w", name: "Nur Balqis", dest: "Istanbul · 9D7N", status: h.statusPending, pending: true },
  ];

  return (
    <section
      className="hero"
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
    >
      <div className="hero-overlay" />

      <div className="container hero-grid">
        {/* ── Left text ── */}
        <div className="hero-text">
          <span className="hero-pill">
            <span className="dot"><Check /></span>
            <span>{h.pill}</span>
          </span>

          <h1>{h.title}</h1>
          <p className="lead">{h.lead}</p>

          <div className="hero-ctas">
            {/* Start Free Trial → /signup */}
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => goToSignup()}
            >
              <span>{h.cta1}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <a href="#features" className="btn btn-ghost btn-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>{h.cta2}</span>
            </a>
          </div>

          <div className="hero-meta">
            {h.meta.map((item) => (
              <div className="hero-meta-item" key={item}>
                <Check />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Dashboard mockup ── */}
        <div className="hero-visual" style={{ position: "relative" }}>
          <div className="dash">
            <div className="dash-chrome">
              <div className="lights"><span /><span /><span /></div>
              <div className="url">app.tams.my / dashboard</div>
            </div>
            <div className="dash-body">
              <aside className="dash-sidebar">
                <div className="dash-side-brand">
                  <div className="logo">T</div>
                  <b>TAMS</b>
                </div>
                <div className="dash-side-section">{h.sidebar.workspace}</div>
                {sidebarItems.map(({ icon, label, active }) => (
                  <div key={label} className={`dash-side-item${active ? " active" : ""}`}>
                    <SideIcon type={icon} />
                    <span>{label}</span>
                  </div>
                ))}
                <div className="dash-side-section">{h.sidebar.insights}</div>
                <div className="dash-side-item">
                  <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
                  </svg>
                  <span>{h.sidebar.reports}</span>
                </div>
              </aside>

              <div className="dash-main">
                <div className="dash-main-head">
                  <h4>{h.greeting}</h4>
                  <span className="pill">● Live</span>
                </div>

                <div className="kpis">
                  <div className="kpi">
                    <div className="label">{h.kpi1}</div>
                    <div className="value">142</div>
                    <div className="delta">↑ 18%</div>
                  </div>
                  <div className="kpi">
                    <div className="label">{h.kpi2}</div>
                    <div className="value">RM 84.2k</div>
                    <div className="delta">↑ 12%</div>
                  </div>
                  <div className="kpi">
                    <div className="label">{h.kpi3}</div>
                    <div className="value">RM 6,400</div>
                    <div className="delta warn">{h.kpi3sub}</div>
                  </div>
                </div>

                <div className="dash-row">
                  <div className="dash-card">
                    <div className="dash-card-title">
                      <b>{h.chartTitle}</b>
                      <span>{h.chartRange}</span>
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
                    <div className="dash-card-title"><b>{h.recentTitle}</b></div>
                    <div className="b-list">
                      {recentBookings.map((b) => (
                        <div className="b-row" key={b.name}>
                          <div className={`b-avatar${b.cls ? ` ${b.cls}` : ""}`}>{b.av}</div>
                          <div className="b-info">
                            <div className="b-name">{b.name}</div>
                            <div className="b-meta">{b.dest}</div>
                          </div>
                          <span className={`b-tag${b.pending ? " pending" : ""}`}>{b.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Float cards */}
          <div className="float-card a">
            <div className="ic">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <div className="lbl">{h.floatInvoice}</div>
              <div className="val">RM 4,820</div>
            </div>
          </div>

          <div className="float-card b">
            <div className="ic">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11V7a3 3 0 0 1 6 0v4" /><rect x="5" y="11" width="14" height="10" rx="2" />
              </svg>
            </div>
            <div>
              <div className="lbl">{h.floatBooking}</div>
              <div className="val">Umrah · 12D</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
