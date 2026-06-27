import React from 'react';

export interface LightboxProps {
  /** Image URL to display. */
  image: string;
  /** Caption under the image. */
  caption?: string;
  /** Close handler. */
  onClose?: () => void;
  /** Previous-image handler. */
  onPrev?: () => void;
  /** Next-image handler. */
  onNext?: () => void;
}

/** Lightbox — fullscreen image viewer with close / previous / next controls. */
export function Lightbox({ image, caption, onClose, onPrev, onNext }: LightboxProps) {
  return (
    <div className="lb" style={{ position: 'relative' }}>
      <button className="lb__close" aria-label="Close" onClick={onClose}>
        &times;
      </button>
      <button className="lb__nav lb__prev" aria-label="Previous" onClick={onPrev}>
        &lsaquo;
      </button>
      <button className="lb__nav lb__next" aria-label="Next" onClick={onNext}>
        &rsaquo;
      </button>
      <figure className="lb__figure">
        <img src={image} alt={caption ?? ''} />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </div>
  );
}
