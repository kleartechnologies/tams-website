"use client";

import { useLang } from "@/contexts/LangContext";

const logos = [
  { name: "Amanah Travel & Tours" },
  { name: "CutiGo Malaysia" },
  { name: "UmrahPlus Travel" },
  { name: "Langkawi Holiday Hub" },
  { name: "Jelajah Asia Travel" },
  { name: "TripKawan MY" },
  { name: "Sakura Global Travel" },
];

export default function Trust() {
  const { t } = useLang();

  return (
    <section className="trust">
      <div className="container">
        <div className="trust-head">{t.trust.head}</div>
      </div>
      <div className="trust-carousel-outer">
        <div className="trust-carousel">
          {[...logos, ...logos].map((logo, i) => (
            <div className="trust-logo" key={i}>
              <span className="mark" />
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
