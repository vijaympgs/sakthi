# Sakthi Solutions — Design System

*Derived from Propertism.in source CSS (static/css/v4-*.css). Colours from current production.*

---

## 1. Alignment Principle

**Everything is left-aligned by default.** No `text-center` on section headers,
headings, subtitles, body text, CTAs, or card content.

- Section kickers -- left
- H2 / H3 / H4 headings -- left
- Subtitles -- left
- Body paragraphs -- left
- CTA button rows -- left
- Card content -- left
- Stats -- left

Only exceptions: hero may centre on mobile, footer copyright may centre.

---

## 2. Section Anatomy

```
SECTION KICKER          (icon + gold label, 0.75-0.85rem, uppercase)
    |
H2 PRIMARY HEADING      (serif, clamp(1.2rem, 2vw+0.8rem, 2.2rem), 700, -0.02em)
    |
H4 SUB-HEADLINE         (1.0-1.1rem, gold, uppercase or italic depending on section)
    |
[Optional] MISSION HIGHLIGHT BLOCK  (cream bg, 4px gold left border, italic serif 1.15rem)
    |
DIVIDER                 (1px, var(--border-subtle))
    |
SUPPORTING TEXT         (1rem, text-muted)
    |
[Optional] CARD GRID    (3-col desktop, 1px gap separator)
    |
CTA ROW                 (10px bold uppercase buttons, 14px-32px padding)
```

---

## 3. Exact Font Sizes (from Propertism v4 CSS)

| Element | Size | Weight | Style | Source File |
|---------|------|--------|-------|-------------|
| Section kicker (properties) | `0.85rem` | 700 | uppercase, 0.15em tracking | `v4-properties.css:31` |
| Section kicker (about) | `0.75rem` | 700 | uppercase, 0.05em tracking | `v4-about.css:68` |
| Section title (properties) | `clamp(1.2rem, 2vw+0.8rem, 2.2rem)` | 700 | -0.02em tracking, lh 1.1 | `v4-properties.css:46` |
| Section title (about) | `clamp(1.2rem, 2vw+0.8rem, 2.2rem)` | 700 | -0.02em tracking, lh 1.2 | `v4-about.css:44` |
| Section subtitle (properties) | `1.2rem` | 400 | lh 1.6 | `v4-properties.css:58` |
| About sub-headline | `1.1rem` | 600 | gold, uppercase, 0.1em tracking | `v4-about.css:53` |
| Mission highlight para | `1.15rem` | 400 | italic serif, lh 1.5 | `v4-about.css:95` |
| Supporting text | `1rem` | 400 | lh 1.7 | `v4-about.css:103` |
| CTA buttons | `10px` | 700 | uppercase, 0.15em tracking | `v4-about.css:236` |
| CTA padding | `14px 32px` | -- | -- | `v4-about.css:235` |
| Property card title | `1.5rem` | 700 | serif, -0.01em | `v4-properties.css:136` |
| Property price | `1.75rem` | 700 | serif, gold | `v4-properties.css:146` |
| Property address | `0.95rem` | 400 | muted | `v4-properties.css:161` |

---

## 4. Font Stack (from v4-tokens.css)

| Profile | Serif | Sans |
|---------|-------|------|
| Editorial (default) | Cormorant Garamond | Jost |
| Classic | Playfair Display | Inter |

CSS variables:
- `--serif-main` -- current profile serif
- `--sans-main` -- current profile sans
- `--brand-gold: #C49C52`
- `--brand-navy: #0b0f1a`

---

## 5. Colour Tokens (from v4-tokens.css)

| Token | Value | Usage |
|-------|-------|-------|
| `--brand-gold` | `#C49C52` | Accents, kickers, borders, CTAs |
| `--brand-navy` | `#0b0f1a` | Dark backgrounds |
| `--bg-primary` | `#FDFDFB` | Page background |
| `--bg-secondary` | `#F8F5F0` | Muted section background |
| `--bg-card` | `#FFFFFF` | Card surfaces |
| `--text-main` | `#0F172A` | Primary text |
| `--text-muted` | `#64748B` | Secondary/muted text |
| `--border-subtle` | `rgba(15,23,42,0.12)` | Card/section borders |

---

## 6. Spacing (from v4-tokens.css)

| Token | Value |
|-------|-------|
| `--nav-height` | `92px` |
| `--section-v-padding` | `25px` (ultra-dense!) |
| Section header margin-bottom | `60px` (properties) |
| Card gap separator | `1px` |

---

## 7. Layout Patterns

### Two-Column Split (About)

```css
.about-split-container {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 40px;
    align-items: stretch;
}
```

### Card Grid (Properties, Services)

```css
.grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background-color: var(--border-subtle);
}
```

Cards use 1px separator gap -- the grid background shows through as a hairline
border between cards. Cards have no border-radius (all `0`).

---

## 8. Component Patterns

### Mission Highlight Block (About)

```css
.about-mission-highlight {
    background: rgba(184, 154, 74, 0.05);
    border-left: 4px solid var(--brand-gold);   /* 4px, not 2px! */
    padding: 14px 20px;
}
.about-mission-highlight p {
    font-family: var(--serif-main);
    font-size: 1.15rem;
    font-style: italic;
    line-height: 1.5;
}
```

### CTA Buttons

```css
/* Solid */
.btn-premium-solid {
    background: var(--brand-gold);
    color: #0F172A;
    padding: 14px 32px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    border: none;
    border-radius: 0;
}
/* Hover: navy bg, white text, translateY(-2px), shadow */

/* Outline */
.btn-premium-outline {
    background: transparent;
    color: #0F172A;
    padding: 14px 32px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    border: 1px solid #0F172A;
    border-radius: 0;
}
/* Hover: light bg, gold border, gold text, translateY(-2px) */
```

### Section Kicker

```css
.section-kicker {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--brand-gold);
    margin-bottom: 14px;
}
.section-kicker-icon {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    color: var(--brand-gold);
}
```

---

## 9. Dark Mode (v4-tokens.css)

| Token | Light | Dark |
|-------|-------|------|
| `--bg-primary` | `#FDFDFB` | `#0b0f1a` |
| `--bg-secondary` | `#F8F5F0` | `#050a14` |
| `--bg-card` | `#FFFFFF` | `#1E2A3A` |
| `--text-main` | `#0F172A` | `#FFFFFF` |
| `--text-muted` | `#64748B` | `#94A3B8` |
| `--border-subtle` | `rgba(15,23,42,0.12)` | `rgba(196,156,82,0.15)` |

Theme attribute: `[data-theme="dark"]` on `<html>`
Typography attribute: `[data-typography="classic"]` or `[data-typography="editorial"]`

---

## 10. CSS Class Reference (our globals.css)

| Class | Purpose |
|-------|---------|
| `.container-page` | Max-width centred container |
| `.section-padding` | Consistent vertical section spacing |
| `.section-label` | Gold uppercase tag (text-only) |
| `.heading-xl` / `.heading-lg` / `.heading-md` / `.heading-sm` | Serif heading hierarchy |
| `.highlight-block` | Cream bg + gold left border (4px) |
| `.gold-divider` | Left-aligned thin gold line |
| `.card` | White card with shadow + hover gold border |
| `.btn-accent` | Gold filled, navy on hover |
| `.btn-outline-gold` | Gold outline, filled on hover |
| `.btn-outline-white` | White outline for dark backgrounds |
| `.form-input` / `.form-label` / `.form-select` | Form field styling |
| `.stat-value` | Serif extrabold stat number |
| `.stat-label` | Sans-serif uppercase stat label |

---

## 11. Section Kicker Implementation (HomePage Pattern)

Every section on the homepage uses an inline SVG icon with gold label.
Never text-only. The inline SVG paths are Lucide-compatible.

```tsx
<div className="flex items-center gap-2 mb-3">
  <svg className="w-4 h-4 text-[#B89A4A]" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round"
       strokeLinejoin="round">
    {/* Lucide icon paths */}
  </svg>
  <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#B89A4A] font-ui">
    SECTION LABEL
  </span>
</div>
```

Icons per section:
| Section | SVG Icon | Path |
|---------|----------|------|
| Products | Package (box) | `m7.5 4.27...M12 22V12` |
| About | Users | `M16 21v-2...7.75` |
| Team | User (single) | `M16 21v-2...r="4"` |
| Advantage | Shield-check | `M12 22s8-4...4-4` |
| Industries | Grid (4-squares) | `rect x3 y3...x14 y14` |
| Partners | Users | `M16 21v-2...7.75` |
| Company | Home | `M3 9l9-7...22` |
| Testimonials | Message | `M21 15...z` |

---

## 12. Asset Management Rules

**No hardcoded Unsplash URLs in production code.**

- **Category images**: Use `ProductCategory.image` from CMS. Fallback function
  `getCategoryFallbackImage(slug)` uses Unsplash ONLY as last resort when
  the CMS has no image. These are acceptable fallbacks, not production assets.
- **Company/about images**: Must come from `CompanyInfo.about_image` field.
  No Unsplash fallback — show branded placeholder (`"Sakthi"` text) when empty.
- **Hero backgrounds**: From `CompanyInfo.hero_bg_image`. Unsplash fallback
  only in the model default (dev convenience), not in frontend.
- **Client logos**: From `Client.logo` ImageField. Show client name as text
  fallback when no logo exists — never hide the client.
- **Brand logos**: From `Brand.logo` ImageField, fetched from production
  via `fetch_brand_logos` management command.
- **Team photos**: From `TeamMember.photo` ImageField. Show initials in
  gold-bordered box as fallback.

Seed data (`seed_sakthi.py`) must use local paths or production CDN URLs
for images — never Unsplash for production content.

---

## 13. HomePage Section Registry

| Order | Section | Data Source | Header Pattern |
|-------|---------|-------------|----------------|
| 1 | Hero | `CompanyInfo.hero_*` | Centred (exception) |
| 2 | Trust Strip | `CompanyInfo.stats`, `advantages` | Stat grid |
| 3 | Products & Solutions | `ProductCategory` (API) | Kicker + H2 + gold left bar |
| 4 | Compact About | `CompanyInfo` | Kicker + H2 + 2-col (story + stats) |
| 5 | Compact Team | `TeamMember` (API, top 4) | Kicker + H2 + 4-col card grid |
| 6 | Sakthi Advantage | `CompanyInfo.advantages` | Kicker + H2 + 4-col card grid |
| 7 | Industries | `Industry` (API) | Kicker + H2 + 6-col icon grid |
| 8 | Tech Partners | `Partner` (API) | Kicker + flex-wrap logos |
| 9 | About Company | `CompanyInfo.about_*` | Kicker + H2 + split (img + text+stats) |
| 10 | Testimonials | `Testimonial` (API) | Kicker + H2 + 3-col quote cards |
| 11 | Clients | `Client` (API) | Kicker + H2 + logo grid |
| 12 | CTA | `CompanyInfo.cta_*` | Centred full-width banner |

---

## 14. Client Display Pattern

Clients without logos are NOT hidden. They show as a text card with the
client name in serif font.

```tsx
{displayClients.map((client, i) => {
  const logoUrl = client.logo ? resolveUrl(client.logo) : null;
  if (!logoUrl) {
    return (
      <div key={i} className="flex items-center justify-center p-4
        bg-white border border-slate-100 shadow-sm"
        style={{ height: "90px", width: "170px" }}>
        <span className="text-sm font-bold text-slate-400 font-heading">
          {client.name}
        </span>
      </div>
    );
  }
  return <div ...><img src={logoUrl} alt={client.name} /></div>;
})}
```

---

## 15. About & Team — Compact Homepage Pattern

Since About and Team pages have no deep-linked subpages, compact versions
live on the homepage. The `/team` route redirects to `/`. The `/about`
route remains as a detail page with full timeline.

**Compact About**: 2-col grid — story text with gold left border + mission
highlight block + 4-stat grid.

**Compact Team**: Top 4 team members in a card grid. No photo? Show
gold-bordered initials box.
