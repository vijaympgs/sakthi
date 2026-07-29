# Session Log - Sakthi Solutions Website

## Date: 2026-07-29

### Tasks Completed

1. **Multiple Hero Images Carousel (Backend)**
   - Created `HeroImage` model (FK to CompanyInfo, image, alt_text, sort_order)
   - Migration 0029 — `hero_heroimage`
   - Added `hero_eyebrow` and `hero_tagline_subtitle` fields to CompanyInfo — Migration 0030
   - Registered HeroImage in admin under `[Home Page] Hero`
   - Serializer returns absolute URLs with request context
   - Seed script copies 15 images from `hero-bgs/` to `media/hero/`

2. **Hero Section Redesign (Frontend)**
   - Multi-image carousel with fade transitions (1000ms), auto-cycle 5s, nav dots
   - Left-aligned layout with generous whitespace
   - Typography: red eyebrow `#D63B3B`, gold subtitle `#C7A64A`, white heading, gold serif italic "&" suffix
   - No dark overlay / no CSS filters on images
   - All text driven from CMS — no hardcoded fallbacks

3. **Floating Contact Widget**
   - Replaced old vertical social sidebar with premium floating contact bar
   - Circular 54px buttons, Sakthi navy/gold, staggered animation, hover tooltips
   - Mobile: FAB speed-dial at bottom-right
   - Used Lucide icons, CSS transitions, full keyboard accessibility

4. **Navigation Company Name**
   - Lowercase red color, whitespace-nowrap to prevent wrapping
   - Responsive sizing: mobile/tablet `text-2xl`, desktop `text-3xl`
   - Centered on mobile/tablet, left-aligned on desktop

5. **Git Push**
   - All changes pushed to `main` at `https://github.com/vijaympgs/sakthi`
   - Commits: `f1a8df2`, `a4794b1`, `45ce756`, `e5ae53a`, `088f4fb`

### Environment Variables Required for Vercel Deployment

To make the site work on Vercel, add these in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://sakthi-89tl.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://sakthisolutions.in
NEXT_PUBLIC_SITE_NAME=Sakthi Solutions
```

Then redeploy. `NEXT_PUBLIC_*` vars are baked at build time.

### Current Blockers

1. **Vercel env vars NOT set** — `https://sakthi-solutions.vercel.app` renders empty because API calls default to localhost
2. **Render hero-bgs path** — Fixed in `088f4fb` by moving `hero-bgs/` into `backend/` (Render build context)
3. **Runtime error "Cannot read properties of undefined (reading 'call')"** — Likely resolves once env vars set

### Files Modified

- `backend/apps/cms/models/__init__.py` — Export HeroImage
- `backend/apps/cms/models/company_info.py` — HeroImage model + hero_eyebrow/hero_tagline_subtitle fields
- `backend/apps/cms/serializers.py` — HeroImageSerializer with absolute URL
- `backend/apps/cms/views.py` — Pass request context to serializer
- `backend/apps/cms/admin.py` — HeroImage admin (stacked inline)
- `backend/apps/cms/management/commands/seed_sakthi.py` — _seed_hero_images
- `backend/apps/cms/migrations/0029_heroimage.py` — New migration
- `backend/apps/cms/migrations/0030_companyinfo_hero_fields.py` — New migration
- `frontend/src/components/sections/HomePage.tsx` — Hero carousel with fade/auto-play
- `frontend/src/components/layout/FloatingContactBar.tsx` — Premium floating widget (replaced old)
- `frontend/src/components/layout/Navigation.tsx` — Company name style fixes
- `frontend/.env.example` — Updated API URL
- `documentation/handoff-2026-07-29.md` — Created

### Notes

- Render backend: `https://sakthi-89tl.onrender.com/api` — working
- Vercel frontend: `https://sakthi-solutions.vercel.app` — needs env vars
- Live domain: `https://sakthisolutions.in`
- GitHub: `https://github.com/vijaympgs/sakthi`
- `chrome-extension://invalid/` errors in console are from browser extensions, safe to ignore
