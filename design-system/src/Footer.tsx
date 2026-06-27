import React from 'react';

export interface FooterSocial {
  /** Link URL. */
  href: string;
  /** Link label. */
  label: string;
}

export interface FooterProps {
  /** Social links shown above the copyright line. */
  social?: FooterSocial[];
  /** Copyright / rights line. */
  copy?: string;
}

/** Footer — site footer with a row of social links and a copyright line. */
export function Footer({ social = [], copy }: FooterProps) {
  return (
    <footer className="footer">
      <div className="social">
        {social.map((s, i) => (
          <a key={i} href={s.href}>
            {s.label}
          </a>
        ))}
      </div>
      <p className="footer__copy">{copy}</p>
    </footer>
  );
}
