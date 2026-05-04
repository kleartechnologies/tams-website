"use client";

import { useLang } from "@/contexts/LangContext";

const Star = () => (
  <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: "oklch(0.75 0.16 80)" }}>
    <path d="M12 2l2.39 6.96H22l-6.18 4.49L18.18 22 12 17.27 5.82 22l2.36-8.55L2 8.96h7.61z" />
  </svg>
);

export default function Testimonials() {
  const { t } = useLang();
  const ts = t.testimonials;

  return (
    <section className="testi">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{ts.eyebrow}</span>
          <h2>{ts.title}</h2>
        </div>

        <div className="testi-grid">
          {ts.items.map((item) => (
            <div className="testi-card" key={item.name}>
              <div className="stars">
                {[0,1,2,3,4].map((i) => <Star key={i} />)}
              </div>
              <blockquote>{item.quote}</blockquote>
              <div className="who">
                <div className={`av${item.cls ? ` ${item.cls}` : ""}`}>{item.av}</div>
                <div>
                  <div className="name">{item.name}</div>
                  <div className="role">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
