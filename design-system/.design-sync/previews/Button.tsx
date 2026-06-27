import React from 'react';
import { Button } from '@angel-setsuna/ui';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#1b1a1f', padding: 40, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
    {children}
  </div>
);

export const Primary = () => (
  <Frame>
    <Button variant="primary" href="#">お仕事のご依頼</Button>
  </Frame>
);

export const Outline = () => (
  <Frame>
    <Button variant="outline" href="#">委託表單をダウンロード</Button>
  </Frame>
);

export const Ghost = () => (
  <Frame>
    <Button variant="ghost">コピー</Button>
  </Frame>
);

export const AllVariants = () => (
  <Frame>
    <Button variant="primary">Primary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
  </Frame>
);
