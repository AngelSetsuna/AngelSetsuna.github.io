import React from 'react';

export interface SocialItem {
  /** Link URL. */
  href: string;
  /** Accessible label (also used as fallback text when no icon is given). */
  label: string;
  /** Icon node, e.g. an inline `<svg>`. */
  icon?: React.ReactNode;
}

export interface SocialBarProps {
  /** Social links to display as circular icon buttons. */
  items: SocialItem[];
}

/** SocialBar — row of circular social icon links, as used in the hero. */
export function SocialBar({ items }: SocialBarProps) {
  return (
    <div className="hero__social">
      {items.map((it, i) => (
        <a key={i} href={it.href} aria-label={it.label} title={it.label}>
          {it.icon ?? it.label.slice(0, 2)}
        </a>
      ))}
    </div>
  );
}
