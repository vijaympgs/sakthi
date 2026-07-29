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
