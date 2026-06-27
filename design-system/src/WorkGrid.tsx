import React from 'react';

export interface WorkGridProps {
  /** WorkCard elements. */
  children?: React.ReactNode;
}

/** WorkGrid — responsive 3-column grid that lays out WorkCard items. */
export function WorkGrid({ children }: WorkGridProps) {
  return <div className="grid">{children}</div>;
}
