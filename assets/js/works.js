const CATEGORIES = {
  all:       { ja: "すべて",          en: "All",        zh: "全部" },
  character: { ja: "キャラデザイン",   en: "Character",  zh: "角色設計" },
  fanart:    { ja: "二次創作",        en: "Fan Art",    zh: "二次創作" },
  game:      { ja: "ゲーム",          en: "Game",       zh: "遊戲用" },
  cover:      { ja: "書籍カバー",       en: "Book Cover", zh: "書籍封面" },
  commission: { ja: "依頼",            en: "Commission", zh: "委託" },
  other:      { ja: "その他",          en: "Other",      zh: "其他" },
};

const WORKS = [
  {
    image: "works/03.jpg",
    category: "fanart",
    title: { ja: "リバーレリオ", en: "Liberalio", zh: "莉貝雷利奧" },
    client: "Fan Art",
    role:  { ja: "イラスト", en: "Illustration", zh: "插畫" },
    year: 2025,
    focus: "center",
  },
  {
    image: "works/02.jpg",
    category: "fanart",
    title: { ja: "初音ミク", en: "Hatsune Miku", zh: "初音未來" },
    client: "Fan Art",
    role:  { ja: "イラスト", en: "Illustration", zh: "插畫" },
    year: 2025,
  },
  {
    image: "works/01.jpg",
    category: "fanart",
    title: { ja: "アニス", en: "Anis", zh: "阿妮斯" },
    client: "Fan Art",
    role:  { ja: "イラスト", en: "Illustration", zh: "插畫" },
    year: 2025,
  },
  {
    image: "works/04.jpg",
    category: "fanart",
    title: { ja: "大鳳", en: "Taihou", zh: "大鳳" },
    client: "Fan Art",
    role:  { ja: "イラスト", en: "Illustration", zh: "插畫" },
    year: 2025,
  },
  {
    image: "works/05.jpg",
    category: "character",
    title: { ja: "オリジナルキャラクター", en: "Original Character", zh: "原創角色" },
    client: "Personal",
    role:  { ja: "デザイン〜イラスト", en: "Design–Illustration", zh: "設計至完稿" },
    year: 2025,
  },
  {
    // 直圖：不設 focus，沿用全站「偏上」預設（hero 16% / 卡片 12%）以顯示上半部
    image: "works/06.jpg",
    category: "commission",
    title: { ja: "我妻乙葉", en: "Otoha Agatsuma", zh: "我妻乙葉" },
    client: "Commission",
    role:  { ja: "イラスト", en: "Illustration", zh: "插畫" },
    year: 2026,
  },
];
