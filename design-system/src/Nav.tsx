import React from 'react';

export interface NavLink {
  /** Anchor href. */
  href: string;
  /** Link text. */
  label: string;
}

export interface NavProps {
  /** Brand / name shown on the left. */
  brand?: string;
  /** Navigation links. */
  links: NavLink[];
  /** Languages for the built-in switch, e.g. `["JP","EN","中"]`. */
  langs?: string[];
  /** Currently active language. */
  activeLang?: string;
  /** Apply the scrolled (solid, blurred) appearance. */
  scrolled?: boolean;
}

/** Nav — fixed top navigation bar with brand, links and a language switch. */
export function Nav({
  brand = 'Angel Setsuna',
  links,
  langs = ['JP', 'EN', '中'],
  activeLang = 'JP',
  scrolled = false,
}: NavProps) {
  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`} style={{ position: 'relative' }}>
      <a href="#" className="nav__brand">
        {brand}
      </a>
      <nav className="nav__links">
        {links.map((l, i) => (
          <a key={i} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="lang" role="group" aria-label="Language">
        {langs.map((lng) => (
          <button key={lng} className={lng === activeLang ? 'is-active' : ''}>
            {lng}
          </button>
        ))}
      </div>
    </header>
  );
}
