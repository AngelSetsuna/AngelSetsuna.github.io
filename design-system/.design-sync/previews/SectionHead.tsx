import React from 'react';
import { SectionHead } from '@angel-setsuna/ui';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#1b1a1f', padding: 48 }}>{children}</div>
);

export const Works = () => (
  <Frame>
    <SectionHead title="Works" sub="作品集" />
  </Frame>
);

export const Business = () => (
  <Frame>
    <SectionHead title="Business" sub="商業・法人のご依頼" />
  </Frame>
);

export const Contact = () => (
  <Frame>
    <SectionHead title="Contact" sub="お問い合わせ" />
  </Frame>
);
