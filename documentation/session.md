# Session Log - Sakthi Solutions Website

## Date: 2026-07-29

### Tasks Completed

1. **Hero Image Carousel & Backend**
   - Created `HeroImage` model (FK to CompanyInfo, image, alt_text, sort_order) — migration 0029
   - Added `hero_eyebrow` and `hero_tagline_subtitle` fields to CompanyInfo — migration 0030
   - Admin registration, serializer with absolute URLs, seed script for 15 hero images

2. **Hero Section Premium Redesign**
   - Canvas-based brightness detection → adapts overlay opacity per image (dark: 0.35, bright: 0.75)
   - Left-to-right gradient overlay (dynamic opacity, 700ms transition)
   - Typography: 58px/46px/36px heading, Playfair Display italic gold for last line
   - Content in left 35-40% (`ml-[4vw] lg:ml-[6vw]`, max-w 560px)
   - Slide animations: 250ms fade + 12px slide-up on image change
   - HCB left-aligned, carousel pagination centered, same bottom baseline

3. **Floating Contact Widget** (premium enterprise)
   - Circular 54px buttons, navy/gold, staggered animation, hover tooltips
   - Mobile FAB speed-dial, keyboard accessible

4. **Wordmark Cycling in Navigation**
   - 10 typography variants for "Sakthi Solutions" with red/white color treatment
   - Click to cycle (V1-V10), hover shows variant number
   - Uses Inter, Manrope, Montserrat, Outfit, Plus Jakarta Sans, Sora, IBM Plex Sans

5. **Wordmark Exploration HTML** — `documentation/wordmark-explorations.html` (10 variations)

6. **Hero Content Alignment Fixes**
   - Empty `hero_eyebrow` and `hero_tagline_subtitle` cleared in seed
   - About image empty src warning fixed (`""` → `undefined`)
   - Nav dots moved to centered absolute, HCB left-aligned, both bottom-aligned

7. **run.bat Updated**
   - Now kills Chrome, starts BE/FE/9Router, waits 5s, opens Chrome, auto-exits

### Git Push

- Commit `cebd031` — pushed to `main` at `https://github.com/vijaympgs/sakthi`
- 6 files changed, 1733 insertions, 131 deletions

### Blocker — Vercel Env Vars Not Set

Vercel deployment at `https://sakthi-solutions.vercel.app` will not render API data until these are set in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://sakthi-89tl.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://sakthisolutions.in
NEXT_PUBLIC_SITE_NAME=Sakthi Solutions
```

Then redeploy from Vercel dashboard.

### URLs

- Render backend: `https://sakthi-89tl.onrender.com/api`
- Vercel frontend: `https://sakthi-solutions.vercel.app`
- GitHub: `https://github.com/vijaympgs/sakthi`

## Date: 2026-07-29 (Session 9 — Hero Category Ribbon Refinements & Visual Polish)

### Tasks Completed

1. **Hero Category Ribbon — Colors Matched to NAV V10**
   - Changed `text-[#D63B3B]` → `text-red-600` to match NAV wordmark red
   - All 6 first-letter spans updated

2. **Hero Category Ribbon — Compact Refinement**
   - Font size reduced: `22px/26px` → `18px/20px/22px` (~20% narrower overall)
   - Letter spacing: `0.08em` → `0.01em` (near-normal)
   - Word gaps: `ml-1` (4px) → `ml-[2px]` (2px)
   - Dot spacing: `mx-3` (12px) → `mx-[7px]` (~42% reduction)
   - Outer padding kept at `px-12 md:px-14` (48-56px per spec)

3. **Hero Category Ribbon — Visual Brilliance**
   - Rest text changed from `text-white/50 font-extralight` → gold gradient (`from-[#D4AF37] to-[#E0B84F] bg-clip-text text-transparent`) with `font-semibold` (600)
   - Gold dots: `text-[#C7A64A]/60` → `text-[#D4AF37]` with `textShadow: 0 0 12px rgba(212,175,55,0.25)` glow
   - Ribbon bg: `bg-black/30` → `bg-black/25 backdrop-blur-sm` (lighter + glass blur)

4. **Scroll Cue**
   - "Explore Our Solutions": `text-white/50 font-medium` → `text-black font-bold`

5. **All changes verified locally** — BE (8000) + FE (3000) running
