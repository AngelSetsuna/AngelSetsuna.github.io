import React from 'react';

export interface SectionHeadProps {
  /** Large English-style title (e.g. "Works"). */
  title: string;
  /** Small accent subtitle below the title (e.g. "作品集"). */
  sub?: string;
}

/** SectionHead — section heading: a large title with a small accent subtitle underneath. */
export function SectionHead({ title, sub }: SectionHeadProps) {
  return (
    <div className="section__head">
      <h2 className="section__title">{title}</h2>
      {sub && <p className="section__sub">{sub}</p>}
    </div>
  );
}
