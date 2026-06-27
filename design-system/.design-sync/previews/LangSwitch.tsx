import React from 'react';
import { LangSwitch } from '@angel-setsuna/ui';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: '#1b1a1f', padding: 40, display: 'flex', gap: 24, alignItems: 'center' }}>{children}</div>
);

export const Japanese = () => (
  <Frame>
    <LangSwitch active="JP" />
  </Frame>
);

export const English = () => (
  <Frame>
    <LangSwitch active="EN" />
  </Frame>
);

export const Chinese = () => (
  <Frame>
    <LangSwitch active="中" />
  </Frame>
);
