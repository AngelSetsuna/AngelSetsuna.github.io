import React from 'react';

export interface Step {
  /** Step number label, e.g. "01". */
  no: string;
  /** Step title. */
  title: string;
  /** Step description. */
  desc?: string;
}

export interface StepsProps {
  /** Ordered process steps, laid out in a single row. */
  steps: Step[];
}

/** Steps — horizontal numbered process steps (the commission / business flow). */
export function Steps({ steps }: StepsProps) {
  return (
    <ol className="steps steps--row" style={{ ['--steps' as string]: steps.length } as React.CSSProperties}>
      {steps.map((s, i) => (
        <li key={i}>
          <span className="steps__no">{s.no}</span>
          <h3>{s.title}</h3>
          {s.desc && <p>{s.desc}</p>}
        </li>
      ))}
    </ol>
  );
}
