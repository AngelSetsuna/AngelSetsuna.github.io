import React from 'react';

export interface NoteProps {
  /** Note content. */
  children?: React.ReactNode;
}

/** Note — an accented callout box (used for the commission pricing note). */
export function Note({ children }: NoteProps) {
  return <p className="commission__note">{children}</p>;
}
