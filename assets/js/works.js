/* =========================================================
   作品資料 — 這是你日後唯一需要編輯的檔案
   ---------------------------------------------------------
   ★ 新增一張作品的步驟：
     1. 把圖片放進 works/ 資料夾（建議寬度 1600px 以內、JPG）
     2. 在下面複製一整段 { ... }，貼到清單裡，改掉內容
     3. 存檔。網站會自動排版、自動套三語、自動歸類。

   ★ 欄位說明：
     image    : 圖片路徑（相對於網站根目錄）
     category : 分類代碼，必須是下面 CATEGORIES 裡的其中一個 key
     title    : 作品名稱（三語：ja 日 / en 英 / zh 中）
     client   : 客戶或用途。保密案件可寫 "NDA" 或 "Personal"
     role     : 你的負責範圍（三語）。公司很在意這個！
     year     : 年份（數字）

   ★ 兩個「可選」欄位（不寫也沒關係）：
     hero  : true 代表「這張要放進首頁幻燈片」。
             ➜ 只要「任何一張」標了 hero:true，幻燈片就「只」播有標的那些。
               （例如以後橫圖多了，把想播的橫圖標 hero:true，就全換成橫圖）
             ➜ 全部都沒標時，幻燈片預設播前 6 張。
     focus : 圖片在幻燈片/縮圖裡的聚焦位置（CSS object-position）。
             直圖臉在上方 ➜ 不用寫（預設已聚焦上方臉部）。
             橫圖 ➜ 建議寫 "center"（置中），避免裁掉太多。
             也可寫 "center 40%"、"left top" 等微調。
   ========================================================= */

/* 分類定義：想增減分類就改這裡。key 不要有空格 */
const CATEGORIES = {
  all:       { ja: "すべて",          en: "All",        zh: "全部" },
  character: { ja: "キャラデザイン",   en: "Character",  zh: "角色設計" },
  game:      { ja: "ゲーム",          en: "Game",       zh: "遊戲用" },
  cover:     { ja: "書籍カバー",       en: "Book Cover", zh: "書籍封面" },
  other:     { ja: "その他",          en: "Other",      zh: "其他" },
};

/* 作品清單。第一筆建議放最強的代表作（也會用在 Hero 與分享預覽）。
   目前都暫設為 category: "character"（單一分類 → 篩選列自動隱藏）。
   日後作品變多、種類變雜時，把 category 改成不同值，篩選列就會自動出現。 */
const WORKS = [
  {
    image: "works/03.jpg",
    category: "character",
    title: { ja: "リバーレリオ", en: "Liberalio", zh: "Liberalio" },
    client: "Fan Art",
    role:  { ja: "イラスト", en: "Illustration", zh: "插畫" },
    year: 2025,
    focus: "center",   // 這張是橫圖，置中聚焦
  },
  {
    image: "works/02.jpg",
    category: "character",
    title: { ja: "初音ミク", en: "Hatsune Miku", zh: "初音未來" },
    client: "Fan Art",
    role:  { ja: "イラスト", en: "Illustration", zh: "插畫" },
    year: 2025,
  },
  {
    image: "works/01.jpg",
    category: "character",
    title: { ja: "アニス", en: "Anis", zh: "Anis" },
    client: "Fan Art",
    role:  { ja: "イラスト", en: "Illustration", zh: "插畫" },
    year: 2025,
  },
  {
    image: "works/04.jpg",
    category: "character",
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
];
