import React from 'react';
import { WorkCard } from '@angel-setsuna/ui';

export const Default = () => (
  <div style={{ background: '#1b1a1f', padding: 32, display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: 280 }}>
      <WorkCard image="../../../_preview/img/01.jpg" title="アニス" meta="Fan Art · 2025" />
    </div>
  </div>
);

export const WithOverlay = () => (
  <div style={{ background: '#1b1a1f', padding: 32, display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: 280 }}>
      <WorkCard image="../../../_preview/img/04.jpg" title="大鳳" meta="Fan Art · 2025" showOverlay />
    </div>
  </div>
);
