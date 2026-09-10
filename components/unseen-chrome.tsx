"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function UnseenHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="unseen-nav">
        <Link href="/" className="unseen-logo">
          aixion lab<span className="sup">®</span>
        </Link>
        <div className="unseen-links">
          <Link href="/systems" className={`unseen-link ${pathname.startsWith("/systems") ? "active" : ""}`}>
            Systems
          </Link>
          <Link href="/research" className={`unseen-link ${pathname.startsWith("/research") ? "active" : ""}`}>
            Research
          </Link>
          <Link href="/pulse" className={`unseen-link ${pathname.startsWith("/pulse") ? "active" : ""}`}>
            Pulse
          </Link>
          <Link href="/journey" className={`unseen-link ${pathname.startsWith("/journey") ? "active" : ""}`}>
            Journey
          </Link>
          <Link href="/about" className={`unseen-link ${pathname.startsWith("/about") ? "active" : ""}`}>
            Contact
          </Link>
          <button 
            type="button" 
            className="unseen-menu-toggle" 
            aria-label="Toggle Navigation Drawer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span>
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu matching Unseen Studio */}
      {menuOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "#efded9",
          zIndex: 9998,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "4rem 8rem",
        }}>
          <button 
            type="button" 
            style={{
              position: "absolute",
              top: "2.5rem",
              right: "3rem",
              background: "#fff",
              border: "none",
              width: "2.8rem",
              height: "2.8rem",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
          <nav style={{ display: "grid", gap: "1.8rem" }}>
            {[
              ["01", "Systems", "/systems"],
              ["02", "Research", "/research"],
              ["03", "Lab Pulse", "/pulse"],
              ["04", "Journey", "/journey"],
              ["05", "About & Contact", "/about"],
              ["06", "Résumé / Fast Path", "/resume"],
            ].map(([num, label, href]) => (
              <Link 
                key={href} 
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  textDecoration: "none",
                  color: "#212121",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1.5rem",
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(2.5rem, 4vw, 4rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.03em"
                }}
              >
                <span style={{ fontSize: "1.1rem", fontFamily: "var(--font-mono)", opacity: 0.45 }}>{num}</span>
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

export function UnseenStatusBar() {
  return (
    <footer className="unseen-status-bar">
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <button 
          type="button" 
          aria-label="Audio status indicator"
          style={{
            width: "2.3rem",
            height: "2.3rem",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(33, 33, 33, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
            <line x1="12" y1="20" x2="12" y2="8" />
          </svg>
        </button>
        <Link href="/pulse" className="unseen-pill-button">
          <span>TradeBot: Validating Live</span>
        </Link>
      </div>

      <Link href="/about" className="unseen-center-ctrl" aria-label="Built by Ram">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </Link>
      
      <span className="unseen-copyright">
        ©{new Date().getFullYear()}
      </span>
    </footer>
  );
}
