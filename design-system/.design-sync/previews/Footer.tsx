import React from 'react';
import { Footer } from '@angel-setsuna/ui';

export const Default = () => (
  <div style={{ background: '#1b1a1f' }}>
    <Footer
      social={[
        { href: '#', label: 'X / Twitter' },
        { href: '#', label: 'Instagram' },
        { href: '#', label: 'Pixiv' },
      ]}
      copy="© 2026 Angel Setsuna. 無断転載・無断使用を禁じます。"
    />
  </div>
);
