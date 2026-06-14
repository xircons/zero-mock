# GEMINI.md — UI Design System Rules

This file defines the visual design language for this project.
Gemini must follow these rules on every component, section, and page generated.
Never deviate from these tokens unless explicitly told to override them.

---

## 📂 0. Startup — Read `.claude/` First

> **This is mandatory. Do not skip.**
> Before writing any code or answering any task, read the relevant files from the `.claude/` directory in the project root.

### Load Order

```
.claude/
├── agents/          ← Read the matching agent role for this task
│   ├── database-architect.md
│   ├── documentation-engineer.md
│   ├── qa-expert.md
│   └── typescript-pro.md
├── commands/        ← Read if the task matches a command keyword
│   ├── explain-code.md
│   ├── generate-tests.md
│   └── refactor-code.md
└── skills/          ← Read the matching skill(s) for this task
    ├── code-reviewer/
    ├── frontend-design/
    ├── mobile-design/
    ├── senior-architect/
    ├── senior-backend/
    ├── senior-security/
    ├── seo-optimizer/
    └── ui-ux-pro-max/
```

### Rules

- **Agents** — Adopt the persona and decision-making standards from the matching agent file. UI/frontend tasks → load `typescript-pro.md`. Docs tasks → load `documentation-engineer.md`. Multiple agents can be active simultaneously.
- **Commands** — If the user invokes `/explain-code`, `/generate-tests`, or `/refactor-code`, read the corresponding `.claude/commands/*.md` file and follow its exact workflow.
- **Skills** — Always load the most relevant skill folder(s) before generating any component. UI work → load `frontend-design/` and `ui-ux-pro-max/`. Architecture decisions → load `senior-architect/`. Skills define implementation quality standards.

> If a `.claude/` file conflicts with a rule in this `GEMINI.md`, the **`.claude/` file takes priority** for task-specific logic. Design system tokens in this file are always authoritative for visual output.

---

## 🎨 Color System

### Base Backgrounds

| Token | Value | Usage |
| :--- | :--- | :--- |
| `bg-primary` | `#1a1a1a` | Main page background |
| `bg-secondary` | `#222222` | Elevated surfaces, cards |
| `bg-tertiary` | `#2a2a2a` | Hover states, subtle panels |
| `bg-light` | `#f0eeea` | Light sections (testimonials, articles) |
| `bg-light-alt` | `#e8e6e2` | Alternating light panels |

> ⚠️ **Never use pure `#000000` or pure `#ffffff` as backgrounds.**
> Dark must feel like **charcoal**, not void. Light must feel like **warm off-white**, not clinical.

### Text Colors

| Token | Value | Usage |
| :--- | :--- | :--- |
| `text-primary` | `#ffffff` | Headings on dark bg |
| `text-secondary` | `rgba(255,255,255,0.55)` | Body text on dark bg |
| `text-muted` | `rgba(255,255,255,0.28)` | Labels, captions on dark bg |
| `text-dark` | `#111111` | Headings on light bg |
| `text-dark-muted` | `#555555` | Body text on light bg |

### Blue Accent — Steel Blue (Tech Premium)

| Token | Value | Usage |
| :--- | :--- | :--- |
| `accent` | `#60A5FA` | Primary CTA, active states, highlights |
| `accent-dim` | `rgba(96,165,250,0.15)` | Glow backgrounds, tinted surfaces |
| `accent-border` | `rgba(96,165,250,0.25)` | Subtle accent borders |
| `accent-hover` | `#93C5FD` | Hover state on accent elements |

> Blue accent is used **sparingly** — CTAs, active tab indicators, icon highlights, subtle glows only.
> Never use blue as a background fill for large sections.

### Borders & Dividers

| Token | Value | Usage |
| :--- | :--- | :--- |
| `border-subtle` | `rgba(255,255,255,0.07)` | Column lines, section dividers on dark |
| `border-default` | `rgba(255,255,255,0.12)` | Card borders, icon boxes |
| `border-light` | `rgba(0,0,0,0.08)` | Dividers on light sections |

---

## 📐 Layout

- **Width:** `width: 100vw`, `max-width: 100vw`, `overflow-x: hidden` — sections bleed full viewport width, NO inner max-width container. Use padding for breathing room.
- **Min-height:** Every `<section>` must have `min-height: 100vh` — content can grow taller, never shorter than the viewport.
- **Grid:** Always 4-column layout at desktop — `grid-template-columns: repeat(4, 1fr)`
- **Column dividers:** Vertical white lines at `rgba(255,255,255,0.07)` spanning full section height, absolute-positioned overlay with `pointer-events: none`
- **Section padding:** `80px 32px` on desktop, `48px 20px` on mobile
- **Hairline dividers:** `1px solid rgba(255,255,255,0.07)` on dark sections, `1px solid rgba(0,0,0,0.08)` on light sections

---

## ✍️ Typography

| Role | Size | Weight | Letter Spacing | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Display heading | 52–64px | 600 | `-2px` | `line-height: 1.05` |
| Section heading | 36–48px | 600 | `-1.5px` | — |
| Card heading | 13–14px | 500 | `0` | — |
| Body | 13–14px | 400 | `0` | `line-height: 1.65` |
| Label / Eyebrow | 10–11px | 400 | `0.8px` | Uppercase, muted color |

- **Font stack:** `Inter, -apple-system, BlinkMacSystemFont, sans-serif`
- **Eyebrow prefix:** Always precede section labels with `≋` or `▓▓` — e.g. `≋ PRODUCT FEATURES`

> Never use `font-weight: 700` or above. Maximum is **600** for display, **500** for UI.
> Sentence case for all headings — **never ALL CAPS on headings.**

---

## 🧩 Component Patterns

### Hero Section

- Background: `#1a1a1a` + monochrome noise texture at `opacity: 0.035`
- 4-column line grid overlay — `pointer-events: none`
- No dot grid, no glow — **clean and minimal**
- CTA button: white bg, black text, `border-radius: 6px`, `padding: 9px 16px`
- CTA accent variant: `background: accent-dim`, `border: 1px solid accent-border`, white text

### Feature Cards (4-col grid)

- Background: `#1a1a1a`
- Dot grid inside each card — `radial-gradient` 1px dots at `20px 20px` spacing
- Dot fade mask — visible only near the bottom, fades upward
- Bottom glow — `radial-gradient` white blob at `bottom: -60px center`
- Icon box: `38×38px`, `border: 1px solid rgba(255,255,255,0.12)`, `border-radius: 8px`, `background: rgba(255,255,255,0.03)`
- Hover: subtle `accent-border` glow on icon box or card edge

### Light Sections (Testimonials, Articles)

- Background: `#f0eeea` (warm off-white)
- Text: `#111111` headings, `#555555` body
- Card borders: `rgba(0,0,0,0.08)`
- No dot grid, no noise, no glow — clean paper feel

### Split Sections

- Left half: `#1a1a1a` — noise + dot grid + glow blob
- Right half: `#f0eeea` or `#1a1a1a` (alternates per section)
- Hard edge cut at 50% — **no gradient blending between halves**

### Footer / CTA Banner

- Background: `#111111`
- Dot grid full-width at `opacity: 0.10`
- Blue accent glow blob at center-bottom: `radial-gradient(ellipse, rgba(96,165,250,0.08) 0%, transparent 60%)`
- Email input: `background: rgba(255,255,255,0.05)`, `border: 1px solid rgba(255,255,255,0.12)`, white text
- Subscribe button: white bg, black text — same style as hero CTA

### Navigation

- Default: transparent over hero
- Sticky: `background: rgba(26,26,26,0.85)` + `backdrop-filter: blur(12px)`
- Logo: white, `font-weight: 500`
- Nav links: `rgba(255,255,255,0.50)`, hover `#ffffff`
- Mobile: hamburger icon, full-screen overlay menu

---

## ✨ Texture & Atmosphere

### Monochrome Noise

Applied on: hero, footer, any full-dark section.
Never applied on: light sections, cards, feature grid.

```css
background-image: url("data:image/svg+xml,...feTurbulence baseFrequency='0.9'...");
background-size: 200px 200px;
opacity: 0.035;
position: absolute;
pointer-events: none;
```

### Dot Grid Pattern

Applied on: feature cards, dark panels, footer.

```css
background-image: radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px);
background-size: 20px 20px;
mask-image: radial-gradient(ellipse 80% 80% at 50% 110%, black 20%, transparent 70%);
```

### Radial Glow Blob

```css
/* White glow — feature cards */
background: radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%);

/* Blue glow — footer CTA only */
background: radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 60%);
```

---

## 🚫 Never Do

| Rule | Reason |
| :--- | :--- |
| ❌ Pure `#000` or `#fff` backgrounds | Too harsh — use charcoal / warm off-white |
| ❌ Colorful gradients | Monochrome only — no purple-to-pink, no rainbows |
| ❌ Drop shadows or `box-shadow` on cards | Use `border` instead |
| ❌ `border-radius` above `8px` | 6–8px max on all components |
| ❌ `font-weight: 700` or above | Max is 600 |
| ❌ Blue as a section background fill | Accent only — CTAs and glows |
| ❌ Emoji in UI | Use Tabler or Lucide **outline** icons only |
| ❌ ALL CAPS headings | Sentence case always |
| ❌ Centered body text blocks | Headings may center, body always left-aligned |
| ❌ Glassmorphism with heavy blur/opacity | Subtle blur only on sticky nav |

---

## ✅ Always Do

| Rule |
| :--- |
| ✅ `width: 100vw` and `min-height: 100vh` on every section |
| ✅ 4-column vertical line grid overlay on all dark sections |
| ✅ Dot grid + upward fade mask inside feature cards |
| ✅ Tight letter-spacing (`-1.5px` to `-2px`) on all display headings |
| ✅ Eyebrow label (`≋ LABEL`) before every section heading |
| ✅ Hairline `1px` dividers between sections |
| ✅ `pointer-events: none` on all decorative layers (noise, dots, lines) |
| ✅ Blue accent `#60A5FA` only on CTAs, active states, and subtle glows |
| ✅ Warm off-white `#f0eeea` for all light sections — never pure white |

---

## 📦 Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React or Tabler Icons (outline only)
- **Animation:** Framer Motion — subtle only: fade-in, slide-up, color interpolation. No bounce, no spring, no rotation.
- **Component libs:** shadcn/ui optional for utility components only (Accordion etc.) — always strip default styles to match this design system

---

## 💡 Example Prompt Pattern

```
Using the design system defined in GEMINI.md, build a [section name] section.

- Content: [describe what goes inside]
- Layout: [4-col grid / split / full-width]
- Background: [dark / light]
- Include: [dot grid / noise / blue glow / none]
```

**Examples:**

```
Using GEMINI.md, build a hero section.
- Content: headline "Zero config. Real API.", subtext, CTA button
- Layout: full-width dark
- Background: dark with noise texture
- Include: 4-col column lines, clean (no dot grid in hero)
```

```
Using GEMINI.md, build a 4-col feature grid section.
- Content: Secure Guard, Agent Build, Cloud Scale, Data Mining
- Background: dark
- Include: dot grid with upward fade, bottom white glow, blue accent on icon hover
```