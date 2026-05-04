"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { goToLogin, goToSignup } from "@/lib/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const n = t.nav;

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
      <div className="container nav-inner">
        <Link className="brand" href="/">
          <div className="logo">T</div>
          <div className="brand-text">
            <span className="brand-name">TAMS</span>
            <span className="brand-tag">{n.brandTag}</span>
          </div>
        </Link>

        <nav className="nav-links">
          <a href="/#features">{n.features}</a>
          <a href="/#how">{n.how}</a>
          <a href="/#pricing">{n.pricing}</a>
          <a href="/#faq">{n.faq}</a>
        </nav>

        <div className="nav-cta">
          <div className="lang-switch" role="group" aria-label="Language switcher">
            <button
              type="button"
              className={lang === "en" ? "active" : ""}
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
            <button
              type="button"
              className={lang === "bm" ? "active" : ""}
              onClick={() => setLang("bm")}
              aria-pressed={lang === "bm"}
            >
              BM
            </button>
          </div>

          {/* Login → /login */}
          <button
            type="button"
            className="btn btn-link"
            onClick={() => goToLogin()}
          >
            {n.login}
          </button>

          {/* Start Free Trial → /signup */}
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => goToSignup()}
          >
            {n.cta}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-menu">
          <a href="/#features" onClick={() => setMenuOpen(false)}>{n.features}</a>
          <a href="/#how" onClick={() => setMenuOpen(false)}>{n.how}</a>
          <a href="/#pricing" onClick={() => setMenuOpen(false)}>{n.pricing}</a>
          <a href="/#faq" onClick={() => setMenuOpen(false)}>{n.faq}</a>
          <div className="mobile-menu-actions">
            <button type="button" className="btn btn-ghost" onClick={() => goToLogin()}>{n.login}</button>
            <button type="button" className="btn btn-primary" onClick={() => goToSignup()}>{n.cta}</button>
          </div>
          <div className="mobile-menu-lang">
            <div className="lang-switch" role="group" aria-label="Language switcher">
              <button
                type="button"
                className={lang === "en" ? "active" : ""}
                onClick={() => setLang("en")}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
              <button
                type="button"
                className={lang === "bm" ? "active" : ""}
                onClick={() => setLang("bm")}
                aria-pressed={lang === "bm"}
              >
                BM
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
