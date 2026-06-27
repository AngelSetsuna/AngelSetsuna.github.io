# Angel Setsuna UI — usage conventions

A dark, minimal portfolio design system for the illustrator **Angel Setsuna**. Artwork is the hero; the UI stays quiet and recedes. Components are real React components ported 1:1 from the live site.

## Setup — the dark canvas is required

There is **no provider component**. Two things must be true for components to look right:

1. **Load `styles.css`.** It carries the design tokens (`:root`), every component's styles (`_ds_bundle.css`, imported from it), and the brand fonts (Google Fonts `@import`). Nothing is styled without it.
2. **Put components on a dark background.** Every component is designed for the dark canvas and uses light text. On a white page, light text disappears. Set the page/section background and base text color from the tokens:

```jsx
<div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
  {/* compose components here */}
</div>
```

## The styling idiom — components + CSS variables

This is a **component + design-token** system, not a utility-class system. Build screens by composing the exported components; for your own layout glue (wrappers, spacing, section backgrounds) use the CSS custom properties below. Do **not** invent new color/spacing values — reach for a token so everything stays on-brand.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#1b1a1f` | page background |
| `--bg-soft` | `#25232b` | cards / raised surfaces |
| `--line` | `#35323d` | borders, dividers |
| `--text` | `#f0eef3` | primary text |
| `--text-dim` | `#a6a0b0` | secondary text |
| `--accent` | `#ef7ca3` | rose-pink — the ONLY accent; CTAs, active states, highlights |
| `--accent-soft` | `rgba(239,124,163,.15)` | faint accent fills |
| `--maxw` | `1280px` | max content width |
| `--gap` | `clamp(20px,4vw,56px)` | section padding rhythm |
| `--radius` | `4px` | corner radius (kept small) |
| `--font-en` | Space Grotesk | English titles, buttons, numbers |
| `--font-jp` | Noto Sans JP | Japanese / body text |

Accent discipline: rose-pink is used sparingly, only on the primary action and active/highlight states. Everything else is neutral dark. Keep motion gentle; avoid heavy shadows and gradients (depth comes from the `--bg` → `--bg-soft` → `--line` color steps, not shadows).

## Components

`Button` (variant `primary`/`outline`/`ghost`) · `Nav` · `LangSwitch` · `Avatar` · `SocialBar` · `SectionHead` (large EN title + small accent JP subtitle) · `WorkCard` / `WorkGrid` (3:4 artwork thumbnails) · `Lightbox` · `Steps` (numbered flow) · `TagList` · `TermsList` · `Track` (`primary` = recommended contact path) · `Note` (accented callout) · `Footer`. Trilingual UI (JP / EN / 中), default JP.

## Where the truth lives

- Styles & tokens: read `styles.css` and its `@import`ed `_ds_bundle.css`.
- Per-component API + usage: each `components/<group>/<Name>/<Name>.d.ts` and `<Name>.prompt.md`.

## One idiomatic example

```jsx
import { SectionHead, WorkGrid, WorkCard, Button } from '@angel-setsuna/ui';

<section style={{ background: 'var(--bg)', color: 'var(--text)', padding: 'var(--gap)' }}>
  <SectionHead title="Works" sub="作品集" />
  <WorkGrid>
    <WorkCard image="/works/01.jpg" title="アニス" meta="Fan Art · 2025" />
    <WorkCard image="/works/02.jpg" title="初音ミク" meta="Fan Art · 2025" />
  </WorkGrid>
  <div style={{ marginTop: 'var(--gap)' }}>
    <Button variant="primary" href="#contact">お仕事のご依頼</Button>
  </div>
</section>
```
