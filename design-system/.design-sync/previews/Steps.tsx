import React from 'react';
import { Steps } from '@angel-setsuna/ui';

export const CommissionFlow = () => (
  <div style={{ background: '#1b1a1f', padding: 40 }}>
    <Steps
      steps={[
        { no: '01', title: '表單記入', desc: '委託表單をダウンロードし、必要事項をご記入ください。' },
        { no: '02', title: '確認・着手金', desc: '日程が近づきましたらご連絡し、総額の50%を頂きます。' },
        { no: '03', title: 'ラフ制作', desc: 'ラフをご確認いただきながら制作します（無料修正3回）。' },
        { no: '04', title: '納品', desc: '残金ご入金後、高解像度データをお送りします。' },
      ]}
    />
  </div>
);

export const BusinessFlow = () => (
  <div style={{ background: '#1b1a1f', padding: 40 }}>
    <Steps
      steps={[
        { no: '01', title: 'お問い合わせ', desc: '用途・納期・ご予算をご相談ください。' },
        { no: '02', title: 'お見積もり', desc: '利用範囲に応じてお見積もりします。' },
        { no: '03', title: 'ご契約', desc: '条件を確認のうえご契約します。' },
        { no: '04', title: 'ラフ・制作', desc: 'ラフを確認しながら制作します。' },
        { no: '05', title: '納品', desc: '指定形式で納品いたします。' },
      ]}
    />
  </div>
);
