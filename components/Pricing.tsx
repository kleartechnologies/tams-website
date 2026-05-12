"use client";

import { useLang } from "@/contexts/LangContext";
import { goToSignup } from "@/lib/navigation";

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: 10, height: 10 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function Pricing() {
  const { t } = useLang();
  const p = t.pricing;

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{p.eyebrow}</span>
          <h2>{p.title}</h2>
          <p className="lead" style={{ marginTop: 14 }}>{p.lead}</p>
        </div>

        <div className="pricing-grid">
          {/* Basic → /signup */}
          <article className="plan">
            <h3 className="plan-name">{p.basic.name}</h3>
            <p className="plan-tag">{p.basic.tag}</p>
            <div className="plan-price">
              <span className="cur">RM</span>
              <span className="amt">99</span>
              <span className="per">{p.basic.period}</span>
            </div>
            <div className="plan-divider" />
            <ul className="plan-features">
              {p.basic.features.map((f) => (
                <li key={f}>
                  <span className="ck"><CheckIcon /></span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="btn btn-ghost plan-cta"
              onClick={() => goToSignup()}
            >
              {p.basic.cta}
            </button>
          </article>

          {/* Pro → /signup */}
          <article className="plan plan--pro">
            <span className="plan-badge">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 12, height: 12 }}>
                <path d="M12 2l2.39 6.96H22l-6.18 4.49L18.18 22 12 17.27 5.82 22l2.36-8.55L2 8.96h7.61z" />
              </svg>
              <span>{p.pro.badge}</span>
            </span>
            <h3 className="plan-name">{p.pro.name}</h3>
            <p className="plan-tag">{p.pro.tag}</p>
            <div className="plan-price">
              <span className="cur">RM</span>
              <span className="amt">199</span>
              <span className="per">{p.pro.period}</span>
            </div>
            <div className="plan-divider" />
            <ul className="plan-features">
              {p.pro.features.map((f, i) => (
                <li key={f} className={i === 0 ? "lead" : ""}>
                  <span className="ck"><CheckIcon /></span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="btn btn-primary plan-cta"
              onClick={() => goToSignup()}
            >
              {p.pro.cta}
            </button>
          </article>
        </div>

        <p className="pricing-note">{p.note}</p>
      </div>
    </section>
  );
}
