import React from 'react';

export interface TermsListProps {
  /** Term / condition lines. */
  items: string[];
}

/** TermsList — bulleted list of terms, each marked with an accent dot. */
export function TermsList({ items }: TermsListProps) {
  return (
    <ul className="biz-terms">
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}
