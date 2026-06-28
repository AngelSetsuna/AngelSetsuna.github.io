# 奈奈畫圖（Angel Setsuna）作品集網站

純靜態作品集網站（無框架），三語：日文 `ja` / 英文 `en` / 中文 `zh`，預設 `ja`。

## 部署
- GitHub Pages，repo `AngelSetsuna/AngelSetsuna.github.io`，正式網址 https://angelsetsuna.github.io/ 。
- **push 到 `main` = 自動上線**（幾分鐘後生效）。沒有 build 步驟，網站直接讀 `index.html` + `assets/`。
- 本機預覽：`node serve.mjs` → http://localhost:5173 。

## 檔案分工
| 檔案 | 用途 |
|------|------|
| `index.html` | 單頁全站（hero / works / about / business / commission / contact）。可見文字用 `data-i18n="key"`，文案內容在 i18n.js。含 SEO（og、JSON-LD）。OG 圖寫死 `works/01.jpg`。 |
| `assets/js/works.js` | **新增作品唯一要改的檔**。`CATEGORIES` 分類 + `WORKS` 作品陣列。 |
| `assets/js/i18n.js` | `I18N` 三語文案 + `SOCIAL` 社群連結。 |
| `assets/js/main.js` | 渲染邏輯（grid / hero 幻燈片 / lightbox / 語言切換 / 圖片右鍵防護）。一般不動。 |
| `assets/css/style.css` | 樣式。 |
| `build-standalone.mjs` | 產生單檔 `site-standalone.html`（圖轉 base64 內嵌）。**被 .gitignore，不會上線**，只是本機備份；圖片清單自動從 works.js 抓，不需手動維護。 |
| `site-standalone.html` | 建置產物，勿手動編輯。 |

## 新增作品

**建議用一鍵工具**：雙擊根目錄 `新增作品.bat`（邏輯在 `tools/add-work.ps1`）。它會：自動壓縮圖片（長邊 ≤2000px、JPEG Q82）→ 存成 `works/NN.jpg` → 自動依長寬判斷直/橫圖套用 focus → 寫入 `works.js` → git commit/push。

手動新增時，在 `WORKS` 加一筆物件：
```js
{
  image: "works/NN.jpg",          // 放到 works/，依序編號 01、02…
  category: "character",           // 須是 CATEGORIES 的 key
  title: { ja: "", en: "", zh: "" }, // 缺的語言自動退回 ja
  client: "Fan Art",
  role:  { ja: "イラスト", en: "Illustration", zh: "插畫" },
  year: 2026,
  // focus: "center",  // 見下方規則
  // hero: true,       // 放進首頁幻燈片
}
```
- `CATEGORIES` 的 key：`character` 角色設計 / `game` 遊戲用 / `cover` 書籍封面 / `commission` 委託 / `other` 其他（`all`=全部）。要新分類先在此加。
- `hero: true` 才會進首頁幻燈片；若全部都沒標 `hero`，自動取 `WORKS` 前 8 筆。

## ⚠️ 圖片裁切焦點規則（最常忘，務必遵守）
全站圖以 `object-fit:cover` 裁切、焦點固定**偏上**（hero `center 16%` / 卡片 `center 12%`，定義在 style.css）。
- **直圖（人像）→ 不要加 `focus`**，沿用偏上預設，臉/頭才會正確顯示。
- **橫圖才是例外 → 加 `focus: "center"`**（或其他值）覆蓋。
- 上傳工具會自動依長寬套用此規則；手動加時請自行判斷。

## 圖片
所有作品圖請壓縮後再放（長邊 ≤2000px 左右、約 200–500KB），避免拖慢載入與撐大 repo。一鍵工具會自動處理。
