"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { TrackedLink } from "./tracked-link";

const navItems = [
  ["AI-automatisering", "/ai-automatisering"],
  ["Diensten", "/diensten"],
  ["Kennisbank", "/kennisbank"],
  ["Investering", "/#investering"],
  ["Werkwijze", "/#werkwijze"],

] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const resize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener("resize", resize);
    const close = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        const header = menuButtonRef.current?.closest("header");
        const focusable = Array.from(header?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []).filter((item) => item.getClientRects().length > 0);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      requestAnimationFrame(() => menuButtonRef.current?.focus());
    };
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("keydown", close);
      window.removeEventListener("resize", resize);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/">
        <span className="brand-mark" aria-hidden="true">P</span>
        <span>{siteConfig.name}</span>
      </Link>

      <nav className="desktop-nav" aria-label="Hoofdnavigatie">
        {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>

      <TrackedLink className="button button-small header-cta" href="/#scan" event="cta_click" location="header">
        Ontvang gratis digitaal advies
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
          <a href="/privacy" onClick={closeMenu}><span>05</span>Privacy</a>
        </nav>
      </div>
    </header>
  );
}
