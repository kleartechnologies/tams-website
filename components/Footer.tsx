"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LangContext";

export default function Footer() {
  const { lang, setLang, t } = useLang();
  const f = t.footer;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link className="brand" href="/">
              <div className="logo">T</div>
              <div className="brand-text">
                <span className="brand-name">TAMS</span>
                <span className="brand-tag">Travel Agency Management System</span>
              </div>
            </Link>
            <p>{f.tag}</p>
          </div>

          {/* Product */}
          <div className="footer-col">
            <h4>{f.product}</h4>
            <ul>
              <li><a href="#features">{f.links.features}</a></li>
              <li><a href="#pricing">{f.links.pricing}</a></li>
              <li><a href="#how">{f.links.how}</a></li>
              <li><a href="#">{f.links.changelog}</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h4>{f.company}</h4>
            <ul>
              <li><a href="#">{f.links.about}</a></li>
              <li><a href="#">{f.links.customers}</a></li>
              <li><a href="#">{f.links.contact}</a></li>
              <li><a href="#">{f.links.careers}</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-col">
            <h4>{f.resources}</h4>
            <ul>
              <li><a href="#">{f.links.help}</a></li>
              <li><a href="#">{f.links.sst}</a></li>
              <li><a href="#">{f.links.api}</a></li>
              <li><a href="#">{f.links.status}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>{f.copy}</div>
          <div className="right">
            <a href="#">{f.privacy}</a>
            <a href="#">{f.terms}</a>
            <a href="#">{f.security}</a>
            <span className="footer-lang">
              <span>{f.lang}</span>
              <span className="lang-switch">
                <button
                  type="button"
                  className={lang === "en" ? "active" : ""}
                  onClick={() => setLang("en")}
                  aria-pressed={lang === "en"}
                >EN</button>
                <button
                  type="button"
                  className={lang === "bm" ? "active" : ""}
                  onClick={() => setLang("bm")}
                  aria-pressed={lang === "bm"}
                >BM</button>
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
