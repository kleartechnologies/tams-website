"use client";

import { useLang } from "@/contexts/LangContext";
import { goToLogin, goToSignup } from "@/lib/navigation";

export default function FinalCTA() {
  const { t } = useLang();
  const c = t.cta;

  return (
    <section className="final-cta">
      <div className="container final-cta-inner">
        <h2>{c.title}</h2>
        <p>{c.lead}</p>

        <div className="hero-ctas" style={{ justifyContent: "center" }}>
          {/* Primary CTA → /signup */}
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => goToSignup()}
          >
            <span>{c.btn1}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          {/* Secondary → /login */}
          <button
            type="button"
            className="btn btn-ghost btn-lg"
            onClick={() => goToLogin()}
          >
            {c.btn2}
          </button>
        </div>

        <div style={{ marginTop: 18, fontSize: 13, color: "oklch(0.85 0.02 230)" }}>
          {c.note}
        </div>
      </div>
    </section>
  );
}
