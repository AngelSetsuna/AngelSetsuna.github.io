import React from 'react';

export interface TagListProps {
  /** Tag labels. */
  tags: string[];
}

/** TagList — row of rounded pill tags (the business "対応分野" chips). */
export function TagList({ tags }: TagListProps) {
  return (
    <div className="biz-types">
      {tags.map((t, i) => (
        <span key={i}>{t}</span>
      ))}
    </div>
  );
}
