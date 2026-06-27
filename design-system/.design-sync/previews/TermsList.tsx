import React from 'react';
import { TermsList } from '@angel-setsuna/ui';

export const Default = () => (
  <div style={{ background: '#1b1a1f', padding: 40, maxWidth: 680 }}>
    <TermsList
      items={[
        'ライセンス（使用許諾）・著作権譲渡（買い切り）いずれもご相談に応じます。',
        '請求書（インボイス）の発行に対応。海外のお客様は PayPal・Wise をご利用いただけます。',
        'NDA（秘密保持契約）の締結に対応いたします。',
        '制作実績としての公開可否は、事前にご相談ください。',
      ]}
    />
  </div>
);
