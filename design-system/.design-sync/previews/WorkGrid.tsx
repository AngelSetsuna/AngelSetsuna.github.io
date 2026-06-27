import React from 'react';
import { WorkGrid, WorkCard } from '@angel-setsuna/ui';

export const ThreeColumns = () => (
  <div style={{ background: '#1b1a1f', padding: 24 }}>
    <WorkGrid>
      <WorkCard image="../../../_preview/img/01.jpg" title="アニス" meta="Fan Art · 2025" />
      <WorkCard image="../../../_preview/img/02.jpg" title="初音ミク" meta="Fan Art · 2025" />
      <WorkCard image="../../../_preview/img/04.jpg" title="大鳳" meta="Fan Art · 2025" />
      <WorkCard image="../../../_preview/img/05.jpg" title="オリジナルキャラクター" meta="Personal · 2025" />
      <WorkCard image="../../../_preview/img/03.jpg" title="リバーレリオ" meta="Fan Art · 2025" focus="center" />
    </WorkGrid>
  </div>
);
