# Design Handoff — Marcelino Fernando Academic / Robotics Website

**For:** Claude Code, implementing in the existing `fermarc98.github.io` repository
**From:** Design
**Stack target:** Static HTML + CSS + vanilla JS (HTML5 UP base). **No React, no build step, no framework.**
**Status:** Visual design approved. This document + the reference files (`index.html`, `assets/design.css`) are the spec.

---

## 0. What's in this handoff

| File | Role |
|---|---|
| `index.html` | **Working reference** of the full design — all 7 sections, the sidebar, the nav JS. Built as a single file that swaps "pages" with JS so the design can be reviewed in one place. |
| `assets/design.css` | **The design system, production-ready.** Copy this into the repo as-is. Every token, component and responsive rule the site needs is here. |
| `images/profile.jpg` | The circular profile photo (already in the repo). |
| `files/cv.pdf` | CV download target (already in the repo). |
| `screens/*.png` | Reference screenshots of each page. |

> **Recommended implementation:** The reference is one file with JS page-switching, but Marcelino asked for a **multi-page site** (separate HTML files, like schmluk.github.io). See §9 for how to split it. The CSS does not change — only the HTML is split per page and the nav becomes real `<a href>` links between files.

---

## 1. Overall layout

A **two-column shell**:

```
┌──────────────┬─────────────────────────────────────────────┐
│              │  ░ topbar (sticky)  Name / Section   CV·Email│
│   SIDEBAR    ├─────────────────────────────────────────────┤
│   (fixed,    │                                             │
│    navy,     │   MAIN CONTENT (white, max-width 880px,     │
│    312px)    │   centered, generous padding)               │
│              │                                             │
│  • photo     │   eyebrow → page title → lead → sections    │
│  • name      │                                             │
│  • title     │                                             │
│  • nav       │                                             │
│  • socials   │                                             │
└──────────────┴─────────────────────────────────────────────┘
```

- **Sidebar:** `position: fixed`, full height, `312px` wide, deep navy-slate gradient, faint engineering grid texture fading from the top. Holds identity (circular photo, name, role, affiliation), a hairline divider, the primary nav, and at the bottom the social-icon row + copyright.
- **Main:** offset by `margin-left: 312px`. A slim sticky **topbar** (58px) shows `Name / Current Section` on the left and `Download CV` + `Email` on the right. Below it, content is capped at **880px** and centered with `clamp()` padding.
- The nav lives **in the sidebar** on desktop (this is the schmluk pattern). On mobile the sidebar slides away and the topbar's "Menu" button reveals it. The "clean top navigation" requirement is met by the sticky topbar.

---

## 2. Color palette

All defined as CSS custom properties at the top of `design.css`. Low-chroma, cool neutrals + one serious blue accent.

| Token | Value | Use |
|---|---|---|
| `--ink` | `#1b2430` | Primary text |
| `--ink-soft` | `#51606f` | Secondary text, body paragraphs |
| `--ink-faint` | `#8794a2` | Meta, captions, mono labels |
| `--bg` | `#ffffff` | Main content background |
| `--bg-soft` | `#f6f8fa` | Panels, hover fills, chips |
| `--bg-sunken` | `#eef1f5` | Placeholder fills |
| `--line` | `#e4e8ed` | Hairline borders / dividers |
| **Sidebar** | | |
| `--side-grad-a` / `--side-grad-b` | `#182536` → `#111a26` | Sidebar gradient |
| `--side-head` | `#f3f6f9` | Name |
| `--side-text` | `#c5cfda` | Nav labels |
| `--side-muted` | `#7d8b9a` | Sidebar meta |
| **Accent** | | |
| `--accent` | `#2f63c7` | Links, active nav, primary buttons, surnames |
| `--accent-strong` | `#244e9e` | Hover |
| `--accent-tint` | `#eaf0fb` | Accent chip / hover backgrounds |
| `--accent-ink` | `#1f3a6d` | Text on accent tints |
| **Status** | | |
| `--ok` `#2f7d54` / `--warn` `#9a6b1c` / `--info` `#2f63c7` | | Pills: Accepted / Submitted / In Print (each has a matching `-bg`) |

**Rule of thumb:** the page is white + ink + hairlines. Blue is used sparingly — links, the active nav item, one primary button per view, status, and the accented surname. Don't add more colors.

---

## 3. Typography

Loaded from Google Fonts (single `@import` at the top of `design.css`). Three families, clear roles:

| Family | Token | Role |
|---|---|---|
| **Source Serif 4** | `--serif` | Name, all page titles & headings, card/project titles. Gives academic gravitas. |
| **IBM Plex Sans** | `--sans` | Body, nav, buttons, UI. Clean and engineering-friendly. |
| **IBM Plex Mono** | `--mono` | Eyebrows, section kickers, dates, tags, venue badges, repo names, status pills. This is the "robotics/engineering" voice. |

Scale (already in CSS):
- Page title `clamp(30px, 4.4vw, 40px)`, serif, weight 600, tight letter-spacing.
- Hero name `clamp(34px, 5.4vw, 52px)`.
- Lead paragraph `18px`, `--ink-soft`.
- Body `16px / 1.6`.
- Eyebrow / kicker / labels: mono, `11–12px`, uppercase, `letter-spacing` ~`.14em`, accent or faint.
- Min body size is 16px; never go below 13px even for mono meta.

---

## 4. Section structure (7 pages)

| Page | Sections (in order) |
|---|---|
| **Home** | Hero (welcome + name + tagline + 2 CTAs) → short intro paragraph → **News** (dated list) → **Featured Projects** (3 cards) → **Get in touch** panel |
| **About** | Eyebrow + "Biography" → bio prose → **Research Interests** (chips) → **Experience** (timeline) → **Awards & Honours** (list) → **Personal Interests** |
| **Publications** | Eyebrow + "Publications" + lead → grouped lists: **Submitted / In Print**, **Conference Papers**, **Journal Articles**, **Other Papers & Reports** |
| **Projects** | Eyebrow + "Projects" + lead → 2-col grid of 6 project cards |
| **Open Source (Code)** | Eyebrow + "Code" + lead → category subheads (**Robotics Control / Simulation / Learning-VLA / Perception / Utilities**), each a 2-col grid of repo cards → "View all on GitHub" button |
| **CV** | Eyebrow + "CV" → split card: summary + key facts on the left, navy **Download CV (PDF)** panel on the right |
| **Contact** | Eyebrow + "Contact" + lead → 2-col grid of contact cards (Email, GitHub, LinkedIn, Google Scholar, ResearchGate, ORCID) |

**Repeated page intro pattern:** `.eyebrow` (mono kicker with a short accent rule) → `.page-title` (serif) → optional `.lead`. Use it on every page for rhythm.

---

## 5. Component specs

### News card (`.news` list)
- A list, each row a 2-col grid: **date column** (`84px`, mono, faint) + **body**.
- Optional inline status tag at the start of the body (`.tag`: mono, uppercase, accent) — e.g. `SUBMITTED`, `ACCEPTED`, `AWARD`.
- Hairline divider between rows; first row has no top border.
- On mobile the date stacks above the text.

### Project card (`.card`)
- White, `1px` border, `10px` radius, soft shadow; lifts on hover (`translateY(-3px)` + stronger shadow + bluer border).
- Top: **16:10 placeholder image** (`.ph.thumb`, see §8) with a `data-label` describing the intended shot.
- Body: serif **title** → `--ink-soft` **description** (1–3 lines) → **tag chips** (mono) → `.cmeta` row with venue/status (mono, faint) + a "Details →" link.
- Featured grid on Home = 3 columns; Projects page = 2 columns; both collapse to 1 on mobile.

### Publication block (`.pub`)
- 2-col grid: **venue badge** (`78px`, e.g. `SMC / 2026` stacked, mono) + content.
- Content: **status pill** → **title** (semibold, `16.5px`) → **authors** (`--ink-soft`, *your name bolded* via `.me`) → **venue** (italic) + year → **link row** of small mono buttons (`PDF`, `Project`, `DOI`, `BibTeX`).
- Status pills (`.pill`): `.submitted` (amber), `.accepted` (green), `.inprint` (blue), `.published` (gray), `.award` (gold). Each has a leading dot.
- Grouped under mono `.subhead` dividers. On mobile the badge becomes a small inline chip above the title.

### Repo card (`.repo`)
- Compact bordered card: code-glyph icon + **repo name** (mono, accent, `white-space:nowrap`) → description → footer with a **language dot + name** and a category tag.
- Hover: accent border + shadow. Whole card is a link to the GitHub repo.
- Grouped by category under `.subhead`s.

### Chips, pills, buttons, link-buttons
- `.chip` — mono tag, soft bg, `nowrap`. `.chip.accent` for research interests.
- `.btn.primary` (accent fill) / `.btn.ghost` (outline). One primary per view.
- `.lk` — small mono link-button for PDF/Code/DOI rows.

### CV card (`.cv-card`)
- 2-col split: left `.cv-left` (summary + a `.def` key/value list), right `.cv-right` (navy gradient panel with the download button). Stacks on mobile (download panel moves to top).

### Contact card (`.ccard`)
- Icon tile + stacked label/value. Hover → accent tint + lift. Each is an `<a>` (mailto or external).

---

## 6. Mobile layout behavior

Breakpoints already in `design.css`:

- **≤ 1000px:** Featured projects grid → 2 columns.
- **≤ 860px (tablet/phone):** Sidebar becomes an **off-canvas drawer** (`transform: translateX(-100%)`, slides in on `body.nav-open`), with a dark scrim. Main content goes full-width (`margin-left: 0`). The topbar shows a **"Menu" hamburger** button (hidden on desktop). Topbar right-side links hide.
- **≤ 640px (phone):** All multi-column grids (projects, repos, contact, CV) → 1 column. Publication badge becomes an inline chip. News/def rows stack their label above the value.

The drawer is opened by `#menuBtn` and closed by the scrim or by navigating. In the multi-page build, closing on navigation happens naturally because the link loads a new page.

---

## 7. Implementation notes (HTML/CSS/JS)

1. **Drop in `design.css`** as the single stylesheet. It replaces the HTML5 UP `main.css` entirely (you can keep the HTML5 UP JS for scroll niceties, but it isn't required). Fonts load via the `@import` at the top — or move them to a `<link>` in `<head>` for slightly faster load.
2. **Markup is plain and semantic** — copy the section blocks verbatim from `index.html`. Canonical HTML (quoted attributes, explicit closing tags).
3. **Icons** are inline SVG (GitHub, LinkedIn, Scholar, ResearchGate, ORCID, mail, nav glyphs). No icon-font dependency. The repo already ships Font Awesome if you prefer it, but inline SVG keeps the page self-contained.
4. **The only JS** in the single-file reference is page-switching + the mobile drawer toggle (bottom of `index.html`). In the multi-page build you only need the **drawer toggle** (~10 lines) plus a snippet that adds `.active` to the current page's nav link.
5. **Accessibility:** keep `alt` on the photo, `title`/`aria-label` on icon-only links, visible focus states (add a `:focus-visible` outline using `--accent` if you extend it), and respect `prefers-reduced-motion` (already handled — entrance animation is gated).
6. **Performance:** images lazy-load (`loading="lazy"`) once real project images exist. Placeholders are pure CSS (no requests).

---

## 8. Placeholder images (until real project shots exist)

The design uses a **CSS-only placeholder** so there are zero broken images and each slot is self-documenting:

```html
<div class="ph r16x9 thumb" data-label="GenerativeMPC — robot in scene"></div>
```

- `.ph` renders a subtle diagonal-stripe fill with a centered mono caption pulled from `data-label`.
- Aspect ratio helpers: `.r16x9`, `.r4x3`, `.r1x1`. On cards add `.thumb` (square-corner, bottom border).
- **When real media arrives**, replace the `<div class="ph …">` with `<img src="images/projects/generativempc.jpg" alt="…" loading="lazy">` (keep the same aspect-ratio box for layout stability).

**Suggested real images to capture later** (16:9 or 16:10, ~1200px wide, consistent treatment):
- *GenerativeMPC* — system/architecture diagram or the bimanual mobile platform mid-task.
- *HapticVLA* — Isaac Sim digital-twin screenshot.
- *SafeHumanoid* — humanoid in a compliant-contact scene.
- *Unitree H1 Cartesian MPC* — hardware-in-the-loop photo or RViz/plot.
- *Humanoid Dance RL* — montage frame from the learned motion.
- *Quadruped & Mecanum* — bench photo of the physical robots.
Keep backgrounds/lighting consistent so the cards read as a set. Until then, the labelled placeholders are production-safe.

---

## 9. Splitting into a multi-page site

To match schmluk's separate-pages structure, split `index.html` into:

```
index.html          → Home
about.html          → About
publications.html   → Publications
projects.html       → Projects
code.html           → Open Source
cv.html             → CV
contact.html        → Contact
assets/design.css   (shared)
images/  files/     (shared)
```

For each file:
1. Keep the **sidebar + topbar** blocks identical (factor them into a snippet you paste, or a tiny JS include — but static duplication is fine and simplest).
2. The nav becomes real links: `<a href="about.html">About</a>`, etc. Mark the current page's link with `class="active"` (hard-coded per file, no JS needed).
3. Drop the page-switching script; keep only the **mobile drawer toggle**.
4. Each page's `<main>` content = the corresponding `.page` section's inner HTML from the reference.
5. Update `<title>` and the topbar crumb per page.

That's the whole port. The CSS, components, and visuals stay byte-for-byte identical.

---

## 10. Content to finalize (flagged `// TODO` in the reference)

- About → **Experience**: confirm titles/dates, add earlier roles.
- About → **Personal Interests**: replace placeholder copy.
- Publications → **Other Papers & Reports**: add thesis/reports; confirm author orders & venues.
- **Code**: replace placeholder repo names/links/languages with real repos.
- **Contact / social links**: add real Google Scholar, ResearchGate, ORCID URLs (currently `#`).
- Confirm the exact CV filename in `files/`.
