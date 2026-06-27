import React from 'react';

export interface ButtonProps {
  /** Visual style: `primary` (rose-pink fill), `outline` (accent border), `ghost` (subtle small). */
  variant?: 'primary' | 'outline' | 'ghost';
  /** Button label / content. */
  children?: React.ReactNode;
  /** When set, renders an anchor `<a>` instead of a `<button>`. */
  href?: string;
  /** Click handler. */
  onClick?: () => void;
}

/**
 * Button — the design system's action control.
 * Use `primary` for the main call-to-action, `outline` for secondary actions,
 * and `ghost` for low-emphasis inline actions (e.g. a copy button).
 */
export function Button({ variant = 'primary', children, href, onClick }: ButtonProps) {
  const cls = `btn btn--${variant}`;
  if (href) {
    return (
      <a className={cls} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
