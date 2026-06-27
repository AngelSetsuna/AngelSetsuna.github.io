import React from 'react';

export interface WorkCardProps {
  /** Artwork image URL. */
  image: string;
  /** Work title shown in the hover overlay. */
  title: string;
  /** Meta line shown under the title (e.g. client · year). */
  meta?: string;
  /** CSS object-position focus for the thumbnail (e.g. "center", "center 40%"). */
  focus?: string;
  /** Force the hover overlay visible (useful for previews/featured cards). */
  showOverlay?: boolean;
  /** Click handler (e.g. open in a Lightbox). */
  onClick?: () => void;
}

/** WorkCard — portfolio artwork thumbnail (3:4) with a hover overlay carrying title + meta. */
export function WorkCard({ image, title, meta, focus, showOverlay, onClick }: WorkCardProps) {
  return (
    <div className="card is-in" onClick={onClick}>
      <img src={image} alt={title} style={focus ? { objectPosition: focus } : undefined} />
      <div className="card__overlay" style={showOverlay ? { opacity: 1 } : undefined}>
        <span className="card__title">{title}</span>
        {meta && <span className="card__meta">{meta}</span>}
      </div>
    </div>
  );
}
