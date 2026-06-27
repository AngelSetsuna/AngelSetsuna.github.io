# design-sync NOTES — Angel Setsuna UI

## Origin (important)
This design system was **synthesized from the static site** at `桌面/ask` (no pre-existing
component library). The 15 React components in `src/` are hand-written wrappers that reuse the
live site's exact CSS class names. `styles.css` is a **copy** of `../assets/css/style.css`
(with a Google Fonts `@import` prepended) — it is NOT a live import.

## Build / re-sync recipe
Run everything from `design-system/`:
1. `npm run build` — rebuilds `dist/` (esbuild bundle + tsc `.d.ts`). Required before the converter.
2. `node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./node_modules --entry ./dist/index.es.js --out ./ds-bundle`
3. **`cp preview-assets/img/* ds-bundle/_preview/img/`** ← MANDATORY after every `package-build`.
   The build wipes `ds-bundle/_preview/`; the masters live in `design-system/preview-assets/img/`.
   Skip this and Avatar / WorkCard / WorkGrid / Lightbox preview cards render with broken images.
4. `node .ds-sync/package-validate.mjs ./ds-bundle`

## Gotchas
- **Preview canvas is white**, the DS is dark. Every authored preview wraps its content in a
  `background:#1b1a1f` frame. Keep that pattern for any new preview.
- **Nav is wide** → `cfg.overrides.Nav = {"cardMode":"column"}` (already set). If a future
  component is wider than a grid cell, validate prints `[GRID_OVERFLOW]` — apply the same.
- **Fonts** load via a Google Fonts `@import` at the top of `styles.css` → validate prints
  `[FONT_REMOTE] "Space Grotesk"` (expected, non-blocking).
- Image previews reference `../../../_preview/img/<file>` (relative to each component's `.html`).

## Known render warns
- `[FONT_REMOTE]` "Space Grotesk" — expected (remote font host).

## Re-sync risks
- **Manual image copy (step 3)** is the #1 thing to forget — without it image cards go blank.
- **`styles.css` is a copy of the static site's CSS.** If `桌面/ask/assets/css/style.css`
  changes, re-copy it (re-prepend the Google Fonts `@import`) and rebuild — otherwise the DS
  drifts from the live site.
- Components are **first-party new code** (not upstream); there is no upstream library to merge.
- Project: `Angel Setsuna UI` — `https://claude.ai/design/p/a2d3625d-4daa-4ae8-82e5-57753481aa3c`.
