import React from 'react';

export interface AvatarProps {
  /** Image source URL. */
  src: string;
  /** Alt text. */
  alt?: string;
}

/** Avatar — circular profile image with the accent ring used in the hero. */
export function Avatar({ src, alt = '' }: AvatarProps) {
  return <img className="hero__avatar" src={src} alt={alt} />;
}
