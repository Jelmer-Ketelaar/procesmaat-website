"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { TrackedLink } from "./tracked-link";

const navItems = [
  ["Mogelijkheden", "#mogelijkheden"],
  ["Werkwijze", "#werkwijze"],
  ["Veelgestelde vragen", "#veelgestelde-vragen"],
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      requestAnimationFrame(() => menuButtonRef.current?.focus());
    };
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("keydown", close);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label={`${siteConfig.name} — naar boven`}>
        <span className="brand-mark" aria-hidden="true">P</span>
        <span>{siteConfig.name}</span>
      </a>

      <nav className="desktop-nav" aria-label="Hoofdnavigatie">
        {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>

      <TrackedLink className="button button-small header-cta" href="#scan" event="cta_click" location="header">
        Vraag de gratis scan aan
      </TrackedLink>

      <button
        ref={menuButtonRef}
        className="mobile-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobiele-navigatie"
        aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>

      <div className={`mobile-nav ${menuOpen ? "is-open" : ""}`} id="mobiele-navigatie" aria-hidden={!menuOpen} inert={!menuOpen}>
        <nav aria-label="Mobiele navigatie">
          {navItems.map(([label, href], index) => (
            <a key={href} href={href} onClick={closeMenu}>
              <span>0{index + 1}</span>{label}
            </a>
          ))}
          <a href="/privacy" onClick={closeMenu}><span>04</span>Privacy</a>
        </nav>
      </div>
    </header>
  );
}
