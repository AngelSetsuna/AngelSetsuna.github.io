import React from 'react';

export interface TrackProps {
  /** Track title. */
  title: string;
  /** Description text. */
  desc?: string;
  /** Highlight as the recommended/primary track (accent border). */
  primary?: boolean;
  /** Optional ribbon tag pinned to the top edge (e.g. "推奨"). */
  tag?: string;
  /** Call-to-action node, e.g. a `<Button>` (pinned to the bottom). */
  action?: React.ReactNode;
  /** Optional body content (e.g. a how-to list) shown between description and action. */
  children?: React.ReactNode;
}

/** Track — a contact / commission "track" card; `primary` marks the recommended path with an accent border and ribbon. */
export function Track({ title, desc, primary, tag, action, children }: TrackProps) {
  return (
    <div className={`track${primary ? ' track--primary' : ''}`}>
      {tag && <span className="track__tag">{tag}</span>}
      <h3>{title}</h3>
      {desc && <p>{desc}</p>}
      {children}
      {action}
    </div>
  );
}
