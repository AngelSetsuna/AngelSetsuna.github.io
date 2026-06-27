# DESIGN.md — Angel Setsuna Portfolio

> 用法：到 claude.ai/design 建立設計系統時於「Add assets」上傳此檔；
> 或在 prototype 對話框附上本檔，輸入「Create a design system from this DESIGN.md」。
> 建議同時上傳 `works/01–05.jpg` 與 `assets/avatar.png` 作為視覺參考。

---

## 1. Visual Theme & Atmosphere（視覺氛圍）

二次元插畫家 **Angel Setsuna** 的個人作品集兼接案網站。氛圍：**深色、極簡、有質感**。
作品圖是絕對主角，介面要克制、退到背景，讓插畫最突出。
密度偏低、大量留白、細線分隔、動效克制（淡入、緩慢放大 Ken-Burns、滑順捲動）。
情緒關鍵字：高級、沉穩、親和、不冷感、不俗氣。

## 2. Color Palette & Roles（配色與角色）

```css
:root {
  --bg:          #1b1a1f;            /* 主背景：沉穩深炭（微暖） */
  --bg-soft:     #25232b;            /* 卡片／區塊底 */
  --line:        #35323d;            /* 分隔線、描邊 */
  --text:        #f0eef3;            /* 主文字 */
  --text-dim:    #a6a0b0;            /* 次要文字 */
  --accent:      #ef7ca3;            /* 強調色：玫瑰粉（深底適用） */
  --accent-soft: rgba(239,124,163,.15); /* 粉色淡底（標籤、hover 底） */
}
```

角色規則：強調色（玫瑰粉）只用於**重點**——primary 按鈕、語言切換 active、hover、選取反白、「推薦」標籤。其餘大面積維持中性深色。文字選取反白用 `--accent` 底 + 黑字。

## 3. Typography Rules（字體）

- **內文／日文**：`"Noto Sans JP"`，主用 weight **300**，line-height 1.8。
- **標題／英文／按鈕**：`"Space Grotesk"`，字距略寬（letter-spacing ~.03em），weight 400/500/700。
- 來源：Google Fonts。fallback：`sans-serif`。
- 區塊標題用英文大字（如 `Works`），下方配小級日文副標（如 `作品集`）。

## 4. Component Stylings（元件樣式）

**Button**（圓角 4px、字體 Space Grotesk、letter-spacing .04em）
- `primary`：粉底 `--accent` + 深色字 `#1b1a1f`，weight 500；hover：亮度+10%、上移 2px。
- `outline`：透明底 + `--line` 描邊；hover：邊框轉 `--accent`。
- `ghost`：小尺寸、`--text-dim`、細邊；hover：轉 `--accent`。

**Nav**（固定頂部）：初始透明，捲動後加 `rgba(27,26,31,.82)` 底 + `blur(12px)` 毛玻璃 + 下邊線。連結 `--text-dim`，hover 轉 `--text`。

**Lang switch**：三鈕 JP/EN/中，active 為 `--accent` + weight 500。

**Work card / Grid**：響應式網格，作品圖為主，hover 微互動，點擊開 lightbox。圖片禁拖曳/右鍵另存。

**Steps（流程）**：橫向編號步驟（01–05），大號碼 + 標題 + 說明。

**Track（雙軌卡）**：商業/法人卡可掛「推薦」標籤並用 primary 按鈕；個人卡為輔。

**Lightbox**：全螢幕深色遮罩，含 關閉 / 上一張 / 下一張，圖說置底。

## 5. Layout Principles（版面原則）

- 最大內容寬 `--maxw: 1280px`，置中。
- 區塊間距 `--gap: clamp(20px, 4vw, 56px)`。
- 單頁滾動 + 錨點導覽（Works / About / Business / Commission / Contact）。
- 窄版區塊（About/Business/Commission/Contact）用較窄欄寬增加閱讀節奏。

## 6. Depth & Elevation（深度與陰影）

走**扁平**路線，不靠重陰影，靠**色階分層**製造層次：
`--bg`（最底） < `--bg-soft`（卡片） < `--line`（描邊）。
圓角統一小（`--radius: 4px`）。需要浮起感時用半透明 + 毛玻璃（如 nav），而非投影。

## 7. Do's and Don'ts

**Do**：保持深色與大量留白；強調色克制使用；標題用英文大字配日文小副標；動效輕柔。
**Don't**：不要亮色背景；不要多種強調色；不要重投影與漸層俗氣感；不要讓 UI 蓋過插畫；不要破壞三語切換。

## 8. Responsive Behavior（響應式）

- 桌機橫排導覽；手機收進漢堡選單（`nav__menu`）。
- Hero 全螢幕 `100svh`（min 620px），作品輪播背景。
- Works 網格隨寬度自動換欄；Steps 在窄螢幕改直排。
- 圖片 `object-position: center 16%`，聚焦臉部避免裁切身體中段。

## 9. Agent Prompt Guide（給設計 agent 的提示）

- 「沿用深炭背景 `#1b1a1f` + 玫瑰粉強調 `#ef7ca3`，作品圖為主角，介面極簡退到背景。」
- 「標題用 Space Grotesk 英文大字，下方配 Noto Sans JP 日文小副標。」
- 「接案頁面：商業/法人為主視覺優先（推薦標籤 + primary 按鈕），個人委託為輔。」
- 「所有介面需支援 JP / EN / 中 三語切換，預設日文。」
- 「動效克制：淡入、緩慢放大、滑順捲動；不要重陰影與漸層。」
