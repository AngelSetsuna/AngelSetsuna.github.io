import React from 'react';
import { Track, Button } from '@angel-setsuna/ui';

export const BusinessPrimary = () => (
  <div style={{ background: '#1b1a1f', padding: 48, maxWidth: 440 }}>
    <Track
      primary
      tag="推奨"
      title="商業・法人のご依頼"
      desc="ゲーム・出版・宣伝用途など。用途・ご予算・利用範囲に応じてお見積もりいたします。請求書の発行も可能です。"
      action={<Button variant="primary" href="#">メールで相談する</Button>}
    />
  </div>
);

export const Personal = () => (
  <div style={{ background: '#1b1a1f', padding: 48, maxWidth: 440 }}>
    <Track
      title="個人のご依頼"
      desc="委託表單をダウンロードし、ご記入のうえ下記Gmailへ送信してください。"
      action={<Button variant="outline" href="#">委託表單をダウンロード</Button>}
    />
  </div>
);
