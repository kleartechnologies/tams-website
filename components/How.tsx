"use client";

import { useLang } from "@/contexts/LangContext";

export default function How() {
  const { t } = useLang();
  const h = t.how;

  return (
    <section className="how" id="how">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{h.eyebrow}</span>
          <h2>{h.title}</h2>
          <p className="lead" style={{ marginTop: 14 }}>{h.lead}</p>
        </div>

        <div className="how-grid">
          {h.steps.map((step) => (
            <div className="step" key={step.num}>
              <div className="step-num">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
