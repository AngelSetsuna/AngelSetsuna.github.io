import React from 'react';
import { Nav } from '@angel-setsuna/ui';

const links = [
  { href: '#works', label: 'Works' },
  { href: '#about', label: 'About' },
  { href: '#business', label: 'Business' },
  { href: '#commission', label: 'Commission' },
  { href: '#contact', label: 'Contact' },
];

export const Transparent = () => (
  <div style={{ background: '#1b1a1f' }}>
    <Nav links={links} activeLang="JP" />
  </div>
);

export const Scrolled = () => (
  <div style={{ background: '#1b1a1f' }}>
    <Nav links={links} activeLang="JP" scrolled />
  </div>
);
