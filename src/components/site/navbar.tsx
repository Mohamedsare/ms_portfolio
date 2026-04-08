"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/#accueil", label: "Accueil", key: "home" },
  { href: "/#apropos", label: "À propos", key: "about" },
  { href: "/#projets", label: "Projets", key: "projects" },
  { href: "/#competences", label: "Compétences", key: "skills" },
  { href: "/#services", label: "Services", key: "services" },
  { href: "/#tarifs", label: "Tarifs", key: "tarifs" },
  { href: "/#contact", label: "Contact", key: "contact" },
];

function isNavActive(
  key: string,
  pathname: string,
  hash: string,
): boolean {
  if (pathname !== "/") return false;
  const h = hash || "#accueil";
  const targets: Record<string, string> = {
    home: "#accueil",
    about: "#apropos",
    projects: "#projets",
    skills: "#competences",
    services: "#services",
    tarifs: "#tarifs",
    contact: "#contact",
  };
  return targets[key] === h;
}

export function Navbar() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const readHash = () => setHash(typeof window !== "undefined" ? window.location.hash : "");
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar site-navbar${scrolled ? " scrolled" : ""}`}>
      <div className="navbar-container site-navbar-inner">
        <div className="navbar-logo-wrapper">
          <Link href="/#accueil" className="navbar-logo">
            <span className="navbar-logo-mark">MS</span>
          </Link>
          <div className="theme-switch-wrapper desktop-position logo-theme-switch">
            <label className="theme-switch-label moon-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </label>
            <label className="theme-switch">
              <input type="checkbox" aria-label="Basculer le thème clair" />
              <span className="slider" />
            </label>
            <label className="theme-switch-label sun-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </label>
          </div>
        </div>

        <div className="theme-switch-wrapper mobile-position">
          <label className="theme-switch-label moon-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </label>
          <label className="theme-switch">
            <input type="checkbox" aria-label="Basculer le thème clair" />
            <span className="slider" />
          </label>
          <label className="theme-switch-label sun-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </label>
        </div>

        <ul className="navbar-menu">
          {links.map(({ href, label, key }) => (
            <li key={href} className="navbar-item">
              <a
                href={href}
                className={`navbar-links${isNavActive(key, pathname, hash) ? " active" : ""}`}
              >
                {label}
              </a>
            </li>
          ))}
          <li className="navbar-item">
            <a href="/cv/download/" className="navbar-links cv-download-btn" download>
              <i className="fas fa-download" /> CV
            </a>
          </li>
        </ul>

        <div className="navbar-toggle">
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </div>
      </div>
    </nav>
  );
}
