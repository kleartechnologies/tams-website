"use client";

import Image from "next/image";
import { useLang } from "@/contexts/LangContext";
import { goToSignup } from "@/lib/navigation";

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;

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

        {/* ── Dashboard showcase ── */}
        <div className="hero-visual" style={{ position: "relative" }}>
          <div className="dash-showcase">
            <div className="dash-chrome">
              <div className="lights"><span /><span /><span /></div>
              <div className="url">app.usetams.com / dashboard</div>
            </div>
            <div className="dash-img-wrap">
              <Image
                src="/images/TAMS-DASHBOARD.png"
                alt="TAMS Dashboard — travel agency management system"
                width={2940}
                height={1672}
                priority
                quality={90}
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>

          {/* Float badges */}
          <div className="float-card a">
            <div className="ic">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <div className="lbl">{h.floatInvoice}</div>
              <div className="val">RM 11,070</div>
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

          <div className="float-card c">
            <div className="ic">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
            <div>
              <div className="lbl">SST Ready</div>
              <div className="val">Compliant</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
