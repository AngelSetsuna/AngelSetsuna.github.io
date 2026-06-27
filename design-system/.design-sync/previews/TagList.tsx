import React from 'react';
import { TagList } from '@angel-setsuna/ui';

export const Default = () => (
  <div style={{ background: '#1b1a1f', padding: 40, maxWidth: 640 }}>
    <TagList tags={['キャラクターデザイン', '立ち絵・ゲームCG', '書籍・カバーイラスト', '宣伝・PRイラスト']} />
  </div>
);
