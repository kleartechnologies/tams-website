"use client";

import { useState } from "react";
import { useLang } from "@/contexts/LangContext";

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default function FAQ() {
  const { t } = useLang();
  const fq = t.faq;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{fq.eyebrow}</span>
          <h2>{fq.title}</h2>
        </div>

        <div className="faq-list">
          {fq.items.map((item, i) => (
            <div className="faq-item" key={item.q}>
              <button
                className="faq-summary"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                aria-expanded={openIdx === i}
              >
                <span>{item.q}</span>
                <span className={`faq-icon${openIdx === i ? " open" : ""}`}>
                  <PlusIcon />
                </span>
              </button>
              {openIdx === i && (
                <div className="faq-body">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
