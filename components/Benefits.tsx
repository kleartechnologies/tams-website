"use client";

import { useLang } from "@/contexts/LangContext";

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function Benefits() {
  const { t } = useLang();
  const b = t.benefits;

  return (
    <section className="benefits">
      <div className="container">
        <div className="benefits-grid">
          {/* Left: list */}
          <div>
            <span className="eyebrow">{b.eyebrow}</span>
            <h2 style={{ margin: "18px 0 16px" }}>{b.title}</h2>
            <p className="lead" style={{ marginBottom: 32 }}>{b.lead}</p>

            <div className="benefits-list">
              {b.items.map((item) => (
                <div className="benefit-row" key={item.title}>
                  <div className="check"><CheckIcon /></div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: testimonial card */}
          <div className="benefits-stat-card">
            <div className="bsc-eyebrow">{b.quoteEyebrow}</div>
            <div className="bsc-quote">{b.quoteText}</div>

            <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 12, position: "relative", zIndex: 1 }}>
              <div style={{
                width: 40, height: 40, borderRadius: "999px",
                background: "oklch(0.7 0.14 155 / 0.4)",
                display: "grid", placeItems: "center",
                fontWeight: 700, fontSize: 14,
              }}>AR</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{b.quoteName}</div>
                <div style={{ fontSize: 12.5, color: "oklch(0.85 0.03 230)" }}>{b.quoteRole}</div>
              </div>
            </div>

            <div className="bsc-stats">
              <div className="bsc-stat">
                <div className="num">{b.stat1Num}</div>
                <div className="lbl">{b.stat1Label}</div>
              </div>
              <div className="bsc-stat">
                <div className="num">{b.stat2Num}</div>
                <div className="lbl">{b.stat2Label}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
