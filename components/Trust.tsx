"use client";

import { useLang } from "@/contexts/LangContext";

const agencies = ["Wanderly", "Voyageur", "Pelangi Tours", "Barakah Travel", "Horizon Travel"];

export default function Trust() {
  const { t } = useLang();

  return (
    <section className="trust">
      <div className="container">
        <div className="trust-head">{t.trust.head}</div>
        <div className="trust-row">
          {agencies.map((name) => (
            <div className="trust-logo" key={name}>
              <span className="mark" />
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
