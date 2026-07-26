# Task Registry — Sakthi Solutions

**Generated:** 2026-07-27  
**Build:** 48 static pages, 0 errors  
**Status:** Visual audit (16/16) complete. Pre-deploy, CMS architecture, and optional tasks remain.

---

## Phase 0 — Visual Audit Fixes (SS-VISUAL-AUDIT.MD)

**Audit Date:** 2026-07-26 | **Fix Report:** SS-VISUAL-FIX-REPORT-PASS1.MD  
**Status:** 16/16 COMPLETE | **Build:** 48 pages, 0 errors

| # | Issue | Severity | Status | Notes |
|---|-------|----------|--------|-------|
| V1 | Hero right half dead space | Critical | **DONE** | 2-column hero with product image on all pages |
| V2 | Logo text-only, no icon | High | **DONE** | 4-quadrant SVG logomark in nav + footer |
| V3 | Accent color overuse | High | **DONE** | Warm gold `#b59449` for labels; red reserved for CTAs |
| V4 | Eyebrow labels overused (15+) | High | **DONE** | `showLabel` prop; removed from secondary sections |
| V5 | Products index no images | High | **DONE** | All product cards now have images |
| V6 | Feature card clipart icons | High | **DONE** | lucide-react icons on Floor Standing + Wall Mounting |
| V7 | Hero-to-content hard cliff | Medium-High | **DONE** | Gradient divider on all pages |
| V8 | About page generic stock image | Medium-High | **DONE** | Replaced with product imagery |
| V9 | Tellus wall of text | Medium-High | **DONE** | 4 themed feature groups with icons |
| V10 | Services hardware no hierarchy | Medium | **DONE** | Spec lines added; Epson variants grouped |
| V11 | Contact form/info disconnected | Medium | **DONE** | Info panel background; pill contrast; form borders |
| V12 | Floating bar 4-colour rainbow | Medium | **DONE** | Unified navy; color reveals on hover |
| V13 | No motion/animations | Medium | **DONE** | Scroll-reveal, stagger, CountUp on stats |
| V14 | No social proof/trust | Medium | **DONE** | SVG partner logos; redesigned strips |
| V15 | Breadcrumb orphaned | Low-Medium | **DONE** | Moved inside hero on all product pages |
| V16 | Childwood SKU-only cards | Low-Medium | **DONE** | All 45 SKUs named; material notes per category |

### New Files Created (Visual Audit)

| File | Purpose |
|------|---------|
| `frontend/src/hooks/useScrollReveal.ts` | IntersectionObserver hook for scroll-triggered animations |
| `frontend/src/components/ui/CountUp.tsx` | Animated number counter with cubic ease-out |
| `frontend/src/components/ui/PartnerLogo.tsx` | SVG brand logos for 7 technology partners |

### Design System Changes (Visual Audit)

| Token | Before | After |
|-------|--------|-------|
| `--color-label` | (not defined) | `#b59449` (warm gold) |
| `.section-label` | `text-sm font-semibold uppercase tracking-widest text-accent-500` | `text-xs font-bold uppercase tracking-[0.2em] text-label` |
| SectionHeader label | Always rendered, `text-accent-500` | Optional via `showLabel`, `text-label` |
| Card hover | `hover:shadow-lg` only | + `hover:-translate-y-1` on most cards |
| Floating bar | 4 different brand colors | Unified `bg-primary-500`, color on hover |

---

## Phase 1 — Pre-Deploy (Complete Before Go-Live)

**Status:** 0/13 — NOT STARTED

| # | Task | Source | Effort | Owner |
|---|------|--------|--------|-------|
| T1 | Set `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL` in Vercel project env vars | CHECKLIST §1 | 2 min | Deploy |
| T2 | Set Django backend env vars in production (`DEBUG=False`, `USE_SQLITE=False`, `DATABASE_URL`, `SECRET_KEY`) | CHECKLIST §1 | 2 min | Deploy |
| T3 | Update canonical base URL + JSON-LD `url` + sitemap base + robots.txt to final domain | CHECKLIST §2 | 2 min | Deploy |
| T4 | Add domain to Vercel, configure DNS (CNAME/A record) | CHECKLIST §2 | 15 min | Devops |
| T5 | Verify domain resolves correctly (www vs non-www) | CHECKLIST §2 | 5 min | QA |
| T6 | Deploy Django backend: migrate, seed_sakthi, createsuperuser, verify admin login | CHECKLIST §5 | 15 min | Devops |
| T7 | Verify CORS + CSRF: frontend domain allowed, backend accessible | CHECKLIST §5 | 5 min | Devops |

## Phase 2 — Post-Deploy (Search Engine Setup)

**Status:** 0/7 — NOT STARTED

| # | Task | Source | Effort | Owner |
|---|------|--------|--------|-------|
| T8 | Submit `sitemap.xml` to Google Search Console, request indexing for key pages | CHECKLIST §3 | 5 min | SEO |
| T9 | Verify Search Console ownership via DNS TXT record or meta tag | CHECKLIST §3 | 10 min | SEO |
| T10 | Check coverage report for any indexed 404s from old WordPress site | CHECKLIST §3 | 10 min | SEO |
| T11 | Verify GA4 receives data via Realtime report | CHECKLIST §4 | 5 min | SEO |
| T12 | Set preferred domain in Search Console (www vs non-www) | CHECKLIST §3 | 2 min | SEO |
| T13 | Run post-deploy SEO checks: title tags, meta desc, canonical, JSON-LD, OG, Twitter, robots, sitemap, 301 redirects | CHECKLIST §6 | 15 min | QA |

## Phase 3 — First Week Monitoring

**Status:** 0/11 — NOT STARTED

| # | Task | Source | Effort | Owner |
|---|------|--------|--------|-------|
| T14 | Monitor GA Realtime for first 24h of traffic | CHECKLIST §8 | Ongoing | Marketing |
| T15 | Check Vercel deployment logs for 404s and 500s | CHECKLIST §8 | 10 min | Dev |
| T16 | Verify contact form submissions reach Django backend (ContactSubmission in admin) | CHECKLIST §8 | 5 min | QA |
| T17 | Run Lighthouse audit (target: 90+ Perf, 90+ A11y, 100 SEO) | CHECKLIST §8 | 10 min | QA |
| T18 | Cross-browser test: Chrome, Firefox, Safari, Edge, mobile | — | 20 min | QA |
| T19 | Run `npm run typecheck` to verify no TypeScript regressions | — | 2 min | Dev |
| T20 | Functional QA: nav dropdowns, hamburger, breadcrumbs, form submit, Google Maps, WhatsApp, footer links | CHECKLIST §7 | 20 min | QA |
| T21 | Functional QA: all redirects resolve, gallery loads, no console errors | CHECKLIST §7 | 10 min | QA |

## Phase 4 — CMS Architecture (Fully Dynamic Conversion)

**Status:** 7/8 COMPLETE | C8 skipped intentionally (redirect pages kept for SEO)

| # | Task | Effort | Status |
|---|------|--------|--------|
| C1 | Replace hardcoded `PRODUCT_CATEGORIES` in `HomePage.tsx` with API fetch | Small | **DONE** |
| C2 | Replace hardcoded product list in `ProductsPage.tsx` with API fetch | Small | **DONE** |
| C3 | Replace hardcoded `Navigation.tsx` with API-driven navigation via `NavigationMenu` | Medium | **DONE** |
| C4 | Replace hardcoded `Footer.tsx` links with API fetch from `FooterColumn` + `FooterLink` | Small | **DONE** |
| C5 | Create dynamic `/products/[slug]` route rendering from API (`Product` + `ProductFeature` + `ProductSpecGroup`) | Large | **DONE** |
| C6 | Convert homepage Industries to API-driven blocks | Medium | **DONE** |
| C7 | Delete hardcoded product pages (4 single-level pages deleted; sub-pages kept) | Medium | **DONE** |
| C8 | Delete redirect pages and replace with Django redirects | Small | **SKIPPED** (redirects kept for SEO) |

**Note:** All hardcoded fallback data removed from frontend. API is single source of truth.

## Phase 5 — Optional / Future

**Status:** 0/3 — NOT STARTED (requires business decision)

| # | Task | Source | Effort | Decision |
|---|------|--------|--------|----------|
| O1 | Add Microsoft Clarity or equivalent heatmap tool | PRE-DEPLOY §4 | 30 min | Optional |
| O2 | Build `/blog` and `/blog/[slug]` routes for future content | SS-SITE-AUDIT P11 | Medium | Pending |
| O3 | Product JSON-LD schema per product page (current: only LocalBusiness + BreadcrumbList) | SS-SITE-AUDIT P9 | Medium | Pending |

---

## Summary

| Phase | Items | Done | Pending |
|-------|-------|------|---------|
| Phase 0 — Visual Audit | 16 | **16** | 0 |
| Phase 1 — Pre-Deploy | 7 | 0 | 7 |
| Phase 2 — Post-Deploy | 6 | 0 | 6 |
| Phase 3 — Monitoring | 8 | 0 | 8 |
| Phase 4 — CMS Architecture | 8 | **7** | 1 (skipped) |
| Phase 5 — Optional | 3 | 0 | 3 |
| **Total** | **48** | **23** | **25** |

## Legend

| Status | Meaning |
|--------|---------|
| **DONE** | Complete and verified in build |
| **NOT STARTED** | Ready to execute, not yet begun |
| **Pending** | Requires business decision before execution |
| Owner | Assignee (Dev / Deploy / SEO / QA / Marketing / Devops) |

## Files Not Modified (CMS Architecture — per constraints)

- `frontend/src/hooks/useQueries.ts`
- `frontend/src/lib/api.ts`
- `frontend/src/lib/productData.ts`
- `frontend/src/lib/childwoodData.ts`
- `frontend/src/components/ui/ProductSpecsSection.tsx`
- `backend/` directory